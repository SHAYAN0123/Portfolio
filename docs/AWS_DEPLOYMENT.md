# AWS Deployment Guide 🚀

This guide covers deploying the portfolio to AWS using the **serverless** approach with Lambda + API Gateway.

## Architecture Overview

```
Route 53 (DNS) → CloudFront (CDN) → API Gateway → Lambda (Flask)
                      ↓
                 S3 (Static Assets)
```

**Cost: ~$0-5/month** (within AWS Free Tier for low traffic)

---

## Prerequisites

1. **AWS Account** with IAM user having these permissions:
   - `AWSLambdaFullAccess`
   - `AmazonAPIGatewayAdministrator`
   - `AmazonS3FullAccess`
   - `CloudFrontFullAccess`
   - `AmazonRoute53FullAccess` (for custom domain)
   - `IAMFullAccess` (for Zappa role creation)

2. **AWS CLI** configured:
   ```bash
   aws configure
   # Enter your AWS Access Key ID, Secret, and region (eu-north-1)
   ```

3. **Python 3.11** (matches Lambda runtime)

---

## Quick Start

### 1. Install Dependencies

```bash
cd /Users/mshayan/Desktop/PORTFOLIO
source .venv/bin/activate
pip install -r requirements.txt
```

### 2. Deploy to Development

```bash
# First deployment
zappa deploy dev

# Subsequent updates
zappa update dev
```

### 3. Deploy to Production

```bash
# First deployment
zappa deploy prod

# Subsequent updates
zappa update prod
```

---

## Configuration

### Environment Variables

Set these in `zappa_settings.json` or AWS Secrets Manager:

| Variable | Description |
|----------|-------------|
| `SECRET_KEY` | Flask secret key (use Secrets Manager in prod) |
| `FLASK_ENV` | `development` or `production` |
| `STATIC_S3_BUCKET` | S3 bucket for static files |
| `CLOUDFRONT_URL` | CloudFront distribution URL |

### AWS Secrets Manager

Store sensitive values in Secrets Manager:

```bash
aws secretsmanager create-secret \
  --name portfolio/production \
  --secret-string '{"SECRET_KEY":"your-super-secret-key","DATABASE_URL":"..."}'
```

---

## Static Assets Setup

### Create S3 Bucket

```bash
# Create bucket
aws s3 mb s3://portfolio-static-assets --region eu-north-1

# Enable static hosting
aws s3 website s3://portfolio-static-assets \
  --index-document index.html \
  --error-document error.html

# Set bucket policy for public read
aws s3api put-bucket-policy --bucket portfolio-static-assets --policy '{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::portfolio-static-assets/*"
  }]
}'
```

### Upload Static Files

```bash
python scripts/upload_static.py --bucket portfolio-static-assets
```

---

## CloudFront Setup (CDN)

### Create Distribution

```bash
aws cloudfront create-distribution \
  --origin-domain-name portfolio-static-assets.s3.eu-north-1.amazonaws.com \
  --default-root-object index.html
```

Or use the AWS Console for more control over settings.

### SSL Certificate

1. Go to **AWS Certificate Manager** (must be in `us-east-1` for CloudFront)
2. Request a public certificate for `muhammadshayan.dev`
3. Validate via DNS (add CNAME record)
4. Update `zappa_settings.json` with the certificate ARN

---

## Custom Domain Setup

### Route 53

1. Create a hosted zone for `muhammadshayan.dev`
2. Update your domain registrar's nameservers to Route 53's

### Connect to API Gateway

```bash
# Create custom domain in Zappa
zappa certify prod
```

Or manually:
1. Go to API Gateway → Custom Domain Names
2. Create domain `muhammadshayan.dev`
3. Add the SSL certificate
4. Create base path mapping to your API

---

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/aws-deploy.yml`) handles:

1. **On Pull Request**: Tests → Security scan → Deploy to staging
2. **On Push to main**: Tests → Security scan → Deploy to production

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `AWS_ACCESS_KEY_ID` | IAM user access key |
| `AWS_SECRET_ACCESS_KEY` | IAM user secret key |
| `STATIC_S3_BUCKET` | S3 bucket name |
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront distribution ID |

Add these in: **GitHub Repo → Settings → Secrets and variables → Actions**

---

## Useful Commands

```bash
# View logs
zappa tail dev
zappa tail prod

# Check status
zappa status dev
zappa status prod

# Rollback
zappa rollback prod -n 1

# Undeploy
zappa undeploy dev
zappa undeploy prod

# Invoke function directly
zappa invoke prod "from src.app import create_app; app = create_app(); print('OK')"
```

---

## Monitoring

### CloudWatch Logs

```bash
# View recent logs
aws logs tail /aws/lambda/portfolio-prod --follow
```

### Set Up Alarms

```bash
aws cloudwatch put-metric-alarm \
  --alarm-name "Portfolio-5xxErrors" \
  --metric-name 5XXError \
  --namespace AWS/ApiGateway \
  --statistic Sum \
  --period 300 \
  --threshold 5 \
  --comparison-operator GreaterThanThreshold \
  --evaluation-periods 1
```

---

## Cost Breakdown

| Service | Free Tier | Estimated Cost |
|---------|-----------|----------------|
| Lambda | 1M requests/month | $0 |
| API Gateway | 1M requests/month | $0 |
| S3 | 5GB storage | $0 |
| CloudFront | 1TB transfer/month | $0 |
| Route 53 | - | $0.50/month |

**Total: ~$0.50/month** (mostly free tier)

---

## Troubleshooting

### "Task timed out"
- Increase `timeout_seconds` in `zappa_settings.json`
- Check for slow database queries

### "Unable to import module"
- Check Python version matches Lambda runtime
- Verify all dependencies are in `requirements.txt`

### Static files not loading
- Check S3 bucket permissions
- Verify CloudFront distribution is deployed
- Check CORS settings if needed

### Cold start latency
- Enable `keep_warm: true` in production
- Consider Provisioned Concurrency for high-traffic sites

---

## Security Best Practices

- ✅ Use AWS Secrets Manager for sensitive values
- ✅ Enable AWS WAF on CloudFront
- ✅ Use least-privilege IAM roles
- ✅ Enable CloudTrail for auditing
- ✅ Regular security scans with Bandit
- ✅ Keep dependencies updated

---

## Support

For issues:
1. Check CloudWatch logs: `zappa tail prod`
2. Review API Gateway metrics
3. Test health endpoint: `curl https://muhammadshayan.dev/health`
