import React from 'react';
import { Link } from 'react-router-dom';
import { useFilter } from '../context/FilterContext';
import ClassSelector from '../components/common/ClassSelector';
import { attentionRequiredAlerts, eventsList, noticesList } from '../data/mockData';
import { 
  Users, ClipboardCheck, Wallet, Award, ShieldAlert, Sun, ArrowUpRight, 
  UserPlus, UserCheck, Megaphone, CalendarPlus, Receipt, FileText, 
  Trophy, Calendar, ArrowRight, Activity
} from 'lucide-react';

export default function Dashboard() {
  const { getFilteredData, selectedClassId } = useFilter();
  const { isOverall, scopeText, kpis } = getFilteredData();

  return (
    <div className="space-y-6">
      {/* 1. GLOBAL CLASS CONTEXT SELECTOR BAR */}
      <ClassSelector />

      {/* 2. WELCOME BANNER */}
      <div className="bg-primary rounded-card p-6 sm:p-8 flex items-center justify-between overflow-hidden relative text-white shadow-soft">
        <div className="relative z-10 space-y-1 max-w-2xl">
          <p className="text-blue-100 text-xs sm:text-sm font-semibold tracking-wide uppercase">
            Good Morning, Admin 👋
          </p>
          <h1 className="text-xl sm:text-3xl font-bold tracking-tight">
            Here’s what’s happening at EduAdmin today.
          </h1>
          <p className="text-blue-100 text-xs sm:text-sm pt-1 font-medium">
            {scopeText}
          </p>
        </div>
        <Sun className="w-28 h-28 text-white/15 absolute -right-4 -bottom-4 hidden sm:block pointer-events-none" />
      </div>

      {/* 3. DYNAMIC KPI CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Total Students */}
        <Link to="/students" className="bg-white rounded-card border border-line p-5 shadow-soft hover:border-primary transition-all block group">
          <div className="flex items-center justify-between mb-3">
            <span className="w-10 h-10 rounded-btn bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Users className="w-5 h-5 text-primary" />
            </span>
            <span className="text-xs font-semibold text-success bg-success/10 px-2.5 py-1 rounded-full">
              {kpis.studentGrowth}
            </span>
          </div>
          <p className="text-2xl font-bold text-ink tracking-tight">{kpis.totalStudents}</p>
          <p className="text-xs text-muted mt-1 font-medium">
            {isOverall ? 'Total Enrolled Students' : `Students in Class ${selectedClassId}`}
          </p>
        </Link>

        {/* KPI 2: Today's Attendance */}
        <Link to="/attendance" className="bg-white rounded-card border border-line p-5 shadow-soft hover:border-success transition-all block group">
          <div className="flex items-center justify-between mb-3">
            <span className="w-10 h-10 rounded-btn bg-success/10 flex items-center justify-center group-hover:bg-success/20 transition-colors">
              <ClipboardCheck className="w-5 h-5 text-success" />
            </span>
            <span className="text-xs font-semibold text-success bg-success/10 px-2.5 py-1 rounded-full">
              Active
            </span>
          </div>
          <p className="text-2xl font-bold text-ink tracking-tight">{kpis.attendancePct}</p>
          <p className="text-xs text-muted mt-1 font-medium">{kpis.attendanceBreakdown}</p>
        </Link>

        {/* KPI 3: Fee Collection */}
        <Link to="/fees" className="bg-white rounded-card border border-line p-5 shadow-soft hover:border-warning transition-all block group">
          <div className="flex items-center justify-between mb-3">
            <span class="w-10 h-10 rounded-btn bg-warning/10 flex items-center justify-center group-hover:bg-warning/20 transition-colors">
              <Wallet className="w-5 h-5 text-warning" />
            </span>
            <span className="text-xs font-semibold text-success bg-success/10 px-2.5 py-1 rounded-full">
              {kpis.feePct}
            </span>
          </div>
          <p className="text-2xl font-bold text-ink tracking-tight">{kpis.feeCollected} <span className="text-xs font-normal text-muted">/ {kpis.feeExpected}</span></p>
          <p className="text-xs text-muted mt-1 font-medium">Fee Collection Status</p>
        </Link>

        {/* KPI 4: Academic Performance */}
        <Link to="/results" className="bg-white rounded-card border border-line p-5 shadow-soft hover:border-purple-500 transition-all block group">
          <div className="flex items-center justify-between mb-3">
            <span className="w-10 h-10 rounded-btn bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
              <Award className="w-5 h-5 text-purple-600" />
            </span>
            <span className="text-xs font-semibold text-success bg-success/10 px-2.5 py-1 rounded-full">
              {kpis.academicGrowth}
            </span>
          </div>
          <p className="text-2xl font-bold text-ink tracking-tight">{kpis.academicAvg}</p>
          <p className="text-xs text-muted mt-1 font-medium">Academic Performance Avg</p>
        </Link>
      </div>

      {/* 4. ATTENTION REQUIRED SECTION */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-sm text-ink flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-danger" /> Attention Required
          </h2>
          <span className="text-xs text-muted font-medium">Issues needing immediate administrative decision</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {attentionRequiredAlerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`
                p-4 rounded-card border flex flex-col justify-between space-y-3 transition-shadow
                ${alert.severity === 'danger' ? 'bg-red-50/70 border-red-200' : ''}
                ${alert.severity === 'warning' ? 'bg-amber-50/70 border-amber-200' : ''}
                ${alert.severity === 'primary' ? 'bg-blue-50/70 border-blue-200' : ''}
                ${alert.severity === 'purple' ? 'bg-purple-50/70 border-purple-200' : ''}
              `}
            >
              <div>
                <p className={`text-sm font-bold ${
                  alert.severity === 'danger' ? 'text-red-900' : 
                  alert.severity === 'warning' ? 'text-amber-900' : 
                  alert.severity === 'primary' ? 'text-blue-900' : 'text-purple-900'
                }`}>
                  {!isOverall ? alert.title.replace('24 students', '2 students in ' + selectedClassId) : alert.title}
                </p>
                <p className="text-xs text-muted mt-1 font-medium">{alert.subtext}</p>
              </div>
              <Link 
                to={alert.link}
                className="text-xs font-semibold bg-white border border-line px-3 py-1.5 rounded-btn text-center hover:bg-slate-100 transition-colors text-ink shadow-sm flex items-center justify-center gap-1"
              >
                <span>{alert.actionText}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-muted" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* 5. DASHBOARD BOTTOM: NOTICES & CALENDAR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Notices */}
        <div className="lg:col-span-2 bg-white rounded-card border border-line p-5 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <h3 className="font-bold text-sm text-ink flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-warning" /> Recent Announcements & Notices
            </h3>
            <Link to="/notices" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            {noticesList.map((ntc) => (
              <div key={ntc.id} className="flex items-center justify-between p-3 rounded-btn border border-line hover:bg-slate-50 transition-colors">
                <div>
                  <p className="text-xs font-bold text-ink">{ntc.title}</p>
                  <p className="text-[11px] text-muted">{ntc.date} • Category: {ntc.category}</p>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  ntc.priority === 'High' ? 'bg-danger/10 text-danger' : 'bg-slate-100 text-muted'
                }`}>
                  {ntc.priority} Priority
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Calendar & Events */}
        <div className="space-y-6 lg:col-span-1">
          {/* Calendar Widget */}
          <div className="bg-white rounded-card border border-line p-5 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <button className="p-1 hover:bg-slate-100 rounded text-muted">&lt;</button>
              <h3 className="font-bold text-sm text-ink">October 2026</h3>
              <button className="p-1 hover:bg-slate-100 rounded text-muted">&gt;</button>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-muted mb-2">
              <div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div><div>SUN</div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-ink">
              <div className="text-slate-300">28</div><div className="text-slate-300">29</div><div className="text-slate-300">30</div>
              <div className="p-1">1</div>
              <div className="p-1 bg-primary text-white rounded font-bold shadow-sm">2</div>
              <div className="p-1">3</div><div className="p-1 text-danger">4</div>
              <div className="p-1">5</div><div className="p-1">6</div><div className="p-1">7</div><div className="p-1">8</div><div className="p-1">9</div><div className="p-1">10</div><div className="p-1 text-danger">11</div>
              <div className="p-1 bg-blue-100 text-blue-800 rounded font-bold">12</div>
              <div className="p-1">13</div><div className="p-1">14</div><div className="p-1">15</div><div className="p-1">16</div><div className="p-1">17</div><div className="p-1 text-danger">18</div>
              <div className="p-1">19</div><div className="p-1">20</div><div className="p-1">21</div><div className="p-1">22</div><div className="p-1">23</div><div className="p-1">24</div><div className="p-1 text-danger">25</div>
              <div className="p-1">26</div><div className="p-1">27</div><div className="p-1">28</div><div className="p-1">29</div><div className="p-1">30</div><div className="p-1">31</div>
              <div className="text-slate-300">1</div>
            </div>
          </div>

          {/* Events */}
          <div className="bg-white rounded-card border border-line p-5 shadow-soft space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h3 className="font-bold text-sm text-ink flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" /> Upcoming Events
              </h3>
            </div>
            <div className="space-y-3">
              {eventsList.slice(0, 3).map((evt) => (
                <div key={evt.id} className="p-3 rounded-btn border-l-2 border-primary bg-slate-50">
                  <p className="text-xs font-bold text-ink">{evt.title}</p>
                  <p className="text-[10px] text-muted mt-0.5">{evt.date} • {evt.time}</p>
                </div>
              ))}
              <Link to="/events" className="block text-center text-xs font-semibold text-primary hover:underline mt-2">
                View All Events
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}