import React, { useState } from 'react';
import { Trophy, Star, Flame, Medal, Award, User } from 'lucide-react';

const RankingPage = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('leaderboard');

  // Clean leaderboard data
  const leaderboardData = [
    { id: 1, name: "Alex Chen", avatar: "🧑‍💻", points: 4250, level: 15, streak: 45 },
    { id: 2, name: "Sarah Wilson", avatar: "👩‍🎨", points: 3890, level: 14, streak: 32 },
    { id: 3, name: "Marcus Johnson", avatar: "👨‍🔬", points: 3654, level: 13, streak: 28 },
    { id: 4, name: "Emma Davis", avatar: "👩‍💼", points: 3420, level: 12, streak: 24 },
    { id: 5, name: "David Kim", avatar: "👨‍🎓", points: 3187, level: 11, streak: 19 },
    { id: 12, name: "Fellycia Alvira", avatar: "👩‍💻", points: 2847, level: 9, streak: 7 }
  ];

  // Clean achievements
  const achievements = [
    { id: 1, title: "First Quest", icon: "🎯", completed: true },
    { id: 2, title: "Week Warrior", icon: "🔥", completed: true },
    { id: 3, title: "Quiz Master", icon: "🧠", completed: true },
    { id: 4, title: "Speed Learner", icon: "⚡", completed: true },
    { id: 5, title: "Night Scholar", icon: "🦉", completed: false },
    { id: 6, title: "Perfect Score", icon: "💯", completed: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pb-32">
        
        {/* Clean Header */}
        <div className="px-6 py-8" style={{background: 'linear-gradient(135deg, #ee7e5c 0%, #372974 100%)'}}>
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">Rankings</h1>
            <p className="text-white text-opacity-90 text-sm">Compete with learners worldwide</p>
          </div>

          {/* User Stats */}
          <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Fellycia Alvira</h3>
                <div className="flex items-center space-x-1">
                  <Medal className="w-3 h-3 text-yellow-300" />
                  <span className="text-white text-opacity-90 text-xs">Level 9</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-lg font-bold text-white">2,847</div>
                <div className="text-xs text-white text-opacity-80">Points</div>
              </div>
              <div>
                <div className="text-lg font-bold text-white">#12</div>
                <div className="text-xs text-white text-opacity-80">Rank</div>
              </div>
              <div>
                <div className="text-lg font-bold text-white">7</div>
                <div className="text-xs text-white text-opacity-80">Streak</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 -mt-3 relative z-10">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1 mb-6">
            <div className="grid grid-cols-2 gap-1">
              <button
                onClick={() => setActiveTab('leaderboard')}
                className={`flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === 'leaderboard'
                    ? 'text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                style={activeTab === 'leaderboard' ? {background: '#372974'} : {}}
              >
                <Trophy className="w-4 h-4" />
                <span>Leaderboard</span>
              </button>
              <button
                onClick={() => setActiveTab('achievements')}
                className={`flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === 'achievements'
                    ? 'text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                style={activeTab === 'achievements' ? {background: '#372974'} : {}}
              >
                <Award className="w-4 h-4" />
                <span>Achievements</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6">
          {activeTab === 'leaderboard' && (
            <div className="space-y-3">
              {leaderboardData.map((user, index) => (
                <div
                  key={user.id}
                  className={`bg-white rounded-xl p-4 shadow-sm border transition-all duration-200 ${
                    user.name === "Fellycia Alvira"
                      ? 'border-orange-200 bg-orange-50'
                      : 'border-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {/* Rank */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${
                      index === 0 ? 'bg-yellow-400 text-white' :
                      index === 1 ? 'bg-gray-400 text-white' :
                      index === 2 ? 'bg-orange-400 text-white' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>

                    {/* Avatar */}
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>

                    {/* User Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-gray-900">{user.name}</h3>
                        {user.name === "Fellycia Alvira" && (
                          <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            You
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-gray-600">
                        <span className="flex items-center space-x-1">
                          <Star className="w-3 h-3" />
                          <span>{user.points.toLocaleString()}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Flame className="w-3 h-3" />
                          <span>{user.streak}d</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Medal className="w-3 h-3" />
                          <span>Lv.{user.level}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-4">
              {/* Progress Summary */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Your Progress</h3>
                    <p className="text-sm text-gray-600">4 of 6 achievements unlocked</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">67%</div>
                    <div className="text-xs text-gray-500">Complete</div>
                  </div>
                </div>
              </div>

              {/* Achievement List */}
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`bg-white rounded-xl p-4 border transition-all duration-200 ${
                      achievement.completed
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`text-2xl ${!achievement.completed ? 'grayscale' : ''}`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className={`font-medium ${
                            achievement.completed ? 'text-gray-900' : 'text-gray-500'
                          }`}>
                            {achievement.title}
                          </h4>
                          {achievement.completed && (
                            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                              ✓
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RankingPage; 