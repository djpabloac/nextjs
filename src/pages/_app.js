import 'semantic-ui-css/semantic.min.css'
import Layout from 'components/Layout'
import { Provider } from "next-auth/client"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Provider session={session}>
      <Layout><Component {...pageProps} /></Layout>
    </Provider>
  )
}

export default MyApp
