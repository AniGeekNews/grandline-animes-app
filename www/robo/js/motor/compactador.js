/**
 * Módulo: Compactador ZIP
 */
import { log } from '../interface/registros.js';

export async function baixarZip(vFS) {
    if (typeof JSZip === 'undefined') { log("❌ JSZip não carregado.", "error"); return; }
    const zip = new JSZip();
    for (const edId in vFS) {
        const editorFolder = zip.folder(edId);
        for (const sub in vFS[edId].subfolders) {
            const subF = editorFolder.folder(sub);
            vFS[edId].subfolders[sub].forEach(f => subF.file(f.name, f.content));
        }
    }
    try {
        const content = await zip.generateAsync({ type: "blob" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(content);
        link.download = `AniGeek_Pack_v15.zip`;
        link.click();
        log("📦 ZIP gerado com sucesso!", "success");
    } catch (err) { log("❌ Erro ao gerar ZIP: " + err.message, "error"); }
}

window.baixarZip = () => log("⚠️ Sistema de arquivos ainda não inicializado.", "error");
