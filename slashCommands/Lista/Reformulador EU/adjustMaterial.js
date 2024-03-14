const materialList = [
  {pos: '', nome: 'S235JR', densidade: 7.850, modeloMod: 'S235JR'},
  {pos: '', nome: 'ASTM A36', densidade: 7.850, modeloMod: 'ASTM A36'},
  {pos: '', nome: 'S275JR', densidade: 7.850, modeloMod: 'S275JR'},
  {pos: '', nome: 'S355JR', densidade: 7.850, modeloMod: 'S355JR'},
  {pos: '', nome: 'S3555JR', densidade: 7.850, modeloMod: 'S3555JR'},
  {pos: '', nome: 'S32205', densidade: 7.850, modeloMod: 'S32205'},
  {pos: '', nome: 'SAC 350', densidade: 7.850, modeloMod: 'SAC 350'},
  {pos: '', nome: 'AISI 304L', densidade: 8.000, modeloMod: 'AISI 304L'},
  {pos: '', nome: 'AISI 316L', densidade: 8.000, modeloMod: 'AISI 316L'},
  {pos: '', nome: 'PTFE', densidade: 2.100, modeloMod: 'PTFE'},
  {pos: '', nome: 'COR-TEN B', densidade: 7.850, modeloMod: 'COR-TEN B'},
  {pos: '', nome: 'STRENX 700', densidade: 7.850, modeloMod: 'STRENX 700'},
  {pos: '', nome: 'P265GH', densidade: 7.850, modeloMod: 'P265GH'},
  {pos: '', nome: 'SAE 1045', densidade: 7.850, modeloMod: 'SAE 1045'},
];

//{pos: "", nome: , densidade: },

const adjustMaterial = (material) => {
  const foundMaterials = [];
  let error = false;

  // Verifica cada material na ordem da materialList
  materialList.forEach((listItem) => {
    if (material.includes(listItem.nome)) {
      foundMaterials.push(listItem.nome);
    }
  });

  // Verifica se algum material desconhecido está presente no array 'material'
  material.forEach((item) => {
    if(!materialList.includes(item) && !foundMaterials.includes(item)){
      foundMaterials.push(item);
      error = true;
    }
  });

  const materialCompost = { 
    nameMaterial: foundMaterials.join(' / '), 
    error: error 
  };

  return materialCompost;
};

const findTypeMaterial = (material) => {
  for(let c = 0; c < materialList.length; c++){
    if(material === materialList[c].modeloMod){
      materialList[c].pos = c;
      return materialList[c];
    }
  }

  return {pos: materialList.length, nome: material, densidade: 0, modeloMod: material};
};

module.exports = {adjustMaterial, findTypeMaterial};