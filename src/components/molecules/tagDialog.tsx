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
    const [tagValidation, setTagValidation] = React.useState(true)
    const [errorMesseage, setErrorMeeseage] = React.useState("必ず入力してください")

    React.useEffect(() => {
        if (newTag === "") {
            setErrorMeeseage("必ず入力してください")
            setTagValidation(true)
        }else if(tagList.includes(newTag)){
            setErrorMeeseage("すでに存在します")
            setTagValidation(true)
        }else{
            setTagValidation(false)
        }
    }, [newTag])

    const handleCreateTag = (value: string) => {
        setNewTag(value)
    }

    const handleTagClose = () => {
        setOpenTagDialog(false)
        setTimeout(() => {
            setErrorMeeseage("必ず入力してください")
            setTagValidation(true)
        },500)
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
                        maxHeight: "300px",
                        paddingTop:"10px",
                    }}
                    noValidate
                    autoComplete="name"
                >
                    <TextField
                        required
                        id="outlined-basic"
                        variant="outlined"
                        multiline
                        label="タグ名"
                        helperText={tagValidation ? errorMesseage : ""}
                        onChange={(e) => handleCreateTag(e.target.value)}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleTagClose}>キャンセル</Button>
                <Button disabled={tagValidation} onClick={handleTagSave}>
                    保存
                </Button>
            </DialogActions>
        </Dialog>
    )
})

export default TagDialog
