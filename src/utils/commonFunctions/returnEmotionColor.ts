import { Emotion } from "@/utils/types"

const EmotionCOLORS = {
    "悲しみ":"#2e60b4",
    "イライラ":"#eb352c",
    "焦り":"red",
    "絶望":"gray",
    "どや":"aqua",
    "喜び":"#f4c900",
    "お願い":"#F5B090",
    "ホッ":"#5cb23a"
}

export const ReturnEmotionColor = (emotion: Emotion):string =>{
    return EmotionCOLORS[emotion]
}
