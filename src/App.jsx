import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FilterProvider } from './context/FilterContext';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Classes from './pages/Classes';
import Attendance from './pages/Attendance';
import Subjects from './pages/Subjects';
import Exams from './pages/Exams';
import Results from './pages/Results';

export default function App() {
  return (
    <FilterProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="classes" element={<Classes />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="subjects" element={<Subjects />} />
            <Route path="exams" element={<Exams />} />
            <Route path="results" element={<Results />} />
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