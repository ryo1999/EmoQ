const EmotionCOLORS: { [name: string]: string } = {
    シクシク: "#3961AE",
    イライラ: "#D94638",
    ハッピー: "#EEC936",
    びっくり: "#049FD9",
    なぜ: "#1A0D4E",
    焦り: "#C77628",
    絶望: "#999999",
    どや: "#9CB6F7",
    感謝: "#DDC3B6",
    ホッ: "#73AF4C",
}

export const ReturnEmotionColor = (emotion: string) => {
    return EmotionCOLORS[emotion]
}
