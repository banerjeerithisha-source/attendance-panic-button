import { Calendar as CalendarIcon } from 'lucide-react';


export default function Calendar({ subjects, onNavigateToPanic }) {
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <div className="flex flex-col w-full h-full p-5 space-y-6">
      <div className="flex items-center space-x-4 mt-6">
        <CalendarIcon size={32} className="text-on-background" />
        <h1 className="text-3xl font-bold text-on-background">CLASS SCHEDULE</h1>
      </div>

      {subjects.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-on-surface-variant text-center">No classes scheduled yet. Add subjects in Profile.</p>
        </div>
      ) : (
        <div className="flex flex-col space-y-6 pb-[40px]">
          {weekDays.map((day, index) => {
            const daySubjects = subjects.filter((_, sIndex) => 
              sIndex % weekDays.length === index || sIndex % weekDays.length === (index + 2) % weekDays.length
            );

            if (daySubjects.length === 0) return null;

            return (
              <div key={day} className="flex flex-col space-y-2">
                <span className="text-sm font-semibold text-neon-cyan uppercase tracking-wider">{day}</span>
                {daySubjects.map((subject) => {
                  const p = subject.totalClasses > 0 ? (subject.attendedClasses / subject.totalClasses) * 100 : 0;
                  const statusColor = p >= subject.targetPercentage ? 'text-tertiary-green' : 'text-primary-red';
                  
                  return (
                    <div 
                      key={`${day}-${subject.id}`} 
                      onClick={onNavigateToPanic}
                      className="w-full bg-surface-dark rounded-xl border border-outline-color p-4 flex justify-between items-center shadow-md cursor-pointer hover:opacity-80 active:scale-[0.98] transition-all"
                    >
                      <div className="flex flex-col">
                        <span className="text-base font-bold text-on-background">{subject.name}</span>
                        <span className="text-xs text-on-surface-variant mt-1">10:00 AM - 11:30 AM</span>
                      </div>
                      <div className="flex flex-col items-end justify-center">
                        <span className={`text-sm font-bold ${statusColor}`}>{p.toFixed(0)}%</span>
                        {p < subject.targetPercentage && (
                          <span className="text-[10px] text-primary-red uppercase font-semibold mt-0.5">Panic</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
