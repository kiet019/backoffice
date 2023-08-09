'use client'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

const InnerWrapper = styled(Box)(({ theme }) => ({
  transition: 'all 0.3s',
  [theme.breakpoints.up('lg')]: { maxWidth: 1700, margin: 'auto' },
  [theme.breakpoints.down(1700)]: { paddingLeft: '0rem', paddingRight: '0rem' },
}))

export default InnerWrapper
