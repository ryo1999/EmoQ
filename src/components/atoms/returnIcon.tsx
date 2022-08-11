import React from "react"
import { Icon } from "@iconify/react"

export default function ReturnIcon(props: string) {
    switch (props) {
        case "普通":
            return <Icon icon="fa6-regular:face-meh" />
        case "悲しみ":
            return <Icon icon="fa6-regular:face-sad-tear" />
        case "怒り":
            return <Icon icon="fa6-regular:face-angry" />
        case "焦り":
            return <Icon icon="fa6-regular:face-grin-beam-sweat" />
        case "絶望":
            return <Icon icon="fa6-regular:face-rolling-eyes" />
        case "どや":
            return <Icon icon="fa6-regular:face-smile-wink" />
        case "喜び":
            return <Icon icon="fa6-regular:face-laugh-squint" />
        case "お願い":
            return <Icon icon="emojione-monotone:folded-hands" />
        case "握手":
            return <Icon icon="fa-regular:handshake" />
        default:
            return <Icon icon="fa6-regular:face-meh" />
    }
}
