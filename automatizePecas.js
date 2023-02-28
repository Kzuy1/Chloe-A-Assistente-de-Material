const ExcelJS = require('exceljs');
const filename = "./2023-02-15_LISTA MATERIAL - C0011_00_CHLOE_LES.xlsx";
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
        desenhoCodigo.sort()
        for(i = 0; i < desenhoCodigo.length; i++){
            workbook.addWorksheet(`${desenhoCodigo[i]} - PEÇAS`);
            workbook.addWorksheet(`${desenhoCodigo[i]} - MATERIAL`);
        };

        //Adiciona primeira Linha com informações
        let copyRow = sourceWorksheet.getRow(1);
        for(i = 1; i < workbook.worksheets.length; i++){
            workbook.worksheets[i].insertRow(1, copyRow.values);
        };

        const itemCol = sourceWorksheet.getColumn(3);
        itemCol.eachCell(function(cell, rowNumber) {
            if(!(cell.value.includes(".") || cell.value.includes("ITEM"))){
                let copyPecaRow = sourceWorksheet.getRow(rowNumber);
                if(copyPecaRow.values[1] != undefined){
                    let targetSheet = workbook.getWorksheet(`${copyPecaRow.values[1]} - PEÇAS`);
                    targetSheet.insertRow(targetSheet.lastRow.number + 1, copyPecaRow.values);
                };
            } else if(cell.value.includes(".")){
                // let copyPecaRow = sourceWorksheet.getRow(rowNumber);
                // if(copyPecaRow.values[1] != undefined){
                //     let targetSheet = workbook.getWorksheet(`${copyPecaRow.values[1]} - MATERIAL`);
                //     targetSheet.insertRow(targetSheet.lastRow.number + 1, copyPecaRow.values);
                // };
            };
        });

        workbook.xlsx.writeFile(`${filename}`);
    });
    
};

f1();
