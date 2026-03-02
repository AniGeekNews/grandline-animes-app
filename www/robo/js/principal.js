/**
 * Módulo Principal - AniGeek Robot v15.5
 */
import { db } from './configuracao/firebase.js';
import { log } from './interface/registros.js';
import { fecharModais, copiarCodigoModal } from './interface/modais.js';
import { renderExplorer, setVFS } from './interface/explorador.js';
import { baixarZip } from './motor/compactador.js';
import { carregarConfiguracoes, salvarTemplatesNoCloud, adicionarEditor, sincronizarFirebase, moduloRegistroManual } from './motor/sincronizador.js';
import { criarArquivos, salvarNoServidor } from './motor/gerador.js';
import { executarTerminal } from './utilitarios/terminal.js';

let editores = [];
let vFS_Global = {};

function inicializarEventos() {
    document.getElementById('btnGerarArquivos')?.addEventListener('click', async () => { 
        vFS_Global = criarArquivos(editores); 
        await salvarNoServidor(vFS_Global);
    });
    
    document.getElementById('btnBaixarZip')?.addEventListener('click', () => baixarZip(vFS_Global));
    document.getElementById('btnSincronizarFirebase')?.addEventListener('click', () => {
        sincronizarFirebase(editores, document.getElementById('tipoColecao')?.value || 'filme', document.getElementById('targetProject')?.value || 'todos', document.getElementById('fileName')?.value || '');
    });
    document.getElementById('btnExecutarTerminal')?.addEventListener('click', executarTerminal);
    document.getElementById('termCmd')?.addEventListener('keydown', (e) => { if(e.key === 'Enter') executarTerminal(); });
    document.getElementById('btnFecharModal')?.addEventListener('click', fecharModais);
    document.getElementById('overlay')?.addEventListener('click', fecharModais);
    document.getElementById('btnCopiarModal')?.addEventListener('click', copiarCodigoModal);
    document.getElementById('btnSalvarTemplates')?.addEventListener('click', salvarTemplatesNoCloud);
    document.getElementById('btnAdicionarEditor')?.addEventListener('click', adicionarEditor);
    document.getElementById('btnRegistrarVersao')?.addEventListener('click', moduloRegistroManual);
    document.getElementById('btnCopiarTerminal')?.addEventListener('click', window.copiarTerminal);
}

function exporFuncoesGlobais() {
    window.criarArquivos = async () => { 
        vFS_Global = criarArquivos(editores); 
        await salvarNoServidor(vFS_Global);
    };
    window.baixarZip = () => baixarZip(vFS_Global);
    window.sincronizarFirebase = () => sincronizarFirebase(editores, document.getElementById('tipoColecao')?.value || 'filme', document.getElementById('targetProject')?.value || 'todos', document.getElementById('fileName')?.value || '');
}

async function inicializar() {
    log("🔄 Inicializando AniGeek Robot v15.5...", "terminal");
    try {
        editores = await carregarConfiguracoes();
        inicializarEventos();
        exporFuncoesGlobais();
        renderExplorer();
        log("✅ AniGeek Robot v15.5 pronto!", "success");
    } catch (err) { log("❌ Erro crítico na inicialização: " + err.message, "error"); }
}

if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', inicializar); } else { inicializar(); }
