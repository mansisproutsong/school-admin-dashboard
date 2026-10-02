import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { MessageCircle } from 'lucide-react';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-bg relative">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 space-y-6 max-w-[1440px] w-full mx-auto relative">
          <Outlet />
        </main>
      </div>

      {/* Chatbot Button */}
      <button 
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-all z-50 animate-bounce"
        title="Need Help?"
        onClick={() => alert("Chatbot coming soon!")}
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
}