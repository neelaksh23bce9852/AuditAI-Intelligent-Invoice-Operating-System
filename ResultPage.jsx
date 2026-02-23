import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis
} from 'recharts'

const ResultPage = () => {
  const navigate = useNavigate()
  const [auditResults, setAuditResults] = useState(null)
  const [aiSummary, setAiSummary] = useState('')
  const [isAiLoading, setIsAiLoading] = useState(false)

  const handleAiAnalysis = async () => {
    try {
      setIsAiLoading(true)
      const response = await axios.post('/api/ai-analysis', {
        risk_score: auditResults.risk_score,
        mismatches: auditResults.mismatches
      })
      setAiSummary(response.data.ai_summary)
    } catch (err) {
      console.error("AI Analysis failed:", err)
      setAiSummary("ERROR: Failed to connect to AI kernel. Ensure backend is running and OpenAI key is valid.")
    } finally {
      setIsAiLoading(false)
    }
  }

  useEffect(() => {
    const results = localStorage.getItem('auditResults')
    if (results) {
      setAuditResults(JSON.parse(results))
    } else {
      navigate('/dashboard')
    }
  }, [navigate])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Safe': return 'bg-green-500'
      case 'Warning': return 'bg-yellow-500'
      case 'Critical': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getRiskScoreColor = (score) => {
    if (score >= 80) return '#22c55e'
    if (score >= 50) return '#eab308'
    return '#ef4444'
  }

  if (!auditResults) return null;

  const getParsedData = (key) => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : null;
    } catch (e) { return null; }
  };

  const po = getParsedData('po');
  const invoice = getParsedData('invoice');
  const delivery = getParsedData('delivery');

  const safePOAmount = po?.amount ?? 0;
  const safeInvoiceAmount = invoice?.amount ?? 0;
  const safeDeliveryAmount = delivery?.amount ?? 0;

  const chartData = [
    {
      field: "Amount",
      po: safePOAmount,
      invoice: safeInvoiceAmount,
      delivery: safeDeliveryAmount
    }
  ];

  const radialData = [{ name: 'Risk', value: auditResults.risk_score ?? 0, fill: getRiskScoreColor(auditResults.risk_score ?? 0) }];

  const mismatchDistributionData = [
    { field: 'Vendor', count: auditResults.mismatches.filter(m => m.field.toLowerCase().includes('vendor')).length },
    { field: 'Amount', count: auditResults.mismatches.filter(m => m.field.toLowerCase().includes('amount')).length },
    { field: 'Quantity', count: auditResults.mismatches.filter(m => m.field.toLowerCase().includes('quantity')).length },
    { field: 'Date', count: auditResults.mismatches.filter(m => m.field.toLowerCase().includes('date')).length }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black mb-2 text-white uppercase tracking-widest">
            Audit Intelligence Report
          </h1>
          <p className="text-cyan-400 text-[10px] font-mono tracking-widest uppercase">Analysis Seq: #AUI-{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
        </div>

        <div className={`px-6 py-2 rounded-full text-white font-black text-xs tracking-widest uppercase shadow-lg ${getStatusColor(auditResults.status)}`}>
          {auditResults.status} DETECTED
        </div>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-panel rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]">
          <h3 className="text-slate-500 text-[10px] font-black tracking-widest uppercase mb-4">Risk Magnitude</h3>
          <div className="relative h-32">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" data={radialData}>
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar dataKey="value" cornerRadius={10} fill={getRiskScoreColor(auditResults.risk_score)} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
              <span className="text-2xl font-black text-white">{auditResults.risk_score}</span>
              <span className="text-[8px] text-slate-500 uppercase">Index</span>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]">
          <p className="text-slate-500 text-[10px] font-black tracking-widest uppercase mb-2">Fields Scanned</p>
          <div className="text-3xl font-black text-blue-400 mb-1">4</div>
          <p className="text-[8px] text-slate-500 uppercase">Dataset Categories</p>
        </div>

        <div className="glass-panel rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]">
          <p className="text-slate-500 text-[10px] font-black tracking-widest uppercase mb-2">Kernel Flags</p>
          <div className="text-3xl font-black text-red-500 mb-1">{auditResults.mismatches.length}</div>
          <p className="text-[8px] text-slate-500 uppercase">Anomalies Detected</p>
        </div>

        <div className="glass-panel rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] flex flex-col justify-center">
          <p className="text-slate-500 text-[10px] font-black tracking-widest uppercase mb-3 text-center">Protocol Hash</p>
          <div className="text-[10px] font-mono text-cyan-500 bg-white/5 p-2 rounded text-center border border-white/5">
            MATCH_STATE_{auditResults.status.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Executive Impact Panel */}
      <div className={`glass-panel rounded-2xl p-8 border-l-8 ${auditResults.risk_score > 70 ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : auditResults.risk_score > 40 ? 'border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.2)]' : 'border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.2)]'}`}>
        <h3 className="text-xl font-bold mb-6 text-white uppercase tracking-widest flex items-center gap-3">
          <span className="text-2xl">⚠️</span> Financial Risk Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <p className="text-slate-500 text-[10px] font-black tracking-widest uppercase mb-1">Overbilling Amount</p>
            <p className="text-2xl font-black text-red-400">₹{(safeInvoiceAmount - safePOAmount > 0 ? safeInvoiceAmount - safePOAmount : 0).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-slate-500 text-[10px] font-black tracking-widest uppercase mb-1">Underdelivery Units</p>
            <p className="text-2xl font-black text-orange-400">{po?.quantity - delivery?.quantity > 0 ? po?.quantity - delivery?.quantity : 0} Units</p>
          </div>
          <div>
            <p className="text-slate-500 text-[10px] font-black tracking-widest uppercase mb-1">Risk Score</p>
            <p className={`text-2xl font-black ${auditResults.risk_score > 70 ? 'text-red-500' : auditResults.risk_score > 40 ? 'text-yellow-500' : 'text-green-500'}`}>{auditResults.risk_score ?? 0}%</p>
          </div>
          <div>
            <p className="text-slate-500 text-[10px] font-black tracking-widest uppercase mb-1">Recommendation</p>
            <p className="text-xs font-bold text-white uppercase leading-relaxed">
              {auditResults.risk_score > 70 ? 'Immediate Halt: Block Payment and Audit Vendor' : auditResults.risk_score > 40 ? 'Caution: Verify Delta with Vendor before release' : 'Proceed: Discrepancies within acceptable limit'}
            </p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="glass-panel rounded-2xl p-8">
          <h3 className="text-sm font-bold mb-8 text-white uppercase tracking-widest">Cross-Module Validation</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ bottom: 20, left: 20 }}>
                <XAxis
                  dataKey="field"
                  stroke="#64748b"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  label={{ value: "Comparison Fields", position: "insideBottom", offset: -10, fill: '#64748b', fontSize: 10, fontWeight: 'bold' }}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  label={{ value: "Value (₹ / Units)", angle: -90, position: "insideLeft", offset: 10, fill: '#64748b', fontSize: 10, fontWeight: 'bold' }}
                />
                <Tooltip
                  formatter={(value) => `₹ ${value ?? 0}`}
                  contentStyle={{ backgroundColor: 'rgba(5, 7, 13, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', textTransform: 'uppercase', paddingBottom: '20px' }} />
                <Bar dataKey="po" name="Purchase Order" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="invoice" name="Invoice" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="delivery" name="Delivery Note" fill="#22d3ee" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-[10px] text-slate-400 italic text-center">
            {safeInvoiceAmount > safePOAmount
              ? `Invoice exceeds PO by ₹${(safeInvoiceAmount - safePOAmount).toLocaleString()} indicating potential overbilling.`
              : "Amounts are aligned across modules."}
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-8">
          <h3 className="text-sm font-bold mb-8 text-white uppercase tracking-widest">Mismatch Density</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mismatchDistributionData} margin={{ bottom: 20, left: 10 }}>
                <XAxis
                  dataKey="field"
                  stroke="#64748b"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  label={{ value: "Anomaly Categories", position: "insideBottom", offset: -10, fill: '#64748b', fontSize: 10, fontWeight: 'bold' }}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  label={{ value: "Incident Count", angle: -90, position: "insideLeft", offset: 10, fill: '#64748b', fontSize: 10, fontWeight: 'bold' }}
                />
                <Tooltip
                  formatter={(value) => `${value ?? 0} Incidents`}
                  contentStyle={{ backgroundColor: 'rgba(5, 7, 13, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', textTransform: 'uppercase', paddingBottom: '20px' }} />
                <Bar dataKey="count" name="Mismatches" radius={[4, 4, 0, 0]}>
                  {mismatchDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={(entry.count ?? 0) > 0 ? '#ef4444' : '#22d3ee'} fillOpacity={(entry.count ?? 0) > 0 ? 0.8 : 0.2} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-[10px] text-slate-400 italic text-center">
            {(auditResults.mismatches?.length ?? 0) > 0
              ? `System identified ${auditResults.mismatches.length} critical mismatches requiring executive review.`
              : "No significant anomalies detected in signal processing."}
          </p>
        </div>
      </div>

      {/* Detailed Mismatches Table */}
      {auditResults.mismatches.length > 0 && (
        <div className="glass-panel rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/5">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">Granular Kernel Anomaly Analysis</h3>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 border-b border-white/5">
                <th className="py-4 px-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Target Module</th>
                <th className="py-4 px-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Reference</th>
                <th className="py-4 px-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Detected</th>
                <th className="py-4 px-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Delta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-xs">
              {auditResults.mismatches.map((mismatch, index) => (
                <tr key={index} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6">
                    <span className="text-red-400/80 border border-red-500/20 px-2 py-0.5 rounded">
                      {mismatch.field}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-400">
                    {mismatch.po !== undefined ? mismatch.po : mismatch.expected !== undefined ? mismatch.expected : '-'}
                  </td>
                  <td className="py-4 px-6 text-white">
                    {mismatch.invoice !== undefined ? mismatch.invoice : mismatch.delivery !== undefined ? mismatch.delivery : mismatch.actual !== undefined ? mismatch.actual : '-'}
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-red-400">
                      {mismatch.po !== undefined && mismatch.invoice !== undefined ? Math.abs(mismatch.po - mismatch.invoice) : 'ERROR'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* AI Analysis Section */}
      <div className="flex flex-col items-center gap-6 pt-4">
        {!aiSummary && !isAiLoading && (
          <button
            onClick={handleAiAnalysis}
            className="group relative px-12 py-4 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-80 group-hover:opacity-100" />
            <div className="absolute inset-0 shadow-[0_0_20px_rgba(6,182,212,0.3)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all" />
            <span className="relative z-10 text-white font-black text-xs tracking-[0.2em] uppercase flex items-center gap-3">
              <span>🤖</span> Run AI Financial Analysis
            </span>
          </button>
        )}

        {isAiLoading && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
            <p className="text-[10px] text-cyan-400 font-mono animate-pulse uppercase tracking-[0.3em]">Querying LLM Kernel... Please Wait</p>
          </div>
        )}

        {aiSummary && (
          <div className={`w-full glass-panel rounded-2xl p-8 border ${aiSummary.includes('ERROR') ? 'border-red-500/50 bg-red-500/5' : 'border-cyan-500/30'}`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] flex items-center gap-3">
                <span className={aiSummary.includes('ERROR') ? 'text-red-500' : 'text-cyan-400'}>
                  {aiSummary.includes('ERROR') ? '⚠️ SYSTEM_ALERT' : '🧠 AI FINANCIAL_INSIGHT'}
                </span>
              </h3>
              {!aiSummary.includes('ERROR') && <span className="text-[8px] font-mono text-cyan-500/60">SOURCE: GPT-4O-MINI</span>}
            </div>

            <div className={`text-sm leading-relaxed font-medium max-h-[400px] overflow-y-auto custom-scrollbar pr-4 ${aiSummary.includes('ERROR') ? 'text-red-400 font-mono' : 'text-slate-300'}`}>
              {aiSummary}
            </div>

            <button
              onClick={() => { setAiSummary(''); handleAiAnalysis(); }}
              className="mt-6 text-[10px] text-slate-500 hover:text-cyan-400 transition-colors uppercase font-black tracking-widest"
            >
              🔄 Re-generate Analysis
            </button>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-6 pt-6">
        <button
          onClick={() => navigate('/engine')}
          className="px-10 py-4 bg-white/5 border border-white/10 rounded-full text-[10px] font-black tracking-[0.2em] text-cyan-400 uppercase hover:bg-white/10 transition-all font-mono"
        >
          🔄 Initialize New Sequence
        </button>
        <button
          onClick={() => {
            localStorage.removeItem('auditResults')
            navigate('/dashboard')
          }}
          className="px-10 py-4 bg-gold-gradient rounded-full text-[10px] font-black tracking-[0.2em] text-black uppercase hover:scale-105 transition-all shadow-lg shadow-yellow-500/20"
        >
          🏠 Return to Core
        </button>
      </div>
    </div>
  );
}

export default ResultPage
