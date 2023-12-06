const errors = {
	errorCH01: {description: ":lady_beetle: [Error CH01:](https://discordapp.com/channels/1122685290205679748/1127326125824159774/1145690632304742552) Index vazio", boleanValue: false},
	errorCH02: {description: ":lady_beetle: [Error CH02:](https://discordapp.com/channels/1122685290205679748/1127326125824159774/1145718944431345746) Matérial não encontrado", boleanValue: false},
	errorCH03: {description: ":lady_beetle: [Error CH03:](https://discordapp.com/channels/1122685290205679748/1127326125824159774/1145808582617600064) Matérial não cadastrado", boleanValue: false},
	errorCH04: {description: ":lady_beetle: [Error CH04:](https://discordapp.com/channels/1122685290205679748/1127326125824159774/1146038567345328158) Peso não encontrado", boleanValue: false},
	errorCH05: {description: ":lady_beetle: [Error CH05:](https://discordapp.com/channels/1122685290205679748/1127326125824159774/1146063226166067200) Massa com Libra", boleanValue: false},
	errorCH06: {description: ":lady_beetle: [Error CH06:](https://discordapp.com/channels/1122685290205679748/1127326125824159774/1148219182425587772) QTDE não encontrado", boleanValue: false},
	errorCH07: {description: ":lady_beetle: [Error CH07:](https://discordapp.com/channels/1122685290205679748/1127326125824159774/1148352425061793886) Componente com Descrição", boleanValue: false},
	//errorCH08: {description: ":lady_beetle: [Error CH08:](https://discordapp.com/channels/1122685290205679748/1127326125824159774/1148592587540811927) Peso da Peça não encontrado", boleanValue: false}, ---> OBSOLETO
	errorCH09: {description: ":lady_beetle: [Error CH09:](https://discordapp.com/channels/1122685290205679748/1127326125824159774/1148959635064225852) Peso da Peça não batendo com soma dos Componentes", boleanValue: false},
	errorCH10: {description: ":lady_beetle: [Error CH10:](https://discordapp.com/channels/1122685290205679748/1127326125824159774/1149695206258642964) Peça sem código", boleanValue: false},
	errorCH11: {description: ":lady_beetle: [Error CH11:]() Elemento não cadastrado", boleanValue: false},
	errorCH12: {description: ":lady_beetle: [Error CH12:]()) Divergência no arredondamento entre peças e a lista de material", boleanValue: false},
	errorCH13: {description: ":lady_beetle: [Error CH13:]()) Não foi possível calcular a quantidade do material", boleanValue: false},
	alertCL01: {description: "🚨 [Alerta CL01:](https://discordapp.com/channels/1122685290205679748/1127326125824159774/1151862684195758080) Material diferente de Aço Carbono", boleanValue: false},

	printErrors: function() {
		let string = "";
		
		for (const error in this){
			if(this[error].boleanValue){
				string += `${this[error].description}\n`;
			}
		}

		return string;
	},
};

//{descriçãoError: "", cell: []};

module.exports.errors = errors;