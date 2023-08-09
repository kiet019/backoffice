'use client'

import React, { FC } from 'react'
import { styled } from '@mui/material/styles'
import Card, { CardProps } from '@mui/material/Card'

type WrapperProps = { passwordVisibility?: boolean }

const fbStyle = { background: '#3B5998', color: 'white' }
const googleStyle = { background: '#4285F4', color: 'white' }

const Wrapper = styled<FC<WrapperProps & CardProps>>(({ children, ...rest }) => (
  <Card {...rest}> {children} </Card>
))<CardProps>(({ theme, passwordVisibility }) => ({
  width: 500,
  padding: '2rem 3rem',
  [theme.breakpoints.down('sm')]: { width: '100%' },
  '.passwordEye': {
    color: passwordVisibility ? theme.palette.grey[600] : theme.palette.grey[400]
  },
  '.facebookButton': { marginBottom: 10, ...fbStyle, '&:hover': fbStyle },
  '.googleButton': { ...googleStyle, '&:hover': googleStyle },
  '.agreement': { marginTop: 12, marginBottom: 24 }
}))

export default Wrapper
