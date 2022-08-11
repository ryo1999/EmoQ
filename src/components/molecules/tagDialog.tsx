import React from "react"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"

type TagDialogProps = {
    isOpenTagDialog:boolean
    setOpenTagDialog:React.Dispatch<boolean>
}

export default function TagDialog(props:TagDialogProps){
    const {isOpenTagDialog, setOpenTagDialog} = props
    const [newTag, setNewTag] = React.useState("")

    const handleCreateTag = (value: string) => {
        setNewTag(value)
    }

    const handleTagClose = () => {
        setOpenTagDialog(false)
    }

    const handleTagSave = () => {
        //tagsのデータベースにnewTagを追加する処理を書く
        setOpenTagDialog(false)
    }

    return(
        <Dialog open={isOpenTagDialog} onClose={handleTagClose}>
                    <DialogTitle>新しいタグを作成</DialogTitle>
                    <DialogContent>
                        <Box
                            component="form"
                            sx={{
                                // width:"1000px",
                                "& > :not(style)": { m: 1, width: "300px" },
                            }}
                            noValidate
                            autoComplete="name"
                        >
                            <TextField id="outlined-basic" variant="outlined" onChange={(e) => handleCreateTag(e.target.value)}/>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleTagClose}>キャンセル</Button>
                        <Button onClick={handleTagSave}>保存</Button>
                    </DialogActions>
                </Dialog>
    )
}