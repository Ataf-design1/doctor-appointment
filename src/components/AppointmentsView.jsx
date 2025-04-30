import React, { useState } from 'react';
import { Calendar } from './Calendar';
import { DayView } from './DayView';
import { AppointmentForm } from './AppointmentForm';
import { useAppointments } from '../context/AppointmentContext';

export const AppointmentsView = ({ viewMode = 'month' }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDayView, setShowDayView] = useState(false);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [editingAppointmentId, setEditingAppointmentId] = useState(null);

  const { getAppointment } = useAppointments();

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowDayView(true);
  };

  const handleAddClick = (date) => {
    setSelectedDate(date);
    setEditingAppointmentId(null);
    setShowAppointmentForm(true);
  };

  const handleEditAppointment = (appointmentId) => {
    setEditingAppointmentId(appointmentId);
    setShowDayView(false);
    setShowAppointmentForm(true);
  };

  const handleAppointmentSuccess = () => {
    setEditingAppointmentId(null);
    if (selectedDate) {
      setShowDayView(true);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Appointments</h1>

        <div className="flex">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1 flex space-x-1">
            <button
              className={`px-4 py-1 rounded-md text-sm font-medium ${
                viewMode === 'day'
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100'
              }`}
            >
              Day
            </button>
            <button
              className={`px-4 py-1 rounded-md text-sm font-medium ${
                viewMode === 'week'
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100'
              }`}
            >
              Week
            </button>
            <button
              className={`px-4 py-1 rounded-md text-sm font-medium ${
                viewMode === 'month'
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100'
              }`}
            >
              Month
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <Calendar onDateClick={handleDateClick} onAddClick={handleAddClick} />
      </div>

      {showDayView && selectedDate && (
        <DayView
          date={selectedDate}
          onClose={() => setShowDayView(false)}
          onEditAppointment={handleEditAppointment}
        />
      )}

      {showAppointmentForm && selectedDate && (
        <AppointmentForm
          date={selectedDate}
          onClose={() => setShowAppointmentForm(false)}
          existingAppointment={
            editingAppointmentId ? getAppointment(editingAppointmentId) : undefined
          }
          onSuccess={handleAppointmentSuccess}
        />
      )}
    </div>
  );
};
