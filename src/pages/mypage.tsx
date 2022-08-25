import React from "react"
import router from "next/router"
import Appbar from "@/components/molecules/appbar"
import CardDetail from "@/components/molecules/carddetail"
import Toolbar from "@mui/material/Toolbar"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import IconButton from "@mui/material/IconButton"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useRecoilValue } from "recoil"
import { solvedQuestions } from "@/store/solvedQuestions"
import { unSolvedQuestions } from "@/store/unSolvedQuestions"
import { userInfo } from "@/store/userInfo"
import { getMyQuestion } from "./api/questionApi"
import { QuestionsCollectionData } from "@/utils/types"

export default function MyPage() {
    const userState = useRecoilValue(userInfo)
    const unSolvedQuestionList = useRecoilValue(unSolvedQuestions)
    const solvedQuestionList = useRecoilValue(solvedQuestions)
    const [value, setValue] = React.useState(0)
    const [myQuestions, setMyQuestions] = React.useState<QuestionsCollectionData[]>([])
    const [bookMarkQuestions, setBookMarkQuestions] = React.useState<QuestionsCollectionData[]>([])

    React.useEffect(() => {
        getMyQuestion(userState.userId)
            .then((question) => {
                setMyQuestions(question)
            })
            .catch((error) => console.log(error))
    }, [unSolvedQuestionList,solvedQuestionList])

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    return (
        <div>
            <Appbar />
            <Toolbar />
            <div style={{ margin: "0 auto", maxWidth: "800px" }}>
                <Box>
                    <IconButton onClick={() => router.push("/home")} sx={{ mt: "5px" }}>
                        <ArrowBackIcon sx={{ color: "black", fontSize: "20px" }} />
                        <Typography variant="subtitle1" sx={{ color: "black" }}>
                            {"ホームへ"}
                        </Typography>
                    </IconButton>
                </Box>
                <Box>
                    <Avatar
                        sx={{
                            m: "0 auto",
                            fontSize: "40px",
                            width: "80px",
                            height: "80px",
                            border: "solid 2px",
                            bgcolor: "white",
                            color: "black",
                        }}
                    >
                        {userState.userName[0]}
                    </Avatar>
                    <Typography variant="h4" sx={{ color: "black", textAlign: "center" }}>
                        {userState.userName}
                    </Typography>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="過去の投稿" sx={{ minWidth: "50%" }} />
                        <Tab label="ブックマーク" sx={{ minWidth: "50%" }} />
                    </Tabs>
                    <Box>
                        {value === 0 &&
                            myQuestions.map((value, index) => (
                                <CardDetail key={index} value={value} />
                            ))}
                        {value === 1 &&
                            bookMarkQuestions.map((value, index) => (
                                <CardDetail key={index} value={value} />
                            ))}
                    </Box>
                </Box>
            </div>
        </div>
    )
}
