from fastapi import FastAPI, Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response

from app.api.routes import auth, decks, flashcards, health, mnemonics, pdf, study
from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url=f"{settings.API_V1_STR}/docs",
    redoc_url=f"{settings.API_V1_STR}/redoc",
)


# Custom CORS middleware that handles everything
class CORSCustomMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Get origin from request
        origin = request.headers.get("origin", "")

        # Check if origin is allowed
        is_allowed = origin in settings.CORS_ORIGINS or not origin

        # Handle OPTIONS (preflight) requests
        if request.method == "OPTIONS":
            if is_allowed:
                return Response(
                    status_code=200,
                    headers={
                        "Access-Control-Allow-Origin": origin,
                        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                        "Access-Control-Allow-Headers": "Authorization, Content-Type",
                        "Access-Control-Allow-Credentials": "true",
                        "Access-Control-Max-Age": "600",
                    },
                )
            else:
                return Response(status_code=403)

        # Handle actual requests
        response = await call_next(request)

        # Add CORS headers to response
        if is_allowed:
            response.headers["Access-Control-Allow-Origin"] = origin
            response.headers["Access-Control-Allow-Credentials"] = "true"
            response.headers["Access-Control-Expose-Headers"] = "*"

        return response


# Add CORS middleware
app.add_middleware(CORSCustomMiddleware)

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
