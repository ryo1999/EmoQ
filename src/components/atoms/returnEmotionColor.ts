export const ReturnEmotionColor = (emotion: string) =>{
    switch (emotion) {
        case "普通":
            return "gray"
        case "悲しみ":
            return "#2e60b4"
        case "イライラ":
            return "#eb352c"
        case "焦り":
            return "gray"
        case "絶望":
            return "black"
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
