"""Cloud-agnostic secrets management.

This module provides a unified interface for accessing secrets from:
- Environment variables (all platforms)
- File-based secrets (Kubernetes, Docker Swarm)
- Cloud secret managers (AWS, GCP, Azure) - via env vars

The abstraction allows your app to work on ANY platform without code changes.
"""

from __future__ import annotations

import json
import os
from dataclasses import dataclass
from functools import lru_cache
from pathlib import Path
from typing import Any


@dataclass
class Secret:
    """A secret value with metadata."""
    value: str
    source: str  # Where the secret came from
    
    def __str__(self) -> str:
        """Redact secret value in string representation."""
        return f"Secret(source={self.source}, value=***)"
    
    def __repr__(self) -> str:
        return self.__str__()


class SecretsManager:
    """
    Cloud-agnostic secrets manager.
    
    Priority order for secret resolution:
    1. Environment variables (works everywhere)
    2. File-based secrets (Kubernetes, Docker Swarm)
    3. JSON file (local development)
    
    Usage:
        secrets = SecretsManager()
        api_key = secrets.get('API_KEY')
        db_password = secrets.get('DATABASE_PASSWORD', default='localdev')
    """
    
    DEFAULT_SECRET_PATHS = [
        '/run/secrets',        # Docker Swarm secrets
        '/var/run/secrets',    # Kubernetes secrets (custom mount)
        '/secrets',            # Generic container secrets
    ]
    
    def __init__(
        self,
        secret_paths: list[str] | None = None,
        json_secrets_file: str | None = None,
    ):
        """
        Initialize secrets manager.
        
        Args:
            secret_paths: List of directories to search for secret files
            json_secrets_file: Path to JSON file containing secrets (dev only)
        """
        self.secret_paths = [Path(p) for p in (secret_paths or self.DEFAULT_SECRET_PATHS)]
        self.json_secrets_file = json_secrets_file or os.environ.get('SECRETS_FILE')
        self._json_secrets: dict[str, str] | None = None
    
    def get(
        self,
        key: str,
        default: str | None = None,
        required: bool = False,
    ) -> str | None:
        """
        Get a secret value.
        
        Args:
            key: The secret key/name
            default: Default value if secret not found
            required: Raise error if secret not found and no default
            
        Returns:
            The secret value or default
            
        Raises:
            ValueError: If required=True and secret not found
        """
        # 1. Check environment variables (highest priority)
        if value := os.environ.get(key):
            return value
        
        # 2. Check file-based secrets
        if value := self._get_from_file(key):
            return value
        
        # 3. Check JSON secrets file (development)
        if value := self._get_from_json(key):
            return value
        
        # Not found
        if required and default is None:
            raise ValueError(
                f"Required secret '{key}' not found. "
                f"Set {key} environment variable or mount secret file."
            )
        
        return default
    
    def get_secret(self, key: str, default: str | None = None) -> Secret | None:
        """Get secret with metadata about its source."""
        # Check environment
        if value := os.environ.get(key):
            return Secret(value=value, source='environment')
        
        # Check files
        for secret_path in self.secret_paths:
            file_path = secret_path / key.lower()
            if file_path.exists():
                try:
                    value = file_path.read_text().strip()
                    return Secret(value=value, source=f'file:{file_path}')
                except (PermissionError, OSError):
                    continue
        
        # Check JSON
        if self._load_json_secrets() and key in self._json_secrets:
            return Secret(value=self._json_secrets[key], source='json_file')
        
        if default is not None:
            return Secret(value=default, source='default')
        
        return None
    
    def _get_from_file(self, key: str) -> str | None:
        """Get secret from file-based secrets."""
        # Try exact key name and lowercase
        key_variants = [key, key.lower(), key.upper()]
        
        for secret_path in self.secret_paths:
            if not secret_path.exists():
                continue
            
            for variant in key_variants:
                file_path = secret_path / variant
                if file_path.exists():
                    try:
                        return file_path.read_text().strip()
                    except (PermissionError, OSError):
                        continue
        
        return None
    
    def _get_from_json(self, key: str) -> str | None:
        """Get secret from JSON secrets file."""
        if secrets := self._load_json_secrets():
            return secrets.get(key) or secrets.get(key.lower()) or secrets.get(key.upper())
        return None
    
    def _load_json_secrets(self) -> dict[str, str] | None:
        """Load secrets from JSON file (cached)."""
        if self._json_secrets is not None:
            return self._json_secrets
        
        if not self.json_secrets_file:
            return None
        
        try:
            path = Path(self.json_secrets_file)
            if path.exists():
                self._json_secrets = json.loads(path.read_text())
                return self._json_secrets
        except (json.JSONDecodeError, PermissionError, OSError):
            pass
        
        return None
    
    def list_available(self) -> list[str]:
        """List all available secret keys (for debugging)."""
        keys = set()
        
        # Environment variables (be selective - only common secret patterns)
        secret_patterns = ['KEY', 'SECRET', 'PASSWORD', 'TOKEN', 'API', 'DSN', 'URL']
        for key in os.environ:
            if any(pattern in key.upper() for pattern in secret_patterns):
                keys.add(key)
        
        # File secrets
        for secret_path in self.secret_paths:
            if secret_path.exists():
                keys.update(f.name for f in secret_path.iterdir() if f.is_file())
        
        # JSON secrets
        if secrets := self._load_json_secrets():
            keys.update(secrets.keys())
        
        return sorted(keys)


# Singleton instance
@lru_cache(maxsize=1)
def get_secrets_manager() -> SecretsManager:
    """Get the singleton secrets manager instance."""
    return SecretsManager()


# Convenience functions
def get_secret(key: str, default: str | None = None, required: bool = False) -> str | None:
    """Get a secret value."""
    return get_secrets_manager().get(key, default=default, required=required)


def require_secret(key: str) -> str:
    """Get a required secret (raises if not found)."""
    value = get_secret(key, required=True)
    assert value is not None  # For type checker
    return value
