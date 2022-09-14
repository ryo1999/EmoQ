import React from "react"
import { Box, Button } from "@mui/material"
import SortIcon from "@mui/icons-material/Sort"
import FilterListIcon from "@mui/icons-material/FilterList"
import Typography from "@mui/material/Typography"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { useRecoilState } from "recoil"
import { solvedQuestions } from "@/store/solvedQuestions"
import { unSolvedQuestions } from "@/store/unSolvedQuestions"
import { selectedSort } from "@/store/selectedSort"
import { getTag } from "@/pages/api/tagApi"
import { getAllUserName } from "@/pages/api/userApi"

export default function TagFilter() {
    const [sortText, setSortText] = useRecoilState(selectedSort)
    const [unSolvedQuestionList, setUnSolvedQuestions] = useRecoilState(unSolvedQuestions)
    const [solvedQuestionList, setSolvedQuestions] = useRecoilState(solvedQuestions)
    const [filterKind, setFilterKind] = React.useState("")
    const [filterList, setFilterList] = React.useState<string[]>([])
    const [tagList, setTagList] = React.useState<string[]>([])
    const [userList, setUserList] = React.useState<string[]>([])

    React.useEffect(() => {
        getTag()
            .then((data) => {
                setTagList(data)
            })
            .catch((error) => {
                console.error(error)
            })
        getAllUserName()
            .then((data) => {
                setUserList(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

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

    // const handleClickFilter = (event: React.MouseEvent<HTMLElement>) => {
    //     setFilterAnchorEl(event.currentTarget)
    // }

    const handleFilterKindChange = (event: SelectChangeEvent) => {
        setFilterKind(event.target.value)
    }

    const handleFilterChange = (event: SelectChangeEvent<typeof filterList>) => {
        const {
            target: { value },
        } = event
        setFilterList(typeof value === "string" ? value.split(",") : value)
    }

    return (
        <div style={{ marginLeft: "70px", display: "flex", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center", mr: "50px" }}>
                <SortIcon />
                <Typography variant="body2">並び替え：</Typography>
                <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                    <Select value={sortText===undefined ? "new" : sortText} onChange={handleSortChange}>
                        <MenuItem value="new">投稿日時の新しい順</MenuItem>
                        <MenuItem value="old">投稿日時の古い順</MenuItem>
                        <MenuItem value="emergency">緊急度順</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mr: "50px" }}>
                <FilterListIcon />
                <Typography variant="body2">絞り込み</Typography>
                <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                    <Select value={filterKind} onChange={handleFilterKindChange}>
                        <MenuItem value="none">絞り込み解除</MenuItem>
                        <MenuItem value="タグ">タグ</MenuItem>
                        <MenuItem value="ユーザー">ユーザー</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                    <Select disabled={filterKind == ""} multiple value={filterList} onChange={handleFilterChange}>
                        <MenuItem value="none">絞り込み解除</MenuItem>
                        {filterKind == "タグ" &&
                            tagList.map((tagValue) => (
                                <MenuItem value={tagValue} key={tagValue}>
                                    {tagValue}
                                </MenuItem>
                            ))}
                        {filterKind == "ユーザー" &&
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
}
