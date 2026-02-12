# Contributing to Portfolio Website

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## How to Contribute

### Reporting Bugs

1. Check existing issues to avoid duplicates
2. Use the bug report template
3. Include:
   - Clear description of the issue
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, Python version, browser)

### Suggesting Features

1. Check existing issues for similar suggestions
2. Use the feature request template
3. Describe:
   - The problem you're trying to solve
   - Your proposed solution
   - Alternative solutions considered

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Ensure all tests pass (`pytest`)
5. Ensure code quality checks pass:
   ```bash
   black src/ tests/
   isort src/ tests/
   ruff check src/ tests/
   mypy src/
   bandit -r src/
   ```
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## Development Setup

1. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/portfolio-website.git
   cd portfolio-website
   ```

2. Create virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements-dev.txt
   ```

4. Install pre-commit hooks:
   ```bash
   pre-commit install
   ```

## Coding Standards

### Python Code

- Follow PEP 8 style guidelines
- Use type hints for all functions
- Write docstrings for all public functions
- Keep functions focused and small
- Maximum line length: 88 characters (Black default)

### HTML Templates

- Use semantic HTML elements
- Include ARIA attributes for accessibility
- Follow WCAG 2.1 AA guidelines
- Test with screen readers when possible

### CSS

- Use CSS custom properties (variables)
- Mobile-first responsive design
- Maintain color contrast ratios (4.5:1 minimum)
- Use relative units (rem, em) over fixed pixels

### Testing

- Write tests for new features
- Maintain 80%+ code coverage
- Include accessibility tests for UI changes
- Include security tests for auth/input handling

## Commit Messages

Follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Test additions or modifications
- `chore:` Maintenance tasks

Example: `feat: add dark mode toggle to navigation`

## Review Process

1. All PRs require at least one review
2. CI checks must pass
3. No merge conflicts
4. Documentation updated if needed

## Questions?

Feel free to open an issue for any questions or concerns.
