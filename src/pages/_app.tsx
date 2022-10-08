import type { AppProps } from "next/app"
// import { NextSeo } from 'next-seo'
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
                    <meta
                        name="description"
                        content="グループで気持ちと共に疑問を共有"
                    ></meta>
                </Head>
                {/* <NextSeo title="EmoQ" description="グループで気持ちと共に疑問を共有" /> */}
                <Component {...pageProps} />
            </RecoilRoot>
        </ThemeProvider>
    )
}

export default MyApp
