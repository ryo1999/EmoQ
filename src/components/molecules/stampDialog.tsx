import React from "react"
import ReturnIcon from "@/components/atoms/returnIcon"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { Icon } from "@iconify/react"
import IconButton from "@mui/material/IconButton"

type StampDialogProps = {
    isOpenStampDialog: boolean
    setOpenStampDialog: React.Dispatch<boolean>
    setCurrentEmotion: React.Dispatch<JSX.Element>
}

export default function StampDialog(props: StampDialogProps) {
    const { isOpenStampDialog, setOpenStampDialog, setCurrentEmotion } = props
    const [selectEmotion, setSelectEmotion] = React.useState("普通")

    const handleStampClose = () => {
        setOpenStampDialog(false)
    }

    const handleClickStamp = (emotion: string) => {
        setSelectEmotion(emotion)
    }

    const handleEmotionSave = () => {
        //データベースに保存して
        const icon = ReturnIcon(selectEmotion)
        setCurrentEmotion(icon)
        setOpenStampDialog(false)
    }

    return (
        <Dialog open={isOpenStampDialog} onClose={handleStampClose}>
            <DialogTitle>この投稿の感情は？</DialogTitle>
            <DialogContent>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "20px",
                    }}
                >
                    <IconButton onClick={() => handleClickStamp("普通")}>
                        <Icon icon="fa6-regular:face-meh" />
                    </IconButton>
                    <IconButton onClick={() => handleClickStamp("悲しみ")}>
                        <Icon icon="fa6-regular:face-sad-tear" />
                    </IconButton>
                    <IconButton onClick={() => handleClickStamp("怒り")}>
                        <Icon icon="fa6-regular:face-angry" />
                    </IconButton>
                    <IconButton onClick={() => handleClickStamp("焦り")}>
                        <Icon icon="fa6-regular:face-grin-beam-sweat" />
                    </IconButton>
                    <IconButton onClick={() => handleClickStamp("絶望")}>
                        <Icon icon="fa6-regular:face-rolling-eyes" />
                    </IconButton>
                    <IconButton onClick={() => handleClickStamp("どや")}>
                        <Icon icon="fa6-regular:face-smile-wink" />
                    </IconButton>
                    <IconButton onClick={() => handleClickStamp("喜び")}>
                        <Icon icon="fa6-regular:face-laugh-squint" />
                    </IconButton>
                    <IconButton onClick={() => handleClickStamp("お願い")}>
                        <Icon icon="emojione-monotone:folded-hands" />
                    </IconButton>
                    <IconButton onClick={() => handleClickStamp("握手")}>
                        <Icon icon="fa-regular:handshake" />
                    </IconButton>
                </Box>
                <Box sx={{ textAlign: "center" }}>{selectEmotion}</Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleStampClose}>キャンセル</Button>
                <Button onClick={handleEmotionSave}>保存</Button>
            </DialogActions>
        </Dialog>
    )
}
