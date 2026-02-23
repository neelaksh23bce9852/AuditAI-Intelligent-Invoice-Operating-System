from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from routers import upload, audit, ai_analysis

# Load environment variables
load_dotenv()

app = FastAPI(title="AuditAI - Intelligent Invoice Reconciliation Agent", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router, prefix="/api", tags=["upload"])
app.include_router(audit.router, prefix="/api", tags=["audit"])
app.include_router(ai_analysis.router, prefix="/api", tags=["ai-analysis"])

@app.get("/")
async def root():
    return {"message": "AuditAI API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
