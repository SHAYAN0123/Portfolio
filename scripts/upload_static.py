#!/usr/bin/env python3
"""
Script to upload static assets to S3 and optionally invalidate CloudFront cache.

Usage:
    python scripts/upload_static.py --bucket portfolio-static-assets
    python scripts/upload_static.py --bucket portfolio-static-assets --cloudfront E1234567890ABC
"""
from __future__ import annotations

import argparse
import mimetypes
import os
import sys
from pathlib import Path

try:
    import boto3
    from botocore.exceptions import ClientError
except ImportError:
    print("Error: boto3 is required. Install with: pip install boto3")
    sys.exit(1)


# MIME type mappings for web assets
MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject',
}

# Cache control settings
CACHE_CONTROL = {
    '.html': 'no-cache, no-store, must-revalidate',
    '.css': 'public, max-age=31536000, immutable',
    '.js': 'public, max-age=31536000, immutable',
    '.png': 'public, max-age=31536000',
    '.jpg': 'public, max-age=31536000',
    '.jpeg': 'public, max-age=31536000',
    '.gif': 'public, max-age=31536000',
    '.svg': 'public, max-age=31536000',
    '.ico': 'public, max-age=31536000',
    '.woff': 'public, max-age=31536000',
    '.woff2': 'public, max-age=31536000',
}


def get_content_type(file_path: Path) -> str:
    """Get the content type for a file."""
    ext = file_path.suffix.lower()
    return MIME_TYPES.get(ext, mimetypes.guess_type(str(file_path))[0] or 'application/octet-stream')


def get_cache_control(file_path: Path) -> str:
    """Get cache control header for a file."""
    ext = file_path.suffix.lower()
    return CACHE_CONTROL.get(ext, 'public, max-age=86400')


def upload_to_s3(
    static_dir: Path,
    bucket_name: str,
    prefix: str = 'static',
    region: str = 'eu-north-1'
) -> list[str]:
    """
    Upload static files to S3.
    
    Args:
        static_dir: Local directory containing static files
        bucket_name: S3 bucket name
        prefix: S3 key prefix (default: 'static')
        region: AWS region
        
    Returns:
        List of uploaded file keys
    """
    s3_client = boto3.client('s3', region_name=region)
    uploaded_files = []
    
    for file_path in static_dir.rglob('*'):
        if file_path.is_file():
            # Skip hidden files and Python cache
            if any(part.startswith('.') or part == '__pycache__' for part in file_path.parts):
                continue
            
            relative_path = file_path.relative_to(static_dir)
            s3_key = f"{prefix}/{relative_path}"
            
            content_type = get_content_type(file_path)
            cache_control = get_cache_control(file_path)
            
            try:
                s3_client.upload_file(
                    str(file_path),
                    bucket_name,
                    s3_key,
                    ExtraArgs={
                        'ContentType': content_type,
                        'CacheControl': cache_control,
                    }
                )
                uploaded_files.append(s3_key)
                print(f"✓ Uploaded: {s3_key}")
                
            except ClientError as e:
                print(f"✗ Failed to upload {s3_key}: {e}")
    
    return uploaded_files


def invalidate_cloudfront(distribution_id: str, paths: list[str] | None = None) -> str:
    """
    Create a CloudFront cache invalidation.
    
    Args:
        distribution_id: CloudFront distribution ID
        paths: List of paths to invalidate (default: invalidate all)
        
    Returns:
        Invalidation ID
    """
    cf_client = boto3.client('cloudfront')
    
    if paths is None:
        paths = ['/*']
    
    import time
    caller_reference = f"portfolio-deploy-{int(time.time())}"
    
    response = cf_client.create_invalidation(
        DistributionId=distribution_id,
        InvalidationBatch={
            'Paths': {
                'Quantity': len(paths),
                'Items': paths
            },
            'CallerReference': caller_reference
        }
    )
    
    invalidation_id = response['Invalidation']['Id']
    print(f"✓ Created CloudFront invalidation: {invalidation_id}")
    return invalidation_id


def main():
    parser = argparse.ArgumentParser(description='Upload static assets to S3')
    parser.add_argument('--bucket', required=True, help='S3 bucket name')
    parser.add_argument('--prefix', default='static', help='S3 key prefix')
    parser.add_argument('--region', default='eu-north-1', help='AWS region')
    parser.add_argument('--cloudfront', help='CloudFront distribution ID to invalidate')
    parser.add_argument('--static-dir', default='static', help='Local static directory')
    
    args = parser.parse_args()
    
    # Find project root
    project_root = Path(__file__).parent.parent
    static_dir = project_root / args.static_dir
    
    if not static_dir.exists():
        print(f"Error: Static directory not found: {static_dir}")
        sys.exit(1)
    
    print(f"Uploading static files from {static_dir} to s3://{args.bucket}/{args.prefix}/")
    print("-" * 60)
    
    # Upload files
    uploaded = upload_to_s3(static_dir, args.bucket, args.prefix, args.region)
    
    print("-" * 60)
    print(f"Uploaded {len(uploaded)} files")
    
    # Invalidate CloudFront if specified
    if args.cloudfront:
        print(f"\nInvalidating CloudFront distribution {args.cloudfront}...")
        invalidate_cloudfront(args.cloudfront)
    
    print("\n✓ Done!")


if __name__ == '__main__':
    main()
