import React, { useState } from 'react';
import { AppointmentProvider } from './context/AppointmentContext';
import { ThemeProvider } from './context/ThemeContext';
import { Sidebar } from './components/Sidebar';
// import { Header } from './components/Header';
import { AppointmentsView } from './components/AppointmentsView';
import { Header } from './components/Header.jsx';

function App() {
  const [activeTab, setActiveTab] = useState('appointments');

  return (
    <ThemeProvider>
      <AppointmentProvider>
        <div className="flex h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
          <div className="w-64 hidden md:block">
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />

            <main className="flex-1 overflow-y-auto p-4">
              {activeTab === 'appointments' && <AppointmentsView viewMode="month" />}

              {activeTab !== 'appointments' && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">
                      {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} View
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                      This section is under development.
                    </p>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </AppointmentProvider>
    </ThemeProvider>
  );
}

export default App;
