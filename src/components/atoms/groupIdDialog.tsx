import React from "react"
import DialogTitle from "@mui/material/DialogTitle"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import Typography from "@mui/material/Typography"
import { useRecoilValue } from "recoil"
import { userInfo } from "@/store/userInfo"

type GroupIdDialogProps = {
    isOpen:boolean,
    setOpen:React.Dispatch<boolean>
}

export default function GroupIdDialog(props:GroupIdDialogProps) {
    const { setOpen, isOpen } = props
    const userState = useRecoilValue(userInfo)

    return (
        <Dialog onClose={()=>setOpen(false)} open={isOpen}>
            <DialogContent>
            <Typography variant="h5">グループID ： {userState.groupId}</Typography>
            <Typography variant="caption">*このIDをコピーして友達に共有してください</Typography>
            </DialogContent>
        </Dialog>
    )
}