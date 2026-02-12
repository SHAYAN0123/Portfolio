"""Flask extensions initialization.

This module initializes Flask extensions that are used throughout the application.
Extensions are initialized without an app instance and bound later in the app factory.
"""

from __future__ import annotations

from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_talisman import Talisman
from flask_wtf.csrf import CSRFProtect

# CSRF Protection
csrf = CSRFProtect()

# Rate Limiting
limiter = Limiter(
    key_func=get_remote_address,
    default_limits=["100 per hour", "20 per minute"],
    storage_uri="memory://",
)

# Security Headers
talisman = Talisman()
