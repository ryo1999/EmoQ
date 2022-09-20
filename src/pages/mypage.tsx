import React from "react"
import router from "next/router"
import Appbar from "@/components/molecules/appbar"
import TagFilter from "@/components/molecules/tagFilter"
import CardDetail from "@/components/molecules/carddetail"
import PostColumn from "@/components/molecules/postcolumn"
import { getIsDuplicate } from "@/utils/commonFunctions/getIsDuplicate"
import Toolbar from "@mui/material/Toolbar"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import IconButton from "@mui/material/IconButton"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { Icon } from "@iconify/react"
import { useRecoilState, useRecoilValue } from "recoil"
import { selectedSort } from "@/store/selectedSort"
import { solvedQuestions } from "@/store/solvedQuestions"
import { unSolvedQuestions } from "@/store/unSolvedQuestions"
import { userInfo } from "@/store/userInfo"
import { selectedFilter } from "@/store/selectedFilter"
import { getMyQuestion } from "./api/questionApi"
import { getBookMark } from "./api/bookmarkApi"
import { useInitializeRecoilState } from "@/hooks/useInitializeRecoilState"
import { QuestionsCollectionData } from "@/utils/types"
import { auth } from "@/firebase"

export default function MyPage() {
    const userState = useRecoilValue(userInfo)
    const sortText = useRecoilValue(selectedSort)
    const [unSolvedQuestionList, setUnSolvedQuestions] = useRecoilState<QuestionsCollectionData[]>(unSolvedQuestions)
    const solvedQuestionList = useRecoilValue(solvedQuestions)
    const [filter, setFilter] = useRecoilState(selectedFilter)
    const [value, setValue] = React.useState(0)
    const [solvedMyQuestions, setSolvedMyQuestions] = React.useState<QuestionsCollectionData[]>([])
    const [unSolvedMyQuestions, setUnSolvedMyQuestions] = React.useState<QuestionsCollectionData[]>([])
    const [solvedBookMarkQuestions, setSolvedBookMarkQuestions] = React.useState<QuestionsCollectionData[]>([])
    const [unSolvedBookMarkQuestions, setUnSolvedBookMarkQuestions] = React.useState<QuestionsCollectionData[]>([])
    const [isOpenFormDialog, setOpenFormDialog] = React.useState(false)
    const { resetSelectedFilter } = useInitializeRecoilState()
    React.useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                getMyQuestion(userState.userId, sortText)
                    .then((question) => {
                        setUnSolvedMyQuestions(question[0])
                        setSolvedMyQuestions(question[1])
                    })
                    .catch((error) => console.error(error))
                getBookMark(userState.userId, sortText)
                    .then((bookmark) => {
                        setUnSolvedBookMarkQuestions(bookmark[0])
                        setSolvedBookMarkQuestions(bookmark[1])
                    })
                    .catch((error) => console.error(error))
            } else {
                router.push("/")
            }
        })
    }, [unSolvedQuestionList, solvedQuestionList])

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    const handleClickOpen = () => {
        setOpenFormDialog(true)
    }

    const handleClickToHome = () => {
        resetSelectedFilter()
        router.push("/home")
    }

    return (
        <div>
            <Appbar />
            <Toolbar />
            <div>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <IconButton onClick={handleClickToHome} sx={{ mt: "5px" }}>
                        <ArrowBackIcon sx={{ color: "black", fontSize: "20px" }} />
                        <Typography variant="subtitle1" sx={{ color: "black", fontSize: "20px" }}>
                            ホームへ
                        </Typography>
                    </IconButton>
                    <Box>
                        <Tabs value={value} onChange={handleChange} sx={{ mr: "70px" }}>
                            <Tab label="過去の投稿" />
                            <Tab label="ブックマーク" />
                        </Tabs>
                    </Box>
                </Box>
                <Box>
                    <TagFilter />
                    <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                        <Box sx={{ width: "40%" }}>
                            <Typography sx={{ mb: "10px" }} variant="h5">
                                未解決
                            </Typography>
                            <Box sx={{ height: "570px", overflowY: "scroll" }}>
                                {value === 0 &&
                                    filter.filterList.length === 0 &&
                                    unSolvedMyQuestions.map((questionInfo, index) => {
                                        return <CardDetail key={index} questionInfo={questionInfo} isFilter={true} />
                                    })}
                                {value === 0 &&
                                    filter.filterKind === "タグ" &&
                                    unSolvedMyQuestions.map((questionInfo, index) => {
                                        return (
                                            <CardDetail
                                                key={questionInfo.question_id}
                                                questionInfo={questionInfo}
                                                isFilter={getIsDuplicate(questionInfo.tag, filter.filterList)}
                                            />
                                        )
                                    })}
                                {value === 0 &&
                                    filter.filterKind === "ユーザー" &&
                                    unSolvedMyQuestions.map((questionInfo, index) => {
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
                                {value === 1 &&
                                    filter.filterList.length === 0 &&
                                    unSolvedBookMarkQuestions.map((questionInfo, index) => {
                                        return <CardDetail key={index} questionInfo={questionInfo} isFilter={true} />
                                    })}
                                {value === 1 &&
                                    filter.filterKind === "タグ" &&
                                    unSolvedBookMarkQuestions.map((questionInfo, index) => {
                                        return (
                                            <CardDetail
                                                key={questionInfo.question_id}
                                                questionInfo={questionInfo}
                                                isFilter={getIsDuplicate(questionInfo.tag, filter.filterList)}
                                            />
                                        )
                                    })}
                                {value === 1 &&
                                    filter.filterKind === "ユーザー" &&
                                    unSolvedBookMarkQuestions.map((questionInfo, index) => {
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
                        </Box>
                        <Box sx={{ width: "40%" }}>
                            <Typography sx={{ mb: "10px" }} variant="h5">
                                解決済み
                            </Typography>
                            <Box sx={{ height: "570px", overflowY: "scroll" }}>
                                {value === 0 &&
                                    filter.filterList.length === 0 &&
                                    solvedMyQuestions.map((questionInfo, index) => {
                                        return <CardDetail key={index} questionInfo={questionInfo} isFilter={true} />
                                    })}
                                {value === 0 &&
                                    filter.filterKind === "タグ" &&
                                    solvedMyQuestions.map((questionInfo, index) => {
                                        return (
                                            <CardDetail
                                                key={questionInfo.question_id}
                                                questionInfo={questionInfo}
                                                isFilter={getIsDuplicate(questionInfo.tag, filter.filterList)}
                                            />
                                        )
                                    })}
                                {value === 0 &&
                                    filter.filterKind === "ユーザー" &&
                                    solvedMyQuestions.map((questionInfo, index) => {
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
                                {value === 1 &&
                                    filter.filterList.length === 0 &&
                                    solvedBookMarkQuestions.map((questionInfo, index) => {
                                        return <CardDetail key={index} questionInfo={questionInfo} isFilter={true} />
                                    })}
                                {value === 1 &&
                                    filter.filterKind === "タグ" &&
                                    solvedBookMarkQuestions.map((questionInfo, index) => {
                                        return (
                                            <CardDetail
                                                key={questionInfo.question_id}
                                                questionInfo={questionInfo}
                                                isFilter={getIsDuplicate(questionInfo.tag, filter.filterList)}
                                            />
                                        )
                                    })}
                                {value === 1 &&
                                    filter.filterKind === "ユーザー" &&
                                    solvedBookMarkQuestions.map((questionInfo, index) => {
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
                        </Box>
                    </div>
                </Box>
            </div>
            <IconButton
                onClick={handleClickOpen}
                sx={{
                    bgcolor: "#24292f",
                    color: "white",
                    position: "fixed",
                    fontSize: "40px",
                    bottom: "10px",
                    right: "10px",
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
        </div>
    )
}
