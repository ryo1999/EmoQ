import type { AppProps } from "next/app"
import { RecoilRoot } from "recoil"
import "../../styles/globals.css"
import ThemeProvider from "@/theme"
import Head from "next/head"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider>
            <RecoilRoot>
                <Head>
                    <title>EmoQ</title>
                    <meta charSet="utf-8" />
                    <meta name="description" content="グループで気持ちと共に疑問を共有"></meta>
                    <meta property="og:title" content="EmoQ" />
                    <meta property="og:description" content="グループで気持ちと共に疑問を共有" />
                    <meta property="og:image" content="https://media.istockphoto.com/vectors/cute-emoji-looking-up-at-a-question-mark-indicating-a-problem-problem-vector-id941224134" />
                    <meta name="twitter:image" content="https://media.istockphoto.com/vectors/cute-emoji-looking-up-at-a-question-mark-indicating-a-problem-problem-vector-id941224134" />
                </Head>
                <Component {...pageProps} />
            </RecoilRoot>
        </ThemeProvider>
    )
}

export default MyApp
