"""Input sanitization utilities.

This module provides functions to sanitize user input to prevent
XSS attacks and other security vulnerabilities.
"""

from __future__ import annotations

import json
import re
from typing import Any

import bleach

# Allowed HTML tags for rich text content (if needed)
ALLOWED_TAGS: list[str] = [
    "a",
    "abbr",
    "acronym",
    "b",
    "blockquote",
    "code",
    "em",
    "i",
    "li",
    "ol",
    "p",
    "strong",
    "ul",
]

# Allowed HTML attributes
ALLOWED_ATTRIBUTES: dict[str, list[str]] = {
    "a": ["href", "title", "rel"],
    "abbr": ["title"],
    "acronym": ["title"],
}

# Allowed URL schemes
ALLOWED_PROTOCOLS: list[str] = ["http", "https", "mailto"]


def sanitize_input(value: str | None, strip: bool = True) -> str:
    """Sanitize user input by removing potentially dangerous content.

    Args:
        value: The input string to sanitize
        strip: Whether to strip whitespace from the result

    Returns:
        Sanitized string safe for use
    """
    if value is None:
        return ""

    # Convert to string if necessary
    text = str(value)

    # Remove all HTML tags for plain text fields
    cleaned = bleach.clean(text, tags=[], strip=True)

    # Normalize whitespace
    cleaned = re.sub(r"\s+", " ", cleaned)

    if strip:
        cleaned = cleaned.strip()

    return cleaned


def sanitize_html(value: str | None) -> str:
    """Sanitize HTML content while preserving allowed tags.

    Use this for fields that should allow some HTML formatting.

    Args:
        value: The HTML string to sanitize

    Returns:
        Sanitized HTML string with only allowed tags
    """
    if value is None:
        return ""

    return bleach.clean(
        str(value),
        tags=ALLOWED_TAGS,
        attributes=ALLOWED_ATTRIBUTES,
        protocols=ALLOWED_PROTOCOLS,
        strip=True,
    )


def sanitize_email(email: str | None) -> str:
    """Sanitize and validate email format.

    Args:
        email: The email string to sanitize

    Returns:
        Sanitized email string in lowercase
    """
    if email is None:
        return ""

    # Basic sanitization and convert to lowercase
    return sanitize_input(email).lower()


def sanitize_url(url: str | None) -> str:
    """Sanitize URL to prevent XSS via javascript: or data: URLs.

    Args:
        url: The URL string to sanitize

    Returns:
        Sanitized URL or empty string if invalid
    """
    if url is None:
        return ""

    cleaned = sanitize_input(url)

    # Only allow http, https, and mailto protocols
    allowed_protocols = ["http://", "https://", "mailto:"]
    if not any(cleaned.startswith(proto) for proto in allowed_protocols):
        return ""

    return cleaned


def escape_for_json(value: Any) -> str:
    """Escape a value for safe inclusion in JSON.

    Args:
        value: The value to escape

    Returns:
        JSON-safe string
    """
    return json.dumps(str(value))[1:-1]  # Remove surrounding quotes
