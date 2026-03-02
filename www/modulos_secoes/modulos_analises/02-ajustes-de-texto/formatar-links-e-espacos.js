
/**
 * modulos_secoes/modulos_analises/02-ajustes-de-texto/formatar-links-e-espacos.js
 * * Função: Estética e limpeza de dados.
 */

/**
 * Remove espaços em branco desnecessários no início e fim de uma URL.
 * Extraído da lógica original do analises.html.
 * @param {string} url - A URL vinda do banco de dados.
 * @returns {string} - A URL limpa.
 */
export function limparEspacos(url) {
  return url ? url.trim() : url;
}

// Futuramente, outras funções de formatação (como datas ou nomes) entrarão aqui.
