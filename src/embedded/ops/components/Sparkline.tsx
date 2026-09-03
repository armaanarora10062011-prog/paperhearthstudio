import { daily } from "../data";

export function VisitsChart() {
  const data = daily;
  const w = 100;
  const h = 32;
  const max = Math.max(...data.map((d) => d.visits));
  const min = Math.min(...data.map((d) => d.visits));
  const range = max - min || 1;
  const stepX = w / (data.length - 1);

  const points = data
    .map((d, i) => {
      const x = i * stepX;
      const y = h - ((d.visits - min) / range) * h;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  // Area under curve
  const areaPoints = `0,${h} ${points} ${w},${h}`;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className="w-full h-12 sm:h-14"
    >
      <defs>
        <linearGradient id="visitsFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0a0a" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill="url(#visitsFill)" />
      <polyline
        points={points}
        fill="none"
        stroke="#0a0a0a"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      {data.map((d, i) => {
        if (i % 5 !== 0 && i !== data.length - 1) return null;
        const x = i * stepX;
        const y = h - ((d.visits - min) / range) * h;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={0.9}
            fill="#0a0a0a"
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
    </svg>
  );
}

export function LeadsBars() {
  const data = daily;
  const max = Math.max(...data.map((d) => d.leads));
  return (
    <div className="flex items-end gap-[2px] h-12 sm:h-14 w-full">
      {data.map((d, i) => {
        const h = (d.leads / max) * 100;
        return (
          <div
            key={i}
            className="flex-1 bg-ink/15 hover:bg-ink/40 transition-colors rounded-[1px]"
            style={{ height: `${h}%` }}
            title={`Day ${d.day}: ${d.leads} leads`}
          />
        );
      })}
    </div>
  );
}
