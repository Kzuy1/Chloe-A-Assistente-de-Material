let listMaterial = [
    //CHAPA
    { modelo: "SHEET TH. 2,000 mm",  materialMod: "", descricao: "SHEET TH. 2.0mm", unidade: "m²", quantidade: 15.7, material: "S235JR", peso: 0},
    { modelo: "SHEET TH. 2,000 mm",  materialMod: "AISI 304L", descricao: "SHEET TH. 2.0mm", unidade: "m²", quantidade: 15.8, material: "AISI 304L", peso: 0},

    { modelo: "SHEET TH. 4,000 mm",  materialMod: "", descricao: "SHEET TH. 4.0mm", unidade: "m²", quantidade: 31.4, material: "S235JR", peso: 0},
    { modelo: "SHEET TH. 4,000 mm",  materialMod: "AISI 304L", descricao: "SHEET TH. 4.0mm", unidade: "m²", quantidade: 31.6, material: "AISI 304L", peso: 0},

    { modelo: "SHEET TH. 5,000 mm",  materialMod: "", descricao: "SHEET TH. 5.0mm", unidade: "m²", quantidade: 39.25, material: "S235JR", peso: 0},
    { modelo: "SHEET TH. 5,000 mm",  materialMod: "AISI 304L", descricao: "SHEET TH. 5.0mm", unidade: "m²", quantidade: 39.5, material: "AISI 304L", peso: 0},

    { modelo: "SHEET TH. 6,000 mm",  materialMod: "", descricao: "SHEET TH. 6.0mm", unidade: "m²", quantidade: 47.1, material: "S235JR", peso: 0},
    { modelo: "SHEET TH. 6,000 mm",  materialMod: "AISI 304L", descricao: "SHEET TH. 6.0mm", unidade: "m²", quantidade: 47.4, material: "AISI 304L", peso: 0},
    { modelo: "SHEET TH. 6,000 mm",  materialMod: "AISI 316L", descricao: "SHEET TH. 6.0mm", unidade: "m²", quantidade: 48.0, material: "AISI 316L", peso: 0},
    { modelo: "SHEET TH. 6,000 mm",  materialMod: "COR-TEN B", descricao: "SHEET TH. 6.0mm", unidade: "m²", quantidade: 47.1, material: "COR-TEN B", peso: 0},
    { modelo: "SHEET TH. 6,000 mm",  materialMod: "STRENX 700 E/F", descricao: "SHEET TH. 6.0mm", unidade: "m²", quantidade: 47.1, material: "STRENX 700 E/F", peso: 0},

    { modelo: "SHEET TH. 8,000 mm",  materialMod: "", descricao: "SHEET TH. 8.0mm", unidade: "m²", quantidade: 62.8, material: "S235JR", peso: 0},
    { modelo: "SHEET TH. 8,000 mm",  materialMod: "AISI 304L", descricao: "SHEET TH. 8.0mm", unidade: "m²", quantidade: 63.2, material: "AISI 304L", peso: 0},
    { modelo: "SHEET TH. 8,000 mm",  materialMod: "STRENX 700 E/F", descricao: "SHEET TH. 8.0mm", unidade: "m²", quantidade: 62.8, material: "STRENX 700 E/F", peso: 0},

    { modelo: "SHEET TH. 10,000 mm",  materialMod: "", descricao: "SHEET TH. 10.0mm", unidade: "m²", quantidade: 78.5, material: "S235JR", peso: 0},
    { modelo: "SHEET TH. 10,000 mm",  materialMod: "COR-TEN B", descricao: "SHEET TH. 10.0mm", unidade: "m²", quantidade: 78.5, material: "COR-TEN B", peso: 0},

    { modelo: "SHEET TH. 12,000 mm",  materialMod: "", descricao: "SHEET TH. 12.0mm", unidade: "m²", quantidade: 94.2, material: "S235JR", peso: 0},
    { modelo: "SHEET TH. 12,000 mm",  materialMod: "STRENX 700 E/F", descricao: "SHEET TH. 12.0mm", unidade: "m²", quantidade: 94.2, material: "STRENX 700 E/F", peso: 0},

    { modelo: "SHEET TH. 15,000 mm",  materialMod: "", descricao: "SHEET TH. 15.0mm", unidade: "m²", quantidade: 117.75, material: "S235JR", peso: 0},

    { modelo: "SHEET TH. 16,000 mm",  materialMod: "", descricao: "SHEET TH. 16.0mm", unidade: "m²", quantidade: 125.6, material: "S235JR", peso: 0},
    { modelo: "SHEET TH. 16,000 mm",  materialMod: "COR-TEN B", descricao: "SHEET TH. 16.0mm", unidade: "m²", quantidade: 125.6, material: "COR-TEN B", peso: 0},
    { modelo: "SHEET TH. 16,000 mm",  materialMod: "STRENX 700 E/F", descricao: "SHEET TH. 16.0mm", unidade: "m²", quantidade: 125.6, material: "STRENX 700 E/F", peso: 0},

    { modelo: "SHEET TH. 20,000 mm",  materialMod: "", descricao: "SHEET TH. 20.0mm", unidade: "m²", quantidade: 157, material: "S235JR", peso: 0},

    { modelo: "SHEET TH. 25,000 mm",  materialMod: "", descricao: "SHEET TH. 25.0mm", unidade: "m²", quantidade: 196.25, material: "S235JR", peso: 0},
    { modelo: "SHEET TH. 25,000 mm",  materialMod: "STRENX 700 E/F", descricao: "SHEET TH. 25.0mm", unidade: "m²", quantidade: 196.25, material: "STRENX 700 E/F", peso: 0},

    { modelo: "SHEET TH. 35,000 mm",  materialMod: "", descricao: "SHEET TH. 35.0mm", unidade: "m²", quantidade: 274.75, material: "S235JR", peso: 0},

    { modelo: "SHEET TH. 50,000 mm",  materialMod: "", descricao: "SHEET TH. 50.0mm", unidade: "m²", quantidade: 392.5, material: "S235JR", peso: 0},
    { modelo: "SHEET TH. 50,000 mm",  materialMod: "STRENX 700 E/F", descricao: "SHEET TH. 50.0mm", unidade: "m²", quantidade: 392.5, material: "STRENX 700 E/F", peso: 0},
    //CHAPA XADREZ
    { modelo: "EMBOSSED PLATE Sp. 5,000 mm",  materialMod: "", descricao: "TEARDROP PATTERNED SHEET PLATE Sp. 3+2", unidade: "m²", quantidade: 27, material: "S235JR", peso: 0},
    //PERFIL L
    { modelo: "L50x50x4",  materialMod: "", descricao: "L 50x50x4.0mm", unidade: "m", quantidade: 3.07, material: "S235JR", peso: 0},
    { modelo: "L50x50x5",  materialMod: "", descricao: "L 50x50x5.0mm", unidade: "m", quantidade: 3.77, material: "S235JR", peso: 0},
    { modelo: "L60x60x6",  materialMod: "", descricao: "L 60x60x6.0mm", unidade: "m", quantidade: 5.65, material: "S235JR", peso: 0},
    { modelo: "L60x60x6",  materialMod: "AISI 304L", descricao: "L 60x60x6.0mm", unidade: "m", quantidade: 5.7, material: "AISI 304L", peso: 0},
    { modelo: "L80x80x6",  materialMod: "", descricao: "L 80x80x6.0mm", unidade: "m", quantidade: 6.37, material: "S235JR", peso: 0},
    //BARRA CHATA
    //REDONDO LAMINADO
    { modelo: "Ø12",  materialMod: "AISI 304L", descricao: "ROUND BAR Ø12", unidade: "m", quantidade: 0.9, material: "AISI 304L", peso: 0},
    { modelo: "REDONDO TREFILADO Ø15,000 mm",  materialMod: "", descricao: "ROUND BAR Ø15", unidade: "m", quantidade: 1.38, material: "S235JR", peso: 0},
    { modelo: "Ø16",  materialMod: "", descricao: "ROUND BAR Ø16", unidade: "m", quantidade: 1.6, material: "S235JR", peso: 0},
    { modelo: "Ø16",  materialMod: "AISI 304L", descricao: "ROUND BAR Ø16", unidade: "m", quantidade: 1.6, material: "AISI 304L", peso: 0},
    //PERFIL U
    { modelo: "U 100",  materialMod: "", descricao: "UNP 100", unidade: "m", quantidade: 10.6, material: "S235JR", peso: 0},
    { modelo: "U 140",  materialMod: "", descricao: "UNP 140", unidade: "m", quantidade: 16, material: "S235JR", peso: 0},
    { modelo: "U 240 x 85",  materialMod: "", descricao: "UNP 240", unidade: "m", quantidade: 33.2, material: "S235JR", peso: 0},
    //TUBOS
    { modelo: "PIPE ØEXT. 17,200 mmx2,310 mm",  materialMod: "AISI 304L", descricao: "PIPE ØEXT. 17.2x2.31mm", unidade: "m", quantidade: 0.9, material: "AISI 304L", peso: 0},
    { modelo: "PIPE ØEXT. 17,200 mmx2,300 mm",  materialMod: "", descricao: "PIPE ØEXT. 17.2x2.31mm", unidade: "m", quantidade: 0.8, material: "S235JR", peso: 0},
    { modelo: "21,3 x 2,6",  materialMod: "", descricao: "PIPE ØEXT. 21.3x2.60mm", unidade: "m", quantidade: 1.2, material: "S235JR", peso: 0},
    { modelo: "PIPE ØEXT. 21,300 mmx2,600 mm",  materialMod: "AISI 304L", descricao: "PIPE ØEXT. 21.3x2.60mm", unidade: "m", quantidade: 1.2, material: "AISI 304L", peso: 0},
    { modelo: "21,3 x 2,9",  materialMod: "", descricao: "PIPE ØEXT. 21.3x2.90mm", unidade: "m", quantidade: 1.3, material: "S235JR", peso: 0},
    { modelo: "33,7 x 3,2",  materialMod: "", descricao: "PIPE ØEXT. 33.7x3.20mm", unidade: "m", quantidade: 2.4, material: "S235JR", peso: 0},
    { modelo: "42,4 x 3,6",  materialMod: "AISI 304L", descricao: "PIPE ØEXT. 42.4x3.60mm", unidade: "m", quantidade: 3.5, material: "AISI 304L", peso: 0},
    { modelo: "PIPE ØEXT. 48,300 mmx2,800 mm",  materialMod: "", descricao: "PIPE ØEXT. 48.3x2.80mm", unidade: "m", quantidade: 3.1, material: "S235JR", peso: 0},
    { modelo: "48,3 x 3,6",  materialMod: "AISI 304L", descricao: "PIPE ØEXT. 48.3x3.60mm", unidade: "m", quantidade: 4.0, material: "AISI 304L", peso: 0},
    { modelo: "PIPE ØEXT. 60,300 mmx2,800 mm",  materialMod: "", descricao: "PIPE ØEXT. 60.3x2.80mm", unidade: "m", quantidade: 4.0, material: "S235JR", peso: 0},
    { modelo: "60,3 x 2,9",  materialMod: "AISI 304L", descricao: "PIPE ØEXT. 60.3x2.90mm", unidade: "m", quantidade: 4.2, material: "AISI 304L", peso: 0},
    { modelo: "60,3 x 3,2",  materialMod: "", descricao: "PIPE ØEXT. 60.3x3.20mm", unidade: "m", quantidade: 4.5, material: "S235JR", peso: 0},
    { modelo: "60,3 x 4",  materialMod: "", descricao: "PIPE ØEXT. 60.3x4.00mm", unidade: "m", quantidade: 5.55, material: "S235JR", peso: 0},
    { modelo: "73,0 x 5,2",  materialMod: "AISI 304L", descricao: "PIPE ØEXT. 73.0x5.20mm", unidade: "m", quantidade: 8.8, material: "AISI 304L", peso: 0},
    { modelo: "88,9 x 5,6",  materialMod: "", descricao: "PIPE ØEXT. 88.9x5.60mm", unidade: "m", quantidade: 11.5, material: "S235JR", peso: 0},
    { modelo: "PIPE ØEXT. 152,400 mmx4,000 mm",  materialMod: "", descricao: "PIPE ØEXT. 152.4x4.00mm", unidade: "m", quantidade: 14.60, material: "S235JR", peso: 0},
    //PERFIL HEA
    { modelo: "HE 120 A",  materialMod: "", descricao: "HEA 120", unidade: "m", quantidade: 19.9, material: "S235JR", peso: 0},
    //PERFIL HEB
    { modelo: "HE 100 B",  materialMod: "", descricao: "HEB 100", unidade: "m", quantidade: 20.4, material: "S235JR", peso: 0},
    { modelo: "HE 240 B",  materialMod: "", descricao: "HEB 240", unidade: "m", quantidade: 83.2, material: "S235JR", peso: 0},
    //PERFIL IPE
    { modelo: "IPE 100",  materialMod: "", descricao: "IPE 100", unidade: "m", quantidade: 8.1, material: "S235JR", peso: 0},
    //CHAVETA BARRA
    //CURVAS
    //LUVA ALTA PRESSÃO 3000
    //{ modelo: "",  materialMod: "", descricao: "", unidade: "", quantidade: 0, material: "", peso: 0},
  ];
  
  const findMaterial = (descricao) => {
    let info = listMaterial.filter(obj => obj.modelo == descricao && obj.materialMod == "");
    return info[0];
  };
  
  const findMaterialEsp = (descricao, material) => {
    let info = listMaterial.filter(obj => obj.modelo == descricao && obj.materialMod == material);
    return info[0];
  };
  
  const findMaterialPos = (descricao, material) => {
    let pos = listMaterial.findIndex(obj => obj.descricao == descricao && obj.material == material);
    let info = listMaterial.filter(obj => obj.descricao == descricao && obj.material == material);
    return [pos, info[0].descricao, info[0].unidade, info[0].quantidade, info[0].material, info[0].peso];
  };
  
  module.exports = { findMaterial, findMaterialEsp, findMaterialPos };