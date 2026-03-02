import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/**
 * Configurações de acesso ao Firebase.
 */
const firebaseConfig = {
  apiKey: "AIzaSyBC_ad4X9OwCHKvcG_pNQkKEl76Zw2tu6o",
  authDomain: "anigeeknews.firebaseapp.com",
  projectId: "anigeeknews",
  storageBucket: "anigeeknews.firebasestorage.app",
  messagingSenderId: "769322939926",
  appId: "1:769322939926:web:6eb91a96a3f74670882737",
  measurementId: "G-G5T8CCRGZT"
};

// 1. Inicializa o Firebase (Protegido contra múltiplas inicializações)
let app;
try {
    app = initializeApp(firebaseConfig);
    console.log("🔥 Firebase: Conectado com sucesso.");
} catch (error) {
    console.error("🔥 Firebase: Erro na inicialização:", error);
}

// 2. Exporta o Firestore
export const db = getFirestore(app);
