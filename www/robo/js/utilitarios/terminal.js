/**
 * Módulo: Terminal de Comandos
 */
import { db } from '../configuracao/firebase.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { log } from '../interface/registros.js';
import { escapeHTML } from './texto.js';

export function executarTerminal() {
    const input = document.getElementById('termCmd');
    if (!input) return;
    const raw = input.value.trim();
    if(!raw) return;
    const parts = raw.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    log(`> ${raw}`, "terminal");
    input.value = '';
    if(cmd === 'comparar-versoes') {
        if(args.length < 2) return log("❌ Uso: comparar-versoes [v1] [v2]", "error");
        compararVersoes(args[0], args[1]);
    } else if(cmd === 'clear') { 
        const consoleLog = document.getElementById('consoleLog');
        if(consoleLog) consoleLog.innerHTML = ''; 
    } else { log(`❌ Comando desconhecido: ${cmd}`, "error"); }
}

export async function compararVersoes(v1, v2) {
    log(`🔍 Analisando diff entre ${v1} e ${v2}...`, "terminal");
    try {
        const s1 = await getDoc(doc(db, "robo_versoes", v1));
        const s2 = await getDoc(doc(db, "robo_versoes", v2));
        if(!s1.exists() || !s2.exists()) return log("❌ Versão não localizada no banco.", "error");
        const lines1 = s1.data().codigoCompleto.split('\n');
        const lines2 = s2.data().codigoCompleto.split('\n');
        const max = Math.max(lines1.length, lines2.length);
        log(`--- RESULTADO DO DIFF ---`, "terminal");
        for (let i = 0; i < max; i++) {
            const antiga = lines1[i] ?? "";
            const nova = lines2[i] ?? "";
            if (antiga !== nova) {
                if (!antiga && nova) log(`<div class="diff-add"><strong>[L${i+1}] +</strong><br>${escapeHTML(nova)}</div>`);
                else if (antiga && !nova) log(`<div class="diff-rem"><strong>[L${i+1}] -</strong><br>${escapeHTML(antiga)}</div>`);
                else log(`<div class="diff-mod"><strong>[L${i+1}] ~</strong><br><span style="color:#ef4444">- ${escapeHTML(antiga)}</span><br><span style="color:#22c55e">+ ${escapeHTML(nova)}</span></div>`);
            }
        }
    } catch(e) { log("❌ Erro de comparação: " + e.message, "error"); }
}

window.executarTerminal = executarTerminal;
window.compararVersoes = compararVersoes;
