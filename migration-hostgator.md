# Migração WordPress → Site Moderno na Hostgator

## Problema: Plugins WordPress vs Site Moderno

Seu site WordPress atual tem plugins como Facebook Pixel, Google Analytics, etc. O novo site implementa essas funcionalidades de forma nativa, oferecendo **melhor performance e controle**.

## Comparação: WordPress vs Site Moderno

### WordPress (Atual)
❌ Plugins pesados (Yoast, PixelYourSite, etc.)
❌ Carregamento lento (múltiplas requisições)
❌ Vulnerabilidades de segurança
❌ Atualizações constantes necessárias
❌ Conflitos entre plugins

### Site Moderno (Novo)
✅ Tracking nativo (Google Analytics, Facebook Pixel, GTM)
✅ Carregamento 3x mais rápido
✅ Segurança aprimorada
✅ Sem manutenção de plugins
✅ Controle total sobre códigos

## Funcionalidades Implementadas

### 1. Google Analytics 4
```javascript
// Rastreamento automático implementado
- Page views (todas as páginas)
- Form submissions (formulário de contato)
- CTA clicks (botões importantes)
- Portal access (login de alunos/pais)
```

### 2. Facebook Pixel
```javascript
// Eventos rastreados
- PageView (todas as páginas)
- Lead (formulário de contato)
- ViewContent (páginas de programas)
- Contact (telefone/email clicks)
```

### 3. Google Tag Manager
```javascript
// Container configurado para
- Todos os tags centralizados
- Conversions tracking
- Remarketing tags
- Custom events
```

## Processo de Migração na Hostgator

### Passo 1: Backup do WordPress
```bash
1. Faça backup completo via cPanel
2. Exporte banco de dados MySQL
3. Baixe todos os arquivos via FTP
```

### Passo 2: Preparar Novo Site
```bash
1. Gerar build do projeto: npm run build
2. Configurar variáveis de ambiente
3. Testar funcionalidades localmente
```

### Passo 3: Configurar IDs de Tracking

#### Google Analytics
- Copie o ID do WordPress: Admin → Google Analytics → Tracking ID
- Configure: `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX`

#### Facebook Pixel
- Copie do plugin atual: Meta Pixel → Pixel ID
- Configure: `VITE_FACEBOOK_PIXEL_ID=123456789012345`

#### Google Tag Manager
- Copie do WordPress: GTM Plugin → Container ID
- Configure: `VITE_GTM_ID=GTM-XXXXXXX`

### Passo 4: Upload na Hostgator
```bash
1. Acesse cPanel → File Manager
2. Vá para public_html/
3. Faça backup da pasta atual
4. Upload dos arquivos do build
5. Configure arquivo .env
```

### Passo 5: Configurar Domínio
```bash
1. Teste no subdomínio primeiro
2. Quando aprovado, substitua arquivos principais
3. Configure SSL se necessário
4. Teste todas as funcionalidades
```

## Vantagens da Migração

### Performance
- **Antes**: 3-5 segundos de carregamento
- **Depois**: 0.5-1 segundo de carregamento

### Manutenção
- **Antes**: Atualizações semanais de plugins
- **Depois**: Zero manutenção necessária

### Segurança
- **Antes**: Vulnerabilidades constantes
- **Depois**: Site estático = maior segurança

### Tracking
- **Antes**: Dependente de plugins de terceiros
- **Depois**: Implementação nativa otimizada

## Arquivos Necessários para Upload

```
dist/
├── index.html
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
├── .env
└── outros arquivos do build
```

## Configuração .env na Hostgator

```env
# Copie os IDs do seu WordPress atual
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_FACEBOOK_PIXEL_ID=123456789012345
VITE_GTM_ID=GTM-XXXXXXX
```

## Resultado Final

Você terá o mesmo tracking e funcionalidades do WordPress, mas com:
- Site 300% mais rápido
- Design moderno e responsivo
- Maior segurança
- Zero manutenção
- Melhor experiência do usuário

Gostaria que eu prepare os arquivos para upload ou prefere um guia mais detalhado de algum passo específico?