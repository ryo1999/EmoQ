import React from "react"
import router from "next/router"
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
import PersonIcon from "@mui/icons-material/Person"
import LogoutIcon from "@mui/icons-material/Logout"
import CachedIcon from "@mui/icons-material/Cached"
import MailIcon from "@mui/icons-material/Mail"

export default function Appbar() {
    const [avatarAnchorEl, setAvatarAnchorEl] = React.useState<null | HTMLElement>(null)
    const [mailAnchorEl, setMailAnchorEl] = React.useState<null | HTMLElement>(null)

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

    const handleMenuClick = (url: string) => {
        router.push(url)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: "30px" }}>
                        EmoCha
                    </Typography>
                    <div>
                        <IconButton onClick={handleClickMail} color="inherit">
                            <Badge badgeContent={4} color="success">
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
                            <Avatar sx={{ width: "30px", height: "30px", marginLeft: "10px" }} />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
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
                            <MenuItem onClick={router.reload}>
                                <CachedIcon sx={{ marginRight: "20px" }} />
                                更新
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={() => handleMenuClick("/mypage")}>
                                <PersonIcon sx={{ marginRight: "20px" }} />
                                マイページ
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={() => handleMenuClick("/")}>
                                <LogoutIcon sx={{ marginRight: "20px" }} />
                                ログアウト
                            </MenuItem>
                        </Menu>
                        <Menu
                            id="mail-appbar"
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
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
