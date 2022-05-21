import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components'
import Meta from '../components/utils/Meta'
import { Flex } from '../styles/layout/Flex'
import Heading from '../styles/theme/components/Heading'
import TextWithGradient from '../styles/theme/components/TextWithGradient'
import { EFlex, ETextType } from '../styles/theme/utils/enum'

const Home: NextPage = () => {
  return (
    <>
      <Meta title="Block metrics" />

      <FlexEx vertical={EFlex.center} horizontal={EFlex.center}>  
        <Heading type={ETextType.h1}>
          <TextWithGradient>
            Heading One
          </TextWithGradient>
        </Heading>
      </FlexEx>
    </>
  )
}

const FlexEx = styled(Flex)`
  height: 100vh;
`

export default Home
