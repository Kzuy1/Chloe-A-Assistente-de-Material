const ExcelJS = require('exceljs');
const { findMaterialPos } = require('./findMaterial.js');
const filename = "./2023-02-15_LISTA MATERIAL - C0011_00_CHLOE_LES.xlsx";
const codigoDeProjeto = "C122005";

const workbook = new ExcelJS.Workbook();

async function f1() {
  await workbook.xlsx.readFile(filename).then(async function() {
    let sourceWorksheet = workbook.getWorksheet(1);

    workbook.removeWorksheet(7);
    workbook.removeWorksheet(6);
    workbook.removeWorksheet(5);
    workbook.removeWorksheet(4);
    workbook.removeWorksheet(3);
    workbook.removeWorksheet(2);

    //Le os códigos e cria planilhas correspondentes
    const colDesenho = sourceWorksheet.getColumn(1);
    let desenhoCodigo = [];
    colDesenho.eachCell(function(cell, rowNumber) {
      if ((!desenhoCodigo.includes(cell.value)) && isNaN(cell.value) && cell.value != "DESENHO") {
        desenhoCodigo.push(cell.value);
      };
    });

    //Cria as planilhas
    desenhoCodigo.sort()
    for (i = 0; i < desenhoCodigo.length; i++) {
      workbook.addWorksheet(`${desenhoCodigo[i]} - PEÇAS`);
      workbook.addWorksheet(`${desenhoCodigo[i]} - MATERIAL`);
    };

    //Adiciona primeira Linha com informações
    let copyRow = sourceWorksheet.getRow(1);
    for (i = 1; i < workbook.worksheets.length; i++) {
      if (i % 2 == 0) {
        workbook.worksheets[i].insertRow(1, ["NÚMERO DE ESTOQUE", "MATERIAL", "PESO"]);
      } else {
        workbook.worksheets[i].insertRow(1, copyRow.values);
      }
    };

    //Copia da planilha principal e move para secundária
    const itemCol = sourceWorksheet.getColumn(3);
    itemCol.eachCell(function(cell, rowNumber) {
      if (!(cell.value.includes(".") || cell.value.includes("ITEM"))) {
        let copyPecaRow = sourceWorksheet.getRow(rowNumber);
        if (copyPecaRow.values[1] != undefined) {
          let targetSheet = workbook.getWorksheet(`${copyPecaRow.values[1]} - PEÇAS`);
          let copyPecaRowProcess = copyPecaRow.values.slice(0, 10);
          targetSheet.insertRow(targetSheet.lastRow.number + 1, copyPecaRowProcess);
          if(copyPecaRow.values[7] != "Descrição"){
            let targetSheetMat = workbook.getWorksheet(`${copyPecaRow.values[1]} - MATERIAL`);
            let copyPecaRowProcess = [];
            copyPecaRowProcess.push(copyPecaRow.values[7]);
            copyPecaRowProcess.push(copyPecaRow.values[8]);
            copyPecaRowProcess.push(copyPecaRow.values[11].result);
            targetSheetMat.insertRow(targetSheetMat.lastRow.number + 1, copyPecaRowProcess);
          };
        };
      } else if (cell.value.includes(".")) {
        let copyPecaRow = sourceWorksheet.getRow(rowNumber);
        if (copyPecaRow.values[1] != undefined) {
          let targetSheet = workbook.getWorksheet(`${copyPecaRow.values[1]} - MATERIAL`);
          let copyPecaRowProcess = [];
          copyPecaRowProcess.push(copyPecaRow.values[7]);
          copyPecaRowProcess.push(copyPecaRow.values[8]);
          copyPecaRowProcess.push(copyPecaRow.values[11].result);
          targetSheet.insertRow(targetSheet.lastRow.number + 1, copyPecaRowProcess);
        };
      };
    });

    //Ajeita a planilha de peças
    for (i = 1; i < workbook.worksheets.length; i += 2) {
      let targetSheet = workbook.worksheets[i];
      targetSheet.spliceColumns(10, 1, [], ["PESO UNIT."], ["PESO TOTAL"]);
      let saveRows = [];
      for (c = 2; c <= targetSheet.lastRow.number; c++) {
        saveRows.push(targetSheet.getRow(c).values);
      };

      let collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
      saveRows = saveRows.sort(collator.compare);

      for (c = 2; c <= targetSheet.lastRow.number; c++) {
        let pesoPeca = +saveRows[c - 2][9].toFixed(1);
        saveRows[c - 2].push("", pesoPeca, pesoPeca * saveRows[c - 2][4]);
        targetSheet.getRow(c).values = saveRows[c - 2];
      };
    };

    //Ajeita planilha de Matérial
    for (i = 2; i < workbook.worksheets.length; i += 2) {
      let targetSheet = workbook.worksheets[i];
      targetSheet.spliceColumns(10, 1, [], [], ["POS."], ["DESCRIÇÃO"], ["UNIDADE"], ["QUANTIDADE"], ["MATERIAL/PADRÃO"], ["PESO [kg]"]);
      let materialList = [""];
      
      for (c = 2; c <= targetSheet.lastRow.number; c++) {
        let materialTarget = targetSheet.getRow(c).values
        for(cont = 0; cont < materialList.length; cont++){
          if(materialTarget[1] == materialList[cont][1] && materialTarget[2] == materialList[cont][4]){
            materialList[cont][5] += materialTarget[3];
            break;
          } else if(cont == materialList.length-1){
            let materialCorri = findMaterialPos(materialTarget[1], materialTarget[2]);
            materialCorri[5] += materialTarget[3];
            materialList.push(materialCorri);
            break;
          }
        };

      };

      materialList.shift();
      materialList = materialList.sort((a, b) => a[0] - b[0]);

      let pos = targetSheet.getColumn(12);
      let valuesPos = ["POS."];
      for(c1 = 1; c1 <= materialList.length; c1++){
        valuesPos.push(c1);
      };
      pos.values = valuesPos;

      let descricao = targetSheet.getColumn(13);
      let valuesDescricao = ["DESCRIÇÃO"];
      for(c2 = 0; c2 < materialList.length; c2++){
        valuesDescricao.push(materialList[c2][1])
      };
      descricao.values = valuesDescricao;

      let unidade = targetSheet.getColumn(14);
      let valuesUnidade = ["UNIDADE"];
      for(c3 = 0; c3 < materialList.length; c3++){
        valuesUnidade.push(materialList[c3][2])
      };
      unidade.values = valuesUnidade;

      let materialPadrao = targetSheet.getColumn(16);
      let valuesMaterialPadrao = ["MATERIAL/PADRÃO"];
      for(c5 = 0; c5 < materialList.length; c5++){
        valuesMaterialPadrao.push(materialList[c5][4]);
      }
      materialPadrao.values = valuesMaterialPadrao;

      let peso = targetSheet.getColumn(17);
      let valuesPeso = ["PESO [kg]"];
      for(c6 = 0; c6 < materialList.length; c6++){
        valuesPeso.push(+materialList[c6][5].toFixed(1));
      }
      peso.values = valuesPeso;

      let qtde = targetSheet.getColumn(15);
      let valuesQtde = ["QUANTIDADE"];
      for(c4 = 0; c4 < materialList.length; c4++){
        let pesoMaterial = targetSheet.getCell(`Q${c4+2}`).value;
        let result  = pesoMaterial/materialList[c4][3];
        valuesQtde.push(+result.toFixed(1));
      }
      qtde.values = valuesQtde;
    };

    workbook.xlsx.writeFile(`${filename}`);
  });

};

f1();
