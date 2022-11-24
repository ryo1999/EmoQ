import React from "react"
import { useRouter } from "next/router"
import "react-toastify/dist/ReactToastify.css"
import Box from "@mui/material/Box"
import MenuItem from "@mui/material/MenuItem"
import Typography from "@mui/material/Typography"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import Divider from "@mui/material/Divider"
import Badge from "@mui/material/Badge"
import MailIcon from "@mui/icons-material/Mail"
import { useRecoilState } from "recoil"
import { userInfo } from "@/store/userInfo"
import { changeGroup, getAllUserGroup, getMygroupsNotification } from "@/pages/api/userApi"
import { useGetWindowSize } from "@/hooks/useGetWindowSize"

type GroupListDialogProps = {
    isOpenGroupListDialog: boolean
    setIsOpenGroupListDialog: React.Dispatch<boolean>
    setAvatarAnchorEl: React.Dispatch<null | HTMLElement>
}

const GroupListDialog = React.memo((props: GroupListDialogProps) => {
    const router = useRouter()
    const { isOpenGroupListDialog, setIsOpenGroupListDialog, setAvatarAnchorEl } = props
    const [userState, setUserState] = useRecoilState(userInfo)
    const [groupList, setGroupList] = React.useState<{ [key: string]: string }>({})
    const [notification, setNotification] = React.useState<{ [key: string]: number }>({})
    const { height, width } = useGetWindowSize()

    React.useEffect(() => {
        getAllUserGroup(userState.userId).then((data) => {
            setGroupList(data)
        })
        getMygroupsNotification(userState.userId).then((data) => {
            setNotification(data)
        })
    }, [])

    const handleClickGroup = async (groupId: string, groupName: string) => {
        if (userState.groupId !== groupId) {
            setUserState({ ...userState, groupId: groupId, groupName: groupName })
            setIsOpenGroupListDialog(false)
            setAvatarAnchorEl(null)
            await changeGroup(userState.userId, groupId, groupName)
            router.push("/home")
        }
    }

    return (
        <Dialog open={isOpenGroupListDialog} onClose={() => setIsOpenGroupListDialog(false)}>
            <DialogTitle>グループの切り替え</DialogTitle>
            <DialogContent sx={{ width: "500px", maxHeight: height * 0.5 }}>
                {groupList &&
                    Object.keys(groupList).map((group) => (
                        <>
                            <Box>
                                <Box sx={{ display: "flex", justifyContent: "space-between",pt:"10px" }}>
                                    <Typography variant="body1" sx={{ mb: "10px" }}>
                                        グループID：{group}
                                    </Typography>
                                    <Badge badgeContent={notification[group]} color="info">
                                        <MailIcon />
                                    </Badge>
                                </Box>
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