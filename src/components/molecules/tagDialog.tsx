import React from "react"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import {addTag} from "@/pages/api/tagApi"
import { getTag } from "@/pages/api/tagApi"

type TagDialogProps = {
    isOpenTagDialog: boolean
    setOpenTagDialog: React.Dispatch<boolean>
    setTags:React.Dispatch<string[]>
}

export default function TagDialog(props: TagDialogProps) {
    const { isOpenTagDialog, setOpenTagDialog, setTags } = props
    const [newTag, setNewTag] = React.useState("")

    const handleCreateTag = (value: string) => {
        setNewTag(value)
    }

    const handleTagClose = () => {
        setOpenTagDialog(false)
    }

    const handleTagSave = async() => {
        setOpenTagDialog(false)
        await addTag(newTag)
        setTags(await getTag())
    }

    return (
        <Dialog open={isOpenTagDialog} onClose={handleTagClose}>
            <DialogTitle>新しいタグを作成</DialogTitle>
            <DialogContent>
                <Box
                    component="form"
                    sx={{
                        maxHeight:"300px"
                    }}
                    noValidate
                    autoComplete="name"
                >
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        multiline
                        onChange={(e) => handleCreateTag(e.target.value)}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleTagClose}>キャンセル</Button>
                <Button onClick={handleTagSave}>保存</Button>
            </DialogActions>
        </Dialog>
    )
}
