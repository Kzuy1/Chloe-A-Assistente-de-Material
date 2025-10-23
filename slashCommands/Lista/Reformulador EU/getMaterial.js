const { AppDataSource } = require('../../../database/database');
const { Material } = require('../../../entity/Material');

async function getMaterial (material) {
  const materialDB = await AppDataSource.getRepository(Material).findOne({ where: { modelDescription: material } });

  if(materialDB){
    return {
      pos: materialDB.position,
      nome: materialDB.modelDescription,
      densidade: materialDB.density/1000,
      modeloMod: material
    };
  }
  
  return {
    pos: await AppDataSource.getRepository(Material).count(),
    nome: material, 
    densidade: 0, 
    modeloMod: material
  };
}

module.exports = { getMaterial };