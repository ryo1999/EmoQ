import React from "react"
import { useRouter } from "next/router"
import PostColumn from "@/components/molecules/postcolumn"
import Appbar from "@/components/molecules/appbar"
import CardDetail from "@/components/molecules/carddetail"
import TagFilter from "@/components/molecules/tagFilter"
import { getIsDuplicate } from "@/utils/commonFunctions/getIsDuplicate"
import { Box } from "@mui/material"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import { Icon } from "@iconify/react"
import { useRecoilState, useRecoilValue } from "recoil"
import { userInfo } from "@/store/userInfo"
import { selectedSort } from "@/store/selectedSort"
import { solvedQuestions } from "@/store/solvedQuestions"
import { unSolvedQuestions } from "@/store/unSolvedQuestions"
import { selectedFilter } from "@/store/selectedFilter"
import { useGetWindowSize } from "@/hooks/useGetWindowSize"
import { getQuestion } from "./api/questionApi"
import { auth } from "@/firebase"

export default function Home() {
    const router = useRouter()
    const userState = useRecoilValue(userInfo)
    const sortText = useRecoilValue(selectedSort)
    const [unSolvedQuestionList, setUnSolvedQuestions] = useRecoilState(unSolvedQuestions)
    const [solvedQuestionList, setSolvedQuestions] = useRecoilState(solvedQuestions)
    const [isOpenFormDialog, setOpenFormDialog] = React.useState(false)
    const [filter, setFilter] = useRecoilState(selectedFilter)
    const { height, width } = useGetWindowSize()

    React.useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                getQuestion(sortText, userState.groupId)
                    .then((question) => {
                        setUnSolvedQuestions(question[0])
                        setSolvedQuestions(question[1])
                    })
                    .catch((error) => console.error(error))
            } else {
                router.push("/")
            }
        })
    }, [userState.groupId])

    const handleClickOpen = () => {
        setOpenFormDialog(true)
    }

    return (
        <div>
            <Appbar />
            <Toolbar />
            {userState.groupId !== "" && (
                <>
                    <TagFilter isOpenFormDialog={isOpenFormDialog} />
                    <Box sx={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                        <div
                            style={{ width: "40%", backgroundColor: "#DDDDDD", padding: "10px", borderRadius: "20px" }}
                        >
                            <div style={{ marginBottom: "20px" }}>
                                <Typography variant="h5" sx={{ color: "black" }}>
                                    未解決
                                </Typography>
                            </div>
                            <Box sx={{ height: height * 0.73, overflowY: "scroll" }}>
                                {filter.filterList.length === 0 &&
                                    unSolvedQuestionList.map((questionInfo) => {
                                        return (
                                            <CardDetail
                                                key={questionInfo.question_id}
                                                questionInfo={questionInfo}
                                                isFilter={true}
                                            />
                                        )
                                    })}
                                {filter.filterKind === "タグ" &&
                                    unSolvedQuestionList.map((questionInfo) => {
                                        return (
                                            <CardDetail
                                                key={questionInfo.question_id}
                                                questionInfo={questionInfo}
                                                isFilter={getIsDuplicate(questionInfo.tag, filter.filterList)}
                                            />
                                        )
                                    })}
                                {filter.filterKind === "ユーザー" &&
                                    unSolvedQuestionList.map((questionInfo) => {
                                        return (
                                            <CardDetail
                                                key={questionInfo.question_id}
                                                questionInfo={questionInfo}
                                                isFilter={getIsDuplicate(
                                                    questionInfo.contributor_name,
                                                    filter.filterList
                                                )}
                                            />
                                        )
                                    })}
                            </Box>
                        </div>
                        <div
                            style={{ width: "40%", backgroundColor: "#DDDDDD", padding: "10px", borderRadius: "20px" }}
                        >
                            <div style={{ marginBottom: "20px" }}>
                                <Typography variant="h5" sx={{ color: "black" }}>
                                    解決済み
                                </Typography>
                            </div>
                            <Box sx={{ height: height * 0.73, overflowY: "scroll" }}>
                                {filter.filterList.length === 0 &&
                                    solvedQuestionList.map((questionInfo) => {
                                        return (
                                            <CardDetail
                                                key={questionInfo.question_id}
                                                questionInfo={questionInfo}
                                                isFilter={true}
                                            />
                                        )
                                    })}
                                {filter.filterKind === "タグ" &&
                                    solvedQuestionList.map((questionInfo) => {
                                        return (
                                            <CardDetail
                                                key={questionInfo.question_id}
                                                questionInfo={questionInfo}
                                                isFilter={getIsDuplicate(questionInfo.tag, filter.filterList)}
                                            />
                                        )
                                    })}
                                {filter.filterKind === "ユーザー" &&
                                    solvedQuestionList.map((questionInfo) => {
                                        return (
                                            <CardDetail
                                                key={questionInfo.question_id}
                                                questionInfo={questionInfo}
                                                isFilter={getIsDuplicate(
                                                    questionInfo.contributor_name,
                                                    filter.filterList
                                                )}
                                            />
                                        )
                                    })}
                            </Box>
                        </div>
                    </Box>
                    <IconButton
                        onClick={handleClickOpen}
                        sx={{
                            bgcolor: "#24292f",
                            color: "white",
                            position: "fixed",
                            fontSize: "40px",
                            bottom: "20px",
                            right: "20px",
                            ":hover": { bgcolor: "#777777" },
                        }}
                    >
                        <Icon icon="clarity:note-edit-line" />
                    </IconButton>
                    {isOpenFormDialog && (
                        <PostColumn
                            isOpenFormDialog={isOpenFormDialog}
                            setOpenFormDialog={setOpenFormDialog}
                            setUnSolvedQuestions={setUnSolvedQuestions}
                        />
                    )}
                </>
            )}
        </div>
    )
}
