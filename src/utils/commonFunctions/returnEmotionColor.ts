import { Emotion } from "@/utils/types"

export const ReturnEmotionColor = (emotion: Emotion) =>{
    switch (emotion) {
        case "普通":
            return "#dddddd"
        case "悲しみ":
            return "#2e60b4"
        case "イライラ":
            return "#eb352c"
        case "焦り":
            return "red"
        case "絶望":
            return "gray"
        case "どや":
            return "aqua"
        case "喜び":
            return "#f4c900"
        case "お願い":
            return "#F5B090"
        case "ホッ":
            return "#5cb23a"
        default:
            return "gray"
    }
}

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
            return "black"
        case "お願い":
            return "white"
        case "ホッ":
            return "white"
        default:
            return "white"
    }
}
