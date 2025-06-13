import React, { useState } from 'react';
import { CalendarDay as CalendarDayType } from '../types/Calendar';
import { EventPopover } from './EventPopover';
import { AlertTriangle, Plus } from 'lucide-react';

interface CalendarDayProps {
  day: CalendarDayType;
  hasConflicts: boolean;
  onDayClick: (date: string, hasEvents: boolean) => void;
}

export const CalendarDay: React.FC<CalendarDayProps> = ({ 
  day, 
  hasConflicts, 
  onDayClick 
}) => {
  const [showEvents, setShowEvents] = useState(false);
  
  const dayClasses = [
    'min-h-[120px] p-2 border-r border-b border-gray-200 relative cursor-pointer transition-all duration-200 group',
    day.isCurrentMonth ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 text-gray-400',
    day.isToday ? 'bg-blue-50 border-blue-200' : '',
  ].join(' ');
  
  const dayNumberClasses = [
    'text-sm font-medium mb-1 flex items-center justify-between',
    day.isToday ? 'text-blue-600 font-bold' : day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400',
  ].join(' ');

  const handleDayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (day.events.length > 0) {
      setShowEvents(true);
    } else {
      onDayClick(day.date, day.events.length > 0);
    }
  };
  
  return (
    <div className={dayClasses} onClick={handleDayClick}>
      <div className={dayNumberClasses}>
        <span className={day.isToday ? 'bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs' : ''}>
          {day.day}
        </span>
        <div className="flex items-center space-x-1">
          {hasConflicts && (
            <AlertTriangle className="w-4 h-4 text-amber-500" title="Schedule conflicts detected" />
          )}
          {day.events.length === 0 && day.isCurrentMonth && (
            <Plus className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          )}
        </div>
      </div>
      
      <div className="space-y-1">
        {day.events.slice(0, 3).map((event) => (
          <div
            key={event.id}
            className="text-xs p-1 rounded truncate font-medium text-white shadow-sm"
            style={{ backgroundColor: event.color }}
            title={`${event.title} (${event.startTime} - ${event.endTime})`}
          >
            {event.title}
          </div>
        ))}
        
        {day.events.length > 3 && (
          <div className="text-xs text-gray-500 font-medium">
            +{day.events.length - 3} more
          </div>
        )}
      </div>
      
      {showEvents && day.events.length > 0 && (
        <EventPopover
          events={day.events}
          date={day.date}
          onClose={() => setShowEvents(false)}
        />
      )}
    </div>
  );
};