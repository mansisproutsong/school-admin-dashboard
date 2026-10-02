import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  GraduationCap, LayoutDashboard, Users, School, ClipboardCheck, 
  BookOpen, FileText, Award, Presentation, Wallet, Megaphone, 
  CalendarDays, MessageSquare, FileBarChart, Settings, HelpCircle, LogOut 
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  const navGroups = [
    {
      label: 'MAIN',
      items: [
        { path: '/', label: 'Dashboard', icon: LayoutDashboard },
      ]
    },
    {
      label: 'STUDENT MANAGEMENT',
      items: [
        { path: '/students', label: 'Students', icon: Users },
        { path: '/classes', label: 'Classes', icon: School },
      ]
    },
    {
      label: 'ATTENDANCE',
      items: [
        { path: '/attendance', label: 'Attendance', icon: ClipboardCheck },
      ]
    },
    {
      label: 'ACADEMICS',
      items: [
        { path: '/subjects', label: 'Subjects', icon: BookOpen },
        { path: '/exams', label: 'Exams', icon: FileText },
        { path: '/results', label: 'Results', icon: Award },
      ]
    },
    {
      label: 'STAFF',
      items: [
        { path: '/teachers', label: 'Teachers & Staff', icon: Presentation },
      ]
    },
    {
      label: 'FINANCE',
      items: [
        { path: '/fees', label: 'Fees', icon: Wallet },
      ]
    },
    {
      label: 'COMMUNICATION',
      items: [
        { path: '/notices', label: 'Notices', icon: Megaphone },
        { path: '/events', label: 'Events', icon: CalendarDays },
        { path: '/messages', label: 'Messages', icon: MessageSquare },
      ]
    },
    {
      label: 'REPORTS',
      items: [
        { path: '/reports', label: 'Reports', icon: FileBarChart },
      ]
    },
    {
      label: 'SYSTEM',
      items: [
        { path: '/settings', label: 'Settings', icon: Settings },
        { path: '/help', label: 'Help & Support', icon: HelpCircle },
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-ink/40 z-40 lg:hidden transition-opacity" 
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-50 h-screen w-[260px] bg-white border-r border-line flex flex-col shrink-0 transition-transform duration-200
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand Header */}
        <div className="h-[72px] flex items-center justify-between px-5 border-b border-line shrink-0">
          <Link to="/" className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-btn bg-primary flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <span className="font-bold text-base text-ink block truncate tracking-tight">EduAdmin</span>
              <span className="text-[10px] text-muted block -mt-1 font-medium">School Management</span>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              <p className="px-3 text-[10px] font-bold text-muted tracking-wider uppercase">
                {group.label}
              </p>
              {group.items.map((item, iIdx) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={iIdx}
                    to={item.path}
                    onClick={onClose}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-btn text-sm font-medium transition-colors
                      ${isActive 
                        ? 'bg-primary text-white shadow-sm font-semibold' 
                        : 'text-muted hover:bg-slate-100 hover:text-ink'}
                    `}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-muted'}`} />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer Admin Profile */}
        <div className="border-t border-line p-4 flex items-center gap-3 bg-slate-50/50 shrink-0">
          <img 
            src="https://i.pravatar.cc/64?img=47" 
            alt="Mansi Jogani" 
            className="w-9 h-9 rounded-full shrink-0 border border-line" 
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-ink truncate">Mansi Jogani</p>
            <p className="text-[11px] text-muted truncate">School Administrator</p>
          </div>
          <button title="Log out" className="text-muted hover:text-danger p-1 rounded-md">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>
    </>
  );
}