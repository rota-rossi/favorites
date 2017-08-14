import React from 'react'
import { Icon } from 'native-base'
import styled from 'styled-components/native'


const StyledIcon = styled(Icon) `
  color: #FF4081;
`
const ForwardIcon = () => <StyledIcon name="ios-arrow-forward" />

export default ForwardIcon
