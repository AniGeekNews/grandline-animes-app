/**
 * Módulo: Criptografia
 * Responsabilidade: Funções de hash e segurança
 */
export async function gerarHashSHA256(string) {
    const msgUint8 = new TextEncoder().encode(string);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}
