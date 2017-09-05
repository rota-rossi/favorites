import React, { Component } from 'react';
import styled from 'styled-components/native'
import { Button, Text } from 'native-base'


const StyledText = styled(Text) `
  color: ${props => props.disabled ? 'darkgrey' : 'white'};
`
