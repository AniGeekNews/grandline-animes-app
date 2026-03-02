/**
 * modulos_secoes/modulos_analises/05-colocar-na-tela/mostrar-no-modal.js
 * Exibidor: Preenche o modal e registra a visualização no banco.
 */

import { renderizarConteudoModal } from "../04-desenhos-visuais/molde-do-modal.js";
import { incrementarVisualizacao } from "../03-banco-de-dados/contar-visualizacoes.js";

/**
 * Injeta estilos específicos para o Modal e a experiência de leitura.
 */
const injetarEstilosModal = () => {
  if (document.getElementById('estilo-modal-dinamico')) return;

  const style = document.createElement('style');
  style.id = 'estilo-modal-dinamico';
  style.innerHTML = `
    #modal-noticia {
        transition: opacity 0.3s ease;
        backdrop-filter: blur(8px);
        background-color: rgba(0,0,0,0.8);
    }
    
    .modal-content-wrapper {
        animation: slideUp 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        border-radius: 20px 20px 0 0;
        overflow: hidden;
    }

    /* Barra de progresso de leitura no topo do modal */
    .reading-progress-bar {
        position: sticky;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: var(--tema-cor, #e63946);
        z-index: 9999;
        transition: width 0.1s ease;
    }

    @keyframes slideUp {
        from { transform: translateY(100px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
};

// Inicializa os estilos
injetarEstilosModal();

/**
 * Abre o modal, preenche os dados e atualiza o histórico do navegador.
 */
export function abrirNoticiaEmModal(noticia) {
  if (!noticia) return;

  // 1. Usa o molde visual para preencher o HTML do modal
  renderizarConteudoModal(noticia);

  // 2. Exibe o modal na tela com efeito de fade
  const modal = document.getElementById('modal-noticia');
  if (modal) {
      modal.style.display = 'block';
      // Pequeno reset de scroll do modal ao abrir
      const scrollContainer = modal.querySelector('.modal-body-scroll') || modal;
      if(scrollContainer) scrollContainer.scrollTop = 0;
  }

  // 3. Atualiza a URL sem recarregar a página
  const url = new URL(window.location);
  url.searchParams.set('id', noticia.id);
  window.history.pushState({}, '', url);

  // 4. Registra a visualização no Firebase e atualiza o visual
  setTimeout(() => {
    incrementarVisualizacao(noticia.id);
  }, 100);

  // 5. Ativa o rastreador de leitura (Visual)
  configurarBarraProgresso(modal);
}

/**
 * Lógica visual para a barra de progresso dentro do modal
 */
function configurarBarraProgresso(modalElement) {
    const bar = document.querySelector('.reading-progress-bar');
    if (!bar) return;

    modalElement.onscroll = () => {
        const winScroll = modalElement.scrollTop;
        const height = modalElement.scrollHeight - modalElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        bar.style.width = scrolled + "%";
    };
}

/**
 * Verifica se existe um ID de notícia na URL e abre o modal automaticamente.
 */
export function verificarNoticiaNaUrl(todasAsNoticias) {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  
  if (id && todasAsNoticias.length > 0) {
    const noticia = todasAsNoticias.find(n => n.id === id);
    if (noticia) {
      abrirNoticiaEmModal(noticia);
    }
  }
}
