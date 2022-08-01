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
import Divider from "@mui/material/Divider"
import PersonIcon from "@mui/icons-material/Person"
import LogoutIcon from "@mui/icons-material/Logout"
import CachedIcon from "@mui/icons-material/Cached"

export default function Appbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenuClick = (url: string) =>{
    router.push(url)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: "30px" }}>
            EmoCha
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={router.reload}>
                <CachedIcon sx={{ marginRight: "20px" }}/>
                更新
              </MenuItem>
              <Divider />
              <MenuItem onClick={()=>handleMenuClick("/mypage")}>
                <PersonIcon sx={{ marginRight: "20px" }}/>
                マイページ
              </MenuItem>
              <Divider />
              <MenuItem onClick={()=>handleMenuClick("/")}>
                <LogoutIcon sx={{ marginRight: "20px" }}/>
                ログアウト
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
