import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFilter } from '../context/FilterContext';
import ClassSelector from '../components/common/ClassSelector';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Wallet, Plus, Search, X } from 'lucide-react';
import { createPortal } from 'react-dom';

export default function Fees() {
  const { getFilteredData, selectedClassId, recordPayment } = useFilter();
  const { isOverall, scopeText, kpis, feeMonthlyData, students } = getFilteredData();
  const [searchParams] = useSearchParams();

  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [payAmount, setPayAmount] = useState(18500);
  const [payStatus, setPayStatus] = useState('Paid');

  useEffect(() => {
    if (searchParams.get('filter') === 'overdue') {
      setStatusFilter('Overdue');
    }
    if (students.length > 0 && !selectedStudentId) {
      setSelectedStudentId(students[0].id);
    }
  }, [searchParams, students]);

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || s.feeStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleRecordPayment = (e) => {
    e.preventDefault();
    if (!selectedStudentId) return;
    recordPayment(selectedStudentId, payAmount, payStatus);
    setShowPaymentModal(false);
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
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
          className="inline-flex items-center gap-2 bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-btn hover:bg-blue-700 shrink-0 shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Record Payment
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-card border border-line shadow-sm flex flex-col gap-1">
          <p className="text-2xl font-bold text-ink">{kpis.feeCollected}</p>
          <p className="text-xs text-muted font-medium uppercase tracking-wider">Collected ({kpis.feePct})</p>
        </div>
        <div className="bg-white p-5 rounded-card border border-line shadow-sm flex flex-col gap-1">
          <p className="text-2xl font-bold text-danger">₹3.4L</p>
          <p className="text-xs text-muted font-medium uppercase tracking-wider">Outstanding Dues</p>
        </div>
        <div className="bg-white p-5 rounded-card border border-line shadow-sm flex flex-col gap-1">
          <p className="text-2xl font-bold text-success">{students.filter(s => s.feeStatus === 'Paid').length || (isOverall ? 1153 : 30)}</p>
          <p className="text-xs text-muted font-medium uppercase tracking-wider">Paid Students</p>
        </div>
        <div className="bg-white p-5 rounded-card border border-line shadow-sm flex flex-col gap-1">
          <p className="text-2xl font-bold text-warning">{students.filter(s => s.feeStatus !== 'Paid').length || (isOverall ? 95 : 2)}</p>
          <p className="text-xs text-muted font-medium uppercase tracking-wider">Pending / Overdue</p>
        </div>
      </div>

      {/* Monthly Collection Chart */}
      <div className="bg-white p-5 rounded-card border border-line shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-ink">Monthly Fee Collection Trend (₹ Lakhs)</h3>
        <div className="h-60 w-full text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={feeMonthlyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="month" stroke="#64748B" tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="#64748B" tickFormatter={(val) => val.toFixed(1)} tickLine={false} axisLine={false} dx={-10} />
              <Tooltip 
                cursor={{ fill: '#F1F5F9' }}
                contentStyle={{ backgroundColor: '#0F172A', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                itemStyle={{ color: '#2563EB' }}
                formatter={(val) => [`₹${Number(val).toFixed(2)} Lakhs`, 'Collected']}
              />
              <Bar dataKey="Collected" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Fees Table Layout Match */}
      <div className="bg-white rounded-card border border-line shadow-sm overflow-hidden flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-b border-line gap-4">
          <div>
            <h3 className="font-bold text-[15px] text-ink">Student Fee Ledger</h3>
            <p className="text-[11px] text-muted font-medium mt-0.5">Real-time status of student fee payments for Term 1</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Filter student..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs border border-line rounded-inp bg-bg focus:outline-none focus:ring-1 focus:ring-primary w-48"
              />
            </div>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs font-medium text-ink bg-bg border border-line rounded-inp px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="ALL">All Fee Statuses</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead>
              <tr className="bg-white border-b border-line text-muted font-bold uppercase text-xs tracking-wider">
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-3">Class</th>
                <th className="py-3 px-3">Term Fee Amount</th>
                <th className="py-3 px-3">Due Date</th>
                <th className="py-3 px-3">Pay Date</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-muted">No students found matching your filters.</td>
                </tr>
              ) : (
                filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 font-bold text-xs">
                          {getInitials(s.name)}
                        </div>
                        <span className="font-bold text-ink">{s.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-muted font-medium">Class {s.classId}</td>
                    <td className="py-2.5 px-3 font-bold text-ink">₹{(s.feeAmount || 18500).toLocaleString('en-IN')}</td>
                    <td className="py-2.5 px-3 text-muted font-medium">Jul 15, 2026</td>
                    <td className="py-2.5 px-3 text-muted font-medium">{s.feeStatus === 'Paid' ? 'Jun 12, 2026' : '-'}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`inline-flex px-3 py-1 rounded-full text-[11px] font-bold border ${
                        s.feeStatus === 'Paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 
                        s.feeStatus === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-200' : 
                        'bg-rose-50 text-rose-600 border-rose-200'
                      }`}>
                        {s.feeStatus}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      {s.feeStatus === 'Paid' ? (
                        <button className="inline-flex items-center px-3 py-1.5 rounded-btn border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-semibold transition-colors">Receipt</button>
                      ) : s.feeStatus === 'Pending' ? (
                        <button className="inline-flex items-center px-3 py-1.5 rounded-btn border border-blue-200 bg-blue-50 hover:bg-blue-100 text-primary text-xs font-semibold transition-colors">Collect</button>
                      ) : (
                        <button className="inline-flex items-center px-3 py-1.5 rounded-btn border border-rose-200 bg-rose-50 hover:bg-rose-100 text-danger text-xs font-semibold transition-colors">Remind</button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      {showPaymentModal && createPortal(
        <div className="fixed inset-0 z-[100] bg-ink/40 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-card w-full max-w-md p-6 space-y-4 shadow-xl border border-line">
            <div className="flex justify-between items-center border-b border-line pb-3">
              <h3 className="font-bold text-ink text-sm flex items-center gap-2">
                <Wallet className="w-4 h-4 text-primary" /> Record Fee Payment
              </h3>
              <button onClick={() => setShowPaymentModal(false)}>
                <X className="w-5 h-5 text-muted hover:text-ink" />
              </button>
            </div>

            <form onSubmit={handleRecordPayment} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-muted block mb-1">Select Student</label>
                <select 
                  value={selectedStudentId} 
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="w-full p-2.5 border border-line rounded-inp focus:outline-none focus:ring-2 focus:ring-primary/25 bg-bg"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.name} (Class {s.classId} • Current: {s.feeStatus})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-muted block mb-1">Amount Paid (₹)</label>
                  <input 
                    type="number" 
                    value={payAmount} 
                    onChange={(e) => setPayAmount(e.target.value)} 
                    className="w-full p-2.5 border border-line rounded-inp focus:outline-none focus:ring-2 focus:ring-primary/25 bg-bg" 
                  />
                </div>

                <div>
                  <label className="font-semibold text-muted block mb-1">Pay Date</label>
                  <input 
                    type="date" 
                    defaultValue="2026-06-12"
                    className="w-full p-2.5 border border-line rounded-inp focus:outline-none focus:ring-2 focus:ring-primary/25 bg-bg text-ink" 
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-muted block mb-1">Update Status</label>
                <select 
                  value={payStatus} 
                  onChange={(e) => setPayStatus(e.target.value)}
                  className="w-full p-2.5 border border-line rounded-inp focus:outline-none focus:ring-2 focus:ring-primary/25 bg-bg"
                >
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-line mt-2">
                <button type="button" onClick={() => setShowPaymentModal(false)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-ink font-semibold rounded-btn transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary hover:bg-blue-700 text-white font-bold rounded-btn transition-colors shadow-sm">Save Payment</button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
