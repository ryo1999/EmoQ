import React from "react"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { useRecoilValue } from "recoil"
import { userInfo } from "@/store/userInfo"
import { addTag } from "@/pages/api/tagApi"
import { getTag } from "@/pages/api/tagApi"
import { useValidation } from "@/hooks/useValidation"

type TagDialogProps = {
    tagList: string[]
    isOpenTagDialog: boolean
    setOpenTagDialog: React.Dispatch<boolean>
    setTagList: React.Dispatch<string[]>
}

const TagDialog = React.memo((props: TagDialogProps) => {
    const { tagList, isOpenTagDialog, setOpenTagDialog, setTagList } = props
    const userState = useRecoilValue(userInfo)
    const { valueText, setValueText, isValidated, errorMessage, textValidation } = useValidation(tagList)

    const handleCreateTag = (value: string) => {
        setValueText(value)
    }

    const handleTagClose = () => {
        setOpenTagDialog(false)
    }

    const handleTagSave = async () => {
        setOpenTagDialog(false)
        await addTag(valueText,userState.groupId)
        setTagList(await getTag(userState.groupId))
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
                <Button disabled={!textValidation} onClick={handleTagSave}>
                    保存
                </Button>
            </DialogActions>
        </Dialog>
    )
})

export default TagDialog
