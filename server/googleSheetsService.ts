import { google } from 'googleapis';

interface BolsasData {
  nomeAluno: string;
  dataNascimento: string;
  serie: string;
  escolaAtual: string;
  nomeResponsavel: string;
  emailResponsavel: string;
  telefoneResponsavel: string;
  endereco: string;
  cidade: string;
  cep: string;
  dataInscricao?: string;
}

export class GoogleSheetsService {
  private static instance: GoogleSheetsService;
  private auth: any;
  private sheets: any;

  private constructor() {
    this.setupAuth();
  }

  static getInstance(): GoogleSheetsService {
    if (!GoogleSheetsService.instance) {
      GoogleSheetsService.instance = new GoogleSheetsService();
    }
    return GoogleSheetsService.instance;
  }

  private setupAuth() {
    try {
      // Usando as mesmas credenciais do Gmail API
      this.auth = new google.auth.OAuth2(
        process.env.GMAIL_CLIENT_ID,
        process.env.GMAIL_CLIENT_SECRET,
        'https://developers.google.com/oauthplayground'
      );

      this.auth.setCredentials({
        refresh_token: process.env.GMAIL_REFRESH_TOKEN
      });

      this.sheets = google.sheets({ version: 'v4', auth: this.auth });
    } catch (error) {
      console.error('Erro ao configurar autenticação Google Sheets:', error);
    }
  }

  async createSpreadsheet(title: string = 'Inscrições Prova de Bolsas 2026'): Promise<string | null> {
    try {
      const resource = {
        properties: {
          title,
        },
        sheets: [{
          properties: {
            title: 'Inscrições',
          },
        }],
      };

      const response = await this.sheets.spreadsheets.create({
        resource,
      });

      const spreadsheetId = response.data.spreadsheetId;
      
      // Adicionar cabeçalhos
      await this.addHeaders(spreadsheetId);
      
      console.log('Planilha criada com ID:', spreadsheetId);
      console.log('URL da planilha:', `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`);
      
      return spreadsheetId;
    } catch (error) {
      console.error('Erro ao criar planilha:', error);
      return null;
    }
  }

  private async addHeaders(spreadsheetId: string): Promise<void> {
    const headers = [
      'Data de Inscrição',
      'Nome do Aluno',
      'Data de Nascimento',
      'Série/Ano',
      'Escola Atual',
      'Nome do Responsável',
      'Email do Responsável', 
      'Telefone do Responsável',
      'Endereço',
      'Cidade',
      'CEP'
    ];

    try {
      await this.sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'Inscrições!A1:K1',
        valueInputOption: 'RAW',
        resource: {
          values: [headers],
        },
      });

      // Formatar cabeçalhos
      await this.sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        resource: {
          requests: [{
            repeatCell: {
              range: {
                sheetId: 0,
                startRowIndex: 0,
                endRowIndex: 1,
                startColumnIndex: 0,
                endColumnIndex: headers.length,
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: { red: 0.2, green: 0.4, blue: 0.6 },
                  textFormat: {
                    foregroundColor: { red: 1, green: 1, blue: 1 },
                    bold: true,
                  },
                },
              },
              fields: 'userEnteredFormat(backgroundColor,textFormat)',
            },
          }],
        },
      });
    } catch (error) {
      console.error('Erro ao adicionar cabeçalhos:', error);
    }
  }

  async addInscricao(spreadsheetId: string, data: BolsasData): Promise<boolean> {
    try {
      const row = [
        new Date().toLocaleString('pt-BR'),
        data.nomeAluno,
        data.dataNascimento,
        data.serie,
        data.escolaAtual,
        data.nomeResponsavel,
        data.emailResponsavel,
        data.telefoneResponsavel,
        data.endereco,
        data.cidade,
        data.cep
      ];

      await this.sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Inscrições!A:K',
        valueInputOption: 'RAW',
        resource: {
          values: [row],
        },
      });

      return true;
    } catch (error) {
      console.error('Erro ao adicionar inscrição na planilha:', error);
      return false;
    }
  }

  async getSpreadsheetUrl(spreadsheetId: string): Promise<string> {
    return `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;
  }
}

export const googleSheetsService = GoogleSheetsService.getInstance();