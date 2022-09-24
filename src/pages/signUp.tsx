import React from "react"
import {useRouter} from "next/router"
import LoadingButton from "@mui/lab/LoadingButton"
import TextField from "@mui/material/TextField"
import Link from "@mui/material/Link"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { auth, createUserWithEmailAndPassword } from "@/firebase"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useRecoilState } from "recoil"
import { userInfo } from "@/store/userInfo"
import { signUp, getUserInfo } from "@/pages/api/userApi"
// import { addGroup, getGroupName } from "./api/groupApi"
import { useValidation, useMailValidation, usePasswordValidation } from "@/hooks/useValidation"
// import FormControl from "@mui/material/FormControl"
// import Select, { SelectChangeEvent } from "@mui/material/Select"
// import MenuItem from "@mui/material/MenuItem"
// import { deleteUser } from "firebase/auth"

const theme = createTheme()

export default function SignUp() {
    const router = useRouter()
    const [userState, setUserState] = useRecoilState(userInfo)
    const [loading, setLoading] = React.useState(false)
    // const [groupValue, setGroupValue] = React.useState("new")
    // const [groupId, setGroupId] = React.useState("")
    const { valueText, setValueText, isValidated, errorMessage, textValidation } = useValidation()
    const { emailValueText, setEmailValueText, isEmailValidated, errorEmailMessage, emailValidation } =
        useMailValidation()
    const { passwordValueText, setPasswordValueText, isPasswordValidated, errorPasswordMessage, passwordValidation } =
        usePasswordValidation()

    // const {
    //     groupValueText,
    //     setGroupValueText,
    //     setIsInputGroupStart,
    //     isGroupValidated,
    //     errorGroupMessage,
    //     groupValidation,
    // } = useGroupValidation()

    // React.useEffect(() => {
    //     setGroupId("")
    //     setGroupValueText("")
    //     setIsInputGroupStart(false)
    // }, [groupValue])

    const handleSignUp = async () => {
        setLoading(true)
        // let gid: string
        // let gname: string
        createUserWithEmailAndPassword(auth, emailValueText, passwordValueText)
            .then(async (data) => {
                toast.success("登録が完了しました。次の画面でグループを選択してください")
                await signUp(data.user.uid, valueText)
                setUserState({...userState,userId:data.user.uid,userName:valueText})
                // await getUserInfo(data.user.uid).then((userdata) => {
                //     if (userdata) {
                //         setUserState(userdata)
                //     }
                // })
                router.push("/selectGroup")
                // if (groupValue === "join") {
                //     const name = await getGroupName(groupId)
                //     if (name === false) {
                //         toast.error("グループが存在しません")
                //         const user = auth.currentUser
                //         if (user) {
                //             deleteUser(user)
                //                 .then(() => {
                //                     //ユーザー削除
                //                 })
                //                 .catch((error) => {
                //                     console.error(error)
                //                 })
                //         }
                //         setLoading(false)
                //         return
                //     } else {
                //         toast.success("登録が完了しました")
                //         gid = groupId
                //         gname = name
                //         await signUp(data.user.uid, valueText)
                //         await registerUserGroup(data.user.uid, gid, gname)
                // getUserInfo(data.user.uid).then((userdata) => {
                //     if (userdata) {
                //         setUserState(userdata)
                //     }
                // })
                //         router.push("/")
                //     }
                // } else if (groupValue === "new") {
                //     toast.success("登録が完了しました")
                //     const id = await addGroup(groupValueText)
                //     gid = id
                //     gname = groupValueText
                //     await signUp(data.user.uid, valueText)
                //     await registerUserGroup(data.user.uid, gid, gname)
                //     getUserInfo(data.user.uid).then((userdata) => {
                //         if (userdata) {
                //             setUserState(userdata)
                //         }
                //     })
                // router.push("/")
            })
            .catch(() => {
                setLoading(false)
                toast.error("登録に失敗しました")
            })
    }

    // const handleGroupChange = (event: SelectChangeEvent) => {
    //     setGroupValue(event.target.value)
    // }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        mt: "50px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h4" sx={{ mb: "20px" }}>
                        新規登録
                    </Typography>
                    <Box sx={{ mt: 1, width: "100%" }}>
                        <Typography variant="h6">アカウント名*</Typography>
                        <TextField
                            error={!isValidated}
                            margin="normal"
                            fullWidth
                            id="account"
                            placeholder="太郎"
                            name="account"
                            autoComplete="account"
                            autoFocus
                            helperText={isValidated ? "" : errorMessage}
                            sx={{ mb: "30px" }}
                            onChange={(e) => setValueText(e.target.value)}
                        />
                        <Typography variant="h6">メールアドレス*</Typography>
                        <TextField
                            error={!isEmailValidated}
                            margin="normal"
                            fullWidth
                            id="email"
                            placeholder="your-email@sample.com"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            helperText={isEmailValidated ? "" : errorEmailMessage}
                            sx={{ mb: "30px" }}
                            onChange={(e) => setEmailValueText(e.target.value)}
                        />
                        <Typography variant="h6">パスワード*</Typography>
                        <TextField
                            error={!isPasswordValidated}
                            margin="normal"
                            fullWidth
                            name="password"
                            placeholder="6文字以上の英数字"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            helperText={isPasswordValidated ? "" : errorPasswordMessage}
                            onChange={(e) => setPasswordValueText(e.target.value)}
                        />
                        <LoadingButton
                            type="submit"
                            onClick={handleSignUp}
                            fullWidth
                            loading={loading}
                            variant="contained"
                            sx={{
                                mt: "50px",
                                mb: "20px",
                                fontSize: "18px",
                                bgcolor: "#24292f",
                                ":hover": { bgcolor: "#777777" },
                            }}
                            disabled={!(textValidation && emailValidation && passwordValidation)}
                        >
                            登録
                        </LoadingButton>
                        <Box sx={{ m: "20px 0px" }}>
                            <Link href="/" variant="body2" sx={{ color: "black" }}>
                                アカウントをお持ちの方はこちら
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Container>
            <ToastContainer position="bottom-center" pauseOnHover={false} closeOnClick autoClose={2000} />
        </ThemeProvider>
    )
}
