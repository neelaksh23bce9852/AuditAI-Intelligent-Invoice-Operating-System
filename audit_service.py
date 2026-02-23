from models.audit_result import AuditResult, Mismatch
from typing import Dict, Any

class AuditService:
    def __init__(self):
        pass
    
    def perform_audit(self, po: Dict[str, Any], invoice: Dict[str, Any], delivery: Dict[str, Any]) -> AuditResult:
        risk_score = 100
        mismatches = []
        
        # Compare vendor names
        if po.get("vendor", "").lower() != invoice.get("vendor", "").lower():
            risk_score -= 30
            mismatches.append(Mismatch(
                field="vendor",
                expected=po.get("vendor"),
                actual=invoice.get("vendor")
            ))
        
        # Compare total amounts
        po_amount = float(po.get("amount", 0))
        invoice_amount = float(invoice.get("amount", 0))
        if abs(po_amount - invoice_amount) > 0.01:
            risk_score -= 30
            mismatches.append(Mismatch(
                field="amount",
                po=po_amount,
                invoice=invoice_amount
            ))
        
        # Compare item quantities
        po_items = {item["name"]: item["quantity"] for item in po.get("items", [])}
        delivery_items = {item["name"]: item["quantity"] for item in delivery.get("items", [])}
        
        for item_name, po_qty in po_items.items():
            if item_name in delivery_items:
                if po_qty != delivery_items[item_name]:
                    risk_score -= 20
                    mismatches.append(Mismatch(
                        field=f"quantity_{item_name}",
                        po=po_qty,
                        delivery=delivery_items[item_name]
                    ))
            else:
                risk_score -= 20
                mismatches.append(Mismatch(
                    field=f"quantity_{item_name}",
                    po=po_qty,
                    delivery=0
                ))
        
        # Compare dates (basic check - within 30 days)
        from datetime import datetime
        po_date = datetime.strptime(po.get("date", ""), "%Y-%m-%d")
        invoice_date = datetime.strptime(invoice.get("date", ""), "%Y-%m-%d")
        
        if abs((invoice_date - po_date).days) > 30:
            risk_score -= 20
            mismatches.append(Mismatch(
                field="date",
                expected=po.get("date"),
                actual=invoice.get("date")
            ))
        
        # Determine status
        if risk_score >= 80:
            status = "Safe"
        elif risk_score >= 50:
            status = "Warning"
        else:
            status = "Critical"
        
        return AuditResult(
            risk_score=max(0, risk_score),
            status=status,
            mismatches=mismatches
        )
