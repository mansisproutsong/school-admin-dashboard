import React, { useState } from 'react';
import { useFilter } from '../context/FilterContext';
import ClassSelector from '../components/common/ClassSelector';
import { teachers } from '../data/teachers';
import { Presentation, Users, UserCheck, ShieldCheck, Search, Filter, Plus, Phone, Mail } from 'lucide-react';

export default function Teachers() {
  const { selectedClassId } = useFilter();
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [teachersState, setTeachersState] = useState(teachers);

  const displayedTeachers = teachersState.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter === 'ALL' || t.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-ink">Teachers & Faculty Staff</h1>
          <p className="text-xs text-muted mt-0.5">Manage 86 faculty members, department assignments, and class workloads</p>
        </div>

        <button 
          onClick={() => alert('Add Teacher Modal Placeholder')}
          className="inline-flex items-center gap-2 bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-btn hover:bg-blue-700 shrink-0"
        >
          <Plus className="w-4 h-4" /> Add New Teacher
        </button>
      </div>

      {/* Department Breakdown Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-card border border-line shadow-soft flex items-center gap-3">
          <span className="w-10 h-10 rounded-btn bg-primary/10 flex items-center justify-center shrink-0">
            <Presentation className="w-5 h-5 text-primary" />
          </span>
          <div>
            <p className="text-xl font-bold text-ink">86</p>
            <p className="text-[11px] text-muted font-medium">Total School Staff</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-card border border-line shadow-soft flex items-center gap-3">
          <span className="w-10 h-10 rounded-btn bg-success/10 flex items-center justify-center shrink-0">
            <UserCheck className="w-5 h-5 text-success" />
          </span>
          <div>
            <p className="text-xl font-bold text-ink">52</p>
            <p className="text-[11px] text-muted font-medium">Teaching Faculty</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-card border border-line shadow-soft flex items-center gap-3">
          <span className="w-10 h-10 rounded-btn bg-warning/10 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-warning" />
          </span>
          <div>
            <p className="text-xl font-bold text-ink">22</p>
            <p className="text-[11px] text-muted font-medium">Admin & Office</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-card border border-line shadow-soft flex items-center gap-3">
          <span className="w-10 h-10 rounded-btn bg-purple-500/10 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5 text-purple-600" />
          </span>
          <div>
            <p className="text-xl font-bold text-ink">12</p>
            <p className="text-[11px] text-muted font-medium">Support Staff</p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-card border border-line shadow-soft flex flex-wrap items-center justify-between gap-3">
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search teacher by name or department..."
            className="w-full pl-9 pr-3 py-2 rounded-inp border border-line text-xs bg-bg focus:outline-none focus:ring-2 focus:ring-primary/25"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-muted" />
          <span className="text-xs font-semibold text-muted">Department:</span>
          <select 
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="bg-bg border border-line text-xs font-semibold rounded-inp px-3 py-1.5 focus:outline-none"
          >
            <option value="ALL">All Departments</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="English">English</option>
            <option value="Computer Science">Computer Science</option>
          </select>
        </div>
      </div>

      {/* Teachers Table */}
      <div className="bg-white rounded-card border border-line shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-line text-muted font-bold uppercase text-[10px]">
                <th className="py-3 px-5">Teacher Name</th>
                <th className="py-3 px-3">Department</th>
                <th className="py-3 px-3">Assigned Classes</th>
                <th className="py-3 px-3">Contact Phone</th>
                <th className="py-3 px-3">Attendance Status</th>
                <th className="py-3 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {displayedTeachers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-muted">
                    No faculty members found for this department or class filter.
                  </td>
                </tr>
              ) : (
                displayedTeachers.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50">
                    <td className="py-3.5 px-5 font-semibold text-ink flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0">
                        {t.name.charAt(4) || t.name.charAt(0)}
                      </div>
                      <span>{t.name}</span>
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-muted">{t.department}</td>
                    <td className="py-3.5 px-3">
                      <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-bold">
                        {t.assignedClasses.join(', ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-muted">{t.phone}</td>
                    <td className="py-3.5 px-3">
                      <span className={`px-2 py-0.5 rounded-full font-bold ${
                        t.status === 'Present' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <button 
                        onClick={() => alert(`Contacting ${t.name}`)}
                        className="text-xs font-semibold text-primary hover:underline"
                      >
                        Contact
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}