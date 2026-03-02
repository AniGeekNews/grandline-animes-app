
/**
 * modulos_secoes/modulos_analises/05-colocar-na-tela/carregar-mais-conteudo.js
 * Extensor: Gerencia o incremento da paginação e o botão de carregar mais.
 */

import { renderizarNoticias } from "./injetar-noticias.js";

/**
 * Inicializa o evento do botão de carregar mais.
 * @param {Function} getNoticias - Função que retorna o array atual de todas as notícias.
 * @param {Function} setNoticiasExibidas - Função para atualizar o contador global de exibição.
 * @param {Function} getNoticiasExibidas - Função para obter o valor atual do contador.
 */
export function configurarBotaoCarregarMais(getNoticias, getNoticiasExibidas, setNoticiasExibidas) {
    const btn = document.getElementById('btn-carregar-mais');
    
    if (btn) {
        btn.onclick = () => {
            // 1. Incrementa o contador local (ex: de 5 para 10)
            const novoValor = getNoticiasExibidas() + 5;
            setNoticiasExibidas(novoValor);

            // 2. Solicita a renderização das notícias com o novo limite
            renderizarNoticias(getNoticias(), novoValor);
        };
    }
}
