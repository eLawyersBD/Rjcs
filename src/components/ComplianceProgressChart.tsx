import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export const ComplianceProgressChart: React.FC<{ percentage: number }> = ({ percentage }) => {
  const data = [
    { name: 'Completed', value: percentage },
    { name: 'Remaining', value: 100 - percentage },
  ];
  const COLORS = ['#10b981', '#1e293b']; // emerald-500, slate-800

  return (
    <div className="h-32 w-32 relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={50}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold text-white font-mono">{percentage}%</span>
      </div>
    </div>
  );
};
