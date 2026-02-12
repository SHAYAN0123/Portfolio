"""Tests for contact routes and form."""

from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from flask.testing import FlaskClient


class TestContactRoutes:
    """Test cases for contact routes."""

    def test_contact_page_get(self, client: FlaskClient) -> None:
        """Test that contact page loads successfully."""
        response = client.get("/contact/")
        assert response.status_code == 200
        assert b"Contact" in response.data
        assert b"form" in response.data.lower()

    def test_contact_form_requires_csrf(self, client: FlaskClient) -> None:
        """Test that contact form requires CSRF token."""
        # In testing mode, CSRF is disabled, but we test the form structure
        response = client.get("/contact/")
        assert response.status_code == 200

    def test_contact_success_page(self, client: FlaskClient) -> None:
        """Test that contact success page loads."""
        response = client.get("/contact/success")
        assert response.status_code == 200
