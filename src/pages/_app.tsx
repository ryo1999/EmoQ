import type { AppProps } from "next/app"
import { RecoilRoot } from "recoil"
import "../../styles/globals.css"
import ThemeProvider from "@/theme"
import Header from "@/components/molecules/head"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider>
        <RecoilRoot>
            <Header/>
            <Component {...pageProps} />
        </RecoilRoot>
        </ThemeProvider>
    )
}

export default MyApp
