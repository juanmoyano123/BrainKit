from functools import lru_cache

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # API
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "BrainKit API"
    DEBUG: bool = True

    # Database
    DATABASE_URL: str = "postgresql://brainkit:brainkit@localhost:5434/brainkit"

    # CORS
    CORS_ORIGINS: list[str] = ["http://localhost:3000"]

    # Auth (Supabase - to be configured)
    SUPABASE_URL: str = ""
    SUPABASE_ANON_KEY: str = ""
    SUPABASE_SERVICE_ROLE_KEY: str = ""

    # Claude API
    CLAUDE_API_KEY: str = ""

    class Config:
        env_file = ".env"
        case_sensitive = True


@lru_cache()
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
