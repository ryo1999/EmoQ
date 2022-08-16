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
