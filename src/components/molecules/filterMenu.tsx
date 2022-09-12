// import React from "react"
// import Menu from "@mui/material/Menu"
// import MenuItem from "@mui/material/MenuItem"
// import Tabs from "@mui/material/Tabs"
// import Tab from "@mui/material/Tab"
// import { getTag } from "@/pages/api/tagApi"
// import { getAllUserName } from "@/pages/api/userApi"
// import Box from "@mui/material/Box"
// import FormControl from "@mui/material/FormControl"
// import InputLabel from "@mui/material/InputLabel"
// import Select from "@mui/material/Select"
// import Tooltip from "@mui/material/Tooltip"
// import Chip from "@mui/material/Chip"

// type FilterDialogProps = {
//     filterAnchorEl: null | HTMLElement
//     setFilterAnchorEl: React.Dispatch<null | HTMLElement>
//     filterList: string[]
//     setFilterList: React.Dispatch<string[]>
// }

// const FilterMenu = React.memo((props: FilterDialogProps) => {
//     const { filterAnchorEl, setFilterAnchorEl, filterList, setFilterList } = props
//     const [tabValue, setTabValue] = React.useState(0)
//     const [tagList, setTagList] = React.useState<string[]>([])
//     const [userList, setUserList] = React.useState<string[]>([])
//     const emotionList = ["悲しみ", "イライラ", "焦り", "絶望", "どや", "ワクワク", "お願い", "ホッ"]

    // React.useEffect(() => {
    //     getTag()
    //         .then((data) => {
    //             setTagList(data)
    //         })
    //         .catch((error) => {
    //             console.error(error)
    //         })
    //     getAllUserName()
    //         .then((data) => {
    //             setUserList(data)
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }, [])

//     const handleFilterClose = () => {
//         setFilterAnchorEl(null)
//     }

//     const handleClickFilterMenu = (value: string) => {
//         console.log(value)
//         const list = filterList
//         list.push(value)
//         setFilterList(list)
//     }

//     const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
//         setTabValue(newValue)
//     }

//     return (
        
//     )
// })

// export default FilterMenu
