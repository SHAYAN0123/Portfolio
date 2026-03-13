"""Portfolio Website Application Factory.

This module contains the Flask application factory and configuration.
Cloud-agnostic - works on any platform: AWS, GCP, Azure, K8s, Docker, etc.
"""

from __future__ import annotations

import logging
import os
import sys
from logging.handlers import RotatingFileHandler
from pathlib import Path

from flask import Flask

from src.config.cloud import (
    CloudConfig,
    detect_environment,
    get_config,
    get_log_path,
    is_serverless_environment,
    is_container_environment,
)


def create_app(config_name: str | None = None) -> Flask:
    """Create and configure the Flask application.

    Args:
        config_name: Configuration environment name (development, testing, production)

    Returns:
        Configured Flask application instance
    """
    # Use absolute paths for Lambda compatibility
    import os
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    
    app = Flask(
        __name__,
        template_folder=os.path.join(base_dir, "templates"),
        static_folder=os.path.join(base_dir, "static"),
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
    
    cloud_config = get_config()

    # Initialize CSRF protection
    csrf.init_app(app)

    # Initialize rate limiting
    limiter.init_app(app)

    # Determine HTTPS settings based on environment
    # Serverless: Gateway handles HTTPS (AWS API Gateway, Cloud Run, etc.)
    # Container: Let reverse proxy handle HTTPS
    # Production: Force HTTPS
    force_https = (
        cloud_config.enable_https_redirect
        and not is_serverless_environment()
        and not app.debug
    )

    # Initialize security headers (Talisman)
    if force_https:
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
        # Development or serverless - relaxed security
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
    
    # Use cloud-agnostic log path detection
    log_dir = get_log_path()
    log_file = log_dir / "app.log"
    
    # Ensure log directory exists (may fail in serverless, that's OK)
    try:
        log_dir.mkdir(parents=True, exist_ok=True)
    except (OSError, PermissionError):
        pass

    # Configure file handler (if possible)
    try:
        file_handler = RotatingFileHandler(
            str(log_file),
            maxBytes=10485760,  # 10MB
            backupCount=10,
        )
        file_handler.setFormatter(
            logging.Formatter(
                "%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]",
            ),
        )
        file_handler.setLevel(getattr(logging, log_level))
        app.logger.addHandler(file_handler)
    except (OSError, PermissionError):
        # Can't write to file (serverless/read-only), use stdout
        pass

    # Always add stream handler for container/cloud logging
    stream_handler = logging.StreamHandler(sys.stdout)
    stream_handler.setFormatter(
        logging.Formatter(
            "%(asctime)s %(levelname)s: %(message)s",
        ),
    )
    stream_handler.setLevel(getattr(logging, log_level))
    app.logger.addHandler(stream_handler)

    app.logger.setLevel(getattr(logging, log_level))
    
    # Log startup info
    cloud_env = detect_environment()
    app.logger.info(f"Portfolio website startup - Environment: {cloud_env.value}")


def main() -> None:
    """Run the application in development mode."""
    app = create_app()
    host = os.environ.get("HOST", "127.0.0.1")
    port = int(os.environ.get("PORT", 5000))
    debug = os.environ.get("FLASK_ENV", "production") == "development"
    app.run(host=host, port=port, debug=debug)


# WSGI app instance for Zappa/Lambda
_app_error = None
try:
    app = create_app()
except Exception as e:
    _app_error = str(e)
    import traceback
    _app_error = traceback.format_exc()
    # Fallback minimal app for debugging
    from flask import Flask, jsonify
    app = Flask(__name__)
    
    @app.route('/')
    def error_handler():
        return jsonify({"error": _app_error}), 500
    
    @app.route('/health')
    def health():
        return jsonify({"status": "error", "error": _app_error}), 500


if __name__ == "__main__":
    main()
