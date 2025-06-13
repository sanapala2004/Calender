import React from 'react';
import { CalendarWeek } from '../types/Calendar';
import { CalendarDay } from './CalendarDay';

interface CalendarGridProps {
  weeks: CalendarWeek[];
  hasEventConflicts: (events: any[]) => boolean;
  onDayClick: (date: string, hasEvents: boolean) => void;
}

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const CalendarGrid: React.FC<CalendarGridProps> = ({ 
  weeks, 
  hasEventConflicts,
  onDayClick
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header with day names */}
      <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
        {weekDays.map((day) => (
          <div
            key={day}
            className="p-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider"
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {weeks.map((week, weekIndex) =>
          week.days.map((day, dayIndex) => (
            <CalendarDay
              key={`${weekIndex}-${dayIndex}`}
              day={day}
              hasConflicts={hasEventConflicts(day.events)}
              onDayClick={onDayClick}
            />
          ))
        )}
      </div>
    </div>
  );
};