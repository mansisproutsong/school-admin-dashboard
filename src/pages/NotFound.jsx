import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
        <AlertCircle className="w-8 h-8 text-danger" />
      </div>
      <h1 className="text-3xl font-bold text-ink">Page Not Found</h1>
      <p className="text-muted max-w-md">The page you are looking for does not exist or has been moved.</p>
      <Link 
        to="/"
        className="px-5 py-2.5 bg-primary text-white font-bold rounded-btn hover:bg-blue-700 shadow-sm transition-colors"
      >
        Return to Dashboard
      </Link>
    </div>
  );
}
