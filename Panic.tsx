import { Subject } from '../types';
import { RefreshCw } from 'lucide-react';

interface Props {
  subjects: Subject[];
  onNavigateToDashboard: () => void;
}

export default function Panic({ subjects, onNavigateToDashboard }: Props) {
  const totalAttended = subjects.reduce((sum, s) => sum + s.attendedClasses, 0);
  const totalClasses = subjects.reduce((sum, s) => sum + s.totalClasses, 0);
  const overallPercentage = totalClasses > 0 ? (totalAttended / totalClasses) * 100 : 0;
  
  const targetPercentage = subjects[0]?.targetPercentage || 75;

  let classesNeeded = 0;
  if (totalClasses > 0 && overallPercentage < targetPercentage) {
    classesNeeded = Math.ceil((targetPercentage * totalClasses - 100 * totalAttended) / (100 - targetPercentage));
  }
  
  let classesCanMiss = 0;
  if (totalClasses > 0 && overallPercentage >= targetPercentage) {
    classesCanMiss = Math.floor((100 * totalAttended - targetPercentage * totalClasses) / targetPercentage);
  }

  let recommendedAction = '';
  let actionColor = '';
  let actionBorder = '';
  let actionBg = '';

  if (classesNeeded > 0) {
    recommendedAction = `DO NOT MISS ANY CLASSES! You are in critical danger. Attend the next ${classesNeeded} classes consecutively.`;
    actionColor = 'text-primary-red';
    actionBorder = 'border-primary-red/30';
    actionBg = 'bg-primary-red/10';
  } else if (classesCanMiss === 0) {
    recommendedAction = "You are exactly on the edge. Attend your next class to build a safety buffer.";
    actionColor = 'text-neon-yellow';
    actionBorder = 'border-neon-yellow/30';
    actionBg = 'bg-neon-yellow/10';
  } else {
    recommendedAction = `You are safe. You can afford to miss ${classesCanMiss} classes, but stay vigilant.`;
    actionColor = 'text-tertiary-green';
    actionBorder = 'border-tertiary-green/30';
    actionBg = 'bg-tertiary-green/10';
  }

  return (
    <div className="flex flex-col w-full h-full p-5 space-y-8">
      <div className="flex flex-col items-center mt-8">
        <h1 className="text-3xl font-bold text-primary-red text-center">ATTENDANCE PANIC MODE</h1>
      </div>

      <div className="w-full bg-surface-dark/80 rounded-[24px] border border-outline-color p-6 shadow-xl flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-xs text-on-surface-variant uppercase tracking-wider">Current Attendance</span>
            <span className="text-4xl font-bold text-neon-cyan mt-1">{overallPercentage.toFixed(1)}%</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs text-on-surface-variant uppercase tracking-wider">Required</span>
            <span className="text-4xl font-bold text-on-background mt-1">{targetPercentage}%</span>
          </div>
        </div>

        <div className="h-px w-full bg-outline-color" />

        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-xs text-on-surface-variant uppercase tracking-wider">Classes Needed</span>
            <span className={`text-4xl font-bold mt-1 ${classesNeeded > 0 ? 'text-primary-red' : 'text-tertiary-green'}`}>
              {classesNeeded}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs text-on-surface-variant uppercase tracking-wider">Can Still Miss</span>
            <span className={`text-4xl font-bold mt-1 ${classesCanMiss > 0 ? 'text-tertiary-green' : 'text-primary-red'}`}>
              {classesCanMiss}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center pt-4">
        <span className="text-xs text-on-surface-variant uppercase tracking-widest mb-4">NEXT RECOMMENDED ACTION</span>
        <div className={`w-full rounded-[24px] border ${actionBorder} ${actionBg} p-8 flex items-center justify-center text-center`}>
          <p className={`text-lg font-medium ${actionColor}`}>
            {recommendedAction}
          </p>
        </div>
      </div>

      <div className="flex-1" />

      <button
        onClick={onNavigateToDashboard}
        className="w-full h-16 bg-neon-cyan text-black font-bold rounded-2xl flex items-center justify-center space-x-2 text-sm tracking-wider active:scale-[0.98] transition-transform shadow-[0_0_20px_rgba(0,229,255,0.3)] mb-4"
      >
        <RefreshCw size={20} className="text-black" />
        <span>RECALCULATE SURVIVAL</span>
      </button>
    </div>
  );
}
