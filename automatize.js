const ExcelJS = require('exceljs');
const {findMaterial} = require('./findMaterial.js');
const {adjustMaterial} = require('./adjustMaterial.js')
const filename = "./2023-01-24_LISTA DE MATERIAL_00.xlsx";

const workbook = new ExcelJS.Workbook();

async function f1() {
    await workbook.xlsx.readFile(filename).then(async function () {
        let sourceWorksheet = workbook.getWorksheet(1);
        let targetWorkbook = new ExcelJS.Workbook();
        let targetSheet = targetWorkbook.addWorksheet(sourceWorksheet.name);
        targetSheet.model = Object.assign(sourceWorksheet.model,{
            views:[{state: 'frozen',ySplit:1}],
        });

        targetSheet.spliceColumns(1, 0, ["DESENHO"], ["PEÇA"])  ;

        //Adiciona coluna Desenho e Peça
        for (rowIndex = 1; rowIndex <= targetSheet.rowCount; rowIndex++) {
            targetSheet.getRow(rowIndex).alignment = { wrapText: false };
        };

        //Verifica Index para Adicionar linhas
        const itemCol = targetSheet.getColumn(3);
        let rowAdd = [];
        itemCol.eachCell(function(cell, rowNumber) {
            if(cell.value == null){
                console.log(`🦋 Error CH03: Index vazio ${cell.address}`);
                cell.style = {
                    fill: { type: 'pattern', pattern:'solid',fgColor:{argb:'6ddd35'}},
                };
            } else if(!(cell.value.includes(".") || cell.value.includes("ITEM") || cell.value == "1")){
                rowAdd.push(rowNumber);
            }
        });

        //Adiciona uma linha em cima
        for(i = 0; i < rowAdd.length; i++){
            targetSheet.insertRow(rowAdd[i]+i);

        }

        //Move do Estoque para outra coluna.
        const estoqueCol = targetSheet.getColumn(6);
        estoqueCol.eachCell(function(cell, rowNumber) {
            if(cell.value != null){
                targetSheet.getCell(`G${rowNumber}`).value = cell.value;
            };

        });

        //Procura o material e substitui
        const estoqueCol2 = targetSheet.getColumn(7);
        estoqueCol2.eachCell(function(cell, rowNumber) {
            if(cell.value == null){
                console.log(`🦋 Error CH01: Matérial não encontrado ${cell.address}`);
                cell.style = {
                    fill: { type: 'pattern', pattern:'solid',fgColor:{argb:'6ddd35'}},
                };
            } else if(!(cell.value.includes("NÚMERO DE ESTOQUE") || cell.value.includes("Descrição"))) {
                let material = findMaterial(cell.value);
                if (material == undefined){
                    console.log(`🦋 Error CH01: Matérial não encontrado ${cell.address}`);
                    cell.style = {
                        fill: { type: 'pattern', pattern:'solid',fgColor:{argb:'6ddd35'}},
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
            if(cell.value == null){
                console.log(`🦋 Error CH01: Peso não encontrado ${cell.address}`);
                cell.style = {
                    fill: { type: 'pattern', pattern:'solid',fgColor:{argb:'6ddd35'}},
                };
            }else if(cell.value.includes("kg")){
                cell.value = cell.value.replace(" kg", "").replace(",",".");
                cell.value = Number(cell.value);
            } else if(cell.value.includes("lb_massa")){
                console.log(`🦋 Error CH02: Massa com Libra em ${cell.address}`);
                cell.style = {
                    fill: { type: 'pattern', pattern:'solid',fgColor:{argb:'F08080'}},
                };
            }
        });


        //Adiciona as formulas e colhe o material das peças
        const itemColUpdate = targetSheet.getColumn(3);
        let localizePontos = [];
        itemColUpdate.eachCell(function(cell, rowNumber){
            if((cell.value != null) && (!cell.value.includes(".")) && (cell.value != "ITEM")){
                localizePontos.push({adress: rowNumber, value: cell.value, material: []})
                let result = targetSheet.getCell(`D${rowNumber}`) * targetSheet.getCell(`I${rowNumber}`);
                targetSheet.getCell(`K${rowNumber}`).value = {formula: `D${rowNumber}*I${rowNumber}`, result};
            } else if((cell.value != null) && (cell.value.includes(".")) && (cell.value != "ITEM")){
                let conjuntoFind = localizePontos.find(({value}) => value === cell.value.split('.')[0]);
                let result = targetSheet.getCell(`D${rowNumber}`) * targetSheet.getCell(`I${rowNumber}`) * targetSheet.getCell(`D${conjuntoFind.adress}`);
                targetSheet.getCell(`K${rowNumber}`).value = {formula: `D${rowNumber}*I${rowNumber}*$D$${conjuntoFind.adress}`, result};

                let conjuntoIndex = localizePontos.findIndex(({value}) => value === cell.value.split('.')[0]);
                let material = targetSheet.getCell(`H${rowNumber}`);
                localizePontos[conjuntoIndex].material.push(material.value);
            }

        });

        //Adiciona os matériais as Peças
        for(i = 0; i < localizePontos.length; i++){
            if(localizePontos[i].material != false){
                let newMaterial = adjustMaterial(localizePontos[i].material);
                targetSheet.getCell(`H${localizePontos[i].adress}`).value = newMaterial;
            }   
        };

        const qtdeBaseCol = targetSheet.getColumn(10);
        qtdeBaseCol.hidden = true;

        targetWorkbook.xlsx.writeFile(`${filename.replace(".xlsx", "")}_CHLOE_LES.xlsx`);
        
    });
    
};

f1();
