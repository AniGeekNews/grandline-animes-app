/**
 * Módulo: Sincronizador Firestore
 */
import { db } from '../configuracao/firebase.js';
import { doc, setDoc, getDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { log } from '../interface/registros.js';
import { gerarHashSHA256 } from '../utilitarios/criptografia.js';
import { colecoesMap } from './injetor.js';

export async function carregarConfiguracoes() {
    try {
        const snap = await getDocs(collection(db, "robo", "config", "editores"));
        const editores = [];
        const select = document.getElementById("targetProject");
        const listaAdm = document.getElementById("listaEditoresAdm");
        if (select) select.innerHTML = '<option value="todos">Todos os Projetos</option>';
        if (listaAdm) listaAdm.innerHTML = '<strong>Ativos:</strong> ';
        snap.forEach(d => {
            const data = d.data();
            editores.push({ id: d.id, dominio: data.dominio, caminhoBase: data.caminhoBase });
            if (select) select.innerHTML += `<option value="${d.id}">${d.id.toUpperCase()}</option>`;
            if (listaAdm) listaAdm.innerHTML += `${d.id} | `;
        });
        const tHtml = await getDoc(doc(db, "robo", "templates", "html", "padrao"));
        const tCss = await getDoc(doc(db, "robo", "templates", "css", "padrao"));
        const tJs = await getDoc(doc(db, "robo", "templates", "js", "padrao"));
        if(tHtml.exists() && document.getElementById("templateHtml")) document.getElementById("templateHtml").value = tHtml.data().conteudo;
        if(tCss.exists() && document.getElementById("inputCSS")) document.getElementById("inputCSS").value = tCss.data().conteudo;
        if(tJs.exists() && document.getElementById("inputRecomendacao")) document.getElementById("inputRecomendacao").value = tJs.data().conteudo;
        log("✅ Sincronização Cloud concluída.", "success");
        return editores;
    } catch (err) { log("❌ Erro ao carregar configurações: " + err.message, "error"); return []; }
}

export async function salvarTemplatesNoCloud() {
    try {
        await setDoc(doc(db, "robo", "templates", "html", "padrao"), { conteudo: document.getElementById("templateHtml")?.value || '' });
        await setDoc(doc(db, "robo", "templates", "css", "padrao"), { conteudo: document.getElementById("inputCSS")?.value || '' });
        await setDoc(doc(db, "robo", "templates", "js", "padrao"), { conteudo: document.getElementById("inputRecomendacao")?.value || '' });
        log("Templates Cloud atualizados!", "success");
    } catch (err) { log("❌ Erro ao salvar templates: " + err.message, "error"); }
}

export async function adicionarEditor() {
    const id = document.getElementById("admId")?.value.toLowerCase().trim();
    const dom = document.getElementById("admDom")?.value.trim();
    if(!id || !dom) return alert("Preencha ID e Domínio!");
    try {
        await setDoc(doc(db, "robo", "config", "editores", id), { dominio: dom, caminhoBase: document.getElementById("admPath")?.value.trim() || '', ativo: true });
        log(`✅ Editor ${id} adicionado!`, "success");
        await carregarConfiguracoes();
    } catch (err) { log("❌ Erro ao adicionar editor: " + err.message, "error"); }
}

export async function sincronizarFirebase(editores, tipoColecao, target, idsRaw) {
    const colPrincipal = colecoesMap[tipoColecao];
    if (!colPrincipal) { log("❌ Tipo de coleção inválido.", "error"); return; }
    const projetosAlvo = target === "todos" ? editores : editores.filter(e => e.id === target);
    const ids = idsRaw.split(',').map(id => id.trim().replace(/\.html$/i, '')).filter(Boolean);
    for (let baseId of ids) {
        for (let ed of projetosAlvo) {
            try {
                await setDoc(doc(db, `${ed.id}.web.app`, colPrincipal, baseId, "--init--"), { criado: new Date().toISOString() });
                log(`✅ Sync: ${ed.id} > ${baseId}`, "success");
            } catch (err) { log(`❌ Sync falhou: ${err.message}`, "error"); }
        }
    }
    alert("Firestore Sync Finalizado.");
}

export async function moduloRegistroManual() {
    const inputNome = document.getElementById('regVersao');
    const nomeVersao = inputNome?.value.trim().replace(/[\/\s\.]/g, '-');
    if(!nomeVersao) return alert("Erro: O nome da versão é obrigatório!");
    log("🛰️ Capturando código fonte local...", "terminal");
    try {
        const htmlCompleto = document.documentElement.outerHTML;
        const hash = await gerarHashSHA256(htmlCompleto);
        const vRef = doc(db, "robo_versoes", nomeVersao);
        if((await getDoc(vRef)).exists()) return log(`⚠️ Versão ${nomeVersao} já registrada.`, "error");
        await setDoc(vRef, { versao: nomeVersao, data: new Date().toISOString(), codigoCompleto: htmlCompleto, hash, changelog: document.getElementById('regChangelog')?.value.trim() || "Sem descrição.", autor: document.getElementById('regAutor')?.value.trim() || "Admin", tipoRegistro: "manual" });
        log(`✔ Versão ${nomeVersao} salva com sucesso!`, "success");
        if(inputNome) inputNome.value = '';
        if(document.getElementById('regChangelog')) document.getElementById('regChangelog').value = '';
    } catch(e) { log("❌ Erro no Firestore: " + e.message, "error"); }
}

window.salvarTemplatesNoCloud = salvarTemplatesNoCloud;
window.adicionarEditor = adicionarEditor;
window.sincronizarFirebase = () => log("⚠️ Sincronizador ainda não inicializado.", "error");
window.moduloRegistroManual = moduloRegistroManual;
