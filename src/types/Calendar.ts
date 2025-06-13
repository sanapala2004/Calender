export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD format
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  duration: number; // in minutes
  color: string;
  type: 'meeting' | 'task' | 'personal' | 'work' | 'reminder';
  description?: string;
}

export interface CalendarDay {
  date: string;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}

export interface CalendarWeek {
  days: CalendarDay[];
}