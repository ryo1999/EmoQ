import React from "react"
import { Icon } from "@iconify/react"

export default function ReturnIcon(emotion: string) {
    switch (emotion) {
        case "普通":
            return <Icon color="white" icon="fa6-regular:face-meh" />
        case "悲しみ":
            return <Icon color="white" icon="fa6-regular:face-sad-tear" />
        case "イライラ":
            return <Icon color="white" icon="fa6-regular:face-angry" />
        case "焦り":
            return <Icon color="white" icon="fa6-regular:face-grin-beam-sweat" />
        case "絶望":
            return <Icon color="white" icon="fa6-regular:face-rolling-eyes" />
        case "どや":
            return <Icon color="white" icon="fa6-regular:face-smile-wink" />
        case "喜び":
            return <Icon color="white" icon="fa6-regular:face-laugh-squint" />
        case "お願い":
            return <Icon color="white" icon="emojione-monotone:folded-hands" />
        case "ホッ":
            return <Icon color="white" icon="fa-regular:handshake" />
        default:
            return <Icon color="white" icon="fa6-regular:face-meh" />
    }
}
