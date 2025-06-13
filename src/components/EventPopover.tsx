import React, { useEffect, useRef } from 'react';
import { CalendarEvent } from '../types/Calendar';
import { X, Clock, AlertTriangle } from 'lucide-react';
import dayjs from 'dayjs';

interface EventPopoverProps {
  events: CalendarEvent[];
  date: string;
  onClose: () => void;
}

export const EventPopover: React.FC<EventPopoverProps> = ({ 
  events, 
  date, 
  onClose 
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);
  
  const formattedDate = dayjs(date).format('MMMM D, YYYY');
  
  const hasConflicts = (): boolean => {
    if (events.length < 2) return false;
    
    for (let i = 0; i < events.length; i++) {
      for (let j = i + 1; j < events.length; j++) {
        const event1 = events[i];
        const event2 = events[j];
        
        const start1 = dayjs(`2000-01-01 ${event1.startTime}`);
        const end1 = dayjs(`2000-01-01 ${event1.endTime}`);
        const start2 = dayjs(`2000-01-01 ${event2.startTime}`);
        const end2 = dayjs(`2000-01-01 ${event2.endTime}`);
        
        if (start1.isBefore(end2) && start2.isBefore(end1)) {
          return true;
        }
      }
    }
    
    return false;
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
      <div
        ref={popoverRef}
        className="bg-white rounded-xl shadow-2xl border border-gray-200 max-w-md w-full mx-4 max-h-[80vh] overflow-hidden"
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{formattedDate}</h3>
            <p className="text-sm text-gray-500">{events.length} event{events.length !== 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        {hasConflicts() && (
          <div className="p-3 bg-amber-50 border-b border-amber-200 flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span className="text-sm text-amber-800 font-medium">
              Schedule conflicts detected
            </span>
          </div>
        )}
        
        <div className="max-h-96 overflow-y-auto">
          {events
            .sort((a, b) => a.startTime.localeCompare(b.startTime))
            .map((event) => (
              <div key={event.id} className="p-4 border-b border-gray-100 last:border-b-0">
                <div className="flex items-start space-x-3">
                  <div
                    className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                    style={{ backgroundColor: event.color }}
                  />
                  <div className="flex-grow min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">{event.title}</h4>
                    <div className="flex items-center space-x-1 mt-1 text-sm text-gray-600">
                      <Clock className="w-3 h-3" />
                      <span>{event.startTime} - {event.endTime}</span>
                      <span className="text-gray-400">({event.duration}min)</span>
                    </div>
                    {event.description && (
                      <p className="text-sm text-gray-600 mt-2">{event.description}</p>
                    )}
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                        {event.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};