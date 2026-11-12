const errors = {
  errorCH01: { description: ':lady_beetle: [Error CH01:](<https://atlas.satusequipamentos.com.br/docs/chloe/erros-lista-de-material#error-ch01>) Index vazio', boleanValue: false },
  errorCH02: { description: ':lady_beetle: [Error CH02:](<https://atlas.satusequipamentos.com.br/docs/chloe/erros-lista-de-material#error-ch02>) Matérial não encontrado', boleanValue: false },
  errorCH03: { description: ':lady_beetle: [Error CH03:](<https://atlas.satusequipamentos.com.br/docs/chloe/erros-lista-de-material#error-ch03>) Matérial não cadastrado', boleanValue: false },
  errorCH04: { description: ':lady_beetle: [Error CH04:](<https://atlas.satusequipamentos.com.br/docs/chloe/erros-lista-de-material#error-ch04>) Peso não encontrado', boleanValue: false },
  errorCH05: { description: ':lady_beetle: [Error CH05:](<https://atlas.satusequipamentos.com.br/docs/chloe/erros-lista-de-material#error-ch05>) Massa com Libra', boleanValue: false },
  errorCH06: { description: ':lady_beetle: [Error CH06:](<https://atlas.satusequipamentos.com.br/docs/chloe/erros-lista-de-material#error-ch06>) QTDE não encontrado', boleanValue: false },
  errorCH07: { description: ':lady_beetle: [Error CH07:](<https://atlas.satusequipamentos.com.br/docs/chloe/erros-lista-de-material#error-ch07>) Componente com Descrição', boleanValue: false },
  // errorCH08: {description: ":lady_beetle: [Error CH08:](<https://docs.embrateceng.com.br/chloe/erros-lista-de-material#error-ch08>) Peso da Peça não encontrado", boleanValue: false}, ---> OBSOLETO
  errorCH09: { description: ':lady_beetle: [Error CH09:](<https://atlas.satusequipamentos.com.br/docs/chloe/erros-lista-de-material#error-ch09>) Peso da Peça não batendo com soma dos Componentes', boleanValue: false },
  errorCH10: { description: ':lady_beetle: [Error CH10:](<https://atlas.satusequipamentos.com.br/docs/chloe/erros-lista-de-material#error-ch10>) Peça sem código de projeto', boleanValue: false },
  errorCH11: { description: ':lady_beetle: [Error CH11:](<https://atlas.satusequipamentos.com.br/docs/chloe/erros-lista-de-material#error-ch11>) Elemento não cadastrado', boleanValue: false },
  errorCH12: { description: ':lady_beetle: [Error CH12:](<https://atlas.satusequipamentos.com.br/docs/chloe/erros-lista-de-material#error-ch12>) Peso com Varia', boleanValue: false },
  errorCH13: { description: ':lady_beetle: [Error CH13:](<https://atlas.satusequipamentos.com.br/docs/chloe/erros-lista-de-material#error-ch13>) Divergência no arredondamento do peso entre peças e a lista de material', boleanValue: false },
  errorCH14: { description: ':lady_beetle: [Error CH14:](<https://atlas.satusequipamentos.com.br/docs/chloe/erros-lista-de-material#error-ch14>) Não foi possível calcular a quantidade do material', boleanValue: false },
  errorCH15: { description: ':lady_beetle: [Error CH15:](<>) Projeto não cadastrado no Banco de Dados', boleanValue: false },
  alertCL01: { description: '🚨 [Alerta CL01:](<https://atlas.satusequipamentos.com.br/docs/chloe/erros-lista-de-material#alerta-cl01>) Material diferente de Aço Carbono', boleanValue: false },

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
