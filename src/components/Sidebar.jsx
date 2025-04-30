import React from 'react';
import { 
  Calendar, 
  Users, 
  FileText, 
  MessageCircle, 
  Settings, 
  LogOut, 
  Moon,
  Sun
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Sidebar = ({ activeTab, onTabChange }) => {
  const { theme, toggleTheme } = useTheme();
  
  const navigation = [
    { id: 'overview', name: 'Overview', icon: <FileText size={20} /> },
    { id: 'appointments', name: 'Appointments', icon: <Calendar size={20} /> },
    { id: 'doctors', name: 'Doctors', icon: <Users size={20} /> },
    { id: 'results', name: 'Pathology Results', icon: <FileText size={20} /> },
    { id: 'chats', name: 'Chats', icon: <MessageCircle size={20} /> },
  ];

  const account = [
    { id: 'settings', name: 'Settings', icon: <Settings size={20} /> },
    { id: 'logout', name: 'Logout', icon: <LogOut size={20} /> },
  ];

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-md mr-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 4H8C5.79086 4 4 5.79086 4 8V16C4 18.2091 5.79086 20 8 20H16C18.2091 20 20 18.2091 20 16V8C20 5.79086 18.2091 4 16 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 9V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">MediBook</h1>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {navigation.map(item => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
            >
              <span className={`mr-3 ${
                activeTab === item.id
                  ? 'text-blue-500 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {item.icon}
              </span>
              {item.name}
              
              {item.id === 'chats' && (
                <span className="ml-auto bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  2
                </span>
              )}
            </button>
          ))}
        </nav>
        
        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
            Account
          </h3>
          <nav className="mt-2 space-y-1 px-2">
            {account.map(item => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
              >
                <span className={`mr-3 ${
                  activeTab === item.id
                    ? 'text-blue-500 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {item.icon}
                </span>
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button 
          onClick={toggleTheme}
          className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          {theme === 'dark' ? (
            <>
              <Sun size={16} className="mr-2" />
              Light Mode
            </>
          ) : (
            <>
              <Moon size={16} className="mr-2" />
              Dark Mode
            </>
          )}
        </button>
      </div>
    </div>
  );
};
