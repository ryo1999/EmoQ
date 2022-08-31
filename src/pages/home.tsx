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
import { useSetRecoilState } from "recoil"
import { solvedQuestions } from "@/store/solvedQuestions"
import { unSolvedQuestions } from "@/store/unSolvedQuestions"
import { getQuestion } from "./api/questionApi"

export default function Home() {
    const unSolvedQuestionList = useRecoilValue(unSolvedQuestions)
    const setUnSolvedQuestions = useSetRecoilState(unSolvedQuestions)
    const solvedQuestionList = useRecoilValue(solvedQuestions)
    const setSolvedQuestions = useSetRecoilState(solvedQuestions)
    const [isOpenFormDialog, setOpenFormDialog] = React.useState(false)

    React.useEffect(() => {
        getQuestion()
            .then((question) => {
                setUnSolvedQuestions(question[0])
                setSolvedQuestions(question[1])
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
            <TagFilter />
            <Box sx={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                <div style={{ width: "40%", height: "720px", overflowY: "scroll" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="h5" sx={{ mt: "7px" }}>
                            未解決
                        </Typography>
                    </div>
                    <Box>
                        {unSolvedQuestionList.map((value, index) => (
                            <CardDetail key={index} value={value} />
                        ))}
                    </Box>
                </div>
                <div style={{ width: "40%", height: "720px", overflowY: "scroll" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="h5" sx={{ mt: "7px" }}>
                            解決済み
                        </Typography>
                    </div>
                    <Box>
                        {solvedQuestionList.map((value, index) => (
                            <CardDetail key={index} value={value} />
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
