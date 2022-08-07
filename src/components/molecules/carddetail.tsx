import React from "react"
import router from "next/router"
import { comments } from "@/mock/mock"
import { Box } from "@mui/material"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import Avatar from "@mui/material/Avatar"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import CommentIcon from "@mui/icons-material/Comment"
import Slider from "@mui/material/Slider"

type CardContentProps = {
    value: {
        user_id: string
        name: string
        question_id: string
        question: string
        tag: string[]
        time: string
        emotion: string
        parameter: number
    }
    index: number
}

export default function CardDetail(props: CardContentProps) {
    const { value, index } = props
    const [bookMark, setBookMark] = React.useState(false)

    const countComments = (questionId: string) => {
        let count = 0
        comments.map((commentValue, index) => {
            if (questionId === commentValue.question_id) {
                count++
            }
        })
        return count
    }

    const handleClickAvatar = () => {
        router.push("/mypage")
    }

    return (
        <Card key={index} sx={{ position: "relative", width: "100%", maxWidth: "800px", mt: "10px" }}>
            <Box sx={{ display: "flex", position: "absolute", right: "0px" }}>
                {value.tag.map((v, i) => {
                    return (
                        <Box key={i} sx={{ marginRight: "10px", border: "1px solid blue" }}>
                            {v}
                        </Box>
                    )
                })}
            </Box>
            <Slider
                defaultValue={value.parameter}
                marks
                step={10}
                min={0}
                max={100}
                sx={{ width: "300px", position: "absolute", right: "60px", top: "30px" }}
                disabled
            />
            <Box sx={{ width: "30px", position: "absolute", right: "10px", top: "35px" }}>{value.parameter}</Box>
            <CardHeader
                avatar={<Avatar onClick={handleClickAvatar} sx={{ cursor: "pointer" }} />}
                title={value.name}
                subheader={value.time}
            />
            <CardContent>
                <Typography variant="body2">{value.question}</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "right" }}>
                <IconButton onClick={() => setBookMark(!bookMark)}>
                    {bookMark ? <BookmarkIcon sx={{ color: "blue" }} /> : <BookmarkBorderIcon sx={{ color: "blue" }} />}
                </IconButton>
                <IconButton sx={{ fontSize: "15px" }}>
                    <CommentIcon sx={{ color: "blue" }} />
                    {countComments(value.question_id)}
                </IconButton>
            </CardActions>
        </Card>
    )
}
