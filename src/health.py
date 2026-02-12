"""Health check endpoints for AWS Lambda/ALB monitoring."""
from flask import Blueprint, jsonify
from datetime import datetime, timezone

health_bp = Blueprint('health', __name__)


@health_bp.route('/health')
def health_check():
    """
    Basic health check endpoint for AWS Lambda/ALB.
    Returns 200 OK if the application is running.
    """
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now(timezone.utc).isoformat(),
        'service': 'portfolio'
    }), 200


@health_bp.route('/ready')
def readiness_check():
    """
    Readiness check - verifies app is ready to serve traffic.
    Can be extended to check database connections, external services, etc.
    """
    checks = {
        'app': True,
        # Add more checks as needed:
        # 'database': check_database_connection(),
        # 'cache': check_redis_connection(),
    }
    
    all_healthy = all(checks.values())
    status_code = 200 if all_healthy else 503
    
    return jsonify({
        'status': 'ready' if all_healthy else 'not_ready',
        'timestamp': datetime.now(timezone.utc).isoformat(),
        'checks': checks
    }), status_code


@health_bp.route('/version')
def version_info():
    """
    Returns application version and deployment info.
    Useful for debugging and monitoring deployments.
    """
    import os
    return jsonify({
        'version': os.environ.get('APP_VERSION', '1.0.0'),
        'environment': os.environ.get('FLASK_ENV', 'development'),
        'region': os.environ.get('AWS_REGION', 'local'),
        'timestamp': datetime.now(timezone.utc).isoformat()
    }), 200
