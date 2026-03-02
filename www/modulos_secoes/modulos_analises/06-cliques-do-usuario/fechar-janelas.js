
/**
 * modulos_secoes/modulos_analises/06-cliques-do-usuario/fechar-janelas.js
 * Saída: Gerencia o fechamento de modais e a limpeza da URL.
 */

/**
 * Fecha o modal de notícia, interrompe o vídeo e limpa o ID da URL.
 */
export function fecharModalNoticia() {
  const modal = document.getElementById('modal-noticia');
  const iframe = document.getElementById('modal-video');

  if (modal) {
    modal.style.display = 'none';
  }

  // Interrompe o vídeo para não continuar o áudio em segundo plano
  if (iframe) {
    iframe.src = "";
  }

  // Limpa o parâmetro 'id' da URL para refletir que o modal fechou
  const url = new URL(window.location);
  url.searchParams.delete('id');
  window.history.pushState({}, '', url);
}

// Vincula ao escopo global para o botão 'X' e cliques fora do modal
window.fecharModal = fecharModalNoticia;
