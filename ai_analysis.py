from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
from services.llm_summary import generate_financial_summary

router = APIRouter()

class AIAnalysisRequest(BaseModel):
    risk_score: int
    mismatches: List[Dict[str, Any]]

class AIAnalysisResponse(BaseModel):
    ai_summary: str

@router.post("/ai-analysis", response_model=AIAnalysisResponse)
async def run_ai_analysis(request: AIAnalysisRequest):
    """
    Generate AI-powered financial analysis for audit results.
    
    This endpoint provides independent AI analysis without modifying the original audit.
    """
    try:
        print("AI ANALYSIS ENDPOINT CALLED")
        print(f"Risk Score: {request.risk_score}")
        print(f"Mismatches Count: {len(request.mismatches)}")
        
        # Generate AI summary
        ai_summary = generate_financial_summary(request.risk_score, request.mismatches)
        
        return {"ai_summary": ai_summary}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI analysis failed: {str(e)}")
