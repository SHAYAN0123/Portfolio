# =============================================================================
# Cloud-Agnostic Production Dockerfile
# =============================================================================
# Works on: AWS ECS/Fargate, Google Cloud Run, Azure Container Apps,
#           Kubernetes (any provider), Docker Compose, Railway, Render, Fly.io
# =============================================================================

# =============================================================================
# Frontend build stage
# =============================================================================
FROM node:20-slim AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --no-fund
COPY static/src/ ./static/src/
COPY tailwind.config.js postcss.config.js vite.config.js ./
COPY templates/ ./templates/
RUN npm run build

# Build stage
FROM python:3.11-slim AS builder

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /app/wheels -r requirements.txt

# =============================================================================
# Production stage
# =============================================================================
FROM python:3.11-slim AS production

# Labels for container registries
LABEL org.opencontainers.image.title="Portfolio Website"
LABEL org.opencontainers.image.description="Cloud-agnostic Flask portfolio website"
LABEL org.opencontainers.image.source="https://github.com/SHAYAN0123/Portfolio"
LABEL org.opencontainers.image.vendor="Muhammad Shayan"

# Create non-root user for security (works on all platforms)
RUN groupadd -r portfolio && useradd -r -g portfolio portfolio

WORKDIR /app

# Install runtime dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    tini \
    && rm -rf /var/lib/apt/lists/*

# Copy wheels from builder and install
COPY --from=builder /app/wheels /wheels
COPY --from=builder /app/requirements.txt .
RUN pip install --no-cache /wheels/* && rm -rf /wheels

# Copy application code
COPY src/ ./src/
COPY templates/ ./templates/
COPY static/ ./static/

# Copy built frontend assets from frontend-builder
COPY --from=frontend-builder /app/static/dist ./static/dist

# Create necessary directories with proper permissions
RUN mkdir -p logs data && chown -R portfolio:portfolio /app

# Switch to non-root user
USER portfolio

# =============================================================================
# Environment Configuration (Cloud-Agnostic)
# =============================================================================
# These can be overridden by any platform:
# - Docker: docker run -e PORT=8080
# - Kubernetes: ConfigMap/env
# - Railway/Render: Dashboard env vars
# - Cloud Run: --set-env-vars
# =============================================================================

ENV FLASK_APP=src.app:create_app \
    FLASK_ENV=production \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    # Default port (override with PORT env var)
    PORT=8000 \
    # Workers auto-calculated based on CPU
    WORKERS=4 \
    # Graceful shutdown timeout
    GRACEFUL_TIMEOUT=30

# Expose default port (actual port from $PORT env var)
EXPOSE 8000

# =============================================================================
# Health Check (works with all orchestrators)
# =============================================================================
# Kubernetes: Uses /healthz and /readyz probes defined in manifests
# Docker: Uses HEALTHCHECK below
# Cloud Run: Uses /health
# =============================================================================
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:${PORT}/health || exit 1

# =============================================================================
# Entrypoint with proper signal handling
# =============================================================================
# Using tini for proper PID 1 signal handling (graceful shutdown)
ENTRYPOINT ["/usr/bin/tini", "--"]

# Run with gunicorn (production WSGI server)
# - Binds to $PORT (Cloud Run, Railway, Render requirement)
# - Workers based on $WORKERS env var
# - Access logs to stdout for cloud logging
CMD ["sh", "-c", "gunicorn --bind 0.0.0.0:${PORT} --workers ${WORKERS} --threads 2 --access-logfile - --error-logfile - --capture-output --timeout ${GRACEFUL_TIMEOUT} 'src.app:create_app()'"]
