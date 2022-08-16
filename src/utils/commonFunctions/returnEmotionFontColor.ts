import { Emotion } from "@/utils/types"

export const ReturnEmotionFontColor = (emotion: Emotion) =>{
    switch (emotion) {
        case "普通":
            return "black"
        case "悲しみ":
            return "white"
        case "イライラ":
            return "white"
        case "焦り":
            return "white"
        case "絶望":
            return "white"
        case "どや":
            return "white"
        case "喜び":
            return "white"
        case "お願い":
            return "white"
        case "ホッ":
            return "white"
        default:
            return "white"
    }
}
