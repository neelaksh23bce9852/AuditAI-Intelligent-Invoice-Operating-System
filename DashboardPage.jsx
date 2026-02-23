import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const DashboardPage = () => {
  const navigate = useNavigate()
  const [poData, setPoData] = useState('')
  const [invoiceData, setInvoiceData] = useState('')
  const [deliveryData, setDeliveryData] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sampleData = {
    po: `{
  "vendor": "ABC Supplies",
  "amount": 10000,
  "date": "2026-02-01",
  "items": [
    {"name": "Steel Rod", "quantity": 50, "price": 100},
    {"name": "Copper Wire", "quantity": 100, "price": 50}
  ]
}`,
    invoice: `{
  "vendor": "ABC Supplies",
  "amount": 12000,
  "date": "2026-02-05",
  "items": [
    {"name": "Steel Rod", "quantity": 50, "price": 120},
    {"name": "Copper Wire", "quantity": 100, "price": 60}
  ]
}`,
    delivery: `{
  "vendor": "ABC Supplies",
  "amount": 10000,
  "date": "2026-02-03",
  "items": [
    {"name": "Steel Rod", "quantity": 45, "price": 100},
    {"name": "Copper Wire", "quantity": 100, "price": 50}
  ]
}`
  }

  const loadSampleData = () => {
    setPoData(sampleData.po)
    setInvoiceData(sampleData.invoice)
    setDeliveryData(sampleData.delivery)
  }

  const runAudit = async () => {
    if (!poData || !invoiceData || !deliveryData) {
      alert('Please fill in all three document fields')
      return
    }

    try {
      setIsLoading(true)
      
      // Upload each document
      await axios.post('/api/upload-po', JSON.parse(poData))
      await axios.post('/api/upload-invoice', JSON.parse(invoiceData))
      await axios.post('/api/upload-delivery', JSON.parse(deliveryData))
      
      // Run audit
      const response = await axios.post('/api/run-audit')
      
      // Store results and navigate
      localStorage.setItem('auditResults', JSON.stringify(response.data))
      navigate('/result')
      
    } catch (error) {
      console.error('Audit failed:', error)
      alert('Audit failed. Please check your JSON format and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Audit Dashboard</h1>
          <p className="text-gray-400">Upload your documents for three-way invoice reconciliation</p>
        </div>

        <div className="mb-6">
          <button
            onClick={loadSampleData}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
          >
            Load Sample Data
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-dark-card rounded-xl p-6 border border-dark-border">
            <div className="flex items-center mb-4">
              <div className="text-2xl mr-3">📋</div>
              <h2 className="text-xl font-semibold">Purchase Order</h2>
            </div>
            <textarea
              value={poData}
              onChange={(e) => setPoData(e.target.value)}
              className="w-full h-64 bg-slate-800 border border-slate-600 rounded-lg p-4 text-sm font-mono text-gray-300 focus:border-accent-blue focus:outline-none resize-none"
              placeholder="Enter PO data in JSON format..."
            />
          </div>

          <div className="bg-dark-card rounded-xl p-6 border border-dark-border">
            <div className="flex items-center mb-4">
              <div className="text-2xl mr-3">🧾</div>
              <h2 className="text-xl font-semibold">Invoice</h2>
            </div>
            <textarea
              value={invoiceData}
              onChange={(e) => setInvoiceData(e.target.value)}
              className="w-full h-64 bg-slate-800 border border-slate-600 rounded-lg p-4 text-sm font-mono text-gray-300 focus:border-accent-blue focus:outline-none resize-none"
              placeholder="Enter Invoice data in JSON format..."
            />
          </div>

          <div className="bg-dark-card rounded-xl p-6 border border-dark-border">
            <div className="flex items-center mb-4">
              <div className="text-2xl mr-3">🚚</div>
              <h2 className="text-xl font-semibold">Delivery Note</h2>
            </div>
            <textarea
              value={deliveryData}
              onChange={(e) => setDeliveryData(e.target.value)}
              className="w-full h-64 bg-slate-800 border border-slate-600 rounded-lg p-4 text-sm font-mono text-gray-300 focus:border-accent-blue focus:outline-none resize-none"
              placeholder="Enter Delivery Note data in JSON format..."
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={runAudit}
            disabled={isLoading}
            className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
              isLoading
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-accent-blue hover:bg-accent-blue-hover transform hover:scale-105'
            }`}
          >
            {isLoading ? 'Running Audit...' : 'Run Audit'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
