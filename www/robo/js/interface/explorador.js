/**
 * Módulo: Explorador de Arquivos
 */
import { abrirModalCodigo } from './modais.js';

let vFS = {};

export function setVFS(sistemaArquivos) { vFS = sistemaArquivos; }

export function renderExplorer() {
    const explorer = document.getElementById('fileExplorer');
    if (!explorer) return;
    explorer.innerHTML = '';
    for (const edId in vFS) {
        explorer.innerHTML += `<div style="color:var(--orange); font-weight:bold; margin-top:10px;">📂 ${edId.toUpperCase()}</div>`;
        for (const sub in vFS[edId].subfolders) {
            vFS[edId].subfolders[sub].forEach((f, idx) => {
                explorer.innerHTML += `<div class="file-item" style="font-size:11px; padding:2px 0; border-bottom:1px solid #1e293b;">- ${f.name} <button onclick="window.verCodigo('${edId}','${sub}',${idx})" style="padding:2px 5px; font-size:9px;">👁️</button></div>`;
            });
        }
    }
}

export function verCodigo(edId, sub, idx) {
    if (!vFS[edId]?.subfolders?.[sub]?.[idx]) return;
    abrirModalCodigo(vFS[edId].subfolders[sub][idx].content, vFS[edId].subfolders[sub][idx].name);
}

window.renderExplorer = renderExplorer;
window.verCodigo = verCodigo;
export { vFS };
