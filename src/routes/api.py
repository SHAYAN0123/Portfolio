"""REST API routes for the portfolio SPA.

Provides JSON endpoints for contact form submission, CSRF token,
projects data, and skills data. Replaces the old template-rendering routes.
"""

from __future__ import annotations

from flask import Blueprint, current_app, jsonify, request
from flask_wtf.csrf import generate_csrf

from src.extensions import limiter
from src.utils.sanitize import sanitize_email, sanitize_input

api_bp = Blueprint("api", __name__)


@api_bp.route("/csrf-token", methods=["GET"])
def csrf_token() -> tuple:
    """Return a CSRF token for use with fetch requests.

    React fetches this once on mount and caches it.
    The token is sent back as X-CSRFToken header on POST requests.
    """
    token = generate_csrf()
    return jsonify({"csrf_token": token})


@api_bp.route("/contact", methods=["POST"])
@limiter.limit("5 per minute")
def contact() -> tuple:
    """Handle contact form submission via JSON API.

    Returns:
        JSON response with success/error status
    """
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"success": False, "error": "Invalid request body"}), 400

    name = sanitize_input((data.get("name") or "").strip())
    email = sanitize_email((data.get("email") or "").strip())
    subject = sanitize_input((data.get("subject") or "").strip())
    message = sanitize_input((data.get("message") or "").strip())

    errors = {}
    if not name or len(name) < 2:
        errors["name"] = "Name must be at least 2 characters"
    if not email or "@" not in email:
        errors["email"] = "A valid email address is required"
    if not subject or len(subject) < 5:
        errors["subject"] = "Subject must be at least 5 characters"
    if not message or len(message) < 10:
        errors["message"] = "Message must be at least 10 characters"

    if errors:
        return jsonify({"success": False, "errors": errors}), 422

    current_app.logger.info(
        "Contact form submission from %s <%s>: %s",
        name, email, subject,
    )

    return jsonify({"success": True, "message": "Thank you! I'll get back to you soon."})


@api_bp.route("/projects", methods=["GET"])
def get_projects() -> tuple:
    """Return the experience/projects list as JSON."""
    projects = [
        {
            "id": 1,
            "role": "Graduate Thesis Research Intern",
            "company": "Schuberg Philis",
            "period": "November 2025 – Present",
            "location": "Amsterdam, Netherlands",
            "current": True,
            "icon": "🔬",
            "borderColor": "border-emerald-500/60",
            "iconBg": "bg-emerald-500/15 border-emerald-500/20",
            "description": "Contributing to innovative projects at a leading mission-critical IT company, leveraging expertise in systems design and large language model development for my Master's thesis research.",
            "highlights": [],
            "tags": ["LLM Development", "Systems Design", "Research", "Python"],
            "badges": [],
        },
        {
            "id": 2,
            "role": "Scrum Master",
            "company": "Elisa",
            "period": "February 2025 – June 2025",
            "location": "Finland",
            "current": False,
            "icon": "📱",
            "borderColor": "border-primary-500/60",
            "iconBg": "bg-primary-500/15 border-primary-500/20",
            "description": "",
            "highlights": [
                "Directed a 4-member cross-functional team, delivering a cloud-deployed MVP",
                "Met WCAG 2.1 AA compliance for full accessibility",
                "Guided the team to implement 34+ automated tests across all components",
            ],
            "tags": ["Scrum", "Cloud MVP", "WCAG 2.1 AA", "Automated Testing"],
            "badges": [{"text": "♿ WCAG 2.1 AA", "type": "success"}, {"text": "🧪 34+ Tests", "type": "success"}],
        },
        {
            "id": 3,
            "role": "Business Analyst",
            "company": "Oak Street Technologies",
            "period": "May 2024 – August 2024",
            "location": "Islamabad, Pakistan",
            "current": False,
            "icon": "📊",
            "borderColor": "border-secondary-500/60",
            "iconBg": "bg-secondary-500/15 border-secondary-500/20",
            "description": "",
            "highlights": [
                "Selected as the only intern onboarded on two flagship projects",
                "Created detailed user stories improving project workflows",
                "Identified key areas for process optimization",
            ],
            "tags": ["Business Analysis", "User Stories", "Agile"],
            "badges": [{"text": "🏆 Only Intern on 2 Flagship Projects", "type": "warning"}],
        },
        {
            "id": 4,
            "role": "Front-End Developer",
            "company": "MRS Technologies",
            "period": "July 2023 – August 2023",
            "location": "Islamabad, Pakistan",
            "current": False,
            "icon": "🌿",
            "borderColor": "border-amber-500/60",
            "iconBg": "bg-amber-500/15 border-amber-500/20",
            "achievement": "⭐ Top 15 out of 13,000 candidates · \"High Potential Talent\" Award",
            "highlights": [
                "Led Frontend team for IoT-based microgreens plant monitoring system",
                "Collaborated with Backend, UI/UX & Embedded teams",
            ],
            "tags": ["IoT", "MQTT", "InfluxDB", "Grafana"],
            "badges": [{"text": "🏆 Top 15 of 13,000", "type": "warning"}, {"text": "⭐ High Potential Talent Award", "type": "warning"}],
        },
        {
            "id": 5,
            "role": "Frontend Web Developer",
            "company": "The Digital Robe",
            "period": "August 2022 – December 2022",
            "location": "Pakistan",
            "current": False,
            "icon": "🚀",
            "borderColor": "border-slate-500/60",
            "iconBg": "bg-white/5 border-white/10",
            "description": "Where it all began! Developed responsive company website using HTML, CSS, Bootstrap, and JavaScript.",
            "highlights": [],
            "tags": ["HTML", "CSS", "Bootstrap", "JavaScript"],
            "badges": [{"text": "🌟 The Beginning", "type": "default"}],
        },
    ]
    return jsonify(projects)


@api_bp.route("/skills", methods=["GET"])
def get_skills() -> tuple:
    """Return skill categories as JSON."""
    skills = [
        {
            "name": "Software Engineering",
            "icon": "💻",
            "description": "Building robust, scalable, and maintainable software solutions",
            "tags": ["Java", "Python", "JavaScript", "TypeScript", "OOP", "React", "Node.js", "Express.js", "Flask", "REST APIs", "HTML", "CSS", "Bootstrap", "Tailwind CSS", "Git", "GitHub", "Automated Testing", "WCAG 2.1 AA", "Responsive Design"],
        },
        {
            "name": "Product & Agile Leadership",
            "icon": "🎯",
            "description": "Bridging business needs with technical execution",
            "tags": ["Scrum Master", "Business Analysis", "Sprint Planning", "Retrospectives", "Backlog Refinement", "User Story Development", "Requirements Gathering", "Stakeholder Management", "Cross-functional Teams", "Process Optimization", "Workshop Facilitation"],
        },
        {
            "name": "Cloud, Data & AI",
            "icon": "🤖",
            "description": "Embracing cloud-native and LLM-driven development",
            "tags": ["AWS", "Docker", "Kubernetes", "Cloud Deployment", "CI/CD", "MongoDB", "SQL", "PostgreSQL", "InfluxDB", "Redis", "MQTT", "Grafana", "IoT Systems", "Systems Design", "Large Language Models", "AI-Assisted Development", "Data Visualization", "MVP Development"],
        },
    ]
    return jsonify(skills)
