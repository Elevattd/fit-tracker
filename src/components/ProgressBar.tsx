
interface ProgressBarProps {
  label: string;
  value: number;
  target: number;
  unit?: string;
  color: string;
}

export const ProgressBar = ({ label, value, target, unit = '', color }: ProgressBarProps) => {
  const pct = Math.min(100, Math.round((value / target) * 100));
  
  // Dynamic color logic from original
  let barColor = color;
  if (label === 'Calorías') {
    barColor = pct >= 95 ? '#1D9E75' : pct >= 70 ? '#BA7517' : '#378ADD';
  } else if (label === 'Cafeína') {
     barColor = pct >= 90 ? '#dc2626' : pct >= 70 ? '#BA7517' : '#1D9E75';
  }

  return (
    <div className="macro-box">
      <div className="macro-label">{label}</div>
      <div className="macro-val">{value}{unit}</div>
      <div className="macro-target">/ {target}{unit}</div>
      <div className="macro-bar-wrap">
        <div 
          className="macro-bar" 
          style={{ width: `${pct}%`, backgroundColor: barColor }}
        />
      </div>
    </div>
  );
};
