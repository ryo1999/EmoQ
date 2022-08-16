import React from "react"
import ReturnIcon from "../atoms/returnIcon"
import { ReturnEmotionColor } from "../../utils/commonFunctions/returnEmotionColor"
import { ReturnEmotionFontColor } from "../../utils/commonFunctions/returnEmotionFontColor"
import { Box } from "@mui/material"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import Avatar from "@mui/material/Avatar"
import Slider from "@mui/material/Slider"
import Chip from "@mui/material/Chip"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import CommentIcon from "@mui/icons-material/Comment"
import { QuestionsCollectionData } from "@/utils/types"

type CardContentProps = {
    value: QuestionsCollectionData
}

export default function CardDetail(props: CardContentProps) {
    const { value } = props
    const [bookMark, setBookMark] = React.useState(false)

    return (
        <Card sx={{ width: "100%", mt: "10px", borderRadius: "10px", bgcolor: ReturnEmotionColor(value.emotion), color: ReturnEmotionFontColor(value.emotion) }}>
            <Box sx={{ display: "flex", marginLeft: "5px" }}>
                {value.tag.map((v, i) => (
                    <Chip key={i} label={v} sx={{ marginTop: "10px", marginRight: "5px", bgcolor: "white" }} />
                ))}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "right", alignItems: "center" }}>
                {(value.emotion == "イライラ" || value.emotion == "焦り" || value.emotion == "絶望") && (
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
                <IconButton disabled sx={{ marginRight: "10px", marginTop: "3px", color: "white" }}>
                    {ReturnIcon(value.emotion)}
                </IconButton>
            </Box>
            <CardHeader
                avatar={<Avatar sx={{bgcolor:"white", color:"black"}}>{value.contributor_name[0]}</Avatar>}
                title={value.contributor_name}
                subheader={<Typography variant="caption" sx={{color:ReturnEmotionFontColor(value.emotion)}}>{value.time}</Typography>}
            />
            <CardContent sx={{ marginLeft: "55px", maxWidth: "650px" }}>
                <Typography variant="body2">{value.question}</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "right" }}>
                <IconButton onClick={() => setBookMark(!bookMark)}>
                    {bookMark ? <BookmarkIcon sx={{ color: "black" }} /> : <BookmarkBorderIcon sx={{ color: "black" }} />}
                </IconButton>
                <IconButton sx={{ fontSize: "15px" }}>
                    <CommentIcon sx={{ color: "black" }} />
                    <Typography variant="button" sx={{color:"black"}}>0</Typography>
                </IconButton>
            </CardActions>
        </Card>
    )
}
