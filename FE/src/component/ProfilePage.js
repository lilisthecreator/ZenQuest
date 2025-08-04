import React, { useState } from 'react';
import { User, Settings, Bell, Moon, Globe, Shield, HelpCircle, LogOut, Edit3, Camera, Star, Award, Calendar, BookOpen } from 'lucide-react';

const ProfilePage = ({ onNavigate }) => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');

  // User data
  const userData = {
    name: "Fellycia Alvira",
    email: "fellycia.alvira@gmail.com",
    joinDate: "January 2024",
    level: 9,
    xp: 2847,
    streak: 7,
    completedCourses: 12,
    achievements: 4
  };

  const handleLogout = () => {
    if (onNavigate) {
      onNavigate('login');
    }
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Beautiful Header with Gradient */}
      <div className="relative py-2" style={{background: '#372974'}}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 px-6">
            <div className="flex items-center">
              <img 
                src="/images/zenquest 2.png" 
                alt="ZenQuest Logo" 
                className="w-auto object-contain"
                style={{height: '88px'}}
              />
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-4 right-20 w-32 h-32 bg-orange-400 bg-opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute top-8 right-40 w-20 h-20 bg-purple-400 bg-opacity-10 rounded-full blur-2xl"></div>
      </div>

      {/* Paper-like Content Area */}
      <div className="bg-white mx-4 -mt-4 rounded-3xl shadow-lg relative z-10 min-h-screen">
        <div className="p-6 pb-32">
          <div className="max-w-sm mx-auto">
            
            {/* Profile Header */}
            <div className="text-center mb-8">
              <div className="relative inline-block mb-4">
                <div className="w-20 h-20 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-gray-600" />
                </div>
                <button className="absolute bottom-0 right-0 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{background: 'linear-gradient(135deg, #ee7e5c 0%, #372974 100%)'}}>
                  <Camera className="w-3 h-3 text-white" />
                </button>
              </div>
              <div className="flex items-center justify-center space-x-2 mb-1">
                <h1 className="text-xl font-bold text-gray-900">{userData.name}</h1>
                <span className="bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs font-medium px-2 py-0.5 rounded-md">
                  PRO
                </span>
              </div>
              <p className="text-gray-600 text-sm">{userData.email}</p>
              <p className="text-gray-500 text-xs mt-1">Member since {userData.joinDate}</p>
            </div>

            {/* Profile Actions */}
            <div className="mb-6">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <button className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center space-x-3">
                    <Edit3 className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Edit Profile</span>
                  </div>
                  <div className="text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>

            {/* Settings Section */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Settings</h2>
              
              <div className="space-y-3">
                {/* Notifications */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-4">
                    <div className="flex items-center space-x-3">
                      <Bell className="w-5 h-5 text-gray-600" />
                      <div>
                        <div className="font-medium text-gray-900">Notifications</div>
                        <div className="text-sm text-gray-600">Push notifications and emails</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setNotifications(!notifications)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                        notifications ? 'bg-orange-500' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                          notifications ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Dark Mode */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-4">
                    <div className="flex items-center space-x-3">
                      <Moon className="w-5 h-5 text-gray-600" />
                      <div>
                        <div className="font-medium text-gray-900">Dark Mode</div>
                        <div className="text-sm text-gray-600">Switch to dark theme</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                        darkMode ? 'bg-orange-500' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                          darkMode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Language */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <button className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-gray-600" />
                      <div className="text-left">
                        <div className="font-medium text-gray-900">Language</div>
                        <div className="text-sm text-gray-600">{language}</div>
                      </div>
                    </div>
                    <div className="text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                </div>

                {/* Privacy */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <button className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-gray-600" />
                      <div className="text-left">
                        <div className="font-medium text-gray-900">Privacy & Security</div>
                        <div className="text-sm text-gray-600">Manage your privacy settings</div>
                      </div>
                    </div>
                    <div className="text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                </div>

                {/* Help */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <button className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <HelpCircle className="w-5 h-5 text-gray-600" />
                      <div className="text-left">
                        <div className="font-medium text-gray-900">Help & Support</div>
                        <div className="text-sm text-gray-600">Get help and contact support</div>
                      </div>
                    </div>
                    <div className="text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <div className="mt-8">
              <button
                onClick={handleLogout}
                className="w-full bg-red-50 border border-red-200 rounded-xl px-4 py-4 hover:bg-red-100 transition-colors duration-200"
              >
                <div className="flex items-center justify-center space-x-3">
                  <LogOut className="w-5 h-5 text-red-600" />
                  <span className="font-medium text-red-600">Sign Out</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 