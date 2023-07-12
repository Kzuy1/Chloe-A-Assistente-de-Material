let error = [
    {descriçãoError: ":lady_beetle: [Error CH01:](https://discord.com/channels/1122685290205679748/1127326125824159774/1128728624330190889) Index vazio", cell: []},
    {descriçãoError: ":lady_beetle: [Error CH02:](https://discord.com/channels/1122685290205679748/1127326125824159774/1128731283632181288) Matérial não encontrado", cell: []},
    {descriçãoError: ":lady_beetle: [Error CH03:](https://discord.com/channels/1122685290205679748/1127326125824159774/1128734714165989447) Matérial não cadastrado", cell: []},
    {descriçãoError: ":lady_beetle: [Error CH04:](https://discord.com/channels/1122685290205679748/1127326125824159774/1128736942943649843) Peso não encontrado", cell: []},
    {descriçãoError: ":lady_beetle: [Error CH05:](https://discord.com/channels/1122685290205679748/1127326125824159774/1128740056581033986) Massa com Libra", cell: []},
    {descriçãoError: ":lady_beetle: [Error CH06:](https://discord.com/channels/1122685290205679748/1127326125824159774/1128741890003587093) QTDE não encontrado", cell: []},
    {descriçãoError: ":lady_beetle: [Error CH07:](https://discord.com/channels/1122685290205679748/1127326125824159774/1128747645440102481) Componente com Descrição", cell: []},
    {descriçãoError: ":lady_beetle: [Error CH08:](https://discord.com/channels/1122685290205679748/1127326125824159774/1128750296886169600) Peso da Peça não encontrado", cell: []},
    {descriçãoError: ":lady_beetle: [Error CH09:](https://discord.com/channels/1122685290205679748/1127326125824159774/1128752216732348496) Peso da Peça não batendo com soma dos Componentes", cell: []},
    {descriçãoError: ":lady_beetle: [Error CH10:](https://discord.com/channels/1122685290205679748/1127326125824159774/1128754550111735860) Peça sem código", cell: []},
    {descriçãoError: "🚨 [Alerta CL01:](https://discord.com/channels/1122685290205679748/1127326125824159774/1128757622015803422) Material diferente de Aço Carbono", cell: []},
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