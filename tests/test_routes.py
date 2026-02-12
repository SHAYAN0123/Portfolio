"""Tests for main routes."""

from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from flask.testing import FlaskClient


class TestMainRoutes:
    """Test cases for main routes."""

    def test_index_page(self, client: FlaskClient) -> None:
        """Test that index page loads successfully."""
        response = client.get("/")
        assert response.status_code == 200
        assert b"Welcome" in response.data or b"Portfolio" in response.data

    def test_about_page(self, client: FlaskClient) -> None:
        """Test that about page loads successfully."""
        response = client.get("/about")
        assert response.status_code == 200
        assert b"About" in response.data

    def test_projects_page(self, client: FlaskClient) -> None:
        """Test that projects page loads successfully."""
        response = client.get("/projects")
        assert response.status_code == 200
        assert b"Projects" in response.data

    def test_skills_page(self, client: FlaskClient) -> None:
        """Test that skills page loads successfully."""
        response = client.get("/skills")
        assert response.status_code == 200
        assert b"Skills" in response.data

    def test_404_page(self, client: FlaskClient) -> None:
        """Test that 404 page is returned for non-existent routes."""
        response = client.get("/non-existent-page")
        assert response.status_code == 404
