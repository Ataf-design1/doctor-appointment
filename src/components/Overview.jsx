import React from 'react';
import { doctors } from '../data/doctors';
import { locations } from '../data/locations';
import { achievements } from '../data/achievements';
import { Award, Users, Building2, Stethoscope } from 'lucide-react';

const getIcon = (iconName) => {
  switch (iconName) {
    case 'Award':
      return <Award className="w-8 h-8" />;
    case 'Users':
      return <Users className="w-8 h-8" />;
    case 'Building2':
      return <Building2 className="w-8 h-8" />;
    case 'Stethoscope':
      return <Stethoscope className="w-8 h-8" />;
    default:
      return null;
  }
};

export const Overview = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Hero Section */}
      <section className="relative h-[400px] rounded-2xl overflow-hidden mb-12">
        <img
          src="https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=1260"
          alt="Hospital"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-900/50 flex items-center">
          <div className="max-w-3xl mx-auto text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Welcome to MediBook
            </h1>
            <p className="text-xl text-white/90">
              Your trusted partner in healthcare, providing exceptional medical services
              with state-of-the-art facilities and expert professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Our Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-center mb-4 text-blue-600 dark:text-blue-400">
                {getIcon(achievement.icon)}
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {achievement.value}
              </h3>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {achievement.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Doctors Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Featured Doctors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.slice(0, 6).map((doctor) => (
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
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {doctor.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                  {doctor.specialty}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {doctor.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Our Locations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location) => (
            <div
              key={location.id}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src={location.image}
                alt={location.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {location.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {location.address}
                </p>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-600 dark:text-gray-400">
                    Phone: {location.phone}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Email: {location.email}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
