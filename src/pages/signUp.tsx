import React from "react"
import router from "next/router"
import LoadingButton from "@mui/lab/LoadingButton"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Link from "@mui/material/Link"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { auth, createUserWithEmailAndPassword } from "@/firebase"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { singUp } from "@/pages/api/userApi"
import { useValidation, useMailValidation, usePasswordValidation } from "@/hooks/useValidation"

const theme = createTheme()

export default function SignUp() {
    const [loading, setLoading] = React.useState(false)
    const { valueText, setValueText, isValidated, errorMessage, textValidation } = useValidation()
    const { emailValueText, setEmailValueText, isEmailValidated, errorEmailMessage, emailValidation } = useMailValidation()
    const { passwordValueText, setPasswordValueText, isPasswordValidated, errorPasswordMessage, passwordValidation } = usePasswordValidation()

    const handleSignUp = () => {
        setLoading(true)
        createUserWithEmailAndPassword(auth, emailValueText, passwordValueText)
            .then((data) => {
                toast.success("登録が完了しました")
                singUp(data.user.uid, valueText)
                router.push("/")
            })
            .catch(() => {
                setLoading(false)
                toast.error("登録に失敗しました")
            })
    }

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
                    <Typography variant="h4" sx={{ mb: "20px" }}>
                        新規登録
                    </Typography>
                    <Box sx={{ mt: 1, width: "100%" }}>
                        <Typography variant="h6">アカウント名*</Typography>
                        <TextField
                            error={!isValidated}
                            margin="normal"
                            fullWidth
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
                            sx={{ mt: 3, mb: 2 }}
                            disabled={!(textValidation && emailValidation && passwordValidation)}
                        >
                            登録
                        </LoadingButton>
                        <Box sx={{ m: "20px 0px" }}>
                            <Link href="/" variant="body2">
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
