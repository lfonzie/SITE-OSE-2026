// Social Media Feeds (substitui Smash Balloon Instagram Feed)

export interface InstagramPost {
  id: string;
  caption: string;
  media_url: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  permalink: string;
  timestamp: string;
}

export interface FacebookPost {
  id: string;
  message: string;
  picture?: string;
  link?: string;
  created_time: string;
}

// Mock Instagram feed (replace with real API integration)
export const getInstagramFeed = async (): Promise<InstagramPost[]> => {
  // This would connect to Instagram Basic Display API
  // For now, returning mock data that represents typical school posts
  return [
    {
      id: '1',
      caption: 'Festa Junina 2025 foi um sucesso! 🎉 #ColegioOSE #FestaJunina',
      media_url: '/images/festa-junina.jpg',
      media_type: 'IMAGE',
      permalink: 'https://instagram.com/p/example1',
      timestamp: '2025-06-23T10:00:00Z'
    },
    {
      id: '2',
      caption: 'Alunos do 3º ano em visita ao laboratório de ciências 🔬 #Educacao #Ciencias',
      media_url: '/images/laboratorio.jpg',
      media_type: 'IMAGE',
      permalink: 'https://instagram.com/p/example2',
      timestamp: '2025-06-22T14:30:00Z'
    },
    {
      id: '3',
      caption: 'Projeto de leitura da Educação Infantil 📚 #Leitura #EducacaoInfantil',
      media_url: '/images/leitura.jpg',
      media_type: 'IMAGE',
      permalink: 'https://instagram.com/p/example3',
      timestamp: '2025-06-21T09:15:00Z'
    }
  ];
};

// Facebook feed integration
export const getFacebookFeed = async (): Promise<FacebookPost[]> => {
  // This would connect to Facebook Graph API
  return [
    {
      id: '1',
      message: 'Inscrições abertas para o ano letivo 2026! Venha conhecer nossa tradição centenária.',
      picture: '/images/inscricoes.jpg',
      created_time: '2025-06-23T08:00:00Z'
    },
    {
      id: '2',
      message: 'Parabéns aos nossos alunos aprovados no vestibular! 🎓',
      created_time: '2025-06-22T16:00:00Z'
    }
  ];
};

// Social media embed component
export const createSocialEmbed = (platform: 'instagram' | 'facebook', posts: InstagramPost[] | FacebookPost[]) => {
  const container = document.createElement('div');
  container.className = 'social-feed-container grid grid-cols-1 md:grid-cols-3 gap-4';

  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.className = 'bg-white rounded-lg shadow-md overflow-hidden';

    if (platform === 'instagram') {
      const igPost = post as InstagramPost;
      postElement.innerHTML = `
        <img src="${igPost.media_url}" alt="Instagram post" class="w-full h-48 object-cover">
        <div class="p-4">
          <p class="text-sm text-gray-600 mb-2">${igPost.caption}</p>
          <a href="${igPost.permalink}" target="_blank" class="text-school-orange hover:underline text-sm">
            Ver no Instagram
          </a>
        </div>
      `;
    } else {
      const fbPost = post as FacebookPost;
      postElement.innerHTML = `
        ${fbPost.picture ? `<img src="${fbPost.picture}" alt="Facebook post" class="w-full h-48 object-cover">` : ''}
        <div class="p-4">
          <p class="text-sm text-gray-600 mb-2">${fbPost.message}</p>
          <span class="text-xs text-gray-400">
            ${new Date(fbPost.created_time).toLocaleDateString('pt-BR')}
          </span>
        </div>
      `;
    }

    container.appendChild(postElement);
  });

  return container;
};