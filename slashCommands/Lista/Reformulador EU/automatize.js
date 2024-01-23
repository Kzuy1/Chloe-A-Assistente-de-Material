const ExcelJS = require('exceljs');
const project = require('../../../dataBaseSchema/projectSchema');
const { findMaterial } = require('./findMaterial');
const { adjustMaterial } = require('./adjustMaterial');
const { errors } = require('./error');

async function automatize(filename) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filename);

  const errorFile = { ...errors };
  const sourceWorksheet = workbook.getWorksheet(1);
  const targetWorkbook = new ExcelJS.Workbook();
  const targetSheet = targetWorkbook.addWorksheet(sourceWorksheet.name);

  targetSheet.model = Object.assign(sourceWorksheet.model, {
    views: [{ state: 'frozen', ySplit: 1 }],
  });

  targetSheet.spliceColumns(1, 0, ['DESENHO'], ['PEÇA']);

  // Procura o Código de Projeto que mais se repete, e verifica se estão em todas as peças
  const numberoPeca = targetSheet.getColumn(5);
  const countOccurrences = {};
  numberoPeca.eachCell((cell) => {
    if (typeof cell.value === 'string' && (cell.value !== 'NÚMERO DA PEÇA')) {
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

  // Verifica na planilha o codigo do projeto
  numberoPeca.eachCell((cell) => {
    if ((!cell?.value?.includes(projectCode)) && (cell.value !== 'NÚMERO DA PEÇA')) {
      errorFile.errorCH10.boleanValue = true;
      cell.style = {
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'CB2821' } },
      };
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

  // Adiciona coluna Desenho e Peça
  for (let rowIndex = 1; rowIndex <= targetSheet.rowCount; rowIndex++) {
    targetSheet.getRow(rowIndex).alignment = { wrapText: false };
  }

  // Verifica Index para Adicionar linhas
  const itemCol = targetSheet.getColumn(3);
  const rowAdd = [];
  itemCol.eachCell((cell, rowNumber) => {
    cell.value = cell.value !== null ? cell.value.toString() : null;
    if (cell.value == null) {
      errorFile.errorCH01.boleanValue = true;
      cell.style = {
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '6ddd35' } },
      };
    } else if (!cell?.value?.includes('.') && cell.value !== 'ITEM' && rowNumber != 2) {
      rowAdd.push(rowNumber);
    }
  });

  // Adiciona uma linha em cima
  for (let i = 0; i < rowAdd.length; i++) {
    targetSheet.insertRow(rowAdd[i] + i);
  }

  // Move do Estoque Perfil para outra coluna de material
  const estoqueCol = targetSheet.getColumn(6);
  estoqueCol.eachCell((cell, rowNumber) => {
    if (cell.value !== null) {
      targetSheet.getCell(`G${rowNumber}`).value = cell.value;
    }
  });

  // Procura o material e substitui
  const estoqueCol2 = targetSheet.getColumn(7);
  estoqueCol2.eachCell((cell, rowNumber) => {
    cell.value = cell.value !== null ? cell.value.toString() : null;
    if (cell.value == null) {
      if (targetSheet.getCell(`H${rowNumber}`).value != 'Generic') {
        errorFile.errorCH02.boleanValue = true;
        cell.style = {
          fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '6ddd35' } },
        };
      }
    } else if (!(cell?.value?.includes('NÚMERO DE ESTOQUE') || cell?.value?.includes('Descrição'))) {
      cell.value = cell.value.replace(/^\s+|\s+$/g, '');
      let material;
      const tipoMaterial = targetSheet.getCell(`H${rowNumber}`);

      if (tipoMaterial?.value?.includes('+')) {
        const materialEstoque = targetSheet.getCell(`F${rowNumber}`);
        const materialEstoque1 = targetSheet.getCell(`G${rowNumber}`);
        materialEstoque.value = materialEstoque.value.replace('SHEET TH.', 'EMBOSSED PLATE Sp.');
        materialEstoque1.value = materialEstoque1.value.replace('SHEET TH.', 'EMBOSSED PLATE Sp.');
        tipoMaterial.value = projectStandardConfig.SHEET_STANDARD;
      }

      if (tipoMaterial?.value?.includes('GRATING')) {
        const materialEstoque = targetSheet.getCell(`F${rowNumber}`);
        const materialEstoque1 = targetSheet.getCell(`G${rowNumber}`);
        materialEstoque.value = materialEstoque.value.replace('SHEET TH.', 'GRATING');
        materialEstoque1.value = materialEstoque1.value.replace('SHEET TH.', 'GRATING');
        tipoMaterial.value = projectStandardConfig.SHEET_STANDARD;
      }

      if (tipoMaterial.value != 'S235JR' && tipoMaterial.value != 'ASTM-A36') {
        errorFile.alertCL01.boleanValue = true;
      }

      material = findMaterial(cell.value, tipoMaterial.value, projectStandardConfig.STANDARD);

      if (material == undefined) {
        errorFile.errorCH03.boleanValue = true;
        cell.style = {
          fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'E6D690' } },
        };
      } else {
        if (material.peso === null) {
          errorFile.errorCH11.boleanValue = true;
          tipoMaterial.style = {
            fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'D48719' } },
          };
        }
        cell.value = material.description;
        targetSheet.getCell(`H${rowNumber}`).value = material.material;
      }
    }
  });

  // Verifica o Peso
  const massaCol = targetSheet.getColumn(9);
  massaCol.eachCell((cell) => {
    if (cell.value == null) {
      errorFile.errorCH04.boleanValue = true;
      cell.style = {
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '6ddd35' } },
      };
    } else if (typeof cell.value === 'string' && cell?.value?.includes('kg')) {
      cell.value = cell.value.replace(' kg', '').replace(',', '.');
      cell.value = Number(cell.value);
    } else if (typeof cell.value === 'string' && cell?.value?.includes('lb_massa')) {
      errorFile.errorCH05.boleanValue = true;
      cell.style = {
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F08080' } },
      };
    } else if (typeof cell.value === 'string' && cell?.value?.includes('*Varia*')) {
      errorFile.errorCH12.boleanValue = true;
      cell.style = {
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F08080' } },
      };
    }
  });

  // Verifica o QTDE
  const qtdeBaseCol = targetSheet.getColumn(10);
  qtdeBaseCol.eachCell((cell) => {
    if (cell.value == null) {
      errorFile.errorCH06.boleanValue = true;
      cell.style = {
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '79553D' } },
      };
    } else if (typeof cell.value === 'string' && cell?.value?.includes('mm')) {
      cell.value = cell.value.replace(' mm', '').replace(',', '.');
      cell.value = Number(cell.value);
    } else if (typeof cell.value === 'string' && cell?.value?.includes('in')) {
      cell.value = cell.value.replace(' in', '').replace(',', '.');
      cell.value = Number(cell.value) * 25.4;
    } else if (typeof cell.value === 'string' && cell?.value?.includes('pol')) {
      cell.value = cell.value.replace(' pol', '').replace(',', '.');
      cell.value = Number(cell.value) * 25.4;
    }
  });

  // Verifica tem Descrição dentro de uma peça
  const estoqueCol21 = targetSheet.getColumn(7);
  estoqueCol21.eachCell((cell, rowNumber) => {
    if ((cell.value != null) && (cell.value.includes('Descrição'))) {
      if (targetSheet.getCell(`C${rowNumber}`).value.includes('.')) {
        errorFile.errorCH07.boleanValue = true;
        cell.style = {
          fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F5D033' } },
        };
      }
    }
  });

  // Adiciona as formulas e colhe o material para colocar nas peças
  const itemColUpdate = targetSheet.getColumn(3);
  const localizePontos = [];
  itemColUpdate.eachCell((cell, rowNumber) => {
    if ((cell.value != null) && (!cell.value.includes('.')) && (cell.value != 'ITEM')) {
      const result = targetSheet.getCell(`D${rowNumber}`) * targetSheet.getCell(`I${rowNumber}`);
      targetSheet.getCell(`K${rowNumber}`).value = { formula: `D${rowNumber}*I${rowNumber}`, result };

      const result1 = targetSheet.getCell(`D${rowNumber}`) * targetSheet.getCell(`J${rowNumber}`);
      targetSheet.getCell(`L${rowNumber}`).value = { formula: `D${rowNumber}*J${rowNumber}`, result: result1 };

      localizePontos.push({
        adress: rowNumber, index: cell.value, pesoMaterial: 0, material: [],
      });
    } else if ((cell.value != null) && (cell.value.includes('.')) && (cell.value != 'ITEM')) {
      const conjuntoFind = localizePontos.find(({ index }) => index === cell.value.split('.')[0]);
      const conjuntoIndex = localizePontos.findIndex(({ index }) => index === cell.value.split('.')[0]);

      const result = targetSheet.getCell(`D${rowNumber}`) * targetSheet.getCell(`I${rowNumber}`) * targetSheet.getCell(`D${conjuntoFind.adress}`);
      targetSheet.getCell(`K${rowNumber}`).value = { formula: `D${rowNumber}*I${rowNumber}*$D$${conjuntoFind.adress}`, result };

      const result1 = targetSheet.getCell(`D${rowNumber}`) * targetSheet.getCell(`J${rowNumber}`) * targetSheet.getCell(`D${conjuntoFind.adress}`);
      targetSheet.getCell(`L${rowNumber}`).value = { formula: `D${rowNumber}*J${rowNumber}*D$${conjuntoFind.adress}`, result: result1 };

      const material = targetSheet.getCell(`H${rowNumber}`);
      localizePontos[conjuntoIndex].material.push(material.value);
      localizePontos[conjuntoIndex].pesoMaterial += result;
    }
  });

  // Adiciona os matériais as Peças
  for (let i = 0; i < localizePontos.length; i++) {
    if (localizePontos[i].material != false) {
      const newMaterial = adjustMaterial(localizePontos[i].material);
      const materialPieceCell = targetSheet.getCell(`H${localizePontos[i].adress}`);
      materialPieceCell.value = newMaterial.nameMaterial;

      if (newMaterial.error) {
        errorFile.errorCH11.boleanValue = true;
        materialPieceCell.style = {
          fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'D48719' } },
        };
      }

      const infoPeca = targetSheet.getCell(`K${localizePontos[i].adress}`);
      const pesoPeca = infoPeca.value.result;

      if (pesoPeca == undefined) {
        errorFile.errorCH04.boleanValue = true;
        infoPeca.style = {
          fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '39FF42' } },
        };
      } else if (localizePontos[i].pesoMaterial > (pesoPeca + 0.1) || localizePontos[i].pesoMaterial < (pesoPeca - 0.1) || isNaN(localizePontos[i].pesoMaterial)) {
        errorFile.errorCH09.boleanValue = true;
        infoPeca.style = {
          fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '7F7679' } },
        };
      }
    }
  }

  // Adiciona o Filtro
  targetSheet.autoFilter = {
    from: {
      row: 1,
      column: 1,
    },
    to: {
      row: targetSheet.lastRow.number,
      column: 12,
    },
  };

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

  await targetWorkbook.xlsx.writeFile(`${filename.replace('.xlsx', '')}_CHLOE.xlsx`);

  const mergedError = await errorFile.printErrors();

  return [mergedError, `${filename.replace('.xlsx', '')}_CHLOE.xlsx`];
}

module.exports.automatize = automatize;
