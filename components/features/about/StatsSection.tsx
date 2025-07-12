interface Stat {
  number: string;
  label: string;
}

interface StatsSectionProps {
  stats: Stat[];
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="py-12 bg-gradient-to-r from-green-500 to-blue-600">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white">
              <div className="text-2xl md:text-3xl font-bold mb-1">{stat.number}</div>
              <div className="text-green-100 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 