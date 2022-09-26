import React from "react"
import { useRouter } from "next/router"
import StampList from "@/components/molecules/stampList"
import Appbar from "@/components/molecules/appbar"
import CardDetail from "@/components/molecules/carddetail"
import CommentCard from "@/components/molecules/commentCard"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useRecoilState, useRecoilValue } from "recoil"
import { useInitializeRecoilState } from "@/hooks/useInitializeRecoilState"
import { userInfo } from "@/store/userInfo"
import { selectedQuestion } from "@/store/selectedQuestion"
import { addNotification } from "../api/userApi"
import { getSelectQuestion, upDateRepliedUserId } from "../api/questionApi"
import { getComment, addComment } from "@/pages/api/commentApi"
import { auth } from "@/firebase"
import { useValidation } from "@/hooks/useValidation"
import { CommentsCollectionData } from "@/utils/types"

const Comment = () => {
    const router = useRouter()
    const userState = useRecoilValue(userInfo)
    const [questionInfo, setQuestionInfo] = useRecoilState(selectedQuestion)
    const [commentList, setCommentList] = React.useState<CommentsCollectionData[]>([])
    const [emotion, setEmotion] = React.useState("ホッ")
    const { resetSelectedQuestion } = useInitializeRecoilState()
    const { valueText, setValueText, isValidated, errorMessage, setIsInputStart, textValidation } = useValidation()


    React.useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                //ここのgetを無くすと、このコンポーネントをいじった時に質問が消えるのはなぜ？リロード時はなくても消えない、recoilで永続化してるはずなのに
                getSelectQuestion(questionInfo.question_id, userState.groupId).then((question) => {
                    if (question !== undefined) {
                        setQuestionInfo(question)
                    }
                })
                getComment(questionInfo.question_id, userState.groupId)
                    .then((comment) => {
                        setCommentList(comment)
                    })
                    .catch((error) => console.error(error))
            } else {
                router.push("/")
            }
        })
        return () => {
            resetSelectedQuestion()
        }
    }, [])

    const handleCommentClick = async () => {
        setValueText("")
        setIsInputStart(false)
        try {
            await addComment(
                questionInfo.question_id,
                userState.userId,
                userState.userName,
                valueText,
                emotion,
                new Date(),
                questionInfo.replied_user_id,
                userState.groupId
            )
            const C = await getComment(questionInfo.question_id, userState.groupId)
            setCommentList(C)
            await addNotification(userState.userId,userState.userName,userState.groupId,questionInfo.question_id,questionInfo.contributor_id,questionInfo.replied_user_id)
            await upDateRepliedUserId(questionInfo.question_id, userState.userId, questionInfo.replied_user_id, userState.groupId)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <Appbar />
            <Toolbar />
            <Box sx={{ display: "flex" }}>
                <Box sx={{ width: "50%" }}>
                    <Box sx={{ display: "flex" }}>
                        <IconButton onClick={() => router.push("/home")} sx={{ mt: "5px" }}>
                            <ArrowBackIcon sx={{ color: "black", fontSize: "20px" }} />
                            <Typography variant="subtitle1" sx={{ color: "black", fontSize: "20px" }}>
                                ホームへ
                            </Typography>
                        </IconButton>
                    </Box>
                    <Box sx={{ height: window.innerHeight*0.84, overflowY: "scroll", p:"0px 10px" }}>
                        <Box>
                            {questionInfo && (
                                <CardDetail
                                    questionInfo={questionInfo}
                                    setQuestionInfo={setQuestionInfo}
                                    commentList={commentList}
                                    isFilter={true}
                                />
                            )}
                        </Box>
                        <Box sx={{ width: "90%", m: "0 auto" }}>
                            {questionInfo &&
                                commentList.map((commentInfo) => {
                                    return (
                                        <CommentCard
                                            key={commentInfo.comment_id}
                                            commentInfo={commentInfo}
                                            replied_user_id={questionInfo.replied_user_id}
                                            setCommentList={setCommentList}
                                        />
                                    )
                                })}
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ width: "50%", m: "0 auto" }}>
                    <Box sx={{ mt: "50px", textAlign: "center" }}>
                        <Typography variant="h6" sx={{ mb: "20px" }}>
                            今の感情は？
                        </Typography>
                        <StampList emotion={emotion} setEmotion={setEmotion} />
                    </Box>
                    <Box
                        sx={{
                            "& > :not(style)": { width: "80%" },
                            textAlign: "center",
                        }}
                    >
                        <TextField
                            error={!isValidated}
                            multiline
                            rows={12}
                            value={valueText}
                            InputProps={{ style: { fontSize: "20px" } }}
                            label="返信"
                            helperText={isValidated ? "" : errorMessage}
                            onChange={(e) => setValueText(e.target.value)}
                            variant="outlined"
                        />
                    </Box>
                    <Box sx={{ width: "80%", m: "20px auto 0px auto" }}>
                        <Button
                            onClick={handleCommentClick}
                            variant="contained"
                            disabled={!textValidation}
                            sx={{
                                fontSize: "18px",
                                width: "100%",
                                bgcolor: "#24292f",
                                ":hover": { bgcolor: "#555555" },
                            }}
                        >
                            コメント
                        </Button>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default Comment
