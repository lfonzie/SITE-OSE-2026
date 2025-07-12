import { useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Mail, Phone, MapPin, Calendar, ArrowLeft } from 'lucide-react';

export default function BolsasInscricaoSuccess() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/30 to-emerald-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/30 to-green-400/30 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-600 animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold text-green-900 mb-2">
              Inscrição Realizada com Sucesso!
            </h1>
            <p className="text-xl text-green-800">
              Prova de Bolsas 2026 - Colégio OSE
            </p>
            <p className="text-green-700 mt-2">
              Seu protocolo de inscrição foi enviado para seu email
            </p>
          </div>
        </div>

        {/* Success Details */}
        <Card className="max-w-3xl mx-auto bg-white/30 backdrop-blur-lg border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-green-900 flex items-center gap-2">
              <Mail className="h-6 w-6" />
              Confirmação Enviada
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-green-50/50 backdrop-blur-sm rounded-xl p-6 border border-green-200/30">
                <h3 className="font-semibold text-green-900 mb-2">O que acontece agora?</h3>
                <ol className="list-decimal list-inside space-y-2 text-green-800">
                  <li>Verifique seu email para a confirmação da inscrição</li>
                  <li>Guarde o protocolo de inscrição para referência futura</li>
                  <li>Aguarde informações sobre data e local da prova</li>
                  <li>Mantenha seus dados de contato atualizados</li>
                </ol>
              </div>

              <div className="bg-blue-50/50 backdrop-blur-sm rounded-xl p-6 border border-blue-200/30">
                <h3 className="font-semibold text-blue-900 mb-2">Importante:</h3>
                <ul className="list-disc list-inside space-y-1 text-blue-800">
                  <li>Caso não receba o email em alguns minutos, verifique sua caixa de spam</li>
                  <li>Em caso de dúvidas, entre em contato conosco através dos canais abaixo</li>
                  <li>Compareça no dia da prova munido de documento de identidade</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
          <Card className="bg-white/30 backdrop-blur-lg border-white/20 text-center">
            <CardContent className="p-6">
              <Phone className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-green-900 mb-2">Telefone</h3>
              <p className="text-green-800 font-medium">(15) 2101-3812</p>
              <p className="text-green-700 text-sm mt-1">Horário comercial</p>
            </CardContent>
          </Card>

          <Card className="bg-white/30 backdrop-blur-lg border-white/20 text-center">
            <CardContent className="p-6">
              <Mail className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-green-900 mb-2">Email</h3>
              <p className="text-green-800 font-medium">info@colegioose.com.br</p>
              <p className="text-green-700 text-sm mt-1">Resposta em até 24h</p>
            </CardContent>
          </Card>

          <Card className="bg-white/30 backdrop-blur-lg border-white/20 text-center">
            <CardContent className="p-6">
              <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-green-900 mb-2">Endereço</h3>
              <p className="text-green-800 font-medium">Rua Duque de Caxias, 1101</p>
              <p className="text-green-700 text-sm mt-1">Centro - Sorocaba/SP</p>
            </CardContent>
          </Card>
        </div>

        {/* Timeline */}
        <Card className="max-w-3xl mx-auto bg-white/30 backdrop-blur-lg border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-green-900 flex items-center gap-2">
              <Calendar className="h-6 w-6" />
              Cronograma da Prova de Bolsas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-900">Inscrições</h4>
                  <p className="text-green-800">Abertas até [Data a ser definida]</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-orange-900">Aplicação da Prova</h4>
                  <p className="text-orange-800">Data e local serão comunicados por email</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900">Resultado</h4>
                  <p className="text-blue-800">Divulgação através dos canais oficiais</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Voltar ao Site
            </Button>
          </Link>
          
          <a 
            href="mailto:info@colegioose.com.br" 
            className="inline-flex items-center"
          >
            <Button 
              variant="outline" 
              className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Mail className="h-5 w-5 mr-2" />
              Entrar em Contato
            </Button>
          </a>
        </div>

        {/* School Information */}
        <div className="text-center mt-12 bg-white/20 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold text-green-900 mb-4">
            Colégio OSE - Organização Sorocabana de Ensino
          </h3>
          <p className="text-green-800 text-lg mb-2">
            Desde 1924 - Tradição Secular de Ensino
          </p>
          <p className="text-green-700">
            Preparando gerações para um futuro de excelência
          </p>
        </div>
      </div>
    </div>
  );
}