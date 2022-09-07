import React from "react"
import Button from "@mui/material/Button"
import { Box } from "@mui/material"
import SortIcon from "@mui/icons-material/Sort"
import Typography from "@mui/material/Typography"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"

export default function TagFilter() {
    const [conditions, setConditions] = React.useState("")

    const handleChange = (event: SelectChangeEvent) => {
        setConditions(event.target.value)
    }
    return (
        <div style={{ marginLeft:"70px", display:"flex", alignItems:"center"}}>
            <Box sx={{display:"flex", alignItems:"center"}}>
                <SortIcon />
                <Typography variant="body2">並び替え：</Typography>
                <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={conditions}
                        defaultValue="投稿日時が新しい順"
                        onChange={handleChange}
                    >
                        <MenuItem value="new">投稿日時の新しい順</MenuItem>
                        <MenuItem value="old">投稿日時の古い順</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box>
            <Button
                variant="outlined"
                sx={{ width: "100px", height: "30px", mt: "5px", ml: "70px", bgcolor: "white", color: "black" }}
            >
                絞りこみ
            </Button>
            </Box>
        </div>
    )
}
