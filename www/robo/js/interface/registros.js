/**
 * Módulo: Sistema de Logs e Registros
 */
import { escapeHTML } from '../utilitarios/texto.js';

export function log(msg, type = '') {
    const el = document.getElementById('consoleLog');
    if (!el) return;
    const color = type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : type === 'terminal' ? '#10b981' : '#888';
    el.innerHTML += `<div style="color:${color}">${msg}</div>`;
    el.scrollTop = el.scrollHeight;
}

export async function copiarTerminal() {
    const el = document.getElementById("consoleLog");
    if (!el) return;
    try {
        await navigator.clipboard.writeText(el.innerText);
        log("✅ Terminal copiado para área de transferência.", "success");
    } catch (err) { log("❌ Falha ao copiar.", "error"); }
}

window.log = log;
window.copiarTerminal = copiarTerminal;
