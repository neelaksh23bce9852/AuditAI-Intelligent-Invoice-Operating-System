from pydantic import BaseModel
from typing import List, Optional

class Mismatch(BaseModel):
    field: str
    po: Optional[float] = None
    invoice: Optional[float] = None
    delivery: Optional[float] = None
    expected: Optional[str] = None
    actual: Optional[str] = None

class AuditResult(BaseModel):
    risk_score: int
    status: str
    mismatches: List[Mismatch]
    ai_summary: Optional[str] = None
