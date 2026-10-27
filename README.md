@'
# BRAND-ROOTS

**From Roots to Recognition.**

BRAND-ROOTS is a business consulting and growth management platform.

## Portals

- Client Portal: Client registration, plans, project tracking, payments, milestones and deliverables.
- Team Portal: Internal client management, payment verification, project progress and team collaboration.

## Technology Stack

- Frontend: React, TypeScript, Vite
- Backend: Python, FastAPI
- Database: PostgreSQL
- ORM: SQLAlchemy
- Migrations: Alembic
- Authentication: JWT and Argon2

## Project Structure

- `frontend/` — Client Portal
- `backend/` — Shared API and business logic
- `data/` — Seed and reference data
- `docs/` — Project documentation
- `scripts/` — Development and maintenance scripts
- `tests/` — Automated tests

## Development

All development work is done on the `dev` branch.
Changes are merged into `main` through pull requests.
'@ | Set-Content -Path README.md -Encoding utf8