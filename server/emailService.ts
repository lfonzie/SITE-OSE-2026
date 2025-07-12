import { google } from 'googleapis';
import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export class EmailService {
  private static instance: EmailService;
  private oauth2Client: any;
  private transporter: any;

  private constructor() {
    this.setupOAuth2();
  }

  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  private setupOAuth2() {
    // Configuração OAuth2 para Gmail API
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      'https://developers.google.com/oauthplayground' // redirect URI
    );

    this.oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN
    });
  }

  private async createTransporter() {
    try {
      const accessToken = await this.oauth2Client.getAccessToken();

      this.transporter = nodemailer.createTransporter({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.GMAIL_USER || 'info@colegioose.com.br',
          clientId: process.env.GMAIL_CLIENT_ID,
          clientSecret: process.env.GMAIL_CLIENT_SECRET,
          refreshToken: process.env.GMAIL_REFRESH_TOKEN,
          accessToken: accessToken.token,
        },
      });

      return this.transporter;
    } catch (error) {
      console.error('Error creating transporter:', error);
      throw new Error('Failed to create email transporter');
    }
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const transporter = await this.createTransporter();
      
      const mailOptions = {
        from: `"Colégio OSE" <${process.env.GMAIL_USER || 'info@colegioose.com.br'}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text || options.html.replace(/<[^>]*>/g, ''), // Remove HTML tags for text version
      };

      const result = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', result.messageId);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }

  // Template para email de confirmação de inscrição
  generateConfirmationEmail(dadosInscricao: any): { subject: string; html: string } {
    const subject = `Confirmação de Inscrição - Prova de Bolsas 2026 - Colégio OSE`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="https://colegioose.com.br/wp-content/uploads/2023/05/LogoOSE100anos.png" 
               alt="Colégio OSE" style="height: 80px;">
        </div>
        
        <h2 style="color: #D97706; text-align: center;">Confirmação de Inscrição</h2>
        <h3 style="color: #92400E; text-align: center;">Prova de Bolsas 2026</h3>
        
        <div style="background-color: #FEF3C7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h4 style="color: #92400E; margin-top: 0;">Protocolo: ${dadosInscricao.protocolo}</h4>
          <p><strong>Data da Inscrição:</strong> ${new Date(dadosInscricao.createdAt).toLocaleDateString('pt-BR')}</p>
        </div>
        
        <h4 style="color: #92400E;">Dados do Aluno:</h4>
        <ul style="line-height: 1.6;">
          <li><strong>Nome:</strong> ${dadosInscricao.nomeAluno}</li>
          <li><strong>Data de Nascimento:</strong> ${new Date(dadosInscricao.dataNascimento).toLocaleDateString('pt-BR')}</li>
          <li><strong>Série/Ano:</strong> ${dadosInscricao.serie}</li>
          <li><strong>Escola Atual:</strong> ${dadosInscricao.escolaAtual}</li>
        </ul>
        
        <h4 style="color: #92400E;">Dados do Responsável:</h4>
        <ul style="line-height: 1.6;">
          <li><strong>Nome:</strong> ${dadosInscricao.nomeResponsavel}</li>
          <li><strong>Email:</strong> ${dadosInscricao.emailResponsavel}</li>
          <li><strong>Telefone:</strong> ${dadosInscricao.telefoneResponsavel}</li>
        </ul>
        
        <div style="background-color: #DBEAFE; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h4 style="color: #1E40AF; margin-top: 0;">Próximos Passos:</h4>
          <ol style="line-height: 1.6; color: #1E40AF;">
            <li>Aguarde informações sobre data e local da prova</li>
            <li>Mantenha seus dados de contato atualizados</li>
            <li>Em caso de dúvidas, entre em contato conosco</li>
          </ol>
        </div>
        
        <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 30px 0;">
          <h4 style="color: #374151; margin-top: 0;">Informações de Contato:</h4>
          <p style="margin: 5px 0;"><strong>Telefone:</strong> (15) 2101-3812</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> info@colegioose.com.br</p>
          <p style="margin: 5px 0;"><strong>Endereço:</strong> Rua Duque de Caxias, 1101 - Centro, Sorocaba - SP</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E7EB;">
          <p style="color: #6B7280; font-size: 14px;">
            © 2025 Colégio OSE - Organização Sorocabana de Ensino<br>
            Desde 1924 - Tradição Secular de Ensino
          </p>
        </div>
      </div>
    `;
    
    return { subject, html };
  }
}

// Instância singleton
export const emailService = EmailService.getInstance();