import { CalendarEvent } from '../types/Calendar';

export const staticEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Standup',
    date: '2025-01-15',
    startTime: '09:00',
    endTime: '09:30',
    duration: 30,
    color: '#3B82F6',
    type: 'meeting',
    description: 'Daily team synchronization meeting'
  },
  {
    id: '2',
    title: 'Project Review',
    date: '2025-01-15',
    startTime: '14:00',
    endTime: '15:30',
    duration: 90,
    color: '#10B981',
    type: 'work',
    description: 'Quarterly project review with stakeholders'
  },
  {
    id: '3',
    title: 'Client Presentation',
    date: '2025-01-16',
    startTime: '10:00',
    endTime: '11:00',
    duration: 60,
    color: '#F59E0B',
    type: 'meeting',
    description: 'Presenting Q4 results to client'
  },
  {
    id: '4',
    title: 'Lunch Break',
    date: '2025-01-16',
    startTime: '12:00',
    endTime: '13:00',
    duration: 60,
    color: '#8B5CF6',
    type: 'personal',
    description: 'Lunch with the marketing team'
  },
  {
    id: '5',
    title: 'Code Review',
    date: '2025-01-17',
    startTime: '15:00',
    endTime: '16:00',
    duration: 60,
    color: '#EF4444',
    type: 'work',
    description: 'Review pull requests from the development team'
  },
  {
    id: '6',
    title: 'Sprint Planning',
    date: '2025-01-20',
    startTime: '09:00',
    endTime: '11:00',
    duration: 120,
    color: '#3B82F6',
    type: 'meeting',
    description: 'Planning for the upcoming sprint'
  },
  {
    id: '7',
    title: 'Design Workshop',
    date: '2025-01-20',
    startTime: '14:00',
    endTime: '17:00',
    duration: 180,
    color: '#10B981',
    type: 'work',
    description: 'UX/UI design workshop for new features'
  },
  {
    id: '8',
    title: 'Doctor Appointment',
    date: '2025-01-21',
    startTime: '11:00',
    endTime: '12:00',
    duration: 60,
    color: '#F59E0B',
    type: 'personal',
    description: 'Regular checkup appointment'
  },
  {
    id: '9',
    title: 'Team Building',
    date: '2025-01-22',
    startTime: '16:00',
    endTime: '18:00',
    duration: 120,
    color: '#8B5CF6',
    type: 'personal',
    description: 'Monthly team building activity'
  },
  {
    id: '10',
    title: 'Budget Review',
    date: '2025-01-23',
    startTime: '10:00',
    endTime: '11:30',
    duration: 90,
    color: '#EF4444',
    type: 'meeting',
    description: 'Monthly budget review meeting'
  },
  // Conflicting events for demonstration
  {
    id: '11',
    title: 'Sales Call',
    date: '2025-01-15',
    startTime: '09:15',
    endTime: '09:45',
    duration: 30,
    color: '#EC4899',
    type: 'meeting',
    description: 'Important client sales call - CONFLICT with Team Standup'
  },
  {
    id: '12',
    title: 'Marketing Meeting',
    date: '2025-01-20',
    startTime: '15:00',
    endTime: '16:30',
    duration: 90,
    color: '#06B6D4',
    type: 'meeting',
    description: 'Marketing strategy discussion - OVERLAP with Design Workshop'
  }
];