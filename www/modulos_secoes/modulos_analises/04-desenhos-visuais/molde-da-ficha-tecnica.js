
/**
 * modulos_secoes/modulos_analises/04-desenhos-visuais/molde-da-ficha-tecnica.js
 * Detalhes: Gera o HTML para informações técnicas e do editor.
 */

import { limparEspacos } from "../02-ajustes-de-texto/formatar-links-e-espacos.js";

/**
 * Gera o grid de informações técnicas (ex: Lançamento, Direção, etc).
 * @param {Array} ficha - Lista de objetos com label e valor.
 */
export function criarGridFichaTecnica(ficha) {
  if (!ficha || !Array.isArray(ficha)) return "";
  
  return ficha.map(item => `
    <div class="info-item">
      <span class="info-label">${item.label}</span>
      <span class="info-valor">${item.valor}</span>
    </div>
  `).join('');
}

/**
 * Gera o card de identificação do editor/categoria.
 * @param {Object} fichaCategoria - Dados do editor (cor, perfilImg, info).
 */
export function criarFichaEditor(fichaCategoria) {
  if (!fichaCategoria) return "";

  const itensInfo = fichaCategoria.info ? fichaCategoria.info.map(item => `
    <div class="info-item">
      <span class="info-label">${item.label}:</span>
      <span class="info-valor">${item.valor}</span>
    </div>
  `).join('') : "";

  return `
    <div class="ficha-categoria" style="border-left: 4px solid ${fichaCategoria.cor};">
      <img src="${limparEspacos(fichaCategoria.perfilImg)}" alt="Imagem do editor">
      <div class="ficha-info">
        ${itensInfo}
      </div>
    </div>
  `;
}
