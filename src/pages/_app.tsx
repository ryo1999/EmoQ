import type { AppProps } from "next/app"
import { NextSeo } from 'next-seo'
import { RecoilRoot } from "recoil"
import "../../styles/globals.css"
import ThemeProvider from "@/theme"
import Header from "@/components/molecules/head"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider>
            <RecoilRoot>
                {/* <Header /> */}
                <NextSeo title="EmoQ" description="グループで気持ちと共に疑問を共有" />
                <Component {...pageProps} />
            </RecoilRoot>
        </ThemeProvider>
    )
}

export default MyApp
