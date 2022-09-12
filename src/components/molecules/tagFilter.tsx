import React from "react"
// import FilterMenu from "./filterMenu"
import { Box, Button } from "@mui/material"
import SortIcon from "@mui/icons-material/Sort"
import FilterListIcon from "@mui/icons-material/FilterList"
import Typography from "@mui/material/Typography"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { getTag } from "@/pages/api/tagApi"
import { getAllUserName } from "@/pages/api/userApi"

export default function TagFilter() {
    const [sortText, setSortText] = React.useState("")
    const [filterKind, setFilterKind] = React.useState("")
    const [filterList, setFilterList] = React.useState<string[]>([])
    const [tagList, setTagList] = React.useState<string[]>([])
    const [userList, setUserList] = React.useState<string[]>([])
    // const [filterAnchorEl, setFilterAnchorEl] = React.useState<null | HTMLElement>(null)

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

    // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    //     setTabNum(newValue)
    // }

    return (
        <div style={{ marginLeft: "70px", display: "flex", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center", mr: "50px" }}>
                <SortIcon />
                <Typography variant="body2">並び替え：</Typography>
                <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                    <Select value={sortText} onChange={handleSortChange}>
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
                        <MenuItem value="タグ">タグ</MenuItem>
                        <MenuItem value="ユーザー">ユーザー</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                    <Select disabled={filterKind==""} multiple value={filterList} onChange={handleFilterChange}>
                        {filterKind == "タグ" &&
                            tagList.map((tagValue) => (
                                <MenuItem
                                    // style={getStyles(tagValue, tag, theme)}
                                    value={tagValue}
                                    key={tagValue}
                                >
                                    {tagValue}
                                </MenuItem>
                            ))}
                        {filterKind == "ユーザー" &&
                            userList.map((userValue) => (
                                <MenuItem
                                    // style={getStyles(tagValue, tag, theme)}
                                    value={userValue}
                                    key={userValue}
                                >
                                    {userValue}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
            </Box>
            {/* {filterAnchorEl && <FilterMenu filterAnchorEl={filterAnchorEl} setFilterAnchorEl={setFilterAnchorEl} filterList={filterList} setFilterList={setFilterList}/>} */}
        </div>
    )
}
