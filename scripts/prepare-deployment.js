
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Preparando configurações para deployment...');

const configPath = path.join(process.cwd(), 'data', 'page-configs.json');

if (!fs.existsSync(configPath)) {
  console.log('❌ Arquivo de configurações não encontrado');
  process.exit(1);
}

try {
  const data = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  let updatedCount = 0;

  // Marcar todas as configurações como prontas para deployment
  const updatedData = Object.entries(data).reduce((acc, [key, config]) => {
    acc[key] = {
      ...config,
      savedForDeployment: true,
      lastModified: new Date().toISOString(),
      deploymentReady: true
    };
    updatedCount++;
    return acc;
  }, {});

  fs.writeFileSync(configPath, JSON.stringify(updatedData, null, 2));
  
  console.log(`✅ ${updatedCount} configurações preparadas para deployment`);
  console.log('📦 Todas as imagens e configurações serão preservadas no deployment');
  
} catch (error) {
  console.error('❌ Erro ao preparar deployment:', error);
  process.exit(1);
}
