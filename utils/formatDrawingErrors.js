const DISCORD_LIMIT = 2000;

// Monta o texto de cada erro retornado pela API em `result.errors`
function formatDrawingErrors(errors) {
  return errors.map(error => {
    const lines = [`:lady_beetle: **${error.code}**: ${error.message}`];

    for (const detail of error.details) {
      lines.push(`\t\t\t${detail}`);
    }

    return lines.join('\n');
  }).join('\n');
}

// Quebra no último \n antes do limite do Discord
function splitMessage(message, limit = DISCORD_LIMIT) {
  const parts = [];

  while (message.length > limit) {
    let index = message.lastIndexOf('\n', limit);
    index = index <= 0 ? limit : index + 1;

    parts.push(message.slice(0, index));
    message = message.slice(index);
  }

  if (message) {
    parts.push(message);
  }

  return parts;
}

// Lista de mensagens prontas para enviar, vazia se o desenho não tiver erros
function getDrawingMessages(job) {
  // Satus ainda não retorna `result`, usa o formato antigo
  if (!job.result) {
    return job.message;
  }

  if (job.result.errors.length === 0) {
    return [];
  }

  return splitMessage(formatDrawingErrors(job.result.errors));
}

module.exports = {
  formatDrawingErrors,
  splitMessage,
  getDrawingMessages,
};
