import React from "react"
import Box from "@mui/material/Box"
import { Icon } from "@iconify/react"
import IconButton from "@mui/material/IconButton"

type StampList = {
    emotion: string
    setEmotion: React.Dispatch<string>
    setParameter: React.Dispatch<number>
}

const EmotionIcon:{[name:string]:string} = {
    "悲しみ": "fa6-regular:face-sad-tear",
    "イライラ": "fa6-regular:face-angry",
    "焦り": "fa6-regular:face-grin-beam-sweat",
    "絶望": "fa6-regular:face-rolling-eyes",
    "どや": "fa6-regular:face-smile-wink",
    "喜び": "fa6-regular:face-laugh-squint",
    "お願い": "emojione-monotone:folded-hands",
    "ホッ": "fa-regular:handshake",
}

const StampList = React.memo((props: StampList) => {
    const { emotion, setEmotion, setParameter } = props

    const handleClickStamp = (currentEmotion: string) => {
        setEmotion(currentEmotion)
        setParameter(0)
    }

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                {Object.keys(EmotionIcon).map((emo: string) => 
                    <IconButton key={emo} size={emotion == emo ? "medium" : "small"} onClick={() => handleClickStamp(emo)}>
                        <Icon icon={EmotionIcon[emo]} />
                    </IconButton>
                )}
            </Box>
            <Box sx={{ textAlign: "center", marginBottom: "30px" }}>{emotion}</Box>
        </>
    )
})

export default StampList
