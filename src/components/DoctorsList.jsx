import React from 'react';
import { doctors } from '../data/doctors';

export const DoctorsList = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Our Medical Team
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          >
            <img
              src={doctor.avatar}
              alt={doctor.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {doctor.name}
              </h2>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                {doctor.specialty}
              </p>
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-400">
                  {doctor.bio}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Education:</span> {doctor.education}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Experience:</span> {doctor.experience}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
