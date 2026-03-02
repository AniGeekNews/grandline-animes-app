/**
 * modulos_analises/inicializador-do-site.js
 * O Chefe Autônomo: Versão Ultra Segura com Logs de Monitoramento Massivo.
 */
console.log("🔥 [GEEK-CORE] inicializador-do-site.js foi carregado com sucesso no navegador.");

// 1. Importações de Configuração e Banco
console.log("📦 [GEEK-CORE] Importando dependências de Banco de Dados...");
import { db } from "./01-conexao-com-servidor/configuracao-firebase.js";
import { iniciarEscutaNoticias } from "./03-banco-de-dados/buscar-noticias-ao-vivo.js";
import { configurarCurtidas } from "./03-banco-de-dados/salvar-curtidas.js";

// 2. Importações de Interface (Renderização)
console.log("📦 [GEEK-CORE] Importando módulos de Interface e Renderização...");
import { configurarBotaoCarregarMais } from "./05-colocar-na-tela/carregar-mais-conteudo.js";
import { verificarNoticiaNaUrl } from "./05-colocar-na-tela/mostrar-no-modal.js";

// 3. Importações de Interação (Eventos de Clique)
console.log("📦 [GEEK-CORE] Importando gerenciadores de eventos e cliques...");
import "./06-cliques-do-usuario/gerenciar-compartilhamento.js";
import { configurarConfirmacaoVideo } from "./06-cliques-do-usuario/gerenciar-videos.js";
import "./06-cliques-do-usuario/fechar-janelas.js";

// 4. Importação do Gerenciador de Abas (Submódulo)
console.log("📦 [GEEK-CORE] Importando Submódulo de Gerenciamento de Abas v7...");
import { inicializarSistemaAbas } from "./sub_modulos_analises/gerenciador_de_abas/gerenciador-abas.js";

// ESTADO GLOBAL DO MÓDULO
console.log("💾 [ESTADO] Inicializando variáveis de estado global (Notícias e Exibição).");
let todasAsNoticias = [];
let noticiasExibidas = 5;

const getNoticias = () => {
    console.log(`🔍 [ESTADO] getNoticias chamado. Total atual: ${todasAsNoticias.length}`);
    return todasAsNoticias;
};

const setNoticias = (novasNoticias) => { 
    console.log(`📥 [ESTADO] Atualizando banco de notícias local. De ${todasAsNoticias.length} para ${novasNoticias.length} itens.`);
    todasAsNoticias = novasNoticias; 
};

const getExibidas = () => {
    console.log(`🔢 [ESTADO] getExibidas retornando: ${noticiasExibidas}`);
    return noticiasExibidas;
};

const setExibidas = (valor) => { 
    console.log(`⚙️ [ESTADO] Alterando limite de exibição para: ${valor}`);
    noticiasExibidas = valor; 
};

/**
 * Função de Inicialização Total
 */
export async function inicializarApp() {
    console.log("🚀 [SISTEMA] Motor de Análises iniciado. Começando sequência de bootstrap...");

    // [NOVO] A. Inicializa as abas primeiro para garantir que a interface apareça
    try {
        console.log("📂 [SISTEMA] Passo A: Chamando inicializarSistemaAbas()...");
        inicializarSistemaAbas();
        console.log("✅ [SISTEMA] Sistema de Abas carregado com sucesso.");
    } catch (e) {
        console.error("❌ [SISTEMA] Erro crítico ao carregar Abas! O subsistema falhou:", e);
        console.warn("⚠️ [SISTEMA] Continuando inicialização apesar da falha nas abas...");
    }

    // B. Conexão em Tempo Real (Radar)
    console.log("📡 [SISTEMA] Passo B: Configurando radar de escuta Firebase...");
    iniciarEscutaNoticias(db, (noticias) => {
        console.log("🛰️ [SISTEMA] Radar detectou mudanças no Firestore! Processando...");
        setNoticias(noticias);
        
        const labelNovo = document.getElementById('novo-artigo-titulo');
        if(labelNovo && noticias.length > 0) {
            console.log(`✨ [SISTEMA] Atualizando banner de novidade: "${noticias[0].titulo}"`);
            labelNovo.innerText = noticias[0].titulo;
        } else {
            console.warn("❓ [SISTEMA] Banner 'novo-artigo-titulo' não encontrado ou lista vazia.");
        }
        
        console.log("🔗 [SISTEMA] Verificando deep-links (Notícia na URL)...");
        verificarNoticiaNaUrl(noticias);
    }, getExibidas);

    // C. Ativação de Backend (Curtidas)
    console.log("❤️ [SISTEMA] Passo C: Ativando listener de curtidas...");
    configurarCurtidas(db);

    // D. Aguarda componentes específicos antes de configurar botões de paginação
    const aguardarComponentes = () => {
        console.log("⏳ [SISTEMA] Passo D: Aguardando botão 'btn-carregar-mais' aparecer no DOM...");
        return new Promise((resolve) => {
            let tentativas = 0;
            const check = () => {
                tentativas++;
                const btn = document.getElementById('btn-carregar-mais');
                if (btn) {
                    console.log(`✅ [SISTEMA] Botão encontrado após ${tentativas} tentativas.`);
                    resolve(true);
                } else if (tentativas > 20) { 
                    console.warn("⚠️ [SISTEMA] Timeout: Botão carregar-mais não apareceu após 1 segundo.");
                    resolve(false);
                } else {
                    setTimeout(check, 50);
                }
            };
            check();
        });
    };

    const componenteExiste = await aguardarComponentes();
    
    if (componenteExiste) {
        console.log("🛠️ [SISTEMA] Configurando lógica de paginação (Botão Carregar Mais).");
        configurarBotaoCarregarMais(getNoticias, getExibidas, setExibidas);
    } else {
        console.error("❌ [SISTEMA] Falha ao configurar paginação: Botão inexistente.");
    }
    
    console.log("📽️ [SISTEMA] Configurando sistema de confirmação de vídeos...");
    configurarConfirmacaoVideo();
    
    console.log("✅ [SISTEMA] Todos os módulos sincronizados. App pronto para o usuário.");
}

/**
 * DISPARO AUTOMÁTICO
 */
console.log("🏁 [SISTEMA] Verificando estado do documento para disparo...");
if (document.readyState === 'loading') {
    console.log("🕒 [SISTEMA] Documento ainda carregando. Adicionando listener 'DOMContentLoaded'...");
    document.addEventListener('DOMContentLoaded', () => {
        console.log("🛎️ [SISTEMA] DOMContentLoaded disparado!");
        inicializarApp();
    });
} else {
    console.log("🚀 [SISTEMA] Documento já está pronto. Disparando inicializarApp() imediatamente.");
    inicializarApp();
}

// Expõe a função para recarregamento manual via console
window.recarregarAppGeek = () => {
    console.log("🔄 [RECARREGAR] Comando manual recebido. Reiniciando App...");
    inicializarApp();
};
