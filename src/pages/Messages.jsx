import React, { useState } from 'react';
import { teachersList } from '../data/mockData';
import { MessageSquare, Send, CheckCheck, UserCheck, PhoneCall, Circle } from 'lucide-react';

export default function Messages() {
  const [activeTeacher, setActiveTeacher] = useState(teachersList[0]);
  
  // Chat logs stored per teacher ID
  const [chatLogs, setChatLogs] = useState({
    'T1': [
      { id: 1, from: 'them', text: 'Respected Administrator, term exam papers for Mathematics are prepared and submitted to the printing department.', time: '09:30 AM' },
      { id: 2, from: 'me', text: 'Thank you Mr. Ahsan. Please ensure syllabus completion for Class 10-A by Friday.', time: '09:42 AM' },
      { id: 3, from: 'them', text: 'Will do, maam! We are currently covering Polynomials chapter.', time: '10:05 AM' }
    ],
    'T2': [
      { id: 1, from: 'them', text: 'Good morning! Physics lab apparatus order request has been submitted.', time: 'Yesterday' },
      { id: 2, from: 'me', text: 'Approved. The vendor will deliver by next week.', time: 'Yesterday' }
    ],
    'T3': [
      { id: 1, from: 'them', text: 'Requesting sick leave approval for today.', time: '08:15 AM' },
      { id: 2, from: 'me', text: 'Leave granted. Please coordinate proxy classes with Ms. Sania.', time: '08:30 AM' }
    ],
    'T4': [
      { id: 1, from: 'them', text: 'English debate competition entries are finalized (14 students selected).', time: '2 days ago' },
      { id: 2, from: 'me', text: 'Great work Ms. Sania!', time: '2 days ago' }
    ],
    'T5': [
      { id: 1, from: 'them', text: 'Computer Lab 2 network maintenance completed.', time: '10:15 AM' },
      { id: 2, from: 'me', text: 'Excellent, thank you Mr. Adeel.', time: '10:20 AM' }
    ]
  });

  const [msgInput, setMsgInput] = useState('');

  const currentChat = chatLogs[activeTeacher.id] || [];

  const handleSend = (e) => {
    e.preventDefault();
    if (!msgInput.trim()) return;

    const newMsg = {
      id: Date.now(),
      from: 'me',
      text: msgInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatLogs(prev => ({
      ...prev,
      [activeTeacher.id]: [...(prev[activeTeacher.id] || []), newMsg]
    }));

    setMsgInput('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-ink">Faculty Chat & Internal Messaging</h1>
        <p className="text-xs text-muted mt-0.5">Direct 1-on-1 messaging with faculty members, department heads, and staff</p>
      </div>

      <div className="bg-white rounded-card border border-line shadow-soft overflow-hidden grid md:grid-cols-[300px_1fr] h-[600px]">
        {/* Left Faculty Roster */}
        <div className="border-r border-line flex flex-col bg-white">
          <div className="p-3.5 border-b border-line bg-slate-50 font-bold text-xs text-ink flex items-center justify-between">
            <span>Faculty Members ({teachersList.length})</span>
            <span className="text-[10px] text-success font-semibold flex items-center gap-1">
              <Circle className="w-2 h-2 fill-success text-success" /> 4 Active
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-line">
            {teachersList.map((t) => {
              const lastMsg = (chatLogs[t.id] || []).slice(-1)[0];
              const isSelected = t.id === activeTeacher.id;

              return (
                <div 
                  key={t.id} 
                  onClick={() => setActiveTeacher(t)}
                  className={`p-3.5 cursor-pointer hover:bg-slate-50 transition-colors ${
                    isSelected ? 'bg-primary/10 border-l-4 border-l-primary' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-ink flex items-center gap-1.5">
                      <span>{t.name}</span>
                    </p>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                      t.status === 'Present' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
                    }`}>
                      {t.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-primary font-medium mt-0.5">{t.department} Dept</p>
                  {lastMsg && (
                    <p className="text-[11px] text-muted truncate mt-1">
                      {lastMsg.from === 'me' ? 'You: ' : ''}{lastMsg.text}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Active Chat Pane */}
        <div className="flex flex-col bg-slate-50/50">
          {/* Header */}
          <div className="p-4 border-b border-line bg-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center">
                {activeTeacher.name.charAt(4) || activeTeacher.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xs font-bold text-ink">{activeTeacher.name}</h3>
                <p className="text-[11px] text-muted">{activeTeacher.department} Department • Classes: {activeTeacher.classes}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a 
                href={`tel:${activeTeacher.phone}`} 
                className="text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-btn flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" /> Call
              </a>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {currentChat.map((m) => (
              <div key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] space-y-1`}>
                  <div className={`px-4 py-2.5 rounded-card text-xs shadow-sm ${
                    m.from === 'me' ? 'bg-primary text-white rounded-br-none' : 'bg-white border border-line text-ink rounded-bl-none'
                  }`}>
                    {m.text}
                  </div>
                  <p className={`text-[9px] text-muted ${m.from === 'me' ? 'text-right' : 'text-left'}`}>
                    {m.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-line flex gap-2">
            <input 
              type="text" 
              value={msgInput}
              onChange={(e) => setMsgInput(e.target.value)}
              placeholder={`Write a message to ${activeTeacher.name}...`}
              className="flex-1 px-3.5 py-2.5 rounded-inp border border-line text-xs bg-bg focus:outline-none focus:ring-2 focus:ring-primary/25" 
            />
            <button 
              type="submit" 
              className="px-5 py-2.5 bg-primary text-white rounded-btn text-xs font-bold flex items-center gap-1.5 hover:bg-blue-700 shadow-sm"
            >
              <span>Send</span> <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
