import React from "react"
import NewGroupDialog from "@/components/molecules/newGroupDialog"
import JoinGroupDialog from "@/components/molecules/joinGroupDialog"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"

export default function SelectGroup() {
    const [isOpenNewGroupDialog, setIsOpenNewGroupDialog] = React.useState(false)
    const [isOpenJoinGroupDialog, setIsOpenJoinGroupDialog] = React.useState(false)

    return (
        <div style={{ textAlign: "center" }}>
            <Box sx={{ mt: "200px", mb: "100px" }}>
                <Typography variant="h4">グループの作成、参加</Typography>
                <Typography variant="caption">*アプリ内のマイページから追加や作成することもできます</Typography>
            </Box>
            <Box sx={{ mt: "50px" }}>
                <Button
                    onClick={() => setIsOpenNewGroupDialog(true)}
                    variant="contained"
                    sx={{
                        mr: "100px",
                        fontSize: "30px",
                        height: "100px",
                        borderRadius: "20px",
                        bgcolor: "#24292f",
                        ":hover": { bgcolor: "#777777" },
                    }}
                >
                    新しくグループを作る
                </Button>
                <Button
                    onClick={() => setIsOpenJoinGroupDialog(true)}
                    variant="contained"
                    sx={{
                        fontSize: "30px",
                        height: "100px",
                        borderRadius: "20px",
                        bgcolor: "#24292f",
                        ":hover": { bgcolor: "#777777" },
                    }}
                >
                    既存のグループに参加
                </Button>
            </Box>
            {isOpenNewGroupDialog && (
                <NewGroupDialog
                    isOpenNewGroupDialog={isOpenNewGroupDialog}
                    setIsOpenNewGroupDialog={setIsOpenNewGroupDialog}
                />
            )}
            {isOpenJoinGroupDialog && (
                <JoinGroupDialog
                    isOpenJoinGroupDialog={isOpenJoinGroupDialog}
                    setIsOpenJoinGroupDialog={setIsOpenJoinGroupDialog}
                />
            )}
        </div>
    )
}
