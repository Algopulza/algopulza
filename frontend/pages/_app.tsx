import '../styles/globals.css'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { DefaultSeo } from 'next-seo'
import { DEFAULT_SEO } from '../util/seo'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return <RecoilRoot>
    {getLayout(
      <>
        {/* <DefaultSeo {...DEFAULT_SEO} /> */}
        <Component {...pageProps} />
      </>
    )}
  </RecoilRoot>
}

export default MyApp
