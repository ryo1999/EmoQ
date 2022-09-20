import React from "react"
import DialogTitle from "@mui/material/DialogTitle"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import Typography from "@mui/material/Typography"
import { useRecoilValue } from "recoil"
import { userInfo } from "@/store/userInfo"

type GroupIdDialogProps = {
    open:boolean,
    setOpen:React.Dispatch<boolean>
}

export default function GroupIdDialog(props:GroupIdDialogProps) {
    const { setOpen, open } = props
    const userState = useRecoilValue(userInfo)

    return (
        <Dialog onClose={()=>setOpen(false)} open={open}>
            <DialogContent>
            <Typography variant="h5">グループID ： {userState.groupId}</Typography>
            </DialogContent>
        </Dialog>
    )
}
