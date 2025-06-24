# Guia: Como Incluir Imagens no Projeto OSE

## 1. Métodos Disponíveis

### **Método 1: Pasta `attached_assets` (Recomendado para imagens do projeto)**
```jsx
// Exemplo de uso
import imagemPath from "@assets/foto-escola.jpg";

function ComponenteExemplo() {
  return (
    <img 
      src={imagemPath} 
      alt="Foto da escola OSE" 
      className="w-full h-64 object-cover rounded-lg"
    />
  );
}
```

### **Método 2: Pasta `client/src/assets/` (Para imagens do código)**
```jsx
// Coloque imagens em: client/src/assets/images/
import logoOSE from "@/assets/images/logo-ose.png";

function Header() {
  return (
    <img 
      src={logoOSE} 
      alt="Logo OSE" 
      className="h-12 w-auto"
    />
  );
}
```

### **Método 3: URLs Externas (Para imagens hospedadas online)**
```jsx
function ImagemExterna() {
  return (
    <img 
      src="https://colegioose.com.br/wp-content/uploads/2024/06/ose100-800x400.png"
      alt="Logo OSE 100 anos"
      className="h-16 w-auto"
    />
  );
}
```

### **Método 4: Pasta `public/` (Para imagens estáticas)**
```jsx
// Coloque em: public/images/
function ImagemPublica() {
  return (
    <img 
      src="/images/foto-campus.jpg"
      alt="Campus da OSE"
      className="w-full h-80 object-cover"
    />
  );
}
```

## 2. Usando as Imagens que Já Existem

Você já tem várias imagens na pasta `attached_assets`. Exemplos de uso:

```jsx
// Para usar uma das imagens existentes
import fotoAlunos from "@assets/0354_1750717790205.jpg";

function GaleriaFotos() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <img 
        src={fotoAlunos}
        alt="Alunos da OSE"
        className="w-full h-48 object-cover rounded-lg shadow-lg"
      />
    </div>
  );
}
```

## 3. Componente de Imagem Otimizada

```jsx
// client/src/components/ui/optimized-image.tsx
import { useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
}

export function OptimizedImage({ 
  src, 
  alt, 
  className, 
  fallback = "/images/placeholder.jpg" 
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        src={imageError ? fallback : src}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={() => setIsLoaded(true)}
        onError={() => setImageError(true)}
      />
    </div>
  );
}
```

## 4. Galeria de Imagens Responsiva

```jsx
// Exemplo de galeria usando suas imagens
import img1 from "@assets/0354_1750717790205.jpg";
import img2 from "@assets/1068_1750717790205.jpg";
import img3 from "@assets/0312_1750717790204.jpg";

function GaleriaOSE() {
  const imagens = [
    { src: img1, alt: "Atividades educacionais" },
    { src: img2, alt: "Espaços de aprendizagem" },
    { src: img3, alt: "Vida escolar" }
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Galeria de Fotos
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {imagens.map((img, index) => (
            <div key={index} className="group cursor-pointer">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-64 object-cover rounded-lg shadow-lg 
                         group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

## 5. Background Images com CSS

```jsx
// Para imagens de fundo
function HeroComBackground() {
  return (
    <section 
      className="h-96 bg-cover bg-center relative"
      style={{
        backgroundImage: 'url("/images/campus-ose.jpg")'
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-white text-4xl font-bold">
          Bem-vindos à OSE
        </h1>
      </div>
    </section>
  );
}
```

## 6. Otimização de Performance

```jsx
// Lazy loading para imagens
function ImagemLazy({ src, alt, className }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy" // Carregamento sob demanda
      decoding="async" // Decodificação assíncrona
    />
  );
}
```

## 7. Dicas Importantes

- **Formato**: Use JPG para fotos, PNG para logos/transparência, WebP para melhor compressão
- **Tamanho**: Redimensione imagens antes de usar (max 1920px de largura)
- **Alt text**: Sempre inclua descrições para acessibilidade
- **Lazy loading**: Use para imagens fora da tela inicial
- **Responsividade**: Use classes Tailwind como `object-cover`, `object-contain`

## 8. Exemplo Prático: Seção de Professores com Fotos Reais

```jsx
// Atualização do componente de professores
function ProfessoresComFotos() {
  const professores = [
    {
      nome: "Prof. João Silva",
      foto: fotoProf1, // importada de @assets
      disciplina: "Matemática"
    }
    // ...
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {professores.map((prof, index) => (
        <div key={index} className="text-center">
          <img
            src={prof.foto}
            alt={`${prof.nome} - Professor de ${prof.disciplina}`}
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg"
          />
          <h3 className="font-bold text-lg">{prof.nome}</h3>
          <p className="text-school-orange">{prof.disciplina}</p>
        </div>
      ))}
    </div>
  );
}
```