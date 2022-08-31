import React from "react"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { addTag } from "@/pages/api/tagApi"
import { getTag } from "@/pages/api/tagApi"
import { useSample }from "@/utils/useSample"

type TagDialogProps = {
    tagList: string[]
    isOpenTagDialog: boolean
    setOpenTagDialog: React.Dispatch<boolean>
    setTagList: React.Dispatch<string[]>
}

const TagDialog = React.memo((props: TagDialogProps) => {
    const { tagList, isOpenTagDialog, setOpenTagDialog, setTagList } = props
    const { valueText, setValueText, isValidated, errorMessage, isButton } = useSample(tagList)

    const handleCreateTag = (value: string) => {
        setValueText(value)
    }

    const handleTagClose = () => {
        setOpenTagDialog(false)
    }

    const handleTagSave = async () => {
        setOpenTagDialog(false)
        await addTag(valueText)
        setTagList(await getTag())
    }

    return (
        <Dialog open={isOpenTagDialog} onClose={handleTagClose}>
            <DialogTitle>新しいタグを作成</DialogTitle>
            <DialogContent>
                <Box
                    component="form"
                    sx={{
                        "& > :not(style)": { width: "400px" },
                        maxHeight: "300px",
                        paddingTop: "10px",
                    }}
                    noValidate
                    autoComplete="name"
                >
                    <TextField
                        error={!isValidated}
                        id="outlined-basic"
                        variant="outlined"
                        multiline
                        label="タグ名"
                        helperText={isValidated ? "" : errorMessage}
                        onChange={(e) => handleCreateTag(e.target.value)}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleTagClose}>キャンセル</Button>
                <Button disabled={!isButton} onClick={handleTagSave}>
                    保存
                </Button>
            </DialogActions>
        </Dialog>
    )
})

export default TagDialog
