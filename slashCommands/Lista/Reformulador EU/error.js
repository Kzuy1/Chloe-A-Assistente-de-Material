let error = [
    {descriçãoError: ":lady_beetle: [Error CH01:](https://discordapp.com/channels/1122685290205679748/1127326125824159774/1145690632304742552) Index vazio", cell: []},
    {descriçãoError: ":lady_beetle: [Error CH02:](https://discordapp.com/channels/1122685290205679748/1127326125824159774/1145718944431345746) Matérial não encontrado", cell: []},
    {descriçãoError: ":lady_beetle: [Error CH03:](https://discordapp.com/channels/1122685290205679748/1127326125824159774/1145808582617600064) Matérial não cadastrado", cell: []},
    {descriçãoError: ":lady_beetle: [Error CH04:](https://discordapp.com/channels/1122685290205679748/1127326125824159774/1146038567345328158) Peso não encontrado", cell: []},
    {descriçãoError: ":lady_beetle: [Error CH05:](https://discordapp.com/channels/1122685290205679748/1127326125824159774/1146063226166067200) Massa com Libra", cell: []},
    {descriçãoError: ":lady_beetle: [Error CH06:](https://discordapp.com/channels/1122685290205679748/1127326125824159774/1148219182425587772) QTDE não encontrado", cell: []},
    {descriçãoError: ":lady_beetle: [Error CH07:](https://discordapp.com/channels/1122685290205679748/1127326125824159774/1148352425061793886) Componente com Descrição", cell: []},
    {descriçãoError: ":lady_beetle: [Error CH08:](https://discordapp.com/channels/1122685290205679748/1127326125824159774/1148592587540811927) Peso da Peça não encontrado", cell: []},
    {descriçãoError: ":lady_beetle: [Error CH09:](https://discordapp.com/channels/1122685290205679748/1127326125824159774/1148959635064225852) Peso da Peça não batendo com soma dos Componentes", cell: []},
    {descriçãoError: ":lady_beetle: [Error CH10:](https://discordapp.com/channels/1122685290205679748/1127326125824159774/1149695206258642964) Peça sem código", cell: []},
    {descriçãoError: "🚨 [Alerta CL01:](https://discordapp.com/channels/1122685290205679748/1127326125824159774/1151862684195758080) Material diferente de Aço Carbono", cell: []},
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