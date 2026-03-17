"""Main routes for the portfolio SPA.

Serves the React SPA shell for all page routes. The SPA handles
client-side routing via React Router. API data is served via /api/*.
"""

from __future__ import annotations

from flask import Blueprint, abort, render_template

main_bp = Blueprint("main", __name__)


@main_bp.route("/", defaults={"path": ""})
@main_bp.route("/<path:path>")
def spa(path: str) -> str:
    """Serve the React SPA shell for all page routes.

    API, static, and health routes are excluded and handled by their
    own blueprints. Everything else gets the SPA shell so React Router
    can handle client-side navigation and deep links.
    """
    excluded = ("api/", "static/", "health", "healthz", "live", "livez",
                "ready", "readyz", "version", "info", "metrics", "debug")
    if path.startswith(excluded):
        abort(404)
    return render_template("spa.html")
