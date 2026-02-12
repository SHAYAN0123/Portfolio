"""Accessibility tests for the application."""

from __future__ import annotations

from typing import TYPE_CHECKING

import pytest

if TYPE_CHECKING:
    from flask.testing import FlaskClient


@pytest.mark.accessibility
class TestAccessibility:
    """Test accessibility features."""

    def test_skip_link_present(self, client: FlaskClient) -> None:
        """Test that skip link is present on pages."""
        response = client.get("/")
        assert b"skip-link" in response.data or b"Skip to" in response.data

    def test_main_landmark_present(self, client: FlaskClient) -> None:
        """Test that main landmark is present."""
        response = client.get("/")
        assert b'role="main"' in response.data or b"<main" in response.data

    def test_lang_attribute_present(self, client: FlaskClient) -> None:
        """Test that lang attribute is set on html element."""
        response = client.get("/")
        assert b'lang="en"' in response.data

    def test_form_labels_present(self, client: FlaskClient) -> None:
        """Test that form inputs have labels."""
        response = client.get("/contact/")
        # Check for label elements
        assert b"<label" in response.data

    def test_aria_attributes_on_nav(self, client: FlaskClient) -> None:
        """Test that navigation has proper ARIA attributes."""
        response = client.get("/")
        assert b'role="navigation"' in response.data or b"aria-label" in response.data

    def test_images_have_alt_text(self, client: FlaskClient) -> None:
        """Test that images have alt attributes."""
        response = client.get("/")
        # Check for aria-label on image placeholders
        assert b"aria-label" in response.data or b"alt=" in response.data
