/**
 * modulos_analises/03-banco-de-dados/buscar-noticias-ao-vivo.js
 * Radar: Escuta o banco de dados em tempo real e aciona a renderização.
 */
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { renderizarNoticias } from "../05-colocar-na-tela/injetar-noticias.js";

/**
 * Inicia a escuta em tempo real do Firestore.
 * @param {Object} db - Instância do Firebase.
 * @param {Function} callbackInterno - Função para atualizar o estado no Inicializador.
 * @param {Function} getExibidas - Função que retorna quantas notícias mostrar no momento.
 */
export function iniciarEscutaNoticias(db, callbackInterno, getExibidas) {
  const analisesRef = collection(db, "analises");

  console.log("📡 Radar: Conectando ao Firestore...");

  onSnapshot(analisesRef, (snapshot) => {
    // 1. Transforma os documentos em Array de objetos
    const noticias = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // 2. Ordena por data (mais recente primeiro)
    noticias.sort((a, b) => {
        const dataA = a.timestamp?.seconds || a.timestamp || 0;
        const dataB = b.timestamp?.seconds || b.timestamp || 0;
        return dataB - dataA;
    });

    console.log(`✅ Radar: ${noticias.length} notícias recebidas.`);

    // 3. Atualiza o estado global lá no "Chefe" (inicializador-do-site.js)
    callbackInterno(noticias);

    // 4. Manda o "Montador" colocar tudo na tela imediatamente
    // Aqui usamos o getExibidas() para saber se mostramos 5, 10, 15...
    renderizarNoticias(noticias, getExibidas());
  }, (error) => {
    console.error("❌ Erro no Radar Firebase:", error);
  });
}
