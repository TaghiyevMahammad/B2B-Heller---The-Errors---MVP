
import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, PolarRadiusAxis } from 'recharts';
import { Skill } from '../types';

interface SkillChartProps {
  skills: Skill[];
}

const SkillChart: React.FC<SkillChartProps> = ({ skills }) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={skills} outerRadius="80%">
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} />
          <Radar
            name="Skills"
            dataKey="value"
            stroke="#4f46e5"
            fill="#4f46e5"
            fillOpacity={0.5}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillChart;
