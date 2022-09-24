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
import { useValidation } from "@/hooks/useValidation"
import { addGroup } from "@/pages/api/groupApi"
import { getUserInfo, registerUserGroup } from "@/pages/api/userApi"
import { auth } from "@/firebase"

type NewGroupDialogProps = {
    isOpenNewGroupDialog: boolean
    setIsOpenNewGroupDialog: React.Dispatch<boolean>
    setAvatarAnchorEl?: React.Dispatch<null | HTMLElement>
}

const NewGroupDialog = React.memo((props: NewGroupDialogProps) => {
    const router = useRouter()
    const { isOpenNewGroupDialog, setIsOpenNewGroupDialog, setAvatarAnchorEl } = props
    const [userState, setUserState] = useRecoilState(userInfo)
    const { valueText, setValueText, isValidated, errorMessage, textValidation } = useValidation()

    const handleClose = () => {
        setIsOpenNewGroupDialog(false)
    }

    const handleCreateGroup = () => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                toast.success("完了しました")
                setIsOpenNewGroupDialog(false)
                if (setAvatarAnchorEl) {
                    setAvatarAnchorEl(null)
                }
                const id = await addGroup(valueText)
                await registerUserGroup(userState.userId, id, valueText)
                const userInformation = await getUserInfo(userState.userId)
                if (userInformation) {
                    setUserState(userInformation)
                }
                router.push("/home")
            } else {
                toast.error("作成できませんでした")
            }
        })
    }

    return (
        <Dialog open={isOpenNewGroupDialog} onClose={handleClose}>
            <DialogTitle>新しくグループを作成</DialogTitle>
            <DialogContent sx={{ width: "500px" }}>
                <TextField
                    fullWidth
                    margin="normal"
                    error={!isValidated}
                    variant="outlined"
                    label="グループ名"
                    helperText={isValidated ? "" : errorMessage}
                    onChange={(e) => setValueText(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>キャンセル</Button>
                <Button disabled={!textValidation} onClick={handleCreateGroup}>
                    作成
                </Button>
            </DialogActions>
            <ToastContainer position="bottom-center" pauseOnHover={false} closeOnClick autoClose={2000} />
        </Dialog>
    )
})

export default NewGroupDialog
