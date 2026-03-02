#!/data/data/com.termux/files/usr/bin/bash

BACKUP_DIR=".backups_historico"
INDEX_FILE="$BACKUP_DIR/index.txt"
MAX_BACKUPS=10
mkdir -p "$BACKUP_DIR"
touch "$INDEX_FILE"

save_checkpoint() {
    echo -n "📝 Dê um nome para esta versão (ex: ajuste_layout): "
    read NOME
    if [ -z "$NOME" ]; then NOME="sem_nome"; fi

    # Gera ID único de 4 caracteres e timestamp
    ID=$(head /dev/urandom | tr -dc 'a-f0-9' | head -c 4)
    FILE_TAG=$(date +"%Y%m%d_%H%M%S")
    AGORA=$(date +"%d/%m/%Y %H:%M:%S")
    BACKUP_NAME="bkp_${FILE_TAG}_${ID}.tar.gz"
    
    # Salva o arquivo
    tar -czf "$BACKUP_DIR/$BACKUP_NAME" --exclude=".backups_historico" --exclude="node_modules" . 2>/dev/null
    
    # Registra no índice (ID | DATA | NOME | ARQUIVO)
    echo "$ID | $AGORA | $NOME | $BACKUP_NAME" >> "$INDEX_FILE"
    
    # Mantém apenas os últimos 10 no índice e na pasta
    tail -n $MAX_BACKUPS "$INDEX_FILE" > "$INDEX_FILE.tmp" && mv "$INDEX_FILE.tmp" "$INDEX_FILE"
    
    echo "------------------------------------------"
    echo "✅ CHECKPOINT [$ID] CRIADO!"
    echo "🏷️  Nome: $NOME"
    echo "📅 Data: $AGORA"
    echo "------------------------------------------"
}

list_and_restore() {
    echo "--- 🕒 LINHA DO TEMPO (Histórico) ---"
    if [ ! -s "$INDEX_FILE" ]; then
        echo "❌ Nenhum backup encontrado."
        return
    fi

    # Lê o índice invertido para mostrar os mais novos primeiro
    IFS=$'\n' read -d '' -r -a linhas < <(tac "$INDEX_FILE")
    
    for i in "${!linhas[@]}"; do
        echo "[$i] ${linhas[$i]}"
    done
    
    echo "------------------------------------------"
    echo -n "👉 Digite o NÚMERO da versão para restaurar (ou 'q' para sair): "
    read opcao

    if [[ "$opcao" =~ ^[0-9]+$ ]] && [ "$opcao" -lt "${#linhas[@]}" ]; then
        ESCOLHIDA="${linhas[$opcao]}"
        # Extrai o nome do arquivo (última coluna)
        FILE_TO_RESTORE=$(echo "$ESCOLHIDA" | awk -F ' | ' '{print $NF}')
        
        echo "⚠️  Restaurando versão: $(echo "$ESCOLHIDA" | awk -F ' | ' '{print $3}')"
        
        find . -maxdepth 1 ! -name "$BACKUP_DIR" ! -name "." ! -name "backup_manager.sh" -exec rm -rf {} +
        tar -xzf "$BACKUP_DIR/$FILE_TO_RESTORE"
        echo "✅ Restaurado com sucesso!"
    else
        echo "❌ Operação cancelada."
    fi
}

case "$1" in
    save) save_checkpoint ;;
    undo) list_and_restore ;;
    *) echo "Uso: ./backup_manager.sh [save|undo]" ;;
esac
