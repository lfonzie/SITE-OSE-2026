
// Verificação de Imagens - OSE
// Este arquivo lista todas as imagens disponíveis e como usá-las

// Imagens Principais (primeira série)
export const mainImages = {
  // Educação Infantil e atividades gerais
  infantil1: "/images/0354_1750717790205.jpg", // Atividades educacionais
  infantil2: "/images/0312_1750717790204.jpg", // Ambiente escolar
  infantil3: "/images/0700_1750717790204.jpg", // Interação alunos
  
  // Fundamental I
  fund1_1: "/images/0934_1750717790206.jpg", // Sala de aula
  fund1_2: "/images/1105_1750717790206.jpg", // Atividades colaborativas
  fund1_3: "/images/0581_1750717790206.jpg", // Projetos educacionais
  fund1_4: "/images/0491_1750717790207.jpg", // Aprendizado
  fund1_5: "/images/0541_1750717790207.jpg", // Desenvolvimento
  fund1_6: "/images/1295_1750717790207.jpg", // Atividades culturais
  
  // Fundamental II
  fund2_1: "/images/0023_1750717790208.jpg", // Estudos avançados
  fund2_2: "/images/0378_1750717790208.jpg", // Tecnologia educacional
  fund2_3: "/images/1285_1750717790208.jpg", // Preparação acadêmica
  
  // Geral/Institucional
  campus1: "/images/0905_1750717790206.jpg", // Campus e instalações
  materiais: "/images/1068_1750717790205.jpg", // Material didático
  tecnologia: "/images/1092_1750717790205.jpg", // Recursos tecnológicos
};

// Imagens Secundárias (segunda série - mais recentes)
export const secondaryImages = {
  // Ensino Médio
  medio1: "/images/0312_1750719589609.jpg",
  medio2: "/images/0354_1750719589610.jpg", 
  medio3: "/images/0491_1750719589611.jpg",
  medio4: "/images/0541_1750719589611.jpg",
  medio5: "/images/0581_1750719589610.jpg",
  medio6: "/images/0700_1750719589609.jpg",
  
  // Fundamental II (série 2)
  fund2_alt1: "/images/0023_1750719589611.jpg",
  fund2_alt2: "/images/0378_1750719589611.jpg", 
  fund2_alt3: "/images/1285_1750719589611.jpg",
  
  // Outros
  geral1: "/images/0905_1750719589610.jpg",
  geral2: "/images/0934_1750719589610.jpg",
  geral3: "/images/1068_1750719589610.jpg",
  geral4: "/images/1092_1750719589610.jpg",
  geral5: "/images/1105_1750719589610.jpg",
  geral6: "/images/1295_1750719589611.jpg",
};

// Logos e Assets Especiais
export const logos = {
  amplia: "/images/AMPLIA_Logotipo-versoes_1750779294903.png",
  isaac: "/images/616841d439101013bdc4c67c_isaac-log0-01_1750779294900.png",
  arvore: "/images/LogoArvore_1750797550181.png",
  codeose: "/images/codeose23_1750779294902.png",
  acm: "/images/LogoACM_1750801133344.jpg",
  macmillan: "/images/LogoMacmillan_1750801133344.png",
  google: "/images/GoogleEduc_1750801413575.jpg"
};

// Exemplo de uso correto:
/*
import { OptimizedImage } from "@/components/ui/optimized-image";
import img1 from "@assets/0354_1750717790205.jpg";

<OptimizedImage 
  src={img1}
  alt="Descrição detalhada da imagem"
  className="w-full h-64 object-cover rounded-lg shadow-lg"
/>
*/
