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

type TagDialogProps = {
    tagList: string[]
    isOpenTagDialog: boolean
    setOpenTagDialog: React.Dispatch<boolean>
    setTagList: React.Dispatch<string[]>
}

const TagDialog = React.memo((props: TagDialogProps) => {
    const { tagList, isOpenTagDialog, setOpenTagDialog, setTagList } = props
    const [newTag, setNewTag] = React.useState("")
    const [tagValidation, setTagValidation] = React.useState(0)
    const [errorMessage, setErrorMessage] = React.useState("")

    React.useEffect(() => {
        if (tagValidation === 0) {
            setTagValidation(1)
        } else if (newTag === "" || !newTag.match(/\S/g)) {
            setErrorMessage("必須項目です")
            setTagValidation(2)
        } else if (tagList.includes(newTag)) {
            setErrorMessage("すでに存在します")
            setTagValidation(2)
        } else if (newTag[0] === " " || newTag[0] === "　") {
            setErrorMessage("空白で始めることはできません")
            setTagValidation(2)
        } else if (newTag[newTag.length - 1] === " " || newTag[newTag.length - 1] === "　") {
            setErrorMessage("空白で終わることはできません")
            setTagValidation(2)
        } else if (tagValidation === 1 || tagValidation === 2) {
            setTagValidation(3)
        }
    }, [newTag])

    const handleCreateTag = (value: string) => {
        setNewTag(value)
    }

    const handleTagClose = () => {
        setOpenTagDialog(false)
        setTimeout(() => {
            setErrorMessage("")
            setTagValidation(0)
        }, 500)
    }

    const handleTagSave = async () => {
        setOpenTagDialog(false)
        await addTag(newTag)
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
                        error={tagValidation === 2}
                        id="outlined-basic"
                        variant="outlined"
                        multiline
                        label="タグ名"
                        helperText={tagValidation === 2 ? errorMessage : ""}
                        onChange={(e) => handleCreateTag(e.target.value)}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleTagClose}>キャンセル</Button>
                <Button disabled={tagValidation !== 3} onClick={handleTagSave}>
                    保存
                </Button>
            </DialogActions>
        </Dialog>
    )
})

export default TagDialog
