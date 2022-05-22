import React from 'react'
import type { NextPage } from 'next'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Meta from '../components/utils/Meta'
import Flex from '../styles/layout/Flex'
import Heading from '../styles/theme/components/Heading'
import TextWithGradient from '../styles/theme/components/TextWithGradient'
import { EFlex, ETextType } from '../styles/theme/utils/enum'

const Home: NextPage = () => {
  return (
    <>
      <Meta title="Block metrics" />

      <Navbar />

      <FlexEx vertical={EFlex.center} horizontal={EFlex.center}>  
        <Heading type={ETextType.h1}>
          <TextWithGradient>
            Block metrics
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
