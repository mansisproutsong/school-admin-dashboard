import React, { useState } from 'react';
import { Building, Calendar, Shield, Bell, Check, Save } from 'lucide-react';

const TABS = [
  { id: 'general',       label: 'School Info',    icon: Building },
  { id: 'academic',      label: 'Academics',      icon: Calendar },
  { id: 'notifications', label: 'Notifications',  icon: Bell },
  { id: 'permissions',   label: 'Permissions',    icon: Shield },
];

const InputField = ({ label, ...props }) => (
  <div>
    <label className="text-xs font-semibold text-muted block mb-1">{label}</label>
    <input className="w-full p-2.5 text-sm border border-line rounded-inp bg-bg focus:outline-none focus:ring-2 focus:ring-primary/25" {...props} />
  </div>
);

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [savedToast, setSavedToast] = useState(false);
  const [schoolProfile, setSchoolProfile] = useState({
    name: 'Green Valley International School',
    code: 'GVIS-2026',
    academicYear: '2026–27',
    principal: 'Mansi Jogani',
    email: 'admin@greenvalley.edu.in',
    phone: '+91 98765 00000',
    address: '123 Academic Enclave, Green Valley Road, City'
  });
  const [gradingScale, setGradingScale] = useState({ gradeA: 90, gradeB: 75, gradeC: 60, passPercentage: 35 });
  const [notifications, setNotifications] = useState({ emailAlerts: true, smsAlerts: true, lowAttendanceThreshold: 75, feeOverdueDays: 15 });

  const handleSave = (e) => {
    e?.preventDefault();
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-ink">Settings & Preferences</h1>
          <p className="text-xs text-muted mt-0.5">Manage school metadata, grading scales, fee rules, and administrative permissions</p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-btn hover:bg-blue-700 shrink-0 shadow-sm transition-colors"
        >
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>

      {savedToast && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-3 rounded-card text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4" /> Settings updated successfully!
        </div>
      )}

      {/* Tab Bar */}
      <div className="bg-white rounded-card border border-line shadow-sm p-1.5 flex flex-wrap gap-1">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-btn text-xs font-semibold transition-colors ${
              activeTab === id ? 'bg-primary text-white shadow-sm' : 'text-muted hover:bg-slate-50 hover:text-ink'
            }`}
          >
            <Icon className="w-3.5 h-3.5" /> {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-card border border-line shadow-sm p-6 space-y-6">
        {activeTab === 'general' && (
          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <h3 className="font-bold text-sm text-ink border-b border-line pb-2 mb-4">School Profile Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="School Name" type="text" value={schoolProfile.name} onChange={(e) => setSchoolProfile({...schoolProfile, name: e.target.value})} />
                <InputField label="School Code" type="text" value={schoolProfile.code} onChange={(e) => setSchoolProfile({...schoolProfile, code: e.target.value})} />
                <InputField label="Principal / Admin Head" type="text" value={schoolProfile.principal} onChange={(e) => setSchoolProfile({...schoolProfile, principal: e.target.value})} />
                <InputField label="Academic Session" type="text" value={schoolProfile.academicYear} onChange={(e) => setSchoolProfile({...schoolProfile, academicYear: e.target.value})} />
                <InputField label="Official Email" type="email" value={schoolProfile.email} onChange={(e) => setSchoolProfile({...schoolProfile, email: e.target.value})} />
                <InputField label="Contact Phone" type="text" value={schoolProfile.phone} onChange={(e) => setSchoolProfile({...schoolProfile, phone: e.target.value})} />
              </div>
              <div className="mt-4">
                <label className="text-xs font-semibold text-muted block mb-1">Campus Address</label>
                <textarea rows="2" value={schoolProfile.address} onChange={(e) => setSchoolProfile({...schoolProfile, address: e.target.value})}
                  className="w-full p-2.5 text-sm border border-line rounded-inp bg-bg focus:outline-none focus:ring-2 focus:ring-primary/25" />
              </div>
            </div>
          </form>
        )}

        {activeTab === 'academic' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-sm text-ink border-b border-line pb-2 mb-4">Grading Thresholds</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <InputField label="Grade 'A' Minimum %" type="number" value={gradingScale.gradeA} onChange={(e) => setGradingScale({...gradingScale, gradeA: e.target.value})} />
                <InputField label="Grade 'B' Minimum %" type="number" value={gradingScale.gradeB} onChange={(e) => setGradingScale({...gradingScale, gradeB: e.target.value})} />
                <InputField label="Passing Percentage %" type="number" value={gradingScale.passPercentage} onChange={(e) => setGradingScale({...gradingScale, passPercentage: e.target.value})} />
              </div>
            </div>

            <div>
              <h3 className="font-bold text-sm text-ink border-b border-line pb-2 mb-4">Class-wise Term Fee (₹)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[['Class 8', 14000], ['Class 9', 16000], ['Class 10', 18500], ['Class 11 Science', 22000], ['Class 11 Commerce', 20000], ['Class 12 Science', 22000], ['Class 12 Commerce', 20000]].map(([label, val]) => (
                  <InputField key={label} label={label} type="number" defaultValue={val} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-ink border-b border-line pb-2">Automatic Alert Settings</h3>
            <div className="space-y-3">
              {[
                { key: 'emailAlerts', label: 'Email Digest for Low Attendance Alerts', desc: 'Sends daily email when student attendance falls below 75%' },
                { key: 'smsAlerts',   label: 'SMS Reminders for Overdue Fees',         desc: 'Sends automatic SMS to parents for pending/overdue fees' },
              ].map(({ key, label, desc }) => (
                <label key={key} className="flex items-start gap-4 p-4 rounded-card border border-line hover:bg-slate-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={notifications[key]}
                    onChange={(e) => setNotifications({...notifications, [key]: e.target.checked})}
                    className="mt-0.5 w-4 h-4 accent-primary rounded"
                  />
                  <div>
                    <p className="text-sm font-bold text-ink">{label}</p>
                    <p className="text-xs text-muted mt-0.5">{desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'permissions' && (
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-ink border-b border-line pb-2">Role Permissions Matrix</h3>
            <div className="space-y-3">
              {[
                { role: 'Principal / Admin', desc: 'Full access to all classes, financial data, system settings', badge: 'Full Access', badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
                { role: 'Class Teacher',     desc: 'Can mark attendance, enter exam marks, broadcast class notices', badge: 'Class Scope', badgeClass: 'bg-blue-50 text-primary border-blue-200' },
                { role: 'Accountant',        desc: 'Fees module access: collect, record, and generate fee reports', badge: 'Fees Only',   badgeClass: 'bg-amber-50 text-amber-700 border-amber-200' },
                { role: 'Support Staff',     desc: 'View-only access to student roster and timetable', badge: 'View Only',   badgeClass: 'bg-slate-50 text-slate-600 border-slate-200' },
              ].map(({ role, desc, badge, badgeClass }) => (
                <div key={role} className="flex items-center justify-between p-4 bg-slate-50 rounded-card border border-line">
                  <div>
                    <p className="text-sm font-bold text-ink">{role}</p>
                    <p className="text-xs text-muted mt-0.5">{desc}</p>
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border shrink-0 ml-4 ${badgeClass}`}>{badge}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
