import React from "react"
import Box from "@mui/material/Box"
import { Icon } from "@iconify/react"
import IconButton from "@mui/material/IconButton"

type StampList = {
    emotion:string,
    setEmotion:React.Dispatch<string>
    setParameter:React.Dispatch<number>
}

export default function StampList(props:StampList) {
    const {emotion, setEmotion, setParameter} = props

    const handleClickStamp = (currentEmotion: string) => {
        setEmotion(currentEmotion)
        setParameter(50)
    }

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "20px",
                }}
            >
                <IconButton size={emotion=="普通"?"medium":"small"} onClick={() => handleClickStamp("普通")}>
                    <Icon icon="fa6-regular:face-meh" />
                </IconButton>
                <IconButton size={emotion=="悲しみ"?"medium":"small"} onClick={() => handleClickStamp("悲しみ")}>
                    <Icon icon="fa6-regular:face-sad-tear" />
                </IconButton>
                <IconButton size={emotion=="怒り"?"medium":"small"} onClick={() => handleClickStamp("怒り")}>
                    <Icon icon="fa6-regular:face-angry" />
                </IconButton>
                <IconButton size={emotion=="焦り"?"medium":"small"} onClick={() => handleClickStamp("焦り")}>
                    <Icon icon="fa6-regular:face-grin-beam-sweat" />
                </IconButton>
                <IconButton size={emotion=="絶望"?"medium":"small"} onClick={() => handleClickStamp("絶望")}>
                    <Icon icon="fa6-regular:face-rolling-eyes" />
                </IconButton>
                <IconButton size={emotion=="どや"?"medium":"small"} onClick={() => handleClickStamp("どや")}>
                    <Icon icon="fa6-regular:face-smile-wink" />
                </IconButton>
                <IconButton size={emotion=="喜び"?"medium":"small"} onClick={() => handleClickStamp("喜び")}>
                    <Icon icon="fa6-regular:face-laugh-squint" />
                </IconButton>
                <IconButton size={emotion=="お願い"?"medium":"small"} onClick={() => handleClickStamp("お願い")}>
                    <Icon icon="emojione-monotone:folded-hands" />
                </IconButton>
                <IconButton size={emotion=="握手"?"medium":"small"} onClick={() => handleClickStamp("握手")}>
                    <Icon icon="fa-regular:handshake" />
                </IconButton>
            </Box>
            <Box sx={{ textAlign: "center", marginBottom:"10px" }}>{emotion}</Box>
        </>
    )
}
