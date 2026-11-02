
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.auth import router as auth_router
from app.routers.enquiries import router as enquiries_router
from app.routers.admin_enquiries import router as admin_enquiries_router
from app.routers.progress_updates import router as progress_updates_router

app = FastAPI(
    title="BRAND-ROOTS API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Welcome to BRAND-ROOTS API"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}


app.include_router(auth_router)
app.include_router(enquiries_router)
app.include_router(admin_enquiries_router)
app.include_router(progress_updates_router)