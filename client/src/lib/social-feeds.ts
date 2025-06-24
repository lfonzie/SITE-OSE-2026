
export interface InstagramPost {
  id: string;
  caption: string;
  media_url: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  permalink: string;
  timestamp: string;
  thumbnail_url?: string;
}

// Simulação de posts do Instagram do Colégio OSE
const mockInstagramPosts: InstagramPost[] = [
  {
    id: "1",
    caption: "🏆 Nossos alunos brilhando nos Jogos Escolares de Sorocaba! Muito orgulho dessa dedicação! #OSE100Anos #JogosEscolares #Sorocaba",
    media_url: "/attached_assets/0581_1750717790206.jpg",
    media_type: "IMAGE",
    permalink: "https://instagram.com/p/example1",
    timestamp: "2025-01-24T10:00:00Z"
  },
  {
    id: "2", 
    caption: "📚 Biblioteca renovada! Espaço moderno para incentivar ainda mais o amor pela leitura. #BibliotecaOSE #Educação #Leitura",
    media_url: "/attached_assets/1068_1750717790205.jpg",
    media_type: "IMAGE",
    permalink: "https://instagram.com/p/example2",
    timestamp: "2025-01-23T14:30:00Z"
  },
  {
    id: "3",
    caption: "🎨 Arte e criatividade em cada projeto! Nossos pequenos artistas da Educação Infantil surpreendem sempre! #ArteOSE #EducaçãoInfantil",
    media_url: "/attached_assets/0378_1750717790208.jpg", 
    media_type: "IMAGE",
    permalink: "https://instagram.com/p/example3",
    timestamp: "2025-01-22T16:15:00Z"
  },
  {
    id: "4",
    caption: "🏫 Nossa fachada histórica que conta 100 anos de tradição educacional em Sorocaba! #OSETradição #100Anos #Sorocaba",
    media_url: "/attached_assets/1295_1750717790207.jpg",
    media_type: "IMAGE", 
    permalink: "https://instagram.com/p/example4",
    timestamp: "2025-01-21T09:00:00Z"
  },
  {
    id: "5",
    caption: "⚽ Esporte e educação caminhando juntos! Time de futebol OSE em ação! #EsporteOSE #FutebolEscolar #VidaSaudável",
    media_url: "/attached_assets/0700_1750717790204.jpg",
    media_type: "IMAGE",
    permalink: "https://instagram.com/p/example5", 
    timestamp: "2025-01-20T11:45:00Z"
  },
  {
    id: "6",
    caption: "🎓 Formatura do Ensino Médio 2024! Momento especial para nossas famílias OSE! #Formatura2024 #EnsinoMédio #OSEFamília",
    media_url: "/attached_assets/0905_1750717790206.jpg",
    media_type: "IMAGE",
    permalink: "https://instagram.com/p/example6",
    timestamp: "2025-01-19T19:00:00Z"
  },
  {
    id: "7",
    caption: "🔬 Laboratório de Ciências: onde a curiosidade vira descoberta! #CiênciasOSE #LaboratórioEscolar #Aprendizado",
    media_url: "/attached_assets/1105_1750717790206.jpg",
    media_type: "IMAGE",
    permalink: "https://instagram.com/p/example7",
    timestamp: "2025-01-18T13:20:00Z"
  },
  {
    id: "8",
    caption: "🎪 Festa Junina OSE 2024! Tradição, diversão e união da nossa comunidade escolar! #FestaJuninaOSE #Tradição #ComunidadeOSE",
    media_url: "/attached_assets/0541_1750717790207.jpg",
    media_type: "IMAGE",
    permalink: "https://instagram.com/p/example8",
    timestamp: "2025-01-17T17:30:00Z"
  }
];

// Função para buscar feed do Instagram (simulada)
export const getInstagramFeed = async (): Promise<InstagramPost[]> => {
  // Em produção, aqui seria feita a chamada para a API do Instagram
  // Por enquanto, retornamos posts simulados com as imagens disponíveis
  
  try {
    // Simula delay de API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Retorna os posts ordenados por data (mais recentes primeiro)
    return mockInstagramPosts.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  } catch (error) {
    console.error('Erro ao buscar feed do Instagram:', error);
    return [];
  }
};

// Função para configurar Instagram Basic Display API (para implementação futura)
export const setupInstagramAPI = () => {
  const config = {
    appId: process.env.REACT_APP_INSTAGRAM_APP_ID,
    appSecret: process.env.REACT_APP_INSTAGRAM_APP_SECRET,
    redirectUri: `${window.location.origin}/auth/instagram/callback`,
    scope: 'user_profile,user_media'
  };
  
  return config;
};

// Função para processar e otimizar posts do Instagram
export const processInstagramPosts = (posts: InstagramPost[]) => {
  return posts.map(post => ({
    ...post,
    caption: post.caption.length > 150 ? 
      post.caption.substring(0, 150) + '...' : 
      post.caption,
    formattedDate: new Date(post.timestamp).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }));
};
