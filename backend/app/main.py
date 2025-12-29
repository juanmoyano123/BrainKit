from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import auth, decks, flashcards, health, mnemonics, pdf, study
from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url=f"{settings.API_V1_STR}/docs",
    redoc_url=f"{settings.API_V1_STR}/redoc",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(health.router, prefix=settings.API_V1_STR, tags=["health"])
app.include_router(auth.router, prefix=settings.API_V1_STR, tags=["auth"])
app.include_router(decks.router, prefix=settings.API_V1_STR, tags=["decks"])
app.include_router(mnemonics.router, prefix=settings.API_V1_STR, tags=["mnemonics"])
app.include_router(flashcards.router, prefix=settings.API_V1_STR, tags=["flashcards"])
app.include_router(pdf.router, prefix=settings.API_V1_STR, tags=["pdf"])
app.include_router(study.router, prefix=settings.API_V1_STR, tags=["study"])


@app.get("/")
async def root():
    return {"message": "BrainKit API", "version": "0.1.0"}
