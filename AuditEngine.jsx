import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuditEngine = () => {
    const navigate = useNavigate();
    const [poData, setPoData] = useState('');
    const [invoiceData, setInvoiceData] = useState('');
    const [deliveryData, setDeliveryData] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const defaultData = {
        id: "PO-2026-1458",
        vendor: "Global Tech Supplies Pvt Ltd",
        amount: 150000,
        quantity: 300,
        date: "2026-02-01"
    };

    const sampleData = {
        po: `{
  "id": "PO-2026-1458",
  "vendor": "Global Tech Supplies Pvt Ltd",
  "amount": 150000,
  "quantity": 300,
  "date": "2026-02-01"
}`,
        invoice: `{
  "id": "INV-2026-7821",
  "vendor": "Global Tech Supplies Pvt Ltd",
  "amount": 168500,
  "quantity": 300,
  "date": "2026-02-03",
  "note": "Overbilled"
}`,
        delivery: `{
  "id": "DEL-2026-9912",
  "vendor": "Global Tech Supplies Pvt Ltd",
  "amount": 150000,
  "quantity": 280,
  "date": "2026-02-04",
  "note": "Underdelivered"
}`
    };

    // Persistence and Default Mock Data
    useEffect(() => {
        const savedPo = localStorage.getItem('po');
        const savedInvoice = localStorage.getItem('invoice');
        const savedDelivery = localStorage.getItem('delivery');

        if (savedPo) setPoData(savedPo);
        if (savedInvoice) setInvoiceData(savedInvoice);
        if (savedDelivery) setDeliveryData(savedDelivery);

        if (!savedPo && !savedInvoice && !savedDelivery) {
            // Apply default data if completely empty
            setPoData(JSON.stringify(defaultData, null, 2));
            setInvoiceData(JSON.stringify(defaultData, null, 2));
            setDeliveryData(JSON.stringify(defaultData, null, 2));
        }
    }, []);

    useEffect(() => {
        if (poData) localStorage.setItem('po', poData);
        if (invoiceData) localStorage.setItem('invoice', invoiceData);
        if (deliveryData) localStorage.setItem('delivery', deliveryData);
    }, [poData, invoiceData, deliveryData]);

    const loadSampleData = () => {
        setPoData(sampleData.po);
        setInvoiceData(sampleData.invoice);
        setDeliveryData(sampleData.delivery);
        setError('');
    };

    const runAudit = async () => {
        let po, invoice, delivery;
        try {
            po = JSON.parse(poData);
            invoice = JSON.parse(invoiceData);
            delivery = JSON.parse(deliveryData);
        } catch (e) {
            setError("Invalid JSON format in one or more modules.");
            return;
        }

        // ISSUE 1: Validation
        if (
            !po || Object.keys(po).length === 0 ||
            !invoice || Object.keys(invoice).length === 0 ||
            !delivery || Object.keys(delivery).length === 0
        ) {
            setError("Insufficient Input Modules: Ensure PO, Invoice, and Delivery datasets are loaded.");
            return;
        }

        console.log("PO:", po);
        console.log("Invoice:", invoice);
        console.log("Delivery:", delivery);

        try {
            setIsLoading(true);
            setError('');
            await axios.post('/api/upload-po', po);
            await axios.post('/api/upload-invoice', invoice);
            await axios.post('/api/upload-delivery', delivery);
            const response = await axios.post('/api/run-audit');
            localStorage.setItem('auditResults', JSON.stringify(response.data));
            navigate('/result');
        } catch (error) {
            console.error('Audit core failure:', error);
            setError('System kernel exception during audit execution.');
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusInfo = () => {
        const count = [poData, invoiceData, deliveryData].filter(d => {
            try {
                return d && Object.keys(JSON.parse(d)).length > 0;
            } catch (e) { return false; }
        }).length;

        if (count === 3) return { label: 'READY', color: 'text-green-400', bg: 'bg-green-400/20' };
        if (count > 0) return { label: 'PARTIAL', color: 'text-yellow-400', bg: 'bg-yellow-400/20' };
        return { label: 'MISSING', color: 'text-red-400', bg: 'bg-red-400/20' };
    };

    const status = getStatusInfo();

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-1">
                    <h2 className="text-3xl font-black text-white tracking-widest uppercase">Audit Engine Core</h2>
                    <div className="flex items-center gap-3">
                        <p className="text-[10px] text-cyan-400 font-mono tracking-[0.2em] uppercase">Status: ENGINE_READY</p>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-bold tracking-widest uppercase ${status.bg} ${status.color}`}>
                            {status.label}
                        </span>
                    </div>
                </div>

                <button
                    onClick={loadSampleData}
                    className="glass-panel px-6 py-3 rounded-full text-[10px] font-black tracking-widest text-cyan-500 uppercase border border-cyan-500/30 hover:bg-cyan-500/10 transition-all"
                >
                    Initialize Sample Datasets
                </button>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-500 text-xs font-mono">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {[
                    { title: 'Purchase Order', value: poData, setter: setPoData, icon: '📋' },
                    { title: 'Invoice Ledger', value: invoiceData, setter: setInvoiceData, icon: '🧾' },
                    { title: 'Delivery Stream', value: deliveryData, setter: setDeliveryData, icon: '🚚' },
                ].map((input, i) => (
                    <div key={i} className="glass-panel rounded-2xl flex flex-col h-[500px]">
                        <div className="p-6 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-xl">{input.icon}</span>
                                <h3 className="text-sm font-bold text-white uppercase tracking-widest">{input.title}</h3>
                            </div>
                            <span className="text-[8px] font-mono text-slate-500">FORMAT: JSON</span>
                        </div>
                        <div className="flex-1 relative">
                            <textarea
                                value={input.value}
                                onChange={(e) => input.setter(e.target.value)}
                                className="w-full h-full bg-black/40 p-6 text-xs font-mono text-cyan-400 placeholder:text-slate-700 focus:outline-none resize-none custom-scrollbar"
                                placeholder={`Load ${input.title} JSON module...`}
                            />
                            <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col items-center justify-center pt-6">
                <button
                    onClick={runAudit}
                    disabled={isLoading}
                    className={`relative group px-16 py-5 rounded-full overflow-hidden transition-all duration-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'
                        }`}
                >
                    <div className={`absolute inset-0 ${isLoading ? 'bg-slate-700' : 'bg-gold-gradient shadow-lg shadow-yellow-500/20 group-hover:shadow-yellow-500/40'}`} />
                    <span className="relative z-10 text-black font-black text-sm tracking-[0.4em] uppercase">
                        {isLoading ? 'Executing Audit Sequence...' : 'Initialize Audit Run'}
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
                <p className="mt-4 text-[9px] text-slate-500 font-mono tracking-widest uppercase">Quantum encryption enabled for sequence matching</p>
            </div>
        </div>
    );
};

export default AuditEngine;
