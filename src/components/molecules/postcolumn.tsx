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
import Input from "@mui/material/Input"
import TextField from "@mui/material/TextField"
import { FormHelperText } from "@mui/material"
import Typography from "@mui/material/Typography"
import Chip from "@mui/material/Chip"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import CloseIcon from "@mui/icons-material/Close"
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
            maxHeight: "200px",
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
    const [parameter, setParameter] = React.useState<number | number[] | string>(0)
    const [question, setQuestion] = React.useState("")
    const [tag, setTag] = React.useState<string[]>([])
    const [emotion, setEmotion] = React.useState("焦り")
    const [tagList, setTagList] = React.useState<string[]>([])
    const [questionValidation, setQuestionValidation] = React.useState(true)
    const [questionErrorMesseage, setQuestionErrorMesseage] = React.useState("必ず記入してください")
    const [tagExist, setTagExist] = React.useState(true)
    const [tagErrorMesseage, setTagErrorMesseage] = React.useState("最低1つは選択してください")

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
        if (tag.length == 0) {
            setTagErrorMesseage("最低1つは選択してください")
            setTagExist(true)
        } else {
            setTagExist(false)
        }
    }, [tag])

    React.useEffect(() => {
        if (question === "") {
            setQuestionErrorMesseage("必ず記入してください")
            setQuestionValidation(true)
        } else if (questionValidation === true) {
            setQuestionValidation(false)
        }
    }, [question])

    const returnTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }
    const initializeState = () => {
        setParameter(0)
        setQuestion("")
        setTag([])
        setEmotion("焦り")
    }

    const getStyles = (name: string, tag: string | string[], theme: Theme) => {
        return {
            fontWeight:
                tag.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
        }
    }

    const handleSliderChange = (event: Event, value: number | number[]) => {
        setParameter(value)
    }

    const handleBlur = () => {
        if (parameter < 0) {
            setParameter(0)
        } else if (parameter > 100) {
            setParameter(100)
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
        await addQuestion(userState.userId, userState.userName, question, tag, new Date(), emotion, parameter, false)
        getQuestion()
            .then((Q) => {
                setUnSolvedQuestions(Q[0])
            })
            .catch((error) => console.log(error))
        initializeState()
        returnTop()
    }
    const handleCancelClick = () => {
        setOpenFormDialog(false)
        initializeState()
    }

    return (
        <>
            <TagDialog
                tagList={tagList}
                isOpenTagDialog={isOpenTagDialog}
                setOpenTagDialog={setOpenTagDialog}
                setTagList={setTagList}
            />
            <Dialog
                TransitionComponent={Transition}
                fullScreen
                open={isOpenFormDialog}
                onClose={() => setOpenFormDialog(false)}
            >
                <AppBar sx={{ position: "relative" }}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleCancelClick} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: "10px", flex: 1 }} variant="h6" component="div">
                            投稿フォーム
                        </Typography>
                        <Button
                            disabled={questionValidation || tagExist}
                            color="inherit"
                            onClick={handleSubmitClick}
                            sx={{ fontSize: "17px" }}
                        >
                            投稿
                        </Button>
                    </Toolbar>
                </AppBar>
                <DialogContent sx={{ maxWidth: "350px", textAlign: "center", m: "20px auto 0 auto", p: "0px" }}>
                    <Typography variant="caption">今の感情は？</Typography>
                    <StampList emotion={emotion} setEmotion={setEmotion} setParameter={setParameter} />
                    <Box sx={{ display: "flex", justifyContent: "center", mb: "20px" }}>
                        <Typography variant="caption" sx={{ mt: "5px", mr: "20px" }}>
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
                            sx={{ width: "200px", mr: "20px" }}
                        />
                        <Input
                            value={parameter}
                            size="small"
                            onChange={(e) => setParameter(e.target.value === "" ? "" : Number(e.target.value))}
                            onBlur={handleBlur}
                            inputProps={{
                                step: 10,
                                min: 0,
                                max: 100,
                                type: "number",
                            }}
                            sx={{ width: "50px" }}
                        />
                    </Box>
                    <Box
                        component="form"
                        sx={{
                            "& > :not(style)": { width: "300px" },
                            mb: "20px",
                            maxHeight: "360px",
                            overflowY: "auto",
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="outlined-basic"
                            multiline
                            required
                            value={question}
                            label="質問内容"
                            helperText={questionValidation ? questionErrorMesseage : ""}
                            onChange={(e) => setQuestion(e.target.value)}
                            variant="outlined"
                            sx={{ mt: "20px" }}
                        />
                    </Box>
                    <Typography variant="caption">タグは3つまで選択可能</Typography>
                    <Box sx={{ m: "10px 0px 10px 0px" }}>
                        <FormControl required sx={{ minWidth: "80px" }} size="small">
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
                                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                        {selected.map((value: string) => (
                                            <Chip
                                                key={value}
                                                label={value}
                                                sx={{ bgcolor: "aqua", maxWidth: "250px" }}
                                            />
                                        ))}
                                    </Box>
                                )}
                            >
                                {tagList.map((tagValue) => (
                                    <MenuItem style={getStyles(tagValue, tag, theme)} value={tagValue} key={tagValue}>
                                        {tagValue}
                                    </MenuItem>
                                ))}
                                <MenuItem onClick={handleClickTagOpen}>新しく作る</MenuItem>
                            </Select>
                            <FormHelperText>{tagExist ? tagErrorMesseage : ""}</FormHelperText>
                        </FormControl>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    )
}
