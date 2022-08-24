import type { AppProps } from "next/app"
import { RecoilRoot } from "recoil"
import "../../styles/globals.css"
import ThemeProvider from "@/theme"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider>
        <RecoilRoot>
            <Component {...pageProps} />
        </RecoilRoot>
        </ThemeProvider>
    )
}

export default MyApp
