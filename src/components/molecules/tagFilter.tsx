import React from "react"
import Button from "@mui/material/Button"
import { Box } from "@mui/material"

export default function TagFilter() {
    return (
        // <Box sx={{ textAlign: "end" }}>
        <Button variant="outlined" sx={{ width: "100px", height:"30px", mt: "5px", ml:"70px", bgcolor: "white", color: "black" }}>
            絞りこみ
        </Button>
        // </Box>
    )
}
