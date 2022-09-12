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
import { useRecoilState, useRecoilValue } from "recoil"
import { useInitializeRecoilState } from "@/hooks/useInitializeRecoilState"
import { userInfo } from "@/store/userInfo"
import { selectedQuestion } from "@/store/selectedQuestion"
import { selectedComment } from "@/store/selectedComment"
import { getSelectQuestion } from "../api/questionApi"
import { getComment, addComment } from "@/pages/api/commentApi"
import { auth } from "@/firebase"
import { useValidation } from "@/hooks/useValidation"

const Comment = () => {
    const router = useRouter()
    const userState = useRecoilValue(userInfo)
    const [questionInfo, setQuestionInfo] = useRecoilState(selectedQuestion)
    const [commentList, setCommentList] = useRecoilState(selectedComment)
    const [emotion, setEmotion] = React.useState("焦り")
    const { resetSelectedQuestion, resetSelectedComment } = useInitializeRecoilState()
    const { valueText, setValueText, isValidated, errorMessage, setIsInputStart, textValidation } = useValidation()

    React.useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                getSelectQuestion(router.query.qid).then((question) => {
                    setQuestionInfo(question)
                })
                getComment(router.query.qid)
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
            resetSelectedComment()
        }
    }, [])

    const handleCommentClick = async () => {
        setValueText("")
        setEmotion("焦り")
        setIsInputStart(false)
        try {
            await addComment(
                router.query.qid,
                userState.userId,
                userState.userName,
                valueText,
                emotion,
                new Date()
            )
            const C = await getComment(router.query.qid)
            setCommentList(C)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <Appbar />
            <Toolbar />
            <Box sx={{ display: "flex" }}>
                <Box sx={{ width: "50%", mt: "10px", ml: "10px", height: "720px", overflowY: "scroll" }}>
                    {questionInfo && (
                        <Box>
                            <CardDetail questionInfo={questionInfo} />
                        </Box>
                    )}
                    <Box sx={{ width: "90%", m: "0 auto" }}>
                        {commentList.map((commentInfo, index) => {
                            return <CommentCard key={index} commentInfo={commentInfo} />
                        })}
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
                            id="outlined-basic"
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
