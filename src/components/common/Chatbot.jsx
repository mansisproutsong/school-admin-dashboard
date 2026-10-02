import React, { useState, useRef, useEffect } from 'react';
import { Mic, MessageSquare, X, Send, Bot, User, Info, BookOpen, Shield } from 'lucide-react';
import { createPortal } from 'react-dom';

const QUICK_ACTIONS = [
  { label: 'Fee Ledgers', icon: Info, query: 'Show fee collection summary' },
  { label: 'Exam Schedule', icon: BookOpen, query: 'Show upcoming exam dates' },
  { label: 'Attendance Rates', icon: Shield, query: 'Show today attendance overview' },
];

const PREDEFINED_RESPONSES = {
  fee: "Term 1 Fee Status Overview:\n• Total Collected: ₹8,42,000\n• Pending Fees: ₹1,56,000\n• Overdue Students: 12\n\nYou can collect payments directly in the Fees module.",
  attendance: "Today's Attendance Overview:\n• Class 10-A: 94.2% Present\n• Class 9-B: 91.5% Present\n• Overall School Average: 93.8%\n\n3 absent students logged today.",
  exam: "Mid-Term Examination Dates:\n• Oct 12: Mathematics (Class 9 & 10)\n• Oct 14: English Language (All Classes)\n• Oct 16: Science / Physics (Class 8-12)",
  default: "I can help you with student attendance, fee ledgers, teacher contact directories, or exam schedules. What details would you like to view?"
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('voice'); // 'voice' or 'text'
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: `Hello! I am your AI Assistant for Green Valley International School.\nHow can I assist you today?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && activeTab === 'text') {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen, activeTab]);

  const handleSendQuery = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    setActiveTab('text');

    const userMsg = {
      id: Date.now(),
      type: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = PREDEFINED_RESPONSES.default;
      const lower = query.toLowerCase();

      if (lower.includes('fee') || lower.includes('payment') || lower.includes('due') || lower.includes('ledger')) {
        replyText = PREDEFINED_RESPONSES.fee;
      } else if (lower.includes('attendance') || lower.includes('present') || lower.includes('absent') || lower.includes('rate')) {
        replyText = PREDEFINED_RESPONSES.attendance;
      } else if (lower.includes('exam') || lower.includes('test') || lower.includes('schedule') || lower.includes('date')) {
        replyText = PREDEFINED_RESPONSES.exam;
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          type: 'bot',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 700);
  };

  const handleMicClick = () => {
    if (activeTab === 'voice') {
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        handleSendQuery('Show fee collection summary');
      }, 2000);
    } else {
      handleSendQuery();
    }
  };

  const FloatingButton = (
    <button
      onClick={() => setIsOpen(!isOpen)}
      aria-label="Toggle AI Assistant"
      className={`fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-xl hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all z-40 ${
        isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
      }`}
    >
      <MessageSquare className="w-6 h-6" />
      <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
    </button>
  );

  const ChatWindow = isOpen && createPortal(
    <div className="fixed bottom-6 right-6 w-[350px] sm:w-[380px] h-[520px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden z-[9999] font-sans">
      
      {/* Top Header Row */}
      <div className="px-5 pt-5 pb-2 flex justify-between items-center bg-white border-b border-slate-100 z-10">
        {/* Voice / Text Toggle Switch */}
        <div className="bg-slate-100 p-1 rounded-full flex items-center gap-1 border border-slate-200/60">
          <button
            onClick={() => setActiveTab('voice')}
            className={`px-3.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'voice'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Mic className="w-3.5 h-3.5" /> Voice
          </button>
          <button
            onClick={() => setActiveTab('text')}
            className={`px-3.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'text'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" /> Text
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content Area */}
      {activeTab === 'voice' ? (
        /* VOICE / HOME MODE UI */
        <div className="flex-1 flex flex-col items-center justify-between px-6 py-4 text-center bg-white">
          
          {/* Main Headline */}
          <div className="mt-1 space-y-1">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-snug">
              Your <span className="text-blue-600 font-black">AI Help</span> For<br />every step!
            </h2>
          </div>

          {/* Glowing AI Orb Character */}
          <div className="relative w-28 h-28 my-auto flex items-center justify-center">
            {/* Ambient Radial Glow */}
            <div className={`absolute inset-0 bg-blue-500/20 rounded-full blur-2xl transition-all duration-700 ${
              isListening ? 'scale-125 bg-blue-600/40' : 'animate-pulse'
            }`} />
            
            {/* Glowing Sphere Body */}
            <div className={`relative w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 transition-all duration-500 ${
              isListening ? 'scale-110' : ''
            }`}>
              {/* Eye Left */}
              <span className="w-2 h-4 bg-white rounded-full opacity-90 shadow-sm" />
              {/* Eye Right */}
              <span className="w-2 h-4 bg-white rounded-full opacity-90 shadow-sm" />
            </div>
          </div>

          {/* Prompt & Quick Action Pills */}
          <div className="w-full space-y-3 mb-1">
            <p className="text-xs font-semibold text-slate-500">
              {isListening ? "Listening to your voice..." : "How can I assist you today?"}
            </p>

            {/* Action Pills Grid */}
            <div className="flex flex-wrap justify-center gap-2">
              {QUICK_ACTIONS.slice(0, 2).map((act, i) => {
                const Icon = act.icon;
                return (
                  <button
                    key={i}
                    onClick={() => handleSendQuery(act.query)}
                    className="bg-white hover:bg-blue-50/80 text-slate-700 hover:text-blue-600 border border-slate-200 px-4 py-2 rounded-full text-xs font-semibold shadow-2xs hover:border-blue-200 flex items-center gap-1.5 transition-all"
                  >
                    <Icon className="w-3.5 h-3.5 text-blue-600" />
                    {act.label}
                  </button>
                );
              })}
              {QUICK_ACTIONS.slice(2, 3).map((act, i) => {
                const Icon = act.icon;
                return (
                  <button
                    key={i}
                    onClick={() => handleSendQuery(act.query)}
                    className="bg-white hover:bg-blue-50/80 text-slate-700 hover:text-blue-600 border border-slate-200 px-4 py-2 rounded-full text-xs font-semibold shadow-2xs hover:border-blue-200 flex items-center gap-1.5 transition-all"
                  >
                    <Icon className="w-3.5 h-3.5 text-blue-600" />
                    {act.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* TEXT CHAT MODE UI */
        <div className="flex-1 bg-slate-50/50 p-4 overflow-y-auto space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-2 ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                msg.type === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-blue-400'
              }`}>
                {msg.type === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              <div className={`max-w-[78%] space-y-1 ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                  msg.type === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-2xs whitespace-pre-line'
                }`}>
                  {msg.text}
                </div>
                <p className={`text-[9px] text-slate-400 font-medium px-1 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2 items-center">
              <div className="w-7 h-7 rounded-full bg-slate-900 text-blue-400 flex items-center justify-center shrink-0">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none shadow-2xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Bottom Floating Input Bar */}
      <div className="p-3 bg-white border-t border-slate-100">
        <form onSubmit={(e) => { e.preventDefault(); handleSendQuery(); }} className="flex items-center gap-2">
          <div className="flex-1 relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="w-full pl-4 pr-3 py-2.5 bg-white border border-slate-200 rounded-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-2xs"
            />
          </div>

          <button
            type={activeTab === 'text' && input.trim() ? 'submit' : 'button'}
            onClick={activeTab === 'text' && input.trim() ? undefined : handleMicClick}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md transition-all shrink-0 ${
              isListening ? 'bg-red-500 animate-pulse' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
            }`}
          >
            {activeTab === 'text' && input.trim() ? (
              <Send className="w-4 h-4 translate-x-[1px]" />
            ) : (
              <Mic className="w-4 h-4" />
            )}
          </button>
        </form>
      </div>

    </div>,
    document.body
  );

  return (
    <>
      {FloatingButton}
      {ChatWindow}
    </>
  );
}
