/**
 * modulos_secoes/modulos_analises/06-cliques-do-usuario/gerenciar-compartilhamento.js
 * Social: Funções para compartilhar conteúdo com integração ao Firebase.
 */

// Importamos a função de registro para atualizar o banco de dados
import { registrarCompartilhamento } from "../03-banco-de-dados/salvar-curtidas.js";

/**
 * Tenta usar o compartilhamento nativo do dispositivo; caso contrário, copia o link.
 * @param {string} titulo - O título da notícia.
 * @param {string} url - O link direto (deep link) da notícia.
 * @param {string} idNoticia - O ID único da notícia no Firebase.
 */
export function compartilharNoticia(titulo, url, idNoticia) {
  if (navigator.share) {
    navigator.share({
      title: titulo,
      url: url
    })
    .then(() => {
        // Sucesso no compartilhamento nativo
        if(idNoticia) registrarCompartilhamento(idNoticia);
    })
    .catch(err => console.error("Erro ao compartilhar:", err));
  } else {
    copiarLinkParaAreaDeTransferencia(url, idNoticia);
  }
}

/**
 * Copia uma URL para a área de transferência e exibe um feedback visual (toast).
 * @param {string} url - A URL a ser copiada.
 * @param {string} idNoticia - O ID único para registrar a ação no Firebase.
 */
export async function copiarLinkParaAreaDeTransferencia(url, idNoticia) {
  try {
    await navigator.clipboard.writeText(url);
    
    // 1. Registro no Firebase (Aumenta a popularidade da notícia)
    if(idNoticia) registrarCompartilhamento(idNoticia);

    // 2. Feedback visual (Toast)
    const toast = document.getElementById('toast-copiado');
    if (toast) {
      toast.classList.add('mostrar');
      // Adicionamos um texto dinâmico para parecer mais profissional
      toast.innerHTML = '<i class="fa-solid fa-check"></i> Link copiado para compartilhar!';
      
      setTimeout(() => {
        toast.classList.remove('mostrar');
      }, 2500);
    }
  } catch (err) {
    console.error("Erro ao copiar link:", err);
  }
}

// Vincula as funções ao escopo global
// Agora aceitando o terceiro parâmetro: idNoticia
window.shareNews = compartilharNoticia;
window.copiarLink = copiarLinkParaAreaDeTransferencia;
