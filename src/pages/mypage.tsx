import React from "react"
import router from "next/router"
import Appbar from "@/components/molecules/appbar"
import TagFilter from "@/components/molecules/tagFilter"
import CardDetail from "@/components/molecules/carddetail"
import PostColumn from "@/components/molecules/postcolumn"
import Toolbar from "@mui/material/Toolbar"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import IconButton from "@mui/material/IconButton"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { Icon } from "@iconify/react"
import { useRecoilState, useRecoilValue } from "recoil"
import { solvedQuestions } from "@/store/solvedQuestions"
import { unSolvedQuestions } from "@/store/unSolvedQuestions"
import { userInfo } from "@/store/userInfo"
import { getMyQuestion } from "./api/questionApi"
import { getBookMark } from "./api/bookmarkApi"
import { QuestionsCollectionData } from "@/utils/types"
import { auth } from "@/firebase"

export default function MyPage() {
    const userState = useRecoilValue(userInfo)
    const [unSolvedQuestionList, setUnSolvedQuestions] = useRecoilState<QuestionsCollectionData[]>(unSolvedQuestions)
    const solvedQuestionList = useRecoilValue(solvedQuestions)
    const [value, setValue] = React.useState(0)
    const [solvedMyQuestions, setSolvedMyQuestions] = React.useState<QuestionsCollectionData[]>([])
    const [unSolvedMyQuestions, setUnSolvedMyQuestions] = React.useState<QuestionsCollectionData[]>([])
    const [solvedBookMarkQuestions, setSolvedBookMarkQuestions] = React.useState<QuestionsCollectionData[]>([])
    const [unSolvedBookMarkQuestions, setUnSolvedBookMarkQuestions] = React.useState<QuestionsCollectionData[]>([])
    const [isOpenFormDialog, setOpenFormDialog] = React.useState(false)

    React.useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                getMyQuestion(userState.userId)
                    .then((question) => {
                        setUnSolvedMyQuestions(question[0])
                        setSolvedMyQuestions(question[1])
                    })
                    .catch((error) => console.error(error))
                getBookMark(userState.userId)
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

    return (
        <div>
            <Appbar />
            <Toolbar />
            <div>
                <Box sx={{ display: "flex" }}>
                    <IconButton onClick={() => router.push("/home")} sx={{ mt: "5px" }}>
                        <ArrowBackIcon sx={{ color: "black", fontSize: "20px" }} />
                        <Typography variant="subtitle1" sx={{ color: "black", fontSize: "20px" }}>
                            ホームへ
                        </Typography>
                    </IconButton>
                </Box>
                <Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <TagFilter />
                        <Tabs value={value} onChange={handleChange} sx={{ mr: "70px" }}>
                            <Tab label="過去の投稿" />
                            <Tab label="ブックマーク" />
                        </Tabs>
                    </Box>
                    <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                        <Box sx={{ width: "40%" }}>
                            <Typography variant="h5">未解決</Typography>
                            <Box sx={{ height: "590px", overflowY: "scroll" }}>
                                {value === 0 &&
                                    unSolvedMyQuestions.map((value, index) => <CardDetail key={index} questionInfo={value} />)}
                                {value === 1 &&
                                    unSolvedBookMarkQuestions.map((value, index) => (
                                        <CardDetail key={index} questionInfo={value} />
                                    ))}
                            </Box>
                        </Box>
                        <Box sx={{ width: "40%" }}>
                            <Typography variant="h5">解決済み</Typography>
                            <Box sx={{ height: "590px", overflowY: "scroll" }}>
                                {value === 0 &&
                                    solvedMyQuestions.map((value, index) => <CardDetail key={index} questionInfo={value} />)}
                                {value === 1 &&
                                    solvedBookMarkQuestions.map((value, index) => (
                                        <CardDetail key={index} questionInfo={value} />
                                    ))}
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
