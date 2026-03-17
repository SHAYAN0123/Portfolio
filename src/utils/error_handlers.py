"""Error handlers for the application.

Returns JSON responses for all errors so the React SPA and API
consumers both get machine-readable error information.
"""

from __future__ import annotations

from typing import TYPE_CHECKING

from flask import jsonify

if TYPE_CHECKING:
    from werkzeug.exceptions import HTTPException


def handle_400(error: HTTPException) -> tuple:
    return jsonify({"error": "Bad Request", "message": str(error)}), 400


def handle_403(error: HTTPException) -> tuple:
    return jsonify({"error": "Forbidden", "message": str(error)}), 403


def handle_404(error: HTTPException) -> tuple:
    return jsonify({"error": "Not Found", "message": str(error)}), 404


def handle_429(error: HTTPException) -> tuple:
    return jsonify({"error": "Too Many Requests", "message": "Rate limit exceeded. Please try again later."}), 429


def handle_500(error: HTTPException) -> tuple:
    return jsonify({"error": "Internal Server Error", "message": "Something went wrong on our end."}), 500
