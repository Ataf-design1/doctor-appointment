import { addDays, format } from 'date-fns';

// Current date for reference
const today = new Date();
const tomorrow = addDays(today, 1);
const dayAfterTomorrow = addDays(today, 2);

// Create ISO date strings
const todayISO = format(today, 'yyyy-MM-dd');
const tomorrowISO = format(tomorrow, 'yyyy-MM-dd');
const dayAfterTomorrowISO = format(dayAfterTomorrow, 'yyyy-MM-dd');

export const mockAppointments = [
  {
    id: '1',
    patientName: 'John Smith',
    doctorId: '1',
    date: todayISO,
    startTime: '09:00',
    endTime: '09:30',
    category: 'ROUTINE_CHECKUP',
    notes: 'Annual physical examination'
  },
  {
    id: '2',
    patientName: 'Emma Johnson',
    doctorId: '2',
    date: todayISO,
    startTime: '10:30',
    endTime: '11:00',
    category: 'SICK_VISIT',
    notes: 'Fever and cough'
  },
  {
    id: '3',
    patientName: 'Michael Brown',
    doctorId: '3',
    date: tomorrowISO,
    startTime: '14:00',
    endTime: '14:45',
    category: 'CONSULTATION',
    notes: 'Follow-up on previous treatment'
  },
  {
    id: '4',
    patientName: 'Sophia Garcia',
    doctorId: '4',
    date: tomorrowISO,
    startTime: '11:15',
    endTime: '11:45',
    category: 'EXAMINATION',
    notes: 'X-ray results discussion'
  },
  {
    id: '5',
    patientName: 'Robert Wilson',
    doctorId: '5',
    date: dayAfterTomorrowISO,
    startTime: '16:00',
    endTime: '16:30',
    category: 'EMERGENCY',
    notes: 'Severe allergic reaction'
  }
];
