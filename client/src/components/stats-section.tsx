import { Users, GraduationCap, Trophy, Medal } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "100",
    label: "Anos de Tradição",
    color: "text-school-blue",
    bgColor: "bg-school-blue/10"
  },
  {
    icon: GraduationCap,
    value: "Corpo Docente",
    label: "Experiente",
    color: "text-school-green",
    bgColor: "bg-school-green/10"
  },
  {
    icon: Trophy,
    value: "Educação",
    label: "Bilíngue",
    color: "text-yellow-600",
    bgColor: "bg-yellow-500/10"
  },
  {
    icon: Medal,
    value: "Plataforma",
    label: "Amplia",
    color: "text-purple-600",
    bgColor: "bg-purple-500/10"
  }
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className={`${stat.bgColor} rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4`}>
                  <Icon className={`text-3xl ${stat.color}`} size={32} />
                </div>
                <h3 className="text-4xl font-bold text-slate-800">{stat.value}</h3>
                <p className="text-slate-600 font-medium">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
