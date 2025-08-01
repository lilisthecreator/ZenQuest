import React, { useState, useEffect } from 'react';
import { Clock, BookOpen, Target, Plus, ChevronRight, ChevronDown, Play, CheckCircle } from 'lucide-react';

const CourseResult = ({ onNavigate }) => {
  const [expandedPlan, setExpandedPlan] = useState(null);
  const [developmentPlans, setDevelopmentPlans] = useState([]);

  // Default plans data
  const defaultPlans = [
    {
      id: 1,
      title: "Backend Developer with Clojure",
      description: "Master functional programming and build scalable backend systems",
      level: 3,
      maxLevel: 10,
      totalSkills: 8,
      completedSkills: 5,
      progress: 62,
      chapters: [
        { id: 1, title: "Clojure Fundamentals", readingTime: "45 min", content: "# Clojure Fundamentals..." },
        { id: 2, title: "Functional Programming", readingTime: "35 min", content: "# Functional Programming..." },
        { id: 3, title: "Web Development with Ring", readingTime: "40 min", content: "# Web Development..." },
        { id: 4, title: "Database Integration", readingTime: "30 min", content: "# Database Integration..." },
        { id: 5, title: "Deployment & DevOps", readingTime: "25 min", content: "# Deployment..." }
      ],
      skills: [
        "Clojure Syntax & Semantics",
        "Immutable Data Structures", 
        "Higher-Order Functions",
        "Web API Development",
        "Database Design",
        "Testing & Debugging",
        "Performance Optimization",
        "System Architecture"
      ]
    },
    {
      id: 2,
      title: "Professional Mathematician",
      description: "Advanced mathematical theory and practical applications",
      level: 2,
      maxLevel: 10,
      totalSkills: 6,
      completedSkills: 2,
      progress: 33,
      chapters: [
        { id: 1, title: "Advanced Calculus", readingTime: "50 min", content: "# Advanced Calculus..." },
        { id: 2, title: "Linear Algebra", readingTime: "45 min", content: "# Linear Algebra..." },
        { id: 3, title: "Statistical Analysis", readingTime: "40 min", content: "# Statistical Analysis..." },
        { id: 4, title: "Mathematical Modeling", readingTime: "35 min", content: "# Mathematical Modeling..." }
      ],
      skills: [
        "Advanced Calculus",
        "Linear Algebra",
        "Statistical Methods",
        "Mathematical Proofs",
        "Research Methodology",
        "Data Analysis"
      ]
    },
    {
      id: 3,
      title: "AI/ML Engineer",
      description: "Build intelligent systems with machine learning",
      level: 1,
      maxLevel: 10,
      totalSkills: 7,
      completedSkills: 1,
      progress: 14,
      chapters: [
        { id: 1, title: "Python for AI", readingTime: "40 min", content: "# Python for AI..." },
        { id: 2, title: "Machine Learning Algorithms", readingTime: "55 min", content: "# ML Algorithms..." },
        { id: 3, title: "Deep Learning", readingTime: "60 min", content: "# Deep Learning..." },
        { id: 4, title: "Computer Vision", readingTime: "45 min", content: "# Computer Vision..." }
      ],
      skills: [
        "Python Programming",
        "NumPy & Pandas",
        "Scikit-learn",
        "TensorFlow/PyTorch",
        "Neural Networks",
        "Model Deployment",
        "MLOps"
      ]
    }
  ];

  // Load plans from localStorage on component mount
  useEffect(() => {
    const savedPlans = localStorage.getItem('zenverse_development_plans');
    if (savedPlans) {
      try {
        const parsedPlans = JSON.parse(savedPlans);
        // Migrate old format and merge with default plans to ensure chapters exist
        const migratedPlans = parsedPlans.map(savedPlan => {
          const defaultPlan = defaultPlans.find(dp => dp.id === savedPlan.id);
          
          // Migrate old skills format to new format
          let migratedSkills = savedPlan.skills;
          if (migratedSkills && migratedSkills.length > 0 && typeof migratedSkills[0] === 'object') {
            // Old format: [{name: "...", completed: false, readingTime: "..."}]
            // New format: ["skill1", "skill2", ...]
            migratedSkills = migratedSkills.map(skill => skill.name || skill);
          }
          
          return {
            ...savedPlan,
            level: savedPlan.level || 1,
            maxLevel: savedPlan.maxLevel || 10,
            chapters: savedPlan.chapters || (defaultPlan ? defaultPlan.chapters : []),
            skills: migratedSkills || (defaultPlan ? defaultPlan.skills : [])
          };
        });
        setDevelopmentPlans(migratedPlans);
        // Save the migrated data back to localStorage
        saveToLocalStorage(migratedPlans);
      } catch (error) {
        console.error('Error loading plans from localStorage:', error);
        setDevelopmentPlans(defaultPlans);
        saveToLocalStorage(defaultPlans);
      }
    } else {
      setDevelopmentPlans(defaultPlans);
      saveToLocalStorage(defaultPlans);
    }
  }, []);

  // Save plans to localStorage
  const saveToLocalStorage = (plans) => {
    try {
      localStorage.setItem('zenverse_development_plans', JSON.stringify(plans));
    } catch (error) {
      console.error('Error saving plans to localStorage:', error);
    }
  };

  // Update plans and save to localStorage
  const updatePlans = (newPlans) => {
    setDevelopmentPlans(newPlans);
    saveToLocalStorage(newPlans);
  };

  // Handle skill completion toggle
  const toggleSkillCompletion = (planId, skillIndex) => {
    const updatedPlans = developmentPlans.map(plan => {
      if (plan.id === planId) {
        const updatedSkills = [...plan.skills];
        updatedSkills[skillIndex] = {
          ...updatedSkills[skillIndex],
          completed: !updatedSkills[skillIndex].completed
        };
        
        const completedCount = updatedSkills.filter(skill => skill.completed).length;
        const progress = Math.round((completedCount / updatedSkills.length) * 100);
        
        return {
          ...plan,
          skills: updatedSkills,
          completedSkills: completedCount,
          progress: progress
        };
      }
      return plan;
    });
    
    updatePlans(updatedPlans);
  };

  // Add new quest to the plans
  const addNewQuest = (questData) => {
    const newId = Math.max(...developmentPlans.map(p => p.id), 0) + 1;
    
    const newPlan = {
      id: newId,
      title: `${questData.topic} Specialist`,
      description: `Master ${questData.topic} and build expertise`,
      level: 1,
      maxLevel: 10,
      totalSkills: 6,
      completedSkills: 0,
      progress: 0,
      chapters: [
        { id: 1, title: `${questData.topic} Introduction`, readingTime: "15 min", content: `# ${questData.topic} Introduction\n\nWelcome to your ${questData.topic} learning journey...` },
        { id: 2, title: `${questData.topic} Fundamentals`, readingTime: "20 min", content: `# ${questData.topic} Fundamentals\n\nCore concepts and principles...` },
        { id: 3, title: `${questData.topic} Advanced Topics`, readingTime: "25 min", content: `# ${questData.topic} Advanced Topics\n\nAdvanced techniques and best practices...` },
        { id: 4, title: `${questData.topic} Real-world Applications`, readingTime: "30 min", content: `# ${questData.topic} Real-world Applications\n\nPractical examples and use cases...` }
      ],
      skills: [
        `${questData.topic} Basics`,
        `${questData.topic} Fundamentals`,
        `${questData.topic} Advanced Concepts`,
        `${questData.topic} Best Practices`,
        `${questData.topic} Real Projects`,
        `${questData.topic} Mastery`
      ]
    };
    
    const updatedPlans = [...developmentPlans, newPlan];
    updatePlans(updatedPlans);
  };

  // Store the addNewQuest function globally so other components can access it
  useEffect(() => {
    window.zenverseAddQuest = addNewQuest;
    return () => {
      delete window.zenverseAddQuest;
    };
  }, [developmentPlans]);

  const handleRecreateQuest = () => {
    if (onNavigate) {
      onNavigate('learning-journey');
    }
  };

  const togglePlan = (planId) => {
    setExpandedPlan(expandedPlan === planId ? null : planId);
  };

  const handleStartQuiz = (plan) => {
    if (onNavigate) {
      onNavigate('quiz');
    }
  };

  const handleReadingMaterial = (plan) => {
    // Toggle expand to show chapters instead of navigating
    togglePlan(plan.id);
  };

  const handleReadChapter = (plan, chapter) => {
    // Store selected plan and chapter globally for ReadingPage component
    window.zenverseSelectedPlan = plan;
    window.zenverseSelectedChapter = chapter;
    if (onNavigate) {
      onNavigate('reading-page');
    }
  };

  const handleReadSkill = (plan, skill) => {
    alert(`Opening reading material for "${skill.name}" from ${plan.title}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pb-24">
        
        {/* Beautiful Header */}
        <div className="relative px-6 py-12 pb-16" style={{background: 'linear-gradient(to right, #ee7e5c 0%, #372974 60%, #372974 100%)'}}>
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <img 
                  src="/images/Icon for learning page .png" 
                  alt="Learning Page Icon" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Your Learning Quest</h1>
              <p className="text-white text-opacity-80 text-sm">Personalized development plans</p>
            </div>
          </div>
          
          {/* Curved Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gray-50" style={{
            borderRadius: '50% 50% 0 0 / 100% 100% 0 0'
          }}></div>
        </div>

        {/* Main Content */}
        <div className="px-6 -mt-6 relative z-10">
          
          {/* Create New Quest Card */}
          <div className="mb-8">
            <button 
              onClick={handleRecreateQuest}
              className="w-full bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 active:scale-[0.98]"
            >
              <div className="flex items-center justify-center space-x-3">
                <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center">
                  <Plus className="w-6 h-6 text-gray-600" />
                </div>
                <div className="text-left">
                  <span className="text-gray-900 font-semibold block">Create New Quest</span>
                  <span className="text-gray-500 text-sm">Start a personalized learning journey</span>
                </div>
              </div>
            </button>
          </div>

          {/* Development Plans Header */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Development Plans</h2>
            <p className="text-gray-600 text-sm">Choose your path • {developmentPlans.length} plans available</p>
          </div>
          
          {/* Beautiful Plan Cards */}
          <div className="space-y-4">
            {developmentPlans.map((plan) => (
              <div 
                key={plan.id} 
                className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
              >
                {/* Plan Header */}
                <div className="p-5">
                  <div className="flex items-center space-x-4 mb-4">
                    {/* Circular Level Progress */}
                    <div className="w-16 h-16 relative flex items-center justify-center flex-shrink-0">
                      <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="#e5e7eb"
                          strokeWidth="4"
                          fill="none"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="#372974"
                          strokeWidth="4"
                          fill="none"
                          strokeDasharray={`${(plan.level / plan.maxLevel) * 175.9} 175.9`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold" style={{color: '#372974'}}>L{plan.level}</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-lg mb-1">{plan.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{plan.description}</p>
                      <div className="text-xs text-gray-500">Level {plan.level} of {plan.maxLevel}</div>
                    </div>
                  </div>
                  
                  {/* Skills Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Skills Progress</span>
                      <span className="text-sm font-semibold" style={{color: '#372974'}}>{plan.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${plan.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{plan.completedSkills} of {plan.totalSkills} skills mastered</p>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-3 mb-4">
                    <button
                      onClick={() => handleStartQuiz(plan)}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-xl font-medium text-sm transition-colors flex items-center justify-center space-x-2"
                    >
                      <Play className="w-4 h-4" />
                      <span>Practice</span>
                    </button>
                    <button
                      onClick={() => handleReadingMaterial(plan)}
                      className="flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-colors flex items-center justify-center space-x-2 border hover:bg-gray-50"
                      style={{
                        borderColor: '#372974',
                        color: '#372974'
                      }}
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Study</span>
                    </button>
                  </div>

                  {/* Skills Information */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 text-sm mb-3">Skills in this Quest</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {plan.skills.map((skill, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full" style={{backgroundColor: index < plan.completedSkills ? '#f97316' : '#d1d5db'}}></div>
                          <span className={`text-xs ${index < plan.completedSkills ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                            {skill}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expanded Reading Materials */}
                  {expandedPlan === plan.id && (
                    <div className="border-t border-gray-100 bg-gray-50">
                      <div className="p-5">
                        <h4 className="font-semibold text-gray-900 mb-4">Reading Materials</h4>
                        
                        <div className="space-y-3">
                          {plan.chapters && plan.chapters.length > 0 ? (
                            plan.chapters.map((chapter, index) => (
                              <div
                                key={chapter.id}
                                className="bg-white rounded-xl p-4 border border-gray-200 flex items-center justify-between"
                              >
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 text-white rounded-lg flex items-center justify-center text-sm font-bold" style={{backgroundColor: '#372974'}}>
                                    {index + 1}
                                  </div>
                                  <div>
                                    <h5 className="font-medium text-gray-900 text-sm">{chapter.title}</h5>
                                    <div className="flex items-center space-x-1 mt-1">
                                      <Clock className="w-3 h-3 text-gray-400" />
                                      <span className="text-xs text-gray-500">{chapter.readingTime}</span>
                                    </div>
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleReadChapter(plan, chapter)}
                                  className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg text-xs font-medium transition-colors"
                                >
                                  Read
                                </button>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-8">
                              <p className="text-gray-500 text-sm">No reading materials available</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseResult;