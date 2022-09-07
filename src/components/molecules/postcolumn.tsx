import React from "react"
import TagDialog from "./tagDialog"
import StampList from "./stampList"
import { Theme, useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import Slider from "@mui/material/Slider"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { FormHelperText, Tooltip } from "@mui/material"
import Typography from "@mui/material/Typography"
import Chip from "@mui/material/Chip"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import CloseIcon from "@mui/icons-material/Close"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import Slide from "@mui/material/Slide"
import { TransitionProps } from "@mui/material/transitions"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import { useRecoilValue } from "recoil"
import { userInfo } from "@/store/userInfo"
import { getTag } from "@/pages/api/tagApi"
import { addQuestion, getQuestion } from "@/pages/api/questionApi"
import { QuestionsCollectionData } from "@/utils/types"

type PostColumnProps = {
    isOpenFormDialog: boolean
    setOpenFormDialog: React.Dispatch<boolean>
    setUnSolvedQuestions: React.Dispatch<QuestionsCollectionData[]>
}

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: "250px",
            overflow: "auto",
        },
    },
}
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />
})

export default function PostColumn(props: PostColumnProps) {
    const { isOpenFormDialog, setOpenFormDialog, setUnSolvedQuestions } = props
    const theme = useTheme()
    const userState = useRecoilValue(userInfo)
    const [isOpenTagDialog, setOpenTagDialog] = React.useState(false)
    const [parameter, setParameter] = React.useState<number | number[]>(0)
    const [question, setQuestion] = React.useState("")
    const [tag, setTag] = React.useState<string[]>([])
    const [emotion, setEmotion] = React.useState("焦り")
    const [tagList, setTagList] = React.useState<string[]>([])
    const [questionValidation, setQuestionValidation] = React.useState(0)
    const [questionErrorMessage, setQuestionErrorMessage] = React.useState("")
    const [tagExist, setTagExist] = React.useState(0)
    const [tagErrorMessage, setTagErrorMessage] = React.useState("")

    React.useEffect(() => {
        getTag()
            .then((data) => {
                setTagList(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    React.useEffect(() => {
        if (tagExist === 0) {
            setTagExist(1)
        } else if (tag.length === 0) {
            setTagErrorMessage("最低1つは選択してください")
            setTagExist(2)
        } else if (tagExist === 1 || tagExist === 2) {
            setTagExist(3)
        }
    }, [tag])

    React.useEffect(() => {
        if (questionValidation === 0) {
            setQuestionValidation(1)
        } else if (question === "" || !question.match(/\S/g)) {
            setQuestionErrorMessage("必須項目です")
            setQuestionValidation(2)
        } else if (question[0] === " " || question[0] === "　") {
            setQuestionErrorMessage("空白で始めることはできません")
            setQuestionValidation(2)
        } else if (question[question.length - 1] === " " || question[question.length - 1] === "　") {
            setQuestionErrorMessage("空白で終わることはできません")
            setQuestionValidation(2)
        } else if (questionValidation === 1 || questionValidation === 2) {
            setQuestionValidation(3)
        }
    }, [question])

    const getStyles = (name: string, tag: string | string[], theme: Theme) => {
        return {
            fontWeight:
                tag.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
        }
    }

    const handleSliderChange = (event: Event, value: number | number[]) => {
        setParameter(value)
    }

    const handleClickUp = () => {
        if (typeof parameter == "number") {
            if (parameter + 10 > 100) {
                setParameter(100)
            } else {
                setParameter(parameter + 10)
            }
        }
    }

    const handleClickDown = () => {
        if (typeof parameter == "number") {
            if (parameter - 10 < 0) {
                setParameter(0)
            } else {
                setParameter(parameter - 10)
            }
        }
    }

    const handleTagChange = (event: SelectChangeEvent<typeof tag>) => {
        const {
            target: { value },
        } = event
        if (tag.length <= 2) {
            setTag(typeof value === "string" ? value.split(",") : value)
        } else {
            if (event.target.value.length > tag.length) {
            } else {
                setTag(typeof value === "string" ? value.split(",") : value)
            }
        }
    }

    const handleClickTagOpen = () => {
        setOpenTagDialog(true)
    }

    const handleSubmitClick = async () => {
        setOpenFormDialog(false)
        try {
            await addQuestion(
                userState.userId,
                userState.userName,
                question,
                tag,
                new Date(),
                emotion,
                parameter,
                false
            )
            const Q = await getQuestion()
            setUnSolvedQuestions(Q[0])
        } catch (error) {
            console.error(error)
        }
    }
    const handleCancelClick = () => {
        setOpenFormDialog(false)
    }

    return (
        <>
            {isOpenTagDialog && (
                <TagDialog
                    tagList={tagList}
                    isOpenTagDialog={isOpenTagDialog}
                    setOpenTagDialog={setOpenTagDialog}
                    setTagList={setTagList}
                />
            )}
            <Dialog
                TransitionComponent={Transition}
                fullScreen
                open={isOpenFormDialog}
                onClose={() => setOpenFormDialog(false)}
                PaperProps={{
                    style: {
                        backgroundColor: "#e2efff",
                    },
                }}
            >
                <AppBar sx={{ position: "relative", bgcolor: "#24292f" }}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleCancelClick} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: "10px", flex: 1 }} variant="h6" component="div">
                            投稿フォーム
                        </Typography>
                        <Button
                            disabled={questionValidation !== 3 || tagExist !== 3}
                            color="inherit"
                            onClick={handleSubmitClick}
                            sx={{ fontSize: "18px", "&:disabled": { color: "#747474" } }}
                        >
                            投稿
                        </Button>
                    </Toolbar>
                </AppBar>
                <DialogContent
                    sx={{ display: "flex", justifyContent: "space-around", textAlign: "center", mt: "50px" }}
                >
                    <div style={{ marginRight: "-100px" }}>
                        <Typography variant="h6">今の感情は？</Typography>
                        <StampList emotion={emotion} setEmotion={setEmotion} />
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: "40px" }}>
                            <Typography variant="h6" sx={{ mr: "30px" }}>
                                緊急度
                            </Typography>
                            <Slider
                                value={typeof parameter === "number" ? parameter : 0}
                                valueLabelDisplay="auto"
                                marks
                                onChange={handleSliderChange}
                                step={10}
                                min={0}
                                max={100}
                                sx={{ width: "200px", color: "black" }}
                            />
                            <Box sx={{ width: "40px", ml: "20px" }}>
                                <IconButton onClick={handleClickUp} sx={{ mb: "-10px", p: "0px" }}>
                                    <ArrowDropUpIcon sx={{ fontSize: "40px" }} />
                                </IconButton>
                                {parameter}
                                <IconButton onClick={handleClickDown} sx={{ mt: "-10px", p: "0px" }}>
                                    <ArrowDropDownIcon sx={{ fontSize: "40px" }} />
                                </IconButton>
                            </Box>
                        </Box>
                        <Typography variant="h6" sx={{ display: "inline" }}>
                            タグを選択
                        </Typography>
                        <Typography variant="caption">(最大3個)</Typography>
                        <Box sx={{ m: "10px 0px 10px 0px" }}>
                            <FormControl required error={tagExist === 2} sx={{ width: "300px" }} size="small">
                                <InputLabel id="simple-select-label">タグ</InputLabel>
                                <Select
                                    labelId="simple-select-label"
                                    id="simple-select"
                                    value={tag}
                                    label="タグ"
                                    onChange={handleTagChange}
                                    multiple
                                    MenuProps={MenuProps}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.0 }}>
                                            {selected.map((value: string) => (
                                                <Tooltip key={value} title={value} placement="top">
                                                    <Chip
                                                        key={value}
                                                        label={value}
                                                        sx={{
                                                            fontSize: "18px",
                                                            color: "white",
                                                            bgcolor: "#24292f",
                                                            maxWidth: "250px",
                                                        }}
                                                    />
                                                </Tooltip>
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {tagList.map((tagValue) => (
                                        <MenuItem
                                            style={getStyles(tagValue, tag, theme)}
                                            value={tagValue}
                                            key={tagValue}
                                        >
                                            {tagValue}
                                        </MenuItem>
                                    ))}
                                    <MenuItem onClick={handleClickTagOpen}>新しく作る</MenuItem>
                                </Select>
                                <FormHelperText>{tagExist === 2 ? tagErrorMessage : ""}</FormHelperText>
                            </FormControl>
                        </Box>
                    </div>
                    <div style={{ marginLeft: "-100px" }}>
                        <Typography variant="h6">質問内容</Typography>
                        <Box
                            component="form"
                            sx={{
                                "& > :not(style)": { width: "500px" },
                                mb: "20px",
                                maxHeight: "500px",
                                overflowY: "auto",
                            }}
                            autoComplete="off"
                        >
                            <TextField
                                error={questionValidation === 2}
                                required
                                id="outlined-basic"
                                multiline
                                value={question}
                                InputProps={{ style: { fontSize: "20px" } }}
                                label="質問内容"
                                helperText={questionValidation === 2 ? questionErrorMessage : ""}
                                onChange={(e) => setQuestion(e.target.value)}
                                variant="outlined"
                                sx={{ mt: "20px" }}
                            />
                        </Box>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
