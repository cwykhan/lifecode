export default function SajuBoard({ data }: { data: any }) {
  const renderCard = (title: string, sky: string, land: string) => (
    <div className="flex flex-col items-center p-4 border rounded-lg bg-slate-800 shadow-xl">
      <span className="text-xs text-slate-400 mb-2">{title}</span>
      <div className={`text-3xl font-bold mb-1 ${getColor(sky)}`}>{sky}</div>
      <div className="text-xl font-medium text-slate-300">{land}</div>
    </div>
  );

  return (
    <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto p-6 bg-slate-900 rounded-2xl">
      {renderCard('TIME', data.pillars.time.sky, data.pillars.time.land)}
      {renderCard('DAY', data.pillars.day.sky, data.pillars.day.land)}
      {renderCard('MONTH', data.pillars.month.sky, data.pillars.month.land)}
      {renderCard('YEAR', data.pillars.year.sky, data.pillars.year.land)}
      
      <div className="col-span-4 mt-4 p-4 bg-blue-900/30 border border-blue-500/50 rounded-lg">
        <h3 className="text-blue-400 font-bold">Analysis Verdict</h3>
        <p className="text-sm text-slate-200">
          Status: <span className="font-bold">{data.level}</span> ({data.score}%)
          {data.specialCombo && <span className="block text-yellow-400 mt-1">✨ {data.specialCombo}</span>}
        </p>
      </div>
    </div>
  );
}

function getColor(symbol: string) {
  if ('Tt'.includes(symbol)) return 'text-green-500';
  if ('Ff'.includes(symbol)) return 'text-red-500';
  if ('Ee'.includes(symbol)) return 'text-yellow-500';
  if ('Mm'.includes(symbol)) return 'text-purple-400';
  if ('Ww'.includes(symbol)) return 'text-blue-500';
  return 'text-white';
}
