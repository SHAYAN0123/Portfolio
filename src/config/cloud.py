"""Cloud-agnostic configuration module.

This module provides provider-agnostic abstractions for:
- Environment detection (Lambda, Kubernetes, Docker, etc.)
- Configuration loading from environment variables
- Secret management abstraction

Works with ANY cloud provider or container platform:
- AWS Lambda / ECS / EKS
- Google Cloud Run / GKE
- Azure Container Apps / AKS
- Kubernetes (any provider)
- Docker / Docker Compose
- Railway, Render, Fly.io, Heroku
- Traditional VMs
"""

from __future__ import annotations

import os
from dataclasses import dataclass, field
from enum import Enum
from functools import lru_cache
from pathlib import Path
from typing import Any


class CloudEnvironment(Enum):
    """Detected cloud/container environment."""
    LOCAL = "local"
    DOCKER = "docker"
    KUBERNETES = "kubernetes"
    AWS_LAMBDA = "aws_lambda"
    AWS_ECS = "aws_ecs"
    GOOGLE_CLOUD_RUN = "google_cloud_run"
    AZURE_CONTAINER = "azure_container"
    RAILWAY = "railway"
    RENDER = "render"
    FLY_IO = "fly_io"
    HEROKU = "heroku"
    UNKNOWN = "unknown"


def detect_environment() -> CloudEnvironment:
    """
    Detect the current cloud/container environment.
    
    Returns:
        CloudEnvironment enum indicating the detected environment
    """
    # AWS Lambda
    if os.environ.get('AWS_LAMBDA_FUNCTION_NAME'):
        return CloudEnvironment.AWS_LAMBDA
    
    # AWS ECS
    if os.environ.get('ECS_CONTAINER_METADATA_URI'):
        return CloudEnvironment.AWS_ECS
    
    # Google Cloud Run
    if os.environ.get('K_SERVICE') or os.environ.get('CLOUD_RUN_JOB'):
        return CloudEnvironment.GOOGLE_CLOUD_RUN
    
    # Azure Container Apps / App Service
    if os.environ.get('WEBSITE_SITE_NAME') or os.environ.get('CONTAINER_APP_NAME'):
        return CloudEnvironment.AZURE_CONTAINER
    
    # Kubernetes (generic)
    if os.environ.get('KUBERNETES_SERVICE_HOST') or os.path.exists('/var/run/secrets/kubernetes.io'):
        return CloudEnvironment.KUBERNETES
    
    # Railway
    if os.environ.get('RAILWAY_ENVIRONMENT'):
        return CloudEnvironment.RAILWAY
    
    # Render
    if os.environ.get('RENDER'):
        return CloudEnvironment.RENDER
    
    # Fly.io
    if os.environ.get('FLY_APP_NAME'):
        return CloudEnvironment.FLY_IO
    
    # Heroku
    if os.environ.get('DYNO'):
        return CloudEnvironment.HEROKU
    
    # Docker (check for .dockerenv file or cgroup)
    if os.path.exists('/.dockerenv') or _is_docker_cgroup():
        return CloudEnvironment.DOCKER
    
    # Local development
    if os.environ.get('FLASK_ENV') == 'development' or os.environ.get('DEBUG'):
        return CloudEnvironment.LOCAL
    
    return CloudEnvironment.UNKNOWN


def _is_docker_cgroup() -> bool:
    """Check if running in Docker via cgroup."""
    try:
        with open('/proc/1/cgroup', 'r') as f:
            return 'docker' in f.read() or 'containerd' in f.read()
    except (FileNotFoundError, PermissionError):
        return False


def is_container_environment() -> bool:
    """Check if running in any container environment."""
    env = detect_environment()
    return env not in (CloudEnvironment.LOCAL, CloudEnvironment.UNKNOWN)


def is_serverless_environment() -> bool:
    """Check if running in a serverless/FaaS environment."""
    return detect_environment() in (
        CloudEnvironment.AWS_LAMBDA,
        CloudEnvironment.GOOGLE_CLOUD_RUN,
    )


def is_kubernetes_environment() -> bool:
    """Check if running in Kubernetes."""
    return detect_environment() == CloudEnvironment.KUBERNETES


def get_log_path() -> Path:
    """
    Get appropriate log path for the current environment.
    
    - Serverless: /tmp (only writable location)
    - Container: /app/logs or stdout
    - Local: ./logs
    """
    if is_serverless_environment():
        return Path('/tmp')
    
    # Check for writable logs directory
    app_logs = Path('/app/logs')
    if app_logs.exists() and os.access(app_logs, os.W_OK):
        return app_logs
    
    local_logs = Path('logs')
    if local_logs.exists() and os.access(local_logs, os.W_OK):
        return local_logs
    
    # Fallback to temp
    return Path('/tmp')


@dataclass
class CloudConfig:
    """Cloud-agnostic application configuration."""
    
    # Environment info
    environment: CloudEnvironment = field(default_factory=detect_environment)
    app_env: str = field(default_factory=lambda: os.environ.get('FLASK_ENV', 'production'))
    debug: bool = field(default_factory=lambda: os.environ.get('DEBUG', '').lower() == 'true')
    
    # Server config
    host: str = field(default_factory=lambda: os.environ.get('HOST', '0.0.0.0'))
    port: int = field(default_factory=lambda: int(os.environ.get('PORT', '8000')))
    workers: int = field(default_factory=lambda: int(os.environ.get('WORKERS', '4')))
    
    # Application config
    secret_key: str = field(default_factory=lambda: _get_secret_key())
    app_version: str = field(default_factory=lambda: os.environ.get('APP_VERSION', '1.0.0'))
    
    # Feature flags
    enable_https_redirect: bool = field(default_factory=lambda: (
        os.environ.get('ENABLE_HTTPS_REDIRECT', 'true').lower() == 'true'
        and not is_serverless_environment()  # Gateway handles HTTPS in serverless
    ))
    
    # External services (all optional)
    database_url: str | None = field(default_factory=lambda: os.environ.get('DATABASE_URL'))
    redis_url: str | None = field(default_factory=lambda: os.environ.get('REDIS_URL'))
    sentry_dsn: str | None = field(default_factory=lambda: os.environ.get('SENTRY_DSN'))
    
    # Static files
    static_url: str = field(default_factory=lambda: os.environ.get('STATIC_URL', '/static'))
    cdn_url: str | None = field(default_factory=lambda: os.environ.get('CDN_URL'))
    
    @property
    def is_production(self) -> bool:
        """Check if running in production mode."""
        return self.app_env == 'production'
    
    @property
    def is_development(self) -> bool:
        """Check if running in development mode."""
        return self.app_env == 'development'
    
    def get_static_base_url(self) -> str:
        """Get the base URL for static assets."""
        return self.cdn_url or self.static_url


def _get_secret_key() -> str:
    """
    Get secret key from multiple sources (in priority order):
    1. SECRET_KEY environment variable
    2. Secret file (Kubernetes secrets, Docker secrets)
    3. Cloud-specific secret manager (via env var)
    4. Generate a random one for development/testing only
    """
    # Direct environment variable
    if secret := os.environ.get('SECRET_KEY'):
        return secret
    
    # Kubernetes/Docker secret file
    secret_paths = [
        '/run/secrets/secret_key',  # Docker secrets
        '/var/run/secrets/flask/secret_key',  # Kubernetes
        Path.home() / '.portfolio_secret_key',  # Local dev
    ]
    
    for path in secret_paths:
        try:
            path = Path(path)
            if path.exists():
                return path.read_text().strip()
        except (PermissionError, OSError):
            continue
    
    # Development/testing fallback - generate random key
    env = os.environ.get('FLASK_ENV', 'production')
    if env in ('development', 'testing'):
        import secrets
        return secrets.token_hex(32)
    
    # Production without secret key is an error
    raise ValueError(
        "SECRET_KEY not configured. Set SECRET_KEY environment variable "
        "or mount a secret file at /run/secrets/secret_key"
    )


@lru_cache(maxsize=1)
def get_config() -> CloudConfig:
    """Get the singleton cloud configuration."""
    return CloudConfig()


# Convenience functions
def get_env() -> CloudEnvironment:
    """Get the current cloud environment."""
    return get_config().environment


def get_region() -> str:
    """Get the current cloud region (provider-agnostic)."""
    # Check provider-specific region variables
    region_vars = [
        'REGION',  # Generic
        'AWS_REGION',
        'AWS_DEFAULT_REGION',
        'GOOGLE_CLOUD_REGION',
        'AZURE_REGION',
        'FLY_REGION',
        'RAILWAY_REGION',
        'RENDER_REGION',
    ]
    
    for var in region_vars:
        if region := os.environ.get(var):
            return region
    
    return 'local'
