
/**
 * modulos_secoes/modulos_analises/06-cliques-do-usuario/gerenciar-videos.js
 * Cinema: Gerencia a troca de vídeos nos players e notificações de confirmação.
 */

// Variáveis de estado para rastrear o alvo da troca
let playerAlvo = '';
let urlAlvo = '';

/**
 * Abre a notificação perguntando se o usuário deseja trocar o vídeo atual.
 * @param {string} idPlayer - O ID do iframe do player.
 * @param {string} idVideo - O ID do vídeo do YouTube.
 * @param {string} titulo - O título do novo vídeo.
 * @param {string} cor - A cor tema da notícia para o estilo da notificação.
 */
export function pedirTrocaDeVideo(idPlayer, idVideo, titulo, cor) {
  playerAlvo = idPlayer;
  // Monta a URL com autoplay para uma experiência fluida
  urlAlvo = `https://www.youtube.com/embed/${idVideo}?autoplay=1`;

  const notif = document.getElementById('notificacao-video');
  const notifTitulo = document.getElementById('notif-titulo');

  if (notif && notifTitulo) {
    notifTitulo.innerText = titulo;
    notif.style.setProperty('--notif-cor', cor);
    notif.classList.add('visivel');
  }
}

/**
 * Esconde a notificação de troca de vídeo.
 */
export function fecharNotificacaoVideo() {
  const notif = document.getElementById('notificacao-video');
  if (notif) {
    notif.classList.remove('visivel');
  }
}

/**
 * Inicializa o botão de confirmação da troca de vídeo.
 */
export function configurarConfirmacaoVideo() {
  const btnConfirmar = document.getElementById('btn-confirmar');
  if (btnConfirmar) {
    btnConfirmar.onclick = () => {
      const player = document.getElementById(playerAlvo);
      if (player) {
        player.src = urlAlvo;
      }
      fecharNotificacaoVideo();
    };
  }
}

// Vincula as funções ao escopo global para compatibilidade com o HTML gerado
window.pedirTroca = pedirTrocaDeVideo;
window.fecharNotif = fecharNotificacaoVideo;
