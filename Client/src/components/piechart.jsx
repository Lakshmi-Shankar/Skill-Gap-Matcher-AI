import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  PolarRadiusAxis,
} from "recharts";

const convertLevel = (level) => {
  const l = level.toLowerCase();
  if (l === "beginner") return 1;
  if (l === "intermediate") return 2;
  if (l === "advanced") return 3;
  return 0;
};

export default function SkillsRadar({ skills }) {
  if (!skills?.length) return null;

  const data = skills.map((s) => ({
    skill: s.name,
    level: convertLevel(s.level),
    fullMark: 3,
  }));

  return (
    <div className="w-full h-72 bg-white p-6 mt-6 rounded-xl border border-purple-200 shadow-sm">
      <h3 className="text-lg font-semibold mb-3 text-purple-900">
        Skill Overview
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#e9d5ff" />
          <PolarAngleAxis
            dataKey="skill"
            tick={{ fill: "#6b21a8", fontSize: 12, fontWeight: 600 }}
          />
          <PolarRadiusAxis domain={[0, 3]} tick={false} />
          <Radar
            dataKey="level"
            stroke="#a855f7"
            fill="#c084fc"
            fillOpacity={0.5}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
