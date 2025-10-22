const { AppDataSource } = require('../../../database/database');
const { Material } = require('../../../entity/Material');

async function consolidateMaterialsFinishedProduct (intermediaryProductMaterials) {
  if (!Array.isArray(intermediaryProductMaterials) || intermediaryProductMaterials.length === 0) {
    return { nameMaterial: '', error: true };
  }

  const uniqueIntermediaryProductMaterials = [...new Set(intermediaryProductMaterials)];
  const finishedProductMaterials = [];  
  let error = false;

  const knownMaterials = (await AppDataSource.getRepository(Material)
    .createQueryBuilder('m')
    .select('m.modelDescription', 'modelDescription')
    .where('m.modelDescription IN (:...names)', { names: uniqueIntermediaryProductMaterials })
    .orderBy('m.position', 'ASC')
    .getRawMany()
  ).map(m => m.modelDescription);

  finishedProductMaterials.push(...knownMaterials);

  for (const name of intermediaryProductMaterials) {
    if (!knownMaterials.includes(name)) {
      finishedProductMaterials.push(name);
      error = true;
    }
  }

  return {
    nameMaterial: finishedProductMaterials.join(' / '),
    error
  };
}

module.exports = { consolidateMaterialsFinishedProduct };