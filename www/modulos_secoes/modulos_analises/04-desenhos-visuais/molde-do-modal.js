/**
 * modulos_secoes/modulos_analises/04-desenhos-visuais/molde-do-modal.js
 * Janela: Define como o conteúdo é renderizado com estilos embutidos.
 */

import { limparEspacos } from "../02-ajustes-de-texto/formatar-links-e-espacos.js";
import { criarGridFichaTecnica, criarFichaEditor } from "./molde-da-ficha-tecnica.js";

/**
 * Injeta estilos de tipografia e layout para leitura profissional.
 */
const injetarEstilosLeitura = () => {
  if (document.getElementById('estilo-leitura-modal')) return;

  const style = document.createElement('style');
  style.id = 'estilo-leitura-modal';
  style.innerHTML = `
    .modal-body-scroll {
        padding: 20px;
        line-height: 1.8;
        color: #333;
        font-family: 'Inter', sans-serif;
    }
    #modal-titulo {
        font-size: 24px;
        font-weight: 800;
        margin-bottom: 15px;
        line-height: 1.2;
    }
    #modal-resumo {
        font-size: 16px;
        color: #666;
        margin-bottom: 25px;
        font-style: italic;
    }
    .modal-divider {
        height: 1px;
        background: #eee;
        margin: 20px 0;
    }
    .btn-fechar-modal-x {
        position: absolute; top: 15px; right: 15px;
        background: rgba(0,0,0,0.5); color: #fff;
        border: none; border-radius: 50%; width: 35px; height: 35px;
        cursor: pointer; z-index: 10001;
    }
  `;
  document.head.appendChild(style);
};

// Ativa os estilos ao carregar o módulo
injetarEstilosLeitura();

/**
 * Preenche os elementos do modal com os dados da notícia selecionada.
 */
export function renderizarConteudoModal(noticia) {
  // 1. Garantir que a Barra de Progresso existe no Modal
  const modalElement = document.getElementById('modal-noticia');
  if (modalElement && !modalElement.querySelector('.reading-progress-bar')) {
      const progressBar = document.createElement('div');
      progressBar.className = 'reading-progress-bar';
      modalElement.prepend(progressBar);
  }

  // 2. Preenchimento de Textos
  document.getElementById('modal-titulo').innerText = noticia.titulo;
  document.getElementById('modal-categoria').innerHTML = `<i class="fa-solid fa-video"></i> ${noticia.categoria}`;
  document.getElementById('modal-resumo').innerText = noticia.resumo;
  document.getElementById('modal-link').href = noticia.linkArtigo;

  // 3. Lógica de Capa
  const modalCapaContainer = document.getElementById('modal-capa-container');
  const modalCapaImg = document.getElementById('modal-capa-img');
  const imgCapa = noticia.capaNoticia || noticia.capaUrl;

  if (imgCapa) {
    modalCapaImg.src = limparEspacos(imgCapa);
    modalCapaContainer.style.display = 'block';
  } else {
    modalCapaContainer.style.display = 'none';
  }

  // 4. Informações Técnicas e Editor
  const containerFicha = document.getElementById('modal-ficha');
  containerFicha.innerHTML = "";

  if (noticia.fichaCategoria) {
    const htmlEditor = criarFichaEditor(noticia.fichaCategoria);
    containerFicha.insertAdjacentHTML('beforebegin', htmlEditor);
  }

  containerFicha.innerHTML = criarGridFichaTecnica(noticia.ficha);

  // 5. Mídia
  const videoIframe = document.getElementById('modal-video');
  if(videoIframe) videoIframe.src = limparEspacos(noticia.videoPrincipal);
}
