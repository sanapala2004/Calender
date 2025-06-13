import React, { useState } from 'react';
import { X, Calendar, Clock, Type, Palette, FileText } from 'lucide-react';
import dayjs from 'dayjs';
import { CalendarEvent } from '../types/Calendar';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  selectedDate?: string;
}

const eventColors = [
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Green', value: '#10B981' },
  { name: 'Yellow', value: '#F59E0B' },
  { name: 'Purple', value: '#8B5CF6' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Cyan', value: '#06B6D4' },
  { name: 'Orange', value: '#F97316' },
];

const eventTypes: Array<CalendarEvent['type']> = ['meeting', 'task', 'personal', 'work', 'reminder'];

export const AddEventModal: React.FC<AddEventModalProps> = ({
  isOpen,
  onClose,
  onAddEvent,
  selectedDate
}) => {
  const [formData, setFormData] = useState({
    title: '',
    date: selectedDate || dayjs().format('YYYY-MM-DD'),
    startTime: '09:00',
    endTime: '10:00',
    color: '#3B82F6',
    type: 'meeting' as CalendarEvent['type'],
    description: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    const startTime = dayjs(`2000-01-01 ${formData.startTime}`);
    const endTime = dayjs(`2000-01-01 ${formData.endTime}`);

    if (!startTime.isValid()) {
      newErrors.startTime = 'Invalid start time';
    }

    if (!endTime.isValid()) {
      newErrors.endTime = 'Invalid end time';
    }

    if (startTime.isValid() && endTime.isValid() && !startTime.isBefore(endTime)) {
      newErrors.endTime = 'End time must be after start time';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateDuration = () => {
    const startTime = dayjs(`2000-01-01 ${formData.startTime}`);
    const endTime = dayjs(`2000-01-01 ${formData.endTime}`);
    return endTime.diff(startTime, 'minute');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const newEvent: Omit<CalendarEvent, 'id'> = {
      title: formData.title.trim(),
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      duration: calculateDuration(),
      color: formData.color,
      type: formData.type,
      description: formData.description.trim() || undefined
    };

    onAddEvent(newEvent);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      title: '',
      date: selectedDate || dayjs().format('YYYY-MM-DD'),
      startTime: '09:00',
      endTime: '10:00',
      color: '#3B82F6',
      type: 'meeting',
      description: ''
    });
    setErrors({});
    onClose();
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 max-w-md w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span>Add New Event</span>
          </h2>
          <button
            onClick={handleClose}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[calc(90vh-120px)] overflow-y-auto">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center space-x-1">
              <Type className="w-4 h-4" />
              <span>Event Title</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => updateFormData('title', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.title ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter event title"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>Date</span>
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => updateFormData('date', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.date ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
          </div>

          {/* Time Range */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>Start Time</span>
              </label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => updateFormData('startTime', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.startTime ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.startTime && <p className="text-red-500 text-xs mt-1">{errors.startTime}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <span>End Time</span>
              </label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => updateFormData('endTime', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.endTime ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.endTime && <p className="text-red-500 text-xs mt-1">{errors.endTime}</p>}
            </div>
          </div>

          {/* Duration Display */}
          {formData.startTime && formData.endTime && calculateDuration() > 0 && (
            <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
              Duration: {calculateDuration()} minutes
            </div>
          )}

          {/* Event Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => updateFormData('type', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              {eventTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-1">
              <Palette className="w-4 h-4" />
              <span>Color</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {eventColors.map(color => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => updateFormData('color', color.value)}
                  className={`w-full h-10 rounded-lg border-2 transition-all duration-200 ${
                    formData.color === color.value 
                      ? 'border-gray-400 scale-105 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center space-x-1">
              <FileText className="w-4 h-4" />
              <span>Description (Optional)</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => updateFormData('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
              placeholder="Add event description..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};