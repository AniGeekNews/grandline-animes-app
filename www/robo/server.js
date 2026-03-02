import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJETO_RAIZ = path.resolve(__dirname, '../../');
const OUTPUT_DIR = path.join(__dirname, 'output');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static('.'));

app.post('/api/salvar-arquivos', async (req, res) => {
    const { vFS } = req.body;
    console.log("\n==========================================");
    console.log("📥 PROCESSANDO TRANSFERÊNCIA AUTOMÁTICA");
    console.log("==========================================");

    try {
        for (const editorId in vFS) {
            for (const subfolder in vFS[editorId].subfolders) {
                let pastaProducao = "";
                if (subfolder === "secoes") pastaProducao = "secoes";
                else if (subfolder === "estilos/secoes") pastaProducao = path.join("estilos", "secoes");
                else if (subfolder === "scripts") pastaProducao = "scripts";
                else pastaProducao = subfolder; // Aceita outras pastas dinamicamente

                const realPath = path.join(PROJETO_RAIZ, editorId, pastaProducao);

                for (const file of vFS[editorId].subfolders[subfolder]) {
                    const destinoFinal = path.join(realPath, file.name);
                    const backupPath = path.join(OUTPUT_DIR, editorId, subfolder, file.name);

                    // 1. Grava Backup de Segurança
                    await fs.ensureDir(path.dirname(backupPath));
                    await fs.writeFile(backupPath, file.content);

                    // 2. Grava na Produção (Site Real)
                    await fs.ensureDir(realPath);
                    await fs.writeFile(destinoFinal, file.content);
                    
                    console.log(`✅ ATUALIZADO: ${editorId} -> ${file.name}`);
                }
            }
        }
        res.json({ success: true, message: "Tudo salvo automaticamente!" });
        console.log("\n✨ Sincronização concluída com sucesso!");
    } catch (err) {
        console.error("🚨 ERRO CRÍTICO:", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`\n🤖 MODO AUTOMÁTICO ATIVADO`);
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📍 Raiz: ${PROJETO_RAIZ}`);
});

