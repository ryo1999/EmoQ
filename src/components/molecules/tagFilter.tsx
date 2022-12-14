import React from "react"
import { Box, Tooltip } from "@mui/material"
import SortIcon from "@mui/icons-material/Sort"
import FilterListIcon from "@mui/icons-material/FilterList"
import Typography from "@mui/material/Typography"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Chip from "@mui/material/Chip"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { useRecoilState } from "recoil"
import { useRecoilValue } from "recoil"
import { userInfo } from "@/store/userInfo"
import { solvedQuestions } from "@/store/solvedQuestions"
import { unSolvedQuestions } from "@/store/unSolvedQuestions"
import { selectedSort } from "@/store/selectedSort"
import { selectedFilter } from "@/store/selectedFilter"
import { getTag } from "@/pages/api/tagApi"
import { getAllUserName } from "@/pages/api/userApi"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import useMediaQuery from "@mui/material/useMediaQuery"

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: "200px",
            maxWidth: "10px",
        },
    },
}

type TagFilterProps = {
    isOpenFormDialog: boolean
}

const TagFilter = React.memo((props: TagFilterProps) => {
    const { isOpenFormDialog } = props
    const userState = useRecoilValue(userInfo)
    const [sortText, setSortText] = useRecoilState(selectedSort)
    const [unSolvedQuestionList, setUnSolvedQuestions] = useRecoilState(unSolvedQuestions)
    const [solvedQuestionList, setSolvedQuestions] = useRecoilState(solvedQuestions)
    const [filter, setFilter] = useRecoilState(selectedFilter)
    const [tagList, setTagList] = React.useState<string[]>([])
    const [userList, setUserList] = React.useState<string[]>([])
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")

    React.useEffect(() => {
        if (isOpenFormDialog === false) {
            getTag(userState.groupId)
                .then((data) => {
                    setTagList(data)
                })
                .catch((error) => {
                    console.error(error)
                })
            getAllUserName(userState.groupId)
                .then((data) => {
                    setUserList(data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [isOpenFormDialog,userState.groupId])

    const handleSortChange = (event: SelectChangeEvent) => {
        setSortText(event.target.value)
        if (event.target.value === "new") {
            const list = [[...unSolvedQuestionList], [...solvedQuestionList]]
            list[0].sort((a, b) => {
                if (a.time < b.time) {
                    return 1
                }
                if (b.time < a.time) {
                    return -1
                }
                return 0
            })
            list[1].sort((a, b) => {
                if (a.time < b.time) {
                    return 1
                }
                if (b.time < a.time) {
                    return -1
                }
                return 0
            })
            setUnSolvedQuestions(list[0])
            setSolvedQuestions(list[1])
        } else if (event.target.value === "old") {
            const list = [[...unSolvedQuestionList], [...solvedQuestionList]]
            list[0].sort((a, b) => {
                if (a.time < b.time) {
                    return -1
                }
                if (b.time < a.time) {
                    return 1
                }
                return 0
            })
            list[1].sort((a, b) => {
                if (a.time < b.time) {
                    return -1
                }
                if (b.time < a.time) {
                    return 1
                }
                return 0
            })
            setUnSolvedQuestions(list[0])
            setSolvedQuestions(list[1])
        } else if (event.target.value === "emergency") {
            const list = [[...unSolvedQuestionList], [...solvedQuestionList]]
            list[0].sort((a, b) => {
                return b.parameter - a.parameter
            })
            list[1].sort((a, b) => {
                return b.parameter - a.parameter
            })
            setUnSolvedQuestions(list[0])
            setSolvedQuestions(list[1])
        }
    }

    const handleFilterKindChange = (event: SelectChangeEvent<typeof filter.filterKind>) => {
        const {
            target: { value },
        } = event
        if (value === "none") {
            setFilter({ filterKind: "", filterList: [] })
        } else {
            setFilter({ filterKind: value, filterList: [] })
        }
    }

    const handleFilterChange = (event: SelectChangeEvent<typeof filter.filterList>) => {
        const {
            target: { value },
        } = event
        if (value[value.length - 1] === "none") {
            setFilter({ ...filter, filterList: [] })
        } else {
            setFilter(
                typeof value === "string"
                    ? { ...filter, filterList: value.split(",") }
                    : { ...filter, filterList: value }
            )
        }
    }

    const handleClickDelete = (value: string) => {
        const list = filter.filterList.filter((word) => word.match(value) == null)
        setFilter({ ...filter, filterList: list })
    }

    return (
        <div style={{ margin: "10px 0px 10px 70px", display: "flex", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center", mr: "50px" }}>
                <SortIcon />
                <Typography variant="body2">???????????????</Typography>
                <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                    <Select value={sortText === undefined ? "new" : sortText} onChange={handleSortChange}>
                        <MenuItem value="new">???????????????????????????</MenuItem>
                        <MenuItem value="old">????????????????????????</MenuItem>
                        <MenuItem value="emergency">????????????</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mr: "50px" }}>
                <FilterListIcon />
                <Typography variant="body2">????????????</Typography>
                <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                    <Select value={filter.filterKind} onChange={handleFilterKindChange}>
                        <MenuItem value="none">?????????????????????</MenuItem>
                        <MenuItem value="??????">??????</MenuItem>
                        <MenuItem value="????????????">????????????</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                    <Select
                        disabled={filter.filterKind === "none"}
                        multiple
                        value={filter.filterList}
                        onChange={handleFilterChange}
                        renderValue={(selected) => (
                            <Box
                                sx={{
                                    height: "25px",
                                    overflowY: "auto",
                                    fontWeight: "bold",
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 0.5,
                                }}
                            >
                                {selected.map((value) => (
                                    <Tooltip key={value} title={value} placement="bottom">
                                        <Chip
                                            key={value}
                                            label={value}
                                            variant="outlined"
                                            size="small"
                                            deleteIcon={
                                                <HighlightOffIcon
                                                    onMouseDown={(event: any) => event.stopPropagation()}
                                                />
                                            }
                                            onDelete={() => handleClickDelete(value)}
                                            sx={{
                                                borderColor: (prefersDarkMode ? "white" : "#24292f"),
                                                fontSize: "15px",
                                                color: (prefersDarkMode ? "white" : "#24292f"),
                                                maxWidth: "200px",
                                            }}
                                        />
                                    </Tooltip>
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                        sx={{ maxWidth: "720px" }}
                    >
                        <MenuItem value="none">????????????</MenuItem>
                        {filter.filterKind == "??????" &&
                            tagList.map((tagValue) => (
                                <MenuItem value={tagValue} key={tagValue}>
                                    {tagValue}
                                </MenuItem>
                            ))}
                        {filter.filterKind == "????????????" &&
                            userList.map((userValue) => (
                                <MenuItem value={userValue} key={userValue}>
                                    {userValue}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
            </Box>
        </div>
    )
})

export default TagFilter