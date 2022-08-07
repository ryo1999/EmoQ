import React from "react"
import { questions } from "@/mock/mock"
import Appbar from "@/components/molecules/appbar"
import { Box } from "@mui/material"
import Toolbar from "@mui/material/Toolbar"

import CardDetail from "@/components/molecules/carddetail"

export default function Home() {

    return (
        <div>
            <Appbar />
            <Toolbar />
            <Box component="div" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {questions.map((value, index) =>
                    <CardDetail value={value} index={index}/>
                )}
            </Box>
        </div>
    )
}
