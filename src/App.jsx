import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FilterProvider } from './context/FilterContext';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <FilterProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="students" element={<div className="p-6 bg-white rounded-card">Students Page Placeholder</div>} />
            <Route path="classes" element={<div className="p-6 bg-white rounded-card">Classes Page Placeholder</div>} />
            <Route path="attendance" element={<div className="p-6 bg-white rounded-card">Attendance Page Placeholder</div>} />
            <Route path="subjects" element={<div className="p-6 bg-white rounded-card">Subjects Page Placeholder</div>} />
            <Route path="exams" element={<div className="p-6 bg-white rounded-card">Exams Page Placeholder</div>} />
            <Route path="results" element={<div className="p-6 bg-white rounded-card">Results Page Placeholder</div>} />
            <Route path="teachers" element={<div className="p-6 bg-white rounded-card">Teachers Page Placeholder</div>} />
            <Route path="fees" element={<div className="p-6 bg-white rounded-card">Fees Page Placeholder</div>} />
            <Route path="notices" element={<div className="p-6 bg-white rounded-card">Notices Page Placeholder</div>} />
            <Route path="events" element={<div className="p-6 bg-white rounded-card">Events Page Placeholder</div>} />
            <Route path="messages" element={<div className="p-6 bg-white rounded-card">Messages Page Placeholder</div>} />
            <Route path="reports" element={<div className="p-6 bg-white rounded-card">Reports Page Placeholder</div>} />
            <Route path="settings" element={<div className="p-6 bg-white rounded-card">Settings Page Placeholder</div>} />
            <Route path="help" element={<div className="p-6 bg-white rounded-card">Help Page Placeholder</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FilterProvider>
  );
}