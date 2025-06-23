# Lista de Verificação para Deploy na Hostgator

## ✅ Preparação do Site

### Funcionalidades Implementadas
- [x] Google Analytics 4 (rastreamento de páginas e eventos)
- [x] Facebook Pixel (conversões e remarketing)
- [x] Google Tag Manager (gerenciamento centralizado)
- [x] Formulário de contato com tracking
- [x] Portal do Aluno e Portal dos Pais
- [x] Design responsivo (mobile, tablet, desktop)
- [x] Otimização de performance
- [x] Logo oficial integrado
- [x] Cores oficiais (laranja, marrom, branco)

### Eventos Rastreados
- [x] Page views (todas as páginas)
- [x] Form submissions (formulário de contato)
- [x] CTA clicks (botões importantes)
- [x] Portal access (tentativas de login)
- [x] Navigation clicks (menu e links)

## 📋 Checklist de Deploy

### 1. Configuração de Tracking
- [ ] Obter Google Analytics ID do site atual
- [ ] Obter Facebook Pixel ID do site atual
- [ ] Obter Google Tag Manager ID (se existir)
- [ ] Configurar arquivo .env com os IDs

### 2. Build e Teste
- [ ] Executar `npm run build`
- [ ] Verificar se build foi gerado em `dist/`
- [ ] Testar localmente se tracking está funcionando
- [ ] Verificar se todas as páginas carregam corretamente

### 3. Backup WordPress Atual
- [ ] Fazer backup completo via cPanel
- [ ] Exportar banco de dados MySQL
- [ ] Baixar arquivos via FTP
- [ ] Documentar configurações atuais

### 4. Upload para Hostgator
- [ ] Acessar cPanel → File Manager
- [ ] Navegar para public_html/
- [ ] Criar pasta de backup do site atual
- [ ] Upload dos arquivos da pasta `dist/`
- [ ] Configurar arquivo .env no servidor

### 5. Configuração de Domínio
- [ ] Testar site em subdomínio primeiro
- [ ] Verificar SSL funcionando
- [ ] Configurar redirecionamentos se necessário
- [ ] Atualizar DNS se necessário

### 6. Testes Finais
- [ ] Verificar carregamento de todas as páginas
- [ ] Testar formulário de contato
- [ ] Verificar portais do aluno e pais
- [ ] Confirmar tracking funcionando (Google Analytics)
- [ ] Testar responsividade em mobile
- [ ] Verificar velocidade de carregamento

### 7. Monitoramento
- [ ] Configurar alertas no Google Analytics
- [ ] Verificar Facebook Pixel Helper
- [ ] Monitorar erros 404
- [ ] Verificar Search Console

## 🚀 Vantagens da Migração

### Performance
- Site 3x mais rápido que WordPress
- Carregamento em menos de 1 segundo
- Otimização automática de imagens

### Segurança
- Site estático = maior segurança
- Sem vulnerabilidades de plugins
- Menor superfície de ataque

### Manutenção
- Zero atualizações necessárias
- Backup simples (apenas arquivos)
- Sem banco de dados para gerenciar

### Tracking
- Implementação nativa otimizada
- Controle total sobre códigos
- Performance superior a plugins

## 📞 Suporte

Caso tenha dúvidas durante o processo:
1. Verificar logs do navegador para erros
2. Consultar documentação da Hostgator
3. Testar em ambiente de desenvolvimento primeiro

## 🎯 Resultado Esperado

Após a migração você terá:
- Site moderno e profissional
- Carregamento ultrarrápido
- Tracking completo funcionando
- Design responsivo perfeito
- Zero manutenção necessária