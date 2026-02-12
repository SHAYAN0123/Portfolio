"""Privacy routes for the portfolio website.

This module handles GDPR compliance pages including privacy policy,
cookie policy, and data management.
"""

from __future__ import annotations

from flask import Blueprint, render_template

privacy_bp = Blueprint("privacy", __name__)


@privacy_bp.route("/policy")
def privacy_policy() -> str:
    """Render the privacy policy page.

    Returns:
        Rendered HTML template for privacy policy
    """
    return render_template(
        "pages/privacy_policy.html",
        title="Privacy Policy",
        meta_description="Our privacy policy and data handling practices",
    )


@privacy_bp.route("/cookies")
def cookie_policy() -> str:
    """Render the cookie policy page.

    Returns:
        Rendered HTML template for cookie policy
    """
    return render_template(
        "pages/cookie_policy.html",
        title="Cookie Policy",
        meta_description="Information about how we use cookies",
    )


@privacy_bp.route("/terms")
def terms() -> str:
    """Render the terms of service page.

    Returns:
        Rendered HTML template for terms of service
    """
    return render_template(
        "pages/terms.html",
        title="Terms of Service",
        meta_description="Terms and conditions for using this website",
    )
