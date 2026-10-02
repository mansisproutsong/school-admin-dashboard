import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFilter } from '../context/FilterContext';
import ClassSelector from '../components/common/ClassSelector';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Wallet, AlertCircle, CheckCircle, Clock, Plus, Filter, Search, X } from 'lucide-react';

export default function Fees() {
  const { getFilteredData, selectedClassId, recordPayment } = useFilter();
  const { isOverall, scopeText, kpis, feeMonthlyData, students } = getFilteredData();
  const [searchParams] = useSearchParams();

  const [statusFilter, setStatusFilter] = useState('ALL');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [payAmount, setPayAmount] = useState(18500);
  const [payStatus, setPayStatus] = useState('Paid');

  useEffect(() => {
    if (searchParams.get('filter') === 'overdue') {
      setStatusFilter('Overdue');
    }
  }, [searchParams]);

  const filteredStudents = students.filter(s => statusFilter === 'ALL' || s.feeStatus === statusFilter);

  const handleRecordPayment = (e) => {
    e.preventDefault();
    if (!selectedStudentId) return;
    recordPayment(selectedStudentId, payAmount, payStatus);
    setShowPaymentModal(false);
  };

  return (
    <div className="space-y-6">
      <ClassSelector />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-ink">Fees & Collection Management</h1>
          <p className="text-xs text-muted mt-0.5">{scopeText}</p>
        </div>

        <button 
          onClick={() => setShowPaymentModal(true)}
          className="inline-flex items-center gap-2 bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-btn hover:bg-blue-700 shrink-0 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Record Payment
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-card border border-line shadow-soft">
          <p className="text-2xl font-bold text-ink">{kpis.feeCollected}</p>
          <p className="text-xs text-muted mt-1">Collected ({kpis.feePct})</p>
        </div>
        <div className="bg-white p-5 rounded-card border border-line shadow-soft">
          <p className="text-2xl font-bold text-danger">₹3.4L</p>
          <p className="text-xs text-muted mt-1">Outstanding Dues</p>
        </div>
        <div className="bg-white p-5 rounded-card border border-line shadow-soft">
          <p className="text-2xl font-bold text-success">{students.filter(s => s.feeStatus === 'Paid').length || (isOverall ? 1153 : 30)}</p>
          <p className="text-xs text-muted mt-1">Paid Students</p>
        </div>
        <div className="bg-white p-5 rounded-card border border-line shadow-soft">
          <p className="text-2xl font-bold text-warning">{students.filter(s => s.feeStatus !== 'Paid').length || (isOverall ? 95 : 2)}</p>
          <p className="text-xs text-muted mt-1">Pending / Overdue</p>
        </div>
      </div>

      {/* Monthly Collection Chart */}
      <div className="bg-white p-5 rounded-card border border-line shadow-soft space-y-4">
        <h3 className="font-bold text-sm text-ink">Monthly Fee Collection Trend (₹ Lakhs)</h3>
        <div className="h-60 w-full text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={feeMonthlyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="month" stroke="#64748B" />
              <YAxis stroke="#64748B" tickFormatter={(val) => val.toFixed(1)} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0F172A', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                itemStyle={{ color: '#F59E0B' }}
                formatter={(val) => [`₹${Number(val).toFixed(2)} Lakhs`, 'Collected']}
              />
              <Bar dataKey="Collected" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Fees Table */}
      <div className="bg-white rounded-card border border-line shadow-soft overflow-hidden space-y-3 p-4">
        <div className="flex justify-between items-center pb-2 border-b border-line">
          <h3 className="font-bold text-sm text-ink">Student Fee Ledger</h3>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs font-semibold bg-bg border border-line rounded-inp px-3 py-1.5"
          >
            <option value="ALL">All Fee Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-line text-muted font-bold uppercase text-[10px]">
                <th className="py-2.5 px-4">Student</th>
                <th className="py-2.5 px-3">Class</th>
                <th className="py-2.5 px-3">Term Fee Amount</th>
                <th className="py-2.5 px-3">Due Date</th>
                <th className="py-2.5 px-3">Pay Date</th>
                <th className="py-2.5 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filteredStudents.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-ink">{s.name}</td>
                  <td className="py-3 px-3 text-muted">Class {s.classId}</td>
                  <td className="py-3 px-3 font-semibold text-ink">₹{s.feeAmount?.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-3 text-muted">Jul 15, 2026</td>
                  <td className="py-3 px-3 text-muted font-medium">{s.feeStatus === 'Paid' ? 'Jun 12, 2026' : '-'}</td>
                  <td className="py-3 px-4 text-right">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      s.feeStatus === 'Paid' ? 'bg-success/10 text-success' : 
                      s.feeStatus === 'Pending' ? 'bg-warning/10 text-warning' : 'bg-danger/10 text-danger'
                    }`}>
                      {s.feeStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-ink/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-card w-full max-w-md p-6 space-y-4 shadow-xl border border-line">
            <div className="flex justify-between items-center border-b border-line pb-3">
              <h3 className="font-bold text-ink text-sm flex items-center gap-2">
                <Wallet className="w-4 h-4 text-primary" /> Record Fee Payment
              </h3>
              <button onClick={() => setShowPaymentModal(false)}>
                <X className="w-5 h-5 text-muted hover:text-ink" />
              </button>
            </div>

            <form onSubmit={handleRecordPayment} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-muted">Select Student</label>
                <select 
                  value={selectedStudentId} 
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="w-full mt-1 p-2.5 border border-line rounded-inp focus:outline-none"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.name} (Class {s.classId} • Current: {s.feeStatus})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-muted">Amount Paid (₹)</label>
                  <input 
                    type="number" 
                    value={payAmount} 
                    onChange={(e) => setPayAmount(e.target.value)} 
                    className="w-full mt-1 p-2.5 border border-line rounded-inp focus:outline-none" 
                  />
                </div>

                <div>
                  <label className="font-semibold text-muted">Pay Date</label>
                  <input 
                    type="date" 
                    defaultValue="2026-06-12"
                    className="w-full mt-1 p-2.5 border border-line rounded-inp focus:outline-none text-muted" 
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-muted">Update Status</label>
                <select 
                  value={payStatus} 
                  onChange={(e) => setPayStatus(e.target.value)}
                  className="w-full mt-1 p-2.5 border border-line rounded-inp"
                >
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-line">
                <button type="button" onClick={() => setShowPaymentModal(false)} className="px-4 py-2 border rounded-btn">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-white font-bold rounded-btn">Save Payment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
