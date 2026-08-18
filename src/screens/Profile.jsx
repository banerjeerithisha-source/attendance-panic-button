import { useState } from 'react';


export default function Profile({ userConfig, onSaveConfig, onAddSubject }) {
  const [name, setName] = useState(userConfig.name);
  const [college, setCollege] = useState(userConfig.college);
  const [semester, setSemester] = useState(userConfig.semester);
  const [target, setTarget] = useState(userConfig.globalTargetPercentage.toString());

  const [newSubName, setNewSubName] = useState('');
  const [newSubAttended, setNewSubAttended] = useState('');
  const [newSubTotal, setNewSubTotal] = useState('');

  const handleSaveConfig = () => {
    onSaveConfig({
      name,
      college,
      semester,
      globalTargetPercentage: parseFloat(target) || 75
    });
  };

  const handleAddSubject = () => {
    const att = parseInt(newSubAttended) || 0;
    const tot = parseInt(newSubTotal) || 0;
    if (newSubName.trim() && tot >= att) {
      onAddSubject({
        id: Date.now(), // will be overwritten in App, but good for TS
        name: newSubName,
        attendedClasses: att,
        totalClasses: tot,
        targetPercentage: parseFloat(target) || 75
      });
      setNewSubName('');
      setNewSubAttended('');
      setNewSubTotal('');
    }
  };

  const InputClass = "w-full bg-transparent border border-outline-color rounded-lg px-4 py-3 text-on-background placeholder:text-on-surface-variant focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-colors";

  return (
    <div className="flex flex-col w-full h-full p-5 space-y-6">
      <h1 className="text-4xl font-bold text-on-background mt-6">PROFILE</h1>

      <div className="w-full bg-surface-dark/80 rounded-[16px] border border-outline-color p-5 flex flex-col space-y-5">
        <h2 className="text-xl font-bold text-neon-cyan">User Details</h2>
        
        <div className="space-y-4">
          <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} className={InputClass} />
          <input type="text" placeholder="College" value={college} onChange={e => setCollege(e.target.value)} className={InputClass} />
          
          <div className="flex space-x-4">
            <input type="text" placeholder="Semester" value={semester} onChange={e => setSemester(e.target.value)} className={`${InputClass} flex-1`} />
            <input type="number" placeholder="Target %" value={target} onChange={e => setTarget(e.target.value)} className={`${InputClass} flex-1`} />
          </div>

          <button onClick={handleSaveConfig} className="w-full py-3 bg-neon-cyan text-black font-bold rounded-lg text-sm tracking-wider active:scale-[0.98] transition-transform">
            SAVE CONFIG
          </button>
        </div>
      </div>

      <div className="w-full bg-surface-dark/80 rounded-[16px] border border-outline-color p-5 flex flex-col space-y-5 mb-8">
        <h2 className="text-xl font-bold text-tertiary-green">Add Subject</h2>
        
        <div className="space-y-4">
          <input type="text" placeholder="Subject Name" value={newSubName} onChange={e => setNewSubName(e.target.value)} className={InputClass} />
          
          <div className="flex space-x-4">
            <input type="number" placeholder="Attended" value={newSubAttended} onChange={e => setNewSubAttended(e.target.value)} className={`${InputClass} flex-1`} />
            <input type="number" placeholder="Total" value={newSubTotal} onChange={e => setNewSubTotal(e.target.value)} className={`${InputClass} flex-1`} />
          </div>

          <button onClick={handleAddSubject} className="w-full py-3 bg-tertiary-green text-black font-bold rounded-lg text-sm tracking-wider active:scale-[0.98] transition-transform">
            ADD SUBJECT
          </button>
        </div>
      </div>
    </div>
  );
}
