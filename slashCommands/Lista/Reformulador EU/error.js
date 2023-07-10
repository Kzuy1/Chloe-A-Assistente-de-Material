let error = [
    {descriçãoError: ":lady_beetle: Error CH01: Index vazio", cell: []},
    {descriçãoError: ":lady_beetle: Error CH02: Matérial não encontrado", cell: []},
    {descriçãoError: ":lady_beetle: Error CH03: Matérial não cadastrado", cell: []},
    {descriçãoError: ":lady_beetle: Error CH04: Peso não encontrado", cell: []},
    {descriçãoError: ":lady_beetle: Error CH05: Massa com Libra em", cell: []},
    {descriçãoError: ":lady_beetle: Error CH06: QTDE não encontrado", cell: []},
    {descriçãoError: ":lady_beetle: Error CH07: Material com Descrição no Nome", cell: []},
    {descriçãoError: ":lady_beetle: Error CH08: Peso da Peça não encontrado", cell: []},
    {descriçãoError: ":lady_beetle: Error CH09: Peso da Peça não batendo com soma dos Componentes", cell: []},
    {descriçãoError: ":lady_beetle: Error CH10: Peça sem código", cell: []},
    {descriçãoError: "🚨 Alerta CL01: Material diferente de Aço Carbono", cell: []},
]

//{descriçãoError: "", cell: []},

const print = () => {
    let string = "";
    for(const int of error){
        if(int.cell.length > 0){
            string += int.descriçãoError + "\n" + "Cell: ";
            string += int.cell.length > 1 ? int.cell.join(', ') : int.cell[0];
            string += "\n";
            int.cell = [];
        }
    }
    return string;
}


module.exports = {error, print}