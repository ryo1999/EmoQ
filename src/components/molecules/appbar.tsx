import React from "react"
import { useRouter } from "next/router"
import GroupIdDialog from "../atoms/groupIdDialog"
import GroupListDialog from "./groupListDialog"
import NewGroupDialog from "./newGroupDialog"
import JoinGroupDialog from "./joinGroupDialog"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import MenuItem from "@mui/material/MenuItem"
import Menu from "@mui/material/Menu"
import Avatar from "@mui/material/Avatar"
import Badge from "@mui/material/Badge"
import Divider from "@mui/material/Divider"
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"
import PersonIcon from "@mui/icons-material/Person"
import LoginIcon from "@mui/icons-material/Login"
import LogoutIcon from "@mui/icons-material/Logout"
import GroupIcon from "@mui/icons-material/Group"
import GroupAddIcon from "@mui/icons-material/GroupAdd"
import MailIcon from "@mui/icons-material/Mail"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { selectedQuestion } from "@/store/selectedQuestion"
import { auth, signOut } from "@/firebase"
import { userInfo } from "@/store/userInfo"
import { useInitializeRecoilState } from "@/hooks/useInitializeRecoilState"
import { confirmNotification, deleteNotification, getNotification } from "@/pages/api/userApi"
import { getSelectQuestion } from "@/pages/api/questionApi"

export default function Appbar() {
    const router = useRouter()
    const userState = useRecoilValue(userInfo)
    const setSelectedQuestion = useSetRecoilState(selectedQuestion)
    const [isOpen, setOpen] = React.useState(false)
    const [isOpenGroupListDialog, setIsOpenGroupListDialog] = React.useState(false)
    const [isOpenNewGroupDialog, setIsOpenNewGroupDialog] = React.useState(false)
    const [isOpenJoinGroupDialog, setIsOpenJoinGroupDialog] = React.useState(false)
    const [avatarAnchorEl, setAvatarAnchorEl] = React.useState<null | HTMLElement>(null)
    const [mailAnchorEl, setMailAnchorEl] = React.useState<null | HTMLElement>(null)
    const [notificationNumber, setNotificationNumber] = React.useState(0)
    const [notification, setNotification] = React.useState<{ [key: string]: string }[]>([])
    const [otherNotification, setOtherNotification] = React.useState(true)
    const {
        resetUserState,
        resetUnSolvedQuestions,
        resetSolvedQuestions,
        resetSelectedQuestion,
        resetSelectedSort,
        resetSelectedFilter,
    } = useInitializeRecoilState()

    React.useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                getNotification(userState.userId, userState.groupId)
                    .then((data) => {
                        setNotificationNumber(data.length)
                        setNotification(data)
                    })
                    .catch((error) => console.error(error))
                confirmNotification(userState.userId).then((bool) => {
                    setOtherNotification(bool)
                })
            } else {
                router.push("/")
            }
        })
    }, [userState.groupId])

    const handleClickAvatar = (event: React.MouseEvent<HTMLElement>) => {
        setAvatarAnchorEl(event.currentTarget)
    }
    const handleClickMail = (event: React.MouseEvent<HTMLElement>) => {
        setMailAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAvatarAnchorEl(null)
        setMailAnchorEl(null)
    }

    const RESET = () => {
        resetUserState()
        resetUnSolvedQuestions()
        resetSolvedQuestions()
        resetSelectedQuestion()
        resetSelectedSort()
        resetSelectedFilter()
        localStorage.removeItem("recoil-persist")
    }

    const handleClickLogOut = async () => {
        await signOut(auth)
            .then(() => {
                toast.loading("ログアウト")
                RESET()
                router.push("/")
            })
            .catch(() => {
                toast.error("ログアウトできませんでした")
            })
    }

    const handleMenuClick = (url: string) => {
        handleClose()
        resetSelectedFilter()
        router.push(url)
    }

    const handleClickNotification = async (question_id: string) => {
        const questionInfo = await getSelectQuestion(question_id, userState.groupId)
        if (questionInfo) {
            setSelectedQuestion(questionInfo)
        }
        setMailAnchorEl(null)
        await deleteNotification(userState.userId, question_id, userState.groupId)
        await getNotification(userState.userId, userState.groupId)
            .then((data) => {
                setNotificationNumber(data.length)
                setNotification(data)
            })
            .catch((error) => console.error(error))
        router.push({
            pathname: "/comment/[qid]",
            query: { qid: question_id },
        })
    }

    return (
        <Box>
            <AppBar sx={{ bgcolor: "#24292f" }} position="fixed">
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex" }}>
                        <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
                            EmoQ：
                        </Typography>
                        <Typography variant="h6" component="div">
                            {userState.groupName}
                        </Typography>
                    </Box>
                    <div>
                        <IconButton onClick={handleClickMail} color="inherit">
                            <Badge badgeContent={notificationNumber} color="info">
                                <MailIcon sx={{ width: "30px", height: "30px" }} />
                            </Badge>
                        </IconButton>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleClickAvatar}
                            color="inherit"
                        >
                            <Badge overlap="circular" variant="dot" color="info" invisible={otherNotification}>
                                <Avatar
                                    sx={{
                                        bgcolor: "white",
                                        color: "black",
                                        width: "35px",
                                        height: "35px",
                                        ml: "10px",
                                    }}
                                >
                                    {userState.userName[0]}
                                </Avatar>
                            </Badge>
                        </IconButton>
                        <Menu
                            anchorEl={avatarAnchorEl}
                            anchorOrigin={{
                                vertical: "center",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(avatarAnchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem disabled>
                                <Avatar
                                    sx={{
                                        bgcolor: "white",
                                        color: "black",
                                        width: "25px",
                                        height: "25px",
                                        mr: "20px",
                                        fontSize: "15px",
                                        border: "1px solid black",
                                    }}
                                >
                                    {userState.userName[0]}
                                </Avatar>
                                {userState.userName}
                            </MenuItem>
                            <Divider />
                            {router.pathname !== "/mypage" && (
                                <>
                                    <MenuItem onClick={() => handleMenuClick("/mypage")}>
                                        <PersonIcon sx={{ mr: "20px" }} />
                                        マイページ
                                    </MenuItem>
                                    <Divider />
                                </>
                            )}
                            <MenuItem onClick={() => setOpen(true)}>
                                <GroupIcon sx={{ mr: "20px" }} />
                                グループID
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={() => setIsOpenGroupListDialog(true)}>
                                <ManageAccountsIcon sx={{ mr: "20px" }} />
                                グループ変更
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={() => setIsOpenNewGroupDialog(true)}>
                                <GroupAddIcon sx={{ mr: "20px" }} />
                                グループ作成
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={() => setIsOpenJoinGroupDialog(true)}>
                                <LoginIcon sx={{ mr: "20px" }} />
                                グループ参加
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={handleClickLogOut}>
                                <LogoutIcon sx={{ mr: "20px" }} />
                                ログアウト
                            </MenuItem>
                        </Menu>
                        <Menu
                            anchorEl={mailAnchorEl}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(mailAnchorEl)}
                            onClose={handleClose}
                        >
                            {notification.length == 0 ? (
                                <MenuItem>通知はありません</MenuItem>
                            ) : (
                                <>
                                    <MenuItem sx={{ pointerEvents: "none" }}>
                                        {notificationNumber}件の通知があります
                                    </MenuItem>
                                    {notification.map((question, index) =>
                                        Object.keys(question).map((qid) => (
                                            <>
                                                <Divider />
                                                <MenuItem
                                                    onClick={() => handleClickNotification(qid)}
                                                    value={qid}
                                                    key={qid}
                                                >
                                                    {notification[index][qid]}からコメントが来ています
                                                </MenuItem>
                                            </>
                                        ))
                                    )}
                                </>
                            )}
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <GroupIdDialog isOpen={isOpen} setOpen={setOpen} />
            {isOpenGroupListDialog && (
                <GroupListDialog
                    isOpenGroupListDialog={isOpenGroupListDialog}
                    setIsOpenGroupListDialog={setIsOpenGroupListDialog}
                    setAvatarAnchorEl={setAvatarAnchorEl}
                />
            )}
            {isOpenNewGroupDialog && (
                <NewGroupDialog
                    isOpenNewGroupDialog={isOpenNewGroupDialog}
                    setIsOpenNewGroupDialog={setIsOpenNewGroupDialog}
                    setAvatarAnchorEl={setAvatarAnchorEl}
                />
            )}
            {isOpenJoinGroupDialog && (
                <JoinGroupDialog
                    isOpenJoinGroupDialog={isOpenJoinGroupDialog}
                    setIsOpenJoinGroupDialog={setIsOpenJoinGroupDialog}
                    setAvatarAnchorEl={setAvatarAnchorEl}
                />
            )}
            <ToastContainer position="bottom-center" pauseOnHover={false} closeOnClick autoClose={2000} />
        </Box>
    )
}
