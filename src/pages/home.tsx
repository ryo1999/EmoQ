import React from "react"
import { questions } from "@/mock/mock"
import Appbar from "@/components/molecules/appbar"
import PostColumn from "@/components/molecules/postcolumn"
import { Box } from "@mui/material"
import Toolbar from "@mui/material/Toolbar"
import CardDetail from "@/components/molecules/carddetail"

export default function Home() {
    return (
        <div style={{marginBottom:"100px"}}>
            <Appbar />
            <Toolbar />
            <Box component="div" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <PostColumn />
                {questions.map((value, index) => (
                    <CardDetail key={`card${index}`} value={value} index={index} />
                ))}
            </Box>
        </div>
    )
}
