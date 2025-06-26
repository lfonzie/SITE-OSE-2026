// Verificação de Imagens - OSE
// Este arquivo lista todas as imagens disponíveis e como usá-las

// Imagens Principais (ATUALIZADAS - usando novos arquivos)
export const mainImages = {
  // Educação Infantil e atividades gerais
  infantil1: "/images/1.png", // Atividades educacionais
  infantil2: "/images/2.png", // Ambiente escolar
  infantil3: "/images/3.png", // Interação alunos

  // Fundamental I
  fund1_1: "/images/4.png", // Sala de aula
  fund1_2: "/images/5.png", // Atividades colaborativas
  fund1_3: "/images/6.png", // Projetos educacionais
  fund1_4: "/images/7.png", // Aprendizado
  fund1_5: "/images/8.png", // Desenvolvimento
  fund1_6: "/images/9.png", // Atividades culturais

  // Fundamental II
  fund2_1: "/images/10.png", // Estudos avançados
  fund2_2: "/images/11.png", // Tecnologia educacional
  fund2_3: "/images/12.png", // Preparação acadêmica

  // Geral/Institucional
  campus1: "/images/13.png", // Campus e instalações
  materiais: "/images/14.png", // Material didático
  tecnologia: "/images/15.png", // Recursos tecnológicos
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

// Logos e Assets Especiais - ATUALIZADOS COM NOVOS NOMES
export const logos = {
  amplia: "/images/AMPLIA_Logotipo-versoes_1750779294903_1750801133345.png",
  isaac: "/images/616841d439101013bdc4c67c_isaac-log0-01_1750779294900.png",
  arvore: "/images/LogoArvore_1750797550181.png",
  codeose: "/images/codeose23_1750779294902.png",
  acm: "/images/LogoACM_1750801133344.jpg",
  macmillan: "/images/LogoMacmillan_1750801133344.png",
  google: "/images/GoogleEduc_1750801413575.jpg"
};

// Novas imagens disponíveis
export const newImages = {
  // Imagens numeradas principais
  img1: "/images/1.png",
  img2: "/images/2.png",
  img3: "/images/3.png",
  img4: "/images/4.png",
  img5: "/images/5.png",
  img6: "/images/6.png",
  img7: "/images/7.png",
  img8: "/images/8.png",
  img9: "/images/9.png",
  img10: "/images/10.png",
  img11: "/images/11.png",
  img12: "/images/12.png",
  img13: "/images/13.png",
  img14: "/images/14.png",
  img15: "/images/15.png",
  img16: "/images/16.png",
  img17: "/images/17.png",
  img18: "/images/18.png",
  img19: "/images/19.png",
  img20: "/images/20.png",
  img21: "/images/21.png",
  img22: "/images/22.png",
  img23: "/images/23.png",
  img24: "/images/24.png",
  img25: "/images/25.png",
  img26: "/images/26.png",
  img27: "/images/27.png",
  img28: "/images/28.png",
  img29: "/images/29.png",
  img30: "/images/30.png",
  img31: "/images/31.png",
  img32: "/images/32.png",
  img33: "/images/33.png",
  img34: "/images/34.png",
  img35: "/images/35.png",

  // Imagens horizontais
  horizontal1: "/images/horizontal_1.png",
  horizontal2: "/images/horizontal_2.png",
  horizontal3: "/images/horizontal_3.png",
  horizontal4: "/images/horizontal_4.png",
  horizontal5: "/images/horizontal_5.png",
  horizontal6: "/images/horizontal_6.png",
  horizontal7: "/images/horizontal_7.png",
  horizontal8: "/images/horizontal_8.png",
  horizontal9: "/images/horizontal_9.png",
  horizontal10: "/images/horizontal_10.png",
  horizontal11: "/images/horizontal_11.png",
  horizontal12: "/images/horizontal_12.png",
  horizontal13: "/images/horizontal_13.png",
  horizontal14: "/images/horizontal_14.png",
  horizontal15: "/images/horizontal_15.png",
  horizontal16: "/images/horizontal_16.png",
  horizontal17: "/images/horizontal_17.png",
  horizontal18: "/images/horizontal_18.png",
  horizontal19: "/images/horizontal_19.png",
  horizontal20: "/images/horizontal_20.png",
  horizontal21: "/images/horizontal_21.png",
  horizontal22: "/images/horizontal_22.png",
  horizontal23: "/images/horizontal_23.png",
  horizontal24: "/images/horizontal_24.png",
  horizontal25: "/images/horizontal_25.png",
  horizontal26: "/images/horizontal_26.png",
  horizontal27: "/images/horizontal_27.png",
  horizontal28: "/images/horizontal_28.png",
  horizontal29: "/images/horizontal_29.png",
  horizontal30: "/images/horizontal_30.png",
  horizontal31: "/images/horizontal_31.png",
  horizontal32: "/images/horizontal_32.png",
  horizontal33: "/images/horizontal_33.png",
  horizontal34: "/images/horizontal_34.png",
  horizontal35: "/images/horizontal_35.png",
  horizontal36: "/images/horizontal_36.png"
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