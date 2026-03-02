// modulos_secoes/modulos_analises/03-banco-de-dados/salvar-curtidas.js
import { doc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "../01-conexao-com-servidor/configuracao-firebase.js";

/**
 * Configuração inicial
 */
export function configurarCurtidas() {
  console.log("📊 Sistema de Engajamento (Likes & Shares) Ativo.");
}

/**
 * LÓGICA DE CURTIDAS (LIKE)
 * Atualiza o Firebase e dá feedback visual imediato.
 */
export async function curtirNoticia(idNoticia) {
  try {
    const spanCurtidas = document.querySelector(`#artigo-${idNoticia} .num-like`);
    if (spanCurtidas) {
      let atual = parseInt(spanCurtidas.innerText) || 0;
      spanCurtidas.innerText = atual + 1;
      
      // Efeito visual de "pulso" no clique
      spanCurtidas.parentElement.style.transform = "scale(1.2)";
      setTimeout(() => spanCurtidas.parentElement.style.transform = "scale(1)", 200);
    }

    const noticiaRef = doc(db, "analises", idNoticia);
    await updateDoc(noticiaRef, { curtidas: increment(1) });

  } catch (err) {
    console.error("Erro ao salvar curtida:", err);
  }
}

/**
 * LÓGICA DE COMPARTILHAMENTO (NOVO)
 * Registra no Firebase quantas vezes o link foi copiado/compartilhado.
 */
export async function registrarCompartilhamento(idNoticia) {
    try {
        console.log(`🔗 Registrando compartilhamento para: ${idNoticia}`);
        
        // 1. Atualização Visual no Contador de Shares (se existir no card)
        const spanShares = document.querySelector(`#artigo-${idNoticia} .num-share`);
        if (spanShares) {
            let atual = parseInt(spanShares.innerText) || 0;
            spanShares.innerText = atual + 1;
        }

        // 2. Banco de Dados: Incrementa o campo 'shares'
        const noticiaRef = doc(db, "analises", idNoticia);
        await updateDoc(noticiaRef, { 
            shares: increment(1),
            popularidade: increment(5) // Compartilhar vale mais pontos que curtir
        });

        // 3. Verifica se a notícia virou "Trending" (Tendência)
        verificarTendencia(idNoticia);

    } catch (err) {
        console.error("Erro ao registrar compartilhamento:", err);
    }
}

/**
 * LÓGICA VISUAL: Selo de Tendência
 * Se a notícia ultrapassar um certo nível de interação, ela ganha um estilo especial.
 */
function verificarTendencia(idNoticia) {
    const card = document.getElementById(`artigo-${idNoticia}`);
    if (!card) return;

    const likes = parseInt(card.querySelector('.num-like')?.innerText) || 0;
    const shares = parseInt(card.querySelector('.num-share')?.innerText) || 0;

    // Se a soma de interações for alta, adicionamos a classe 'trending-flash'
    if ((likes + (shares * 2)) > 50) {
        card.classList.add('trending-now');
        if(!card.querySelector('.badge-fire')) {
            const fire = document.createElement('span');
            fire.className = 'badge-fire';
            fire.innerHTML = '<i class="fa-solid fa-fire"></i> EM ALTA';
            card.appendChild(fire);
        }
    }
}

// Expõe para o window para que os botões de clique no HTML (onclick) funcionem
window.curtirNoticia = curtirNoticia;
window.registrarCompartilhamento = registrarCompartilhamento;
