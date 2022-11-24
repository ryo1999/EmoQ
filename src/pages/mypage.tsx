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
import useMediaQuery from "@mui/material/useMediaQuery"
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
import { useGetWindowSize } from "@/hooks/useGetWindowSize"
import { QuestionsCollectionData } from "@/utils/types"
import { auth } from "@/firebase"

const MyPage = React.memo(() => {
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
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
    const { height, width } = useGetWindowSize()

    React.useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                getMyQuestion(userState.userId, sortText,userState.groupId)
                    .then((question) => {
                        setUnSolvedMyQuestions(question[0])
                        setSolvedMyQuestions(question[1])
                    })
                    .catch((error) => console.error(error))
                getBookMark(userState.userId, userState.groupId, sortText)
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
                    <IconButton onClick={handleClickToHome} sx={{ mt: "5px", mb:"-10px"}}>
                        <ArrowBackIcon sx={{ color : (prefersDarkMode ? "white" : "black"), fontSize: "20px" }} />
                        <Typography variant="subtitle1" sx={{ color : (prefersDarkMode ? "white" : "black"), fontSize: "20px" }}>
                            ホームへ
                        </Typography>
                    </IconButton>
                    <Box>
                        <Tabs value={value} onChange={handleChange} sx={{ mr: "70px", bgcolor:"white" }}>
                            <Tab label="過去の投稿" sx={{color:"black"}}/>
                            <Tab label="ブックマーク" sx={{color:"black"}}/>
                        </Tabs>
                    </Box>
                </Box>
                <Box>
                    <TagFilter isOpenFormDialog={isOpenFormDialog}/>
                    <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                        <Box sx={{ width: "40%", backgroundColor:"#DDDDDD", padding:"10px", borderRadius:"20px" }}>
                            <Typography sx={{ mb: "10px", color:"black" }} variant="h5">
                                未解決
                            </Typography>
                            <Box sx={{ height: height*0.68, overflowY: "scroll" }}>
                                {value === 0 &&
                                    filter.filterList.length === 0 &&
                                    unSolvedMyQuestions.map((questionInfo) => {
                                        return <CardDetail key={questionInfo.question_id} questionInfo={questionInfo} isFilter={true} />
                                    })}
                                {value === 0 &&
                                    filter.filterKind === "タグ" &&
                                    unSolvedMyQuestions.map((questionInfo) => {
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
                                    unSolvedMyQuestions.map((questionInfo) => {
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
                                    unSolvedBookMarkQuestions.map((questionInfo) => {
                                        return <CardDetail key={questionInfo.question_id} questionInfo={questionInfo} isFilter={true} />
                                    })}
                                {value === 1 &&
                                    filter.filterKind === "タグ" &&
                                    unSolvedBookMarkQuestions.map((questionInfo) => {
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
                                    unSolvedBookMarkQuestions.map((questionInfo) => {
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
                        <Box sx={{ width: "40%", backgroundColor:"#DDDDDD", padding:"10px", borderRadius:"20px" }}>
                            <Typography sx={{ mb: "10px", color:"black" }} variant="h5">
                                解決済み
                            </Typography>
                            <Box sx={{ height: height*0.68, overflowY: "scroll" }}>
                                {value === 0 &&
                                    filter.filterList.length === 0 &&
                                    solvedMyQuestions.map((questionInfo) => {
                                        return <CardDetail key={questionInfo.question_id} questionInfo={questionInfo} isFilter={true} />
                                    })}
                                {value === 0 &&
                                    filter.filterKind === "タグ" &&
                                    solvedMyQuestions.map((questionInfo) => {
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
                                    solvedMyQuestions.map((questionInfo) => {
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
                                    solvedBookMarkQuestions.map((questionInfo) => {
                                        return <CardDetail key={questionInfo.question_id} questionInfo={questionInfo} isFilter={true} />
                                    })}
                                {value === 1 &&
                                    filter.filterKind === "タグ" &&
                                    solvedBookMarkQuestions.map((questionInfo) => {
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
                                    solvedBookMarkQuestions.map((questionInfo) => {
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
        </div>
    )
})

export default MyPage