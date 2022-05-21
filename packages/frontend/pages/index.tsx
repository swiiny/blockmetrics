import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components'
import Meta from '../components/utils/Meta'
const Home: NextPage = () => {
  return (
    <>
      <Meta metas={[{ name: 'title', content: 'BlockMetrics' }]} />
    </>
  )
}

export default Home
