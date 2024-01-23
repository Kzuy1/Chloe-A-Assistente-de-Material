const errors = {
  errorCH01: { description: ':lady_beetle: [Error CH01:](https://discord.com/channels/1122685290205679748/1127326125824159774/1145690632304742552) Index vazio', boleanValue: false },
  errorCH02: { description: ':lady_beetle: [Error CH02:](https://discord.com/channels/1122685290205679748/1127326125824159774/1145718944431345746) Matérial não encontrado', boleanValue: false },
  errorCH03: { description: ':lady_beetle: [Error CH03:](https://discord.com/channels/1122685290205679748/1127326125824159774/1145808582617600064) Matérial não cadastrado', boleanValue: false },
  errorCH04: { description: ':lady_beetle: [Error CH04:](https://discord.com/channels/1122685290205679748/1127326125824159774/1146038567345328158) Peso não encontrado', boleanValue: false },
  errorCH05: { description: ':lady_beetle: [Error CH05:](https://discord.com/channels/1122685290205679748/1127326125824159774/1146063226166067200) Massa com Libra', boleanValue: false },
  errorCH06: { description: ':lady_beetle: [Error CH06:](https://discord.com/channels/1122685290205679748/1127326125824159774/1148219182425587772) QTDE não encontrado', boleanValue: false },
  errorCH07: { description: ':lady_beetle: [Error CH07:](https://discord.com/channels/1122685290205679748/1127326125824159774/1148352425061793886) Componente com Descrição', boleanValue: false },
  // errorCH08: {description: ":lady_beetle: [Error CH08:](https://discordapp.com/channels/1122685290205679748/1127326125824159774/1148592587540811927) Peso da Peça não encontrado", boleanValue: false}, ---> OBSOLETO
  errorCH09: { description: ':lady_beetle: [Error CH09:](https://discord.com/channels/1122685290205679748/1127326125824159774/1148959635064225852) Peso da Peça não batendo com soma dos Componentes', boleanValue: false },
  errorCH10: { description: ':lady_beetle: [Error CH10:](https://discord.com/channels/1122685290205679748/1127326125824159774/1149695206258642964) Peça sem código', boleanValue: false },
  errorCH11: { description: ':lady_beetle: [Error CH11:](https://discord.com/channels/1122685290205679748/1127326125824159774/1186706865183268884) Elemento não cadastrado', boleanValue: false },
  errorCH12: { description: ':lady_beetle: [Error CH12:](https://discord.com/channels/1122685290205679748/1127326125824159774/1186709389915201556) Peso com Varia', boleanValue: false },
  errorCH13: { description: ':lady_beetle: [Error CH13:](https://discord.com/channels/1122685290205679748/1127326125824159774/1186714112340791366) Divergência no arredondamento entre peças e a lista de material', boleanValue: false },
  errorCH14: { description: ':lady_beetle: [Error CH14:](https://discord.com/channels/1122685290205679748/1127326125824159774/1186719345552924833) Não foi possível calcular a quantidade do material', boleanValue: false },
  errorCH15: { description: ':lady_beetle: [Error CH15:]() Projeto não cadastrado no Banco de Dados', boleanValue: false },
  alertCL01: { description: '🚨 [Alerta CL01:](https://discordapp.com/channels/1122685290205679748/1127326125824159774/1151862684195758080) Material diferente de Aço Carbono', boleanValue: false },

  printErrors() {
    let string = '';

    Object.keys(this).forEach((error) => {
      if (this[error].boleanValue) {
        string += `${this[error].description}\n`;
      }

      this[error].boleanValue = false;
    });

    return string;
  },
};

module.exports.errors = errors;
