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
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import { getTag } from "@/pages/api/tagApi"

type PostColumnProps = {
    isOpenFormDialog: boolean
    setOpenFormDialog: React.Dispatch<boolean>
}

export default function PostColumn(props: PostColumnProps) {
    const { isOpenFormDialog, setOpenFormDialog } = props
    const theme = useTheme()
    const [isOpenTagDialog, setOpenTagDialog] = React.useState(false)
    const [parameter, setParameter] = React.useState<number | number[] | string>(50)
    const [question, setQuestion] = React.useState("")
    const [tag, setTag] = React.useState<string[]>([])
    const [emotion, setEmotion] = React.useState("普通")
    const [tags, setTags] = React.useState<string[]>([])

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: "200px",
                maxWidth: "300px",
                overflow: "auto",
            },
        },
    }

    React.useEffect(() => {
        getTag()
            .then((data) => {
                setTags(data)
            })
            .catch((e) => {console.log(e)})
    }, [])

    React.useEffect(() => {
        //isOpenFormDialogがopenになったら初期化
        if (isOpenFormDialog == false) {
            //何もしない
        } else {
            setParameter(50)
            setQuestion("")
            setTag([])
            setEmotion("普通")
        }
    }, [isOpenFormDialog])

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

    const handleSubmitClick = () => {
        //データベースに保存して
        setOpenFormDialog(false)
    }
    const handleCancelClick = () => {
        setOpenFormDialog(false)
    }

    return (
        <>
            <TagDialog isOpenTagDialog={isOpenTagDialog} setOpenTagDialog={setOpenTagDialog} />
            <Dialog fullScreen open={isOpenFormDialog} onClose={() => setOpenFormDialog(false)} sx={{ margin: "0px" }}>
                <DialogTitle>質問、感情、タグを入力</DialogTitle>
                <DialogContent sx={{ maxWidth: "350px" }}>
                    <Box
                        component="form"
                        sx={{
                            "& > :not(style)": { width: "280px" },
                            marginBottom: "20px",
                            marginTop: "-20px",
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="outlined-basic"
                            multiline
                            value={question}
                            label="質問内容"
                            onChange={(e) => setQuestion(e.target.value)}
                            variant="outlined"
                            sx={{ marginTop: "20px", maxHeight: "400px", overflow: "auto" }}
                        />
                    </Box>
                    <Typography variant="caption" sx={{ marginLeft: "5px" }}>
                        怒り、焦り、絶望にはパラメータが存在します
                    </Typography>
                    <StampList emotion={emotion} setEmotion={setEmotion} setParameter={setParameter} />
                    <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                        {(emotion == "怒り" || emotion == "焦り" || emotion == "絶望") && (
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
                    <Typography variant="caption" sx={{ marginLeft: "15px" }}>
                        タグは3つまで選択可能
                    </Typography>
                    <Box sx={{ margin: "10px 0px 10px 15px" }}>
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
                                            <Chip key={value} label={value} sx={{ bgcolor: "aqua" }} />
                                        ))}
                                    </Box>
                                )}
                            >
                                {tags.map((tagValue) => (
                                    <MenuItem style={getStyles(tagValue, tag, theme)} value={tagValue} key={tagValue}>
                                        {tagValue}
                                    </MenuItem>
                                ))}
                                <MenuItem onClick={handleClickTagOpen}>新しく作る</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelClick}>キャンセル</Button>
                    <Button onClick={handleSubmitClick}>投稿</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
