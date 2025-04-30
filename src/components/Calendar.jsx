import React, { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { getCalendarDays, getDayNames, getDateClasses, hasAppointments, formatDate } from '../utils/dateUtils';
import { useAppointments } from '../context/AppointmentContext';
import { Button } from './ui/Button';

export const Calendar = ({ onDateClick, onAddClick }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { appointments } = useAppointments();

  const days = getCalendarDays(currentMonth);
  const dayNames = getDayNames();

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {formatDate(new Date(), 'EEEE, MMMM d, yyyy')}
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={prevMonth}
            className="p-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-600 dark:text-gray-400">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map(day => {
          const dateString = format(day, 'yyyy-MM-dd');
          const hasAppointmentsForDay = hasAppointments(day, appointments);

          return (
            <div
              key={dateString}
              className="min-h-[70px] p-1 border border-gray-100 dark:border-gray-700 relative"
            >
              <div className="flex justify-between items-start">
                <button
                  onClick={() => onDateClick(dateString)}
                  className={getDateClasses(day, currentMonth, hasAppointmentsForDay)}
                >
                  {format(day, 'd')}
                </button>

                <button
                  onClick={() => onAddClick(dateString)}
                  className="text-gray-400 hover:text-blue-500 dark:text-gray-600 dark:hover:text-blue-400 p-1 rounded-full"
                >
                  <Plus size={16} />
                </button>
              </div>

              {hasAppointmentsForDay && (
                <div
                  className="mt-1 cursor-pointer"
                  onClick={() => onDateClick(dateString)}
                >
                  {appointments
                    .filter(appt => appt.date === dateString)
                    .slice(0, 2)
                    .map(appt => (
                      <div
                        key={appt.id}
                        className="text-xs p-1 mb-1 rounded truncate whitespace-nowrap overflow-hidden"
                        style={{
                          backgroundColor:
                            appt.category === 'ROUTINE_CHECKUP' ? '#FEE2E2' :
                            appt.category === 'SICK_VISIT' ? '#DBEAFE' :
                            appt.category === 'CONSULTATION' ? '#FEF3C7' :
                            appt.category === 'EMERGENCY' ? '#FEE2E2' :
                            appt.category === 'EXAMINATION' ? '#F3E8FF' :
                            '#F3F4F6'
                        }}
                      >
                        {appt.startTime} {appt.patientName}
                      </div>
                    ))}

                  {appointments.filter(appt => appt.date === dateString).length > 2 && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 p-1">
                      +{appointments.filter(appt => appt.date === dateString).length - 2} more
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
