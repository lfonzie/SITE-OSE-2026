# Tutorial Rápido: Como Usar Imagens

## Método Mais Simples

**1. Para usar uma imagem das attached_assets:**
```jsx
import minhaImagem from "@assets/0354_1750717790205.jpg";

<img 
  src={minhaImagem} 
  alt="Descrição da imagem" 
  className="w-full h-64 object-cover rounded-lg"
/>
```

**2. Para imagem externa (URL):**
```jsx
<img 
  src="https://exemplo.com/imagem.jpg" 
  alt="Descrição" 
  className="w-full h-64 object-cover"
/>
```

**3. Card simples com imagem:**
```jsx
<div className="bg-white rounded-lg shadow-lg overflow-hidden">
  <img src={minhaImagem} alt="Foto" className="w-full h-48 object-cover" />
  <div className="p-4">
    <h3 className="font-bold">Título</h3>
    <p>Descrição aqui...</p>
  </div>
</div>
```

## Principais Classes CSS para Imagens

- `w-full h-64` - Largura total, altura fixa
- `object-cover` - Mantém proporção, corta se necessário  
- `object-contain` - Mantém proporção, mostra imagem completa
- `rounded-lg` - Bordas arredondadas
- `shadow-lg` - Sombra
- `hover:scale-105 transition-transform` - Efeito hover

## Suas Imagens Disponíveis

Você já tem estas imagens prontas para usar:
- `@assets/0354_1750717790205.jpg`
- `@assets/1068_1750717790205.jpg` 
- `@assets/0312_1750717790204.jpg`
- `@assets/0700_1750717790204.jpg`
- E outras...

## Exemplo Completo

```jsx
import foto1 from "@assets/0354_1750717790205.jpg";

function MeuComponente() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Nossa Escola</h2>
      <img 
        src={foto1}
        alt="Atividades na OSE"
        className="w-full h-64 object-cover rounded-lg shadow-lg"
      />
    </div>
  );
}
```

Agora você pode usar imagens em qualquer componente!