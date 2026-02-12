"""Application configuration settings.

This module contains configuration classes for different environments.
All sensitive values should be loaded from environment variables.
"""

from __future__ import annotations

import os
from pathlib import Path
from typing import Any

from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Base directory
BASE_DIR = Path(__file__).resolve().parent.parent.parent


class Config:
    """Base configuration with sensible defaults."""

    # Flask
    SECRET_KEY: str = os.environ.get("SECRET_KEY", "dev-secret-key-change-me")
    FLASK_ENV: str = os.environ.get("FLASK_ENV", "development")

    # Security
    SESSION_COOKIE_SECURE: bool = True
    SESSION_COOKIE_HTTPONLY: bool = True
    SESSION_COOKIE_SAMESITE: str = "Lax"
    PERMANENT_SESSION_LIFETIME: int = 3600  # 1 hour

    # CSRF
    WTF_CSRF_ENABLED: bool = True
    WTF_CSRF_TIME_LIMIT: int = 3600  # 1 hour

    # Rate Limiting
    RATELIMIT_ENABLED: bool = True
    RATELIMIT_DEFAULT: str = "100 per hour"
    RATELIMIT_STORAGE_URL: str = "memory://"

    # Logging
    LOG_LEVEL: str = os.environ.get("LOG_LEVEL", "INFO")
    LOG_FILE: str = os.environ.get("LOG_FILE", str(BASE_DIR / "logs" / "app.log"))

    # GDPR/Privacy
    COOKIE_CONSENT_REQUIRED: bool = True
    DATA_RETENTION_DAYS: int = 365

    @staticmethod
    def init_app(app: Any) -> None:
        """Initialize application-specific configuration."""


class DevelopmentConfig(Config):
    """Development configuration."""

    DEBUG: bool = True
    FLASK_ENV: str = "development"
    SESSION_COOKIE_SECURE: bool = False
    LOG_LEVEL: str = "DEBUG"


class TestingConfig(Config):
    """Testing configuration."""

    TESTING: bool = True
    DEBUG: bool = True
    WTF_CSRF_ENABLED: bool = False
    RATELIMIT_ENABLED: bool = False
    SESSION_COOKIE_SECURE: bool = False
    LOG_LEVEL: str = "DEBUG"


class ProductionConfig(Config):
    """Production configuration."""

    DEBUG: bool = False
    FLASK_ENV: str = "production"
    SESSION_COOKIE_SECURE: bool = True
    LOG_LEVEL: str = "WARNING"

    @classmethod
    def init_app(cls, app: Any) -> None:
        """Production-specific initialization."""
        Config.init_app(app)

        # Ensure SECRET_KEY is set in production
        if cls.SECRET_KEY == "dev-secret-key-change-me":
            raise ValueError("SECRET_KEY must be set in production!")


# Configuration dictionary
config: dict[str, type[Config]] = {
    "development": DevelopmentConfig,
    "testing": TestingConfig,
    "production": ProductionConfig,
    "default": DevelopmentConfig,
}
