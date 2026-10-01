import React, { useState } from 'react';
import { teachersList } from '../data/mockData';
import { MessageSquare, Send } from 'lucide-react';

export default function Messages() {
  const [activeTeacher, setActiveTeacher] = useState(teachersList[0]);
  const [chatLog, setChatLog] = useState([
    { from: 'them', text: 'Respected Administrator, term exam papers for Mathematics are prepared.' },
    { from: 'me', text: 'Thank you Mr. Ahsan. Please ensure syllabus completion.' }
  ]);
  const [msgInput, setMsgInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!msgInput.trim()) return;
    setChatLog([...chatLog, { from: 'me', text: msgInput }]);
    setMsgInput('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-ink">Messages & Faculty Chat</h1>
        <p className="text-xs text-muted mt-0.5">Direct messaging with all faculty members and staff</p>
      </div>

      <div className="bg-white rounded-card border border-line shadow-soft overflow-hidden grid md:grid-cols-[280px_1fr] h-[550px]">
        {/* Left Contacts */}
        <div className="border-r border-line overflow-y-auto divide-y divide-line">
          {teachersList.map((t) => (
            <div 
              key={t.id} 
              onClick={() => setActiveTeacher(t)}
              className={`p-3.5 cursor-pointer hover:bg-slate-50 ${t.id === activeTeacher.id ? 'bg-primary/10 border-l-4 border-l-primary' : ''}`}
            >
              <p className="text-xs font-bold text-ink">{t.name}</p>
              <p className="text-[11px] text-muted">{t.department}</p>
            </div>
          ))}
        </div>

        {/* Right Chat Box */}
        <div className="flex flex-col">
          <div className="p-4 border-b border-line bg-slate-50 font-bold text-xs text-ink">
            Chat with {activeTeacher.name} ({activeTeacher.department})
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
            {chatLog.map((m, idx) => (
              <div key={idx} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] px-4 py-2.5 rounded-card text-xs ${m.from === 'me' ? 'bg-primary text-white' : 'bg-white border border-line text-ink'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSend} className="p-3 border-t border-line flex gap-2">
            <input 
              type="text" 
              value={msgInput}
              onChange={(e) => setMsgInput(e.target.value)}
              placeholder="Type message..." 
              className="flex-1 px-3 py-2 rounded-inp border border-line text-xs" 
            />
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-btn text-xs font-bold flex items-center gap-1">
              Send <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
