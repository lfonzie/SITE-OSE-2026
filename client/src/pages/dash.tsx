
import { useEffect, useState } from "react";
import { updateSEO } from "@/lib/seo";

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);
  const [searchEngine, setSearchEngine] = useState("google");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [greeting, setGreeting] = useState("");

  const PEXELS_API_KEY = 'mtYXaaUDXMCj2GlKk1WC24X8Kai6viiShTBuHciqKVzWMtB4pglYjlXg';

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

    const savedTheme = localStorage.getItem('theme') || 'light';
    setDarkMode(savedTheme === 'dark');
    
    fetchBackgroundImage();
    
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      updateGreeting(now);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const fetchBackgroundImage = async () => {
    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=landscape+nature&per_page=1&page=${Math.floor(Math.random() * 1000) + 1}`,
        { headers: { Authorization: PEXELS_API_KEY } }
      );
      const data = await response.json();
      if (data.photos && data.photos.length > 0) {
        document.body.style.backgroundImage = `url(${data.photos[0].src.large2x})`;
        localStorage.setItem('lastBackground', data.photos[0].src.large2x);
      }
    } catch (error) {
      console.error('Erro ao buscar imagem de fundo:', error);
      const lastBackground = localStorage.getItem('lastBackground');
      if (lastBackground) document.body.style.backgroundImage = `url(${lastBackground})`;
    }
  };

  const updateGreeting = (now: Date) => {
    const hour = now.getHours();
    let greetingText, emoji;
    if (hour >= 5 && hour < 12) {
      greetingText = "Bom Dia!";
      emoji = "🌞";
    } else if (hour >= 12 && hour < 18) {
      greetingText = "Boa Tarde!";
      emoji = "🌅";
    } else {
      greetingText = "Boa Noite!";
      emoji = "🌙";
    }
    setGreeting(`${emoji} ${greetingText}`);
  };

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const formatDate = (date: Date) => {
    const days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    return `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
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
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    document.body.classList.toggle('dark-theme', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => 
        alert(`Erro ao ativar tela cheia: ${err.message}`)
      );
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const filterApps = (category: string) => {
    setActiveCategory(category);
  };

  const updateSearchEngine = (engine: string) => {
    setSearchEngine(engine);
  };

  const clockStyle = getAnalogClockStyle(currentTime);

  const apps = [
    {
      name: "Gmail",
      url: "https://mail.google.com",
      icon: "https://www.gstatic.com/images/branding/product/1x/gmail_2020q4_48dp.png",
      category: "google comunicacao",
      description: "Acesse seu e-mail do Google."
    },
    {
      name: "Plurall",
      url: "https://login.plurall.net/",
      icon: "https://lh5.googleusercontent.com/proxy/u7KP9rqzT5O3QXe9f0r69hu_q3FN0SVVsOfwcBWTYueyJUobX4hUHhC1kde5UbN24Syo8RUPTJKQ9mcWGZc5Fwb_DdipIxKpUVO3ynkDwEBH2jyzm_RM5_yCfHxUsBoq9rOos4Bxg4q6gaJCZ2MrvFXop_5DZGR4Y8Y",
      category: "educacao",
      description: "Acesse a plataforma Plurall."
    },
    {
      name: "Agenda",
      url: "https://calendar.google.com",
      icon: "https://www.gstatic.com/images/branding/product/1x/calendar_2020q4_48dp.png",
      category: "google produtividade",
      description: "Veja e gerencie seus compromissos."
    },
    {
      name: "Drive",
      url: "https://drive.google.com",
      icon: "https://www.gstatic.com/images/branding/product/1x/drive_2020q4_48dp.png",
      category: "google produtividade",
      description: "Armazene e compartilhe seus arquivos."
    },
    {
      name: "Documentos",
      url: "https://docs.google.com",
      icon: "https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png",
      category: "google produtividade",
      description: "Crie e edite documentos online."
    },
    {
      name: "Planilhas",
      url: "https://sheets.google.com",
      icon: "https://www.gstatic.com/images/branding/product/1x/sheets_2020q4_48dp.png",
      category: "google produtividade",
      description: "Crie e edite planilhas."
    },
    {
      name: "Apresentações",
      url: "https://slides.google.com",
      icon: "https://www.gstatic.com/images/branding/product/1x/slides_2020q4_48dp.png",
      category: "google produtividade",
      description: "Crie e edite apresentações."
    },
    {
      name: "Chat",
      url: "https://chat.google.com",
      icon: "https://www.gstatic.com/images/branding/product/1x/chat_2020q4_48dp.png",
      category: "google comunicacao",
      description: "Converse com seus colegas."
    },
    {
      name: "Google Photos",
      url: "https://photos.google.com",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Photos_icon_%282020%29.svg/1024px-Google_Photos_icon_%282020%29.svg.png",
      category: "google produtividade",
      description: "Gerencie e visualize suas fotos."
    },
    {
      name: "Google Classroom",
      url: "https://classroom.google.com",
      icon: "https://www.gstatic.com/classroom/logo_square_rounded.svg",
      category: "google educacao",
      description: "Acesse sua sala de aula virtual."
    },
    {
      name: "Chat GPT",
      url: "https://chat.openai.com",
      icon: "https://static.vecteezy.com/system/resources/previews/022/227/364/non_2x/openai-chatgpt-logo-icon-free-png.png",
      category: "produtividade",
      description: "Converse com a IA do OpenAI."
    },
    {
      name: "Árvore Livros",
      url: "https://livros.arvore.com.br/login",
      icon: "https://www.publishnews.com.br/estaticos/uploads/2023/03/9AmLMuK0quFlLykKLcd7nA37vSF6bqDW1dgVYyy5WAGJ8xlFN8rCPwLfjHFZr1wHDcPohPFUIuIVDq72.png",
      category: "educacao",
      description: "Leia livros digitais."
    },
    {
      name: "ActiveSoft",
      url: "https://siga.activesoft.com.br/login/?instituicao=COLEGIOOSE",
      icon: "https://media.licdn.com/dms/image/D4D0BAQGIg7kezDiqwg/company-logo_200_200/0/1713208368277/activesoft_consultoria_logo?e=2147483647&v=beta&t=YCgASedrEbugqMddSAu0KtPf3JQP0esy6_Wr2ZVuG90",
      category: "educacao",
      description: "Acesse o sistema ActiveSoft."
    },
    {
      name: "Agenda Edu",
      url: "https://www.agendaedu.com/",
      icon: "https://play-lh.googleusercontent.com/Yzn09HuAQJsbnYPsAgrzOO3sP0odyxKgCiY4ksWIfsQ3hj3T-wHCCvKEOpzzsveD9-f1",
      category: "educacao comunicacao",
      description: "Gerencie sua agenda escolar."
    },
    {
      name: "Canva",
      url: "https://www.canva.com",
      icon: "https://logodownload.org/wp-content/uploads/2020/11/canva-logo-000.png",
      category: "produtividade",
      description: "Crie designs e gráficos."
    },
    {
      name: "WhatsApp Web",
      url: "https://web.whatsapp.com",
      icon: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
      category: "comunicacao",
      description: "Acesse o WhatsApp no seu navegador."
    },
    {
      name: "Notion",
      url: "https://www.notion.so",
      icon: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
      category: "produtividade",
      description: "Organize suas notas e projetos."
    },
    {
      name: "Trello",
      url: "https://trello.com",
      icon: "https://cdn.worldvectorlogo.com/logos/trello.svg",
      category: "produtividade",
      description: "Gerencie seus projetos com Kanban."
    },
    {
      name: "Google Meet",
      url: "https://meet.google.com",
      icon: "https://cdn4.iconfinder.com/data/icons/logos-brands-in-colors/48/google-meet-512.png",
      category: "comunicacao",
      description: "Faça reuniões por vídeo."
    },
    {
      name: "MindMeister",
      url: "https://www.mindmeister.com",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9duX9dntnSWmrJ0iu7dHxlqKVART12L3E5Q&s",
      category: "produtividade",
      description: "Crie mapas mentais colaborativos."
    },
    {
      name: "Grok",
      url: "https://xai.com/grok",
      icon: "https://play-lh.googleusercontent.com/dQRKhi30KpzG3gww3TdVLzyIAVuOAWylnAcgnEUxqfpm2A8dEt2sgApVvtKAy-DO8aI=w240-h480-rw",
      category: "produtividade",
      description: "Interaja com a IA da xAI."
    }
  ];

  const categories = [
    { id: "all", name: "Todos" },
    { id: "google", name: "Google" },
    { id: "educacao", name: "Educação" },
    { id: "produtividade", name: "Produtividade" },
    { id: "comunicacao", name: "Comunicação" }
  ];

  const filteredApps = apps.filter(app => 
    activeCategory === "all" || app.category.split(' ').includes(activeCategory)
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          :root {
            --primary-accent: #ff8c00;
            --primary-dark: #ff6500;
            --text-color: #4d2600;
            --background: rgba(255, 255, 255, 0.95);
            --border-gray: #ddd;
            --shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            --dark-background: rgba(30, 30, 30, 0.95);
            --dark-text: #ff8c00;
            --bege-claro: #f5f5dc;
            --marrom-escuro: #8b4513;
            --glass-bg: rgba(255, 255, 255, 0.1);
            --glass-border: rgba(255, 255, 255, 0.2);
          }

          body {
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            color: var(--text-color);
            min-height: 100vh;
            position: relative;
            overflow-x: hidden;
            font-family: 'Roboto', sans-serif;
          }

          body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3));
            backdrop-filter: blur(2px);
            z-index: -1;
          }

          .dashboard-container {
            max-width: 1600px;
            margin: 20px auto;
            padding: 20px;
            background: var(--background);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            box-shadow: var(--shadow);
            border: 1px solid var(--glass-border);
          }

          .top-section {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
            gap: 20px;
          }

          .weather-widget, .clock-section, .search-form {
            background: var(--background);
            backdrop-filter: blur(10px);
            padding: 20px;
            border-radius: 12px;
            box-shadow: var(--shadow);
            border: 1px solid var(--glass-border);
            flex: 1;
          }

          .clock-section {
            text-align: center;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 20px;
          }

          .analog-clock {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: var(--background);
            position: relative;
            box-shadow: var(--shadow);
            border: 1px solid var(--glass-border);
          }

          .hand {
            position: absolute;
            bottom: 50%;
            left: 50%;
            transform-origin: bottom;
            background: var(--primary-accent);
            border-radius: 2px;
          }

          .hour-hand {
            width: 4px;
            height: 40px;
            transform: translateX(-50%);
          }

          .minute-hand {
            width: 3px;
            height: 50px;
            transform: translateX(-50%);
          }

          .second-hand {
            width: 2px;
            height: 55px;
            background: var(--primary-dark);
            transform: translateX(-50%);
          }

          .clock-marks {
            position: absolute;
            width: 100%;
            height: 100%;
          }

          .mark {
            position: absolute;
            width: 2px;
            height: 8px;
            background: var(--text-color);
            top: 5px;
            left: 50%;
            transform-origin: center 55px;
          }

          .mark:nth-child(3n) {
            height: 12px;
            width: 3px;
            background: var(--primary-accent);
          }

          .greeting {
            font-size: 24px;
            margin-bottom: 12px;
            font-weight: 500;
          }

          .clock {
            font-size: 30px;
            font-weight: 700;
            background: linear-gradient(135deg, var(--primary-accent), var(--primary-dark));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .date {
            font-size: 18px;
            opacity: 0.8;
          }

          .search-form form {
            display: flex;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }

          .search-form input[type="text"] {
            flex-grow: 1;
            padding: 12px 16px;
            border: none;
            font-size: 14px;
            outline: none;
            background: rgba(255, 255, 255, 0.9);
          }

          .search-form input[type="submit"] {
            padding: 12px 24px;
            background: linear-gradient(135deg, var(--primary-accent), var(--primary-dark));
            color: white;
            border: none;
            cursor: pointer;
            transition: var(--transition);
            font-weight: 500;
          }

          .search-form input[type="submit"]:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(255, 140, 0, 0.3);
          }

          .search-options {
            margin-top: 12px;
            display: flex;
            gap: 12px;
            justify-content: center;
            flex-wrap: wrap;
          }

          .search-options button {
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            border: 1px solid var(--glass-border);
            color: var(--primary-accent);
            font-size: 12px;
            cursor: pointer;
            transition: var(--transition);
            padding: 6px 12px;
            border-radius: 20px;
            font-weight: 500;
          }

          .search-options button:hover {
            background: var(--primary-accent);
            color: white;
            transform: translateY(-2px);
          }

          .controls {
            display: flex;
            justify-content: center;
            gap: 12px;
            margin-bottom: 24px;
          }

          .control-btn {
            background: var(--background);
            backdrop-filter: blur(10px);
            border: 1px solid var(--glass-border);
            border-radius: 50%;
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: var(--shadow);
            transition: var(--transition);
          }

          .control-btn:hover {
            background: var(--primary-accent);
            color: white;
            transform: translateY(-2px) scale(1.1);
            box-shadow: 0 8px 20px rgba(255, 140, 0, 0.3);
          }

          .app-categories {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 12px;
            margin-bottom: 24px;
          }

          .category-btn {
            padding: 10px 20px;
            background: var(--background);
            backdrop-filter: blur(10px);
            border: 1px solid var(--glass-border);
            border-radius: 25px;
            cursor: pointer;
            font-size: 14px;
            transition: var(--transition);
            font-weight: 500;
          }

          .category-btn:hover, .category-btn.active {
            background: linear-gradient(135deg, var(--primary-accent), var(--primary-dark));
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(255, 140, 0, 0.3);
          }

          .apps {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            gap: 16px;
            margin-bottom: 20px;
          }

          .app {
            background: var(--background);
            backdrop-filter: blur(10px);
            border: 2px solid transparent;
            border-radius: 16px;
            padding: 16px;
            text-align: center;
            transition: var(--transition);
            position: relative;
            overflow: hidden;
            cursor: pointer;
          }

          .app::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, var(--primary-accent), var(--primary-dark));
            opacity: 0;
            transition: var(--transition);
            z-index: -1;
          }

          .app:hover {
            transform: translateY(-4px) scale(1.02);
            border-color: var(--primary-accent);
            box-shadow: 0 12px 30px rgba(255, 140, 0, 0.2);
          }

          .app:hover::before {
            opacity: 0.1;
          }

          .app a {
            text-decoration: none;
            color: var(--text-color);
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            z-index: 1;
          }

          .app img {
            width: 56px;
            height: 56px;
            margin-bottom: 12px;
            border-radius: 12px;
            transition: var(--transition);
          }

          .app:hover img {
            transform: scale(1.1);
          }

          .app span {
            font-size: 13px;
            font-weight: 600;
          }

          .app .description {
            opacity: 0;
            font-size: 11px;
            color: #fff;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            padding: 6px 10px;
            border-radius: 8px;
            position: absolute;
            bottom: 8px;
            left: 8px;
            right: 8px;
            transition: var(--transition);
            transform: translateY(10px);
          }

          .app:hover .description {
            opacity: 1;
            transform: translateY(0);
          }

          .theme-toggle {
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--background);
            backdrop-filter: blur(10px);
            border: 1px solid var(--glass-border);
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: var(--shadow);
            transition: var(--transition);
            z-index: 1000;
          }

          .theme-toggle:hover {
            background: var(--primary-accent);
            color: white;
            transform: scale(1.1);
            box-shadow: 0 8px 20px rgba(255, 140, 0, 0.3);
          }

          .dark-theme {
            --background: var(--dark-background);
            --text-color: var(--dark-text);
            --glass-bg: rgba(255, 255, 255, 0.05);
            --glass-border: rgba(255, 255, 255, 0.1);
          }

          .logo-container {
            text-align: center;
            margin-bottom: 24px;
          }

          .logo-container img {
            max-width: 100px;
            border-radius: 50%;
            box-shadow: var(--shadow);
            transition: var(--transition);
          }

          .logo-container img:hover {
            transform: scale(1.1);
          }

          @media (max-width: 768px) {
            .top-section {
              flex-direction: column;
              gap: 16px;
            }

            .weather-widget, .clock-section, .search-form {
              width: 100%;
            }

            .clock {
              font-size: 48px;
            }

            .greeting {
              font-size: 20px;
            }

            .date {
              font-size: 16px;
            }

            .apps {
              grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
              gap: 12px;
            }

            .dashboard-container {
              margin: 10px;
              padding: 16px;
            }

            .control-btn {
              width: 44px;
              height: 44px;
            }

            .analog-clock {
              width: 100px;
              height: 100px;
            }

            .hour-hand {
              height: 35px;
            }

            .minute-hand {
              height: 45px;
            }

            .second-hand {
              height: 50px;
            }
          }

          @media (max-width: 480px) {
            .apps {
              grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
            }
            
            .clock {
              font-size: 36px;
            }

            .analog-clock {
              width: 80px;
              height: 80px;
            }

            .hour-hand {
              height: 30px;
            }

            .minute-hand {
              height: 40px;
            }

            .second-hand {
              height: 45px;
            }
          }
        `
      }} />

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <button 
        className="theme-toggle" 
        onClick={toggleTheme}
        aria-label="Alternar tema"
      >
        <i className={darkMode ? "fas fa-sun" : "fas fa-moon"}></i>
      </button>

      <div className="dashboard-container">
        <div className="logo-container">
          <img 
            className="logo" 
            src="https://img.imageboss.me/me/cover:center/64x64/dpr:2/20220119193113279.png" 
            alt="Logo OSE"
          />
        </div>

        <div className="top-section">
          <div className="weather-widget">
            <div 
              className="tomorrow"
              data-location-id="014811"
              data-language="PT"
              data-unit-system="METRIC"
              data-skin={darkMode ? "dark" : "light"}
              data-widget-type="aqiMini"
              style={{ paddingBottom: "22px", position: "relative" }}
            ></div>
          </div>

          <div className="clock-section">
            <div className="analog-clock" role="timer" aria-label="Relógio analógico">
              <div className="clock-marks">
                {Array.from({ length: 12 }, (_, i) => (
                  <div 
                    key={i}
                    className="mark" 
                    style={{ transform: `rotate(${i * 30}deg)` }}
                  ></div>
                ))}
              </div>
              <div 
                className="hand hour-hand" 
                style={{ transform: `translateX(-50%) rotate(${clockStyle.hour}deg)` }}
              ></div>
              <div 
                className="hand minute-hand" 
                style={{ transform: `translateX(-50%) rotate(${clockStyle.minute}deg)` }}
              ></div>
              <div 
                className="hand second-hand" 
                style={{ transform: `translateX(-50%) rotate(${clockStyle.second}deg)` }}
              ></div>
            </div>
            <div className="digital-clock-container">
              <div className="greeting" role="banner">{greeting}</div>
              <div className="clock" role="timer">{formatTime(currentTime)}</div>
              <div className="date">{formatDate(currentTime)}</div>
            </div>
          </div>

          <div className="search-form">
            <form onSubmit={handleSearch} role="search">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchEngines[searchEngine as keyof typeof searchEngines].placeholder}
                aria-label="Campo de pesquisa"
              />
              <input type="submit" value="Buscar" aria-label="Executar pesquisa" />
            </form>
            <div className="search-options" role="group" aria-label="Opções de pesquisa">
              <button type="button" onClick={() => updateSearchEngine('google')}>Google</button>
              <button type="button" onClick={() => updateSearchEngine('youtube')}>YouTube</button>
              <button type="button" onClick={() => updateSearchEngine('wikipedia')}>Wikipedia</button>
              <button type="button" onClick={() => updateSearchEngine('translate')}>Tradutor</button>
            </div>
          </div>
        </div>

        <div className="controls" role="toolbar" aria-label="Controles do dashboard">
          <button 
            className="control-btn" 
            onClick={fetchBackgroundImage}
            title="Atualizar plano de fundo" 
            aria-label="Atualizar plano de fundo"
          >
            <i className="fas fa-sync-alt"></i>
          </button>
          <button 
            className="control-btn" 
            onClick={toggleFullscreen}
            title="Modo tela cheia" 
            aria-label="Alternar tela cheia"
          >
            <i className="fas fa-expand"></i>
          </button>
        </div>

        <div className="app-categories" role="tablist" aria-label="Categorias de aplicativos">
          {categories.map((category) => (
            <button 
              key={category.id}
              className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => filterApps(category.id)}
              role="tab" 
              aria-selected={activeCategory === category.id}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="apps" role="main" aria-label="Aplicativos disponíveis">
          {filteredApps.map((app, index) => (
            <div key={index} className="app" data-category={app.category}>
              <a 
                href={app.url} 
                target="_blank" 
                rel="noopener" 
                aria-label={app.description}
              >
                <img src={app.icon} alt={app.name} loading="lazy" />
                <span>{app.name}</span>
                <div className="description">{app.description}</div>
              </a>
            </div>
          ))}
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          (function(d, s, id) {
            if (d.getElementById(id)) {
              if (window.__TOMORROW__) {
                window.__TOMORROW__.renderWidget();
              }
              return;
            }
            const fjs = d.getElementsByTagName(s)[0];
            const js = d.createElement(s);
            js.id = id;
            js.src = "https://www.tomorrow.io/v1/widget/sdk/sdk.bundle.min.js";
            fjs.parentNode.insertBefore(js, fjs);
          })(document, 'script', 'tomorrow-sdk');
        `
      }} />
    </>
  );
}
