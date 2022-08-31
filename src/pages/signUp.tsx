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
import { useSample } from "@/utils/useSample"

const theme = createTheme()

export default function SignUp() {
    const [loading, setLoading] = React.useState(false)
    const [accountName, setAccountName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [nameValidation, setNameValidation] = React.useState(0)
    const [nameErrorMessage, setNameErrorMessage] = React.useState("")
    const [emailValidation, setEmailValidation] = React.useState(0)
    const [emailErrorMessage, setEmailErrorMessage] = React.useState("")
    const [passwordValidation, setPasswordValidation] = React.useState(0)
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("")
    const { valueText, setValueText, isValidated, errorMessage, isButton } = useSample()

    //0初期レンダリング時、1初期状態、2エラー、3異常なし
    React.useEffect(() => {
        if (nameValidation === 0) {
            setNameValidation(1)
        } else if (accountName === "" || !accountName.match(/\S/g)) {
            setNameErrorMessage("必須項目です")
            setNameValidation(2)
        } else if (accountName[0] === " " || accountName[0] === "　") {
            setNameErrorMessage("空白で始めることはできません")
            setNameValidation(2)
        } else if (accountName[accountName.length - 1] === " " || accountName[accountName.length - 1] === "　") {
            setNameErrorMessage("空白で終わることはできません")
            setNameValidation(2)
        } else if (nameValidation === 1 || nameValidation === 2) {
            setNameValidation(3)
        }
    }, [accountName])

    React.useEffect(() => {
        if (emailValidation === 0) {
            setEmailValidation(1)
        } else if (email === "" || !email.match(/\S/g)) {
            setEmailErrorMessage("必須項目です")
            setEmailValidation(2)
        } else if (email.indexOf(" ") !== -1) {
            setEmailErrorMessage("空白が含まれています")
            setEmailValidation(2)
        } else if (
            email.indexOf("@") === -1 ||
            (email.indexOf(".com") === -1 && email.indexOf(".jp") === -1) ||
            email[0] === "." ||
            email[0] === "@" ||
            (email.indexOf("@") > email.indexOf(".com") && email.indexOf("@") > email.indexOf(".jp"))
        ) {
            setEmailErrorMessage("メールアドレスの形式として正しくありません")
            setEmailValidation(2)
        } else if (emailValidation === 1 || emailValidation === 2) {
            setEmailValidation(3)
        }
    }, [email])

    React.useEffect(() => {
        if (passwordValidation === 0) {
            setPasswordValidation(1)
        } else if (password === "" || !password.match(/\S/g)) {
            setPasswordErrorMessage("必須項目です")
            setPasswordValidation(2)
        } else if (password.indexOf(" ") !== -1) {
            setPasswordErrorMessage("空白が含まれています")
            setPasswordValidation(2)
        } else if (password.length < 6) {
            setPasswordErrorMessage("文字数が足りていません")
            setPasswordValidation(2)
        } else if (passwordValidation === 1 || passwordValidation === 2) {
            setPasswordValidation(3)
        }
    }, [password])

    const handleSignUp = () => {
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((data) => {
                toast.success("登録が完了しました")
                singUp(data.user.uid, accountName)
                router.push("/")
            })
            .catch((error) => {
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
                            error={nameValidation === 2}
                            margin="normal"
                            fullWidth
                            id="account"
                            placeholder="太郎"
                            name="account"
                            autoComplete="account"
                            autoFocus
                            helperText={nameValidation === 2 ? nameErrorMessage : ""}
                            sx={{ mb: "30px" }}
                            onChange={(e) => setAccountName(e.target.value)}
                        />
                        <Typography variant="h6">メールアドレス*</Typography>
                        <TextField
                            error={emailValidation === 2}
                            margin="normal"
                            fullWidth
                            id="email"
                            placeholder="your-email@sample.com"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            helperText={emailValidation === 2 ? emailErrorMessage : ""}
                            sx={{ mb: "30px" }}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Typography variant="h6">パスワード*</Typography>
                        <TextField
                            error={passwordValidation === 2}
                            margin="normal"
                            fullWidth
                            name="password"
                            placeholder="6文字以上の英数字"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            helperText={passwordValidation === 2 ? passwordErrorMessage : ""}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <LoadingButton
                            type="submit"
                            onClick={handleSignUp}
                            fullWidth
                            loading={loading}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={nameValidation !== 3 || emailValidation !== 3 || passwordValidation !== 3}
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
