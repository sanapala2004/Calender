import React from 'react';
import { ChevronLeft, ChevronRight, Calendar, Plus } from 'lucide-react';

interface CalendarHeaderProps {
  monthName: string;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  onAddEvent: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  monthName,
  onPrevMonth,
  onNextMonth,
  onToday,
  onAddEvent
}) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onToday}
            className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
          >
            Today
          </button>
          <button
            onClick={onAddEvent}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-1"
          >
            <Plus className="w-4 h-4" />
            <span>Add Event</span>
          </button>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <h2 className="text-2xl font-semibold text-gray-800 min-w-[200px] text-center">
          {monthName}
        </h2>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={onPrevMonth}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
          </button>
          <button
            onClick={onNextMonth}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
          </button>
        </div>
      </div>
    </div>
  );
};