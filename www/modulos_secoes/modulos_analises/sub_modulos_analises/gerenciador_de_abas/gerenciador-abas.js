/* ======================================================
   AniGeekNews – Gerenciador de Abas Enterprise v7.1
   Caminho: modulos_secoes/modulos_analises/sub_modulos_analises/gerenciador_de_abas/gerenciador-abas.js
   LOGS: Monitoramento total de injeção, persistência e carregamento inicial.
   ESTILO: Visual premium inspirado no Enterprise Section System v7
====================================================== */

export function inicializarSistemaAbas() {
    console.log("🛠️ [ABAS-GEEK] Iniciando construtor do sistema de abas...");

    const CONFIG = {
        MAX_TABS: 12,
        KEYS: { ORDER: 'ag_v7_order' },
        PATH_CATEGORIAS: './sub_modulos_analises/categoria_analises/'
    };

    console.log(`📍 [ABAS-GEEK] Configurado caminho de busca: ${CONFIG.PATH_CATEGORIAS}`);

        // --- CATALOGO CORRIGIDO ---
    // Os IDs dos itens devem ser iguais aos nomes dos arquivos .html no GitHub
    const CATALOGO = [
        {
            sessao: "ANIGEEKNEWS",
            id: 'sessao_anigeeknews',
            cor: "#FF4500",
            itens: [
                { id: 'manchetes', label: 'Notícias Premium' }, 
                { id: 'destaques', label: 'Edição Especial' }, 
                { id: 'ultimas', label: 'Top da Semana' }, 
                { id: 'trending', label: 'Seleção do Editor' }
            ]
        },
        {
            sessao: "ANIGEEKNEWS GAMES",
            id: 'sessao_analises',
            cor: "#8A2BE2",
            itens: [
                // Alterado de 'anigeeknews' para 'manchetes' para encontrar o arquivo real
                { id: 'manchetes', label: 'Universo Gamer' }, 
                { id: 'critica', label: 'InfoGames Brasil' }, 
                { id: 'teorias', label: 'Modo Desempenho' }
            ]
        },
        {
            sessao: "ANIGEEKNEWS TECNOLOGIA",
            id: 'sessao_tecnologia',
            cor: "#32CD32",
            itens: [
                { id: 'lanc_jogos', label: 'Mercado Tech' }, 
                { id: 'lanc_animes', label: 'Breaking Code' }, 
                { id: 'lanc_mangas', label: 'YellowiShipFloW' }
            ]
        }
    ];


    /**
     * MOTOR DE CARREGAMENTO DINÂMICO (INALTERADO – FUNCIONALIDADE CRÍTICA)
     */
    window.carregarSecao = async (id) => {
        console.log(`🌀 [MOTOR-ABAS] Solicitando carga da seção: [${id}]`);
        const container = document.getElementById('container-principal');
        
        if (!container) {
            console.error("❌ [MOTOR-ABAS] Abortado: O elemento '#container-principal' não foi encontrado no HTML!");
            return;
        }

        container.innerHTML = `
            <div style="text-align: center; padding: 100px; opacity: 0.5; color: var(--text-main);">
                <i class="fa-solid fa-gear fa-spin"></i><br>
                <span style="font-size: 11px; font-weight: 800; text-transform: uppercase; margin-top: 10px; display: block;">Sincronizando ${id}...</span>
            </div>`;

        try {
            const endpoint = `${CONFIG.PATH_CATEGORIAS}${id}.html`;
            console.log(`🌐 [MOTOR-ABAS] Tentando conexão com: ${endpoint}`);
            
            const response = await fetch(endpoint);
            console.log(`📡 [MOTOR-ABAS] Status da requisição: ${response.status}`);

            if (!response.ok) {
                throw new Error(`Arquivo ${id}.html não encontrado no servidor.`);
            }
            
            const html = await response.text();
            console.log(`📄 [MOTOR-ABAS] Sucesso! HTML recebido (${html.length} bytes).`);
            
            container.innerHTML = html;

            // REATIVADOR DE SCRIPTS (Essencial para o Firebase funcionar dentro da aba)
            const scripts = container.querySelectorAll("script");
            if (scripts.length > 0) {
                console.log(`⚡ [MOTOR-ABAS] Reativando ${scripts.length} scripts da aba...`);
                scripts.forEach((oldScript, idx) => {
                    const newScript = document.createElement("script");
                    Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
                    newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                    oldScript.parentNode.replaceChild(newScript, oldScript);
                });
            }

            console.log(`🎉 [MOTOR-ABAS] Aba [${id}] carregada e scripts executados.`);
        } catch (error) {
            console.error("❌ [MOTOR-ABAS] Falha crítica:", error.message);
            container.innerHTML = `
                <div style="text-align: center; padding: 100px; color: var(--primary);">
                    <i class="fa-solid fa-triangle-exclamation"></i><br>
                    <span style="font-size: 11px; font-weight: 800;">ERRO AO CARREGAR: ${id.toUpperCase()}</span>
                    <p style="font-size: 10px; opacity: 0.6; margin-top: 5px;">Caminho tentado: ${CONFIG.PATH_CATEGORIAS}${id}.html</p>
                </div>`;
        }
    };

    // --- INJEÇÃO DE ESTILOS PREMIUM ---
    const styles = `
        /* --- LAYOUT DA GAVETA --- */
        #ag-drawer {
            background: var(--card-bg);
            border-bottom: 1px solid var(--border);
            overflow: hidden;
            max-height: 0;
            transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
            opacity: 0;
            width: 100%;
            position: absolute;
            left: 0;
            z-index: 1000;
            box-shadow: 0 10.5px 21px rgba(0,0,0,0.08);
        }

        #ag-drawer.open {
            max-height: 85vh;
            opacity: 1;
            padding-bottom: 20px;
            border-bottom: 2px solid var(--primary);
        }

        .ag-drawer-scroll {
            max-height: 85vh;
            overflow-y: auto;
            padding: 21px 14px;
        }

        /* --- HEADER DA GAVETA --- */
        .ag-drawer-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 14px;
            flex-wrap: wrap;
            max-width: 840px;
            margin: -21px auto 21px auto;
            padding: 17.5px 0;
            position: sticky;
            top: -21px;
            z-index: 100;
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(8.4px);
            -webkit-backdrop-filter: blur(8.4px);
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        body.dark-mode .ag-drawer-header {
            background: rgba(20, 20, 20, 0.85);
            border-color: rgba(255, 255, 255, 0.08);
        }

        /* --- PESQUISA --- */
        .ag-search-wrapper {
            position: relative;
            flex: 1;
            min-width: 196px;
        }

        .ag-search-icon-svg {
            position: absolute;
            left: 9.8px;
            top: 50%;
            transform: translateY(-50%);
            width: 12.6px;
            height: 12.6px;
            fill: var(--text-muted);
            pointer-events: none;
        }

        .ag-search-input {
            width: 100%;
            padding: 7.7px 10.5px 7.7px 31.5px;
            border-radius: 7px;
            border: 1px solid var(--border);
            background: var(--bg);
            color: var(--text-main);
            font-size: 9.8px;
            font-weight: 500;
            outline: none;
            transition: all 0.3s ease;
        }

        .ag-search-input:focus {
            border-color: var(--primary);
            box-shadow: 0 2.8px 10.5px rgba(0,0,0,0.08);
        }

        /* --- SESSÕES --- */
        .ag-section-block {
            margin-bottom: 24.5px;
            max-width: 840px;
            margin-left: auto;
            margin-right: auto;
        }

        .ag-section-header-btn {
            display: flex;
            align-items: center;
            gap: 7px;
            margin-bottom: 8.4px;
            background: transparent;
            border: none;
            padding: 3.5px 0;
            cursor: pointer;
            width: fit-content;
            transition: 0.2s;
        }

        .ag-section-header-btn:hover {
            opacity: 0.7;
        }

        .ag-section-text {
            font-size: 9.8px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.7px;
            color: var(--text-main);
        }

        .ag-section-header-btn.is-active .ag-section-text {
            color: var(--primary);
            text-decoration: underline;
            text-decoration-thickness: 1.4px;
            text-underline-offset: 2.8px;
        }

        .ag-section-marker {
            width: 7px;
            height: 7px;
            border-radius: 2.1px;
            box-shadow: 0 0 3.5px rgba(0,0,0,0.2);
        }

        /* --- GRID DE ITENS --- */
        .ag-grid-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(105px, 1fr));
            gap: 7px;
        }

        .ag-card {
            position: relative;
            background: var(--bg);
            border: 1px solid transparent;
            border-radius: 4.2px;
            padding: 8.4px 7px;
            font-size: 9.1px;
            font-weight: 500;
            color: var(--text-main);
            text-align: center;
            cursor: pointer;
            transition: all 0.2s ease;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .ag-card:hover {
            background: var(--card-bg);
            transform: translateY(-1.4px);
        }

        .ag-card.is-selected {
            background: var(--bg);
            border-color: var(--primary);
            color: var(--primary);
            box-shadow: inset 0 0 0 0.7px var(--primary);
            font-weight: 700;
        }

        /* --- TOASTS --- */
        #ag-toast-container {
            position: fixed;
            bottom: 21px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 99999;
            pointer-events: none;
            display: flex;
            flex-direction: column;
            gap: 7px;
        }

        .ag-toast {
            background: rgba(30, 30, 30, 0.95);
            color: #fff;
            padding: 8.4px 16.8px;
            border-radius: 35px;
            font-size: 9.1px;
            font-weight: 600;
            box-shadow: 0 3.5px 10.5px rgba(0,0,0,0.3);
            backdrop-filter: blur(3.5px);
            opacity: 0;
            transform: translateY(14px);
            animation: agSlideUp 0.3s forwards;
            display: flex;
            align-items: center;
            gap: 7px;
        }

        .ag-toast.success { border-left: 2.8px solid #00C851; }
        .ag-toast.error { border-left: 2.8px solid #ff4444; }

        @keyframes agSlideUp {
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes agFadeOut {
            to { opacity: 0; transform: translateY(-7px); }
        }

        /* --- BARRA DE FILTROS --- */
        #filterScroller {
            display: flex;
            align-items: center;
            position: relative;
            gap: 5.6px;
            overflow-x: auto;
            scrollbar-width: none;
        }
        #filterScroller::-webkit-scrollbar { display: none; }

        .filter-tag {
            background: transparent;
            border: none;
            color: var(--text-main);
            font-size: 11px;
            font-weight: 700;
            padding: 6px 12px;
            border-radius: 4px;
            cursor: pointer;
            white-space: nowrap;
            transition: all 0.2s;
        }

        .filter-tag.active {
            color: var(--primary);
            border-bottom: 2px solid var(--primary);
        }

        .filter-tag.cfg-btn {
            position: sticky;
            right: 0;
            z-index: 99;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(5.6px);
            -webkit-backdrop-filter: blur(5.6px);
            min-width: 33.6px;
            height: 23.8px;
            margin-left: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            border-left: 1px solid var(--border);
            box-shadow: -7px 0 14px rgba(0, 0, 0, 0.05);
            cursor: pointer;
            font-size: 12.6px;
            transition: all 0.3s ease;
        }

        body.dark-mode .filter-tag.cfg-btn {
            background: rgba(20, 20, 20, 0.9);
            border-left: 1px solid var(--border);
            box-shadow: -10.5px 0 17.5px rgba(0, 0, 0, 0.5);
        }

        .filter-tag.cfg-btn::before {
            content: '';
            position: absolute;
            left: -14px;
            top: 0;
            width: 14px;
            height: 100%;
            background: linear-gradient(to right, transparent, rgba(255,255,255,0.9));
            pointer-events: none;
        }

        body.dark-mode .filter-tag.cfg-btn::before {
            background: linear-gradient(to right, transparent, rgba(20, 20, 20, 0.9));
        }

        .filter-tag.cfg-btn:active {
            transform: scale(0.9);
            opacity: 0.8;
        }
    `;

    if (!document.getElementById('ag-v7-styles')) {
        const styleSheet = document.createElement("style");
        styleSheet.id = 'ag-v7-styles';
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
    }

    // --- TOAST SYSTEM ---
    function showToast(message, type = 'normal') {
        let container = document.getElementById('ag-toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'ag-toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `ag-toast ${type === 'success' ? 'success' : type === 'error' ? 'error' : ''}`;
        toast.innerHTML = message;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'agFadeOut 0.3s forwards';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // --- PERSISTÊNCIA ---
    const load = (k, d) => {
        const data = localStorage.getItem(k);
        return data ? JSON.parse(data) : d;
    };
    const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));

    const getOrder = () => load(CONFIG.KEYS.ORDER, ['manchetes', 'opiniao', 'critica']);

    function findItem(id) {
        for (let sec of CATALOGO) {
            if (sec.itens.some(i => i.id === id)) {
                return sec.itens.find(i => i.id === id);
            }
        }
        return null;
    }

    /**
     * RENDERIZADOR DA BARRA DE FILTROS
     */
    window.renderBar = () => {
        const bar = document.getElementById('filterScroller');
        if (!bar) return;

        let drawer = document.getElementById('ag-drawer') || (() => {
            const el = document.createElement('div');
            el.id = 'ag-drawer';
            bar.parentNode.insertBefore(el, bar.nextSibling);
            return el;
        })();

        const order = getOrder();
        bar.innerHTML = '';

        order.forEach((id, index) => {
            const item = findItem(id);
            if (!item) return;

            const btn = document.createElement('button');
            btn.className = 'filter-tag';
            btn.textContent = item.label;

            if (index === 0) {
                btn.classList.add('active');
                const principal = document.getElementById('container-principal');
                if (principal && principal.innerText.includes("Iniciando motor")) {
                    window.carregarSecao(id);
                }
            }

            btn.onclick = () => {
                document.querySelectorAll('.filter-tag').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                window.carregarSecao(id);
            };
            bar.appendChild(btn);
        });

        const cfg = document.createElement('button');
        cfg.className = 'filter-tag cfg-btn';
        cfg.innerHTML = '<i class="fa-solid fa-plus"></i>';
        cfg.onclick = () => {
            drawer.classList.toggle('open');
            if (drawer.classList.contains('open')) renderDrawer();
        };
        bar.appendChild(cfg);
    };

    /**
     * RENDERIZADOR DO MENU DE SELEÇÃO (DRAWER)
     */
    function renderDrawer(filterText = "") {
        const drawer = document.getElementById('ag-drawer');
        const order = getOrder();
        const term = filterText.toLowerCase();

        const searchIcon = `<svg class="ag-search-icon-svg" viewBox="0 0 24 24"><path d="M21.71 20.29l-5.01-5.01C17.54 13.68 18 11.91 18 10c0-4.41-3.59-8-8-8S2 5.59 2 10s3.59 8 8 8c1.91 0 3.68-.46 5.28-1.3l5.01 5.01c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41z"/></svg>`;

        drawer.innerHTML = `
            <div class="ag-drawer-scroll">
                <div class="ag-drawer-header">
                    <div class="ag-search-wrapper">
                        ${searchIcon}
                        <input type="text" class="ag-search-input" id="ag-search-input" placeholder="Filtrar categorias..." value="${filterText}">
                    </div>
                </div>
                <div id="ag-catalog-content"></div>
                <div style="text-align:center; padding-top:20px; font-size:12px; color:var(--text-muted);">
                    ${order.length} de ${CONFIG.MAX_TABS} abas ativas
                </div>
            </div>`;

        const content = document.getElementById('ag-catalog-content');

        CATALOGO.forEach(sec => {
            const itensFiltrados = sec.itens.filter(i => i.label.toLowerCase().includes(term));
            const sessaoMatch = sec.sessao.toLowerCase().includes(term);
            if (term && !sessaoMatch && itensFiltrados.length === 0) return;

            const block = document.createElement('div');
            block.className = 'ag-section-block';

            const isCatSelected = false; // Seu sistema não usa seleção de categoria-pai, então mantemos como não selecionável

            block.innerHTML = `
                <button class="ag-section-header-btn">
                    <div class="ag-section-marker" style="background:${sec.cor}"></div>
                    <span class="ag-section-text">${sec.sessao}</span>
                </button>
                <div class="ag-grid-container"></div>
            `;

            const grid = block.querySelector('.ag-grid-container');
            const itensParaMostrar = sessaoMatch ? sec.itens : itensFiltrados;

            itensParaMostrar.forEach(item => {
                const isSelected = order.includes(item.id);
                const card = document.createElement('div');
                card.className = `ag-card ${isSelected ? 'is-selected' : ''}`;
                card.textContent = item.label;

                card.onclick = () => {
                    let currentOrder = getOrder();
                    if (isSelected) {
                        currentOrder = currentOrder.filter(x => x !== item.id);
                        showToast(`Removido: <b>${item.label}</b>`, 'normal');
                    } else if (currentOrder.length < CONFIG.MAX_TABS) {
                        currentOrder.push(item.id);
                        showToast(`Adicionado: <b>${item.label}</b>`, 'success');
                    } else {
                        showToast(`Limite de ${CONFIG.MAX_TABS} abas atingido!`, 'error');
                        return;
                    }
                    save(CONFIG.KEYS.ORDER, currentOrder);
                    window.renderBar();
                    renderDrawer(document.getElementById('ag-search-input').value);
                };
                grid.appendChild(card);
            });

            if (grid.children.length > 0) content.appendChild(block);
        });

        const input = document.getElementById('ag-search-input');
        input.oninput = (e) => renderDrawer(e.target.value);
    }

    // Inicialização
    window.renderBar();
    console.log("✅ [ABAS-GEEK] Sistema de abas v7.1 totalmente operacional.");
}
