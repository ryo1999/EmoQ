import React from "react"
import { useRouter } from "next/router"
import Appbar from "@/components/molecules/appbar"
import CardDetail from "@/components/molecules/carddetail"
import CommentCard from "@/components/molecules/commentCard"
import TagFilter from "@/components/molecules/tagFilter"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import { useRecoilState, useRecoilValue } from "recoil"
import { useInitializeRecoilState } from "@/hooks/useInitializeRecoilState"
import { selectedQuestion } from "@/store/selectedQuestion"
import { selectedComment } from "@/store/selectedComment"
import { getSelectQuestion } from "./api/questionApi"
import { getComment } from "@/pages/api/commentApi"
import { auth } from "@/firebase"

const Comment = () => {
    const router = useRouter()
    const [questionInfo, setQuestionInfo] = useRecoilState(selectedQuestion)
    const [commentList, setCommentList] = useRecoilState(selectedComment)
    const { resetSelectedQuestion, resetSelectedComment } = useInitializeRecoilState()
    const equalIndex = router.asPath.indexOf("=") + 1

    React.useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                if (!questionInfo) {
                    getSelectQuestion(router.asPath.substring(equalIndex)).then((question) => {
                        setQuestionInfo(question)
                    })
                }
                getComment(router.asPath.substring(equalIndex))
                    .then((comment) => {
                        setCommentList(comment)
                    })
                    .catch((error) => console.log(error))
            } else {
                router.push("/")
            }
        })
        return () => {
            resetSelectedQuestion()
            resetSelectedComment()
        }
    }, [])

    return (
        <div>
            <Appbar />
            <Toolbar />
            <TagFilter />
            {questionInfo && (
                <Box>
                    <CardDetail questionInfo={questionInfo} />
                </Box>
            )}
            <Box>
                {commentList.map((commentInfo, index) => {
                    return <CommentCard key={index} commentInfo={commentInfo} />
                })}
            </Box>
        </div>
    )
}

export default Comment
