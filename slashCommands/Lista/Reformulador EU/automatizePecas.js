const ExcelJS = require("exceljs");
const { findMaterialPos } = require("./findMaterial.js");
const { errors } = require("./error.js");

const workbook = new ExcelJS.Workbook();

async function automatizePecas(filename) {
	await workbook.xlsx.readFile(filename);
	let sourceWorksheet = workbook.getWorksheet(1);
	const errorFile = Object.create(errors);

	//Remove as planilhas subsquententes que podem ser um processo anterior
	let woksheetsQuantity = workbook.worksheets.length;
	for(let i = 2; i <= woksheetsQuantity; i++){
		workbook.removeWorksheet(i);
	}

	//Le os códigos e cria planilhas correspondentes
	const columnDrawn = sourceWorksheet.getColumn(1);
	let drawCode = [];
	columnDrawn.eachCell(function(cell) {
		if ((!drawCode.includes(cell.value)) && isNaN(cell.value) && cell.value != "DESENHO") {
			drawCode.push(cell.value);
		}
	});

	//Cria as planilhas
	drawCode.sort();
	for (let i = 0; i < drawCode.length; i++) {
		workbook.addWorksheet(`${drawCode[i]} - PEÇAS`);
		workbook.addWorksheet(`${drawCode[i]} - MATERIAL`);
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
				let pieceWeight = +saveRows[c - 2][9].toFixed(1);
				let pieceTotalWeight = pieceWeight * saveRows[c - 2][4];
				weightTotal += pieceTotalWeight;

				saveRows[c - 2].push("", pieceWeight, pieceTotalWeight);
				targetSheet.getRow(c).values = saveRows[c - 2];
			}
		} else {
			// Ajeita planilha de Material
			targetSheet.spliceColumns(10, 1, [], [], ["POS."], ["DESCRIÇÃO"], ["UNIDADE"], ["QUANTIDADE"], ["MATERIAL/PADRÃO"], ["PESO [kg]"]);
			let materialList = [""];
			materialWeightTotal = 0;
	
			for (let rowNumber = 2; rowNumber <= targetSheet.lastRow.number; rowNumber++) {
				let materialTarget = targetSheet.getRow(rowNumber).values;
				let found = false;

				for (const material of materialList) {
					if (materialTarget[1] === material[1] && materialTarget[2] === material[4]) {
						material[5] += materialTarget[4];
						found = true;
						break;
					}
				}

				if (!found) {
					let findPosMaterial = findMaterialPos(materialTarget[1], materialTarget[2]);
					findPosMaterial[5] += materialTarget[4];
					materialList.push(findPosMaterial);
				}
			}

			materialList.shift();
			materialList = materialList.sort((a, b) => a[0] - b[0]);


			for (let i = 0; i < materialList.length; i++){
				// Preencher "POS."
				targetSheet.getCell(`L${i + 2}`).value = i + 1;
				
				// Preencher "DESCRIÇÃO"
				targetSheet.getCell(`M${i + 2}`).value = materialList[i][1];

				// Preencher "UNIDADE" e indicar ao usuario caso seja NULL
				targetSheet.getCell(`N${i + 2}`).value = materialList[i][2];
				if (materialList[i][2] === "NULL") {
					errorFile.errorCH14.boleanValue = true;
					targetSheet.getCell(`N${i + 2}`).style = {
						fill: { type: "pattern", pattern: "solid", fgColor: { argb: "6D88AD" } },
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
				qtyMaterial = isFinite(qtyMaterial) ? (qtyMaterial < 0.1 ? 0.1 : +qtyMaterial.toFixed(1)) : "NULL";
				targetSheet.getCell(`O${i + 2}`).value = qtyMaterial;
				if (qtyMaterial === "NULL") {
					errorFile.errorCH14.boleanValue = true;
					targetSheet.getCell(`O${i + 2}`).style = {
						fill: { type: "pattern", pattern: "solid", fgColor: { argb: "6D88AD" } },
					};
				}
			}

			if(weightTotal != materialWeightTotal){
				errorFile.errorCH13.boleanValue = true;
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