"""Contact form with validation.

This module contains the contact form with proper validation,
CSRF protection, and accessibility features.
"""

from __future__ import annotations

from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Email, Length


class ContactForm(FlaskForm):
    """Contact form with validation and accessibility support."""

    name = StringField(
        "Name",
        validators=[
            DataRequired(message="Please enter your name"),
            Length(
                min=2,
                max=100,
                message="Name must be between 2 and 100 characters",
            ),
        ],
        render_kw={
            "placeholder": "Your name",
            "aria-label": "Your full name",
            "aria-required": "true",
            "autocomplete": "name",
            "class": "form-input",
        },
    )

    email = StringField(
        "Email",
        validators=[
            DataRequired(message="Please enter your email address"),
            Email(message="Please enter a valid email address"),
            Length(max=254, message="Email address is too long"),
        ],
        render_kw={
            "placeholder": "your.email@example.com",
            "aria-label": "Your email address",
            "aria-required": "true",
            "autocomplete": "email",
            "type": "email",
            "class": "form-input",
        },
    )

    subject = StringField(
        "Subject",
        validators=[
            DataRequired(message="Please enter a subject"),
            Length(
                min=5,
                max=200,
                message="Subject must be between 5 and 200 characters",
            ),
        ],
        render_kw={
            "placeholder": "What is this about?",
            "aria-label": "Message subject",
            "aria-required": "true",
            "class": "form-input",
        },
    )

    message = TextAreaField(
        "Message",
        validators=[
            DataRequired(message="Please enter your message"),
            Length(
                min=10,
                max=5000,
                message="Message must be between 10 and 5000 characters",
            ),
        ],
        render_kw={
            "placeholder": "Your message...",
            "aria-label": "Your message",
            "aria-required": "true",
            "rows": 6,
            "class": "form-textarea",
        },
    )
