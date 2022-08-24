import React from "react"
import Button from "@mui/material/Button"
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
    const [email, setEmail] = React.useState("")

    const submitPasswordResetEmail = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.success("送信完了")
            })
            .catch((error) => {
                toast.error("登録されたメールアドレスを入力してください")
            })
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: "30px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h5" sx={{ marginBottom: "50px" }}>
                        パスワード再設定用メール送信
                    </Typography>
                    <Box sx={{ mt: 1, width: "100%" }}>
                        <Typography variant="h6">登録したメールアドレスを入力</Typography>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="email"
                            placeholder="your-email@sample.com"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            sx={{ marginBottom: "30px" }}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button
                            type="submit"
                            onClick={submitPasswordResetEmail}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            送信
                        </Button>
                        <Box sx={{ margin: "20px 0px" }}>
                            <Link href="/" variant="body2">
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
