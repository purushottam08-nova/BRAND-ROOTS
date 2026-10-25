from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.services import router as services_router
from app.api.enquiries import router as enquiries_router
from app.api.auth import router as auth_router
from app.api.admin_enquiries import router as admin_enquiries_router

app = FastAPI(
    title="BRAND-ROOTS API",
    description="Backend API for the BRAND-ROOTS growth platform.",
    version="1.0.0",
)

# Temporary local-development CORS configuration.
# We will restrict this to the actual frontend origin before deployment.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(services_router)
app.include_router(enquiries_router)
app.include_router(auth_router)
app.include_router(admin_enquiries_router)
@app.get("/")
def root():
    return {
        "message": "Welcome to BRAND-ROOTS API",
        "status": "running",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "brand-roots-backend",
    }
