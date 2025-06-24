
import { useEffect, useState } from "react";
import Navigation from "@/components/navigation";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { 
  RefreshCw, 
  Maximize, 
  Moon, 
  Sun, 
  Search,
  Mail,
  Calendar,
  HardDrive,
  FileText,
  Grid3X3,
  Presentation,
  MessageCircle,
  Camera,
  GraduationCap,
  MessageSquare,
  Palette,
  Phone,
  StickyNote,
  Trello,
  Video,
  Brain,
  Sparkles
} from "lucide-react";

interface App {
  name: string;
  url: string;
  icon: React.ReactNode;
  category: string;
  description: string;
}

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);
  const [searchEngine, setSearchEngine] = useState("google");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [greeting, setGreeting] = useState("");

  const apps: App[] = [
    {
      name: "Gmail",
      url: "https://mail.google.com",
      icon: <Mail className="w-8 h-8" />,
      category: "google comunicacao",
      description: "Acesse seu e-mail do Google"
    },
    {
      name: "Plurall",
      url: "https://login.plurall.net/",
      icon: <GraduationCap className="w-8 h-8" />,
      category: "educacao",
      description: "Acesse a plataforma Plurall"
    },
    {
      name: "Agenda",
      url: "https://calendar.google.com",
      icon: <Calendar className="w-8 h-8" />,
      category: "google produtividade",
      description: "Veja e gerencie seus compromissos"
    },
    {
      name: "Drive",
      url: "https://drive.google.com",
      icon: <HardDrive className="w-8 h-8" />,
      category: "google produtividade",
      description: "Armazene e compartilhe seus arquivos"
    },
    {
      name: "Documentos",
      url: "https://docs.google.com",
      icon: <FileText className="w-8 h-8" />,
      category: "google produtividade",
      description: "Crie e edite documentos online"
    },
    {
      name: "Planilhas",
      url: "https://sheets.google.com",
      icon: <Grid3X3 className="w-8 h-8" />,
      category: "google produtividade",
      description: "Crie e edite planilhas"
    },
    {
      name: "Apresentações",
      url: "https://slides.google.com",
      icon: <Presentation className="w-8 h-8" />,
      category: "google produtividade",
      description: "Crie e edite apresentações"
    },
    {
      name: "Chat",
      url: "https://chat.google.com",
      icon: <MessageCircle className="w-8 h-8" />,
      category: "google comunicacao",
      description: "Converse com seus colegas"
    },
    {
      name: "Google Photos",
      url: "https://photos.google.com",
      icon: <Camera className="w-8 h-8" />,
      category: "google produtividade",
      description: "Gerencie e visualize suas fotos"
    },
    {
      name: "Google Classroom",
      url: "https://classroom.google.com",
      icon: <GraduationCap className="w-8 h-8" />,
      category: "google educacao",
      description: "Acesse sua sala de aula virtual"
    },
    {
      name: "Chat GPT",
      url: "https://chat.openai.com",
      icon: <Brain className="w-8 h-8" />,
      category: "produtividade",
      description: "Converse com a IA do OpenAI"
    },
    {
      name: "Árvore Livros",
      url: "https://livros.arvore.com.br/login",
      icon: <GraduationCap className="w-8 h-8" />,
      category: "educacao",
      description: "Leia livros digitais"
    },
    {
      name: "ActiveSoft",
      url: "https://siga03.activesoft.com.br/login/?instituicao=COLEGIOOSE",
      icon: <GraduationCap className="w-8 h-8" />,
      category: "educacao",
      description: "Acesse o sistema ActiveSoft"
    },
    {
      name: "Agenda Edu",
      url: "https://www.agendaedu.com/",
      icon: <Calendar className="w-8 h-8" />,
      category: "educacao comunicacao",
      description: "Gerencie sua agenda escolar"
    },
    {
      name: "Canva",
      url: "https://www.canva.com",
      icon: <Palette className="w-8 h-8" />,
      category: "produtividade",
      description: "Crie designs e gráficos"
    },
    {
      name: "WhatsApp Web",
      url: "https://web.whatsapp.com",
      icon: <Phone className="w-8 h-8" />,
      category: "comunicacao",
      description: "Acesse o WhatsApp no seu navegador"
    },
    {
      name: "Notion",
      url: "https://www.notion.so",
      icon: <StickyNote className="w-8 h-8" />,
      category: "produtividade",
      description: "Organize suas notas e projetos"
    },
    {
      name: "Trello",
      url: "https://trello.com",
      icon: <Trello className="w-8 h-8" />,
      category: "produtividade",
      description: "Gerencie seus projetos com Kanban"
    },
    {
      name: "Google Meet",
      url: "https://meet.google.com",
      icon: <Video className="w-8 h-8" />,
      category: "comunicacao",
      description: "Faça reuniões por vídeo"
    },
    {
      name: "Grok",
      url: "https://xai.com/grok",
      icon: <Sparkles className="w-8 h-8" />,
      category: "produtividade",
      description: "Interaja com a IA da xAI"
    }
  ];

  const categories = [
    { id: "all", name: "Todos" },
    { id: "google", name: "Google" },
    { id: "educacao", name: "Educação" },
    { id: "produtividade", name: "Produtividade" },
    { id: "comunicacao", name: "Comunicação" }
  ];

  const searchEngines = {
    google: { url: "https://www.google.com/search", param: "q", placeholder: "Pesquisa no Google" },
    youtube: { url: "https://www.youtube.com/results", param: "search_query", placeholder: "Pesquisa no YouTube" },
    wikipedia: { url: "https://pt.wikipedia.org/wiki/Special:Search", param: "search", placeholder: "Pesquisa na Wikipedia" },
    translate: { url: "https://translate.google.com/", param: "text", placeholder: "Traduzir texto" }
  };

  useEffect(() => {
    updateSEO({
      title: "Dashboard | Colégio OSE",
      description: "Dashboard personalizado do Colégio OSE com acesso rápido a ferramentas educacionais e produtividade.",
      keywords: "dashboard, ferramentas educacionais, produtividade, colégio ose"
    });

    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    updateGreeting();
    const savedTheme = localStorage.getItem('dashboard-theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }

    return () => clearInterval(interval);
  }, []);

  const updateGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("🌞 Bom Dia!");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("🌅 Boa Tarde!");
    } else {
      setGreeting("🌙 Boa Noite!");
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getAnalogClockStyle = (date: Date) => {
    const hours = date.getHours() % 12;
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return {
      hour: (hours + minutes / 60) * 30,
      minute: (minutes + seconds / 60) * 6,
      second: seconds * 6
    };
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const engine = searchEngines[searchEngine as keyof typeof searchEngines];
      const url = `${engine.url}?${engine.param}=${encodeURIComponent(searchQuery)}`;
      window.open(url, '_blank');
      setSearchQuery("");
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('dashboard-theme', !darkMode ? 'dark' : 'light');
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const filteredApps = apps.filter(app => 
    activeCategory === "all" || app.category.split(' ').includes(activeCategory)
  );

  const clockStyle = getAnalogClockStyle(currentTime);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">
        <Navigation />
        
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="fixed top-20 right-4 z-50 p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="max-w-7xl mx-auto p-4 pt-24">
          {/* Logo */}
          <div className="text-center mb-8">
            <img 
              src="/images/logo-ose.png" 
              alt="Logo OSE" 
              className="w-20 h-20 mx-auto rounded-full shadow-lg"
            />
          </div>

          {/* Top Section */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Weather Widget */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-white">Clima</h3>
              <div className="text-center text-slate-600 dark:text-slate-300">
                Widget do tempo indisponível
              </div>
            </div>

            {/* Clock Section */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-center gap-6">
                {/* Analog Clock */}
                <div className="relative w-24 h-24 bg-white dark:bg-slate-700 rounded-full shadow-lg">
                  {/* Clock marks */}
                  {Array.from({ length: 12 }, (_, i) => (
                    <div
                      key={i}
                      className="absolute w-0.5 h-4 bg-slate-400 dark:bg-slate-500"
                      style={{
                        top: '4px',
                        left: '50%',
                        transformOrigin: 'center 44px',
                        transform: `translateX(-50%) rotate(${i * 30}deg)`
                      }}
                    />
                  ))}
                  
                  {/* Hour hand */}
                  <div
                    className="absolute w-1 h-6 bg-slate-800 dark:bg-white rounded-full"
                    style={{
                      bottom: '50%',
                      left: '50%',
                      transformOrigin: 'bottom',
                      transform: `translateX(-50%) rotate(${clockStyle.hour}deg)`
                    }}
                  />
                  
                  {/* Minute hand */}
                  <div
                    className="absolute w-0.5 h-8 bg-slate-600 dark:bg-slate-300 rounded-full"
                    style={{
                      bottom: '50%',
                      left: '50%',
                      transformOrigin: 'bottom',
                      transform: `translateX(-50%) rotate(${clockStyle.minute}deg)`
                    }}
                  />
                  
                  {/* Second hand */}
                  <div
                    className="absolute w-0.5 h-9 bg-school-orange rounded-full"
                    style={{
                      bottom: '50%',
                      left: '50%',
                      transformOrigin: 'bottom',
                      transform: `translateX(-50%) rotate(${clockStyle.second}deg)`
                    }}
                  />
                  
                  {/* Center dot */}
                  <div className="absolute w-2 h-2 bg-school-orange rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>

                {/* Digital Clock */}
                <div className="text-center">
                  <div className="text-sm text-slate-600 dark:text-slate-300 mb-2">{greeting}</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-school-orange to-school-brown bg-clip-text text-transparent">
                    {formatTime(currentTime)}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                    {formatDate(currentTime)}
                  </div>
                </div>
              </div>
            </div>

            {/* Search Form */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
              <form onSubmit={handleSearch} className="mb-4">
                <div className="flex rounded-lg overflow-hidden shadow-md">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={searchEngines[searchEngine as keyof typeof searchEngines].placeholder}
                    className="flex-1 px-4 py-3 text-sm outline-none bg-white dark:bg-slate-700 dark:text-white"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-school-orange to-school-brown text-white hover:shadow-lg transition-all"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </form>
              
              <div className="flex gap-2 justify-center flex-wrap">
                {Object.entries(searchEngines).map(([key, engine]) => (
                  <button
                    key={key}
                    onClick={() => setSearchEngine(key)}
                    className={`px-3 py-1 text-xs rounded-full transition-all ${
                      searchEngine === key
                        ? 'bg-school-orange text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-school-orange hover:text-white'
                    }`}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => window.location.reload()}
              className="p-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all"
              title="Atualizar página"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all"
              title="Modo tela cheia"
            >
              <Maximize className="w-5 h-5" />
            </button>
          </div>

          {/* Categories */}
          <div className="flex justify-center gap-3 mb-8 flex-wrap">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-school-orange to-school-brown text-white shadow-lg'
                    : 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg text-slate-600 dark:text-slate-300 hover:bg-school-orange hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Apps Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {filteredApps.map((app, index) => (
              <div
                key={index}
                className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-4 shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
                onClick={() => window.open(app.url, '_blank')}
              >
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center text-school-orange group-hover:scale-110 transition-transform">
                    {app.icon}
                  </div>
                  <h3 className="text-sm font-medium text-slate-800 dark:text-white mb-2 line-clamp-1">
                    {app.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity line-clamp-2">
                    {app.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
