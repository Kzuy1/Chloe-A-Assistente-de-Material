const { AppDataSource } = require('../../../database/database');
const { InventoryMaterial } = require('../../../entity/InventoryMaterial.js');
const { getMaterial } = require('./getMaterial.js');

async function getInvetoryMaterial (modelInvetoryMaterial, material, standard) {
  const inventoryMaterialDB = await AppDataSource.getRepository(InventoryMaterial).findOne({
    where: [
      { modelDescription: modelInvetoryMaterial },
      { descriptionPTBR: modelInvetoryMaterial },
      { descriptionENUS: modelInvetoryMaterial },
    ],
  });
  const materialDB = await getMaterial(material);

  if(inventoryMaterialDB) {
    return {
      position: inventoryMaterialDB.position * 100 + materialDB.pos,
      modelDescription: modelInvetoryMaterial,
      description: standard === 'europe' ? inventoryMaterialDB.descriptionENUS : inventoryMaterialDB.descriptionPTBR,
      unity: inventoryMaterialDB.unity,
      material: materialDB.nome,
      weight: (inventoryMaterialDB.volume * materialDB.densidade / 10**6),
      hasFound: true,
    };
  }

  return {
    position: await AppDataSource.getRepository(InventoryMaterial).count() * 101,
    modelDescription: modelInvetoryMaterial,
    description: modelInvetoryMaterial,
    unity: 'NULL',
    material: materialDB.nome,
    weight: 0,
    hasFound: false,
  };
}

module.exports = { getInvetoryMaterial };