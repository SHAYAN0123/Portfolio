# Portfolio Website

An industry-standard Python Flask portfolio website with comprehensive compliance features including security (OWASP), accessibility (WCAG 2.1 AA), and privacy (GDPR).

## Features

- 🔒 **Security First**: OWASP-compliant with CSRF protection, rate limiting, security headers, and input sanitization
- ♿ **Accessible**: WCAG 2.1 AA compliant with semantic HTML, ARIA attributes, and keyboard navigation
- 🛡️ **Privacy Focused**: GDPR-compliant with cookie consent and privacy policy
- 📱 **Responsive**: Mobile-first design that works on all devices
- 🧪 **Well Tested**: Comprehensive test suite with pytest
- 🚀 **Production Ready**: Docker support, CI/CD pipeline, and deployment configurations

## Tech Stack

- **Backend**: Python 3.10+, Flask 3.x
- **Templating**: Jinja2
- **Styling**: CSS with accessibility features
- **Security**: Flask-Talisman, Flask-WTF (CSRF), Flask-Limiter
- **Testing**: pytest, pytest-cov
- **Code Quality**: Black, Ruff, mypy, isort, Bandit
- **CI/CD**: GitHub Actions
- **Containerization**: Docker

## Quick Start

### Prerequisites

- Python 3.10 or higher
- pip (Python package manager)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio-website.git
   cd portfolio-website
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements-dev.txt
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Run the development server**
   ```bash
   flask run
   ```

6. **Open your browser**
   Navigate to `http://127.0.0.1:5000`

## Development

### Code Quality

```bash
# Format code with Black
black src/ tests/

# Sort imports with isort
isort src/ tests/

# Lint with Ruff
ruff check src/ tests/

# Type check with mypy
mypy src/

# Security scan with Bandit
bandit -r src/
```

### Pre-commit Hooks

Install pre-commit hooks to automatically check code quality:

```bash
pre-commit install
```

### Running Tests

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=src --cov-report=html

# Run specific test categories
pytest -m security
pytest -m accessibility
```

## Project Structure

```
portfolio-website/
├── src/                    # Application source code
│   ├── app.py              # Application factory
│   ├── extensions.py       # Flask extensions
│   ├── config/             # Configuration settings
│   ├── routes/             # Route blueprints
│   ├── forms/              # WTForms definitions
│   └── utils/              # Utility functions
├── templates/              # Jinja2 templates
│   ├── base.html           # Base template
│   ├── pages/              # Page templates
│   ├── components/         # Reusable components
│   └── errors/             # Error pages
├── static/                 # Static assets
│   ├── css/                # Stylesheets
│   └── js/                 # JavaScript files
├── tests/                  # Test suite
├── .github/                # GitHub configuration
│   ├── workflows/          # CI/CD workflows
│   └── copilot-instructions.md
├── requirements.txt        # Production dependencies
├── requirements-dev.txt    # Development dependencies
├── pyproject.toml          # Project configuration
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Docker Compose configuration
└── README.md               # This file
```

## Deployment

### Docker

```bash
# Build the image
docker build -t portfolio-website .

# Run the container
docker run -p 8000:8000 portfolio-website

# Or use Docker Compose
docker-compose up -d
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `SECRET_KEY` | Flask secret key | `dev-secret-key-change-me` |
| `FLASK_ENV` | Environment mode | `development` |
| `LOG_LEVEL` | Logging level | `INFO` |

See `.env.example` for all available options.

## Compliance

### Security (OWASP)

- ✅ CSRF protection on all forms
- ✅ Security headers (CSP, HSTS, X-Frame-Options)
- ✅ Input validation and sanitization
- ✅ Rate limiting on sensitive endpoints
- ✅ Secure session management

### Accessibility (WCAG 2.1 AA)

- ✅ Semantic HTML structure
- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Skip links for screen readers
- ✅ Color contrast compliance
- ✅ Focus indicators

### Privacy (GDPR)

- ✅ Cookie consent banner
- ✅ Privacy policy page
- ✅ Data minimization
- ✅ Secure data handling

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Security

For security concerns, please read our [Security Policy](SECURITY.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
