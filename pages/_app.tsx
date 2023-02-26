import "../styles/globals.scss"
import type { AppProps } from "next/app"
import { Layout } from "components/index"
import "@aamodtgroup/gutenberg-styles/style.css"
import "@aamodtgroup/gutenberg-styles/theme.css"

const App = ({ Component, pageProps }: AppProps) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
)

export default App
