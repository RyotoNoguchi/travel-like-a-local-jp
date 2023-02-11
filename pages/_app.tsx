import "../styles/globals.scss"
import type { AppProps } from "next/app"
import { Layout } from "components/index"

const App = ({ Component, pageProps }: AppProps) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
)

export default App
