import React from 'react';
import { useAppointments } from '../context/AppointmentContext';
import { formatDate, formatTime } from '../utils/dateUtils';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { X, Edit, Trash2 } from 'lucide-react';

export const DayView = ({ date, onClose, onEditAppointment }) => {
  const { getAppointmentsForDate, deleteAppointment } = useAppointments();
  const appointments = getAppointmentsForDate(date);
  
  const sortedAppointments = [...appointments].sort((a, b) => {
    return a.startTime.localeCompare(b.startTime);
  });

  const handleDelete = (appointment) => {
    if (window.confirm(`Are you sure you want to delete the appointment for ${appointment.patientName}?`)) {
      deleteAppointment(appointment.id);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-auto relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">
          Appointments
        </h2>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {formatDate(date, 'EEEE, MMMM d, yyyy')}
        </p>
        
        {appointments.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No Appointments
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              There are no appointments scheduled for this day.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedAppointments.map(appointment => (
              <div
                key={appointment.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition hover:shadow-md dark:hover:shadow-gray-900"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {appointment.patientName}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}
                    </p>
                  </div>
                  <Badge category={appointment.category} />
                </div>
                
                <div className="mt-3 flex items-center">
                  <div className="flex-shrink-0 mr-3">
                    {appointment.doctor.avatar ? (
                      <img
                        src={appointment.doctor.avatar}
                        alt={appointment.doctor.name}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 dark:bg-blue-900 dark:text-blue-200">
                        {appointment.doctor.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {appointment.doctor.name}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {appointment.doctor.specialty}
                    </p>
                  </div>
                </div>
                
                {appointment.notes && (
                  <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Notes:</span> {appointment.notes}
                    </p>
                  </div>
                )}
                
                <div className="mt-4 flex justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(appointment)}
                    icon={<Trash2 size={16} />}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onEditAppointment(appointment.id)}
                    icon={<Edit size={16} />}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
