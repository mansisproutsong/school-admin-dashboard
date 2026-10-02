import React, { useState } from 'react';
import { useFilter } from '../context/FilterContext';
import { teachers } from '../data/teachers';
import { Presentation, Users, UserCheck, ShieldCheck, Search, Filter, Plus, Phone, Mail } from 'lucide-react';

export default function Teachers() {
  const { selectedClassId } = useFilter();
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('ALL');

  const displayedTeachers = teachers.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter === 'ALL' || t.department === deptFilter;
    const matchesClass = selectedClassId === 'ALL' || t.assignedClasses.includes(selectedClassId);
    return matchesSearch && matchesDept && matchesClass;
  });

  const getInitials = (name) => {
    return name
      .replace('Dr. ', '')
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-ink">Teachers & Faculty</h1>
          <p className="text-xs text-muted mt-0.5">Manage {teachers.length} faculty members, department assignments, and class workloads</p>
        </div>

        <button 
          onClick={() => alert('Add Teacher Modal Placeholder')}
          className="inline-flex items-center gap-2 bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-btn hover:bg-blue-700 shrink-0 shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Add New Teacher
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-card border border-line shadow-sm flex flex-col gap-1">
          <div className="flex items-center gap-2 text-muted mb-1">
            <Presentation className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Total Staff</span>
          </div>
          <p className="text-2xl font-bold text-ink">86</p>
        </div>

        <div className="bg-white p-4 rounded-card border border-line shadow-sm flex flex-col gap-1">
          <div className="flex items-center gap-2 text-muted mb-1">
            <UserCheck className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Faculty</span>
          </div>
          <p className="text-2xl font-bold text-ink">52</p>
        </div>

        <div className="bg-white p-4 rounded-card border border-line shadow-sm flex flex-col gap-1">
          <div className="flex items-center gap-2 text-muted mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Admin</span>
          </div>
          <p className="text-2xl font-bold text-ink">22</p>
        </div>

        <div className="bg-white p-4 rounded-card border border-line shadow-sm flex flex-col gap-1">
          <div className="flex items-center gap-2 text-muted mb-1">
            <Users className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Support</span>
          </div>
          <p className="text-2xl font-bold text-ink">12</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-card border border-line shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or department..."
            className="w-full pl-9 pr-3 py-2 rounded-inp border border-line text-xs bg-bg focus:outline-none focus:ring-2 focus:ring-primary/25"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-muted" />
          <span className="text-xs font-semibold text-muted">Department:</span>
          <select 
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="bg-bg border border-line text-xs font-semibold rounded-inp px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/25"
          >
            <option value="ALL">All Departments</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
            <option value="Commerce">Commerce</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Languages">Languages</option>
            <option value="Social Studies">Social Studies</option>
            <option value="Physical Education">Physical Education</option>
          </select>
        </div>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {displayedTeachers.length === 0 ? (
          <div className="col-span-full py-12 text-center text-muted border border-line rounded-card bg-white">
            No faculty members found matching your filters.
          </div>
        ) : (
          displayedTeachers.map((t) => (
            <div key={t.id} className="bg-white border border-line rounded-card p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 font-bold text-sm">
                    {getInitials(t.name)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-ink leading-tight">{t.name}</h3>
                    <p className="text-xs text-muted font-medium mt-0.5">{t.department}</p>
                  </div>
                </div>
                <div className="relative" title={`Status: ${t.status}`}>
                  <span className="flex h-2.5 w-2.5">
                    {t.status === 'Active' && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-20"></span>}
                    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${t.status === 'Active' ? 'bg-success' : 'bg-warning'}`}></span>
                  </span>
                </div>
              </div>
              
              <div className="bg-slate-50 border border-line rounded p-2 text-xs flex-1">
                <span className="text-muted block mb-1">Assigned Classes</span>
                <span className="font-semibold text-ink leading-relaxed">
                  {t.assignedClasses.join(', ') || 'None'}
                </span>
              </div>
              
              <div className="flex gap-2 mt-auto pt-1">
                <button 
                  onClick={() => alert(`Calling ${t.phone}`)}
                  className="flex-1 bg-white border border-line hover:bg-slate-50 text-ink text-xs font-semibold py-1.5 rounded-btn flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-muted" /> Call
                </button>
                <button 
                  onClick={() => alert(`Emailing ${t.email}`)}
                  className="flex-1 bg-white border border-line hover:bg-slate-50 text-ink text-xs font-semibold py-1.5 rounded-btn flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-muted" /> Email
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}