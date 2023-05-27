import "../styles/globals.scss"
import type { AppProps } from "next/app"
import { Layout } from "components/index"
import { Analytics } from "@vercel/analytics/react"
import "@aamodtgroup/gutenberg-styles/style.css"
import "@aamodtgroup/gutenberg-styles/theme.css"

const App = ({ Component, pageProps }: AppProps) => (
  <Layout>
    <Component {...pageProps} />
    <Analytics />
  </Layout>
)

export default App
