let listMaterial = [
  //CHAPA
  { modelo: "SHEET TH. 2,000 mm",  materialMod: "", descricao: "SHEET TH. 2.0mm", unidade: "m²", quantidade: 15.7, material: "S235JR", peso: 0},
  { modelo: "SHEET TH. 2,000 mm",  materialMod: "AISI 304L", descricao: "SHEET TH. 2.0mm", unidade: "m²", quantidade: 15.8, material: "AISI 304L", peso: 0},

  { modelo: "SHEET TH. 4,000 mm",  materialMod: "", descricao: "SHEET TH. 4.0mm", unidade: "m²", quantidade: 31.4, material: "S235JR", peso: 0},
  { modelo: "SHEET TH. 4,000 mm",  materialMod: "AISI 304L", descricao: "SHEET TH. 4.0mm", unidade: "m²", quantidade: 31.6, material: "AISI 304L", peso: 0},

  { modelo: "SHEET TH. 5,000 mm",  materialMod: "", descricao: "SHEET TH. 5.0mm", unidade: "m²", quantidade: 39.25, material: "S235JR", peso: 0},
  { modelo: "SHEET TH. 5,000 mm",  materialMod: "S275JR", descricao: "SHEET TH. 5.0mm", unidade: "m²", quantidade: 39.25, material: "S275JR", peso: 0},
  { modelo: "SHEET TH. 5,000 mm",  materialMod: "S3555JR", descricao: "SHEET TH. 5.0mm", unidade: "m²", quantidade: 39.25, material: "S3555JR", peso: 0},
  { modelo: "SHEET TH. 5,000 mm",  materialMod: "AISI 304L", descricao: "SHEET TH. 5.0mm", unidade: "m²", quantidade: 39.5, material: "AISI 304L", peso: 0},
  { modelo: "SHEET TH. 5,000 mm",  materialMod: "AISI 316L", descricao: "SHEET TH. 5.0mm", unidade: "m²", quantidade: 40, material: "AISI 316L", peso: 0},
  { modelo: "SHEET TH. 5,000 mm",  materialMod: "PTFE", descricao: "SHEET TH. 5.0mm", unidade: "m²", quantidade: 10.5, material: "PTFE", peso: 0},
  { modelo: "SHEET TH. 5,000 mm",  materialMod: "COR-TEN B", descricao: "SHEET TH. 5.0mm", unidade: "m²", quantidade: 39.25, material: "COR-TEN B", peso: 0},
  { modelo: "SHEET TH. 5,000 mm",  materialMod: "STRENX 700", descricao: "SHEET TH. 5.0mm", unidade: "m²", quantidade: 39.25, material: "STRENX 700", peso: 0},
  { modelo: "SHEET TH. 5,000 mm",  materialMod: "P265GH", descricao: "SHEET TH. 5.0mm", unidade: "m²", quantidade: 39.25, material: "P265GH", peso: 0},

  { modelo: "SHEET TH. 6,000 mm",  materialMod: "", descricao: "SHEET TH. 6.0mm", unidade: "m²", quantidade: 47.1, material: "S235JR", peso: 0},
  { modelo: "SHEET TH. 6,000 mm",  materialMod: "S275JR", descricao: "SHEET TH. 6.0mm", unidade: "m²", quantidade: 47.1, material: "S275JR", peso: 0},
  { modelo: "SHEET TH. 6,000 mm",  materialMod: "S3555JR", descricao: "SHEET TH. 6.0mm", unidade: "m²", quantidade: 47.1, material: "S3555JR", peso: 0},
  { modelo: "SHEET TH. 6,000 mm",  materialMod: "AISI 304L", descricao: "SHEET TH. 6.0mm", unidade: "m²", quantidade: 47.4, material: "AISI 304L", peso: 0},
  { modelo: "SHEET TH. 6,000 mm",  materialMod: "AISI 316L", descricao: "SHEET TH. 6.0mm", unidade: "m²", quantidade: 48.0, material: "AISI 316L", peso: 0},
  { modelo: "SHEET TH. 6,000 mm",  materialMod: "PTFE", descricao: "SHEET TH. 6.0mm", unidade: "m²", quantidade: 12.6, material: "PTFE", peso: 0},
  { modelo: "SHEET TH. 6,000 mm",  materialMod: "COR-TEN B", descricao: "SHEET TH. 6.0mm", unidade: "m²", quantidade: 47.1, material: "COR-TEN B", peso: 0},
  { modelo: "SHEET TH. 6,000 mm",  materialMod: "STRENX 700", descricao: "SHEET TH. 6.0mm", unidade: "m²", quantidade: 47.1, material: "STRENX 700", peso: 0},
  { modelo: "SHEET TH. 6,000 mm",  materialMod: "P265GH", descricao: "SHEET TH. 6.0mm", unidade: "m²", quantidade: 47.1, material: "P265GH", peso: 0},

  { modelo: "SHEET TH. 8,000 mm",  materialMod: "", descricao: "SHEET TH. 8.0mm", unidade: "m²", quantidade: 62.8, material: "S235JR", peso: 0},
  { modelo: "SHEET TH. 8,000 mm",  materialMod: "S275JR", descricao: "SHEET TH. 8.0mm", unidade: "m²", quantidade: 62.8, material: "S275JR", peso: 0},
  { modelo: "SHEET TH. 8,000 mm",  materialMod: "S3555JR", descricao: "SHEET TH. 8.0mm", unidade: "m²", quantidade: 62.8, material: "S3555JR", peso: 0},
  { modelo: "SHEET TH. 8,000 mm",  materialMod: "AISI 304L", descricao: "SHEET TH. 8.0mm", unidade: "m²", quantidade: 63.2, material: "AISI 304L", peso: 0},
  { modelo: "SHEET TH. 8,000 mm",  materialMod: "AISI 316L", descricao: "SHEET TH. 8.0mm", unidade: "m²", quantidade: 64, material: "AISI 316L", peso: 0},
  { modelo: "SHEET TH. 8,000 mm",  materialMod: "PTFE", descricao: "SHEET TH. 8.0mm", unidade: "m²", quantidade: 16.8, material: "PTFE", peso: 0},
  { modelo: "SHEET TH. 8,000 mm",  materialMod: "COR-TEN B", descricao: "SHEET TH. 8.0mm", unidade: "m²", quantidade: 62.8, material: "COR-TEN B", peso: 0},
  { modelo: "SHEET TH. 8,000 mm",  materialMod: "STRENX 700", descricao: "SHEET TH. 8.0mm", unidade: "m²", quantidade: 62.8, material: "STRENX 700", peso: 0},
  { modelo: "SHEET TH. 8,000 mm",  materialMod: "P265GH", descricao: "SHEET TH. 8.0mm", unidade: "m²", quantidade: 62.8, material: "P265GH", peso: 0},

  { modelo: "SHEET TH. 10,000 mm",  materialMod: "", descricao: "SHEET TH. 10.0mm", unidade: "m²", quantidade: 78.5, material: "S235JR", peso: 0},
  { modelo: "SHEET TH. 10,000 mm",  materialMod: "PTFE", descricao: "SHEET TH. 10.0mm", unidade: "m²", quantidade: 21, material: "PTFE", peso: 0},
  { modelo: "SHEET TH. 10,000 mm",  materialMod: "COR-TEN B", descricao: "SHEET TH. 10.0mm", unidade: "m²", quantidade: 78.5, material: "COR-TEN B", peso: 0},
  { modelo: "SHEET TH. 10,000 mm",  materialMod: "P265GH", descricao: "SHEET TH. 10.0mm", unidade: "m²", quantidade: 78.5, material: "P265GH", peso: 0},

  { modelo: "SHEET TH. 12,000 mm",  materialMod: "", descricao: "SHEET TH. 12.0mm", unidade: "m²", quantidade: 94.2, material: "S235JR", peso: 0},
  { modelo: "SHEET TH. 12,000 mm",  materialMod: "STRENX 700", descricao: "SHEET TH. 12.0mm", unidade: "m²", quantidade: 94.2, material: "STRENX 700", peso: 0},
  { modelo: "SHEET TH. 12,000 mm",  materialMod: "P265GH", descricao: "SHEET TH. 12.0mm", unidade: "m²", quantidade: 94.2, material: "P265GH", peso: 0},

  { modelo: "SHEET TH. 15,000 mm",  materialMod: "", descricao: "SHEET TH. 15.0mm", unidade: "m²", quantidade: 117.75, material: "S235JR", peso: 0},
  { modelo: "SHEET TH. 15,000 mm",  materialMod: "S275JR", descricao: "SHEET TH. 15.0mm", unidade: "m²", quantidade:  117.75, material: "S275JR", peso: 0},
  { modelo: "SHEET TH. 15,000 mm",  materialMod: "S3555JR", descricao: "SHEET TH. 15.0mm", unidade: "m²", quantidade:  117.75, material: "S3555JR", peso: 0},
  { modelo: "SHEET TH. 15,000 mm",  materialMod: "AISI 304L", descricao: "SHEET TH. 15.0mm", unidade: "m²", quantidade:  118.5, material: "AISI 304L", peso: 0},
  { modelo: "SHEET TH. 15,000 mm",  materialMod: "AISI 316L", descricao: "SHEET TH. 15.0mm", unidade: "m²", quantidade:  120, material: "AISI 316L", peso: 0},
  { modelo: "SHEET TH. 15,000 mm",  materialMod: "PTFE", descricao: "SHEET TH. 15.0mm", unidade: "m²", quantidade:  31.5, material: "PTFE", peso: 0},
  { modelo: "SHEET TH. 15,000 mm",  materialMod: "COR-TEN B", descricao: "SHEET TH. 15.0mm", unidade: "m²", quantidade:  117.75, material: "COR-TEN B", peso: 0},
  { modelo: "SHEET TH. 15,000 mm",  materialMod: "STRENX 700", descricao: "SHEET TH. 15.0mm", unidade: "m²", quantidade:  117.75, material: "STRENX 700", peso: 0},
  { modelo: "SHEET TH. 15,000 mm",  materialMod: "P265GH", descricao: "SHEET TH. 15.0mm", unidade: "m²", quantidade:  117.75, material: "P265GH", peso: 0},

  { modelo: "SHEET TH. 16,000 mm",  materialMod: "", descricao: "SHEET TH. 16.0mm", unidade: "m²", quantidade: 125.6, material: "S235JR", peso: 0},
  { modelo: "SHEET TH. 16,000 mm",  materialMod: "COR-TEN B", descricao: "SHEET TH. 16.0mm", unidade: "m²", quantidade: 125.6, material: "COR-TEN B", peso: 0},
  { modelo: "SHEET TH. 16,000 mm",  materialMod: "STRENX 700", descricao: "SHEET TH. 16.0mm", unidade: "m²", quantidade: 125.6, material: "STRENX 700", peso: 0},

  { modelo: "SHEET TH. 20,000 mm",  materialMod: "", descricao: "SHEET TH. 20.0mm", unidade: "m²", quantidade: 157, material: "S235JR", peso: 0},

  { modelo: "SHEET TH. 25,000 mm",  materialMod: "", descricao: "SHEET TH. 25.0mm", unidade: "m²", quantidade: 196.25, material: "S235JR", peso: 0},
  { modelo: "SHEET TH. 25,000 mm",  materialMod: "S275JR", descricao: "SHEET TH. 25.0mm", unidade: "m²", quantidade: 196.25, material: "S275JR", peso: 0},
  { modelo: "SHEET TH. 25,000 mm",  materialMod: "STRENX 700", descricao: "SHEET TH. 25.0mm", unidade: "m²", quantidade: 196.25, material: "STRENX 700", peso: 0},

  { modelo: "SHEET TH. 30,000 mm",  materialMod: "", descricao: "SHEET TH. 30.0mm", unidade: "m²", quantidade: 235.5, material: "S235JR", peso: 0},

  { modelo: "SHEET TH. 35,000 mm",  materialMod: "", descricao: "SHEET TH. 35.0mm", unidade: "m²", quantidade: 274.75, material: "S235JR", peso: 0},

  { modelo: "SHEET TH. 40,000 mm",  materialMod: "", descricao: "SHEET TH. 40.0mm", unidade: "m²", quantidade: 314, material: "S235JR", peso: 0},

  { modelo: "SHEET TH. 50,000 mm",  materialMod: "", descricao: "SHEET TH. 50.0mm", unidade: "m²", quantidade: 392.5, material: "S235JR", peso: 0},
  { modelo: "SHEET TH. 50,000 mm",  materialMod: "STRENX 700", descricao: "SHEET TH. 50.0mm", unidade: "m²", quantidade: 392.5, material: "STRENX 700", peso: 0},
  //CHAPA XADREZ
  { modelo: "EMBOSSED PLATE Sp. 5,000 mm",  materialMod: "", descricao: "TEARDROP PATTERNED SHEET PLATE Sp. 3+2", unidade: "m²", quantidade: 27, material: "S235JR", peso: 0},
  //PERFIL L
  { modelo: "L40x40x4",  materialMod: "", descricao: "L 40x40x4.0mm", unidade: "m", quantidade: 2.42, material: "S235JR", peso: 0},

  { modelo: "L50x50x4",  materialMod: "", descricao: "L 50x50x4.0mm", unidade: "m", quantidade: 3.07, material: "S235JR", peso: 0},
  { modelo: "L50x50x5",  materialMod: "", descricao: "L 50x50x5.0mm", unidade: "m", quantidade: 3.77, material: "S235JR", peso: 0},
  { modelo: "L50x50x6",  materialMod: "", descricao: "L 50x50x6.0mm", unidade: "m", quantidade: 4.47, material: "S235JR", peso: 0},

  { modelo: "L60x60x5",  materialMod: "", descricao: "L 60x60x5.0mm", unidade: "m", quantidade: 4.57, material: "S235JR", peso: 0},

  { modelo: "L60x60x6",  materialMod: "", descricao: "L 60x60x6.0mm", unidade: "m", quantidade: 5.42, material: "S235JR", peso: 0},
  { modelo: "L60x60x6",  materialMod: "AISI 304L", descricao: "L 60x60x6.0mm", unidade: "m", quantidade: 5.7, material: "AISI 304L", peso: 0},
  { modelo: "L60x60x6",  materialMod: "P265GH", descricao: "L 60x60x6.0mm", unidade: "m", quantidade: 5.42, material: "P265GH", peso: 0},

  { modelo: "L80x80x6",  materialMod: "", descricao: "L 80x80x6.0mm", unidade: "m", quantidade: 7.34, material: "S235JR", peso: 0},
  { modelo: "L80x80x8",  materialMod: "", descricao: "L 80x80x8.0mm", unidade: "m", quantidade: 9.63, material: "S235JR", peso: 0},

  { modelo: "L125x125x12",  materialMod: "", descricao: "L 125x125x12.0mm", unidade: "m", quantidade: 23.55, material: "S235JR", peso: 0},
  { modelo: "L125x125x12",  materialMod: "S275JR", descricao: "L 125x125x12.0mm", unidade: "m", quantidade: 23.55, material: "S275JR", peso: 0},
  //BARRA CHATA
  //REDONDO LAMINADO
  { modelo: "12",  materialMod: "", descricao: "ROUND BAR Ø12.0mm", unidade: "m", quantidade: 0.9, material: "S235JR", peso: 0},
  { modelo: "12",  materialMod: "AISI 304L", descricao: "ROUND BAR Ø12.0mm", unidade: "m", quantidade: 0.9, material: "AISI 304L", peso: 0},
  { modelo: "12",  materialMod: "P265GH", descricao: "ROUND BAR Ø12.0mm", unidade: "m", quantidade: 0.9, material: "P265GH", peso: 0},

  { modelo: "REDONDO TREFILADO Ø15,000 mm",  materialMod: "", descricao: "ROUND BAR Ø15.0mm", unidade: "m", quantidade: 1.38, material: "S235JR", peso: 0},

  { modelo: "Ø16",  materialMod: "", descricao: "ROUND BAR Ø16.0mm", unidade: "m", quantidade: 1.6, material: "S235JR", peso: 0},
  { modelo: "Ø16",  materialMod: "AISI 304L", descricao: "ROUND BAR Ø16.0mm", unidade: "m", quantidade: 1.6, material: "AISI 304L", peso: 0},

  { modelo: "20",  materialMod: "", descricao: "ROUND BAR Ø20.0mm", unidade: "m", quantidade: 2.5, material: "S235JR", peso: 0},
  { modelo: "40",  materialMod: "", descricao: "ROUND BAR Ø40.0mm", unidade: "m", quantidade: 9.9, material: "S235JR", peso: 0},
  //PERFIL U
  { modelo: "U 80",  materialMod: "", descricao: "UNP 80", unidade: "m", quantidade: 8.64, material: "S235JR", peso: 0},
  { modelo: "U 100",  materialMod: "", descricao: "UNP 100", unidade: "m", quantidade: 10.6, material: "S235JR", peso: 0},

  { modelo: "U 120",  materialMod: "", descricao: "UNP 120", unidade: "m", quantidade: 13.4, material: "S235JR", peso: 0},
  { modelo: "U 120",  materialMod: "P265GH", descricao: "UNP 120", unidade: "m", quantidade: 13.4, material: "P265GH", peso: 0},

  { modelo: "U 140",  materialMod: "", descricao: "UNP 140", unidade: "m", quantidade: 16, material: "S235JR", peso: 0},
  { modelo: "U 140",  materialMod: "P265GH", descricao: "UNP 140", unidade: "m", quantidade: 16, material: "P265GH", peso: 0},

  { modelo: "U 160",  materialMod: "", descricao: "UNP 160", unidade: "m", quantidade: 18.8, material: "S235JR", peso: 0},
  { modelo: "U 200",  materialMod: "", descricao: "UNP 200", unidade: "m", quantidade: 25.3, material: "S235JR", peso: 0},
  { modelo: "U 240 x 85",  materialMod: "", descricao: "UNP 240", unidade: "m", quantidade: 33.2, material: "S235JR", peso: 0},
  { modelo: "U 300",  materialMod: "", descricao: "UNP 300", unidade: "m", quantidade: 46.2, material: "S235JR", peso: 0},
  //TUBOS
  { modelo: "PIPE ØEXT. 17,200 mmx2,310 mm",  materialMod: "AISI 304L", descricao: "PIPE ØEXT. 17.2x2.31mm", unidade: "m", quantidade: 0.9, material: "AISI 304L", peso: 0},
  { modelo: "PIPE ØEXT. 17,200 mmx2,300 mm",  materialMod: "", descricao: "PIPE ØEXT. 17.2x2.31mm", unidade: "m", quantidade: 0.8, material: "S235JR", peso: 0},

  { modelo: "21,3 x 2,6",  materialMod: "", descricao: "PIPE ØEXT. 21.3x2.60mm", unidade: "m", quantidade: 1.2, material: "S235JR", peso: 0},
  { modelo: "PIPE ØEXT. 21,300 mmx2,600 mm",  materialMod: "AISI 304L", descricao: "PIPE ØEXT. 21.3x2.60mm", unidade: "m", quantidade: 1.2, material: "AISI 304L", peso: 0},
  { modelo: "21,3 x 2,9",  materialMod: "", descricao: "PIPE ØEXT. 21.3x2.90mm", unidade: "m", quantidade: 1.3, material: "S235JR", peso: 0},

  { modelo: "26,7 x 2,9",  materialMod: "", descricao: "PIPE ØEXT. 26.7x2.90mm", unidade: "m", quantidade: 1.7, material: "S235JR", peso: 0},

  { modelo: "26,9 x 2,3",  materialMod: "", descricao: "PIPE ØEXT. 26.9x2.30mm", unidade: "m", quantidade: 1.72, material: "S235JR", peso: 0},

  { modelo: "33,7 x 3,2",  materialMod: "", descricao: "PIPE ØEXT. 33.7x3.20mm", unidade: "m", quantidade: 2.4, material: "S235JR", peso: 0},

  { modelo: "42,4 x 2,9",  materialMod: "", descricao: "PIPE ØEXT. 42.4x2.90mm", unidade: "m", quantidade: 2.9, material: "S235JR", peso: 0},
  { modelo: "42,4 x 3,6",  materialMod: "AISI 304L", descricao: "PIPE ØEXT. 42.4x3.60mm", unidade: "m", quantidade: 3.5, material: "AISI 304L", peso: 0},
  
  { modelo: "PIPE ØEXT. 48,300 mmx2,800 mm",  materialMod: "", descricao: "PIPE ØEXT. 48.3x2.80mm", unidade: "m", quantidade: 3.1, material: "S235JR", peso: 0},
  { modelo: "48.3x3.0",  materialMod: "", descricao: "PIPE ØEXT. 48.3x3.00mm", unidade: "m", quantidade: 3.35, material: "S235JR", peso: 0},
  { modelo: "48.3x3.0",  materialMod: "P265GH", descricao: "PIPE ØEXT. 48.3x3.00mm", unidade: "m", quantidade: 3.35, material: "P265GH", peso: 0},
  { modelo: "48,3 x 3,6",  materialMod: "AISI 304L", descricao: "PIPE ØEXT. 48.3x3.60mm", unidade: "m", quantidade: 4.0, material: "AISI 304L", peso: 0},

  { modelo: "PIPE ØEXT. 60,300 mmx2,800 mm",  materialMod: "", descricao: "PIPE ØEXT. 60.3x2.80mm", unidade: "m", quantidade: 4.0, material: "S235JR", peso: 0},
  { modelo: "60,3 x 2,9",  materialMod: "AISI 304L", descricao: "PIPE ØEXT. 60.3x2.90mm", unidade: "m", quantidade: 4.2, material: "AISI 304L", peso: 0},
  { modelo: "60,3 x 3,2",  materialMod: "", descricao: "PIPE ØEXT. 60.3x3.20mm", unidade: "m", quantidade: 4.5, material: "S235JR", peso: 0},

  { modelo: "60,3 x 4",  materialMod: "", descricao: "PIPE ØEXT. 60.3x4.00mm", unidade: "m", quantidade: 5.55, material: "S235JR", peso: 0},
  { modelo: "60.3x4.0",  materialMod: "", descricao: "PIPE ØEXT. 60.3x4.00mm", unidade: "m", quantidade: 5.55, material: "S235JR", peso: 0},
  { modelo: "60,3 x 4",  materialMod: "P265GH", descricao: "PIPE ØEXT. 60.3x4.00mm", unidade: "m", quantidade: 5.55, material: "P265GH", peso: 0},

  { modelo: "73,0 x 5,2",  materialMod: "AISI 304L", descricao: "PIPE ØEXT. 73.0x5.20mm", unidade: "m", quantidade: 8.8, material: "AISI 304L", peso: 0},
  { modelo: "73 x 5,4",  materialMod: "", descricao: "PIPE ØEXT. 73.0x5.40mm", unidade: "m", quantidade: 9.0, material: "S235JR", peso: 0},

  { modelo: "88,9 x 5,6",  materialMod: "", descricao: "PIPE ØEXT. 88.9x5.60mm", unidade: "m", quantidade: 11.5, material: "S235JR", peso: 0},
  { modelo: "88.9x6.3",  materialMod: "", descricao: "PIPE ØEXT. 88.9x6.30mm", unidade: "m", quantidade: 12.8, material: "S235JR", peso: 0},
  { modelo: "88.9x6.3",  materialMod: "S275JR", descricao: "PIPE ØEXT. 88.9x6.30mm", unidade: "m", quantidade: 12.8, material: "S275JR", peso: 0},

  { modelo: "101.6x6.0",  materialMod: "", descricao: "PIPE ØEXT. 101.6x6.00mm", unidade: "m", quantidade: 14.15, material: "S235JR", peso: 0},
  { modelo: "101.6x6.0",  materialMod: "S275JR", descricao: "PIPE ØEXT. 101.6x6.00mm", unidade: "m", quantidade: 14.15, material: "S275JR", peso: 0},

  { modelo: "114.3x6.3",  materialMod: "", descricao: "PIPE ØEXT. 114.3x6.30mm", unidade: "m", quantidade: 16.78, material: "S235JR", peso: 0},
  { modelo: "114.3x6.3",  materialMod: "S275JR", descricao: "PIPE ØEXT. 114.3x6.30mm", unidade: "m", quantidade: 16.78, material: "S275JR", peso: 0},

  { modelo: "PIPE ØEXT. 152,400 mmx4,000 mm",  materialMod: "", descricao: "PIPE ØEXT. 152.4x4.00mm", unidade: "m", quantidade: 14.60, material: "S235JR", peso: 0},
  //TUBOS RETANGULAR
  { modelo: "60 x 30 x 2",  materialMod: "", descricao: "PIPE RECTANGULAR 60.0x30.0x2.00mm", unidade: "m", quantidade: 2.64, material: "S235JR", peso: 0},
  //PERFIL HEA
  { modelo: "HE 100 A",  materialMod: "", descricao: "HEA 100", unidade: "m", quantidade: 16.7, material: "S235JR", peso: 0},
  { modelo: "HE 120 A",  materialMod: "", descricao: "HEA 120", unidade: "m", quantidade: 19.9, material: "S235JR", peso: 0},
  { modelo: "HE 160 A",  materialMod: "", descricao: "HEA 160", unidade: "m", quantidade: 30.4, material: "S235JR", peso: 0},
  { modelo: "HE 200 A",  materialMod: "", descricao: "HEA 200", unidade: "m", quantidade: 42.3, material: "S235JR", peso: 0},
  //PERFIL HEB
  { modelo: "HE 100 B",  materialMod: "", descricao: "HEB 100", unidade: "m", quantidade: 20.4, material: "S235JR", peso: 0},
  { modelo: "HE 240 B",  materialMod: "", descricao: "HEB 240", unidade: "m", quantidade: 83.2, material: "S235JR", peso: 0},
  //PERFIL IPE
  { modelo: "IPE 100",  materialMod: "", descricao: "IPE 100", unidade: "m", quantidade: 8.1, material: "S235JR", peso: 0},
  { modelo: "IPE 180",  materialMod: "", descricao: "IPE 180", unidade: "m", quantidade: 18.8, material: "S235JR", peso: 0},
  { modelo: "IPE 200",  materialMod: "", descricao: "IPE 200", unidade: "m", quantidade: 22.4, material: "S235JR", peso: 0},
  { modelo: "IPE 220",  materialMod: "", descricao: "IPE 220", unidade: "m", quantidade: 26.2, material: "S235JR", peso: 0},
  //CHAVETA BARRA
  //CURVAS
  //INSTRUMENTAÇÃO
  { modelo: "CURVE ØEXT. 42.4x2.90mm",  materialMod: "", descricao: "CURVE ØEXT. 42.4x2.90mm", unidade: "N°", quantidade: 0, material: "S235JR", peso: 0},
  { modelo: "Tampão",  materialMod: "", descricao: "CAP", unidade: "N°", quantidade: 0, material: "S235JR", peso: 0},
  { modelo: "Bucha de redução",  materialMod: "", descricao: "REDUCING BUSH", unidade: "N°", quantidade: 0, material: "S235JR", peso: 0},
  { modelo: "Conexões de ferro fundido maleável - Plugues com rebordo T9",  materialMod: "", descricao: "PLUG", unidade: "N°", quantidade: 0, material: "S235JR", peso: 0},
  { modelo: "Encanamento - Conexões de aço inox com rosca de acordo com ISO 7-1 - Bolsa S2",  materialMod: "", descricao: "SOCKET", unidade: "N°", quantidade: 0, material: "S235JR", peso: 0},
  //GRADES
  { modelo: "DEGRAU",  materialMod: "GRATING", descricao: "GRATING TREADS - MESH 30X100  BEARING PLATE 30X4 (37.5 kg/m²)", unidade: "N°", quantidade: 8.405, material: "S235JR", peso: 0},
  { modelo: "SHEET TH. 30,000 mm",  materialMod: "GRATING", descricao: "GALVANIZED GRATING - MESH 22X66  BEARING PLATE 30X3 (38.2 kg/m²)", unidade: "N°", quantidade: 38.2, material: "S235JR", peso: 0},
  //{ modelo: ,  materialMod: , descricao: , unidade: , quantidade: , material: , peso: 0},
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
