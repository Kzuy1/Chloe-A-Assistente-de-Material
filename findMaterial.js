const findMaterial = (material) => {
    let listMaterial = [
        //CHAPAS MM
        {modelo: "SHEET TH. 2,000 mm", descricao: "CHAPA ESP. 2.0mm", material: "ASTM A-36"},
        //CHAPAS POL
        {modelo: "SHEET TH. 4,763 mm", descricao: "CHAPA 3/16\"", material: "ASTM A-36"},
        {modelo: "SHEET TH. 6,350 mm", descricao: "CHAPA 1/4\"", material: "ASTM A-36"},
        {modelo: "SHEET TH. 7,938 mm", descricao: "CHAPA 5/16\"", material: "ASTM A-36"},
        {modelo: "SHEET TH. 9,525 mm", descricao: "CHAPA 3/8\"", material: "ASTM A-36"},
        {modelo: "SHEET TH. 12,700 mm", descricao: "CHAPA 1/2\"", material: "ASTM A-36"},
        {modelo: "SHEET TH. 15,875 mm", descricao: "CHAPA 5/8\"", material: "ASTM A-36"},
        {modelo: "SHEET TH. 19,050 mm", descricao: "CHAPA 3/4\"", material: "ASTM A-36"},
        {modelo: "SHEET TH. 25,400 mm", descricao: "CHAPA 1\"", material: "ASTM A-36"},
        {modelo: "SHEET TH. 31,750 mm", descricao: "CHAPA 1.1/4\"", material: "ASTM A-36"},
        {modelo: "SHEET TH. 50,800 mm", descricao: "CHAPA 2\"", material: "ASTM A-36"},
        //PERFIL L
        {modelo: "L 2 x 2 x 3/16", descricao: "L 2\" x 3/16\"", material: "ASTM A-36"},
        {modelo: "L 2 x 2 x 1/4", descricao: "L 2\" x 1/4\"", material: "ASTM A-36"},
        {modelo: "L 2 1/2 x 2 1/2 x 3/16", descricao: "L 2.1/2\" x 3/16\"", material: "ASTM A-36"},
        {modelo: "L 3 x 3 x 3/16", descricao: "L 3\" x 3/16\"", material: "ASTM A-36"},
        {modelo: "L 3 x 3 x 1/4", descricao: "L 3\" x 1/4\"", material: "ASTM A-36"},
        //PERFIL U
        {modelo: "C 4x5.4", descricao: "PERFIL U 4\" - 1ªALMA", material: "ASTM A-36"},
        {modelo: "C 4 x 5,4", descricao: "PERFIL U 4\" - 1ªALMA", material: "ASTM A-36"},
        {modelo: "C 6x8.2", descricao: "PERFIL U 6\" - 1ªALMA", material: ""},
        {modelo: "C 6 x 8,2", descricao: "PERFIL U 6\" - 1ªALMA", material: "ASTM A-36"},
        //TUBOS
        {modelo: "PIPE ØEXT. 33,400 mmx3,380 mm", descricao: "TUBO DN 1\" SCH40", material: "ASTM A53 Gr.B"},
        {modelo: "PIPE ØEXT. 42,200 mmx3,560 mm", descricao: "TUBO DN 1.1/4\" SCH40", material: "ASTM A53 Gr.B"},
        //PERFIL W
        {modelo: "W150 x 22.5", descricao: "W 150x22.5", material: "ASTM A572 Gr. 50"},
        {modelo: "W200 x 26.6", descricao: "W 200x26.6", material: "ASTM A572 Gr. 50"},
        {modelo: "W200 x 46.1", descricao: "W 200x46,1", material: "ASTM A572 Gr. 50"},
        {modelo: "W200 x 52", descricao: "W 200x52", material: "ASTM A572 Gr. 50"},
        {modelo: "W250 x 32.7", descricao: "W 200x32.7", material: "ASTM A572 Gr. 50"},
        //CURVAS
        {modelo: "CURVA 90º DN 1.1/4\" SCH40 CFME ANSI B16.9 RC", descricao: "CURVA 90º DN 1.1/4\" SCH40 CFME ANSI B16.9 RC", material: "ASTM A-36"},
        //{modelo: "", descricao: "", material: ""},
    ] 

    return listMaterial.find(({modelo}) => modelo === material)
}

module.exports = {findMaterial}