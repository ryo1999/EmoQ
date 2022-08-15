import React from "react"
import router from "next/router"
import ReturnIcon from "../atoms/returnIcon"
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
import Chip from "@mui/material/Chip"

type CardContentProps = {
    value: {
        contributor_id: string,
        contributor_name: string,
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

    const handleClickAvatar = () => {
        router.push("/mypage")
    }

    return (
        <Card
            key={index}
            sx={{ width: "100%", mt: "10px", borderRadius: "10px" }}
        >
            <Box sx={{ display: "flex", marginLeft: "5px" }}>
                {value.tag.map((v, i) => (
                    <Chip key={i} label={v} sx={{ marginTop: "10px", marginRight: "5px", bgcolor: "aqua" }} />
                ))}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "right", alignItems: "center" }}>
                {(value.emotion == "怒り" || value.emotion == "焦り" || value.emotion == "絶望") && (
                    <>
                        <Slider
                            defaultValue={value.parameter}
                            marks
                            step={10}
                            min={0}
                            max={100}
                            sx={{ width: "200px", marginRight: "30px" }}
                            disabled
                        />
                        <Box
                            sx={{
                                width: "30px",
                                marginRight: "20px",
                                borderBottom: "solid 1px",
                            }}
                        >
                            {value.parameter}
                        </Box>
                    </>
                )}
                <IconButton disabled sx={{ marginRight: "10px", marginTop: "3px" }}>
                    {ReturnIcon(value.emotion)}
                </IconButton>
            </Box>
            <CardHeader
                avatar={<Avatar onClick={handleClickAvatar} sx={{ cursor: "pointer" }} />}
                title={value.contributor_name}
                subheader={value.time}
            />
            <CardContent sx={{ marginLeft: "55px", maxWidth: "650px" }}>
                <Typography variant="body2">{value.question}</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "right" }}>
                <IconButton onClick={() => setBookMark(!bookMark)}>
                    {bookMark ? <BookmarkIcon sx={{ color: "blue" }} /> : <BookmarkBorderIcon sx={{ color: "blue" }} />}
                </IconButton>
                <IconButton sx={{ fontSize: "15px" }}>
                    <CommentIcon sx={{ color: "blue" }} />
                    {0}
                </IconButton>
            </CardActions>
        </Card>
    )
}
