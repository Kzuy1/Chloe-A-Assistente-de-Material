const ExcelJS = require('exceljs');
const fs = require('fs');
const util = require('util');
const path = require('path');
const readdir = util.promisify(fs.readdir);
const process = require('node:process');
const config = require('../config.json');
const handler = require('../handler/index');
const { automatize }  = require('../slashCommands/Lista/Reformulador EU/automatize.js');
const { automatizePecas }  = require('../slashCommands/Lista/Reformulador EU/automatizePecas.js');

async function automatizePecasTeste(){
	const pasta = `${__dirname}/_BASE`;
	const files = await readdir(pasta);

	// Carregar DataBase
	handler.loadDateBase(config.mongoUrl);

	for (const file of files) {
		if (!file.includes('_BASESHEET')){
			try {
				fs.unlinkSync(file);
				console.log(`Arquivo ${file} excluído com sucesso.`);
			} catch (error) {
				if (error.code === 'ENOENT') {
				// Se o erro for ENOENT (arquivo não encontrado), apenas imprima uma mensagem e siga em frente.
					console.log(`O arquivo ${file} não existe.`);
				}
			}
			break;
		}
		if (!file.includes('_CHLOE')) {
			let sheet = await automatize(`${pasta}/${file}`);

			let newFileName = sheet[1].replace('_BASESHEET', ''); 
			let baseFileName = newFileName.replace('.xlsx', '_BASESHEET.xlsx'); 

			fs.rename(sheet[1], newFileName, (err) => {
				if (err) {
					console.error('Erro ao renomear o arquivo:', err);
				}
			});

			const workbook1 = new ExcelJS.Workbook();
			const workbook2 = new ExcelJS.Workbook();

			await workbook1.xlsx.readFile(baseFileName);
			await workbook2.xlsx.readFile(newFileName);

			const sheet1 = workbook1.getWorksheet(1);
			const sheet2 = workbook2.getWorksheet(1);

			for (let row = 1; row <= sheet1.rowCount; row++) {
				const cell1Col1 = sheet1.getCell(row, 1);
				const cell1Col2 = sheet1.getCell(row, 2);
				const cell2Col1 = sheet2.getCell(row, 1);
				const cell2Col2 = sheet2.getCell(row, 2);

				cell2Col1.value = cell1Col1.value;
    
				cell2Col2.value = cell1Col2.value;
			}
			await workbook2.xlsx.writeFile(newFileName);

			sheet = await automatizePecas(`${newFileName}`);
      
      
			await workbook1.xlsx.readFile(baseFileName);
			await workbook2.xlsx.readFile(newFileName);

			const quantidadeFolhas = workbook1.worksheets.length;
			let diferencaEncontrada = false;

			for(let i = 1; i <= quantidadeFolhas; i++){
				const sheet1 = await workbook1.getWorksheet(i);
				const sheet2 = await workbook2.getWorksheet(i);
  
				for (let row = 1; row <= sheet1.rowCount; row++) {
					for (let col = 1; col <= sheet1.columnCount; col++) {
						const cell1 = await sheet1.getCell(row, col);
						const cell2 = await sheet2.getCell(row, col);
      
						if (cell1.formula && cell2.formula) {
							if (cell1.result.toFixed(3) !== cell2.result.toFixed(3)) {
								cell2.style = {
									fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '6ddd35' } },
								};
								diferencaEncontrada = true;
							}
						} else {
							// Se não forem fórmulas, compara numberos com arredondamento, se não for numero compara, e adiciona a mensagem de erro.
							if (typeof cell1.value === 'number' && typeof cell2.value === 'number') {
								const cell1NumberRound = Math.round(cell1.value * 1000) / 1000;
								const cell2NumberRound = Math.round(cell2.value * 1000) / 1000;

								if(Math.abs(cell1NumberRound - cell2NumberRound) > 0.001){
									cell2.style = {
										fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '6ddd35' } },
									};
									diferencaEncontrada = true;
								}
							} else if (cell1.value !== cell2.value) {
								cell2.style = {
									fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '6ddd35' } },
								};
								diferencaEncontrada = true;
							}
						}
					}
				}
				await workbook2.xlsx.writeFile(newFileName);
			}
      
			if (diferencaEncontrada) {
				// Se houver diferenças, mova o arquivo para a pasta de destino
				const destinoPath = path.join(`${__dirname}/_VERIFICA`, path.basename(newFileName));
				fs.renameSync(newFileName, destinoPath);
				console.log(`O arquivo foi movido para ${destinoPath} devido a diferenças encontradas.`);
			} else {
				fs.unlinkSync(newFileName);
			}
		}
	}

	process.exit(1);
}
automatizePecasTeste();