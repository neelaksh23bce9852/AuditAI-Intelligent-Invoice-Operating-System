import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AryverseEntry from './pages/AryverseEntry'
import MainDashboard from './pages/MainDashboard'
import AuditEngine from './pages/AuditEngine'
import AnalyticsCore from './pages/AnalyticsCore'
import RiskIntelligence from './pages/RiskIntelligence'
import AuditHistory from './pages/AuditHistory'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import ResultPage from './pages/ResultPage'
import SystemLayout from './components/SystemLayout'
import CustomCursor from './components/CustomCursor'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#05070d] text-white">
        <CustomCursor />
        <Routes>
          {/* Entry Page (No Layout) */}
          <Route path="/" element={<AryverseEntry />} />

          {/* System Pages (With Layout) */}
          <Route path="/dashboard" element={<SystemLayout><MainDashboard /></SystemLayout>} />
          <Route path="/engine" element={<SystemLayout><AuditEngine /></SystemLayout>} />
          <Route path="/analytics" element={<SystemLayout><AnalyticsCore /></SystemLayout>} />
          <Route path="/risk" element={<SystemLayout><RiskIntelligence /></SystemLayout>} />
          <Route path="/history" element={<SystemLayout><AuditHistory /></SystemLayout>} />
          <Route path="/reports" element={<SystemLayout><Reports /></SystemLayout>} />
          <Route path="/settings" element={<SystemLayout><Settings /></SystemLayout>} />
          <Route path="/result" element={<SystemLayout><ResultPage /></SystemLayout>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
