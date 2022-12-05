import React from "react"
import { Icon } from "@iconify/react"

export default function ReturnIcon(emotion: string) {
    switch (emotion) {
        case "シクシク":
            return <Icon color="white" icon="fa6-regular:face-sad-tear" />
        case "イライラ":
            return <Icon color="white" icon="fa6-regular:face-angry" />
        case "ハッピー":
            return <Icon color="white" icon="fa6-regular:face-laugh-squint" />
        case "びっくり":
            return <Icon color="white" icon="fa6-regular:face-flushed" />
        case "なぜ":
            return <Icon color="white" icon="fa6-regular:face-frown-open" />
        case "焦り":
            return <Icon color="white" icon="fa6-regular:face-grin-beam-sweat" />
        case "絶望":
            return <Icon color="white" icon="fa6-regular:face-dizzy" />
        case "どや":
            return <Icon color="white" icon="fa6-regular:face-smile-wink" />
        case "感謝":
            return <Icon color="white" icon="fa6-regular:face-grin-hearts" />
        case "ホッ":
            return <Icon color="white" icon="fa-regular:handshake" />
        case "お願い":
            return <Icon color="white" icon="la:praying-hands" />
        default:
            return <Icon color="white" icon="fa6-regular:face-meh" />
    }
}
