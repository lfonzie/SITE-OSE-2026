
import { Calendar, Award, Users, BookOpen, GraduationCap, Building2, Heart, Star, Trophy, Map } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { newImages } from "@/lib/image-verification";

export default function LegacySection() {
  return (
    <section id="legacy" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Introdução */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-school-brown mb-4">
            Um Século de <span className="text-school-orange">Excelência Educacional</span>
          </h2>
          <p className="text-xl text-school-brown max-w-4xl mx-auto mb-8">
            A Organização Sorocabana de Ensino (OSE) é uma instituição educacional que, há um século, 
            desempenha um papel fundamental na formação de milhares de estudantes em Sorocaba e região. 
            Sua trajetória está profundamente ligada ao desenvolvimento social, econômico e cultural da cidade.
          </p>
        </div>

        {/* Fundação da Escola do Comércio (1924) */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-school-orange/10 to-school-brown/10 rounded-xl p-8 md:p-12 mb-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-school-brown mb-6">
                  Fundação da Escola do Comércio de Sorocaba (1924)
                </h3>
                <div className="space-y-4 text-school-brown">
                  <p className="text-lg">
                    A jornada da OSE teve início em <strong>22 de outubro de 1924</strong>, com a fundação da 
                    Escola do Comércio de Sorocaba. Situada em um tradicional casarão na Rua Álvaro Soares, 
                    a escola foi pioneira no ensino comercial no interior do estado de São Paulo.
                  </p>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className="text-xl font-bold text-school-brown mb-3">Contexto Histórico</h4>
                    <p>
                      Na década de 1920, Sorocaba passava por um período de transição, deixando de ser uma cidade 
                      predominantemente agrária para abraçar a industrialização. A necessidade de profissionais 
                      qualificados em comércio e administração era evidente.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <OptimizedImage 
                  src={newImages.horizontal6} 
                  alt="Fundação da Escola do Comércio de Sorocaba em 1924"
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
                    alt="História educacional OSE"
                    className="w-full h-32 object-cover rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* A Chegada de Dr. Arthur Cyrillo Freire (1936) */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-school-brown mb-6">
              A Chegada de Dr. Arthur Cyrillo Freire e Família (1936)
            </h3>
            <p className="text-xl text-school-brown max-w-4xl mx-auto">
              Em 1936, a história da escola mudou radicalmente com a chegada de <strong>Dr. Arthur Cyrillo Freire</strong>, 
              sua esposa <strong>Dona Tercila Bosqueti Fonseca</strong> e os dois filhos dela, <strong>Arthur Fonseca</strong> e 
              <strong>Nelson Fonseca</strong>, que chegavam de Santos.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div className="bg-gradient-to-br from-school-orange/15 to-school-brown/15 p-8 rounded-xl">
              <h4 className="text-2xl font-bold text-school-brown mb-6">Biografia de Dr. Arthur Cyrillo Freire</h4>
              <div className="space-y-4 text-school-brown">
                <p className="font-semibold text-lg">
                  Nascido em 31 de julho de 1878, em Fortaleza, Ceará
                </p>
                <p className="mb-4">
                  Dr. Arthur era um homem de múltiplos talentos: advogado, educador, jornalista e ativista social.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Trophy className="text-school-orange mt-1 flex-shrink-0" size={20} />
                    <div>
                      <strong>Promotor Público:</strong> Atuou na comarca de Borba, no Amazonas
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <BookOpen className="text-school-orange mt-1 flex-shrink-0" size={20} />
                    <div>
                      <strong>Advogado e Jornalista em Santos:</strong> Foi advogado da Companhia Antártica Paulista e proprietário do jornal "A Gazeta do Povo"
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Users className="text-school-orange mt-1 flex-shrink-0" size={20} />
                    <div>
                      <strong>Defensor dos Trabalhadores:</strong> Liderou campanhas pelos direitos dos trabalhadores das docas de Santos
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Star className="text-school-orange mt-1 flex-shrink-0" size={20} />
                    <div>
                      <strong>Atuação Política:</strong> Participou da Revolução Constitucionalista de 1932
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
                <h4 className="text-xl font-bold text-school-brown mb-4">A Família Fonseca</h4>
                <p className="text-school-brown mb-4">
                  <strong>Dona Tercila Bosqueti Fonseca</strong> era viúva de Raul Serafim Fonseca. Do casamento com Raul, 
                  teve dois filhos: <strong>Arthur Fonseca</strong> e <strong>Nelson Fonseca</strong>. Ambos se tornariam 
                  figuras centrais na continuidade do legado educacional.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
                <h4 className="text-xl font-bold text-school-brown mb-4">Aquisição e Transformação</h4>
                <p className="text-school-brown">
                  Ao chegarem em Sorocaba, Dr. Arthur, Dona Tercila, Arthur e Nelson adquiriram a pequena 
                  Escola do Comércio, que contava com apenas <strong>42 alunos</strong>. Juntos, iniciaram um 
                  trabalho árduo de expansão e melhoria da instituição.
                </p>
              </div>

              <OptimizedImage 
                src={newImages.horizontal9} 
                alt="Dr. Arthur Cyrillo Freire e família"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Mudança para Rua Benedito Pires (1941) */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-school-brown/10 to-school-orange/10 rounded-xl p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-school-brown mb-6">
                  Mudança para a Rua Benedito Pires (1941)
                </h3>
                <p className="text-lg text-school-brown mb-4">
                  Em 1941, a escola mudou-se para um prédio maior na Rua Benedito Pires. Este momento ficou 
                  marcado pela participação ativa dos alunos, que carregaram os móveis e carteiras até a nova sede.
                </p>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <p className="text-school-brown font-medium italic">
                    "O evento simbolizou o forte vínculo entre a escola e sua comunidade acadêmica."
                  </p>
                </div>
              </div>
              <OptimizedImage 
                src={newImages.horizontal10} 
                alt="Mudança para Rua Benedito Pires em 1941"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Consolidação como OSE (1946) */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-school-brown mb-6">
              Consolidação como Organização Sorocabana de Ensino (1946)
            </h3>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <p className="text-lg text-school-brown mb-6">
                  Em 1946, a instituição ampliou seu currículo, inaugurando o curso ginasial e passando a ser 
                  conhecida oficialmente como <strong>Organização Sorocabana de Ensino (OSE)</strong>.
                </p>
                
                <h4 className="text-xl font-bold text-school-brown mb-4">Filosofia Educacional</h4>
                <p className="text-school-brown mb-6">
                  A OSE sempre se destacou por sua abordagem humanista, valorizando o desenvolvimento integral 
                  do aluno. O foco não era apenas acadêmico, mas também moral e ético.
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="bg-school-orange text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Heart size={20} />
                    </div>
                    <h5 className="font-bold text-school-brown">Humanismo</h5>
                  </div>
                  <div className="text-center">
                    <div className="bg-school-orange text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <BookOpen size={20} />
                    </div>
                    <h5 className="font-bold text-school-brown">Excelência</h5>
                  </div>
                  <div className="text-center">
                    <div className="bg-school-orange text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users size={20} />
                    </div>
                    <h5 className="font-bold text-school-brown">Cidadania</h5>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <OptimizedImage 
                src={newImages.horizontal11} 
                alt="Consolidação da OSE em 1946"
                className="w-full h-40 object-cover rounded-lg shadow-lg"
              />
              <OptimizedImage 
                src={newImages.horizontal12} 
                alt="Filosofia educacional OSE"
                className="w-full h-40 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Timeline Histórica */}
        <div className="mb-20">
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
              <h4 className="text-xl font-bold text-school-brown mb-2">1936</h4>
              <p className="text-school-brown text-sm">Chegada da família Dr. Arthur Cyrillo Freire</p>
            </div>
            <div className="text-center">
              <div className="bg-school-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 size={24} />
              </div>
              <h4 className="text-xl font-bold text-school-brown mb-2">1946</h4>
              <p className="text-school-brown text-sm">Consolidação como Organização Sorocabana de Ensino</p>
            </div>
            <div className="text-center">
              <div className="bg-school-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={24} />
              </div>
              <h4 className="text-xl font-bold text-school-brown mb-2">1955</h4>
              <p className="text-school-brown text-sm">Nova sede na Rua da Penha, 620</p>
            </div>
          </div>
        </div>

        {/* Legado dos Fundadores */}
        <div className="mb-20">
          <h3 className="text-4xl font-bold text-school-brown mb-12 text-center">
            Legado dos Fundadores
          </h3>
          
          {/* Dr. Arthur Cyrillo Freire */}
          <div className="mb-12">
            <div className="bg-gradient-to-br from-school-orange/15 to-school-brown/15 p-8 md:p-12 rounded-xl">
              <h4 className="text-2xl font-bold text-school-brown mb-6 text-center">
                Dr. Arthur Cyrillo Freire - O Visionário
              </h4>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <p className="text-school-brown mb-4">
                    O legado de Dr. Arthur Cyrillo Freire perdura até os dias atuais, sendo reconhecido como 
                    um dos pilares da educação em Sorocaba.
                  </p>
                  <h5 className="text-xl font-bold text-school-brown mb-3">Homenagens e Reconhecimento</h5>
                  <ul className="space-y-2 text-school-brown">
                    <li>• <strong>Título de Cidadão Sorocabano</strong> - Em reconhecimento aos seus serviços prestados</li>
                    <li>• <strong>Escola Estadual Dr. Arthur Cyrillo Freire</strong> - Escola homenageada com seu nome</li>
                    <li>• <strong>Contribuições Duradouras</strong> - Seus princípios orientam a OSE até hoje</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <blockquote className="text-school-brown italic text-lg">
                    "Sua visão progressista e seu compromisso com a justiça social influenciaram 
                    diretamente a missão e os valores da OSE."
                  </blockquote>
                </div>
              </div>
            </div>
          </div>

          {/* Arthur e Nelson Fonseca */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-school-orange/10 to-school-brown/10 p-6 rounded-xl">
              <h4 className="text-xl font-bold text-school-brown mb-3">Professor Arthur Fonseca</h4>
              <p className="text-school-brown mb-3 text-sm">
                <strong>Nascido em 4 de julho de 1922</strong> - Dedicou sua vida à educação e ao desenvolvimento da OSE.
              </p>
              <ul className="space-y-1 text-sm text-school-brown">
                <li>• <strong>Direção e modernização da OSE</strong></li>
                <li>• <strong>Vereador em Sorocaba (1947-1950)</strong></li>
                <li>• <strong>Secretário de Educação e Saúde (1969-1970)</strong></li>
                <li>• <strong>Deputado Federal (1971-1975)</strong></li>
              </ul>
              <p className="text-xs text-school-brown/70 mt-3">
                A Avenida Professor Arthur Fonseca foi nomeada em sua homenagem.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-school-brown/10 to-school-orange/10 p-6 rounded-xl">
              <h4 className="text-xl font-bold text-school-brown mb-3">Nelson Fonseca</h4>
              <p className="text-school-brown mb-3 text-sm">
                <strong>Nascido em 3 de março de 1924</strong> - Fundamental na gestão financeira e administrativa da OSE.
              </p>
              <ul className="space-y-1 text-sm text-school-brown">
                <li>• <strong>Diretor Financeiro da OSE</strong></li>
                <li>• <strong>Garantiu sustentabilidade econômica</strong></li>
                <li>• <strong>Membro ativo da comunidade</strong></li>
                <li>• <strong>Iniciativas de bem-estar social</strong></li>
              </ul>
              <p className="text-xs text-school-brown/70 mt-3">
                O CEI Nelson Fonseca leva seu nome em reconhecimento à sua contribuição.
              </p>
            </div>
          </div>
        </div>

        {/* Anos 1955-1980: Expansão */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-school-brown mb-8">
            Anos 1955-1980: Expansão e Modernização
          </h3>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
                <p className="text-school-brown mb-4">
                  Em 1955, a OSE investiu em um novo prédio na <strong>Rua da Penha, 620</strong>. 
                  Com instalações modernas para a época, a instituição passou a contar com mais de 
                  40 salas de aula, quatro laboratórios de química, uma empresa júnior e um amplo pátio, 
                  onde a icônica jabuticabeira se tornou um símbolo da escola.
                </p>
                <p className="text-school-brown font-semibold">
                  Na década de 1980, a OSE atingiu um marco significativo, contando com 
                  <strong> mais de 2.000 alunos</strong> apenas na unidade central.
                </p>
              </div>

              <div className="bg-gradient-to-r from-school-orange/10 to-school-brown/10 p-6 rounded-lg">
                <h4 className="text-xl font-bold text-school-brown mb-4">Destaques do Período</h4>
                <ul className="space-y-2 text-school-brown">
                  <li>• <strong>Crescimento exponencial do corpo discente</strong></li>
                  <li>• <strong>Inovação pedagógica e metodologias modernas</strong></li>
                  <li>• <strong>Cursos técnicos:</strong> Química, Contabilidade, Administração</li>
                  <li>• <strong>Implementação de Informática e Magistério</strong></li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <OptimizedImage 
                src={newImages.horizontal13} 
                alt="Expansão da OSE nos anos 1955-1980"
                className="w-full h-40 object-cover rounded-lg shadow-lg"
              />
              <OptimizedImage 
                src={newImages.horizontal14} 
                alt="Modernização das instalações OSE"
                className="w-full h-40 object-cover rounded-lg shadow-lg"
              />
              <OptimizedImage 
                src={newImages.horizontal15} 
                alt="Crescimento estudantil OSE"
                className="w-full h-40 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Expansões e Novos Horizontes */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-school-brown mb-12 text-center">
            Expansão e Novos Horizontes
          </h3>
          
          {/* Colégio OSE Uirapuru (1989) */}
          <div className="mb-12">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <h4 className="text-2xl font-bold text-school-brown mb-6">Colégio OSE Uirapuru (1989)</h4>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <p className="text-school-brown mb-4">
                    Idealizado por <strong>Arthur Fonseca Filho</strong>, <strong>Kiko Fonseca</strong> e 
                    <strong>Nelson Raul da Cunha Fonseca</strong>, o colégio nasceu como uma extensão da OSE, 
                    com a proposta de ser um espaço de inovação pedagógica.
                  </p>
                  
                  <div className="bg-school-orange/10 p-4 rounded-lg mb-4">
                    <blockquote className="text-school-brown italic">
                      "Percebemos que havia a necessidade de criar um ambiente educacional que unisse tradição e inovação. 
                      O Uirapuru nasceu desse sonho."
                      <footer className="text-sm mt-2">- Arthur Fonseca Filho</footer>
                    </blockquote>
                  </div>

                  <p className="text-school-brown text-sm">
                    <strong>"Uirapuru"</strong> foi escolhido por representar algo único e raro, simbolizando a busca 
                    por uma educação harmoniosa e de excelência.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-school-brown/10 p-4 rounded-lg">
                    <h5 className="font-bold text-school-brown mb-2">Início das Atividades</h5>
                    <ul className="text-sm text-school-brown space-y-1">
                      <li>• <strong>1989:</strong> 130 alunos de 4 a 10 anos</li>
                      <li>• <strong>Início:</strong> Apenas período da tarde</li>
                      <li>• <strong>1999:</strong> Tornou-se administrativamente independente</li>
                    </ul>
                  </div>
                  
                  <div className="bg-school-orange/10 p-4 rounded-lg">
                    <h5 className="font-bold text-school-brown mb-2">Filosofia</h5>
                    <p className="text-sm text-school-brown">
                      Mesclar métodos pedagógicos inovadores com os valores tradicionais da OSE, 
                      mantendo a excelência do corpo docente.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* OSE Santa Rosália e IMAPES */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-school-orange/10 to-school-brown/10 p-6 rounded-xl">
              <h4 className="text-xl font-bold text-school-brown mb-4">OSE Santa Rosália (1997)</h4>
              <p className="text-school-brown mb-4">
                Nova unidade no bairro de Santa Rosália, uma região nobre de Sorocaba, 
                iniciando em uma casa na Avenida Roberto Simonsen.
              </p>
              <ul className="space-y-2 text-sm text-school-brown">
                <li>• <strong>2000:</strong> Mudança para Rua Manoel Pereira e Silva, 80</li>
                <li>• <strong>2004:</strong> Implantação do Ensino Fundamental II</li>
                <li>• <strong>2010:</strong> Independência como Colégio COC Santa Rosália</li>
              </ul>
              
              <div className="mt-4 bg-white p-3 rounded-lg">
                <blockquote className="text-school-brown italic text-sm">
                  "Expandir para Santa Rosália foi uma decisão estratégica. Queríamos levar a qualidade da OSE para mais famílias."
                  <footer className="text-xs mt-1">- Nelson Raul</footer>
                </blockquote>
              </div>
            </div>

            <div className="bg-gradient-to-br from-school-brown/10 to-school-orange/10 p-6 rounded-xl">
              <h4 className="text-xl font-bold text-school-brown mb-4">Faculdade IMAPES (2000)</h4>
              <p className="text-school-brown mb-4">
                Expansão para o ensino superior com o Instituto Manchester Paulista de Ensino Superior.
              </p>
              <ul className="space-y-2 text-sm text-school-brown">
                <li>• <strong>Administração</strong> com ênfase em RH</li>
                <li>• <strong>Administração</strong> com ênfase em Comércio Exterior</li>
                <li>• <strong>Biblioteconomia</strong> e <strong>Química</strong></li>
                <li>• <strong>Pico:</strong> 1.500 alunos</li>
              </ul>
              
              <div className="mt-4 bg-white p-3 rounded-lg">
                <blockquote className="text-school-brown italic text-sm">
                  "A criação da IMAPES foi um passo natural para atender às demandas da região."
                  <footer className="text-xs mt-1">- Kiko Fonseca</footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>

        {/* Anos 2000: Continuidade */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-school-brown mb-8">
            Anos 2000: Continuidade e Novos Rumos
          </h3>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
                <h4 className="text-xl font-bold text-school-brown mb-4">Liderança de Kiko Fonseca</h4>
                <p className="text-school-brown mb-4">
                  Após 2010, <strong>Kiko Fonseca</strong>, que atuava como diretor financeiro, assumiu o cargo de 
                  diretor geral da OSE. Sua visão estratégica contribuiu para a modernização da instituição.
                </p>
                <div className="bg-school-orange/10 p-4 rounded-lg">
                  <blockquote className="text-school-brown italic">
                    "Assumir a direção geral foi um grande desafio e uma honra. Meu objetivo sempre foi manter 
                    os valores que herdamos, mas também inovar."
                    <footer className="text-sm mt-2">- Kiko Fonseca</footer>
                  </blockquote>
                </div>
              </div>

              <div className="bg-gradient-to-br from-school-orange/10 to-school-brown/10 p-6 rounded-lg">
                <h4 className="text-xl font-bold text-school-brown mb-4">Modernização e Inovação</h4>
                <ul className="space-y-2 text-school-brown">
                  <li>• <strong>Tecnologia Educacional:</strong> Plataformas digitais e recursos tecnológicos</li>
                  <li>• <strong>Formação Continuada:</strong> Capacitação constante dos professores</li>
                  <li>• <strong>Projetos Sociais:</strong> Iniciativas de inclusão e bem-estar social</li>
                  <li>• <strong>Parcerias Estratégicas:</strong> Colaborações para estágios e empregabilidade</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <OptimizedImage 
                src="/images/1092_1750717790205.jpg" 
                alt="Modernização OSE anos 2000"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
              <OptimizedImage 
                src="/images/1295_1750717790207.jpg" 
                alt="Inovação tecnológica OSE"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Galeria de Memórias */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-school-brown mb-8">
            Memórias de Uma Trajetória Centenária
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <OptimizedImage 
              src={newImages.horizontal16} 
              alt="Momentos históricos da OSE"
              className="w-full h-48 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            />
            <OptimizedImage 
              src={newImages.horizontal17} 
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

        {/* Impacto na Sociedade */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-school-brown mb-12">
            Impacto na Sociedade
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center">
              <div className="bg-school-orange text-white w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Trophy size={32} />
              </div>
              <h4 className="text-xl font-bold text-school-brown mb-3">Desenvolvimento Econômico</h4>
              <p className="text-school-brown">
                Formação de profissionais que impulsionaram o crescimento de Sorocaba e região
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center">
              <div className="bg-school-orange text-white w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users size={32} />
              </div>
              <h4 className="text-xl font-bold text-school-brown mb-3">Liderança Social</h4>
              <p className="text-school-brown">
                Ex-alunos ocupam posições de destaque em diversas áreas da sociedade
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center">
              <div className="bg-school-orange text-white w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <GraduationCap size={32} />
              </div>
              <h4 className="text-xl font-bold text-school-brown mb-3">Excelência Educacional</h4>
              <p className="text-school-brown">
                Referência em qualidade educacional há um século
              </p>
            </div>
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
