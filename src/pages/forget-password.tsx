import React from "react"
import LoadingButton from "@mui/lab/LoadingButton"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Link from "@mui/material/Link"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { auth, sendPasswordResetEmail } from "@/firebase"

const theme = createTheme()

export default function ForgetPassword() {
    const [loading, setLoading] = React.useState(false)
    const [email, setEmail] = React.useState("")

    const submitPasswordResetEmail = () => {
        setLoading(true)
        sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.success("送信完了")
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
                toast.error("登録されたメールアドレスを入力してください")
            })
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        mt: "70px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h5">
                        パスワード再設定用メール送信
                    </Typography>
                    <Typography variant="caption" sx={{ mb: "50px" }}>
                        メールが届いてない場合は迷惑メールフォルダもご確認ください
                    </Typography>
                    <Box sx={{ mt: 1, width: "100%", bgcolor: "white", p: "30px 20px", borderRadius:"20px" }}>
                        <Typography variant="h6">登録したメールアドレスを入力</Typography>
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
                        <LoadingButton
                            type="submit"
                            onClick={submitPasswordResetEmail}
                            fullWidth
                            loading={loading}
                            variant="contained"
                            sx={{
                                fontSize: "18px",
                                mt: 3,
                                mb: 2,
                                bgcolor: "#24292f",
                                ":hover": { bgcolor: "#777777" },
                            }}
                        >
                            送信
                        </LoadingButton>
                        <Box sx={{ m: "20px 0px" }}>
                            <Link href="/" variant="body2" sx={{ color: "black" }}>
                                ログイン画面へ
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Container>
            <ToastContainer position="bottom-center" pauseOnHover={false} closeOnClick autoClose={3000} />
        </ThemeProvider>
    )
}
