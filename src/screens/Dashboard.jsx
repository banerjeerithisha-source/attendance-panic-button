import { LayoutDashboard, CheckCircle, ThumbsUp, AlertTriangle, AlertCircle } from 'lucide-react';


export default function Dashboard({ subjects, onNavigateToPanic }) {
  if (subjects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] p-6 text-center space-y-4">
        <LayoutDashboard size={64} className="text-on-surface-variant" />
        <h2 className="text-3xl font-bold text-on-background">No subjects found</h2>
        <p className="text-on-surface-variant">Add subjects in the Profile tab to start tracking your survival.</p>
      </div>
    );
  }

  const totalAttended = subjects.reduce((sum, s) => sum + s.attendedClasses, 0);
  const totalClasses = subjects.reduce((sum, s) => sum + s.totalClasses, 0);
  const overallPercentage = totalClasses > 0 ? (totalAttended / totalClasses) * 100 : 0;
  
  const targetPercentage = subjects[0]?.targetPercentage || 75;

  let classesNeeded = 0;
  if (totalClasses > 0 && overallPercentage < targetPercentage) {
    classesNeeded = Math.ceil((targetPercentage * totalClasses - 100 * totalAttended) / (100 - targetPercentage));
  }

  const isSafe = overallPercentage >= 90;
  const isGood = overallPercentage >= 75 && overallPercentage < 90;
  const isRisky = overallPercentage >= 60 && overallPercentage < 75;

  let colorClass = 'text-primary-red';
  let strokeClass = 'stroke-primary-red';
  let statusText = 'CRITICAL';
  
  if (isSafe) { colorClass = 'text-neon-cyan'; strokeClass = 'stroke-neon-cyan'; statusText = 'SAFE'; }
  else if (isGood) { colorClass = 'text-tertiary-green'; strokeClass = 'stroke-tertiary-green'; statusText = 'GOOD'; }
  else if (isRisky) { colorClass = 'text-neon-yellow'; strokeClass = 'stroke-neon-yellow'; statusText = 'RISKY'; }

  const statusMessage = classesNeeded > 0 
    ? `You need to attend ${classesNeeded} more classes to reach ${targetPercentage}%.`
    : "You are above your required attendance limit.";

  // SVG Gauge Calculations
  const radius = 90;
  const circumference = Math.PI * radius; // Semi-circle
  const strokeDashoffset = circumference - (Math.min(overallPercentage, 100) / 100) * circumference;

  return (
    <div className="flex flex-col w-full h-full p-5 space-y-8">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-on-background mt-8">ARE YOU SURVIVING?</h1>
      </div>

      <div className="w-full bg-surface-dark/80 rounded-[24px] border border-outline-color p-6 shadow-xl flex flex-col items-center">
        <div className="relative w-[240px] h-[120px] overflow-hidden flex justify-center items-end">
          <svg className="w-full h-[240px] absolute top-0 left-0" viewBox="0 0 200 200">
            {/* Background Arc */}
            <path
              d="M 10 100 A 90 90 0 0 1 190 100"
              fill="none"
              stroke="#2A2A2A"
              strokeWidth="20"
              strokeLinecap="round"
            />
            {/* Foreground Arc */}
            <path
              d="M 10 100 A 90 90 0 0 1 190 100"
              fill="none"
              className={`${strokeClass} transition-all duration-1000 ease-out`}
              strokeWidth="20"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
          <div className="flex flex-col items-center z-10 pb-2">
            <span className={`text-5xl font-bold ${colorClass}`}>{overallPercentage.toFixed(1)}%</span>
            <span className={`text-xl font-bold tracking-widest mt-1 ${colorClass}`}>{statusText}</span>
          </div>
        </div>
        <p className="text-on-background mt-6 text-center text-sm">{statusMessage}</p>
      </div>

      <div className="flex flex-col space-y-4">
        <h2 className="text-lg text-on-background font-semibold">SUBJECT RANKINGS</h2>
        {subjects.map(sub => {
          const p = sub.totalClasses > 0 ? (sub.attendedClasses / sub.totalClasses) * 100 : 0;
          const sSafe = p >= 90;
          const sGood = p >= 75 && p < 90;
          const sRisky = p >= 60 && p < 75;

          let sColor = 'bg-primary-red';
          let sText = 'text-primary-red';
          let Icon = AlertTriangle;

          if (sSafe) { sColor = 'bg-neon-cyan'; sText = 'text-neon-cyan'; Icon = CheckCircle; }
          else if (sGood) { sColor = 'bg-tertiary-green'; sText = 'text-tertiary-green'; Icon = ThumbsUp; }
          else if (sRisky) { sColor = 'bg-neon-yellow'; sText = 'text-neon-yellow'; Icon = AlertCircle; }

          return (
            <div key={sub.id} className="w-full bg-surface-dark rounded-2xl border border-outline-color flex items-center h-[72px] overflow-hidden pr-4">
              <div className={`w-1.5 h-full ${sColor}`} />
              <div className="flex-1 px-4 flex flex-col justify-center">
                <span className="text-lg font-bold text-on-background truncate">{sub.name}</span>
                <div className="w-4/5 h-1.5 bg-[#2A2A2A] rounded-full mt-1.5 overflow-hidden">
                  <div className={`h-full ${sColor}`} style={{ width: `${Math.min(p, 100)}%` }} />
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className={`text-xl font-bold ${sText}`}>{p.toFixed(0)}%</span>
                <Icon size={16} className={`${sText} mt-1`} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex-1" />

      <button
        onClick={onNavigateToPanic}
        className="w-full h-16 bg-neon-cyan text-black font-bold rounded-2xl flex items-center justify-center space-x-2 text-sm tracking-wider active:scale-[0.98] transition-transform shadow-[0_0_20px_rgba(0,229,255,0.3)] mb-4"
      >
        <span>CALCULATE MY SURVIVAL</span>
        <AlertTriangle size={20} className="text-black" />
      </button>
    </div>
  );
}
