/* scripts/navegacao.js */

const displayPrincipal = document.getElementById('conteudo_de_destaque');

/**
 * Garante que o módulo de comentários seja reiniciado
 * sempre que um novo conteúdo HTML é injetado.
 */
function reiniciarModuloComentarios() {
    if (typeof window.inicializarComentarios === 'function') {
        window.inicializarComentarios();
    }
}

/**
 * Scroll inteligente até a notícia baseada no data-id
 */
function rolarParaNoticiaPorId(id) {
    const tentativasMax = 30;
    let tentativas = 0;

    const tentar = () => {
        const el = document.getElementById(`artigo-${id}`) || document.querySelector(`[data-id="${id}"]`);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.classList.add('destacado');
            setTimeout(() => el.classList.remove('destacado'), 2500);
        } else if (tentativas < tentativasMax) {
            tentativas++;
            // Se não achou, tenta "clicar" no botão de carregar mais se ele existir
            const btnMais = document.getElementById('btn-carregar-mais');
            if (btnMais && btnMais.offsetParent !== null) {
                btnMais.click();
            }
            setTimeout(tentar, 200);
        }
    };

    tentar();
}

/**
 * Carrega uma seção normalmente (lista de notícias)
 */
async function carregarSecao(nome) {
    if (!displayPrincipal) return;

    displayPrincipal.innerHTML =
        '<div style="text-align:center;padding:120px;color:var(--text-muted);opacity:.5">SINCRONIZANDO...</div>';

    try {
        gerenciarCSSDaSecao(nome);

        const response = await fetch(`./secoes/${nome}.html`);
        if (!response.ok) throw new Error("Arquivo não encontrado.");

        const html = await response.text();
        displayPrincipal.innerHTML = html;

        // Reexecuta scripts da seção (importante para o Firebase iniciar)
        const scripts = displayPrincipal.querySelectorAll("script");
        scripts.forEach(oldScript => {
            const newScript = document.createElement("script");
            newScript.type = oldScript.type || "text/javascript";
            if (oldScript.src) newScript.src = oldScript.src;
            newScript.textContent = oldScript.textContent;
            document.body.appendChild(newScript);
        });

        // LÓGICA DE PERSISTÊNCIA: 
        // Só rola para o topo se não houver um estado salvo de scroll no localStorage
        const savedState = localStorage.getItem('anigeek_persistence_v2');
        let shouldScrollTop = true;

        if (savedState) {
            const state = JSON.parse(savedState);
            // Se o scroll salvo for significativo, não forçamos o topo agora
            if (state.scrollY > 150) {
                shouldScrollTop = false;
            }
        }

        if (shouldScrollTop) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        setTimeout(reiniciarModuloComentarios, 800);

    } catch (err) {
        console.error(err);
        displayPrincipal.innerHTML =
            `<div style="text-align:center;padding:100px">Erro: ${nome} não carregado.</div>`;
    }
}

/**
 * Resolve links compartilhados via query param
 */
function verificarLinkCompartilhado() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) return;

    // Tenta encontrar a origem se o array global de notícias existir
    const item = window.noticias?.find(n => n.id === id);
    const secao = item?.origem || 'anime_i_geek';

    carregarSecao(secao);

    // Aguarda renderização e persegue o ID
    setTimeout(() => {
        rolarParaNoticiaPorId(id);
    }, 1000);
}

/**
 * Eventos de clique nas categorias (Abas)
 */
document.querySelectorAll('.filter-tag').forEach(tag => {
    tag.addEventListener('click', function() {
        // Se o usuário clicou manualmente, ele quer ver o topo daquela seção
        // Então limpamos a memória de scroll antiga
        const saved = localStorage.getItem('anigeek_persistence_v2');
        if (saved) {
            const state = JSON.parse(saved);
            state.scrollY = 0; 
            localStorage.setItem('anigeek_persistence_v2', JSON.stringify(state));
        }

        document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        // Atualiza o container de comentários se necessário
        const container = document.querySelector('.container-comentarios-dinamico');
        if (container) {
            container.setAttribute('data-colecao', this.dataset.section);
        }

        // Limpa ID da URL para não confundir o sistema
        const url = new URL(window.location);
        url.searchParams.delete('id');
        window.history.pushState({}, '', url);

        carregarSecao(this.dataset.section);
    });
});

/**
 * Inicialização principal ao carregar o DOM
 */
window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);

    if (params.has('id')) {
        verificarLinkCompartilhado();
    } else {
        const savedStateStr = localStorage.getItem('anigeek_persistence_v2');
        let secaoParaCarregar = 'anime_i_geek';

        if (savedStateStr) {
            const state = JSON.parse(savedStateStr);
            secaoParaCarregar = state.activeTabId || 'anime_i_geek';
            
            // Ativa visualmente a aba salva
            document.querySelectorAll('.filter-tag').forEach(t => {
                if(t.dataset.section === secaoParaCarregar) t.classList.add('active');
                else t.classList.remove('active');
            });
        }

        // Carrega a seção sem disparar o evento de .click() manual para não resetar o scroll
        carregarSecao(secaoParaCarregar);
    }
});

/**
 * Gerencia a troca de CSS por seção
 */
function gerenciarCSSDaSecao(nome) {
    const linkAntigo = document.getElementById('css-secao-dinamica');
    if (linkAntigo) linkAntigo.remove();

    const novoLink = document.createElement('link');
    novoLink.id = 'css-secao-dinamica';
    novoLink.rel = 'stylesheet';
    novoLink.href = `./estilos/secoes/${nome}.css`;
    document.head.appendChild(novoLink);
}

// Exposição global para ser chamado de outros scripts
window.carregarSecao = carregarSecao;
