const ExcelJS = require('exceljs');
const { findMaterial, findMaterialEsp } = require('./findMaterial.js');
const { adjustMaterial } = require('./adjustMaterial.js');
const { error, print} = require('./error.js');

const codigoDeProjeto = "C122021";

async function automatize(filename) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filename)

  let sourceWorksheet = workbook.getWorksheet(1);
  let targetWorkbook = new ExcelJS.Workbook();
  let targetSheet = targetWorkbook.addWorksheet(sourceWorksheet.name);

  targetSheet.model = Object.assign(sourceWorksheet.model, {
    views: [{ state: 'frozen', ySplit: 1 }],
  });

  targetSheet.spliceColumns(1, 0, ["DESENHO"], ["PEÇA"]);

  //Adiciona coluna Desenho e Peça
  for (rowIndex = 1; rowIndex <= targetSheet.rowCount; rowIndex++) {
    targetSheet.getRow(rowIndex).alignment = { wrapText: false };
  };

  //Verifica Index para Adicionar linhas
  const itemCol = targetSheet.getColumn(3);
  let rowAdd = [];
  itemCol.eachCell(function(cell, rowNumber) {
    cell.value = cell.value !== null ? cell.value.toString() : "";
    if (cell.value == "") {
      error[0].cell.push(cell.address)
      cell.style = {
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '6ddd35' } },
      };
    } else if (!cell.value.includes(".") && cell.value !== "ITEM" && rowNumber != 2) {
      rowAdd.push(rowNumber);
    }
  });

  //Adiciona uma linha em cima
  for (i = 0; i < rowAdd.length; i++) {
    targetSheet.insertRow(rowAdd[i] + i);

  }

  //Move do Estoque Perfil para outra coluna de material
  const estoqueCol = targetSheet.getColumn(6);
  estoqueCol.eachCell(function(cell, rowNumber) {
    let valor = targetSheet.getCell(`G${rowNumber}`).value;
    valor = valor != null ? valor.toString() : "";
    if (!valor.includes("CURVA") && cell.value != null) {
      targetSheet.getCell(`G${rowNumber}`).value = cell.value;
    }
  });

  //Procura o material e substitui
  const estoqueCol2 = targetSheet.getColumn(7);
  estoqueCol2.eachCell(function(cell, rowNumber) {
    cell.value = cell.value !== null ? cell.value.toString() : "";
    if (cell.value == null) {
      if (targetSheet.getCell(`H${rowNumber}`).value != "Generic") {
        error[1].cell.push(cell.address)
        cell.style = {
          fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '6ddd35' } },
        };
      }
    } else if (!(cell.value.includes("NÚMERO DE ESTOQUE") || cell.value.includes("Descrição"))) {
      cell.value = cell.value.replace(/^\s+|\s+$/g, "");
      let material;
      let tipoMaterial = targetSheet.getCell(`H${rowNumber}`);

      if(tipoMaterial.value.includes("+")){
        let materialEstoque = targetSheet.getCell(`F${rowNumber}`);
        let materialEstoque1 = targetSheet.getCell(`G${rowNumber}`);
        materialEstoque.value = materialEstoque.value.replace("SHEET TH.", "EMBOSSED PLATE Sp.");
        materialEstoque1.value = materialEstoque1.value.replace("SHEET TH.", "EMBOSSED PLATE Sp.");
        tipoMaterial.value = "S235JR";
      }
      if (tipoMaterial.value != "S235JR") {
        error[10].cell.push(`H${rowNumber}`)
        material = findMaterialEsp(cell.value, tipoMaterial);
      } else {
        material = findMaterial(cell.value);
      };

      if (material == undefined) {
        error[2].cell.push(cell.address)
        cell.style = {
          fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '6ddd35' } },
        };
      } else {
        cell.value = material.descricao;
        targetSheet.getCell(`H${rowNumber}`).value = material.material;
      }

    };

  });

  //Verifica o Peso
  const massaCol = targetSheet.getColumn(9);
  massaCol.eachCell(function(cell, rowNumber) {
    if (cell.value == null) {
      error[3].cell.push(cell.address)
      cell.style = {
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '6ddd35' } },
      };
    } else if (cell.value.includes("kg")) {
      cell.value = cell.value.replace(" kg", "").replace(",", ".");
      cell.value = Number(cell.value);
    } else if (cell.value.includes("lb_massa")) {
      error[4].cell.push(cell.address)
      cell.style = {
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F08080' } },
      };
    }
  });

  //Verifica o QTDE
  const qtdeBaseCol = targetSheet.getColumn(10);
  qtdeBaseCol.eachCell(function(cell, rowNumber) {
    if (cell.value == null) {
      error[5].cell.push(cell.address)
      cell.style = {
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '79553D' } },
      };
    } else if (cell.value == 1) {

    } else if (cell.value.includes("mm")) {
      cell.value = cell.value.replace(" mm", "").replace(",", ".");
      cell.value = Number(cell.value);
    } else if (cell.value.includes("in")) {
      cell.value = cell.value.replace(" in", "").replace(",", ".");
      cell.value = Number(cell.value) * 25.4;
    } else if (cell.value.includes("pol")) {
      cell.value = cell.value.replace(" pol", "").replace(",", ".");
      cell.value = Number(cell.value) * 25.4;
    }

  });

  //Verifica tem Descrição dentro de uma peça
  const estoqueCol21 = targetSheet.getColumn(7);
  estoqueCol21.eachCell(function(cell, rowNumber) {
    if ((cell.value != null) && (cell.value.includes("Descrição"))) {
      if (targetSheet.getCell(`C${rowNumber}`).value.includes(".")) {
        error[6].cell.push(cell.address)
        cell.style = {
          fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F5D033' } },
        };
      };
    };

  });

  //Adiciona as formulas e colhe o material para colocar nas peças
  const itemColUpdate = targetSheet.getColumn(3);
  let localizePontos = [];
  itemColUpdate.eachCell(function(cell, rowNumber) {
    if ((cell.value != null) && (!cell.value.includes(".")) && (cell.value != "ITEM")) {
      let result = targetSheet.getCell(`D${rowNumber}`) * targetSheet.getCell(`I${rowNumber}`);
      targetSheet.getCell(`K${rowNumber}`).value = { formula: `D${rowNumber}*I${rowNumber}`, result: result };

      let result1 = targetSheet.getCell(`D${rowNumber}`) * targetSheet.getCell(`J${rowNumber}`);
      targetSheet.getCell(`L${rowNumber}`).value = { formula: `D${rowNumber}*J${rowNumber}`, result: result1 };

      localizePontos.push({ adress: rowNumber, index: cell.value, pesoMaterial: 0, material: [] })
    } else if ((cell.value != null) && (cell.value.includes(".")) && (cell.value != "ITEM")) {
      let conjuntoFind = localizePontos.find(({ index }) => index === cell.value.split('.')[0]);
      let conjuntoIndex = localizePontos.findIndex(({ index }) => index === cell.value.split('.')[0]);
      
      let result = targetSheet.getCell(`D${rowNumber}`) * targetSheet.getCell(`I${rowNumber}`) * targetSheet.getCell(`D${conjuntoFind.adress}`);
      targetSheet.getCell(`K${rowNumber}`).value = { formula: `D${rowNumber}*I${rowNumber}*$D$${conjuntoFind.adress}`, result: result };

      let result1 = targetSheet.getCell(`D${rowNumber}`) * targetSheet.getCell(`J${rowNumber}`) * targetSheet.getCell(`D${conjuntoFind.adress}`);
      targetSheet.getCell(`L${rowNumber}`).value = { formula: `D${rowNumber}*J${rowNumber}*D$${conjuntoFind.adress}`, result: result1 };

      let material = targetSheet.getCell(`H${rowNumber}`);
      localizePontos[conjuntoIndex].material.push(material.value);
      localizePontos[conjuntoIndex].pesoMaterial += result;
    }

  });
  
  //Adiciona os matériais as Peças
  for (i = 0; i < localizePontos.length; i++) {
    if (localizePontos[i].material != false) {
      let newMaterial = adjustMaterial(localizePontos[i].material);
      targetSheet.getCell(`H${localizePontos[i].adress}`).value = newMaterial;

      let infoPeca = targetSheet.getCell(`K${localizePontos[i].adress}`)
      let pesoPeca = infoPeca.value.result

      if(pesoPeca == undefined){
        error[7].cell.push(infoPeca.address)
        infoPeca.style = {
          fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '39FF42' } },
        };
      } else if (localizePontos[i].pesoMaterial > (pesoPeca + 0.1) || localizePontos[i].pesoMaterial < (pesoPeca - 0.1) || isNaN(localizePontos[i].pesoMaterial)) {
        error[8].cell.push(infoPeca.address)  
        infoPeca.style = {
          fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '7F7679' } },
        };
      };
    };
  };

  //Verifica se a peça tem código
  const numberoPeca = targetSheet.getColumn(5);
  numberoPeca.eachCell(function(cell, rowNumber) {
    if ((cell.value != null) && (!cell.value.includes(codigoDeProjeto)) && (cell.value != "NÚMERO DA PEÇA")) {
      error[9].cell.push(cell.address)
      cell.style = {
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'CB2821' } },
      };
    };

  });

  targetSheet.autoFilter = {
    from: {
      row: 1,
      column: 1
    },
    to: {
      row: targetSheet.lastRow.number,
      column: 12
    }
  }

  //Ajeita o Tamanho das colunas
  targetSheet.columns.forEach(function(column, i) {
    let maxLength = 0;
    column["eachCell"]({ includeEmpty: false }, function(cell) {
      var columnLength = cell.value ? cell.value.toString().length : 10;
      if (columnLength > maxLength) {
        maxLength = columnLength;
      }
    });
    column.width = maxLength < 10 ? 10 : maxLength;
  });

  await targetWorkbook.xlsx.writeFile(`${filename.replace(".xlsx", "")}_CHLOE.xlsx`);

  const mergedError = print();

  return [mergedError, `${filename.replace(".xlsx", "")}_CHLOE.xlsx`];
};

module.exports.automatize = automatize
