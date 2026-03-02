/**
 * modulos_analises/04-desenhos-visuais/molde-do-card-noticia.js
 * Esqueleto: Atualizado com Sistema de Engajamento e Trending.
 */

import { limparEspacos } from "../02-ajustes-de-texto/formatar-links-e-espacos.js";

function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}

export function criarTemplateCard(news, shareUrl) {
    console.log(`🎨 Desenhando card: ${news.titulo}`);

    const imgFeed = news.capaNoticia || news.capaUrl;
    const capaHTML = imgFeed ? `
        <div class="noticia-capa" style="margin: -15px -15px 15px -15px; position: relative;">
            <img src="${limparEspacos(imgFeed)}" style="width: 100%; aspect-ratio: 16 / 9; border-radius: 12px 12px 0 0; object-fit: cover; display: block;">
            <div class="trending-badge-container"></div>
        </div>` : '';

    let fichaCategoriaHtml = '';
    if (news.fichaCategoria) {
        fichaCategoriaHtml = `
        <div class="ficha-categoria" style="border-left: 4px solid ${news.fichaCategoria.cor};">
            <img src="${limparEspacos(news.fichaCategoria.perfilImg)}" alt="Imagem do editor">
            <div class="ficha-info">
                ${news.fichaCategoria.info ? news.fichaCategoria.info.map(item => `
                    <div class="info-item">
                        <span class="info-label">${item.label}:</span>
                        <span class="info-valor">${item.valor}</span>
                    </div>
                `).join('') : ''}
            </div>
        </div>`;
    }

    let newsDataEncoded = "";
    try {
        newsDataEncoded = utf8_to_b64(JSON.stringify(news));
    } catch (e) {
        console.error("❌ Erro ao codificar dados da notícia:", e);
    }

    return `
    <article class="destaque-secao" id="artigo-${news.id}" style="--tema-cor: ${news.cor}">
      <div class="destaque-padding">
        ${capaHTML}
        <div class="destaque-categoria"><i class="fa-solid fa-hashtag"></i> ${news.categoria}</div>
        
        <div class="destaque-header">
          <h2 class="destaque-titulo" onclick="window.abrirModalGeek('${newsDataEncoded}')" style="cursor:pointer">${news.titulo}</h2>
          <div class="menu-opcoes-container" tabindex="0">
            <button class="btn-tres-pontos"><i class="fa-solid fa-ellipsis-vertical"></i></button>
            <div class="dropdown-conteudo header-dropdown">
              <a href="#" onclick="event.preventDefault(); window.copiarLink('${shareUrl}', '${news.id}');">
                <i class="fa-regular fa-copy"></i> Copiar Link
              </a>
            </div>
          </div>
        </div>

        ${fichaCategoriaHtml}

        <p class="destaque-resumo">${news.resumo}</p>
        <a href="${news.linkArtigo}" class="btn-ver-artigo" target="_blank"><i class="fa-solid fa-book-open"></i> Ver artigo completo</a>
        
        <div class="destaque-info-grid">
          ${news.ficha ? news.ficha.map(item => `<div class="info-item"><span class="info-label">${item.label}</span><span class="info-valor">${item.valor}</span></div>`).join('') : ''}
        </div>
      </div>
      
      <div class="destaque-media">
        <iframe id="player-${news.id}" src="${limparEspacos(news.videoPrincipal)}" allowfullscreen style="width: 100%; aspect-ratio: 16 / 9; border: none;"></iframe>
      </div>
      
      <div class="premium-actions-bar">
          <button class="btn-premium-icon btn-like" onclick="window.curtirNoticia('${news.id}')">
            <i class="fa-regular fa-thumbs-up"></i> Útil (<span class="num-like">${news.curtidas || 0}</span>)
          </button>
          
          <button class="btn-premium-icon btn-share" onclick="window.shareNews('${news.titulo.replace(/'/g, "\\'")}', '${shareUrl}', '${news.id}')">
            <i class="fa-solid fa-share-nodes"></i> <span class="num-share">${news.shares || 0}</span>
          </button>

          <button class="btn-premium-icon btn-stats">
            <i class="fa-solid fa-eye"></i>
            <span class="stats-num num-view">${news.visualizacoes || 0}</span>
          </button>
      </div>

      <div class="carrossel-temas">
        <div class="carrossel-header"><span class="temas-label">Vídeos Relacionados</span></div>
        <div class="temas-scroll-wrapper"><div class="temas-container">
            ${news.relacionados ? news.relacionados.map(rel => `
              <div class="tema-card" onclick="window.pedirTroca('player-${news.id}', '${rel.idVid}', '${rel.titulo.replace(/'/g, "\\'")}', '${news.cor}')">
                <img src="${limparEspacos(rel.thumb)}" class="tema-thumb">
                <div class="tema-titulo">${rel.titulo}</div>
              </div>`).join('') : ''}
        </div></div>
      </div>

      <div class="secao-produtos-banner">
        <div class="banner-header"><i class="fa-solid fa-cart-shopping"></i> Produtos Recomendados</div>
        <div class="banner-lista">
            ${news.produtos ? news.produtos.map(prod => `
              <a href="${limparEspacos(prod.link)}" target="_blank" class="banner-produto-item">
                <div class="banner-img-box">
                  <img src="${limparEspacos(prod.img)}" class="banner-thumb">
                </div>
                <div class="banner-info">
                  <div class="banner-titulo">${prod.nome}</div>
                  <div class="banner-desc">${prod.desc || 'Item selecionado pela nossa equipe Geek.'}</div>
                  <div class="banner-link-fake">Ver na loja <i class="fa-solid fa-chevron-right"></i></div>
                </div>
              </a>`).join('') : ''}
        </div>
      </div>

      <div class="container-comentarios-dinamico" data-noticia-id="${news.id}"></div>
    </article>
    `;
}

window.abrirModalGeek = (encodedData) => {
    try {
        const decoded = decodeURIComponent(escape(window.atob(encodedData)));
        const news = JSON.parse(decoded);
        if (window.abrirNoticiaEmModal) {
            window.abrirNoticiaEmModal(news);
        } else {
            console.error("❌ Erro: Função abrirNoticiaEmModal não encontrada.");
        }
    } catch (e) {
        console.error("❌ Erro ao decodificar dados:", e);
    }
};
