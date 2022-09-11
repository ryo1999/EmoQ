import React from "react"
import { ReturnEmotionColor } from "@/utils/commonFunctions/returnEmotionColor"
import Box from "@mui/material/Box"
import { Icon } from "@iconify/react"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"

type StampList = {
    emotion: string
    setEmotion: React.Dispatch<string>
}

const EmotionIcon: { [name: string]: string } = {
    悲しみ: "fa6-regular:face-sad-tear",
    イライラ: "fa6-regular:face-angry",
    焦り: "fa6-regular:face-grin-beam-sweat",
    絶望: "fa6-regular:face-rolling-eyes",
    どや: "fa6-regular:face-smile-wink",
    ワクワク: "fa6-regular:face-laugh-squint",
    お願い: "emojione-monotone:folded-hands",
    ホッ: "fa-regular:handshake",
}

const StampList = React.memo((props: StampList) => {
    const { emotion, setEmotion } = props

    const handleClickStamp = (currentEmotion: string) => {
        setEmotion(currentEmotion)
    }

    return (
        <Box sx={{ mb: "50px" }}>
            <Box sx={{ mb: "10px" }}>
                {Object.keys(EmotionIcon).map((emo: string) => (
                    <IconButton
                        key={emo}
                        size="medium"
                        onClick={() => handleClickStamp(emo)}
                        sx={{
                            "&:hover": {
                                background: emotion == emo ? ReturnEmotionColor(emotion) : "",
                            },
                            bgcolor: emotion == emo ? ReturnEmotionColor(emotion) : "",
                            color: emotion == emo ? "white" : "",
                        }}
                    >
                        <Icon icon={EmotionIcon[emo]} />
                    </IconButton>
                ))}
            </Box>
            <Typography variant="h5">{emotion}</Typography>
        </Box>
    )
})

export default StampList
