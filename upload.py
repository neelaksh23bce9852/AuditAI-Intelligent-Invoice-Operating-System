from fastapi import APIRouter, HTTPException
from models.document import Document
from typing import Dict, Any
import json

router = APIRouter()

po_data = {}
invoice_data = {}
delivery_data = {}

@router.post("/upload-po")
async def upload_po(document: Dict[str, Any]):
    try:
        po_data.update(document)
        return {"message": "PO uploaded successfully", "data": document}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/upload-invoice")
async def upload_invoice(document: Dict[str, Any]):
    try:
        invoice_data.update(document)
        return {"message": "Invoice uploaded successfully", "data": document}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/upload-delivery")
async def upload_delivery(document: Dict[str, Any]):
    try:
        delivery_data.update(document)
        return {"message": "Delivery note uploaded successfully", "data": document}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/get-documents")
async def get_documents():
    return {
        "po": po_data,
        "invoice": invoice_data,
        "delivery": delivery_data
    }
