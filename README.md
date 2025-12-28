# BrainKit

AI-powered memorization platform that generates mnemonic techniques and flashcards with spaced repetition.

## Features

- ✅ **F-001: User Authentication** - Email/password and Google OAuth login with password reset
- 🚧 **F-002: Deck Management** - Create and organize flashcard decks (coming soon)
- 🚧 **F-003: AI Generation** - Generate flashcards from text using Claude AI (coming soon)
- 🚧 **F-004: Study Session** - Spaced repetition algorithm for effective learning (coming soon)
- 🚧 **F-005: Mnemonic Techniques** - AI-generated memory aids (coming soon)

## Tech Stack

**Frontend:**
- React 19 + TypeScript
- Vite
- TailwindCSS
- React Query + Zustand
- React Hook Form + Zod
- Supabase JS SDK

**Backend:**
- FastAPI (Python 3.11)
- SQLAlchemy 2.0
- Alembic (migrations)
- PostgreSQL 16
- Supabase Auth

**Production:**
- Supabase (Auth + DB)
- Vercel (frontend)
- Railway (backend)

## Quick Start

### Prerequisites
- Node.js 20+
- Python 3.11+
- Supabase account (create at https://supabase.com)

### Setup

1. **Clone and install dependencies:**
   ```bash
   git clone https://github.com/yourusername/BrainKit.git
   cd BrainKit
   make install
   ```

2. **Setup Supabase:**
   - Create a new project at https://app.supabase.com
   - Go to Settings > API to get your credentials
   - Enable Email auth in Authentication > Providers
   - (Optional) Configure Google OAuth

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials

   cd frontend
   cp .env.example .env
   # Edit frontend/.env with Supabase URL and Anon Key
   ```

4. **Run database migration:**
   ```bash
   cd backend
   alembic upgrade head
   ```

5. **Start development servers:**
   ```bash
   # Terminal 1 - Backend
   make dev-backend

   # Terminal 2 - Frontend
   make dev-frontend
   ```

6. **Open browser:**
   - Frontend: http://localhost:3000
   - API Docs: http://localhost:8000/api/v1/docs

For detailed setup instructions, see [F001_USER_AUTHENTICATION_SETUP.md](F001_USER_AUTHENTICATION_SETUP.md)

## Project Structure

```
BrainKit/
├── frontend/                          # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                   # Reusable UI components
│   │   │   └── auth/                 # Authentication components
│   │   ├── pages/                    # Page components
│   │   ├── stores/                   # Zustand state management
│   │   ├── lib/                      # Utilities and config
│   │   └── App.tsx                   # Main app component
│   └── package.json
├── backend/                           # FastAPI + Python
│   ├── app/
│   │   ├── api/routes/               # API endpoints
│   │   ├── core/                     # Configuration
│   │   ├── models/                   # SQLAlchemy models
│   │   ├── schemas/                  # Pydantic schemas
│   │   ├── services/                 # Business logic
│   │   └── main.py                   # FastAPI app
│   ├── alembic/                      # Database migrations
│   └── requirements.txt
├── docker/                            # Docker configurations
├── design/                            # Design system, wireframes
├── workflow/                          # Project documentation
└── F001_USER_AUTHENTICATION_SETUP.md # Feature setup guide
```

## Commands

| Command | Description |
|---------|-------------|
| `make install` | Install all dependencies |
| `make dev-frontend` | Start frontend (port 3000) |
| `make dev-backend` | Start backend (port 8000) |
| `make db-up` | Start PostgreSQL (local dev) |
| `make db-down` | Stop PostgreSQL |
| `make migrate` | Run migrations |
| `make test` | Run all tests |
| `make lint` | Run linters |

## API Documentation

When backend is running: http://localhost:8000/api/v1/docs

### Key Endpoints

**Authentication:**
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/logout` - Logout user
- `POST /api/v1/auth/forgot-password` - Request password reset
- `POST /api/v1/auth/reset-password` - Reset password
- `GET /api/v1/auth/me` - Get current user

## Development

### Running Tests

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
pytest
```

### Code Quality

```bash
# Frontend linting
cd frontend
npm run lint

# Backend linting
cd backend
ruff check .
```

## Deployment

See [F001_USER_AUTHENTICATION_SETUP.md](F001_USER_AUTHENTICATION_SETUP.md) for production deployment instructions.

## Contributing

This is a private project. See [workflow/](workflow/) for development guidelines.

## License

Private - All rights reserved
