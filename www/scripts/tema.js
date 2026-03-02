/* scripts/tema.js */

// Seleção dos elementos de alternância de tema
const themeToggle = document.getElementById('mobileThemeToggle');

/**
 * Aplica o tema visual no Body e atualiza o estado do switch se ele existir
 */
function aplicarTema(modo) {
    if (modo === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggle) themeToggle.checked = true;
    } else {
        document.body.classList.remove('dark-mode');
        if (themeToggle) themeToggle.checked = false;
    }
}

/**
 * Alterna entre light e dark e salva no localStorage
 */
function alternarTema() {
    const modoAtual = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
    localStorage.setItem('pref-theme', modoAtual);
    aplicarTema(modoAtual);
    console.log(`Tema definido como: ${modoAtual}`);
}

/**
 * Inicializa a preferência do usuário
 */
function inicializarTema() {
    const temaSalvo = localStorage.getItem('pref-theme');
    
    // Se não houver tema salvo, verifica preferência do sistema, se desejar. 
    // Por enquanto, manteremos o padrão light caso não haja salvo.
    if (temaSalvo) {
        aplicarTema(temaSalvo);
    }

    // Adiciona o evento de clique apenas se o botão existir na página
    if (themeToggle) {
        themeToggle.addEventListener('change', alternarTema);
    }
}

// Lógica do botão de voltar ao topo (Global)
window.scrollToTop = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Executa a inicialização do tema
inicializarTema();
