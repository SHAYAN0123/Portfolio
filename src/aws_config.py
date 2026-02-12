"""AWS-specific configuration and utilities.

This module provides integration with AWS services like Secrets Manager,
S3 for static files, and environment-specific configurations for Lambda.
"""
from __future__ import annotations

import json
import os
from functools import lru_cache
from typing import Any


def is_lambda_environment() -> bool:
    """Check if running in AWS Lambda environment."""
    return bool(os.environ.get('AWS_LAMBDA_FUNCTION_NAME'))


def get_aws_region() -> str:
    """Get the current AWS region."""
    return os.environ.get('AWS_REGION', 'eu-north-1')


@lru_cache(maxsize=32)
def get_secret(secret_name: str) -> dict[str, Any]:
    """
    Retrieve a secret from AWS Secrets Manager.
    
    Args:
        secret_name: Name of the secret in AWS Secrets Manager
        
    Returns:
        Dictionary containing the secret key-value pairs
        
    Raises:
        Exception: If secret cannot be retrieved
    """
    if not is_lambda_environment():
        # Return empty dict in local development
        return {}
    
    import boto3
    from botocore.exceptions import ClientError
    
    client = boto3.client('secretsmanager', region_name=get_aws_region())
    
    try:
        response = client.get_secret_value(SecretId=secret_name)
        
        if 'SecretString' in response:
            return json.loads(response['SecretString'])
        else:
            # Binary secret
            import base64
            return json.loads(base64.b64decode(response['SecretBinary']))
            
    except ClientError as e:
        raise Exception(f"Failed to retrieve secret {secret_name}: {e}")


def get_secret_value(secret_name: str, key: str, default: str = '') -> str:
    """
    Get a specific value from a secret.
    
    Args:
        secret_name: Name of the secret
        key: Key within the secret
        default: Default value if not found
        
    Returns:
        The secret value or default
    """
    try:
        secrets = get_secret(secret_name)
        return secrets.get(key, default)
    except Exception:
        return default


class AWSConfig:
    """AWS-specific configuration for the portfolio app."""
    
    # S3 bucket for static assets (used in production)
    STATIC_BUCKET = os.environ.get('STATIC_S3_BUCKET', 'portfolio-static-assets')
    
    # CloudFront distribution URL for static assets
    CLOUDFRONT_URL = os.environ.get('CLOUDFRONT_URL', '')
    
    # Secret name in AWS Secrets Manager
    SECRET_NAME = os.environ.get('AWS_SECRET_NAME', 'portfolio/production')
    
    @classmethod
    def get_static_url(cls) -> str:
        """Get the base URL for static assets."""
        if cls.CLOUDFRONT_URL:
            return cls.CLOUDFRONT_URL
        elif cls.STATIC_BUCKET:
            return f"https://{cls.STATIC_BUCKET}.s3.amazonaws.com"
        else:
            return '/static'
    
    @classmethod
    def get_secret_key(cls) -> str:
        """Get Flask secret key from environment or Secrets Manager."""
        # First try environment variable
        secret_key = os.environ.get('SECRET_KEY')
        if secret_key and secret_key != 'change-me-in-aws-secrets-manager':
            return secret_key
        
        # Try AWS Secrets Manager in Lambda
        if is_lambda_environment():
            return get_secret_value(cls.SECRET_NAME, 'SECRET_KEY', 'fallback-dev-key')
        
        # Local development fallback
        return 'dev-secret-key-change-in-production'
    
    @classmethod
    def get_database_url(cls) -> str:
        """Get database URL from Secrets Manager or environment."""
        # First try environment variable
        db_url = os.environ.get('DATABASE_URL')
        if db_url:
            return db_url
        
        # Try AWS Secrets Manager in Lambda
        if is_lambda_environment():
            return get_secret_value(cls.SECRET_NAME, 'DATABASE_URL', 'sqlite:///portfolio.db')
        
        # Local development fallback
        return 'sqlite:///portfolio.db'


# Lambda handler wrapper for production
def lambda_handler(event, context):
    """
    AWS Lambda entry point.
    This is used by Zappa but can also be called directly.
    """
    from src.app import create_app
    from aws_wsgi import response
    
    app = create_app('production')
    return response(app, event, context)
