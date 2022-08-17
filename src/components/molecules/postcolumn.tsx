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
import { getTag } from "@/pages/api/tagApi"
import { addQuestion, getQuestion } from "@/pages/api/questionApi"
import { QuestionsCollectionData } from "@/utils/types"

type PostColumnProps = {
    isOpenFormDialog: boolean
    setOpenFormDialog: React.Dispatch<boolean>
    setQuestions: React.Dispatch<QuestionsCollectionData[]>
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
    const { isOpenFormDialog, setOpenFormDialog, setQuestions } = props
    const theme = useTheme()
    const [isOpenTagDialog, setOpenTagDialog] = React.useState(false)
    const [parameter, setParameter] = React.useState<number | number[] | string>(50)
    const [question, setQuestion] = React.useState("")
    const [tag, setTag] = React.useState<string[]>([])
    const [emotion, setEmotion] = React.useState("普通")
    const [tagList, setTagList] = React.useState<string[]>([])

    React.useEffect(() => {
        getTag()
            .then((data) => {
                setTagList(data)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])

    const returnTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }
    const initializeState = () => {
        setParameter(50)
        setQuestion("")
        setTag([])
        setEmotion("普通")
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
                //何もしない
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
        //データベースに保存する(ユーザーidと名前が必要)
        if (emotion === "焦り" || emotion === "絶望") {
            await addQuestion("0fkyo9tTHGG7w66HC3CU", "大月凌", question, tag, new Date(), emotion, parameter)
        } else {
            await addQuestion("0fkyo9tTHGG7w66HC3CU", "大月凌", question, tag, new Date(), emotion, "")
        }
        getQuestion()
            .then((Q) => {
                setQuestions(Q)
            })
            .catch((e) => console.log(e))
        initializeState()
        returnTop()
    }
    const handleCancelClick = () => {
        setOpenFormDialog(false)
        initializeState()
    }

    return (
        <>
            <TagDialog isOpenTagDialog={isOpenTagDialog} setOpenTagDialog={setOpenTagDialog} setTagList={setTagList} />
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
                        <Typography sx={{ marginLeft: "10px", flex: 1 }} variant="h6" component="div">
                            投稿フォーム
                        </Typography>
                        <Button color="inherit" onClick={handleSubmitClick} sx={{ fontSize: "17px" }}>
                            投稿
                        </Button>
                    </Toolbar>
                </AppBar>
                <DialogContent sx={{ maxWidth: "350px", textAlign: "center", margin: "0 auto" }}>
                    <Box
                        component="form"
                        sx={{
                            "& > :not(style)": { width: "300px" },
                            marginBottom: "20px",
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
                            onChange={(e) => setQuestion(e.target.value)}
                            variant="outlined"
                            sx={{ marginTop: "20px", maxHeight: "360px", overflow: "auto" }}
                        />
                    </Box>
                    <Typography variant="caption" sx={{ marginLeft: "5px" }}>
                        焦り、絶望にはパラメータが存在します
                    </Typography>
                    <StampList emotion={emotion} setEmotion={setEmotion} setParameter={setParameter} />
                    <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                        {(emotion == "焦り" || emotion == "絶望") && (
                            <>
                                <Slider
                                    value={typeof parameter === "number" ? parameter : 0}
                                    valueLabelDisplay="auto"
                                    marks
                                    onChange={handleSliderChange}
                                    step={10}
                                    min={0}
                                    max={100}
                                    sx={{ width: "200px", marginRight: "20px" }}
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
                            </>
                        )}
                    </Box>
                    <Typography variant="caption">タグは3つまで選択可能</Typography>
                    <Box sx={{ margin: "10px 0px 10px 0px" }}>
                        <FormControl sx={{ minWidth: "80px" }} size="small">
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
                        </FormControl>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    )
}
