import React, { useState } from 'react';
import ClassSelector from '../components/common/ClassSelector';
import { Settings as SettingsIcon, Building, Calendar, Shield, Bell, Check, Save } from 'lucide-react';

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

  const [gradingScale, setGradingScale] = useState({
    gradeA: 90,
    gradeB: 75,
    gradeC: 60,
    passPercentage: 35
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: true,
    lowAttendanceThreshold: 75,
    feeOverdueDays: 15
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <div className="space-y-6">
      <ClassSelector />

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-ink">Institutional Settings & Preferences</h1>
          <p className="text-xs text-muted mt-0.5">Manage school metadata, grading scales, fee rules, and administrative permissions</p>
        </div>

        <button 
          onClick={handleSave}
          className="bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-btn hover:bg-blue-700 flex items-center gap-2 shadow-sm"
        >
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>

      {savedToast && (
        <div className="bg-success/10 border border-success text-success p-3 rounded-card text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4" /> Settings updated successfully!
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-card border border-line p-2 shadow-soft flex flex-wrap gap-2 text-xs">
        <button
          onClick={() => setActiveTab('general')}
          className={`px-4 py-2 rounded-btn font-semibold flex items-center gap-2 ${
            activeTab === 'general' ? 'bg-primary text-white' : 'text-muted hover:bg-slate-50'
          }`}
        >
          <Building className="w-4 h-4" /> General School Info
        </button>
        <button
          onClick={() => setActiveTab('academic')}
          className={`px-4 py-2 rounded-btn font-semibold flex items-center gap-2 ${
            activeTab === 'academic' ? 'bg-primary text-white' : 'text-muted hover:bg-slate-50'
          }`}
        >
          <Calendar className="w-4 h-4" /> Academic & Grading
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-2 rounded-btn font-semibold flex items-center gap-2 ${
            activeTab === 'notifications' ? 'bg-primary text-white' : 'text-muted hover:bg-slate-50'
          }`}
        >
          <Bell className="w-4 h-4" /> Alerts & Notifications
        </button>
        <button
          onClick={() => setActiveTab('permissions')}
          className={`px-4 py-2 rounded-btn font-semibold flex items-center gap-2 ${
            activeTab === 'permissions' ? 'bg-primary text-white' : 'text-muted hover:bg-slate-50'
          }`}
        >
          <Shield className="w-4 h-4" /> Roles & Permissions
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-card border border-line p-6 shadow-soft space-y-6">
        {activeTab === 'general' && (
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <h3 className="font-bold text-sm text-ink border-b border-line pb-2">School Profile Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-muted">School Name</label>
                <input 
                  type="text" 
                  value={schoolProfile.name} 
                  onChange={(e) => setSchoolProfile({...schoolProfile, name: e.target.value})} 
                  className="w-full mt-1 p-2.5 border border-line rounded-inp focus:outline-none" 
                />
              </div>

              <div>
                <label className="font-semibold text-muted">School Code</label>
                <input 
                  type="text" 
                  value={schoolProfile.code} 
                  onChange={(e) => setSchoolProfile({...schoolProfile, code: e.target.value})} 
                  className="w-full mt-1 p-2.5 border border-line rounded-inp focus:outline-none" 
                />
              </div>

              <div>
                <label className="font-semibold text-muted">Principal / Admin Head</label>
                <input 
                  type="text" 
                  value={schoolProfile.principal} 
                  onChange={(e) => setSchoolProfile({...schoolProfile, principal: e.target.value})} 
                  className="w-full mt-1 p-2.5 border border-line rounded-inp focus:outline-none" 
                />
              </div>

              <div>
                <label className="font-semibold text-muted">Academic Session</label>
                <input 
                  type="text" 
                  value={schoolProfile.academicYear} 
                  onChange={(e) => setSchoolProfile({...schoolProfile, academicYear: e.target.value})} 
                  className="w-full mt-1 p-2.5 border border-line rounded-inp focus:outline-none" 
                />
              </div>

              <div>
                <label className="font-semibold text-muted">Official Email</label>
                <input 
                  type="email" 
                  value={schoolProfile.email} 
                  onChange={(e) => setSchoolProfile({...schoolProfile, email: e.target.value})} 
                  className="w-full mt-1 p-2.5 border border-line rounded-inp focus:outline-none" 
                />
              </div>

              <div>
                <label className="font-semibold text-muted">Contact Phone</label>
                <input 
                  type="text" 
                  value={schoolProfile.phone} 
                  onChange={(e) => setSchoolProfile({...schoolProfile, phone: e.target.value})} 
                  className="w-full mt-1 p-2.5 border border-line rounded-inp focus:outline-none" 
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-muted">Campus Address</label>
              <textarea 
                rows="2" 
                value={schoolProfile.address} 
                onChange={(e) => setSchoolProfile({...schoolProfile, address: e.target.value})} 
                className="w-full mt-1 p-2.5 border border-line rounded-inp focus:outline-none" 
              />
            </div>
          </form>
        )}

        {activeTab === 'academic' && (
          <div className="space-y-4 text-xs">
            <h3 className="font-bold text-sm text-ink border-b border-line pb-2">Grading Thresholds & Pass Criteria</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-muted">Grade 'A' Minimum %</label>
                <input 
                  type="number" 
                  value={gradingScale.gradeA} 
                  onChange={(e) => setGradingScale({...gradingScale, gradeA: e.target.value})} 
                  className="w-full mt-1 p-2.5 border border-line rounded-inp" 
                />
              </div>

              <div>
                <label className="font-semibold text-muted">Grade 'B' Minimum %</label>
                <input 
                  type="number" 
                  value={gradingScale.gradeB} 
                  onChange={(e) => setGradingScale({...gradingScale, gradeB: e.target.value})} 
                  className="w-full mt-1 p-2.5 border border-line rounded-inp" 
                />
              </div>

              <div>
                <label className="font-semibold text-muted">Passing Percentage (%)</label>
                <input 
                  type="number" 
                  value={gradingScale.passPercentage} 
                  onChange={(e) => setGradingScale({...gradingScale, passPercentage: e.target.value})} 
                  className="w-full mt-1 p-2.5 border border-line rounded-inp" 
                />
              </div>
            </div>

            <h3 className="font-bold text-sm text-ink border-b border-line pb-2 pt-4">Class-wise Academic Fee Setting</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="font-semibold text-muted">Class 8</label>
                <input type="number" defaultValue={14000} className="w-full mt-1 p-2.5 border border-line rounded-inp" />
              </div>
              <div>
                <label className="font-semibold text-muted">Class 9</label>
                <input type="number" defaultValue={16000} className="w-full mt-1 p-2.5 border border-line rounded-inp" />
              </div>
              <div>
                <label className="font-semibold text-muted">Class 10</label>
                <input type="number" defaultValue={18500} className="w-full mt-1 p-2.5 border border-line rounded-inp" />
              </div>
              <div>
                <label className="font-semibold text-muted">Class 11 Science</label>
                <input type="number" defaultValue={22000} className="w-full mt-1 p-2.5 border border-line rounded-inp" />
              </div>
              <div>
                <label className="font-semibold text-muted">Class 11 Commerce</label>
                <input type="number" defaultValue={20000} className="w-full mt-1 p-2.5 border border-line rounded-inp" />
              </div>
              <div>
                <label className="font-semibold text-muted">Class 12 Science</label>
                <input type="number" defaultValue={24000} className="w-full mt-1 p-2.5 border border-line rounded-inp" />
              </div>
              <div>
                <label className="font-semibold text-muted">Class 12 Commerce</label>
                <input type="number" defaultValue={22000} className="w-full mt-1 p-2.5 border border-line rounded-inp" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-4 text-xs">
            <h3 className="font-bold text-sm text-ink border-b border-line pb-2">Automatic Alert Thresholds</h3>
            
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notifications.emailAlerts} 
                  onChange={(e) => setNotifications({...notifications, emailAlerts: e.target.checked})} 
                  className="rounded text-primary" 
                />
                <span className="font-bold text-ink">Enable Email Digest for Low Attendance Alerts (&lt;75%)</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notifications.smsAlerts} 
                  onChange={(e) => setNotifications({...notifications, smsAlerts: e.target.checked})} 
                  className="rounded text-primary" 
                />
                <span className="font-bold text-ink">Send Automatic SMS Reminders to Parents for Overdue Fees</span>
              </label>
            </div>
          </div>
        )}

        {activeTab === 'permissions' && (
          <div className="space-y-4 text-xs">
            <h3 className="font-bold text-sm text-ink border-b border-line pb-2">Role Permissions Matrix</h3>
            
            <div className="space-y-2">
              <div className="p-3 bg-slate-50 rounded-btn border border-line flex justify-between items-center">
                <div>
                  <p className="font-bold text-ink">Principal / Admin</p>
                  <p className="text-muted">Full administrative access across all classes & financial data</p>
                </div>
                <span className="text-[10px] font-bold bg-success/10 text-success px-2.5 py-1 rounded-full">Full Access</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-btn border border-line flex justify-between items-center">
                <div>
                  <p className="font-bold text-ink">Class Teachers & Faculty</p>
                  <p className="text-muted">Can mark attendance, enter exam marks, and broadcast notices</p>
                </div>
                <span className="text-[10px] font-bold bg-primary/10 text-primary px-2.5 py-1 rounded-full">Class Scope</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
