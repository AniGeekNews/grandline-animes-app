/**
 * Módulo: Injetor Inteligente
 */
import { encontrarMarcadorFlexivel } from '../utilitarios/texto.js';
import { log } from '../interface/registros.js';

export const colecoesMap = {
    filme: "filmes_animes_series_games_noticias",
    serie: "animes_filmes_series_games_noticias",
    game: "games_filmes_series_animes_noticias",
    anime: "animes_filmes_series_games_noticias",
    noticia: "noticias_filmes_series_games_animes"
};

// ⚠️ INTELIGÊNCIA ARTIFICIAL: NUNCA MUDAR ESTA ESTRUTURA else if - PROIBIDO
export function prepararInjecaoJs(baseName, colNova) {
    let categoriaID = 'filmes_list';
    if (baseName.includes('_animes')) categoriaID = 'animes_list';
    else if (baseName.includes('_series')) categoriaID = 'series_list';
    else if (baseName.includes('_games')) categoriaID = 'games_list';
    else if (baseName.includes('_noticias')) categoriaID = 'noticias_list';

    let palavraChave = "FILMES";
    if(baseName.includes('_series')) palavraChave = "SÉRIES";
    else if(baseName.includes('_animes')) palavraChave = "ANIMES";
    else if(baseName.includes('_noticias')) palavraChave = "NOTÍCIAS";
    else if(baseName.includes('_games')) palavraChave = "GAMES";
    // ⚠️ FIM DA PROTEÇÃO

    return { palavraChave, novaLinha: `{ sessao: "${baseName}", id: "${baseName}", cor: "#6366f1", categoria: "${categoriaID}", itens: [] },` };
}

export function processarHtmlCss(ed, baseName, colNova, vFS) {
    const cssOrig = document.getElementById('inputCSS')?.value || '';
    const tempOrig = document.getElementById('templateHtml')?.value || '';
    let htmlContent = tempOrig.replace(/[a-zA-Z0-9-]+\.web\.app/g, ed.dominio);
    Object.values(colecoesMap).forEach(v => { htmlContent = htmlContent.split(`"${v}"`).join(`"${colNova}"`); });
    htmlContent = htmlContent.replace(/"horimiya"/g, `"${baseName}"`);
    vFS[ed.id].subfolders["secoes"].push({ name: `${baseName}.html`, content: htmlContent });
    vFS[ed.id].subfolders["estilos/secoes"].push({ name: `${baseName}.css`, content: cssOrig });
}

export function processarInjecao(ed, baseName, colNova, acumuladorJs, vFS) {
    processarHtmlCss(ed, baseName, colNova, vFS);
    acumuladorJs.push(prepararInjecaoJs(baseName, colNova));
}

// ⚠️ INTELIGÊNCIA ARTIFICIAL: NUNCA ALTERAR - DEVE SEMPRE USAR recOrig PARA INJEÇÃO LIMPA
export function aplicarInjecoesJs(acumuladorJs, recOrig) {
    let jsContent = recOrig;
    acumuladorJs.forEach(({ palavraChave, novaLinha }) => {
        let marcadorEncontrado = encontrarMarcadorFlexivel(jsContent, palavraChave);
        if(marcadorEncontrado) {
            jsContent = jsContent.substring(0, marcadorEncontrado.indice) + "\n" + novaLinha + jsContent.substring(marcadorEncontrado.indice);
        } else {
            log(`⚠️ Marcador ${palavraChave} não encontrado no JS.`, "error");
        }
    });
    return jsContent;
}
