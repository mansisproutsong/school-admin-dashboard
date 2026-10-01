import React from 'react';
import { SearchX } from 'lucide-react';

export default function EmptyState({ message, onClearFilter }) {
  return (
    <div className="bg-white rounded-card border border-line p-8 text-center space-y-3 shadow-soft">
      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto">
        <SearchX className="w-6 h-6 text-muted" />
      </div>
      <p className="font-bold text-ink text-sm">No Results Found</p>
      <p className="text-xs text-muted max-w-xs mx-auto">{message || 'Try changing your search keywords or class filter.'}</p>
      {onClearFilter && (
        <button 
          onClick={onClearFilter}
          className="text-xs font-semibold text-primary hover:underline pt-1"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}
