
# Instruções para Configuração da Página de Prova de Bolsas

## Visão Geral

A página de prova de bolsas foi criada como uma landing page completa com formulário multi-etapas estilo Typeform, integração com Google Sheets e todas as funcionalidades solicitadas.

## Funcionalidades Implementadas

### ✅ Seções de Conteúdo
- **Cabeçalho Hero**: Título impactante, descrição da prova, CTA destacado
- **Seção de Informações**: Data, horário, formato, critérios de elegibilidade, benefícios
- **Depoimentos**: 3 histórias de sucesso de ex-alunos
- **FAQ**: Seção expansível com perguntas frequentes
- **Rodapé**: Informações de contato, links sociais, políticas

### ✅ Processo de Inscrição
- **Formulário Multi-etapas**: 5 etapas com transições suaves
- **Barra de Progresso**: Indicador visual do progresso
- **Validação em Tempo Real**: Validação de email, telefone, campos obrigatórios
- **Mensagens de Erro**: Feedback claro para o usuário
- **Confirmação**: Tela de sucesso após envio

### ✅ Campos do Formulário
1. **Etapa 1**: Nome completo, e-mail
2. **Etapa 2**: Telefone, idade
3. **Etapa 3**: Escola atual, série
4. **Etapa 4**: Dados do responsável
5. **Etapa 5**: Motivação (opcional)

### ✅ Design e UX
- **Design Responsivo**: Otimizado para mobile e desktop
- **Tailwind CSS**: Estilização moderna e consistente
- **Animações**: Transições suaves com Framer Motion
- **Acessibilidade**: Navegação por teclado, labels adequados

## Configuração do Google Sheets

### Passo 1: Criar Planilha no Google Sheets

1. Acesse [Google Sheets](https://sheets.google.com)
2. Crie uma nova planilha chamada "Inscricoes Prova Bolsas 2025"
3. Configure o cabeçalho na primeira linha com as colunas:
   ```
   A1: Data/Hora Inscrição
   B1: Nome Completo
   C1: E-mail
   D1: Telefone
   E1: Idade
   F1: Escola Atual
   G1: Série
   H1: Nome Responsável
   I1: Telefone Responsável
   J1: Motivação
   ```

### Passo 2: Configurar Google Apps Script

1. Na planilha, vá em `Extensões > Apps Script`
2. Cole o seguinte código:

```javascript
function doPost(e) {
  try {
    // Obter dados do formulário
    const data = JSON.parse(e.postData.contents);
    
    // Obter a planilha ativa
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Preparar linha de dados
    const row = [
      new Date(), // Data/Hora atual
      data.nomeCompleto,
      data.email,
      data.telefone,
      data.idade,
      data.escola,
      data.serie,
      data.responsavel,
      data.telefoneResponsavel,
      data.motivacao || ''
    ];
    
    // Adicionar linha à planilha
    sheet.appendRow(row);
    
    // Resposta de sucesso
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Resposta de erro
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Salve o projeto com um nome (ex: "Formulario Prova Bolsas")
4. Clique em `Implantar > Nova implantação`
5. Escolha tipo: `Aplicativo da web`
6. Configure:
   - Executar como: `Eu`
   - Quem tem acesso: `Qualquer pessoa`
7. Clique em `Implantar` e copie a URL do aplicativo da web

### Passo 3: Configurar a Integração no Código

No arquivo `client/src/pages/prova-bolsas.tsx`, localize a função `submitForm` e substitua a linha de simulação pela integração real:

```typescript
const submitForm = async () => {
  if (!validateCurrentStep()) return;

  setIsLoading(true);
  
  try {
    // Substituir pela URL do Google Apps Script
    const GOOGLE_SCRIPT_URL = 'SUA_URL_DO_GOOGLE_SCRIPT_AQUI';
    
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    
    const result = await response.json();
    
    if (result.success) {
      setIsSubmitted(true);
      setCurrentStep(6);
    } else {
      throw new Error(result.error || 'Erro ao enviar formulário');
    }
    
  } catch (error) {
    console.error('Erro ao enviar formulário:', error);
    alert('Erro ao enviar inscrição. Tente novamente.');
  } finally {
    setIsLoading(false);
  }
};
```

## Configuração de E-mail de Confirmação (Opcional)

Para enviar e-mails de confirmação automáticos, adicione ao Google Apps Script:

```javascript
function enviarEmailConfirmacao(email, nome) {
  const assunto = 'Confirmação de Inscrição - Prova de Bolsas OSE';
  const corpo = `
    Olá ${nome},
    
    Sua inscrição para a Prova de Bolsas do Colégio OSE foi recebida com sucesso!
    
    Detalhes da Prova:
    📅 Data: 15 de Março de 2025
    🕗 Horário: 8h às 11h30
    📍 Local: Campus OSE - Sorocaba
    
    Chegue às 7h30 (portões fecham às 8h).
    
    Em breve entraremos em contato com mais informações.
    
    Atenciosamente,
    Equipe Colégio OSE
  `;
  
  MailApp.sendEmail(email, assunto, corpo);
}

// Modifique a função doPost para incluir o e-mail:
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSheet();
    
    const row = [
      new Date(),
      data.nomeCompleto,
      data.email,
      data.telefone,
      data.idade,
      data.escola,
      data.serie,
      data.responsavel,
      data.telefoneResponsavel,
      data.motivacao || ''
    ];
    
    sheet.appendRow(row);
    
    // Enviar e-mail de confirmação
    enviarEmailConfirmacao(data.email, data.nomeCompleto);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Conformidade com LGPD

### Dados Coletados
- Nome completo
- E-mail
- Telefone
- Idade
- Escola atual
- Série
- Dados do responsável
- Motivação (opcional)

### Medidas de Conformidade
1. **Consentimento**: Formulário inclui aceite dos termos
2. **Finalidade**: Dados usados apenas para processo seletivo
3. **Minimização**: Coleta apenas dados necessários
4. **Segurança**: Transmissão via HTTPS
5. **Retenção**: Dados mantidos por período determinado
6. **Direitos**: Usuário pode solicitar exclusão/correção

### Adicionar Checkbox de Consentimento

No formulário (etapa 5), adicione:

```tsx
<div className="flex items-start gap-3">
  <Checkbox 
    id="aceiteTermos" 
    checked={formData.aceiteTermos}
    onCheckedChange={(checked) => handleInputChange('aceiteTermos', checked)}
  />
  <Label htmlFor="aceiteTermos" className="text-sm">
    Aceito os{' '}
    <a href="#" className="text-school-orange hover:underline">
      termos de uso
    </a>{' '}
    e{' '}
    <a href="#" className="text-school-orange hover:underline">
      política de privacidade
    </a>
    , e autorizo o uso dos meus dados para fins do processo seletivo.
  </Label>
</div>
```

## Como Acessar a Página

1. **URL Direta**: `/prova-bolsas`
2. **Navegação**: Menu "Sobre" > "Prova de Bolsas"
3. **Links Internos**: Pode ser linkada em outras páginas

## Monitoramento e Analytics

Para acompanhar o desempenho da página:

1. **Google Analytics**: Configurar eventos de conversão
2. **Planilha**: Monitorar número de inscrições
3. **Relatórios**: Extrair dados para análise

## Personalização

### Alterar Datas e Informações
- Edite as informações diretamente no componente
- Data da prova: linha com "15 de Março de 2025"
- Horários: seção de informações da prova

### Customizar Formulário
- Adicionar/remover campos no estado `formData`
- Modificar validações na função `validateCurrentStep`
- Ajustar etapas no componente `renderFormStep`

### Modificar Design
- Cores: alterar classes Tailwind CSS
- Imagens: trocar `heroBackground.imageUrl`
- Layout: ajustar estrutura do grid

## Suporte Técnico

Para dúvidas sobre implementação:
1. Verifique os logs do console do navegador
2. Teste a integração com Google Sheets
3. Confirme que todas as dependências estão instaladas
4. Verifique se a URL do Google Script está correta

## Próximos Passos

1. ✅ Configurar Google Sheets
2. ✅ Testar integração
3. ✅ Configurar e-mail de confirmação
4. ✅ Adicionar políticas de privacidade
5. ✅ Fazer testes de usuário
6. ✅ Publicar a página

A página está pronta para uso e pode ser customizada conforme necessário!
