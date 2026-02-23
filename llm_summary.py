import os
import json
import requests
from typing import List, Dict, Any

def generate_financial_summary(risk_score: int, mismatches: List[Dict[str, Any]]) -> str:
    """
    Generate AI-powered financial interpretation of audit results using direct API calls.
    """
    try:
        api_key = os.getenv("OPENAI_API_KEY")
        
        if not api_key:
            return "ERROR: OpenAI API key not found in environment. Please configure it in .env."

        # Calculate impact metrics for prompt
        overbilling_amount = 0
        underdelivery_qty = 0
        
        for m in mismatches:
            field = str(m.get('field', '')).lower()
            if 'amount' in field or 'price' in field:
                po_val = m.get('po', m.get('expected', 0))
                inv_val = m.get('invoice', m.get('actual', 0))
                try:
                    p = float(po_val) if po_val is not None else 0
                    i = float(inv_val) if inv_val is not None else 0
                    if i > p: overbilling_amount += (i - p)
                except: pass
            
            if 'quantity' in field or 'units' in field:
                po_qty = m.get('po', m.get('expected', 0))
                del_qty = m.get('delivery', m.get('actual', 0))
                try:
                    p = float(po_qty) if po_qty is not None else 0
                    d = float(del_qty) if del_qty is not None else 0
                    if p > d: underdelivery_qty += (p - d)
                except: pass

        prompt = f"""You are a senior financial audit analyst.

Audit Results:
Risk Score: {risk_score}
Mismatches: {json.dumps(mismatches, indent=2)}
Overbilling Amount: ₹{overbilling_amount}
Underdelivery Quantity: {underdelivery_qty} units

Explain:
1. Financial impact
2. Potential loss amount
3. Operational risk
4. Clear recommendation (Approve / Manual Review / High Risk)

Keep under 120 words.
Professional executive tone."""

        url = "https://api.openai.com/v1/chat/completions"
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}"
        }
        
        payload = {
            "model": "gpt-4o-mini",
            "messages": [
                {"role": "system", "content": "You are a senior financial audit analyst."},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.3,
            "max_tokens": 300
        }

        print(f"Calling OpenAI with prompt: {prompt[:100]}...")
        response = requests.post(url, headers=headers, json=payload, timeout=30)
        
        # Log full raw response for debugging as requested
        print(f"RAW OPENAI RESPONSE: {response.text}")
        
        if response.status_code != 200:
            return f"ERROR: AI API returned status {response.status_code}. Details: {response.text}"

        result = response.json()
        summary = result['choices'][0]['message']['content'].strip()
        return summary
        
    except Exception as e:
        print(f"AI summary exception: {str(e)}")
        return f"ERROR: System exception during AI analysis: {str(e)}"
