from fastapi import APIRouter, HTTPException
from services.audit_service import AuditService
from services.llm_summary import generate_financial_summary
from models.audit_result import AuditResult
from routers.upload import po_data, invoice_data, delivery_data

router = APIRouter()

@router.post("/run-audit", response_model=AuditResult)
async def run_audit():
    try:
        if not po_data or not invoice_data or not delivery_data:
            raise HTTPException(status_code=400, detail="All three documents (PO, Invoice, Delivery) must be uploaded before running audit")
        
        audit_service = AuditService()
        result = audit_service.perform_audit(po_data, invoice_data, delivery_data)
        
        # Debug: Verify AI function is called
        print("AI FUNCTION CALLED")
        
        # Generate AI summary after calculations are complete
        ai_summary = generate_financial_summary(result.risk_score, result.mismatches)
        
        # Add AI summary to result
        result.ai_summary = ai_summary
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
