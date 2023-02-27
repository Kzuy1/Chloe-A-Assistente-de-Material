const ExcelJS = require('exceljs');
const filename = "./2023-02-15_LISTA MATERIAL - C0011_00_CHLOE_LES - Copy.xlsx";
const codigoDeProjeto = "C122005";

const workbook = new ExcelJS.Workbook();

async function f1() {
    await workbook.xlsx.readFile(filename).then(async function () {
        let sourceWorksheet = workbook.getWorksheet(1);

        //Le os códigos e cria planilhas correspondentes
        const colDesenho = sourceWorksheet.getColumn(1);
        let desenhoCodigo = [];
        colDesenho.eachCell(function(cell, rowNumber){
            if((!desenhoCodigo.includes(cell.value)) && isNaN(cell.value) && cell.value != "DESENHO"){
                desenhoCodigo.push(cell.value);
            };
        });

        //Cria as planilhas
        for(i = 0; i < desenhoCodigo.length; i++){
            workbook.addWorksheet(`${desenhoCodigo[i]} - PEÇAS`);
            workbook.addWorksheet(`${desenhoCodigo[i]} - MATERIAL`);
        };



        workbook.xlsx.writeFile(`${filename}`);
    });
    
};

f1();
