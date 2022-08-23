import React from "react"
import router from "next/router"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Link from "@mui/material/Link"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { auth, createUserWithEmailAndPassword } from "@/firebase"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import {singUp} from "@/pages/api/userApi"

const theme = createTheme()

export default function SignUp() {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [accountName, setAccountName] = React.useState("")

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((data) => {
                toast.success("登録が完了しました")
                singUp(data.user.uid,accountName)
                router.push("/")
            })
            .catch((error) => {
                toast.error("登録できませんでした")
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
                    <Typography variant="h4" sx={{ marginBottom: "20px" }}>
                        新規登録
                    </Typography>
                    <Box sx={{ mt: 1, width: "100%" }}>
                        <Typography variant="h6">アカウント名*</Typography>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="account"
                            placeholder="太郎"
                            name="account"
                            autoComplete="account"
                            autoFocus
                            sx={{ marginBottom: "30px" }}
                            onChange={(e) => setAccountName(e.target.value)}
                        />
                        <Typography variant="h6">メールアドレス*</Typography>
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
                        <Typography variant="h6">パスワード*</Typography>
                        <TextField
                            margin="normal"
                            fullWidth
                            name="password"
                            placeholder="ローマ字と数字を必ず含めてください"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            onClick={handleSignUp}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            登録
                        </Button>
                        <Box sx={{ margin: "20px 0px" }}>
                            <Link href="/" variant="body2">
                                アカウントをお持ちの方はこちら
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Container>
            <ToastContainer
                position="bottom-center"
                pauseOnHover={false}
                closeOnClick
                autoClose={2000}
            />
        </ThemeProvider>
    )
}
