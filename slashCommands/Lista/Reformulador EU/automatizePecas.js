const ExcelJS = require("exceljs");
const { findMaterialPos } = require("./findMaterial.js");
const { errors } = require("./error.js");

const workbook = new ExcelJS.Workbook();

async function automatizePecas(filename) {
	await workbook.xlsx.readFile(filename);
	let sourceWorksheet = workbook.getWorksheet(1);
	const errorFile = Object.create(errors);

	//Remove as planilhas subsquententes que podem ser um processo anterior
	let max = workbook.worksheets.length;
	for(let i = 2; i <= max; i++){
		workbook.removeWorksheet(i);
	}

	//Le os códigos e cria planilhas correspondentes
	const colDesenho = sourceWorksheet.getColumn(1);
	let desenhoCodigo = [];
	colDesenho.eachCell(function(cell) {
		if ((!desenhoCodigo.includes(cell.value)) && isNaN(cell.value) && cell.value != "DESENHO") {
			desenhoCodigo.push(cell.value);
		}
	});

	//Cria as planilhas
	desenhoCodigo.sort();
	for (let i = 0; i < desenhoCodigo.length; i++) {
		workbook.addWorksheet(`${desenhoCodigo[i]} - PEÇAS`);
		workbook.addWorksheet(`${desenhoCodigo[i]} - MATERIAL`);
	}

	//Adiciona primeira Linha com informações
	let copyRow = sourceWorksheet.getRow(1);
	for (let i = 1; i < workbook.worksheets.length; i++) {
		if (i % 2 == 0) {
			workbook.worksheets[i].insertRow(1, ["NÚMERO DE ESTOQUE", "MATERIAL", "QTDE", "PESO"]);
		} else {
			workbook.worksheets[i].insertRow(1, copyRow.values);
		}
	}

	//Copia da planilha principal e move para secundária
	const itemCol = sourceWorksheet.getColumn(3);
	itemCol.eachCell(function(cell, rowNumber) {
		cell.value = cell.value !== null ? cell.value.toString() : null;
		if (!(cell?.value?.includes(".") || cell?.value?.includes("ITEM"))) {
			let copyPecaRow = sourceWorksheet.getRow(rowNumber);
			if (copyPecaRow.values[1] != undefined) {
				let targetSheet = workbook.getWorksheet(`${copyPecaRow.values[1]} - PEÇAS`);
				let copyPecaRowProcess = copyPecaRow.values.slice(0, 10);
				targetSheet.insertRow(targetSheet.lastRow.number + 1, copyPecaRowProcess);
				if (copyPecaRow.values[7] != "Descrição") {
					let targetSheetMat = workbook.getWorksheet(`${copyPecaRow.values[1]} - MATERIAL`);
					let copyPecaRowProcess = [];
					copyPecaRowProcess.push(copyPecaRow.values[7]);
					copyPecaRowProcess.push(copyPecaRow.values[8]);
					copyPecaRowProcess.push(copyPecaRow.values[12].result);
					copyPecaRowProcess.push(copyPecaRow.values[11].result);
					targetSheetMat.insertRow(targetSheetMat.lastRow.number + 1, copyPecaRowProcess);
				}
			}
		} else if (cell?.value?.includes(".")) {
			let copyPecaRow = sourceWorksheet.getRow(rowNumber);
			if (copyPecaRow.values[1] != undefined) {
				let targetSheet = workbook.getWorksheet(`${copyPecaRow.values[1]} - MATERIAL`);
				let copyPecaRowProcess = [];
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
		let targetSheet = workbook.worksheets[i];
		
		if (i % 2 !== 0) {
			// Ajeita a planilha de peças
			targetSheet.spliceColumns(10, 1, [], ["PESO UNIT."], ["PESO TOTAL"]);
			let saveRows = [];
			for (let c = 2; c <= targetSheet.lastRow.number; c++) {
				saveRows.push(targetSheet.getRow(c).values);
			}
	
			let collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });
			saveRows = saveRows.sort(collator.compare);
			
			weightTotal = 0;
			for (let c = 2; c <= targetSheet.lastRow.number; c++) {
				let pesoPeca = +saveRows[c - 2][9].toFixed(1);
				let pieceTotalWeight = pesoPeca * saveRows[c - 2][4];
				weightTotal += pieceTotalWeight;

				saveRows[c - 2].push("", pesoPeca, pieceTotalWeight);
				targetSheet.getRow(c).values = saveRows[c - 2];
			}
		} else {
			// Ajeita planilha de Material
			targetSheet.spliceColumns(10, 1, [], [], ["POS."], ["DESCRIÇÃO"], ["UNIDADE"], ["QUANTIDADE"], ["MATERIAL/PADRÃO"], ["PESO [kg]"]);
			let materialList = [""];
			materialWeightTotal = 0;
	
			for (let cAb = 2; cAb <= targetSheet.lastRow.number; cAb++) {
				let materialTarget = targetSheet.getRow(cAb).values;

				for (let cont = 0; cont < materialList.length; cont++) {
					if (materialTarget[1] == materialList[cont][1] && materialTarget[2] == materialList[cont][4]) {
						materialList[cont][5] += materialTarget[4];
						break;
					} else if (cont == materialList.length - 1) {
						let materialCorri = findMaterialPos(materialTarget[1], materialTarget[2]);
	
						materialCorri[5] += materialTarget[4];
						materialList.push(materialCorri);
						break;
					}
				}
			}
	
			materialList.shift();
			materialList = materialList.sort((a, b) => a[0] - b[0]);
	
			let pos = targetSheet.getColumn(12);
			let valuesPos = ["POS."];
			for (let c1 = 1; c1 <= materialList.length; c1++) {
				valuesPos.push(c1);
			}
			pos.values = valuesPos;
	
			let descricao = targetSheet.getColumn(13);
			let valuesDescricao = ["DESCRIÇÃO"];
			for (let c2 = 0; c2 < materialList.length; c2++) {
				valuesDescricao.push(materialList[c2][1]);
			}
			descricao.values = valuesDescricao;
	
			let unidade = targetSheet.getColumn(14);
			let valuesUnidade = ["UNIDADE"];
			for (let c3 = 0; c3 < materialList.length; c3++) {
				valuesUnidade.push(materialList[c3][2]);

				if (materialList[c3][2] === "NULL"){
					errorFile.errorCH13.boleanValue = true;
					targetSheet.getCell(c3 + 2, 14).style = {
						fill: { type: "pattern", pattern: "solid", fgColor: { argb: "6D88AD" } },
					};
				}
			}
			unidade.values = valuesUnidade;
	
			let materialPadrao = targetSheet.getColumn(16);
			let valuesMaterialPadrao = ["MATERIAL/PADRÃO"];
			for (let c5 = 0; c5 < materialList.length; c5++) {
				valuesMaterialPadrao.push(materialList[c5][4]);
			}
			materialPadrao.values = valuesMaterialPadrao;
	
			let peso = targetSheet.getColumn(17);
			let valuesPeso = ["PESO [kg]"];
			for (let c6 = 0; c6 < materialList.length; c6++) {
				let result = materialList[c6][5];
				result = result < 0.1 ? 0.1 : +result.toFixed(1);
				materialWeightTotal += result;
				valuesPeso.push(result);
			}
			peso.values = valuesPeso;
	
			let qtde = targetSheet.getColumn(15);
			let valuesQtde = ["QUANTIDADE"];
			for (let c4 = 0; c4 < materialList.length; c4++) {
				let pesoMaterial = targetSheet.getCell(`Q${c4 + 2}`).value;
				let result = pesoMaterial / materialList[c4][3];
				result = isFinite(result) ? (result < 0.1 ? 0.1 : +result.toFixed(1)) : "NULL";
				valuesQtde.push(result);

				if (result === "NULL"){
					errorFile.errorCH13.boleanValue = true;
					targetSheet.getCell(c4 + 2, 15).style = {
						fill: { type: "pattern", pattern: "solid", fgColor: { argb: "6D88AD" } },
					};
				}	
			}
			qtde.values = valuesQtde;

			if(weightTotal != materialWeightTotal){
				errorFile.errorCH12.boleanValue = true;
				targetSheet.properties.tabColor = {
					argb: "FFC00000"
				};
			}
		}
		
		//Ajeita o Tamanho das colunas
		targetSheet.columns.forEach(function(column) {
			let maxLength = 0;
			column.eachCell({ includeEmpty: false }, function(cell) {
				var columnLength = cell.value ? cell.value.toString().length : 10;
				if (columnLength > maxLength) {
					maxLength = columnLength;
				}
			});
			column.width = maxLength < 10 ? 10 : maxLength;
		});
	}

	await workbook.xlsx.writeFile(`${filename}`);

	const mergedError = await errorFile.printErrors();

	return [mergedError, `${filename.replace(".xlsx", "")}_CHLOE.xlsx`];
}

module.exports.automatizePecas = automatizePecas;