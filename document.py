from pydantic import BaseModel
from typing import List, Optional
from datetime import date

class Item(BaseModel):
    name: str
    quantity: int
    price: float

class Document(BaseModel):
    vendor: str
    amount: float
    date: date
    items: List[Item]
