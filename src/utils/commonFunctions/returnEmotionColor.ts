import { Emotion } from "@/utils/types"

const EmotionCOLORS = {
    "悲しみ":["#2e60b4","black"],
    "イライラ":["#eb352c","black"],
    "焦り":["red","black"],
    "絶望":["gray","black"],
    "どや":["aqua","black"],
    "喜び":["#f4c900","black"],
    "お願い":["#F5B090","black"],
    "ホッ":["#5cb23a","black"]
}

export const ReturnEmotionColor = (emotion: Emotion):string =>{
    return EmotionCOLORS[emotion][0]
}

export const ReturnEmotionFontColor = (emotion: Emotion) =>{
    return EmotionCOLORS[emotion][1]
}
