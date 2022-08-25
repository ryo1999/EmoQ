import React from "react"
import { format } from "date-fns"
import ReturnIcon from "../atoms/returnIcon"
import { ReturnEmotionColor, ReturnEmotionFontColor } from "@/utils/commonFunctions/returnEmotionColor"
import { Box, Tooltip } from "@mui/material"
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
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import CommentIcon from "@mui/icons-material/Comment"
import { useRecoilValue } from "recoil"
import { userInfo } from "@/store/userInfo"
import { getComment } from "@/pages/api/commentApi"
import { addBookMark } from "@/pages/api/bookmarkApi"
import { setQuestionField, getQuestion } from "@/pages/api/questionApi"
import { QuestionsCollectionData } from "@/utils/types"

type CardContentProps = {
    value: QuestionsCollectionData
    bookMarkId: string[]
    setUnSolvedQuestions?: React.Dispatch<QuestionsCollectionData[]>
    setSolvedQuestions?: React.Dispatch<QuestionsCollectionData[]>
}

const CardDetail = React.memo((props: CardContentProps) => {
    const { value, setUnSolvedQuestions, setSolvedQuestions, bookMarkId } = props
    const userState = useRecoilValue(userInfo)
    const [bookMark, setBookMark] = React.useState(false)
    const [checkMark, setCheckMark] = React.useState(value.solution)
    const [commentLength, setCommentLength] = React.useState(0)

    // const today = new Date()
    // console.log(today)
    const date = format(value.time, "MM/dd HH:mm")

    React.useEffect(() => {
        getComment(value.question_id)
            .then((comment) => {
                setCommentLength(comment.length)
            })
            .catch((error) => console.log(error))
        bookMarkId.includes(value.question_id) ? setBookMark(true) : null
    }, [])

    const handleClickCheckMark = async () => {
        await setQuestionField(value.question_id, !checkMark)
        if (setUnSolvedQuestions && setSolvedQuestions) {
            await getQuestion()
                .then((Q) => {
                    setSolvedQuestions(Q[1])
                    setUnSolvedQuestions(Q[0])
                })
                .catch((error) => console.log(error))
        }
    }

    const handleClickBookMark = async () => {
        setBookMark(!bookMark)
        addBookMark(
            userState.userId,
            value.contributor_id,
            value.contributor_name,
            value.question_id,
            value.question,
            value.tag,
            value.time,
            value.emotion,
            value.parameter,
            value.solution
        )
    }

    // console.log(value.emotion)

    return (
        <Card
            sx={{
                width: "100%",
                mt: "10px",
                borderRadius: "10px",
                color: ReturnEmotionFontColor(value.emotion),
            }}
        >
            <Box sx={{ display: "flex", ml: "5px" }}>
                {value.tag.map((v, i) => (
                    <Tooltip key={v} title={v} placement="top">
                        <Chip
                            key={i}
                            label={v}
                            sx={{
                                cursor: "pointer",
                                mt: "10px",
                                mr: "5px",
                                bgcolor: "#24292f",
                                color: "white",
                                maxWidth: "150px",
                            }}
                        />
                    </Tooltip>
                ))}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "right", alignItems: "center", mt: "10px" }}>
                <Typography variant="caption" sx={{ mr: "20px" }}>
                    緊急度
                </Typography>
                <Slider
                    key={value.parameter}
                    defaultValue={value.parameter}
                    marks
                    step={10}
                    min={0}
                    max={100}
                    sx={{ width: "200px", mr: "30px" }}
                    disabled
                />
                <Box
                    sx={{
                        width: "30px",
                        mr: "20px",
                        borderBottom: "solid 1px",
                    }}
                >
                    {value.parameter}
                </Box>
                <Tooltip title={value.emotion} placement="top">
                    <IconButton
                        disableRipple
                        sx={{
                            bgcolor: ReturnEmotionColor(value.emotion),
                            mr: "10px",
                            mt: "3px",
                            color: "white",
                        }}
                    >
                        {ReturnIcon(value.emotion)}
                    </IconButton>
                </Tooltip>
            </Box>
            <CardHeader
                avatar={
                    <Avatar sx={{ border: "solid 1px #24292f", bgcolor: "white", color: "black" }}>
                        {value.contributor_name[0]}
                    </Avatar>
                }
                title={value.contributor_name}
                subheader={
                    <Typography variant="caption" sx={{ color: ReturnEmotionFontColor(value.emotion) }}>
                        {date}
                    </Typography>
                }
            />
            <CardContent sx={{ ml: "55px", maxWidth: "650px" }}>
                <Typography variant="body2">{value.question}</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "space-between" }}>
                <Box>
                    <IconButton onClick={handleClickCheckMark}>
                        {checkMark ? <CheckCircleIcon sx={{ color: "red" }} /> : <CheckCircleOutlineIcon />}
                    </IconButton>
                </Box>
                <Box>
                    <IconButton onClick={handleClickBookMark}>
                        {bookMark ? (
                            <BookmarkIcon sx={{ color: "black" }} />
                        ) : (
                            <BookmarkBorderIcon sx={{ color: "black" }} />
                        )}
                    </IconButton>
                    <IconButton sx={{ fontSize: "15px" }}>
                        <CommentIcon sx={{ color: "black" }} />
                        <Typography variant="button" sx={{ color: "black" }}>
                            {commentLength}
                        </Typography>
                    </IconButton>
                </Box>
            </CardActions>
        </Card>
    )
})

export default CardDetail
