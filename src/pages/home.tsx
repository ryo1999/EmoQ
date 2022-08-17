import React from "react"
import PostColumn from "@/components/molecules/postcolumn"
import Appbar from "@/components/molecules/appbar"
import TagFilter from "@/components/atoms/tagFilterButton"
import { Box } from "@mui/material"
import Toolbar from "@mui/material/Toolbar"
import CardDetail from "@/components/molecules/carddetail"
import IconButton from "@mui/material/IconButton"
import { Icon } from "@iconify/react"
import { getQuestion } from "./api/questionApi"
import { QuestionsCollectionData } from "@/utils/types"

export default function Home() {
    const [questions, setQuestions] = React.useState<QuestionsCollectionData[]>([])
    const [isOpenFormDialog, setOpenFormDialog] = React.useState(false)

    React.useEffect(() => {
        getQuestion()
            .then((question) => {
                setQuestions(question)
            })
            .catch((e) => console.log(e))
    }, [])

    const handleClickOpen = () => {
        setOpenFormDialog(true)
    }

    return (
        <div style={{ marginBottom: "60px" }}>
            <Appbar />
            <Toolbar />
            <div style={{ margin: "0 auto", maxWidth: "800px" }}>
                <TagFilter />
                <Box>
                    {questions.map((value, index) => (
                        <CardDetail key={index} value={value} />
                    ))}
                </Box>
                <IconButton
                    onClick={handleClickOpen}
                    sx={{
                        bgcolor: "black",
                        color: "white",
                        position: "fixed",
                        "@media(max-width: 1024px)": {
                            bottom: "10px",
                            right: " 10px",
                        },
                        bottom: "10px",
                        right: "200px",
                        ":hover": { bgcolor: "#444444" },
                    }}
                >
                    <Icon icon="clarity:note-edit-line" />
                </IconButton>
            </div>
            <PostColumn isOpenFormDialog={isOpenFormDialog} setOpenFormDialog={setOpenFormDialog} setQuestions={setQuestions} />
        </div>
    )
}
