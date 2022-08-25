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
import { userInfo } from "@/store/userInfo"
import { getMyQuestion } from "./api/questionApi"
import { getBookMark, getBookMarkQuestionId } from "./api/bookmarkApi"
import { QuestionsCollectionData } from "@/utils/types"

export default function MyPage() {
    const userState = useRecoilValue(userInfo)
    const [value, setValue] = React.useState(0)
    const [myQuestions, setMyQuestions] = React.useState<QuestionsCollectionData[]>([])
    const [bookMarkQuestions, setBookMarkQuestions] = React.useState<QuestionsCollectionData[]>([])
    const [bookMarkId, setBookMarkId] = React.useState<string[]>([])

    React.useEffect(() => {
        getMyQuestion(userState.userId)
            .then((question) => {
                setMyQuestions(question)
            })
            .catch((error) => console.log(error))
        getBookMark(userState.userId)
            .then((question) => {
                setBookMarkQuestions(question)
            })
            .catch((error) => {
                console.log(error)
            })
        getBookMarkQuestionId(userState.userId)
            .then((idList) => {
                setBookMarkId(idList)
            })
            .catch((error) => console.log(error))
    }, [])

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    return (
        <div>
            <Appbar />
            <Toolbar />
            <div style={{ margin: "0 auto", maxWidth: "800px" }}>
                <Box>
                    <IconButton onClick={() => router.push("/home")} sx={{ marginTop: "5px" }}>
                        <ArrowBackIcon sx={{ color: "black", fontSize: "20px" }} />
                        <Typography variant="subtitle1" sx={{ color: "black" }}>
                            {"ホームへ"}
                        </Typography>
                    </IconButton>
                </Box>
                <Box>
                    <Avatar
                        sx={{
                            margin: "0 auto",
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
                                <CardDetail key={index} value={value} bookMarkId={bookMarkId} />
                            ))}
                        {value === 1 &&
                            bookMarkQuestions.map((value, index) => (
                                <CardDetail key={index} value={value} bookMarkId={bookMarkId} />
                            ))}
                    </Box>
                </Box>
            </div>
        </div>
    )
}
