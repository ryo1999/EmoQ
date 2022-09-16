import React from "react"
import { format } from "date-fns"
import { useRouter } from "next/router"
import ReturnIcon from "../atoms/returnIcon"
import { ReturnEmotionColor } from "@/utils/commonFunctions/returnEmotionColor"
import { Box, Menu, MenuItem, Tooltip } from "@mui/material"
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
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges"
import CommentIcon from "@mui/icons-material/Comment"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import DeleteIcon from "@mui/icons-material/Delete"
import { useRecoilState, useRecoilValue } from "recoil"
import { useSetRecoilState } from "recoil"
import { solvedQuestions } from "@/store/solvedQuestions"
import { unSolvedQuestions } from "@/store/unSolvedQuestions"
import { selectedSort } from "@/store/selectedSort"
import { userInfo } from "@/store/userInfo"
import { selectedQuestion } from "@/store/selectedQuestion"
import { getComment } from "@/pages/api/commentApi"
import { addBookMark, deleteBookMark, deleteBookMarkQuestion, upDateBookmarkSolution } from "@/pages/api/bookmarkApi"
import {
    upDateQuestionSolution,
    upDateQuestionBookmark,
    getQuestion,
    deleteQuestionBookmark,
    deleteQuestion,
} from "@/pages/api/questionApi"
import { QuestionsCollectionData } from "@/utils/types"
import { CommentsCollectionData } from "@/utils/types"

type CardContentProps = {
    questionInfo: QuestionsCollectionData
    setQuestionInfo?: React.Dispatch<QuestionsCollectionData>
    commentList?: CommentsCollectionData[]
}

const CardDetail = React.memo((props: CardContentProps) => {
    const { questionInfo, commentList, setQuestionInfo } = props
    const router = useRouter()
    const sortText = useRecoilValue(selectedSort)
    const userState = useRecoilValue(userInfo)
    const [unSolvedQuestionList, setUnSolvedQuestions] = useRecoilState(unSolvedQuestions)
    const [solvedQuestionList, setSolvedQuestions] = useRecoilState(solvedQuestions)
    const setSelectedQuestion = useSetRecoilState(selectedQuestion)
    const [bookMark, setBookMark] = React.useState(false)
    const [checkMark, setCheckMark] = React.useState(false)
    const [commentLength, setCommentLength] = React.useState(0)
    const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null)

    const today = format(new Date(), "MM/dd HH:mm")
    const dateString = questionInfo.time.toLocaleString()
    const dateToDate = Date.parse(dateString)
    const date = format(dateToDate, "MM/dd HH:mm")
    const dateTime = format(dateToDate, "HH:mm")

    React.useEffect(() => {
        getComment(questionInfo.question_id)
            .then((comment) => {
                setCommentLength(comment.length)
            })
            .catch((error) => console.error(error))
    }, [commentList, unSolvedQuestionList])

    React.useEffect(() => {
        if (questionInfo.bookmark_user_id.indexOf(userState.userId) !== -1) {
            setBookMark(true)
        } else {
            setBookMark(false)
        }
    }, [questionInfo.bookmark_user_id])

    React.useEffect(() => {
        if (questionInfo.solution == true) {
            setCheckMark(true)
        } else {
            setCheckMark(false)
        }
    }, [questionInfo.solution])

    const handleClickCommentIcon = () => {
        setSelectedQuestion(questionInfo)
        router.push({
            pathname: "/comment/[qid]",
            query: { qid: questionInfo.question_id },
        })
    }

    const handleClickSolved = async () => {
        setMenuAnchorEl(null)
        try {
            await upDateQuestionSolution(questionInfo.question_id, !checkMark)
            await upDateBookmarkSolution(questionInfo.question_id, questionInfo.bookmark_user_id, !checkMark)
            const Q = await getQuestion(sortText)
            setSolvedQuestions(Q[1])
            setUnSolvedQuestions(Q[0])
            if (setQuestionInfo) {
                setQuestionInfo({ ...questionInfo, solution: !questionInfo.solution })
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleClickBookMark = async () => {
        if (questionInfo.bookmark_user_id.includes(userState.userId)) {
            if (setQuestionInfo) {
                setQuestionInfo({
                    ...questionInfo,
                    bookmark_user_id: questionInfo.bookmark_user_id.filter(
                        (user) => user.match(userState.userId) == null
                    ),
                })
            }
            try {
                await deleteBookMark(userState.userId, questionInfo.question_id)
                await deleteQuestionBookmark(questionInfo.question_id, questionInfo.bookmark_user_id, userState.userId)
                const Q = await getQuestion(sortText)
                setSolvedQuestions(Q[1])
                setUnSolvedQuestions(Q[0])
            } catch (error) {
                console.error(error)
            }
        } else {
            if (setQuestionInfo) {
                setQuestionInfo({
                    ...questionInfo,
                    bookmark_user_id: [...questionInfo.bookmark_user_id, userState.userId],
                })
            }
            try {
                await addBookMark(
                    userState.userId,
                    questionInfo.contributor_id,
                    questionInfo.contributor_name,
                    questionInfo.question_id,
                    questionInfo.question,
                    questionInfo.tag,
                    questionInfo.time,
                    questionInfo.emotion,
                    questionInfo.parameter,
                    questionInfo.solution,
                    questionInfo.replied_user_id
                )
                await upDateQuestionBookmark(questionInfo.question_id, questionInfo.bookmark_user_id, userState.userId)
                const Q = await getQuestion(sortText)
                setSolvedQuestions(Q[1])
                setUnSolvedQuestions(Q[0])
            } catch (error) {
                console.error(error)
            }
        }
        // if (router.query.qid !== undefined) {
        //     setBookMark(!bookMark)
        // }
    }

    const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchorEl(event.currentTarget)
    }
    const handleCloseMenu = () => {
        setMenuAnchorEl(null)
    }
    const handleClickDelete = async () => {
        setMenuAnchorEl(null)
        deleteBookMarkQuestion(questionInfo.question_id, questionInfo.bookmark_user_id)
        try {
            await deleteQuestion(questionInfo.question_id)
            const Q = await getQuestion(sortText)
            setSolvedQuestions(Q[1])
            setUnSolvedQuestions(Q[0])
            if (router.query.qid !== undefined) {
                router.push("/home")
            }
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
            <Box sx={{ display: "flex", m: "0px 5px", justifyContent: "space-between" }}>
                <Box>
                    {questionInfo.tag.map((v, i) => (
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
                {questionInfo.contributor_id === userState.userId ? (
                    <IconButton onClick={handleClickMenu} sx={{ mt: "5px" }}>
                        <MoreHorizIcon />
                    </IconButton>
                ) : (
                    <></>
                )}
                <Menu
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
                    <MenuItem onClick={handleClickSolved}>
                        <PublishedWithChangesIcon sx={{ mr: "20px" }} />
                        {questionInfo.solution ? "再質問!" : "解決した!"}
                    </MenuItem>
                    <MenuItem onClick={handleClickDelete}>
                        <DeleteIcon sx={{ mr: "20px" }} />
                        削除
                    </MenuItem>
                </Menu>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "right", alignItems: "center", mt: "10px" }}>
                <Typography variant="caption" sx={{ mr: "20px" }}>
                    緊急度
                </Typography>
                <Slider
                    key={questionInfo.parameter}
                    defaultValue={questionInfo.parameter}
                    marks
                    step={10}
                    min={0}
                    max={100}
                    sx={{ width: "200px", mr: "30px" }}
                    disabled
                />
                <Tooltip title={questionInfo.emotion} placement="bottom">
                    <IconButton
                        disableRipple
                        sx={{
                            bgcolor: ReturnEmotionColor(questionInfo.emotion),
                            mr: "10px",
                            mt: "3px",
                            color: "white",
                        }}
                    >
                        {ReturnIcon(questionInfo.emotion)}
                    </IconButton>
                </Tooltip>
            </Box>
            <CardHeader
                avatar={
                    <Avatar sx={{ border: "solid 1px #24292f", bgcolor: "white", color: "black" }}>
                        {questionInfo.contributor_name[0]}
                    </Avatar>
                }
                title={questionInfo.contributor_name}
                subheader={
                    <Typography variant="caption">
                        {today.slice(3, 5) === date.slice(3, 5) ? `今日：${dateTime}` : date}
                    </Typography>
                }
            />
            <CardContent sx={{ p: "0px", ml: "55px", maxWidth: "460px" }}>
                <Typography sx={{ whiteSpace: "pre-wrap" }} variant="body2">
                    {questionInfo.question}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "end" }}>
                <Box>
                    <IconButton onClick={handleClickBookMark}>
                        {bookMark ? (
                            <BookmarkIcon sx={{ color: "black" }} />
                        ) : (
                            <BookmarkBorderIcon sx={{ color: "black" }} />
                        )}
                    </IconButton>
                    <IconButton onClick={handleClickCommentIcon} sx={{ fontSize: "15px" }}>
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
