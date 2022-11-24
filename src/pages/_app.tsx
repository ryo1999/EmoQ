import React from "react"
import type { AppProps } from "next/app"
import { RecoilRoot } from "recoil"
import "../../styles/globals.css"
// import ThemeProvider from "@/theme"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import Head from "next/head"
import "./wdyr"

function MyApp({ Component, pageProps }: AppProps) {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? "dark" : "light",
                },
            }),
        [prefersDarkMode]
    )
    return (
        <ThemeProvider theme={theme}>
            <RecoilRoot>
                <Head>
                    <title>EmoQ</title>
                    <meta charSet="utf-8" />
                    <meta name="description" content="グループで気持ちと共に疑問を共有"></meta>
                    <meta property="og:title" content="EmoQ" />
                    <meta property="og:description" content="グループで気持ちと共に疑問を共有" />
                    <meta
                        property="og:image"
                        content="https://www.photolibrary.jp/mhd2/img938/s-20220715162530411222.jpg"
                    />
                    <meta
                        name="twitter:image"
                        content="https://www.photolibrary.jp/mhd2/img938/s-20220715162530411222.jpg"
                    />
                </Head>
                <Component {...pageProps} />
            </RecoilRoot>
        </ThemeProvider>
    )
}

export default MyApp
