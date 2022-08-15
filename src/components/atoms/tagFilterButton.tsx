import React from "react"
import Button from "@mui/material/Button"
import { Box } from "@mui/material"

export default function TagFilter() {
    return (
        <Box sx={{ textAlign: "end" }}>
            <Button variant="outlined" sx={{ width: "100px", marginTop: "5px", bgcolor: "white", color: "black" }}>
                絞りこみ
            </Button>
        </Box>
    )
}
