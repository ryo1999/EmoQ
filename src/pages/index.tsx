import React from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useRouter } from "next/router"
import LoadingButton from "@mui/lab/LoadingButton"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Link from "@mui/material/Link"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { auth, signInWithEmailAndPassword } from "@/firebase"
import { useRecoilState } from "recoil"
import { getUserInfo } from "@/pages/api/userApi"
import { userInfo } from "@/store/userInfo"

const theme = createTheme()

export default function SignIn() {
    const router = useRouter()
    const [userState, setUserState] = useRecoilState(userInfo)
    const [loading, setLoading] = React.useState(false)
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    const handleSignIn = () => {
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((data) => {
                if (data.user.uid) {
                    getUserInfo(data.user.uid).then((userdata) => {
                        if (userdata) {
                            setUserState(userdata)
                        }
                    })
                    router.push("/home")
                }
            })
            .catch(() => {
                setLoading(false)
                toast.error("ログイン失敗")
            })
    }

    React.useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                router.push("/home")
            }
        })
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        mt: "30px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h2" sx={{ mb: "20px" }}>
                        EmoQ
                    </Typography>
                    <Typography variant="h4" sx={{ mb: "30px" }}>
                        ログイン
                    </Typography>
                    <Box sx={{ mt: 1, width: "100%", bgcolor: "white", p: "30px 20px" }}>
                        <Typography variant="h6">メールアドレス*</Typography>
                        <TextField
                            margin="normal"
                            fullWidth
                            placeholder="your-email@sample.com"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            sx={{ mb: "30px" }}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Typography variant="h6">パスワード*</Typography>
                        <TextField
                            margin="normal"
                            fullWidth
                            name="password"
                            placeholder="6文字以上の英数字"
                            type="password"
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <LoadingButton
                            type="submit"
                            onClick={handleSignIn}
                            fullWidth
                            loading={loading}
                            variant="contained"
                            sx={{
                                mt: 5,
                                mb: 2,
                                fontSize: "18px",
                                bgcolor: "#24292f",
                                ":hover": { bgcolor: "#777777" },
                            }}
                            disabled={email == "" || password == ""}
                        >
                            ログイン
                        </LoadingButton>
                        <Box sx={{ m: "20px 0px" }}>
                            <Link href="/signUp" variant="body2" sx={{ color: "black" }}>
                                アカウントをお持ちでない方はこちら
                            </Link>
                        </Box>
                        <Box>
                            <Link href="/forgetPassword" variant="body2" sx={{ color: "black" }}>
                                パスワードを忘れた方はこちら
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Container>
            <ToastContainer position="bottom-center" pauseOnHover={false} closeOnClick autoClose={2000} />
        </ThemeProvider>
    )
}
