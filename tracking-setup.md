# Configuração de Tracking - Colégio OSE

## Status Atual dos IDs

### Google Analytics & Facebook Pixel
❌ **Nenhum ID configurado ainda** - Os sistemas estão preparados mas aguardando seus IDs reais.

### Como Configurar

#### 1. Google Analytics 4
Você precisa fornecer seu ID de medição:
```
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Como obter:**
1. Acesse [Google Analytics](https://analytics.google.com/)
2. Admin → Propriedade → Streams de Dados → Web
3. Copie o ID de medição (formato: G-XXXXXXXXXX)

#### 2. Facebook Pixel
Você precisa fornecer seu Pixel ID:
```
VITE_FACEBOOK_PIXEL_ID=123456789012345
```

**Como obter:**
1. Acesse [Facebook Business Manager](https://business.facebook.com/)
2. Ferramentas de Eventos → Pixels
3. Copie o ID do Pixel (número de 15 dígitos)

#### 3. Google Tag Manager (Opcional)
```
VITE_GTM_ID=GTM-XXXXXXX
```

**Como obter:**
1. Acesse [Google Tag Manager](https://tagmanager.google.com/)
2. Workspace → ID do Container (formato: GTM-XXXXXXX)

## Como Usar Seus IDs Existentes

### Se você já tem um site WordPress:

#### Google Analytics:
1. WordPress Admin → Plugins → Google Analytics
2. Copie o ID de rastreamento
3. Use esse mesmo ID no novo site

#### Facebook Pixel:
1. WordPress Admin → PixelYourSite → Settings
2. Copie o Facebook Pixel ID
3. Use esse mesmo ID no novo site

### Configuração no Novo Site:

1. **Crie arquivo `.env` na raiz do projeto:**
```env
# Seus IDs reais do site atual
VITE_GA_MEASUREMENT_ID=G-SEU_ID_AQUI
VITE_FACEBOOK_PIXEL_ID=SEU_PIXEL_ID_AQUI
VITE_GTM_ID=GTM-SEU_ID_AQUI
```

2. **Reinicie o servidor após adicionar os IDs**

## Vantagens do Sistema Nativo

### Performance
- **WordPress com plugins:** 2-3 scripts externos carregados
- **Nosso sistema:** 1 script otimizado integrado

### Controle
- **WordPress:** Dependente de atualizações de plugins
- **Nosso sistema:** Controle total sobre implementação

### Tracking
- **WordPress:** Limitado às funcionalidades dos plugins  
- **Nosso sistema:** Eventos personalizados ilimitados

## Eventos que Serão Rastreados

Uma vez configurado, o sistema rastreará automaticamente:

✅ **Visualizações de página**
✅ **Formulário de contato enviado**
✅ **Cliques em botões importantes**
✅ **Downloads de materiais**
✅ **Acessos aos portais**
✅ **Navegação entre seções**

## Precisa dos IDs?

Para prosseguir com a configuração completa, preciso que você forneça:

1. **Google Analytics ID** (do seu site atual ou novo)
2. **Facebook Pixel ID** (do seu site atual ou novo)
3. **Google Tag Manager ID** (se usar)

O sistema está 100% preparado - só precisamos dos IDs para ativar o tracking completo.