import React from "react"
import PostColumn from "@/components/molecules/postcolumn"
import Appbar from "@/components/molecules/appbar"
import CardDetail from "@/components/molecules/carddetail"
import TagFilter from "@/components/molecules/tagFilter"
import { Box } from "@mui/material"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import { Icon } from "@iconify/react"
import { useRecoilValue } from "recoil"
import { userInfo } from "@/store/userInfo"
import { getQuestion } from "./api/questionApi"
import { QuestionsCollectionData } from "@/utils/types"
import { getBookMarkQuestionId } from "./api/bookmarkApi"

export default function Home() {
    const userState = useRecoilValue(userInfo)
    const [unSolvedQuestions, setUnSolvedQuestions] = React.useState<QuestionsCollectionData[]>([])
    const [solvedQuestions, setSolvedQuestions] = React.useState<QuestionsCollectionData[]>([])
    const [isOpenFormDialog, setOpenFormDialog] = React.useState(false)
    const [bookMarkId, setBookMarkId] = React.useState<string[]>([])

    React.useEffect(() => {
        getQuestion()
            .then((question) => {
                setUnSolvedQuestions(question[0])
                setSolvedQuestions(question[1])
            })
            .catch((error) => console.log(error))
        getBookMarkQuestionId(userState.userId)
            .then((idList) => {
                setBookMarkId(idList)
            })
            .catch((error) => console.log(error))
    }, [])

    const handleClickOpen = () => {
        setOpenFormDialog(true)
    }

    return (
        <div>
            <Appbar />
            <Toolbar />
            <Box sx={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                <div style={{ width: "40%", height: "720px", overflowY: "scroll" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="h5" sx={{ mt: "7px" }}>
                            未解決の質問
                        </Typography>
                        <TagFilter />
                    </div>
                    <Box>
                        {unSolvedQuestions.map((value, index) => (
                            <CardDetail
                                key={index}
                                value={value}
                                bookMarkId={bookMarkId}
                                setUnSolvedQuestions={setUnSolvedQuestions}
                                setSolvedQuestions={setSolvedQuestions}
                            />
                        ))}
                    </Box>
                </div>
                <div style={{ width: "40%", height: "720px", overflowY: "scroll" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="h5" sx={{ mt: "7px" }}>
                            解決済みの質問
                        </Typography>
                        <TagFilter />
                    </div>
                    <Box>
                        {solvedQuestions.map((value, index) => (
                            <CardDetail
                                key={index}
                                value={value}
                                bookMarkId={bookMarkId}
                                setUnSolvedQuestions={setUnSolvedQuestions}
                                setSolvedQuestions={setSolvedQuestions}
                            />
                        ))}
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
                    bottom: "10px",
                    right: "10px",
                    ":hover": { bgcolor: "#777777" },
                }}
            >
                <Icon icon="clarity:note-edit-line" />
            </IconButton>
            <PostColumn
                isOpenFormDialog={isOpenFormDialog}
                setOpenFormDialog={setOpenFormDialog}
                setUnSolvedQuestions={setUnSolvedQuestions}
            />
        </div>
    )
}
