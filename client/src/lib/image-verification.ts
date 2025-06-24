
// Verificação de Imagens - OSE
// Este arquivo lista todas as imagens disponíveis e como usá-las

// Imagens Principais (primeira série)
export const mainImages = {
  // Educação Infantil e atividades gerais
  infantil1: "/attached_assets/0354_1750717790205.jpg", // Atividades educacionais
  infantil2: "/attached_assets/0312_1750717790204.jpg", // Ambiente escolar
  infantil3: "/attached_assets/0700_1750717790204.jpg", // Interação alunos
  
  // Fundamental I
  fund1_1: "/attached_assets/0934_1750717790206.jpg", // Sala de aula
  fund1_2: "/attached_assets/1105_1750717790206.jpg", // Atividades colaborativas
  fund1_3: "/attached_assets/0581_1750717790206.jpg", // Projetos educacionais
  fund1_4: "/attached_assets/0491_1750717790207.jpg", // Aprendizado
  fund1_5: "/attached_assets/0541_1750717790207.jpg", // Desenvolvimento
  fund1_6: "/attached_assets/1295_1750717790207.jpg", // Atividades culturais
  
  // Fundamental II
  fund2_1: "/attached_assets/0023_1750717790208.jpg", // Estudos avançados
  fund2_2: "/attached_assets/0378_1750717790208.jpg", // Tecnologia educacional
  fund2_3: "/attached_assets/1285_1750717790208.jpg", // Preparação acadêmica
  
  // Geral/Institucional
  campus1: "/attached_assets/0905_1750717790206.jpg", // Campus e instalações
  materiais: "/attached_assets/1068_1750717790205.jpg", // Material didático
  tecnologia: "/attached_assets/1092_1750717790205.jpg", // Recursos tecnológicos
};

// Imagens Secundárias (segunda série - mais recentes)
export const secondaryImages = {
  // Ensino Médio
  medio1: "/attached_assets/0312_1750719589609.jpg",
  medio2: "/attached_assets/0354_1750719589610.jpg", 
  medio3: "/attached_assets/0491_1750719589611.jpg",
  medio4: "/attached_assets/0541_1750719589611.jpg",
  medio5: "/attached_assets/0581_1750719589610.jpg",
  medio6: "/attached_assets/0700_1750719589609.jpg",
  
  // Fundamental II (série 2)
  fund2_alt1: "/attached_assets/0023_1750719589611.jpg",
  fund2_alt2: "/attached_assets/0378_1750719589611.jpg", 
  fund2_alt3: "/attached_assets/1285_1750719589611.jpg",
  
  // Outros
  geral1: "/attached_assets/0905_1750719589610.jpg",
  geral2: "/attached_assets/0934_1750719589610.jpg",
  geral3: "/attached_assets/1068_1750719589610.jpg",
  geral4: "/attached_assets/1092_1750719589610.jpg",
  geral5: "/attached_assets/1105_1750719589610.jpg",
  geral6: "/attached_assets/1295_1750719589611.jpg",
};

// Logos e Assets Especiais
export const logos = {
  amplia: "/attached_assets/AMPLIA_Logotipo-versoes_1750779294903.png",
  isaac: "/attached_assets/616841d439101013bdc4c67c_isaac-log0-01_1750779294900.png",
  arvore: "/attached_assets/LogoArvore_1750797550181.png",
  codeose: "/attached_assets/codeose23_1750779294902.png",
  acm: "/attached_assets/LogoACM_1750801133344.jpg",
  macmillan: "/attached_assets/LogoMacmillan_1750801133344.png",
  google: "/attached_assets/GoogleEduc_1750801413575.jpg"
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
