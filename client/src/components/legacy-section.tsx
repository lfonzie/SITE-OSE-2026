
import { Calendar, Award, Users, BookOpen, GraduationCap, Building2 } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";

// Usando imagem da pasta public/images
const legacyImage = "/images/1105_1750717790206.jpg";

export default function LegacySection() {
  return (
    <section id="legacy" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-school-brown mb-4">
            Um Século de <span className="text-school-orange">Excelência Educacional</span>
          </h2>
          <p className="text-xl text-school-brown max-w-4xl mx-auto">
            A Organização Sorocabana de Ensino (OSE) é uma instituição educacional que, há um século, 
            desempenha um papel fundamental na formação de milhares de estudantes em Sorocaba e região.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-4">
            <OptimizedImage 
              src={legacyImage} 
              alt="Ambiente alegre e acolhedor da OSE - 100 Anos de tradição"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="grid grid-cols-2 gap-4">
              <OptimizedImage 
                src="/images/0312_1750717790204.jpg" 
                alt="Tradição centenária da OSE"
                className="w-full h-32 object-cover rounded-lg shadow-md"
              />
              <OptimizedImage 
                src="/images/0354_1750717790205.jpg" 
                alt="Formação integral na OSE"
                className="w-full h-32 object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-school-brown">
              Fundação da Escola do Comércio de Sorocaba (1924)
            </h3>
            <div className="space-y-4 text-school-brown">
              <p className="text-lg">
                A jornada da OSE teve início em <strong>22 de outubro de 1924</strong>, com a fundação da 
                Escola do Comércio de Sorocaba. Situada em um tradicional casarão na Rua Álvaro Soares, 
                a escola foi pioneira no ensino comercial no interior do estado de São Paulo.
              </p>
              <p>
                Na década de 1920, Sorocaba passava por um período de transição, deixando de ser uma cidade 
                predominantemente agrária para abraçar a industrialização. A necessidade de profissionais 
                qualificados em comércio e administração era evidente.
              </p>
            </div>
          </div>
        </div>

        {/* Galeria de Imagens da História */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-school-brown mb-8">
            Memórias de Uma Trajetória Centenária
          </h3>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            <OptimizedImage 
              src="/images/0905_1750717790206.jpg" 
              alt="Momentos históricos da OSE"
              className="w-full h-48 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            />
            <OptimizedImage 
              src="/images/0700_1750717790204.jpg" 
              alt="Ambiente educacional da OSE"
              className="w-full h-48 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            />
            <OptimizedImage 
              src="/images/0581_1750717790206.jpg" 
              alt="Tradição educacional OSE"
              className="w-full h-48 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            />
            <OptimizedImage 
              src="/images/0491_1750717790207.jpg" 
              alt="Excelência acadêmica OSE"
              className="w-full h-48 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            />
          </div>
        </div>

        {/* Seção Dr. Arthur Cyrillo Freire */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-school-orange/10 to-school-brown/10 rounded-xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-school-brown mb-6 text-center">
              A Chegada de Dr. Arthur Cyrillo Freire e Família (1936)
            </h3>
            <div className="space-y-6 text-school-brown">
              <p className="text-lg">
                Em 1936, a história da escola mudou radicalmente com a chegada de <strong>Dr. Arthur Cyrillo Freire</strong>, 
                sua esposa <strong>Dona Tercila Bosqueti Fonseca</strong> e os dois filhos dela, <strong>Arthur Fonseca</strong> e 
                <strong>Nelson Fonseca</strong>, que chegavam de Santos.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-school-brown mb-3">Biografia de Dr. Arthur Cyrillo Freire</h4>
                  <p className="mb-3">
                    Nascido em 31 de julho de 1878, em Fortaleza, Ceará, Dr. Arthur era um homem de múltiplos talentos: 
                    advogado, educador, jornalista e ativista social.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Promotor Público:</strong> Atuou na comarca de Borba, no Amazonas</li>
                    <li>• <strong>Advogado e Jornalista em Santos:</strong> Foi advogado da Companhia Antártica Paulista</li>
                    <li>• <strong>Defensor dos Trabalhadores:</strong> Liderou campanhas pelos direitos dos trabalhadores das docas</li>
                    <li>• <strong>Atuação Política:</strong> Participou da Revolução Constitucionalista de 1932</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold text-school-brown mb-3">Aquisição e Expansão</h4>
                  <p className="mb-3">
                    Ao chegarem em Sorocaba, Dr. Arthur, Dona Tercila, Arthur e Nelson adquiriram a pequena 
                    Escola do Comércio, que contava com apenas <strong>42 alunos</strong>.
                  </p>
                  <p>
                    Em 1941, a escola mudou-se para um prédio maior na Rua Benedito Pires. Este momento ficou 
                    marcado pela participação ativa dos alunos, que carregaram os móveis e carteiras até a nova sede.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-school-brown mb-12">
            Nossa Jornada Centenária
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-school-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar size={24} />
              </div>
              <h4 className="text-xl font-bold text-school-brown mb-2">1924</h4>
              <p className="text-school-brown text-sm">Fundação da Escola do Comércio de Sorocaba</p>
            </div>
            <div className="text-center">
              <div className="bg-school-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={24} />
              </div>
              <h4 className="text-xl font-bold text-school-brown mb-2">1946</h4>
              <p className="text-school-brown text-sm">Consolidação como Organização Sorocabana de Ensino</p>
            </div>
            <div className="text-center">
              <div className="bg-school-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 size={24} />
              </div>
              <h4 className="text-xl font-bold text-school-brown mb-2">1958</h4>
              <p className="text-school-brown text-sm">Nova sede na Rua da Penha, 620</p>
            </div>
            <div className="text-center">
              <div className="bg-school-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={24} />
              </div>
              <h4 className="text-xl font-bold text-school-brown mb-2">2024</h4>
              <p className="text-school-brown text-sm">100 Anos de excelência educacional</p>
            </div>
          </div>
        </div>

        {/* Seção Anos 1958-1980 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-school-brown mb-6">
            Anos 1958-1980: Expansão e Modernização
          </h3>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="space-y-4 text-school-brown">
              <p>
                Em 1958, a OSE investiu em um novo prédio na <strong>Rua da Penha, 620</strong>. 
                Com instalações modernas para a época, a instituição passou a contar com mais de 
                40 salas de aula, quatro laboratórios de química, uma empresa júnior e um amplo pátio, 
                onde a icônica jabuticabeira se tornou um símbolo da escola.
              </p>
              <p>
                Na década de 1980, a OSE atingiu um marco significativo, contando com 
                <strong> mais de 2.000 alunos</strong> apenas na unidade central.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-bold text-school-brown mb-4">Destaques do Período</h4>
              <ul className="space-y-2 text-school-brown">
                <li>• Crescimento exponencial do corpo discente</li>
                <li>• Inovação pedagógica e metodologias modernas</li>
                <li>• Cursos técnicos: Química, Contabilidade, Administração</li>
                <li>• Implementação de Informática e Magistério</li>
              </ul>
            </div>
            <div className="space-y-4">
              <OptimizedImage 
                src="/images/0934_1750717790206.jpg" 
                alt="Expansão da OSE nos anos 1958-1980"
                className="w-full h-40 object-cover rounded-lg shadow-lg"
              />
              <OptimizedImage 
                src="/images/1068_1750717790205.jpg" 
                alt="Modernização das instalações OSE"
                className="w-full h-40 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Seção Legado dos Fundadores */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-school-brown mb-8 text-center">
            Legado dos Fundadores
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-school-orange/10 to-school-brown/10 p-6 rounded-xl">
              <h4 className="text-xl font-bold text-school-brown mb-3">Professor Arthur Fonseca</h4>
              <p className="text-school-brown mb-3">
                Nascido em 4 de julho de 1922, dedicou sua vida à educação e ao desenvolvimento da OSE.
              </p>
              <ul className="space-y-1 text-sm text-school-brown">
                <li>• Direção e modernização da OSE</li>
                <li>• Vereador em Sorocaba (1947-1950)</li>
                <li>• Secretário de Educação e Saúde (1969-1970)</li>
                <li>• Deputado Federal (1971-1975)</li>
              </ul>
              <p className="text-xs text-school-brown/70 mt-3">
                A Avenida Professor Arthur Fonseca foi nomeada em sua homenagem.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-school-brown/10 to-school-orange/10 p-6 rounded-xl">
              <h4 className="text-xl font-bold text-school-brown mb-3">Nelson Fonseca</h4>
              <p className="text-school-brown mb-3">
                Nascido em 3 de março de 1924, foi fundamental na gestão financeira e administrativa da OSE.
              </p>
              <ul className="space-y-1 text-sm text-school-brown">
                <li>• Diretor Financeiro da OSE</li>
                <li>• Garantiu sustentabilidade econômica</li>
                <li>• Membro ativo da comunidade</li>
                <li>• Iniciativas de bem-estar social</li>
              </ul>
              <p className="text-xs text-school-brown/70 mt-3">
                O CEI Nelson Fonseca leva seu nome em reconhecimento à sua contribuição.
              </p>
            </div>
          </div>
        </div>

        {/* Seção Expansões */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-school-brown mb-8 text-center">
            Expansão e Novos Horizontes
          </h3>
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h4 className="text-2xl font-bold text-school-brown mb-4">Colégio OSE Uirapuru (1989)</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-school-brown mb-3">
                    Idealizado por <strong>Arthur Fonseca Filho</strong>, <strong>Kiko Fonseca</strong> e 
                    <strong>Nelson Raul da Cunha Fonseca</strong>, o colégio nasceu como uma extensão da OSE, 
                    com a proposta de ser um espaço de inovação pedagógica.
                  </p>
                  <p className="text-school-brown text-sm">
                    "Uirapuru" foi escolhido por representar algo único e raro, simbolizando a busca 
                    por uma educação harmoniosa e de excelência.
                  </p>
                </div>
                <div>
                  <p className="text-school-brown mb-2">
                    <strong>Início:</strong> 130 alunos de 4 a 10 anos em 1989
                  </p>
                  <p className="text-school-brown mb-2">
                    <strong>Independência:</strong> 1999 - tornou-se administrativamente independente
                  </p>
                  <p className="text-school-brown text-sm">
                    Apesar da separação, manteve os mesmos princípios educacionais da OSE.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-school-orange/10 p-6 rounded-xl">
                <h4 className="text-xl font-bold text-school-brown mb-3">OSE Santa Rosália (1997)</h4>
                <p className="text-school-brown mb-3">
                  Nova unidade no bairro de Santa Rosália, iniciando em uma casa na Avenida Roberto Simonsen.
                </p>
                <ul className="space-y-1 text-sm text-school-brown">
                  <li>• 2000: Mudança para Rua Manoel Pereira e Silva, 80</li>
                  <li>• 2004: Implantação do Ensino Fundamental II</li>
                  <li>• 2010: Independência como Colégio COC Santa Rosália</li>
                </ul>
              </div>

              <div className="bg-school-brown/10 p-6 rounded-xl">
                <h4 className="text-xl font-bold text-school-brown mb-3">Faculdade IMAPES (2000)</h4>
                <p className="text-school-brown mb-3">
                  Expansão para o ensino superior com o Instituto Manchester Paulista de Ensino Superior.
                </p>
                <ul className="space-y-1 text-sm text-school-brown">
                  <li>• Administração com ênfase em RH</li>
                  <li>• Administração com ênfase em Comércio Exterior</li>
                  <li>• Biblioteconomia e Química</li>
                  <li>• Pico de 1.500 alunos</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Galeria Final - Legado Vivo */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-school-brown mb-8">
            Um Legado que Continua Vivo
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <OptimizedImage 
              src="/images/1092_1750717790205.jpg" 
              alt="Continuidade do legado OSE"
              className="w-full h-56 object-cover rounded-lg shadow-lg"
            />
            <OptimizedImage 
              src="/images/1295_1750717790207.jpg" 
              alt="Tradição renovada OSE"
              className="w-full h-56 object-cover rounded-lg shadow-lg"
            />
            <OptimizedImage 
              src="/images/0541_1750717790207.jpg" 
              alt="Futuro da educação na OSE"
              className="w-full h-56 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Valores que Permanecem */}
        <div className="bg-gradient-to-r from-school-orange to-school-brown rounded-xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-8">
            Um Século de Dedicação e Excelência
          </h3>
          <p className="text-lg mb-8 max-w-4xl mx-auto">
            A Organização Sorocabana de Ensino não é apenas uma instituição educacional, mas um legado vivo 
            de dedicação, inovação e compromisso com a sociedade. Desde sua fundação em 1924, a OSE tem se 
            adaptado às mudanças, superado desafios e mantido seu foco na formação integral dos estudantes.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={28} />
              </div>
              <h4 className="text-xl font-semibold mb-3">Excelência Acadêmica</h4>
              <p>Compromisso com um ensino de alta qualidade, atualizado e relevante</p>
            </div>
            <div>
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={28} />
              </div>
              <h4 className="text-xl font-semibold mb-3">Desenvolvimento Humano</h4>
              <p>Formação de cidadãos éticos, críticos e responsáveis</p>
            </div>
            <div>
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen size={28} />
              </div>
              <h4 className="text-xl font-semibold mb-3">Inovação Constante</h4>
              <p>Busca contínua por novas metodologias e tecnologias educacionais</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
