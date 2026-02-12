"""Contact routes for the portfolio website.

This module handles the contact form with proper validation,
sanitization, and CSRF protection.
"""

from __future__ import annotations

from flask import Blueprint, current_app, flash, redirect, render_template, url_for

from src.extensions import limiter
from src.forms.contact import ContactForm
from src.utils.sanitize import sanitize_input

contact_bp = Blueprint("contact", __name__)


@contact_bp.route("/", methods=["GET", "POST"])
@limiter.limit("5 per minute")
def contact() -> str:
    """Handle contact form display and submission.

    Returns:
        Rendered HTML template or redirect response
    """
    form = ContactForm()

    if form.validate_on_submit():
        # Sanitize all inputs
        name = sanitize_input(form.name.data)
        email = sanitize_input(form.email.data)
        subject = sanitize_input(form.subject.data)
        sanitized_message = sanitize_input(form.message.data)

        # Log the contact submission (in production, you'd save to DB or send email)
        current_app.logger.info(
            "Contact form submission from %s <%s>: %s - %s",
            name,
            email,
            subject,
            sanitized_message[:50] if sanitized_message else "",
        )

        flash(
            "Thank you for your message! I'll get back to you soon.",
            "success",
        )
        return redirect(url_for("contact.contact"))

    return render_template(
        "pages/contact.html",
        title="Contact",
        meta_description="Get in touch with me",
        form=form,
    )


@contact_bp.route("/success")
def success() -> str:
    """Display contact form success page.

    Returns:
        Rendered HTML template for success page
    """
    return render_template(
        "pages/contact_success.html",
        title="Message Sent",
        meta_description="Your message has been sent successfully",
    )
