import React, { useState, useRef, useEffect } from 'react';
import { teachers } from '../data/teachers';
import { Send, PhoneCall, Circle, Search } from 'lucide-react';

const getInitials = (name) =>
  name.replace('Dr. ', '').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

const AVATAR_COLORS = [
  'bg-blue-100 text-blue-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
  'bg-indigo-100 text-indigo-700',
  'bg-teal-100 text-teal-700',
];

const INITIAL_CHATS = {
  'T001': [
    { id: 1, from: 'them', text: 'Respected Administrator, term exam papers for Mathematics are prepared and submitted to the printing department.', time: '09:30 AM' },
    { id: 2, from: 'me',   text: 'Thank you Dr. Priya. Please ensure syllabus completion for Class 9-A by Friday.', time: '09:42 AM' },
    { id: 3, from: 'them', text: 'Will do! We are currently covering Polynomials chapter.', time: '10:05 AM' },
  ],
  'T002': [
    { id: 1, from: 'them', text: 'Good morning! Mathematics extra class for Class 10-A has been scheduled for Saturday.', time: 'Yesterday' },
    { id: 2, from: 'me',   text: 'Approved. Please inform the students accordingly.', time: 'Yesterday' },
  ],
  'T003': [
    { id: 1, from: 'them', text: 'English assignment submissions have been collected from all students in 8-A and 8-B.', time: '08:15 AM' },
    { id: 2, from: 'me',   text: 'Perfect. Please compile the marks by end of day.', time: '08:30 AM' },
  ],
};

export default function Messages() {
  const [activeTeacher, setActiveTeacher] = useState(teachers[0]);
  const [chatLogs, setChatLogs] = useState(INITIAL_CHATS);
  const [msgInput, setMsgInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);

  const currentChat = chatLogs[activeTeacher.id] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat, activeTeacher]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!msgInput.trim()) return;
    const newMsg = {
      id: Date.now(),
      from: 'me',
      text: msgInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setChatLogs(prev => ({ ...prev, [activeTeacher.id]: [...(prev[activeTeacher.id] || []), newMsg] }));
    setMsgInput('');
  };

  const filteredTeachers = teachers.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-ink">Faculty Chat & Messaging</h1>
        <p className="text-xs text-muted mt-0.5">Direct 1-on-1 messaging with faculty members, department heads, and staff</p>
      </div>

      <div className="bg-white rounded-card border border-line shadow-sm overflow-hidden flex h-[650px] max-h-[85vh]">
        {/* Left Roster */}
        <div className="w-[300px] border-r border-line flex flex-col bg-white shrink-0">
          <div className="p-4 border-b border-line space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-ink">Faculty Directory</span>
              <span className="text-[10px] text-success font-semibold flex items-center gap-1">
                <Circle className="w-2 h-2 fill-success text-success" /> Online
              </span>
            </div>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search staff..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-line rounded-inp bg-bg focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredTeachers.length === 0 ? (
              <p className="p-4 text-center text-xs text-muted">No staff found.</p>
            ) : (
              filteredTeachers.map((t) => {
                const lastMsg = (chatLogs[t.id] || []).slice(-1)[0];
                const isSelected = t.id === activeTeacher.id;
                const colorClass = AVATAR_COLORS[teachers.indexOf(t) % AVATAR_COLORS.length];
                return (
                  <div
                    key={t.id}
                    onClick={() => setActiveTeacher(t)}
                    className={`p-3.5 cursor-pointer hover:bg-slate-50 transition-colors flex gap-3 items-start ${isSelected ? 'bg-primary/5 border-l-2 border-l-primary' : 'border-l-2 border-l-transparent'}`}
                  >
                    <div className={`w-9 h-9 rounded-full ${colorClass} flex items-center justify-center shrink-0 font-bold text-xs`}>
                      {getInitials(t.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <p className={`text-xs font-bold truncate ${isSelected ? 'text-primary' : 'text-ink'}`}>{t.name}</p>
                        <span className={`text-[9px] font-semibold shrink-0 ${t.status === 'Active' ? 'text-success' : 'text-muted'}`}>●</span>
                      </div>
                      <p className="text-[10px] text-muted font-medium">{t.department}</p>
                      {lastMsg && (
                        <p className="text-[11px] text-muted truncate mt-1">
                          {lastMsg.from === 'me' ? 'You: ' : ''}{lastMsg.text}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Chat Pane */}
        <div className="flex-1 flex flex-col bg-slate-50/50 min-w-0">
          {/* Chat Header */}
          <div className="px-5 py-4 border-b border-line bg-white flex items-center justify-between shadow-sm z-10">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${AVATAR_COLORS[teachers.findIndex(t => t.id === activeTeacher.id) % AVATAR_COLORS.length]} flex items-center justify-center font-bold text-sm shadow-sm`}>
                {getInitials(activeTeacher.name)}
              </div>
              <div>
                <h3 className="text-sm font-bold text-ink">{activeTeacher.name}</h3>
                <p className="text-[11px] text-muted mt-0.5">{activeTeacher.department} Dept &nbsp;·&nbsp; Classes: {activeTeacher.assignedClasses.join(', ')}</p>
              </div>
            </div>
            <a
              href={`tel:${activeTeacher.phone}`}
              className="text-xs font-semibold text-primary bg-primary/5 border border-primary/20 hover:bg-primary/10 px-4 py-2 rounded-btn flex items-center gap-2 transition-colors"
            >
              <PhoneCall className="w-4 h-4" /> Call Faculty
            </a>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            {currentChat.length === 0 ? (
              <p className="text-center text-muted text-xs mt-10 bg-white border border-line rounded-full py-1.5 px-4 mx-auto w-max">No messages yet. Start the conversation.</p>
            ) : (
              currentChat.map((m) => (
                <div key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className="max-w-[75%] space-y-1">
                    <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      m.from === 'me'
                        ? 'bg-primary text-white rounded-br-sm'
                        : 'bg-white border border-line text-ink rounded-bl-sm'
                    }`}>
                      {m.text}
                    </div>
                    <p className={`text-[10px] text-muted font-medium ${m.from === 'me' ? 'text-right' : 'text-left'}`}>{m.time}</p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 bg-white border-t border-line">
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                type="text"
                value={msgInput}
                onChange={(e) => setMsgInput(e.target.value)}
                placeholder={`Write a message to ${activeTeacher.name}...`}
                className="flex-1 px-4 py-2.5 rounded-inp border border-line text-sm bg-bg focus:outline-none focus:ring-2 focus:ring-primary/25 transition-all"
              />
              <button
                type="submit"
                disabled={!msgInput.trim()}
                className="px-6 py-2.5 bg-primary text-white rounded-btn text-sm font-bold flex items-center gap-2 hover:bg-blue-700 shadow-sm transition-colors disabled:opacity-50 disabled:hover:bg-primary"
              >
                Send <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
