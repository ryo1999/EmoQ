import React from "react"
import { format } from "date-fns"
import ReturnIcon from "../atoms/returnIcon"
import { ReturnEmotionColor } from "@/utils/commonFunctions/returnEmotionColor"
import { Box, CardActions, Menu, MenuItem, Tooltip } from "@mui/material"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import Avatar from "@mui/material/Avatar"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import DeleteIcon from "@mui/icons-material/Delete"
import { useRecoilValue } from "recoil"
import { userInfo } from "@/store/userInfo"
import { deleteComment, getComment } from "@/pages/api/commentApi"
import { deleteRepliedUserId } from "@/pages/api/questionApi"
import { CommentsCollectionData } from "@/utils/types"

type CardContentProps = {
    commentInfo: CommentsCollectionData
    replied_user_id: string[]
    setCommentList: React.Dispatch<CommentsCollectionData[]>
}

const CommentCard = React.memo((props: CardContentProps) => {
    const { commentInfo, replied_user_id, setCommentList } = props
    const userState = useRecoilValue(userInfo)
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
            await deleteComment(commentInfo.question_id, commentInfo.comment_id, userState.groupId)
            const C = await getComment(commentInfo.question_id, userState.groupId)
            setCommentList(C)
            deleteRepliedUserId(commentInfo.question_id, userState.userId, replied_user_id, userState.groupId)
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
            <CardContent sx={{ ml: "55px", maxWidth: "500px" }}>
                <Typography variant="body2">{commentInfo.comment}</Typography>
            </CardContent>
            <CardActions sx={{justifyContent:"end"}}>
                {commentInfo.commenter_id === userState.userId && (
                    <IconButton sx={{mt:"-30px"}} onClick={handleClickMenu} >
                        <MoreHorizIcon />
                    </IconButton>
                )}
                <Menu
                    anchorEl={menuAnchorEl}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                    open={Boolean(menuAnchorEl)}
                    onClose={handleCloseMenu}
                >
                    <MenuItem onClick={handleClickDelete}>
                        <DeleteIcon sx={{ mr: "20px" }} />
                        削除
                    </MenuItem>
                </Menu>
            </CardActions>
        </Card>
    )
})

export default CommentCard
