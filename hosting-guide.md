# Guia de Implementação na Hostgator

## Configuração de Plugins/Tracking

### 1. Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto com:

```env
# Google Analytics 4
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Facebook Pixel
VITE_FACEBOOK_PIXEL_ID=123456789012345

# Google Tag Manager
VITE_GTM_ID=GTM-XXXXXXX
```

### 2. Como Obter os IDs

#### Google Analytics 4:
1. Acesse [Google Analytics](https://analytics.google.com/)
2. Admin > Propriedade > Streams de Dados > Web
3. Copie o ID de medição (G-XXXXXXXXXX)

#### Facebook Pixel:
1. Acesse [Facebook Business Manager](https://business.facebook.com/)
2. Ferramentas de Eventos > Pixels
3. Copie o ID do Pixel

#### Google Tag Manager:
1. Acesse [Google Tag Manager](https://tagmanager.google.com/)
2. Workspace > ID do Container (GTM-XXXXXXX)

### 3. Funcionalidades Implementadas

#### ✅ Google Analytics 4
- Rastreamento automático de páginas
- Eventos personalizados (formulários, cliques)
- Conversões e metas

#### ✅ Facebook Pixel
- Pixel de visualização de página
- Eventos de conversão (Lead, Contact)
- Remarketing e audiências personalizadas

#### ✅ Google Tag Manager
- Container para todos os tags
- Gerenciamento centralizado
- Tags adicionais via GTM

### 4. Eventos Rastreados

- **Formulário de Contato**: Lead/Contact
- **Navegação**: Page Views
- **Cliques em Botões**: CTA clicks
- **Downloads**: Material downloads

### 5. Upload para Hostgator

1. **Fazer build do projeto**:
```bash
npm run build
```

2. **Upload dos arquivos**:
- Fazer upload da pasta `dist/` para o diretório público
- Configurar arquivo `.env` no servidor

3. **Configurar domínio**:
- Apontar colegioose.com.br para os novos arquivos
- Configurar SSL se necessário

## Vantagens vs WordPress

### Performance
- ✅ Site estático = carregamento 3x mais rápido
- ✅ Sem plugins pesados do WordPress
- ✅ Otimização automática de imagens

### Segurança
- ✅ Sem vulnerabilidades do WordPress
- ✅ Sem necessidade de atualizações constantes
- ✅ Menor superficie de ataque

### Tracking
- ✅ Implementação nativa (não dependente de plugins)
- ✅ Controle total sobre os códigos
- ✅ Performance melhor que plugins WordPress

### Manutenção
- ✅ Sem necessidade de atualizar plugins
- ✅ Backup simples (apenas arquivos)
- ✅ Não há banco de dados para gerenciar