const ExcelJS = require('exceljs');
const fs = require('fs');
const util = require('util');
const path = require('path');
const readdir = util.promisify(fs.readdir);
const { automatize }  = require("../slashCommands/Lista/Reformulador EU/automatize.js");

async function automatizeTeste(){
    const pasta = `${__dirname}/_BASE`
    const files = await readdir(pasta);

    for (const file of files) {
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

        let diferencaEncontrada = false;
        for (let row = 1; row <= sheet1.rowCount; row++) {
            for (let col = 1; col <= sheet1.columnCount; col++) {
              const cell1 = sheet1.getCell(row, col);
              const cell2 = sheet2.getCell(row, col);
      
              if (cell1.formula && cell2.formula) {
                try {cell1.result.toFixed(3)} catch(e) {console.log(row, col, cell1.result)}
                if (cell1.result.toFixed(3) !== cell2.result.toFixed(3)) {
                  cell2.style = {
                    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '6ddd35' } },
                  };
                  diferencaEncontrada = true;
                }
              } else {
                // Se não forem fórmulas, comparar os valores diretamente
                if (cell1.value !== cell2.value) {
                  cell2.style = {
                    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '6ddd35' } },
                  };
                  diferencaEncontrada = true;
                }
              }
            }
        }
        await workbook2.xlsx.writeFile(newFileName);

        if (!diferencaEncontrada) {
            fs.unlinkSync(newFileName);
          } else {
            // Se houver diferenças, mova o arquivo para a pasta de destino
            const destinoPath = path.join(`${__dirname}/_VERIFICA`, path.basename(newFileName));
            fs.renameSync(newFileName, destinoPath);
            console.log(`O arquivo foi movido para ${destinoPath} devido a diferenças encontradas.`);
          }
      }
    }
};
automatizeTeste();