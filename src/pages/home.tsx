import React from "react"
import { questions } from "@/mock/mock"
import Appbar from "@/components/molecules/appbar"
import TagFilter from "@/components/atoms/tagFilterButton"
import { Box } from "@mui/material"
import Toolbar from "@mui/material/Toolbar"
import CardDetail from "@/components/molecules/carddetail"

export default function Home() {
    return (
        <>
            <Appbar />
            <Toolbar />
            <div style={{ margin:"0 auto", maxWidth:"800px" }}>
                <TagFilter />
                <Box component="div">
                    {questions.map((value, index) => (
                        <CardDetail key={`card${index}`} value={value} index={index} />
                    ))}
                </Box>
            </div>
        </>
    )
}
