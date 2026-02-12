"""Pytest configuration and fixtures."""

from __future__ import annotations

from collections.abc import Generator
from typing import TYPE_CHECKING

import pytest

from src.app import create_app

if TYPE_CHECKING:
    from flask import Flask
    from flask.testing import FlaskClient


@pytest.fixture
def app() -> Generator[Flask, None, None]:
    """Create and configure a test application instance.

    Yields:
        Flask application configured for testing
    """
    app = create_app("testing")

    # Create application context
    with app.app_context():
        yield app


@pytest.fixture
def client(app: Flask) -> FlaskClient:
    """Create a test client for the application.

    Args:
        app: Flask application instance

    Returns:
        Flask test client
    """
    return app.test_client()


@pytest.fixture
def runner(app: Flask):
    """Create a CLI runner for the application.

    Args:
        app: Flask application instance

    Returns:
        Flask CLI test runner
    """
    return app.test_cli_runner()
