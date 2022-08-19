import { Emotion } from "@/utils/types"

const EmotionCOLORS = {
    "普通":["#dddddd","black"],
    "悲しみ":["#2e60b4","white"],
    "イライラ":["#eb352c","white"],
    "焦り":["red","white"],
    "絶望":["gray","white"],
    "どや":["aqua","black"],
    "喜び":["#f4c900","black"],
    "お願い":["#F5B090","white"],
    "ホッ":["#5cb23a","white"]
}

export const ReturnEmotionColor = (emotion: Emotion):string =>{
    return EmotionCOLORS[emotion][0]
}

export const ReturnEmotionFontColor = (emotion: Emotion) =>{
    return EmotionCOLORS[emotion][1]
}
