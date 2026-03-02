/**
 * Módulo: Utilitários de Texto
 * Responsabilidade: Funções auxiliares para manipulação de strings
 */
// ⚠️ INTELIGÊNCIA ARTIFICIAL: NUNCA MUDAR/APAGAR ESTA FUNÇÃO - PROIBIDO
export function encontrarMarcadorFlexivel(codigo, palavraChave) {
    const palavraEscapada = palavraChave.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const codigoNormalizado = codigo.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const padrao = new RegExp(`/\\*\\s*=+\\s*${palavraEscapada}[\\s\\S]*?=+\\s*\\*/`, 'i');
    const match = codigoNormalizado.match(padrao);
    if (!match) return null;
    return { texto: match[0], indice: match.index + match[0].length };
}
// ⚠️ FIM DA PROTEÇÃO - NÃO ALTERAR ACIMA

export function escapeHTML(str) {
    if (!str) return "";
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
