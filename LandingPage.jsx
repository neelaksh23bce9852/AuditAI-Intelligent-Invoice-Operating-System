import { Link } from 'react-router-dom'
import { useState } from 'react'

const LandingPage = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-slate-900 to-dark-bg flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-accent-blue bg-clip-text text-transparent">
            AuditAI
          </h1>
          <h2 className="text-3xl font-semibold text-gray-300 mb-4">
            Intelligent Invoice Reconciliation
          </h2>
        </div>
        
        <div className="bg-dark-card rounded-2xl p-8 mb-8 border border-dark-border shadow-2xl">
          <p className="text-xl text-gray-400 leading-relaxed mb-6">
            Transform your invoice processing with AI-powered three-way matching between 
            <span className="text-accent-blue font-semibold"> Purchase Orders</span>, 
            <span className="text-accent-blue font-semibold"> Invoices</span>, and 
            <span className="text-accent-blue font-semibold"> Delivery Notes</span>.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="text-accent-blue text-3xl mb-3">📋</div>
              <h3 className="text-lg font-semibold mb-2">Purchase Orders</h3>
              <p className="text-gray-400 text-sm">Validate against original agreements</p>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="text-accent-blue text-3xl mb-3">🧾</div>
              <h3 className="text-lg font-semibold mb-2">Invoices</h3>
              <p className="text-gray-400 text-sm">Verify billing accuracy</p>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="text-accent-blue text-3xl mb-3">🚚</div>
              <h3 className="text-lg font-semibold mb-2">Delivery Notes</h3>
              <p className="text-gray-400 text-sm">Confirm goods received</p>
            </div>
          </div>
          
          <Link 
            to="/dashboard"
            className="inline-block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <button 
              className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform ${
                isHovered 
                  ? 'bg-accent-blue-hover scale-105 shadow-lg shadow-blue-500/25' 
                  : 'bg-accent-blue'
              }`}
            >
              Start Audit
            </button>
          </Link>
        </div>
        
        <div className="text-gray-500 text-sm">
          <p>Enterprise-grade AI-powered invoice reconciliation</p>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
