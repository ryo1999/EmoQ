import React from "react"
import Appbar from "@/components/molecules/appbar"
import TagFilter from "@/components/atoms/tagFilterButton"
import { Box } from "@mui/material"
import Toolbar from "@mui/material/Toolbar"
import CardDetail from "@/components/molecules/carddetail"
import { getQuestion } from "./api/questionApi"
import {QuestionsCollectionData} from "@/utils/types"

export default function Home() {
    const [questions, setQuestions] = React.useState<QuestionsCollectionData[]>([])

    React.useEffect(() => {
        getQuestion()
            .then((question) => {
                setQuestions(question)
            })
            .catch((e) => console.log(e))
    }, [])

    return (
        <>
            <Appbar />
            <Toolbar />
            <div style={{ margin: "0 auto", maxWidth: "800px" }}>
                <TagFilter />
                <Box component="div">
                    {questions.map((value,index) => (
                        <CardDetail key={index} value={value} />
                    ))}
                </Box>
            </div>
        </>
    )
}