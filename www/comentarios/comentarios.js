
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body {
                  background-color: white; /* Ensure the iframe has a white background */
                }

                
              </style>
                        </head>
                        <body>
                            <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comentários Multi-Coleção</title>
    <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
    <script type="module">
        import { getFirestore, collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

        // Pegamos a instância do banco (O app já foi inicializado no analises.html)
        const db = getFirestore();

        const estilosComentarios = `
        <style>
            .comments-trigger-bar { background: rgba(241, 243, 245, 0.8); border: 1px solid #e9ecef; border-radius: 16px; padding: 14px 20px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: all 0.3s ease; margin: 10px 0; }
            .comments-trigger-bar:hover { background: #fff; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.05); border-color: var(--tema-cor, #e63946); }
            .avatars-stack { display: flex; margin-right: 12px; }
            .av-s { width: 26px; height: 26px; border-radius: 50%; border: 2px solid #fff; margin-left: -10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .modal-geek-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(8px); z-index: 99999; display: none; justify-content: center; align-items: flex-end; }
            .modal-geek-overlay.active { display: flex; }
            .modal-geek-content { background: #fff; width: 100%; max-width: 650px; height: 85vh; border-radius: 24px 24px 0 0; display: flex; flex-direction: column; box-shadow: 0 -10px 40px rgba(0,0,0,0.3); animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
            @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
            .modal-geek-header { padding: 20px 24px; border-bottom: 1px solid #f1f3f5; display: flex; justify-content: space-between; align-items: center; }
            .header-main-title { font-weight: 800; font-size: 18px; color: #1a1a1a; display: flex; align-items: center; gap: 12px; }
            .btn-geek-close { background: #f8f9fa; border: none; width: 36px; height: 36px; border-radius: 50%; font-size: 20px; cursor: pointer; }
            .modal-geek-body { flex: 1; overflow-y: auto; padding: 24px; }
            .modal-geek-footer { padding: 20px 24px; border-top: 1px solid #f1f3f5; background: #fff; }
            .input-wrapper-geek { display: flex; align-items: center; background: #f1f3f5; padding: 12px 18px; border-radius: 30px; gap: 12px; border: 1.5px solid transparent; }
            .input-wrapper-geek:focus-within { background: #fff; border-color: var(--tema-cor, #e63946); }
            .input-wrapper-geek input { flex: 1; background: transparent; border: none; outline: none; font-size: 15px; }
            .btn-send-geek { background: none; border: none; color: var(--tema-cor, #e63946); cursor: pointer; font-size: 18px; }
            
            .comment-card { display: flex; gap: 12px; margin-bottom: 20px; animation: fadeIn 0.3s ease; }
            @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            .user-avatar { width: 35px; height: 35px; border-radius: 50%; background: #ddd; display: flex; align-items: center; justify-content: center; font-weight: bold; color: white; flex-shrink: 0; }
            .comment-content { background: #f8f9fa; padding: 12px 16px; border-radius: 18px; border-top-left-radius: 2px; flex: 1; }
            .user-name { font-weight: 700; font-size: 13px; margin-bottom: 4px; display: block; }
            .user-text { font-size: 14px; color: #444; line-height: 1.4; }
            .collection-label { font-size: 12px; color: #666; background: #f1f3f5; padding: 2px 6px; border-radius: 4px; margin-top: 4px; display: inline-block; }
        </style>
        `;

        const htmlBase = `
            ${estilosComentarios}
            <div class="comments-trigger-bar">
                <div class="trigger-left" style="display: flex; align-items: center;">
                    <div class="avatars-stack">
                        <div class="av-s" style="background:#ff4757"></div>
                        <div class="av-s" style="background:#2f3542"></div>
                        <div class="av-s" style="background:#747d8c"></div>
                    </div>
                    <span style="font-weight: 600; color: #495057; font-size: 14px;">Discussão da comunidade...</span>
                </div>
                <i class="fa-solid fa-chevron-right" style="color: #adb5bd;"></i>
            </div>

            <div class="modal-geek-overlay">
                <div class="modal-geek-content">
                    <div class="modal-geek-header">
                        <div class="header-main-title">
                            <i class="fa-solid fa-comments"></i>
                            <span>Comunidade <small class="txt-contagem">0 comentários</small></span>
                        </div>
                        <button class="btn-geek-close">×</button>
                    </div>
                    <div class="modal-geek-body">
                        <div class="lista-comentarios-fluxo"></div>
                    </div>
                    <div class="modal-geek-footer">
                        <div class="input-wrapper-geek">
                            <div class="mini-my-avatar" style="background: #e63946;">EU</div>
                            <input type="text" placeholder="Escreva um comentário..." class="input-comentario-real">
                            <button class="btn-send-geek"><i class="fa-solid fa-paper-plane"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Lista de todas as coleções que devem ser verificadas
        const colecoesParaVerificar = [
            "analisemercado", "analises", "atores", "cine_bast", "cine_bilh", "cine_lanc", "cine_news", "cine_prem", "cine_rev", "cinema",
            "com_dest", "com_enq", "com_fan", "com_op", "com_teo", "comparativos", "comunidade_ent", "cosp_com", "cosp_dest", "cosp_ent",
            "cosp_event", "cosp_fotos", "cosp_guias", "cosplay", "criadores", "critica", "datas", "destaques", "devs", "editorpick",
            "entrevistas", "esp_agd", "esp_ana", "esp_camp", "esp_jog", "esp_res", "esp_times", "esports", "eventos", "evt_cal", "evt_camp",
            "evt_conv", "evt_feiras", "evt_lanc", "evt_live", "exclusivos", "explicacoes", "fut_analise", "fut_estat", "fut_inter", "fut_mercado",
            "fut_nacional", "fut_news", "fut_opiniao", "futebol", "impacto", "influencers", "lanc_animes", "lanc_filmes", "lanc_jogos", "lanc_mangas",
            "lanc_series", "lanc_tech", "lancamentos", "maislidas", "manchetes", "noticias", "opiniao", "pod_back", "pod_ent", "pod_games", "pod_geek",
            "pod_pop", "pod_recentes", "pod_tech", "podcast", "podcasts", "pro_industria", "rank_animes", "rank_ano", "rank_filmes", "rank_jogos",
            "rank_series", "rank_voto", "ranking", "rev_animes", "rev_eventos", "rev_filmes", "rev_geek", "rev_jogos", "rev_series", "rev_stream",
            "rev_tech", "reviews", "rumores", "smartphones", "sobre_nos", "st_apple", "st_crunchy", "st_disney", "st_hbo", "st_netflix", "st_prime",
            "st_semana", "st_star", "streaming", "tech_ai", "tech_gamestech", "tech_hard", "tech_inov", "tech_sec", "tech_soft", "tech_start", "tecnologia",
            "teorias", "tr_animes", "tr_filmes", "tr_gameplay", "tr_jogos", "tr_oficiais", "tr_series", "tr_teasers", "trailers", "trending", "tv",
            "tv_bast", "tv_eps", "tv_lanc", "tv_news", "tv_renov", "tv_rev", "ultimas", "urgente"
        ];

        function inicializarComentarios() {
            const containers = document.querySelectorAll('.container-comentarios-dinamico');

            containers.forEach(container => {
                // ESSENCIAL: Evita duplicar a interface se a função for chamada múltiplas vezes
                if (container.getAttribute('data-loaded') === 'true') return;

                const noticiaId = container.getAttribute('data-noticia-id');
                if (!noticiaId) return;

                container.innerHTML = htmlBase;
                container.setAttribute('data-loaded', 'true');

                const modal = container.querySelector('.modal-geek-overlay');
                const listaFluxo = container.querySelector('.lista-comentarios-fluxo');
                const input = container.querySelector('.input-comentario-real');
                const btnSend = container.querySelector('.btn-send-geek');

                container.querySelector('.comments-trigger-bar').onclick = (e) => {
                    e.preventDefault();
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                };

                container.querySelector('.btn-geek-close').onclick = () => {
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                };

                // Array para armazenar todos os comentários de todas as coleções
                let todosComentarios = [];
                let snapshotsAtivos = 0;
                let totalSnapshots = colecoesParaVerificar.length;

                // Função para atualizar a exibição dos comentários
                const atualizarExibicao = () => {
                    // Ordenar todos os comentários por data
                    const comentariosOrdenados = todosComentarios.sort((a, b) => 
                        a.data?.toDate?.() - b.data?.toDate?.() || 0
                    );

                    container.querySelector('.txt-contagem').innerText = `${comentariosOrdenados.length} comentários`;
                    
                    listaFluxo.innerHTML = comentariosOrdenados.map(c => {
                        return `
                            <div class="comment-card">
                                <div class="user-avatar" style="background: #555">G</div>
                                <div class="comment-content">
                                    <strong class="user-name">Geek Anonimo</strong>
                                    <p class="user-text">${c.texto || ""}</p>
                                    <span class="collection-label">${c.collectionName}</span>
                                </div>
                            </div>
                        `;
                    }).join('') || '<p style="text-align:center; color:#999; margin-top:20px;">Ninguém comentou ainda.</p>';
                    
                    const body = container.querySelector('.modal-geek-body');
                    body.scrollTop = body.scrollHeight;
                };

                // Limpar comentários anteriores
                todosComentarios = [];

                // Criar listeners para cada coleção
                colecoesParaVerificar.forEach(collectionName => {
                    const path = `${collectionName}/${noticiaId}/comentarios`;
                    const q = query(collection(db, path), orderBy("data", "asc"));
                    
                    const unsubscribe = onSnapshot(q, (snapshot) => {
                        // Remover comentários antigos desta coleção
                        todosComentarios = todosComentarios.filter(c => c.collectionName !== collectionName);
                        
                        // Adicionar novos comentários desta coleção
                        snapshot.docs.forEach(doc => {
                            const c = doc.data();
                            todosComentarios.push({
                                ...c,
                                collectionName: collectionName
                            });
                        });
                        
                        atualizarExibicao();
                    }, (error) => {
                        console.warn(`Erro ao buscar comentários em ${collectionName}:`, error);
                        // Mesmo com erro, tentamos continuar com outras coleções
                        atualizarExibicao();
                    });
                    
                    // Armazenar unsubscribe para limpeza quando o modal fechar
                    if (!container.unsubscribes) {
                        container.unsubscribes = [];
                    }
                    container.unsubscribes.push(unsubscribe);
                });

                // Função para enviar comentário (usa a primeira coleção como padrão, ou você pode implementar lógica para escolher)
                const enviarComentario = async () => {
                    const texto = input.value.trim();
                    if (!texto) return;

                    input.value = "";
                    try {
                        // Enviar para a coleção "analises" por padrão (ou você pode modificar esta lógica)
                        const path = `analises/${noticiaId}/comentarios`;
                        await addDoc(collection(db, path), {
                            texto: texto,
                            data: serverTimestamp(),
                            usuario: "Geek User" 
                        });
                    } catch (e) { 
                        console.error("Erro ao enviar:", e); 
                    }
                };

                btnSend.onclick = enviarComentario;
                input.onkeypress = (e) => { if(e.key === 'Enter') enviarComentario(); };
                
                // Cleanup quando o modal fechar
                container.querySelector('.btn-geek-close').onclick = () => {
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    // Cleanup dos listeners
                    if (container.unsubscribes) {
                        container.unsubscribes.forEach(unsub => unsub());
                        container.unsubscribes = [];
                    }
                };
            });
        }

        // Expõe para o window para que o navegacao.js possa reativar
        window.inicializarComentarios = inicializarComentarios;

        // Execução inicial
        document.addEventListener('DOMContentLoaded', () => {
            // Aqui você precisaria inicializar o Firebase App antes
            // Mas como isso já está feito no seu analises.html, assumimos que está pronto
            if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
                inicializarComentarios();
            }
        });
    </script>
</head>
<body>
    <!-- Exemplo de container para testes -->
    <div class="container-comentarios-dinamico" data-noticia-id="exemplo-123"></div>
</body>
</html>



              <script>
                              // Single comments collection structure
comments/
  {commentId}
    - parentId: "noticia-123"
    - parentCollection: "analises" 
    - texto: "..."
    - data: timestamp


              </script>
                        </body>
                        </html>
                    
