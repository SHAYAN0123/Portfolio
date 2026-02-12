"""Error handlers for the application.

This module contains custom error handlers that render accessible
error pages with proper HTTP status codes.
"""

from __future__ import annotations

from typing import TYPE_CHECKING

from flask import render_template

if TYPE_CHECKING:
    from werkzeug.exceptions import HTTPException


def handle_400(error: HTTPException) -> tuple[str, int]:
    """Handle 400 Bad Request errors.

    Args:
        error: The HTTP exception

    Returns:
        Tuple of rendered template and status code
    """
    return (
        render_template(
            "errors/400.html",
            title="Bad Request",
            error=error,
        ),
        400,
    )


def handle_403(error: HTTPException) -> tuple[str, int]:
    """Handle 403 Forbidden errors.

    Args:
        error: The HTTP exception

    Returns:
        Tuple of rendered template and status code
    """
    return (
        render_template(
            "errors/403.html",
            title="Forbidden",
            error=error,
        ),
        403,
    )


def handle_404(error: HTTPException) -> tuple[str, int]:
    """Handle 404 Not Found errors.

    Args:
        error: The HTTP exception

    Returns:
        Tuple of rendered template and status code
    """
    return (
        render_template(
            "errors/404.html",
            title="Page Not Found",
            error=error,
        ),
        404,
    )


def handle_429(error: HTTPException) -> tuple[str, int]:
    """Handle 429 Too Many Requests errors (rate limiting).

    Args:
        error: The HTTP exception

    Returns:
        Tuple of rendered template and status code
    """
    return (
        render_template(
            "errors/429.html",
            title="Too Many Requests",
            error=error,
        ),
        429,
    )


def handle_500(error: HTTPException) -> tuple[str, int]:
    """Handle 500 Internal Server Error.

    Args:
        error: The HTTP exception

    Returns:
        Tuple of rendered template and status code
    """
    return (
        render_template(
            "errors/500.html",
            title="Server Error",
            error=error,
        ),
        500,
    )
