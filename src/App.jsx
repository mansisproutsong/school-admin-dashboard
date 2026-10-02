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
import Teachers from './pages/Teachers';
import Fees from './pages/Fees';
import Notices from './pages/Notices';
import Events from './pages/Events';
import Messages from './pages/Messages';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Help from './pages/Help';

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
            <Route path="teachers" element={<Teachers />} />
            <Route path="fees" element={<Fees />} />
            <Route path="notices" element={<Notices />} />
            <Route path="events" element={<Events />} />
            <Route path="messages" element={<Messages />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="help" element={<Help />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FilterProvider>
  );
}