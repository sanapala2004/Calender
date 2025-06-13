import React, { useState } from 'react';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { AddEventModal } from './AddEventModal';
import { useCalendar } from '../hooks/useCalendar';
import { CalendarEvent } from '../types/Calendar';

interface CalendarProps {
  events: CalendarEvent[];
}

export const Calendar: React.FC<CalendarProps> = ({ events: initialEvents }) => {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>();

  const {
    currentDate,
    calendarData,
    navigateMonth,
    goToToday,
    hasEventConflicts,
    monthName
  } = useCalendar(events);

  const handleAddEvent = (newEvent: Omit<CalendarEvent, 'id'>) => {
    const eventWithId: CalendarEvent = {
      ...newEvent,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    };
    setEvents(prev => [...prev, eventWithId]);
  };

  const handleDayClick = (date: string, hasEvents: boolean) => {
    if (!hasEvents) {
      setSelectedDate(date);
      setShowAddModal(true);
    }
  };

  const handleQuickAdd = () => {
    setSelectedDate(undefined);
    setShowAddModal(true);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <CalendarHeader
          monthName={monthName}
          onPrevMonth={() => navigateMonth('prev')}
          onNextMonth={() => navigateMonth('next')}
          onToday={goToToday}
          onAddEvent={handleQuickAdd}
        />
        
        <CalendarGrid
          weeks={calendarData}
          hasEventConflicts={hasEventConflicts}
          onDayClick={handleDayClick}
        />

        <AddEventModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAddEvent={handleAddEvent}
          selectedDate={selectedDate}
        />
      </div>
    </div>
  );
};