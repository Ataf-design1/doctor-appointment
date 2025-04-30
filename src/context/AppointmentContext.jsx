import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockAppointments } from '../data/mockAppointments';
import { doctors } from '../data/doctors';

const AppointmentContext = createContext(undefined);

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Load from localStorage or use mock data
    const savedAppointments = localStorage.getItem('appointments');
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    } else {
      setAppointments(mockAppointments);
    }
  }, []);

  useEffect(() => {
    // Save to localStorage whenever appointments change
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  const getAppointmentsForDate = (date) => {
    return appointments
      .filter(appointment => appointment.date === date)
      .map(appointment => {
        const doctor = doctors.find(doc => doc.id === appointment.doctorId);
        return {
          ...appointment,
          doctor: doctor || {
            id: 'unknown',
            name: 'Unknown Doctor',
            specialty: 'Unknown',
          },
        };
      });
  };

  const addAppointment = (appointmentData) => {
    const newAppointment = {
      ...appointmentData,
      id: Date.now().toString(), // Simple ID generation
    };
    setAppointments([...appointments, newAppointment]);
  };

  const updateAppointment = (updatedAppointment) => {
    setAppointments(appointments.map(appointment => 
      appointment.id === updatedAppointment.id ? updatedAppointment : appointment
    ));
  };

  const deleteAppointment = (id) => {
    setAppointments(appointments.filter(appointment => appointment.id !== id));
  };

  const getAppointment = (id) => {
    return appointments.find(appointment => appointment.id === id);
  };

  const getDoctorById = (id) => {
    return doctors.find(doctor => doctor.id === id);
  };

  const getAllDoctors = () => {
    return doctors;
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        getAppointmentsForDate,
        addAppointment,
        updateAppointment,
        deleteAppointment,
        getAppointment,
        getDoctorById,
        getAllDoctors,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointments must be used within an AppointmentProvider');
  }
  return context;
};
