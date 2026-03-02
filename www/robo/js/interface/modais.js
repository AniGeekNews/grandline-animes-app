/**
 * Módulo: Controle de Modais
 */
import { log } from './registros.js';

export function fecharModais() {
    document.querySelectorAll('#viewerModal, #overlay').forEach(e => e.style.display = 'none');
}

export function abrirModalCodigo(conteudo, nomeArquivo) {
    document.getElementById('modalTextarea').value = conteudo;
    document.getElementById('fileNameModal').textContent = nomeArquivo;
    document.getElementById('viewerModal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

export function copiarCodigoModal() {
    const textarea = document.getElementById('modalTextarea');
    if (!textarea) return;
    textarea.select();
    document.execCommand('copy');
    log("✅ Código copiado!", "success");
}

window.fecharModais = fecharModais;
window.copiarCodigo = copiarCodigoModal;
