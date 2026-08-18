import { useState, useEffect } from 'react';
import { LayoutDashboard, AlertTriangle, Calendar as CalendarIcon, User } from 'lucide-react';
import Dashboard from './screens/Dashboard';
import Panic from './screens/Panic';
import Calendar from './screens/Calendar';
import Profile from './screens/Profile';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem('subjects');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [userConfig, setUserConfig] = useState(() => {
    const saved = localStorage.getItem('userConfig');
    return saved ? JSON.parse(saved) : {
      name: 'Student',
      college: '',
      semester: '',
      globalTargetPercentage: 75
    };
  });

  useEffect(() => {
    localStorage.setItem('subjects', JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem('userConfig', JSON.stringify(userConfig));
  }, [userConfig]);

  const addSubject = (sub) => {
    setSubjects(prev => [...prev, { ...sub, id: Date.now() }]);
  };

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'panic', icon: AlertTriangle, label: 'Panic' },
    { id: 'calendar', icon: CalendarIcon, label: 'Calendar' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-black flex justify-center">
      <div className="w-full max-w-md h-[100dvh] bg-background-dark text-on-background relative flex flex-col shadow-2xl overflow-hidden">
        <main className="flex-1 overflow-y-auto pb-[100px]">
          {activeTab === 'dashboard' && <Dashboard subjects={subjects} onNavigateToPanic={() => setActiveTab('panic')} />}
          {activeTab === 'panic' && <Panic subjects={subjects} onNavigateToDashboard={() => setActiveTab('dashboard')} />}
          {activeTab === 'calendar' && <Calendar subjects={subjects} onNavigateToPanic={() => setActiveTab('panic')} />}
          {activeTab === 'profile' && <Profile userConfig={userConfig} subjects={subjects} onSaveConfig={setUserConfig} onAddSubject={addSubject} />}
        </main>

        <nav className="absolute bottom-0 w-full h-[80px] bg-surface-dark border-t border-outline-color flex justify-around items-center px-4 z-50">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col items-center justify-center w-16 h-16 transition-colors"
            >
              <div className={`p-1.5 rounded-2xl ${isActive ? 'bg-neon-cyan/20' : 'bg-transparent'}`}>
                <Icon size={24} className={isActive ? 'text-neon-cyan' : 'text-on-surface-variant'} />
              </div>
              <span className={`text-[10px] mt-1 ${isActive ? 'text-neon-cyan' : 'text-on-surface-variant'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
      </div>
    </div>
  );
}

export default App;
