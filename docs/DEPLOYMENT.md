# Cloud-Agnostic Deployment Guide

This portfolio application is designed to run on **any cloud platform or container environment**. Choose your preferred deployment method below.

## Table of Contents

1. [Quick Start (Docker)](#quick-start-docker)
2. [Docker Compose (Self-Hosted)](#docker-compose-self-hosted)
3. [Railway (Free Tier)](#railway-free)
4. [Render (Free Tier)](#render-free)
5. [Fly.io (Free Tier)](#flyio-free)
6. [Kubernetes (Any Provider)](#kubernetes)
7. [Helm Chart](#helm-chart)
8. [Environment Variables](#environment-variables)

---

## Quick Start (Docker)

Run the application locally with Docker:

```bash
# Build the image
docker build -t portfolio .

# Run the container
docker run -p 8000:8000 \
  -e SECRET_KEY=$(openssl rand -hex 32) \
  -e FLASK_ENV=production \
  portfolio

# Access at http://localhost:8000
```

---

## Docker Compose (Self-Hosted)

### Development

```bash
# Copy environment file
cp .env.example .env

# Edit .env and set SECRET_KEY
nano .env

# Start the application
docker compose up

# Access at http://localhost:8000
```

### Production

```bash
# Set required environment variables
export SECRET_KEY=$(openssl rand -hex 32)

# Start with production config
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# With Nginx reverse proxy
docker compose --profile with-nginx up -d
```

---

## Railway (Free)

Railway offers a free tier with 500 hours/month.

### One-Click Deploy

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/portfolio)

### Manual Deploy

1. Install Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```

2. Login and initialize:
   ```bash
   railway login
   railway init
   ```

3. Set environment variables:
   ```bash
   railway variables set SECRET_KEY=$(openssl rand -hex 32)
   railway variables set FLASK_ENV=production
   ```

4. Deploy:
   ```bash
   railway up
   ```

### railway.json (Optional)

Create `railway.json` in project root:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "DOCKERFILE",
    "dockerfilePath": "Dockerfile"
  },
  "deploy": {
    "healthcheckPath": "/health",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

---

## Render (Free)

Render offers a free tier for web services.

### One-Click Deploy

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

### Manual Deploy

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: portfolio
   - **Runtime**: Docker
   - **Instance Type**: Free
5. Add environment variables:
   - `SECRET_KEY`: Generate with `openssl rand -hex 32`
   - `FLASK_ENV`: `production`
6. Click "Create Web Service"

### render.yaml (Optional)

Create `render.yaml` in project root:

```yaml
services:
  - type: web
    name: portfolio
    runtime: docker
    plan: free
    healthCheckPath: /health
    envVars:
      - key: SECRET_KEY
        generateValue: true
      - key: FLASK_ENV
        value: production
      - key: PORT
        value: 8000
```

---

## Fly.io (Free)

Fly.io offers a free tier with 3 shared-cpu VMs.

### Setup

1. Install Fly CLI:
   ```bash
   # macOS
   brew install flyctl
   
   # Linux/WSL
   curl -L https://fly.io/install.sh | sh
   ```

2. Login:
   ```bash
   fly auth login
   ```

3. Launch:
   ```bash
   fly launch
   ```

4. Set secrets:
   ```bash
   fly secrets set SECRET_KEY=$(openssl rand -hex 32)
   ```

5. Deploy:
   ```bash
   fly deploy
   ```

### fly.toml

Create `fly.toml` in project root:

```toml
app = "portfolio"
primary_region = "iad"

[build]
  dockerfile = "Dockerfile"

[env]
  FLASK_ENV = "production"
  PORT = "8080"

[http_service]
  internal_port = 8080
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 0

[[http_service.checks]]
  grace_period = "10s"
  interval = "30s"
  method = "GET"
  timeout = "5s"
  path = "/health"
```

---

## Kubernetes

Works on any Kubernetes cluster: EKS, GKE, AKS, k3s, minikube, etc.

### Prerequisites

- kubectl configured
- Access to a Kubernetes cluster

### Using Kustomize

```bash
# Development (single replica, debug logging)
kubectl apply -k k8s/overlays/development

# Production (3 replicas, HPA enabled)
kubectl apply -k k8s/overlays/production
```

### Manual Deployment

```bash
# Create namespace
kubectl create namespace portfolio

# Create secret
kubectl create secret generic portfolio-secrets \
  --namespace portfolio \
  --from-literal=SECRET_KEY=$(openssl rand -hex 32)

# Apply manifests
kubectl apply -f k8s/base/

# Check status
kubectl get pods -n portfolio
kubectl get svc -n portfolio
```

### Port Forward (for testing)

```bash
kubectl port-forward svc/portfolio 8000:80 -n portfolio
# Access at http://localhost:8000
```

---

## Helm Chart

For parameterized deployments across environments.

### Install

```bash
# Add values
helm install portfolio ./helm/portfolio \
  --namespace portfolio \
  --create-namespace \
  --set secrets.secretKey=$(openssl rand -hex 32) \
  --set ingress.hosts[0].host=portfolio.yourdomain.com
```

### Upgrade

```bash
helm upgrade portfolio ./helm/portfolio \
  --namespace portfolio \
  --set image.tag=v1.1.0
```

### Uninstall

```bash
helm uninstall portfolio --namespace portfolio
```

### Custom Values

Create `values-production.yaml`:

```yaml
replicaCount: 3

image:
  repository: ghcr.io/shayan0123/portfolio
  tag: "v1.0.0"

ingress:
  enabled: true
  hosts:
    - host: muhammadshayan.dev
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: portfolio-tls
      hosts:
        - muhammadshayan.dev

config:
  flaskEnv: production
  logLevel: WARNING
  workers: "4"

resources:
  limits:
    cpu: 1000m
    memory: 1Gi
  requests:
    cpu: 200m
    memory: 256Mi
```

Install with custom values:

```bash
helm install portfolio ./helm/portfolio \
  -f values-production.yaml \
  --set secrets.secretKey=$(openssl rand -hex 32)
```

---

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `SECRET_KEY` | Yes | - | Flask secret key (32+ chars) |
| `FLASK_ENV` | No | `production` | Environment: development/production |
| `PORT` | No | `8000` | HTTP port |
| `WORKERS` | No | `4` | Gunicorn worker processes |
| `LOG_LEVEL` | No | `INFO` | Logging level |
| `DATABASE_URL` | No | - | Database connection string |
| `REDIS_URL` | No | - | Redis connection string |
| `SENTRY_DSN` | No | - | Sentry error tracking |
| `CDN_URL` | No | - | CDN URL for static assets |

### Generate Secret Key

```bash
# Python
python -c "import secrets; print(secrets.token_hex(32))"

# OpenSSL
openssl rand -hex 32

# /dev/urandom
head -c 32 /dev/urandom | xxd -p -c 64
```

---

## Health Check Endpoints

All platforms can use these endpoints for health monitoring:

| Endpoint | Purpose | Used By |
|----------|---------|---------|
| `/health` | Basic liveness check | Load balancers |
| `/healthz` | Kubernetes liveness | Kubernetes |
| `/ready` | Readiness check | Load balancers |
| `/readyz` | Kubernetes readiness | Kubernetes |
| `/live` | Liveness probe | Container orchestrators |
| `/version` | Version info | Monitoring |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Cloud-Agnostic App                       │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Config    │  │   Secrets   │  │      Health         │  │
│  │  (cloud.py) │  │ (secrets.py)│  │    (health.py)      │  │
│  └──────┬──────┘  └──────┬──────┘  └──────────┬──────────┘  │
│         │                │                     │             │
│         ▼                ▼                     ▼             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                   Flask App (app.py)                  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
       ┌──────────┐    ┌──────────┐    ┌──────────┐
       │  Docker  │    │   K8s    │    │   PaaS   │
       │ Compose  │    │  (Any)   │    │(Railway, │
       │          │    │          │    │ Render,  │
       │          │    │          │    │ Fly.io)  │
       └──────────┘    └──────────┘    └──────────┘
```

---

## Migrating from AWS Lambda

If you were using AWS Lambda with Zappa:

1. **Keep your existing deployment** - It still works!
2. **Or migrate to containers** - Use the Docker deployment methods above

The same codebase runs on both serverless and containers thanks to the cloud-agnostic design.
