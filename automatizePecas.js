const ExcelJS = require('exceljs');
const filename = "./2023-02-15_LISTA MATERIAL - C0011_00_CHLOE_LES.xlsx";
const codigoDeProjeto = "C122005";

const workbook = new ExcelJS.Workbook();

async function f1() {
    await workbook.xlsx.readFile(filename).then(async function () {
        let sourceWorksheet = workbook.getWorksheet(1);
        workbook.addWorksheet('Teste')

        workbook.xlsx.writeFile(`${filename}`);
    });
    
};

f1();
