import React from "react"
import router from "next/router"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Link from "@mui/material/Link"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { auth, signInWithEmailAndPassword } from "@/firebase"

const theme = createTheme()

export default function SignIn() {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((data) => {
                toast.success("ログイン成功")
                router.push("/home")
                // console.log(data.user.uid)
            })
            .catch((error) => {
                toast.error("ログイン失敗")
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
                    <Typography variant="h2" sx={{ marginBottom: "50px" }}>
                        EmoCha
                    </Typography>
                    <Box sx={{ mt: 1, width: "100%" }}>
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
                        {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" /> */}
                        <Button
                            type="submit"
                            onClick={handleSignIn}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            ログイン
                        </Button>
                        <Box sx={{ margin: "20px 0px" }}>
                            <Link href="/signUp" variant="body2">
                                アカウントをお持ちでない方はこちら
                            </Link>
                        </Box>
                        <Box>
                            <Link href="/forgetPassword" variant="body2">
                                パスワードを忘れた方はこちら
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Container>
            <ToastContainer position="bottom-center" closeOnClick autoClose={2000} />
        </ThemeProvider>
    )
}
