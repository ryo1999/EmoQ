import React from "react"
import { tags } from "@/mock/mock"
import { Theme, useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import IconButton from "@mui/material/IconButton"
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
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon"

export default function PostColumn() {
    const theme = useTheme()
    const [parameter, setParameter] = React.useState<number | number[] | string>(50)
    const [question, setQuestion] = React.useState("")
    const [tag, setTag] = React.useState<string[]>([])
    const [emotion, setEmotion] = React.useState("")

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: "200px",
                width: "200px",
                overflow: "auto",
            },
        },
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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setParameter(event.target.value === "" ? "" : Number(event.target.value))
    }

    const handleQuestionChange = (value: string) => {
        setQuestion(value)
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
        console.log(value)
        if (tag.length <= 2) {
            setTag(typeof value === "string" ? value.split(",") : value)
        } else {
            if (event.target.value.length > tag.length) { //何もしない
            } else {
                setTag(typeof value === "string" ? value.split(",") : value)
            }
        }
    }

    return (
        <>
            <Card sx={{ width: "100%", maxWidth: "800px", mt: "10px" }}>
                <CardContent sx={{ display: "flex" }}>
                    <Box
                        component="form"
                        sx={{
                            "& > :not(style)": { width: "450px" },
                            marginRight: "10px",
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="outlined-basic"
                            multiline
                            defaultValue={question}
                            label="質問内容"
                            onChange={(e) => handleQuestionChange(e.target.value)}
                            variant="outlined"
                        />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton sx={{ marginRight: "10px" }}>
                            <InsertEmoticonIcon />
                        </IconButton>
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
                            onChange={handleInputChange}
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
                </CardContent>
                <Typography variant="caption" sx={{marginLeft:"15px"}}>タグは3つまで選択可能</Typography>
                <Box sx={{ margin: "5px 0px 10px 15px" }}>
                    <FormControl sx={{ minWidth: "80px" }} size="small">
                        <InputLabel id="demo-simple-select-label">タグ</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={tag}
                            onChange={handleTagChange}
                            multiple
                            MenuProps={MenuProps}
                            renderValue={(selected) => (
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                    {selected.map((value: string) => (
                                        <Chip key={value} label={value} sx={{bgcolor:"aqua"}}/>
                                    ))}
                                </Box>
                            )}
                        >
                            {tags.map((tagValue) => (
                                <MenuItem style={getStyles(tagValue, tag, theme)} value={tagValue} key={tagValue}>
                                    {tagValue}
                                </MenuItem>
                            ))}
                            <MenuItem>新しく作る</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Card>
            <Button type="submit" variant="contained" sx={{ mt: "10px", mb: "20px", width: "100%", maxWidth: "800px" }}>
                投稿
            </Button>
        </>
    )
}
