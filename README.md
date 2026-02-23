# AuditAI – Intelligent Invoice Reconciliation Agent

An AI-powered system that performs three-way invoice matching between Purchase Orders, Invoices, and Delivery Notes.

## Tech Stack

### Backend
- **FastAPI** (Python) - REST API framework
- **SQLite** - Database (in-memory for MVP)
- **Pydantic** - Data validation
- **OpenAI API** - AI integration (placeholder)

### Frontend
- **React** (Vite) - Modern React framework
- **TailwindCSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Router** - Navigation

## Quick Start

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
```

3. Activate virtual environment:
```bash
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Set up environment variables (optional):
```bash
# Create .env file
OPENAI_API_KEY=your_openai_api_key_here
```

6. Run the backend:
```bash
python main.py
```

Backend will run on: `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the frontend:
```bash
npm run dev
```

Frontend will run on: `http://localhost:5173`

## API Endpoints

### Upload Documents
- `POST /api/upload-po` - Upload Purchase Order
- `POST /api/upload-invoice` - Upload Invoice
- `POST /api/upload-delivery` - Upload Delivery Note

### Audit Operations
- `POST /api/run-audit` - Run three-way reconciliation
- `GET /api/get-documents` - Get all uploaded documents

### Document Format

All documents should be in JSON format:

```json
{
  "vendor": "ABC Supplies",
  "amount": 10000,
  "date": "2026-02-01",
  "items": [
    {"name": "Steel Rod", "quantity": 50, "price": 100}
  ]
}
```

## Risk Scoring Logic

The audit system calculates risk scores as follows:

- **Starting Score**: 100
- **Deductions**:
  - 30 points for vendor mismatch
  - 30 points for amount mismatch
  - 20 points for quantity mismatch
  - 20 points for date mismatch (>30 days)

- **Status Classification**:
  - **Safe**: 80-100 points
  - **Warning**: 50-79 points
  - **Critical**: 0-49 points

## Features

### Landing Page
- Hero section with product overview
- Three-way matching explanation
- Navigation to dashboard

### Dashboard
- Three document upload cards
- JSON text input areas
- Sample data loader for testing
- Run Audit functionality

### Results Page
- Risk score display with color coding
- Status badge (Safe/Warning/Critical)
- Detailed mismatch table
- Red highlighting for discrepancies

## Project Structure

```
├── backend/
│   ├── main.py              # FastAPI application
│   ├── requirements.txt     # Python dependencies
│   ├── models/              # Pydantic models
│   ├── routers/             # API routes
│   ├── services/            # Business logic
│   └── utils/               # Utility functions
├── frontend/
│   ├── src/
│   │   ├── pages/           # React components
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── package.json         # Node dependencies
│   └── vite.config.js       # Vite configuration
└── README.md                # This file
```

## Development Notes

- The backend uses in-memory storage for the MVP
- OpenAI integration is prepared but uses placeholder functions
- All JSON inputs are validated using Pydantic models
- Frontend includes error handling and loading states
- Dark theme with blue accent colors throughout

## Future Enhancements

- PDF document parsing
- Real database integration
- Advanced AI analysis
- User authentication
- Document history
- Export functionality
- Email notifications
