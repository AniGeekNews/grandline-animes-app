/**
 * Módulo: Gerador de Arquivos em Lote
 */
import { colecoesMap, processarInjecao, aplicarInjecoesJs } from './injetor.js';
import { renderExplorer, setVFS } from '../interface/explorador.js';
import { log } from '../interface/registros.js';

export async function salvarNoServidor(vFS) {
    log("📡 Enviando lote para o servidor Node...", "terminal");
    try {
        const response = await fetch('/api/salvar-arquivos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ vFS })
        });
        const result = await response.json();
        if(result.success) {
            log("✅ Arquivos gravados fisicamente no Termux!", "success");
        }
    } catch (err) {
        log("❌ Erro de conexão com Node: " + err.message, "error");
    }
}

export function criarArquivos(editores) {
    const idsRaw = document.getElementById("fileName")?.value.split(',') || [];
    const vFS = {};
    let acumuladorJsPorEditor = {};
    
    editores.forEach(ed => {
        vFS[ed.id] = { subfolders: { "secoes": [], "estilos/secoes": [], "scripts": [] } };
        acumuladorJsPorEditor[ed.id] = [];
    });

    const colNova = colecoesMap[document.getElementById('tipoColecao')?.value || 'filme'];
    const target = document.getElementById("targetProject")?.value || "todos";

    idsRaw.forEach(idBruto => {
        let baseName = idBruto.trim().replace(/\.html$/i, '');
        if(!baseName) return;
        const projetosAlvo = target === "todos" ? editores.map(e => e.id) : [target];
        projetosAlvo.forEach(pId => {
            const ed = editores.find(e => e.id === pId);
            if(!ed) return;
            processarInjecao(ed, baseName, colNova, acumuladorJsPorEditor[pId], vFS);
        });
    });

    for(const edId in acumuladorJsPorEditor) {
        const ed = editores.find(e => e.id === edId);
        if (!ed) continue;
        const recOrig = document.getElementById('inputRecomendacao')?.value || '';
        const jsContent = aplicarInjecoesJs(acumuladorJsPorEditor[edId], recOrig);
        vFS[edId].subfolders["scripts"].push({ name: `recomendacao-secao.js`, content: jsContent });
    }

    // Atualiza o sistema de arquivos visual antes de retornar
    setVFS(vFS);
    renderExplorer();
    
    log("🚀 Lote processado com inteligência v14+v15!", "success");
    return vFS;
}

window.criarArquivos = () => log("⚠️ Gerador ainda não inicializado.", "error");
