'use client'

import { useRecoilValue } from 'recoil'

import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

import { sidebarCompactState } from '@/atoms/settings'

const BodyWrapper = styled(Box)(({ theme }) => {
  const sidebarCompact = useRecoilValue(sidebarCompactState)
  return {
    transition: 'margin-left 0.3s',
    marginLeft: sidebarCompact ? '86px' : '280px',
    [theme.breakpoints.down('lg')]: { marginLeft: 0 }
  }
})

export default BodyWrapper
