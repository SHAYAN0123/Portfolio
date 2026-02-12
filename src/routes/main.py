"""Main routes for the portfolio website.

This module contains the main routes for the portfolio website,
including the home page, about page, and projects page.
"""

from __future__ import annotations

from flask import Blueprint, render_template

main_bp = Blueprint("main", __name__)


@main_bp.route("/")
def index() -> str:
    """Render the home page.

    Returns:
        Rendered HTML template for the home page
    """
    return render_template(
        "pages/index.html",
        title="Home",
        meta_description="Welcome to my portfolio website",
    )


@main_bp.route("/about")
def about() -> str:
    """Render the about page.

    Returns:
        Rendered HTML template for the about page
    """
    return render_template(
        "pages/about.html",
        title="About Me",
        meta_description="Learn more about me and my background",
    )


@main_bp.route("/projects")
def projects() -> str:
    """Render the projects page.

    Returns:
        Rendered HTML template for the projects page
    """
    # Sample project data - replace with your actual projects
    project_list = [
        {
            "id": 1,
            "title": "Project One",
            "description": "A description of your first project.",
            "technologies": ["Python", "Flask", "PostgreSQL"],
            "link": "#",
            "image": "project1.jpg",
        },
        {
            "id": 2,
            "title": "Project Two",
            "description": "A description of your second project.",
            "technologies": ["JavaScript", "React", "Node.js"],
            "link": "#",
            "image": "project2.jpg",
        },
        {
            "id": 3,
            "title": "Project Three",
            "description": "A description of your third project.",
            "technologies": ["Python", "Machine Learning", "TensorFlow"],
            "link": "#",
            "image": "project3.jpg",
        },
    ]

    return render_template(
        "pages/projects.html",
        title="Projects",
        meta_description="View my portfolio of projects",
        projects=project_list,
    )


@main_bp.route("/skills")
def skills() -> str:
    """Render the skills page.

    Returns:
        Rendered HTML template for the skills page
    """
    skill_categories = [
        {
            "name": "Programming Languages",
            "skills": ["Python", "JavaScript", "TypeScript", "SQL"],
        },
        {
            "name": "Frameworks & Libraries",
            "skills": ["Flask", "React", "FastAPI", "Django"],
        },
        {
            "name": "Tools & Technologies",
            "skills": ["Git", "Docker", "AWS", "PostgreSQL"],
        },
    ]

    return render_template(
        "pages/skills.html",
        title="Skills",
        meta_description="View my technical skills and expertise",
        skill_categories=skill_categories,
    )
