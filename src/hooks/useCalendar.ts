import { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import { CalendarDay, CalendarEvent, CalendarWeek } from '../types/Calendar';

export const useCalendar = (events: CalendarEvent[]) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  
  const today = dayjs();
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => 
      direction === 'prev' ? prev.subtract(1, 'month') : prev.add(1, 'month')
    );
  };
  
  const goToToday = () => {
    setCurrentDate(dayjs());
  };
  
  const calendarData = useMemo(() => {
    const startOfMonth = currentDate.startOf('month');
    const endOfMonth = currentDate.endOf('month');
    const startOfCalendar = startOfMonth.startOf('week');
    const endOfCalendar = endOfMonth.endOf('week');
    
    const weeks: CalendarWeek[] = [];
    let currentWeekStart = startOfCalendar;
    
    while (currentWeekStart.isBefore(endOfCalendar) || currentWeekStart.isSame(endOfCalendar)) {
      const days: CalendarDay[] = [];
      
      for (let i = 0; i < 7; i++) {
        const day = currentWeekStart.add(i, 'day');
        const dayEvents = events.filter(event => 
          dayjs(event.date).isSame(day, 'day')
        );
        
        days.push({
          date: day.format('YYYY-MM-DD'),
          day: day.date(),
          isCurrentMonth: day.isSame(currentDate, 'month'),
          isToday: day.isSame(today, 'day'),
          events: dayEvents
        });
      }
      
      weeks.push({ days });
      currentWeekStart = currentWeekStart.add(1, 'week');
    }
    
    return weeks;
  }, [currentDate, events, today]);
  
  const hasEventConflicts = (dayEvents: CalendarEvent[]): boolean => {
    if (dayEvents.length < 2) return false;
    
    for (let i = 0; i < dayEvents.length; i++) {
      for (let j = i + 1; j < dayEvents.length; j++) {
        const event1 = dayEvents[i];
        const event2 = dayEvents[j];
        
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
  
  return {
    currentDate,
    calendarData,
    navigateMonth,
    goToToday,
    hasEventConflicts,
    monthName: currentDate.format('MMMM YYYY')
  };
};