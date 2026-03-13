"""Cloud-agnostic health check endpoints.

Implements industry-standard health check patterns for:
- Kubernetes liveness/readiness probes
- Container orchestrators (Docker Swarm, ECS, etc.)
- Load balancer health checks
- Serverless platforms (Lambda, Cloud Run, etc.)
- PaaS platforms (Railway, Render, Fly.io, Heroku)

Endpoints:
- /health - Basic liveness check (always 200 if app is running)
- /ready - Readiness check (200 if app is ready to serve traffic)
- /live - Kubernetes liveness probe alias
- /version - Application version and environment info
- /debug - Debug info (only in development)
"""

from flask import Blueprint, jsonify, current_app
from datetime import datetime, timezone
import os

from src.config.cloud import detect_environment, get_config, CloudEnvironment

health_bp = Blueprint('health', __name__)


@health_bp.route('/health')
@health_bp.route('/healthz')  # Kubernetes convention
def health_check():
    """
    Basic health/liveness check.
    
    Returns 200 if the application is running.
    Used by: Load balancers, Kubernetes liveness probes, container orchestrators.
    """
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now(timezone.utc).isoformat(),
        'service': 'portfolio'
    }), 200


@health_bp.route('/live')
@health_bp.route('/livez')  # Kubernetes convention
def liveness_check():
    """
    Kubernetes liveness probe endpoint.
    
    Should return 200 if the application process is alive.
    Should NOT check external dependencies (use /ready for that).
    """
    return jsonify({
        'status': 'alive',
        'timestamp': datetime.now(timezone.utc).isoformat()
    }), 200


@health_bp.route('/ready')
@health_bp.route('/readyz')  # Kubernetes convention
def readiness_check():
    """
    Readiness check - verifies app is ready to serve traffic.
    
    Used by: Kubernetes readiness probes, load balancers.
    Should check external dependencies (database, cache, etc.)
    """
    checks = {
        'app': True,
        # Add dependency checks as needed:
        # 'database': check_database_connection(),
        # 'cache': check_redis_connection(),
        # 'external_api': check_external_api(),
    }
    
    all_healthy = all(checks.values())
    status_code = 200 if all_healthy else 503
    
    return jsonify({
        'status': 'ready' if all_healthy else 'not_ready',
        'timestamp': datetime.now(timezone.utc).isoformat(),
        'checks': checks
    }), status_code


@health_bp.route('/version')
@health_bp.route('/info')
def version_info():
    """
    Application version and deployment info.
    
    Useful for debugging and monitoring deployments.
    Works on any cloud platform.
    """
    config = get_config()
    env = detect_environment()
    
    return jsonify({
        'version': config.app_version,
        'environment': config.app_env,
        'platform': env.value,
        'region': _get_region(),
        'timestamp': datetime.now(timezone.utc).isoformat()
    }), 200


@health_bp.route('/metrics')
def basic_metrics():
    """
    Basic metrics endpoint.
    
    For production, consider using prometheus_flask_exporter
    or similar for proper Prometheus metrics.
    """
    import sys
    
    return jsonify({
        'python_version': sys.version,
        'platform': detect_environment().value,
        'uptime': 'N/A',  # Would need process start time tracking
        'timestamp': datetime.now(timezone.utc).isoformat()
    }), 200


@health_bp.route('/debug')
def debug_info():
    """
    Debug endpoint - ONLY enabled in development.
    
    Returns detailed environment info for troubleshooting.
    Disabled in production for security.
    """
    config = get_config()
    
    # Only show debug info in development
    if config.is_production:
        return jsonify({
            'error': 'Debug endpoint disabled in production'
        }), 403
    
    env = detect_environment()
    
    return jsonify({
        'template_folder': current_app.template_folder,
        'static_folder': current_app.static_folder,
        'template_exists': os.path.exists(current_app.template_folder) if current_app.template_folder else False,
        'cwd': os.getcwd(),
        'platform': env.value,
        'platform_details': _get_platform_details(env),
        'config': {
            'debug': config.debug,
            'app_env': config.app_env,
            'host': config.host,
            'port': config.port,
        }
    }), 200


def _get_region() -> str:
    """Get cloud region from various provider env vars."""
    region_vars = [
        'REGION',
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


def _get_platform_details(env: CloudEnvironment) -> dict:
    """Get platform-specific details for debugging."""
    details = {'environment': env.value}
    
    if env == CloudEnvironment.AWS_LAMBDA:
        details['function'] = os.environ.get('AWS_LAMBDA_FUNCTION_NAME')
        details['memory'] = os.environ.get('AWS_LAMBDA_FUNCTION_MEMORY_SIZE')
    elif env == CloudEnvironment.GOOGLE_CLOUD_RUN:
        details['service'] = os.environ.get('K_SERVICE')
        details['revision'] = os.environ.get('K_REVISION')
    elif env == CloudEnvironment.FLY_IO:
        details['app'] = os.environ.get('FLY_APP_NAME')
        details['region'] = os.environ.get('FLY_REGION')
    elif env == CloudEnvironment.RAILWAY:
        details['environment'] = os.environ.get('RAILWAY_ENVIRONMENT')
    elif env == CloudEnvironment.KUBERNETES:
        details['namespace'] = os.environ.get('KUBERNETES_NAMESPACE', 'default')
        details['pod'] = os.environ.get('HOSTNAME')
    
    return details
