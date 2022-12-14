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
import useMediaQuery from "@mui/material/useMediaQuery"
import { useRecoilState, useRecoilValue } from "recoil"
import { selectedSort } from "@/store/selectedSort"
import { userInfo } from "@/store/userInfo"
import { getTag } from "@/pages/api/tagApi"
import { addQuestion, getQuestion } from "@/pages/api/questionApi"
import { QuestionsCollectionData } from "@/utils/types"
import { usePostTagValidation, useValidation } from "@/hooks/useValidation"

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

const PostColumn = React.memo((props: PostColumnProps) => {
    const { isOpenFormDialog, setOpenFormDialog, setUnSolvedQuestions } = props
    const theme = useTheme()
    const [sortText, setSortText] = useRecoilState(selectedSort)
    const userState = useRecoilValue(userInfo)
    const [isOpenTagDialog, setOpenTagDialog] = React.useState(false)
    const [parameter, setParameter] = React.useState<number | number[]>(0)
    const [emotion, setEmotion] = React.useState("??????")
    const [tagList, setTagList] = React.useState<string[]>([])
    const { valueText, setValueText, isValidated, errorMessage, textValidation } = useValidation()
    const { tag, setTag, isTagValidated, errorTagMessage, tagValidation } = usePostTagValidation()
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")

    React.useEffect(() => {
        getTag(userState.groupId)
            .then((data) => {
                setTagList(data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

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
                //???????????????
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
        setSortText("new")
        try {
            await addQuestion(
                userState.userId,
                userState.userName,
                valueText,
                tag,
                new Date(),
                emotion,
                parameter,
                false,
                userState.groupId
            )
            const Q = await getQuestion("new", userState.groupId)
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
                            ??????????????????
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent
                    sx={{ display: "flex", justifyContent: "space-around", textAlign: "center", pt: "50px", bgcolor:(prefersDarkMode ? "black" : "#e2efff") }}
                >
                    <div style={{ padding:"20px", marginRight: "-100px", backgroundColor:(prefersDarkMode ? "gray" : "white"), height:window.innerHeight*0.74, borderRadius:"20px" }}>
                        <Typography sx={{ mb: "20px" }} variant="h6">
                            ??????????????????
                        </Typography>
                        <StampList emotion={emotion} setEmotion={setEmotion} />
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: "40px" }}>
                            <Typography variant="h6" sx={{ mr: "30px" }}>
                                ?????????
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
                            ???????????????
                        </Typography>
                        <Typography variant="caption">(??????3???)</Typography>
                        <Box sx={{ m: "10px 0px 10px 0px" }}>
                            <FormControl required error={!isTagValidated} sx={{ width: "350px" }} size="small">
                                <InputLabel>??????</InputLabel>
                                <Select
                                    labelId="simple-select-label"
                                    value={tag}
                                    label="??????"
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
                                                            fontWeight: "bold",
                                                            fontSize: "18px",
                                                            color: "white",
                                                            bgcolor: "#24292f",
                                                            maxWidth: "350px",
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
                                    <MenuItem onClick={handleClickTagOpen}>???????????????</MenuItem>
                                </Select>
                                <FormHelperText>{isTagValidated ? "" : errorTagMessage}</FormHelperText>
                            </FormControl>
                        </Box>
                    </div>
                    <div style={{ marginLeft: "-100px", backgroundColor:(prefersDarkMode ? "gray" : "white"), height:window.innerHeight*0.74, padding:"20px", borderRadius:"20px" }}>
                        <Typography variant="h6" >????????????*</Typography>
                        <Box
                            component="form"
                            sx={{
                                "& > :not(style)": { width: "500px" },
                                mb: "20px",
                            }}
                            autoComplete="off"
                        >
                            <TextField
                                error={!isValidated}
                                multiline
                                rows={13}
                                value={valueText}
                                InputProps={{ style: { fontSize: "20px" } }}
                                label="??????"
                                helperText={isValidated ? "" : errorMessage}
                                onChange={(e) => setValueText(e.target.value)}
                                variant="outlined"
                                sx={{ mt: "20px" }}
                            />
                        </Box>
                        <Box>
                            <Button
                                variant="contained"
                                disabled={!(textValidation && tagValidation)}
                                onClick={handleSubmitClick}
                                sx={{
                                    fontSize: "18px",
                                    width: "100%",
                                    color: "white",
                                    bgcolor: "#24292f",
                                    ":hover": { bgcolor: "#555555" },
                                }}
                            >
                                ??????
                            </Button>
                        </Box>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
})

export default PostColumn