/**
 * modulos_analises/05-colocar-na-tela/injetar-noticias.js
 */

import { criarTemplateCard } from "../04-desenhos-visuais/molde-do-card-noticia.js";
import { limparEspacos } from "../02-ajustes-de-texto/formatar-links-e-espacos.js";

export function renderizarHero(primeiraNoticia) {
    const heroArea = document.getElementById('hero-area');
    if (!heroArea || !primeiraNoticia) return;

    if (primeiraNoticia.capaUrl) {
        console.log("🖼️ Injetando Hero: " + primeiraNoticia.titulo);
        heroArea.innerHTML = `
            <div class="hero-topo-container">
                <img src="${limparEspacos(primeiraNoticia.capaUrl)}" class="hero-topo-img" alt="Capa">
                ${primeiraNoticia.capaDesc ? `<div class="hero-topo-desc">${primeiraNoticia.capaDesc}</div>` : ''}
            </div>
        `;
        heroArea.style.display = 'block';
    } else {
        heroArea.style.display = 'none';
    }
}

export async function renderizarNoticias(todasAsNoticias, noticiasExibidas) {
    const container = document.getElementById('container-principal');
    const btnPaginacao = document.getElementById('pagination-control');
    
    if (!container) {
        console.error("❌ Erro: Container principal não encontrado no HTML!");
        return;
    }

    // Limpa o status de carregamento
    const statusMotor = document.getElementById('status-motor');
    if (statusMotor) statusMotor.remove();

    if (container.innerHTML.includes("Iniciando motor modular...")) {
        container.innerHTML = "";
    }

    console.log(`🏗️ Montador: Iniciando renderização de ${todasAsNoticias.length} itens.`);

    const baseUrl = window.location.origin + window.location.pathname;

    if (todasAsNoticias.length > 0) { 
        renderizarHero(todasAsNoticias[0]); 
    }

    const limite = noticiasExibidas || todasAsNoticias.length;
    const listaParaExibir = todasAsNoticias.slice(0, limite);

    listaParaExibir.forEach(news => {
        try {
            const artigoExistente = document.getElementById(`artigo-${news.id}`);
            const shareUrl = `${baseUrl}?id=${encodeURIComponent(news.id)}`;

            if (artigoExistente) {
                const spanLike = artigoExistente.querySelector('.num-like');
                if (spanLike) spanLike.innerText = news.curtidas || 0;
                
                const spanView = artigoExistente.querySelector('.num-view');
                if (spanView) spanView.innerText = news.visualizacoes || 0;
            } else {
                console.log(`📝 Criando card para: ${news.titulo || 'Sem Título'}`);
                const html = criarTemplateCard(news, shareUrl);
                
                if (!html) throw new Error("Template do card retornou vazio.");
                
                container.insertAdjacentHTML('beforeend', html);
            }
        } catch (err) {
            console.error(`❌ Erro ao criar card do ID ${news.id}:`, err.message);
        }
    });

    if (btnPaginacao) {
        btnPaginacao.style.display = limite < todasAsNoticias.length ? 'block' : 'none';
    }

    // Carregamento de comentários com try/catch reforçado
    try {
        const containersComentarios = document.querySelectorAll('.container-comentarios-dinamico');
        if (containersComentarios.length > 0) {
            console.log("💬 Carregando módulo de comentários...");
            // Caminho relativo para subir 3 níveis e entrar em /comentarios/
            await import('../../../comentarios/comentarios.js'); 
        }
    } catch (err) {
        console.warn("⚠️ Comentários: Módulo não carregado (verifique o caminho).");
    }
}

window.renderizarNoticias = renderizarNoticias;
