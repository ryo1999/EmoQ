import React from "react"
import { format } from "date-fns"
import ReturnIcon from "../atoms/returnIcon"
import { ReturnEmotionColor } from "@/utils/commonFunctions/returnEmotionColor"
import { Box, Menu, MenuItem, Tooltip } from "@mui/material"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import Avatar from "@mui/material/Avatar"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import DeleteIcon from "@mui/icons-material/Delete"
import { useRecoilValue } from "recoil"
import { useSetRecoilState } from "recoil"
import { userInfo } from "@/store/userInfo"
import { selectedComment } from "@/store/selectedComment"
import { deleteComment, getComment } from "@/pages/api/commentApi"
import { CommentsCollectionData } from "@/utils/types"

type CardContentProps = {
    commentInfo: CommentsCollectionData
}

const CommentCard = React.memo((props: CardContentProps) => {
    const { commentInfo } = props
    const userState = useRecoilValue(userInfo)
    const setCommentList = useSetRecoilState(selectedComment)
    const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null)

    const today = format(new Date(), "MM/dd HH:mm")
    const dateString = commentInfo.time.toLocaleString()
    const dateToDate = Date.parse(dateString)
    const date = format(dateToDate, "MM/dd HH:mm")
    const dateTime = format(dateToDate, "HH:mm")

    const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchorEl(event.currentTarget)
    }
    const handleCloseMenu = () => {
        setMenuAnchorEl(null)
    }
    const handleClickDelete = async () => {
        setMenuAnchorEl(null)
        try {
            await deleteComment(commentInfo.question_id, commentInfo.comment_id)
            const C = await getComment(commentInfo.question_id)
            setCommentList(C)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Card
            sx={{
                width: "100%",
                mb: "10px",
                borderRadius: "10px",
            }}
        >
            <Box sx={{ textAlign: "right", mr: "10px" }}>
                {commentInfo.commenter_id === userState.userId ? (
                    <IconButton onClick={handleClickMenu} sx={{ mt: "5px" }}>
                        <MoreHorizIcon />
                    </IconButton>
                ) : (
                    <div style={{height:"20px"}}></div>
                )}
                <Menu
                    id="menu-appbar"
                    anchorEl={menuAnchorEl}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    open={Boolean(menuAnchorEl)}
                    onClose={handleCloseMenu}
                >
                    <MenuItem onClick={handleClickDelete}>
                        <DeleteIcon sx={{ mr: "20px" }} />
                        削除
                    </MenuItem>
                </Menu>
            </Box>
            <CardHeader
                avatar={
                    <Avatar sx={{ border: "solid 1px #24292f", bgcolor: "white", color: "black" }}>
                        {commentInfo.commenter_name[0]}
                    </Avatar>
                }
                title={commentInfo.commenter_name}
                subheader={
                    <Typography variant="caption">
                        {today.slice(3, 5) === date.slice(3, 5) ? `今日：${dateTime}` : date}
                    </Typography>
                }
                action={
                    <Tooltip title={commentInfo.emotion} placement="bottom">
                        <IconButton
                            disableRipple
                            sx={{
                                bgcolor: ReturnEmotionColor(commentInfo.emotion),
                                mr: "10px",
                                mt: "3px",
                                color: "white",
                            }}
                        >
                            {ReturnIcon(commentInfo.emotion)}
                        </IconButton>
                    </Tooltip>
                }
            />
            <CardContent sx={{ ml: "55px", maxWidth: "460px" }}>
                <Typography variant="body2">{commentInfo.comment}</Typography>
            </CardContent>
        </Card>
    )
})

export default CommentCard
