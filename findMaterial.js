let listMaterial = [
    //CHAPAS MM
    { modelo: "SHEET TH. 2,000 mm",  materialMod: "", descricao: "CHAPA ESP. 2.0mm", unidade: "m²", quantidade: 15.7, material: "ASTM A-36", peso: 0},
    //CHAPAS POL
    { modelo: "SHEET TH. 3,175 mm",  materialMod: "", descricao: "CHAPA 1/8\"", unidade: "m²", quantidade: 25.0, material: "ASTM A-36", peso: 0},

    { modelo: "SHEET TH. 4,763 mm",  materialMod: "", descricao: "CHAPA 3/16\"", unidade: "m²", quantidade: 37.4, material: "ASTM A-36", peso: 0},
    { modelo: "SHEET TH. 4,763 mm",  materialMod: "ASTM A516-60", descricao: "CHAPA 3/16\"", unidade: "m²", quantidade: 37.4, material: "ASTM A516-60", peso: 0},

    { modelo: "SHEET TH. 6,350 mm",  materialMod: "", descricao: "CHAPA 1/4\"", unidade: "m²", quantidade: 49.8, material: "ASTM A-36", peso: 0},
    { modelo: "SHEET TH. 6,350 mm",  materialMod: "USI SAC 350", descricao: "CHAPA 1/4\"", unidade: "m²", quantidade: 49.8, material: "SAC 350", peso: 0},

    { modelo: "SHEET TH. 7,938 mm",  materialMod: "", descricao: "CHAPA 5/16\"", unidade: "m²", quantidade: 62.3, material: "ASTM A-36", peso: 0},
    { modelo: "SHEET TH. 7,938 mm",  materialMod: "USI SAC 350", descricao: "CHAPA 5/16\"", unidade: "m²", quantidade: 62.3, material: "SAC 350", peso: 0},

    { modelo: "SHEET TH. 9,525 mm",  materialMod: "", descricao: "CHAPA 3/8\"", unidade: "m²", quantidade: 74.8, material: "ASTM A-36", peso: 0},
    { modelo: "SHEET TH. 9,525 mm",  materialMod: "USI SAC 350", descricao: "CHAPA 3/8\"", unidade: "m²", quantidade: 74.8, material: "SAC 350", peso: 0},
    { modelo: "SHEET TH. 9,525 mm",  materialMod: "ASTM A516-60", descricao: "CHAPA 3/8\"", unidade: "m²", quantidade: 74.8, material: "ASTM A516-60", peso: 0},
    
    { modelo: "SHEET TH. 10,000 mm",  materialMod: "Politetrafluoroetileno, PTFE", descricao: "CHAPA ESP. 10.0mm", unidade: "m²", quantidade: 21, material: "PTFE", peso: 0},

    { modelo: "SHEET TH. 12,700 mm",  materialMod: "", descricao: "CHAPA 1/2\"", unidade: "m²", quantidade: 99.7, material: "ASTM A-36", peso: 0},

    { modelo: "SHEET TH. 15,875 mm",  materialMod: "", descricao: "CHAPA 5/8\"", unidade: "m²", quantidade: 124.6, material: "ASTM A-36", peso: 0},

    { modelo: "SHEET TH. 19,050 mm",  materialMod: "", descricao: "CHAPA 3/4\"", unidade: "m²", quantidade: 149.5, material: "ASTM A-36", peso: 0},
    { modelo: "SHEET TH. 19,050 mm",  materialMod: "ASTM A516-60", descricao: "CHAPA 3/4\"", unidade: "m²", quantidade: 149.5, material: "ASTM A516-60", peso: 0},

    { modelo: "SHEET TH. 25,400 mm",  materialMod: "", descricao: "CHAPA 1\"", unidade: "m²", quantidade: 199.4, material: "ASTM A-36", peso: 0},
    { modelo: "SHEET TH. 30,000 mm",  materialMod: "", descricao: "CHAPA 1.1/4\"", unidade: "m²", quantidade: 235.5, material: "ASTM A-36", peso: 0},
    { modelo: "SHEET TH. 31,750 mm",  materialMod: "", descricao: "CHAPA 1.1/4\"", unidade: "m²", quantidade: 249.2, material: "ASTM A-36", peso: 0},
    { modelo: "SHEET TH. 50,800 mm",  materialMod: "", descricao: "CHAPA 2\"", unidade: "m²", quantidade: 398.8, material: "ASTM A-36", peso: 0},
    //PERFIL L
    { modelo: "(L 1 1/2 x 1 1/2 x 3/16)",  materialMod: "", descricao: "L 1.1/2\" x 3/16\"", unidade: "m", quantidade: 2.68, material: "ASTM A-36", peso: 0},
    { modelo: "L 2 x 2 x 3/16",  materialMod: "", descricao: "L 2\" x 3/16\"", unidade: "m", quantidade: 3.63, material: "ASTM A-36", peso: 0},
    { modelo: "L 2 x 2 x 1/4",  materialMod: "L 2\" x 1/4\"", descricao: "", unidade: "m", quantidade: 4.75, material: "ASTM A-36", peso: 0},
    { modelo: "L 2 1/2 x 2 1/2 x 3/16",  materialMod: "", descricao: "L 2.1/2\" x 3/16\"", unidade: "m", quantidade: 4.52, material: "ASTM A-36", peso: 0},
    { modelo: "L 3 x 3 x 3/16",  materialMod: "", descricao: "L 3\" x 3/16\"", unidade: "m", quantidade: 5.52, material: "ASTM A-36", peso: 0},
    { modelo: "L 3 x 3 x 1/4",  materialMod: "", descricao: "L 3\" x 1/4\"", unidade: "m", quantidade: 7.3, material: "ASTM A-36", peso: 0},
    { modelo: "L 4 x 4 x 5/16",  materialMod: "", descricao: "L 4\" x 5/16\"", unidade: "m", quantidade: 12.19, material: "ASTM A-36", peso: 0},
    { modelo: "L 4\" x 3/8\"",  materialMod: "", descricao: "L 4\" x 3/8\"", unidade: "m", quantidade: 14.58, material: "ASTM A-36", peso: 0},
    //BARRA CHATA
    { modelo: "BARRA CHATA 2.1/2\" x 3/16\"",  materialMod: "", descricao: "BARRA CHATA 2.1/2\" x 3/16\"", unidade: "m", quantidade: 2.37, material: "ASTM A-36", peso: 0},
    { modelo: "BARRA CHATA 3.1/2\" x 5/16\"",  materialMod: "", descricao: "BARRA CHATA 3.1/2\" x 5/16\"", unidade: "m", quantidade: 5.54, material: "ASTM A-36", peso: 0},
    //REDONDO LAMINADO
    { modelo: "ROUND BAR 12,700 mm",  materialMod: "", descricao: "REDONDO LAMINADO Ø1/2\"", unidade: "m", quantidade: 0.99, material: "ASTM A-36", peso: 0}, 
    { modelo: "REDONDO Ø30,000 mm",  materialMod: "", descricao: "REDONDO LAMINADO Ø1.1/4\"", unidade: "m", quantidade: 6.22, material: "ASTM A-36", peso: 0},
    { modelo: "Round Bars 50,8000 mmx",  materialMod: "", descricao: "REDONDO LAMINADO Ø2\"", unidade: "m", quantidade: 15.91, material: "ASTM A-36", peso: 0},
    { modelo: "REDONDO Ø63,500 mm",  materialMod: "", descricao: "REDONDO LAMINADO Ø2.1/2\"", unidade: "m", quantidade: 24.86, material: "ASTM A-36", peso: 0},
    { modelo: "REDONDO Ø80,000 mm",  materialMod: "", descricao: "REDONDO LAMINADO Ø3.1/4\"", unidade: "m", quantidade: 42.1, material: "ASTM A-36", peso: 0},
    { modelo: "REDONDO Ø88,900 mm",  materialMod: "", descricao: "REDONDO LAMINADO Ø3.1/2\"", unidade: "m", quantidade: 48.73, material: "ASTM A-36", peso: 0},
    { modelo: "REDONDO Ø127,000 mm",  materialMod: "", descricao: "REDONDO LAMINADO Ø5\"", unidade: "m", quantidade: 99.8, material: "ASTM A-36", peso: 0},
    //PERFIL U
    { modelo: "C 4x5.4",  materialMod: "", descricao: "PERFIL U 4\" - 1ªALMA", unidade: "m", quantidade: 8.04, material: "ASTM A-36", peso: 0},
    { modelo: "C 6x8.2",  materialMod: "", descricao: "PERFIL U 6\" - 1ªALMA", unidade: "m", quantidade: 12.2, material: "ASTM A-36", peso: 0},
    { modelo: "C 6 x 8,2",  materialMod: "", descricao: "PERFIL U 6\" - 1ªALMA", unidade: "m", quantidade: 12.2, material: "ASTM A-36", peso: 0},
    { modelo: "C 8 x 11,5",  materialMod: "", descricao: "PERFIL U 8\" - 1ªALMA", unidade: "m", quantidade: 17.11, material: "ASTM A-36", peso: 0},
    { modelo: "C 8x11.5",  materialMod: "", descricao: "PERFIL U 8\" - 1ªALMA", unidade: "m", quantidade: 17.11, material: "ASTM A-36", peso: 0},
    //TUBOS
    { modelo: "1 x 0.133",  materialMod: "", descricao: "TUBO DN 1\" SCH40", unidade: "m", quantidade: 2.5, material: "ASTM A53 Gr.B", peso: 0},
    { modelo: "PIPE ØEXT. 33,400 mmx3,380 mm",  materialMod: "", descricao: "TUBO DN 1\" SCH40", unidade: "m", quantidade: 2.5, material: "ASTM A53 Gr.B", peso: 0},
    { modelo: "1 1/4 x 0.140",  materialMod: "", descricao: "TUBO DN 1.1/4\" SCH40", unidade: "m", quantidade: 3.38, material: "ASTM A53 Gr.B", peso: 0},
    { modelo: "PIPE ØEXT. 42,200 mmx3,560 mm",  materialMod: "", descricao: "TUBO DN 1.1/4\" SCH40", unidade: "m", quantidade: 3.38, material: "ASTM A53 Gr.B", peso: 0},
    { modelo: "1 1/2 x 0.145",  materialMod: "", descricao: "TUBO DN 1.1/2\" SCH40", unidade: "m", quantidade: 4.05, material: "ASTM A53 Gr.B", peso: 0},
    { modelo: "2 x 0.154",  materialMod: "", descricao: "TUBO DN 2\" SCH40", unidade: "m", quantidade: 5.47, material: "ASTM A53 Gr.B", peso: 0},
    { modelo: "PIPE ØEXT. 73,000 mmx5,160 mm",  materialMod: "", descricao: "TUBO DN 2.1/2\" SCH40", unidade: "m", quantidade: 8.63, material: "ASTM A53 Gr.B", peso: 0},
    { modelo: "PIPE ØEXT. 88,900 mmx5,490 mm",  materialMod: "", descricao: "TUBO DN 3\" SCH40", unidade: "m", quantidade: 11.29, material: "ASTM A53 Gr.B", peso: 0},
    { modelo: "PIPE ØEXT. 168,300 mmx7,110 mm",  materialMod: "", descricao: "TUBO DN 6\" SCH40", unidade: "m", quantidade: 28.27, material: "ASTM A53 Gr.B", peso: 0},
    { modelo: "PIPE ØEXT. 273,050 mmx9,270 mm",  materialMod: "", descricao: "TUBO DN 10\" SCH40", unidade: "m", quantidade: 60.32, material: "ASTM A53 Gr.B", peso: 0},
    //PERFIL W
    { modelo: "W150 x 13.0",  materialMod: "", descricao: "W 150x13.0", unidade: "m", quantidade: 13, material: "ASTM A572 Gr. 50", peso: 0},
    { modelo: "VIGA W 153,000 mmx102,000 mm",  materialMod: "", descricao: "W 150x18.0", unidade: "m", quantidade: 18, material: "ASTM A572 Gr. 50", peso: 0},
    { modelo: "VIGA W 152,000 mmx152,000 mm",  materialMod: "", descricao: "W 150x22.5", unidade: "m", quantidade: 22.5, material: "ASTM A572 Gr. 50", peso: 0},
    { modelo: "W150 x 22.5",  materialMod: "", descricao: "W 150x22.5", unidade: "m", quantidade: 22.5, material: "ASTM A572 Gr. 50", peso: 0},
    { modelo: "VIGA W 203,000 mmx102,000 mm",  materialMod: "", descricao: "W 200x19.3", unidade: "m", quantidade: 19.3, material: "ASTM A572 Gr. 50", peso: 0},
    { modelo: "W200 x 26.6",  materialMod: "", descricao: "W 200x26.6", unidade: "m", quantidade: 26.6, material: "ASTM A572 Gr. 50", peso: 0},
    { modelo: "W200 x 46.1",  materialMod: "", descricao: "W 200x46.1", unidade: "m", quantidade: 46.1, material: "ASTM A572 Gr. 50", peso: 0},
    { modelo: "W200 x 52",  materialMod: "", descricao: "W 200x52.0", unidade: "m", quantidade: 52, material: "ASTM A572 Gr. 50", peso: 0},
    { modelo: "W250 x 32.7",  materialMod: "", descricao: "W 200x32.7", unidade: "m", quantidade: 32.7, material: "ASTM A572 Gr. 50", peso: 0},
    { modelo: "W310 x 38.7",  materialMod: "", descricao: "W 310x38.7", unidade: "m", quantidade: 38.7, material: "ASTM A572 Gr. 50", peso: 0},
    //CHAVETA BARRA
    { modelo: "CHAVETA 8,000 mmx7,000 mm",  materialMod: "", descricao: "CHAVETA 8.0x7.0mm", unidade: "m", quantidade: 0.44, material: "SAE 1045", peso: 0},
    { modelo: "CHAVETA 22,000 mmx14,000 mm",  materialMod: "", descricao: "CHAVETA 22.0x14.0mm", unidade: "m", quantidade: 2.41, material: "SAE 1045", peso: 0},
    //CURVAS
    { modelo: "CURVA 90º DN 1\" SCH40 CFME ANSI B16.9 RC",  materialMod: "", descricao: "CURVA 90º DN 1\" SCH40 CFME ANSI B16.9 RC", unidade: "N°", quantidade: 0.15, material: "ASTM A-36", peso: 0},
    { modelo: "CURVA 90º DN 1.1/4\" SCH40 CFME ANSI B16.9 RC",  materialMod: "", descricao: "CURVA 90º DN 1.1/4\" SCH40 CFME ANSI B16.9 RC", unidade: "N°", quantidade: 0.26, material: "ASTM A-36", peso: 0},
    //LUVA ALTA PRESSÃO 3000
    { modelo: "ASME B16.11 - Acoplamento com rosca - Classe 3000 1 1/2 x 1 1/2",  materialMod: "", descricao: "LUVA Ø1.1/2\" NPT ANSI B 16.11", unidade: "N°", quantidade: 1.05, material: "ASTM A105", peso: 0},
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