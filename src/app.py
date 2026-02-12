"""Portfolio Website Application Factory.

This module contains the Flask application factory and configuration.
"""

from __future__ import annotations

import logging
import os
from logging.handlers import RotatingFileHandler
from pathlib import Path

from flask import Flask


def create_app(config_name: str | None = None) -> Flask:
    """Create and configure the Flask application.

    Args:
        config_name: Configuration environment name (development, testing, production)

    Returns:
        Configured Flask application instance
    """
    app = Flask(
        __name__,
        template_folder="../templates",
        static_folder="../static",
    )

    # Load configuration
    configure_app(app, config_name)

    # Initialize extensions
    init_extensions(app)

    # Register blueprints
    register_blueprints(app)

    # Register error handlers
    register_error_handlers(app)

    # Configure logging
    configure_logging(app)

    return app


def configure_app(app: Flask, config_name: str | None = None) -> None:
    """Configure application settings.

    Args:
        app: Flask application instance
        config_name: Configuration environment name
    """
    from src.config.settings import config

    env = config_name or os.environ.get("FLASK_ENV", "development")
    app.config.from_object(config[env])


def init_extensions(app: Flask) -> None:
    """Initialize Flask extensions.

    Args:
        app: Flask application instance
    """
    from src.extensions import csrf, limiter, talisman

    # Initialize CSRF protection
    csrf.init_app(app)

    # Initialize rate limiting
    limiter.init_app(app)

    # Initialize security headers (Talisman)
    # Only enable in production for HTTPS
    if not app.debug:
        talisman.init_app(
            app,
            force_https=True,
            strict_transport_security=True,
            session_cookie_secure=True,
            content_security_policy={
                "default-src": "'self'",
                "script-src": "'self'",
                "style-src": "'self' 'unsafe-inline'",
                "img-src": "'self' data:",
                "font-src": "'self'",
            },
        )
    else:
        # Development mode - relaxed security
        talisman.init_app(
            app,
            force_https=False,
            strict_transport_security=False,
            session_cookie_secure=False,
            content_security_policy=None,
        )


def register_blueprints(app: Flask) -> None:
    """Register application blueprints.

    Args:
        app: Flask application instance
    """
    from src.routes.contact import contact_bp
    from src.routes.main import main_bp
    from src.routes.privacy import privacy_bp
    from src.health import health_bp

    app.register_blueprint(main_bp)
    app.register_blueprint(contact_bp, url_prefix="/contact")
    app.register_blueprint(privacy_bp, url_prefix="/privacy")
    app.register_blueprint(health_bp)


def register_error_handlers(app: Flask) -> None:
    """Register error handlers.

    Args:
        app: Flask application instance
    """
    from src.utils.error_handlers import (
        handle_400,
        handle_403,
        handle_404,
        handle_429,
        handle_500,
    )

    app.register_error_handler(400, handle_400)
    app.register_error_handler(403, handle_403)
    app.register_error_handler(404, handle_404)
    app.register_error_handler(429, handle_429)
    app.register_error_handler(500, handle_500)


def configure_logging(app: Flask) -> None:
    """Configure application logging.

    Args:
        app: Flask application instance
    """
    log_level = app.config.get("LOG_LEVEL", "INFO")
    log_file = app.config.get("LOG_FILE", "logs/app.log")

    # Ensure logs directory exists
    log_path = Path(log_file)
    log_path.parent.mkdir(parents=True, exist_ok=True)

    # Configure file handler
    file_handler = RotatingFileHandler(
        log_file,
        maxBytes=10485760,  # 10MB
        backupCount=10,
    )
    file_handler.setFormatter(
        logging.Formatter(
            "%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]",
        ),
    )
    file_handler.setLevel(getattr(logging, log_level))

    # Configure app logger
    app.logger.addHandler(file_handler)
    app.logger.setLevel(getattr(logging, log_level))

    app.logger.info("Portfolio website startup")


def main() -> None:
    """Run the application in development mode."""
    app = create_app()
    host = os.environ.get("HOST", "127.0.0.1")
    port = int(os.environ.get("PORT", 5000))
    debug = os.environ.get("FLASK_ENV", "production") == "development"
    app.run(host=host, port=port, debug=debug)


if __name__ == "__main__":
    main()
