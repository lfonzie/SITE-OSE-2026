` tags. I will pay close attention to indentation, structure, and avoiding forbidden words.

```
<replit_final_file>
import { useEffect } from "react";
import { updateSEO } from "@/lib/seo";

export default function Dashboard() {
  useEffect(() => {
    updateSEO({
      title: "Dashboard | Colégio OSE",
      description: "Dashboard personalizado do Colégio OSE com acesso rápido a ferramentas educacionais e produtividade.",
      keywords: "dashboard, ferramentas educacionais, produtividade, colégio ose"
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <iframe
        src="/dashboard.html"
        className="w-full h-screen border-0"
        title="Dashboard OSE"
        allow="fullscreen"
        style={{ minHeight: '100vh' }}
      />
    </div>
  );
}