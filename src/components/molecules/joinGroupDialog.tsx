import React from "react"
import { useRouter } from "next/router"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { useRecoilState } from "recoil"
import { userInfo } from "@/store/userInfo"
import { getGroupName } from "@/pages/api/groupApi"
import { createMygroups, getUserInfo, registerUserGroup } from "@/pages/api/userApi"
import { auth } from "@/firebase"

type JoinGroupDialogProps = {
    isOpenJoinGroupDialog: boolean
    setIsOpenJoinGroupDialog: React.Dispatch<boolean>
    setAvatarAnchorEl?: React.Dispatch<null | HTMLElement>
}

const JoinGroupDialog = React.memo((props: JoinGroupDialogProps) => {
    const router = useRouter()
    const { isOpenJoinGroupDialog, setIsOpenJoinGroupDialog, setAvatarAnchorEl } = props
    const [userState, setUserState] = useRecoilState(userInfo)
    const [groupId, setGroupId] = React.useState("")

    const handleClose = () => {
        setIsOpenJoinGroupDialog(false)
    }

    const handleJoinGroup = () => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const name = await getGroupName(groupId)
                if (name === false) {
                    setIsOpenJoinGroupDialog(false)
                    toast.error("グループが存在しません")
                } else {
                    setIsOpenJoinGroupDialog(false)
                    if (setAvatarAnchorEl) {
                        setAvatarAnchorEl(null)
                    }
                    toast.success("参加しました")
                    createMygroups(userState.userId, groupId, name)
                    await registerUserGroup(userState.userId, groupId, name)
                    const userInformation = await getUserInfo(userState.userId)
                    if (userInformation) {
                        setUserState(userInformation)
                    }
                    router.push("/home")
                }
            } else {
                setIsOpenJoinGroupDialog(false)
                toast.error("参加できませんでした")
            }
        })
    }

    return (
        <Dialog open={isOpenJoinGroupDialog} onClose={handleClose}>
            <DialogTitle>グループに参加</DialogTitle>
            <DialogContent sx={{ width: "500px" }}>
                <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    label="グループID"
                    onChange={(e) => setGroupId(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>キャンセル</Button>
                <Button disabled={groupId === ""} onClick={handleJoinGroup}>
                    参加
                </Button>
            </DialogActions>
            <ToastContainer position="bottom-center" pauseOnHover={false} closeOnClick autoClose={2000} />
        </Dialog>
    )
})

export default JoinGroupDialog
