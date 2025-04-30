import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    getDay,
    startOfWeek,
    endOfWeek,
    addDays,
    isToday,
    isSameMonth,
    parseISO,
    isSameDay
  } from 'date-fns';
  
  // Format a date to display in the UI
  export const formatDate = (date, formatString = 'MMMM d, yyyy') => {
    const dateObject = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObject, formatString);
  };
  
  // Generates a calendar month grid including padding days
  export const getCalendarDays = (date) => {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
  
    return eachDayOfInterval({ start: startDate, end: endDate });
  };
  
  // Formats a time string (HH:MM) to AM/PM format
  export const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hoursNum = parseInt(hours, 10);
    const period = hoursNum >= 12 ? 'PM' : 'AM';
    const formattedHours = hoursNum % 12 || 12;
    return `${formattedHours}:${minutes} ${period}`;
  };
  
  // Checks if a date has any appointments
  export const hasAppointments = (date, appointments) => {
    const dateString = format(date, 'yyyy-MM-dd');
    return appointments.some(appointment => appointment.date === dateString);
  };
  
  // Get a list of times at 30-minute intervals
  export const getTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour < 18; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    return slots;
  };
  
  // Check if a time slot is available
  export const isTimeSlotAvailable = (
    date,
    startTime,
    endTime,
    appointments,
    excludeAppointmentId
  ) => {
    const relevantAppointments = appointments.filter(
      appt => appt.date === date && appt.id !== excludeAppointmentId
    );
  
    const newStart = timeStringToMinutes(startTime);
    const newEnd = timeStringToMinutes(endTime);
  
    return !relevantAppointments.some(appt => {
      const existingStart = timeStringToMinutes(appt.startTime);
      const existingEnd = timeStringToMinutes(appt.endTime);
  
      // Check if there's an overlap
      return (
        (newStart >= existingStart && newStart < existingEnd) ||
        (newEnd > existingStart && newEnd <= existingEnd) ||
        (newStart <= existingStart && newEnd >= existingEnd)
      );
    });
  };
  
  // Helper to convert time string to minutes since midnight
  const timeStringToMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
  };
  
  // Generate short day names
  export const getDayNames = () => {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  };
  
  // Get date classes based on current month, today, etc.
  export const getDateClasses = (day, currentMonth, hasAppointment) => {
    let classes = "h-10 w-10 rounded-full flex items-center justify-center ";
  
    if (!isSameMonth(day, currentMonth)) {
      classes += "text-gray-400 dark:text-gray-600 ";
    } else if (isToday(day)) {
      classes += "bg-blue-500 text-white font-bold ";
    } else {
      classes += "text-gray-900 dark:text-gray-100 ";
    }
  
    if (hasAppointment && isSameMonth(day, currentMonth)) {
      classes += "font-semibold relative after:absolute after:bottom-0 after:left-1/2 " +
                 "after:-translate-x-1/2 after:w-1 after:h-1 after:bg-blue-500 after:rounded-full ";
    }
  
    return classes;
  };
  