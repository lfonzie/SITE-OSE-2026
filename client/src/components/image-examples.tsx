// EXEMPLOS PRÁTICOS PARA USAR SUAS IMAGENS

import img1 from "@assets/0354_1750717790205.jpg";
import img2 from "@assets/1068_1750717790205.jpg";
import img3 from "@assets/0312_1750717790204.jpg";

// 1. EXEMPLO BÁSICO - Card com Imagem
export function CardEscola() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-sm">
      <img 
        src={img1}
        alt="Atividades na OSE"
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-2">
          Ensino de Qualidade
        </h3>
        <p className="text-slate-600">
          Metodologias modernas para formar cidadãos preparados para o futuro.
        </p>
      </div>
    </div>
  );
}

// 2. GALERIA SIMPLES
export function MiniGaleria() {
  const fotos = [
    { src: img1, titulo: "Atividades Pedagógicas" },
    { src: img2, titulo: "Convivência Escolar" },
    { src: img3, titulo: "Espaços de Aprendizagem" }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {fotos.map((foto, index) => (
        <div key={index} className="text-center">
          <img 
            src={foto.src}
            alt={foto.titulo}
            className="w-full h-40 object-cover rounded-lg shadow-md mb-3"
          />
          <h4 className="font-semibold text-slate-700">{foto.titulo}</h4>
        </div>
      ))}
    </div>
  );
}

// 3. HERO COM IMAGEM DE FUNDO
export function HeroImagem() {
  return (
    <div 
      className="h-96 bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${img1})`
      }}
    >
      <div className="text-center text-white">
        <h2 className="text-4xl font-bold mb-4">A OSE te espera!</h2>
        <p className="text-lg">Descubra nossa tradição em educação</p>
      </div>
    </div>
  );
}

// 4. IMAGEM COM HOVER EFFECT
export function ImagemHover() {
  return (
    <div className="relative group cursor-pointer overflow-hidden rounded-lg">
      <img 
        src={img2}
        alt="Estudantes OSE"
        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <h3 className="text-white text-xl font-bold">Vida Estudantil</h3>
      </div>
    </div>
  );
}