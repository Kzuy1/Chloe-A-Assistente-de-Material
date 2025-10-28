const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const { AppDataSource } = require('../../database/database.js');
const { InventoryMaterial } = require('../../entity/InventoryMaterial.js');

module.exports = {
  name: 'lista_de_materiais',
  category: 'Lista de Material',
  description: 'Este comando envia um arquivo Excel com Todas os Materiais',
  ownerOnly: false,

  run: async (client, interaction) => {
    await interaction.deferReply();

    // Busca todos os materiais do banco
    const materials = await AppDataSource.getRepository(InventoryMaterial).find({order: {position: 'ASC'}});

    if (!materials.length) {
      return interaction.editReply('Não há materiais para gerar a planilha.');
    }

    // Mapeia para o formato Excel
    const sheetData = materials.map(mat => ({
      POS: mat.position,
      ModelDescription: mat.modelDescription,
      DescriptionPTBR: mat.descriptionPTBR,
      DescriptionENUS: mat.descriptionENUS,
      Unity: mat.unity,
      SectionArea: Number(mat.volume),
    }));

    // Cria workbook e worksheet
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(sheetData);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'InventoryMaterial');

    // Define caminho temporário
    const tempDir = path.join(__dirname, 'download');
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

    const filePath = path.join(tempDir, 'Materiais.xlsx');

    // Salva planilha
    xlsx.writeFile(workbook, filePath);

    try {
      // Envia para o Discord
      await interaction.editReply({ files: [filePath] });
    } finally {
      // Remove o arquivo temporário
      fs.unlinkSync(filePath);
    }
  },
};
