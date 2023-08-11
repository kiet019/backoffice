'use client'
import { FC } from 'react'
import { useRouter } from 'next/navigation'
import { useSetRecoilState } from 'recoil'

import Search from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { styled, Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import InputBase from '@mui/material/InputBase'

import FlexRowCenter from '@/components/mui/flex-box/flex-row-center'
import FlexBox from '@/components/mui/flex-box/flex-box'
import Globe from '@/components/icons/globe'
import Toggle from '@/components/icons/toggle'
import NotificationsPopover from '@/components/layout/popovers/nofication-popover'
import AccountPopover from '@/components/layout/popovers/account-popover'
import { showMobileSideBarState } from '@/atoms/settings'

// custom styled components
const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  zIndex: 11,
  paddingTop: '1rem',
  paddingBottom: '1rem',
  backgroundColor: '#ffffff',
  boxShadow: theme.shadows[2],
  color: theme.palette.text.primary
}))

const StyledToolBar = styled(Toolbar)({
  '@media (min-width: 0px)': {
    paddingLeft: 0,
    paddingRight: 0,
    minHeight: 'auto'
  }
})

const ToggleWrapper = styled(FlexRowCenter)(({ theme }) => ({
  width: 40,
  height: 40,
  flexShrink: 0,
  cursor: 'pointer',
  borderRadius: '8px',
  backgroundColor: theme.palette.grey[100]
}))

const CustomButton = styled(Button)(({ theme }) => ({
  minHeight: 40,
  flexShrink: 0,
  marginLeft: 16,
  padding: '0 20px',
  borderRadius: '8px',
  backgroundColor: theme.palette.grey[100],
  [theme.breakpoints.down('xs')]: { display: 'none' }
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: 200,
  padding: '5px 10px',
  borderRadius: '8px',
  color: theme.palette.grey[500],
  backgroundColor: theme.palette.grey[100],
  [theme.breakpoints.down('md')]: { display: 'none' }
}))

// ===================================================================
type DashboardNavbarProps = {
  // handleDrawerToggle: () => void
}
// ===================================================================

const DashboardNavbar: FC<DashboardNavbarProps> = () => {
  const router = useRouter()
  const downLg = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  const setShowMobileSideBar = useSetRecoilState(showMobileSideBarState)
  const handleMobileDrawerToggle = () => setShowMobileSideBar(state => (state ? 0 : 1))

  return (
    <DashboardNavbarRoot position='sticky'>
      <Container maxWidth='xl'>
        <StyledToolBar disableGutters>
          {downLg && (
            <ToggleWrapper onClick={handleMobileDrawerToggle}>
              <Toggle />
            </ToggleWrapper>
          )}

          <CustomButton onClick={() => router.push('/')} startIcon={<Globe sx={{ color: 'grey.900' }} />}>
            Browse Website
          </CustomButton>

          <Box flexGrow={1} />

          <FlexBox alignItems='center' gap={2}>
            <StyledInputBase
              placeholder='Search anything...'
              startAdornment={<Search sx={{ color: 'grey.500', mr: 1 }} />}
            />

            <NotificationsPopover />
            <AccountPopover />
          </FlexBox>
        </StyledToolBar>
      </Container>
    </DashboardNavbarRoot>
  )
}
export default DashboardNavbar
