.PHONY: help install dev-frontend dev-backend dev db-up db-down db-reset migrate migrate-new test test-backend test-frontend lint format

# Default target
help:
	@echo "BrainKit Development Commands"
	@echo ""
	@echo "  make install        - Install all dependencies"
	@echo "  make dev-frontend   - Start frontend dev server"
	@echo "  make dev-backend    - Start backend dev server"
	@echo "  make dev            - Start both frontend and backend"
	@echo "  make db-up          - Start PostgreSQL container"
	@echo "  make db-down        - Stop PostgreSQL container"
	@echo "  make db-reset       - Reset database (delete volumes)"
	@echo "  make migrate        - Run database migrations"
	@echo "  make migrate-new    - Create new migration"
	@echo "  make test           - Run all tests"
	@echo "  make lint           - Run linters"
	@echo "  make format         - Format code"

# Install dependencies
install:
	cd frontend && npm install
	cd backend && pip install -r requirements.txt

# Development servers
dev-frontend:
	cd frontend && npm run dev

dev-backend:
	cd backend && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

dev:
	@echo "Start frontend and backend in separate terminals:"
	@echo "  Terminal 1: make dev-frontend"
	@echo "  Terminal 2: make dev-backend"

# Database
db-up:
	docker compose -f docker/docker-compose.yml up -d

db-down:
	docker compose -f docker/docker-compose.yml down

db-reset:
	docker compose -f docker/docker-compose.yml down -v
	docker compose -f docker/docker-compose.yml up -d

# Migrations
migrate:
	cd backend && python3 -m alembic upgrade head

migrate-new:
	@read -p "Migration message: " msg; \
	cd backend && python3 -m alembic revision --autogenerate -m "$$msg"

# Testing
test:
	cd backend && pytest
	cd frontend && npm run test

test-backend:
	cd backend && pytest -v

test-frontend:
	cd frontend && npm run test

# Code quality
lint:
	cd backend && ruff check .
	cd frontend && npm run lint

format:
	cd backend && ruff format .
	cd frontend && npm run format
