const EmotionCOLORS: { [name: string]: string } = {
    "悲しみ":"#2e60b4",
    "イライラ":"#eb352c",
    "焦り":"red",
    "絶望":"gray",
    "どや":"blue",
    "喜び":"#f4c900",
    "お願い":"#F5B090",
    "ホッ":"#5cb23a"
}

export const ReturnEmotionColor = (emotion: string) =>{
    return EmotionCOLORS[emotion]
}
