import React from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useRouter } from "next/router"
import Image from "next/image"
import LoadingButton from "@mui/lab/LoadingButton"
import TextField from "@mui/material/TextField"
import Link from "@mui/material/Link"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import useMediaQuery from "@mui/material/useMediaQuery"
import { auth, signInWithEmailAndPassword } from "@/firebase"
import { useRecoilState } from "recoil"
import { getUserInfo } from "@/pages/api/userApi"
import { userInfo } from "@/store/userInfo"
import { useGetWindowSize } from "@/hooks/useGetWindowSize"

export default function SignIn() {
    const router = useRouter()
    const [userState, setUserState] = useRecoilState(userInfo)
    const [loading, setLoading] = React.useState(false)
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
    const { height, width } = useGetWindowSize()

    // React.useEffect(() => {
    //     if (userState.userId !== "") {
    //         setLoading(true)
    //     }
    //     auth.onAuthStateChanged((user) => {
    //         if (user) {
    //             router.push("/home")
    //         }
    //     })
    //     return () => {
    //         setLoading(false)
    //     }
    // }, [])

    // const handleSignIn = () => {
    //     setLoading(true)
    //     signInWithEmailAndPassword(auth, email, password)
    //         .then((data) => {
    //             if (data.user.uid) {
    //                 getUserInfo(data.user.uid).then((userdata) => {
    //                     if (userdata) {
    //                         setUserState(userdata)
    //                     }
    //                 })
    //                 router.push("/home")
    //             }
    //         })
    //         .catch(() => {
    //             setLoading(false)
    //             toast.error("ログイン失敗")
    //         })
    // }

    const handleSignIn = () => {
        router.push("/home")
    }

    return (
        <>
            {width < 1024 && width !== 0 ? (
                <Box sx={{ textAlign: "center", mt: "100px" }}>
                    <Image alt="" src="/notmobile.png" width={100} height={400} />
                    <Typography variant="h6">申し訳ございません。</Typography>
                    <Typography variant="h6">パソコンからのログインをお願いしております。</Typography>
                </Box>
            ) : (
                <div>
                    <Box sx={{ pt: "30px" }}>
                        <Typography variant="h5" sx={{ mb: "20px", textAlign: "center" }}>
                            疑問をグループで共有・解決！
                        </Typography>
                        <Typography variant="h2" sx={{ mb: "20px", textAlign: "center", fontWeight: "bold" }}>
                            EmoQ
                        </Typography>
                        <Typography variant="h4" sx={{ mb: "30px", textAlign: "center" }}>
                            ログイン
                        </Typography>
                        <Box
                            sx={{
                                mt: 1,
                                width: "30%",
                                bgcolor: "white",
                                p: "30px 20px",
                                m: "0 auto",
                                borderRadius: "20px",
                            }}
                        >
                            <Typography variant="h6" sx={{color:"black"}}>メールアドレス*</Typography>
                            <TextField
                                margin="normal"
                                fullWidth
                                placeholder="your-email@sample.com"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                sx={{ mb: "30px", bgcolor:(prefersDarkMode ? "#24292f" : "")}}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Typography variant="h6" sx={{color:"black"}}>パスワード*</Typography>
                            <TextField
                                margin="normal"
                                fullWidth
                                name="password"
                                placeholder="6文字以上の英数字"
                                type="password"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{ bgcolor:(prefersDarkMode ? "#24292f" : "") }}
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
                                    color:"white",
                                    bgcolor: "#24292f",
                                    ":hover": { bgcolor: "#777777" },
                                    "&:disabled":{bgcolor:(prefersDarkMode ? "gray" : "")},
                                }}
                                // disabled={email == "" || password == ""}
                            >
                                ログイン
                            </LoadingButton>
                            <Box sx={{ m: "20px 0px" }}>
                                <Link href="/sign-up" variant="body2" sx={{ color: "black" }}>
                                    アカウントをお持ちでない方はこちら
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/forget-password" variant="body2" sx={{ color: "black" }}>
                                    パスワードを忘れた方はこちら
                                </Link>
                            </Box>
                        </Box>
                    </Box>
                    <ToastContainer position="bottom-center" pauseOnHover={false} closeOnClick autoClose={2000} />
                </div>
            )}
        </>
    )
}
