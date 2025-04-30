import React, { useState, useEffect } from 'react';
import { useAppointments } from '../context/AppointmentContext';
import { Button } from './ui/Button';
import { X } from 'lucide-react';
import { formatDate, getTimeSlots, isTimeSlotAvailable } from '../utils/dateUtils';

export const AppointmentForm = ({
  date,
  onClose,
  existingAppointment,
  onSuccess,
}) => {
  const { addAppointment, updateAppointment, getAllDoctors, appointments } = useAppointments();
  const doctors = getAllDoctors();
  const timeSlots = getTimeSlots();

  const [formData, setFormData] = useState({
    patientName: '',
    doctorId: doctors[0]?.id || '',
    startTime: '09:00',
    endTime: '09:30',
    category: 'ROUTINE_CHECKUP',
    notes: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSuccessful, setIsSuccessful] = useState(false);

  useEffect(() => {
    if (existingAppointment) {
      setFormData({
        patientName: existingAppointment.patientName,
        doctorId: existingAppointment.doctorId,
        startTime: existingAppointment.startTime,
        endTime: existingAppointment.endTime,
        category: existingAppointment.category,
        notes: existingAppointment.notes || '',
      });
    }
  }, [existingAppointment]);

  const validateForm = () => {
    const errors = {};

    if (!formData.patientName.trim()) {
      errors.patientName = 'Patient name is required';
    }

    if (!formData.doctorId) {
      errors.doctorId = 'Please select a doctor';
    }

    const isAvailable = isTimeSlotAvailable(
      date,
      formData.startTime,
      formData.endTime,
      appointments,
      existingAppointment?.id
    );

    if (!isAvailable) {
      errors.timeSlot = 'This time slot is already booked';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const appointmentData = {
      patientName: formData.patientName,
      doctorId: formData.doctorId,
      date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      category: formData.category,
      notes: formData.notes,
    };

    if (existingAppointment) {
      updateAppointment({
        ...appointmentData,
        id: existingAppointment.id,
      });
    } else {
      addAppointment(appointmentData);
    }

    setIsSuccessful(true);
    setTimeout(() => {
      onSuccess();
      onClose();
    }, 1500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => {
      if (name === 'startTime') {
        const timeIndex = timeSlots.findIndex(time => time === value);
        const nextTimeIndex = Math.min(timeIndex + 1, timeSlots.length - 1);
        return {
          ...prev,
          startTime: value,
          endTime: timeSlots[nextTimeIndex],
        };
      }

      return { ...prev, [name]: value };
    });

    if (formErrors.timeSlot) {
      setFormErrors(prev => ({ ...prev, timeSlot: undefined }));
    }
  };

  if (isSuccessful) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4 relative animate-fade-in">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {existingAppointment ? 'Appointment Updated!' : 'Appointment Booked!'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Your appointment has been {existingAppointment ? 'updated' : 'scheduled'} successfully.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {existingAppointment ? 'Edit Appointment' : 'New Appointment'}
        </h2>

        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {formatDate(date, 'EEEE, MMMM d, yyyy')}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Patient Name
            </label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                formErrors.patientName ? 'border-red-500 dark:border-red-400' : 'border-gray-300'
              }`}
              placeholder="Enter patient name"
            />
            {formErrors.patientName && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.patientName}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Doctor
            </label>
            <select
              name="doctorId"
              value={formData.doctorId}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                formErrors.doctorId ? 'border-red-500 dark:border-red-400' : 'border-gray-300'
              }`}
            >
              {doctors.map(doctor => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} ({doctor.specialty})
                </option>
              ))}
            </select>
            {formErrors.doctorId && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.doctorId}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Time Slot
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <select
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleTimeChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  {timeSlots.slice(0, -1).map(time => (
                    <option key={`start-${time}`} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <span className="text-xs text-gray-500 dark:text-gray-400">Start</span>
              </div>
              <div>
                <select
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleTimeChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  {timeSlots.slice(1).map(time => (
                    <option key={`end-${time}`} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <span className="text-xs text-gray-500 dark:text-gray-400">End</span>
              </div>
            </div>
            {formErrors.timeSlot && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.timeSlot}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="ROUTINE_CHECKUP">Routine Checkup</option>
              <option value="SICK_VISIT">Sick Visit</option>
              <option value="CONSULTATION">Consultation</option>
              <option value="EMERGENCY">Emergency</option>
              <option value="EXAMINATION">Examination</option>
            </select>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Notes (Optional)
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              rows={3}
              placeholder="Add any notes about the appointment"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              variant="ghost"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
            >
              {existingAppointment ? 'Update Appointment' : 'Book Appointment'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
