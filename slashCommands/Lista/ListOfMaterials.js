const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');
const { AppDataSource } = require('../../database/database.js');
const { InventoryMaterial } = require('../../entity/InventoryMaterial.js');
const { Material } = require('../../entity/Material.js');

const CACHE_DIR = path.join(__dirname, 'cache');
const CACHE_FILE = path.join(CACHE_DIR, 'Materiais.xlsx');
const CACHE_MINUTES = 10;

function clearSheet(sheet, startRow = 2) {
  const lastRow = sheet.lastRow?.number || startRow;

  if (lastRow >= startRow) {
    sheet.spliceRows(startRow, lastRow - startRow + 1);
  }
}

function hasCache(filePath, minutes) {
  if (!fs.existsSync(filePath)) return false;

  const stats = fs.statSync(filePath);
  const ageMs = Date.now() - stats.mtimeMs;

  return ageMs < minutes * 60 * 1000;
}

module.exports = {
  name: 'lista_de_materiais',
  category: 'Lista de Material',
  description: 'Este comando envia um arquivo Excel com Todas os Materiais',
  ownerOnly: false,

  run: async (client, interaction) => {
    await interaction.deferReply();

    if (hasCache(CACHE_FILE, CACHE_MINUTES)) {
      return interaction.editReply({
        files: [CACHE_FILE],
      });
    }

    const inventoryMaterialDB = await AppDataSource.getRepository(InventoryMaterial).find({order: {position: 'ASC'}});
    const materialDB = await AppDataSource.getRepository(Material).find({order: {position: 'ASC'}});
    const inventoryMaterialM2 = await AppDataSource.getRepository(InventoryMaterial).find({where: { unity: 'm²' }, order: { position: 'ASC' }});
    const inventoryMaterialM = await AppDataSource.getRepository(InventoryMaterial).find({where: { unity: 'm' }, order: { position: 'ASC' }});

    if (!inventoryMaterialDB.length || !materialDB.length) {
      return interaction.editReply('Não há materiais para gerar a planilha.');
    }

    const templatePath = path.join(__dirname, '../../assets/templateListOfMaterial.xlsx');
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(templatePath);

    const inventorySheet = workbook.getWorksheet('InventoryMaterial');
    const materialSheet = workbook.getWorksheet('Material');
    const auxiliarySheet = workbook.getWorksheet('Auxiliary');

    clearSheet(inventorySheet, 2);
    clearSheet(materialSheet, 2);
    clearSheet(auxiliarySheet, 2);

    inventoryMaterialDB.forEach((mat, index) => {
      const row = inventorySheet.getRow(index + 2);
      row.values = [
        mat.position,
        mat.modelDescription,
        mat.descriptionPTBR,
        mat.descriptionENUS,
        mat.unity,
        Number(mat.volume),
      ];
      row.commit();
    });

    materialDB.forEach((mat, index) => {
      const row = materialSheet.getRow(index + 2);
      row.values = [
        mat.position,
        mat.modelDescription,
        mat.descriptionPTBR,
        mat.descriptionENUS,
        Number(mat.density),
      ];
      row.commit();
    });

    inventoryMaterialM2.forEach((mat, index) => {
      const row = auxiliarySheet.getRow(index + 2);
      row.getCell(1).value = mat.position;
      row.getCell(2).value = mat.modelDescription;
      row.getCell(3).value = mat.descriptionPTBR;
      row.getCell(4).value = mat.descriptionENUS;
      row.getCell(5).value = mat.unity;
      row.getCell(6).value = Number(mat.volume);
      row.commit();
    });

    inventoryMaterialM.forEach((mat, index) => {
      const row = auxiliarySheet.getRow(index + 2);

      row.getCell(8).value = mat.position;
      row.getCell(9).value = mat.modelDescription;
      row.getCell(10).value = mat.descriptionPTBR;
      row.getCell(11).value = mat.descriptionENUS;
      row.getCell(12).value = mat.unity;
      row.getCell(13).value = Number(mat.volume);

      row.commit();
    });

    if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR);

    await workbook.xlsx.writeFile(CACHE_FILE);

    try {
      await interaction.editReply({ files: [CACHE_FILE] });
    } catch (error) {
      interaction.followUp(`<@${interaction.user.id}>, ocorreu um erro.\nErro: ${error.message}`);
    }
  },
};
