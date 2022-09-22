import React from "react"
import { useRouter } from "next/router"
import GroupIdDialog from "../atoms/groupIdDialog"
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
// import Badge from "@mui/material/Badge"
import Divider from "@mui/material/Divider"
import PersonIcon from "@mui/icons-material/Person"
import LogoutIcon from "@mui/icons-material/Logout"
import GroupIcon from "@mui/icons-material/Group"
// import MailIcon from "@mui/icons-material/Mail"
import { useRecoilValue } from "recoil"
import { auth, signOut } from "@/firebase"
import { userInfo } from "@/store/userInfo"
import { useInitializeRecoilState } from "@/hooks/useInitializeRecoilState"

export default function Appbar() {
    const router = useRouter()
    const userState = useRecoilValue(userInfo)
    const [isOpen, setOpen] = React.useState(false)
    const [avatarAnchorEl, setAvatarAnchorEl] = React.useState<null | HTMLElement>(null)
    const {
        resetUserState,
        resetUnSolvedQuestions,
        resetSolvedQuestions,
        resetSelectedQuestion,
        resetSelectedSort,
        resetSelectedFilter,
    } = useInitializeRecoilState()
    // const [mailAnchorEl, setMailAnchorEl] = React.useState<null | HTMLElement>(null)

    const handleClickAvatar = (event: React.MouseEvent<HTMLElement>) => {
        setAvatarAnchorEl(event.currentTarget)
    }
    // const handleClickMail = (event: React.MouseEvent<HTMLElement>) => {
    //     setMailAnchorEl(event.currentTarget)
    // }

    const handleClose = () => {
        setAvatarAnchorEl(null)
        // setMailAnchorEl(null)
    }

    const RESET = () => {
        resetUserState()
        resetUnSolvedQuestions()
        resetSolvedQuestions()
        resetSelectedQuestion()
        resetSelectedSort()
        resetSelectedFilter()
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
                        {/* <IconButton onClick={handleClickMail} color="inherit">
                            <Badge badgeContent={4} color="success">
                                <MailIcon sx={{ width: "30px", height: "30px" }} />
                            </Badge>
                        </IconButton> */}
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleClickAvatar}
                            color="inherit"
                        >
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
                            {router.pathname === "/mypage" ? (
                                <MenuItem onClick={()=>setOpen(true)}>
                                    <GroupIcon sx={{ mr: "20px" }} />
                                    グループID
                                </MenuItem>
                            ) : (
                                <MenuItem onClick={() => handleMenuClick("/mypage")}>
                                    <PersonIcon sx={{ mr: "20px" }} />
                                    マイページ
                                </MenuItem>
                            )}
                            <Divider />
                            <MenuItem onClick={handleClickLogOut}>
                                <LogoutIcon sx={{ mr: "20px" }} />
                                ログアウト
                            </MenuItem>
                        </Menu>
                        {/* <Menu
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
                            <MenuItem onClick={router.reload}>〜件の通知があります</MenuItem>
                        </Menu> */}
                    </div>
                </Toolbar>
            </AppBar>
            <GroupIdDialog isOpen={isOpen} setOpen={setOpen}/>
            <ToastContainer position="bottom-center" pauseOnHover={false} closeOnClick autoClose={2000} />
        </Box>
    )
}
