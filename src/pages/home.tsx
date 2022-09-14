import React from "react"
import { useRouter } from "next/router"
import PostColumn from "@/components/molecules/postcolumn"
import Appbar from "@/components/molecules/appbar"
import CardDetail from "@/components/molecules/carddetail"
import TagFilter from "@/components/molecules/tagFilter"
import { Box } from "@mui/material"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import { Icon } from "@iconify/react"
import { useRecoilState, useRecoilValue } from "recoil"
import { selectedSort } from "@/store/selectedSort"
import { solvedQuestions } from "@/store/solvedQuestions"
import { unSolvedQuestions } from "@/store/unSolvedQuestions"
import { getQuestion } from "./api/questionApi"
import { auth } from "@/firebase"

export default function Home() {
    const router = useRouter()
    const sortText = useRecoilValue(selectedSort)
    const [unSolvedQuestionList, setUnSolvedQuestions] = useRecoilState(unSolvedQuestions)
    const [solvedQuestionList, setSolvedQuestions] = useRecoilState(solvedQuestions)
    const [isOpenFormDialog, setOpenFormDialog] = React.useState(false)

    React.useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                getQuestion(sortText)
                    .then((question) => {
                        setUnSolvedQuestions(question[0])
                        setSolvedQuestions(question[1])
                    })
                    .catch((error) => console.error(error))
            } else {
                router.push("/")
            }
        })
    }, [])


    const handleClickOpen = () => {
        setOpenFormDialog(true)
    }

    return (
        <div>
            <Appbar />
            <Toolbar />
            <TagFilter />
            <Box sx={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                <div style={{ width: "40%" }}>
                    <div style={{marginBottom:"10px"}}>
                        <Typography variant="h5">
                            未解決
                        </Typography>
                    </div>
                    <Box sx={{ height: "635px", overflowY: "scroll" }}>
                        {unSolvedQuestionList.map((questionInfo, index) => {
                            return <CardDetail key={index} questionInfo={questionInfo} />
                        })}
                    </Box>
                </div>
                <div style={{ width: "40%" }}>
                    <div style={{marginBottom:"10px"}}>
                        <Typography variant="h5">
                            解決済み
                        </Typography>
                    </div>
                    <Box sx={{ height: "635px", overflowY: "scroll" }}>
                        {solvedQuestionList.map((questionInfo, index) => (
                            <CardDetail key={index} questionInfo={questionInfo} />
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
