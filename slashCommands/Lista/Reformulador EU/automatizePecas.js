const ExcelJS = require('exceljs');
const project = require('../../../dataBaseSchema/projectSchema');
const { getInvetoryMaterial } = require('./getInventoryMaterial.js');
const { errors } = require('./error.js');

const workbook = new ExcelJS.Workbook();

async function automatizePecas(filename) {
  await workbook.xlsx.readFile(filename);
  const sourceWorksheet = workbook.getWorksheet(1);
  const errorFile = { ...errors };

  // Remove as planilhas subsquententes que podem ser um processo anterior
  const woksheetsQuantity = workbook.worksheets.length;
  for (let i = 2; i <= woksheetsQuantity; i++) {
    workbook.removeWorksheet(i);
  }

  const pieceNumber = sourceWorksheet.getColumn(5);
  const countOccurrences = {};
  pieceNumber.eachCell((cell) => {
    if (typeof cell.value === 'string' && (cell.value != 'NÚMERO DA PEÇA')) {
      const cellValue = cell.value.substring(0, 7);
      countOccurrences[cellValue] = (countOccurrences[cellValue] || 0) + 1;
    }
  });

  // Encontrando o valor mais comum
  let projectCode = null;
  let highestCount = 0;

  Object.entries(countOccurrences).forEach(([value, count]) => {
    if (count > highestCount) {
      projectCode = value;
      highestCount = count;
    }
  });

  // Procura informações do Projeto
  const projectInfo = await project.findOne({ cod: projectCode });
  let projectStandardConfig;

  // Configura o Padrão do projeto
  if (projectInfo && projectInfo.standard) {
    projectStandardConfig = require(`../../../standardLanguage/${projectInfo.standard}.json`);
  } else {
    // Caso `project.standard` seja null, configura para o Brazil
    errorFile.errorCH15.boleanValue = true;
    projectStandardConfig = require('../../../standardLanguage/brazil.json');
  }

  // Le os códigos e cria planilhas correspondentes
  const columnDrawn = sourceWorksheet.getColumn(1);
  const drawCode = [];
  columnDrawn.eachCell((cell) => {
    if ((!drawCode.includes(cell.value)) && isNaN(cell.value) && cell.value != 'DESENHO') {
      drawCode.push(cell.value);
    }
  });

  // Cria as planilhas
  drawCode.sort();
  for (let i = 0; i < drawCode.length; i++) {
    workbook.addWorksheet(`${drawCode[i]} | PEÇAS`);
    workbook.addWorksheet(`${drawCode[i]} | MATERIAL`);
  }

  // Adiciona primeira Linha com informações
  const copyRow = sourceWorksheet.getRow(1);
  for (let i = 1; i < workbook.worksheets.length; i++) {
    if (i % 2 == 0) {
      workbook.worksheets[i].insertRow(1, ['NÚMERO DE ESTOQUE', 'MATERIAL', 'QTDE', 'PESO']);
    } else {
      workbook.worksheets[i].insertRow(1, copyRow.values);
    }
  }

  // Copia da planilha principal e move para secundária
  const itemCol = sourceWorksheet.getColumn(3);
  itemCol.eachCell((cell, rowNumber) => {
    cell.value = cell.value !== null ? cell.value.toString() : null;
    if (!(cell?.value?.includes('.') || cell?.value?.includes('ITEM'))) {
      const copyPecaRow = sourceWorksheet.getRow(rowNumber);
      if (copyPecaRow.values[1] != undefined) {
        const targetSheet = workbook.getWorksheet(`${copyPecaRow.values[1]} | PEÇAS`);
        const copyPecaRowProcess = copyPecaRow.values.slice(0, 10);
        targetSheet.insertRow(targetSheet.lastRow.number + 1, copyPecaRowProcess);
        if (copyPecaRow.values[7] != 'Descrição') {
          const targetSheetMat = workbook.getWorksheet(`${copyPecaRow.values[1]} | MATERIAL`);
          const copyPecaRowProcess = [];
          copyPecaRowProcess.push(copyPecaRow.values[7]);
          copyPecaRowProcess.push(copyPecaRow.values[8]);
          copyPecaRowProcess.push(copyPecaRow.values[12].result);
          copyPecaRowProcess.push(copyPecaRow.values[11].result);
          targetSheetMat.insertRow(targetSheetMat.lastRow.number + 1, copyPecaRowProcess);
        }
      }
    } else if (cell?.value?.includes('.')) {
      const copyPecaRow = sourceWorksheet.getRow(rowNumber);
      if (copyPecaRow.values[1] != undefined) {
        const targetSheet = workbook.getWorksheet(`${copyPecaRow.values[1]} | MATERIAL`);
        const copyPecaRowProcess = [];
        copyPecaRowProcess.push(copyPecaRow.values[7]);
        copyPecaRowProcess.push(copyPecaRow.values[8]);
        copyPecaRowProcess.push(copyPecaRow.values[12].result);
        copyPecaRowProcess.push(copyPecaRow.values[11].result);
        targetSheet.insertRow(targetSheet.lastRow.number + 1, copyPecaRowProcess);
      }
    }
  });

  let weightTotal = 0;
  let materialWeightTotal = 0;

  for (let i = 1; i < workbook.worksheets.length; i++) {
    const targetSheet = workbook.worksheets[i];

    if (i % 2 !== 0) {
      // Ajeita a planilha de peças
      targetSheet.spliceColumns(10, 1, [], ['PESO UNIT.'], ['PESO TOTAL']);
      let saveRows = [];
      for (let c = 2; c <= targetSheet.lastRow.number; c++) {
        saveRows.push(targetSheet.getRow(c).values);
      }

      const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
      saveRows = saveRows.sort(collator.compare);

      weightTotal = 0;
      for (let c = 2; c <= targetSheet.lastRow.number; c++) {
        const pieceWeight = +saveRows[c - 2][9].toFixed(1);
        const pieceTotalWeight = pieceWeight * saveRows[c - 2][4];
        weightTotal += pieceTotalWeight;

        saveRows[c - 2].push('', pieceWeight, pieceTotalWeight);
        targetSheet.getRow(c).values = saveRows[c - 2];
      }
    } else {
      // Ajeita planilha de Material
      targetSheet.spliceColumns(10, 1, [], [], ['POS.'], ['DESCRIÇÃO'], ['UNIDADE'], ['QUANTIDADE'], ['MATERIAL/PADRÃO'], ['PESO [kg]']);
      let materialList = [''];
      materialWeightTotal = 0;

      for (let rowNumber = 2; rowNumber <= targetSheet.lastRow.number; rowNumber++) {
        const materialTarget = targetSheet.getRow(rowNumber).values;
        let found = false;

        const findPosMaterial = await getInvetoryMaterial(materialTarget[1], materialTarget[2], projectStandardConfig.STANDARD);
        const inventoryMaterialDB = [
          findPosMaterial.position,
          findPosMaterial.description,
          findPosMaterial.unity,
          findPosMaterial.weight,
          findPosMaterial.material,
          materialTarget[4]
        ];

        for (const material of materialList) {
          if (inventoryMaterialDB[1] === material[1] && inventoryMaterialDB[4] === material[4]) {
            material[5] += inventoryMaterialDB[5];
            found = true;
            break;
          }
        }

        if (!found) {
          materialList.push(inventoryMaterialDB);
        }
      }

      materialList.shift();
      materialList = materialList.sort((a, b) => a[0] - b[0]);

      for (let i = 0; i < materialList.length; i++) {
        // Preencher "POS."
        targetSheet.getCell(`L${i + 2}`).value = i + 1;

        // Preencher "DESCRIÇÃO"
        targetSheet.getCell(`M${i + 2}`).value = materialList[i][1];

        // Preencher "UNIDADE" e indicar ao usuario caso seja NULL
        targetSheet.getCell(`N${i + 2}`).value = materialList[i][2];
        if (materialList[i][2] === 'NULL') {
          errorFile.errorCH14.boleanValue = true;
          targetSheet.getCell(`N${i + 2}`).style = {
            fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '6D88AD' } },
          };
        }

        // Preencher "MATERIAL/PADRÃO"
        targetSheet.getCell(`P${i + 2}`).value = materialList[i][4];

        // Preencher "PESO [kg]" e tratar erro
        let weighMaterial = materialList[i][5];
        weighMaterial = weighMaterial < 0.1 ? 0.1 : +weighMaterial.toFixed(1);
        materialWeightTotal += weighMaterial;
        targetSheet.getCell(`Q${i + 2}`).value = weighMaterial;

        // Preencher "QUANTIDADE" e tratar erro
        let qtyMaterial = weighMaterial / materialList[i][3];
        qtyMaterial = isFinite(qtyMaterial) ? (qtyMaterial < 0.1 ? 0.1 : +qtyMaterial.toFixed(1)) : 'NULL';
        targetSheet.getCell(`O${i + 2}`).value = qtyMaterial;
        if (qtyMaterial === 'NULL') {
          errorFile.errorCH14.boleanValue = true;
          targetSheet.getCell(`O${i + 2}`).style = {
            fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '6D88AD' } },
          };
        }
      }

      // Verifica o Peso entre Lista de Peças e Lista de Material
      if (Math.abs(weightTotal - materialWeightTotal) > 0.01) {
        errorFile.errorCH13.boleanValue = true;
        targetSheet.properties.tabColor = {
          argb: 'FFC00000',
        };
      }
    }

    // Ajeita o Tamanho das colunas
    targetSheet.columns.forEach((column) => {
      let maxLength = 0;
      column.eachCell({ includeEmpty: false }, (cell) => {
        const columnLength = cell.value ? cell.value.toString().length : 10;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = maxLength < 10 ? 10 : maxLength;
    });
  }

  await workbook.xlsx.writeFile(`${filename}`);

  const mergedError = await errorFile.printErrors();

  return [mergedError, `${filename.replace('.xlsx', '')}.xlsx`];
}

module.exports.automatizePecas = automatizePecas;
