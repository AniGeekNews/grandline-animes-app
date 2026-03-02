// modulos_secoes/modulos_analises/03-banco-de-dados/contar-visualizacoes.js
import { doc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "../01-conexao-com-servidor/configuracao-firebase.js";

/**
 * Injeta os estilos necessários para os botões e selos diretamente no documento.
 * Isso garante que o visual funcione mesmo sem um arquivo CSS externo.
 */
const injetarEstilosDinamicos = () => {
  if (document.getElementById('estilo-engajamento-js')) return;

  const style = document.createElement('style');
  style.id = 'estilo-engajamento-js';
  style.innerHTML = `
    .premium-actions-bar {
        display: flex; gap: 10px; padding: 12px 0;
        border-top: 1px solid rgba(0,0,0,0.05); margin-top: 15px;
    }
    .btn-premium-icon {
        background: #f1f3f5; border: none; padding: 6px 12px;
        border-radius: 8px; font-size: 12px; font-weight: 700;
        color: #555; cursor: pointer; display: flex; align-items: center; gap: 6px;
        transition: all 0.2s ease;
    }
    .btn-premium-icon:hover { background: var(--tema-cor, #e63946); color: #fff; }
    
    .badge-fire {
        position: absolute; top: 10px; right: 10px;
        background: linear-gradient(45deg, #ff4b2b, #ff416c);
        color: white; padding: 4px 10px; border-radius: 4px;
        font-size: 10px; font-weight: 900; z-index: 5;
        box-shadow: 0 4px 10px rgba(255,0,0,0.3);
        animation: pulse 1.5s infinite;
    }
    @keyframes pulse { 
      0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } 
    }
  `;
  document.head.appendChild(style);
};

// Executa a injeção de estilos ao carregar o módulo
injetarEstilosDinamicos();

/**
 * Registra uma visualização e atualiza o número na tela imediatamente.
 */
export async function incrementarVisualizacao(idNoticia) {
  if (!idNoticia) return;

  try {
    // 1. Atualização Visual Otimista (Soma +1 no contador que o usuário vê)
    const spanView = document.querySelector(`#artigo-${idNoticia} .num-view`);
    if (spanView) {
      let atual = parseInt(spanView.innerText) || 0;
      spanView.innerText = atual + 1;
    }

    // 2. Banco de Dados
    const noticiaRef = doc(db, "analises", idNoticia);
    await updateDoc(noticiaRef, { 
      visualizacoes: increment(1) 
    });

    console.log(`👁️ Visualização registrada para: ${idNoticia}`);
  } catch (err) {
    console.error("Erro ao incrementar visualização:", err);
  }
}

// Expõe para o escopo global
window.incrementarVisualizacao = incrementarVisualizacao;
