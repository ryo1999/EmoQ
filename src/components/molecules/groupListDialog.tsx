import React from "react"
import { useRouter } from "next/router"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Box from "@mui/material/Box"
import MenuItem from "@mui/material/MenuItem"
import Typography from "@mui/material/Typography"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import Divider from "@mui/material/Divider"
import { useRecoilState } from "recoil"
import { userInfo } from "@/store/userInfo"
import { changeGroup, getAllUserGroup } from "@/pages/api/userApi"

type GroupListDialogProps = {
    isOpenGroupListDialog: boolean
    setIsOpenGroupListDialog: React.Dispatch<boolean>
}

const GroupListDialog = React.memo((props: GroupListDialogProps) => {
    const router = useRouter()
    const { isOpenGroupListDialog, setIsOpenGroupListDialog } = props
    const [userState, setUserState] = useRecoilState(userInfo)
    const [groupList, setGroupList] = React.useState<{ [key: string]: string }>({})

    React.useEffect(() => {
        getAllUserGroup(userState.userId).then((data) => {
            setGroupList(data)
        })
    }, [])

    const handleClickGroup = async (groupId: string, groupName: string) => {
        if (userState.groupId !== groupId) {
            setUserState({ ...userState, groupId: groupId, groupName: groupName })
            setIsOpenGroupListDialog(false)
            await changeGroup(userState.userId, groupId, groupName)
            router.push("/home")
        }
    }

    return (
        <Dialog open={isOpenGroupListDialog} onClose={() => setIsOpenGroupListDialog(false)}>
            <DialogTitle>グループの切り替え</DialogTitle>
            <DialogContent sx={{ width: "500px" }}>
                {groupList &&
                    Object.keys(groupList).map((group) => (
                        <>
                            <Box>
                                <Typography variant="body1" sx={{ mb: "10px" }}>
                                    グループID：{group}
                                </Typography>
                                <MenuItem
                                    disabled={userState.groupId === group}
                                    onClick={() => handleClickGroup(group, groupList[group])}
                                    value={group}
                                    key={group}
                                    sx={{ fontSize: "25px" }}
                                >
                                    {groupList[group]}
                                </MenuItem>
                            </Box>
                            <Divider />
                        </>
                    ))}
            </DialogContent>
        </Dialog>
    )
})

export default GroupListDialog
