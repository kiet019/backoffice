'use client'

import { FC, useState } from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import LayoutDrawer from './layout-drawer'

import Scrollbar from '../common/scrollbar'

import FlexBetween from '@/components/mui/flex-box/flex-between'
import SidebarAccordion from '@/components/layout/sidebar-accordion'

import { navigations } from '@/config/navigation-list'
import {
  BadgeValue,
  BulletIcon,
  ChevronLeftIcon,
  ExternalLink,
  ListIconWrapper,
  ListLabel,
  NavItemButton,
  NavWrapper,
  SidebarWrapper,
  StyledText
} from '@/components/layout/layout-styled-components'
import { useRecoilState } from 'recoil'
import { showMobileSideBarState, sidebarCompactState } from '@/atoms/settings'

const TOP_HEADER_AREA = 70

// -----------------------------------------------------------------------------
type DashboardSidebarProps = {
  // sidebarCompact: any
  // showMobileSideBar: any
  // setSidebarCompact: () => void
  // setShowMobileSideBar: () => void
}
// -----------------------------------------------------------------------------

const DashboardSidebar: FC<DashboardSidebarProps> = () => {
  // const { sidebarCompact, showMobileSideBar, setShowMobileSideBar, setSidebarCompact } = props
  const [sidebarCompact, setSidebarCompact] = useRecoilState(sidebarCompactState)
  const [showMobileSideBar, setShowMobileSideBar] = useRecoilState(showMobileSideBarState)

  const router = useRouter()
  const pathname = usePathname()
  const [onHover, setOnHover] = useState(false)
  const downLg = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  const handleMobileDrawerToggle = () => setShowMobileSideBar(state => (state ? 0 : 1))

  const handleCompactToggle = () => setSidebarCompact(state => (state ? 0 : 1))

  // side hover when side bar is compacted
  const COMPACT = sidebarCompact && !onHover ? 1 : 0
  // handle active current page
  const activeRoute = (path: string) => (pathname === path ? 1 : 0)

  // handle navigate to another route and close sidebar drawer in mobile device
  const handleNavigation = (path: string) => {
    router.push(path)
    handleMobileDrawerToggle()
  }

  const renderLevels = (data: any) => {
    return data.map((item: any, index: any) => {
      if (item.type === 'label')
        return (
          <ListLabel key={index} compact={COMPACT}>
            {item.label}
          </ListLabel>
        )

      if (item.children) {
        return (
          <SidebarAccordion key={index} item={item} sidebarCompact={COMPACT}>
            {renderLevels(item.children)}
          </SidebarAccordion>
        )
      } else if (item.type === 'extLink') {
        return (
          <ExternalLink key={index} href={item.path} rel='noopener noreferrer' target='_blank'>
            <NavItemButton key={item.name} name='child' active={0}>
              {item.icon ? (
                <ListIconWrapper>
                  <item.icon />
                </ListIconWrapper>
              ) : (
                <span className='item-icon icon-text'>{item.iconText}</span>
              )}

              <StyledText compact={COMPACT}>{item.name}</StyledText>

              {/* <Box mx="auto" /> */}

              {item.badge && <BadgeValue compact={COMPACT}>{item.badge.value}</BadgeValue>}
            </NavItemButton>
          </ExternalLink>
        )
      } else {
        return (
          <Box key={index}>
            <NavItemButton
              key={item.name}
              className='navItem'
              active={activeRoute(item.path)}
              onClick={() => handleNavigation(item.path)}
            >
              {item?.icon ? (
                <ListIconWrapper>
                  <item.icon />
                </ListIconWrapper>
              ) : (
                <BulletIcon active={activeRoute(item.path)} />
              )}

              <StyledText compact={COMPACT}>{item.name}</StyledText>

              {/* <Box mx="auto" /> */}

              {item.badge && <BadgeValue compact={COMPACT}>{item.badge.value}</BadgeValue>}
            </NavItemButton>
          </Box>
        )
      }
    })
  }

  const content = (
    <Scrollbar
      // autoHide
      // clickOnTrack={false}
      sx={{
        overflowX: 'hidden',
        overflowY: 'hidden',
        maxHeight: `calc(100vh - ${TOP_HEADER_AREA}px)`
      }}
    >
      <NavWrapper compact={sidebarCompact}>{renderLevels(navigations)}</NavWrapper>
    </Scrollbar>
  )

  if (downLg) {
    return (
      <LayoutDrawer open={!!showMobileSideBar} onClose={handleMobileDrawerToggle}>
        <Box p={2} maxHeight={TOP_HEADER_AREA}>
          <Image alt='Logo' width={105} height={50} src='/assets/images/logo.svg' style={{ marginLeft: 8 }} />
        </Box>

        {content}
      </LayoutDrawer>
    )
  }

  return (
    <SidebarWrapper
      compact={sidebarCompact ? 1 : 0}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => sidebarCompact && setOnHover(false)}
    >
      <FlexBetween p={2} maxHeight={TOP_HEADER_AREA} justifyContent={COMPACT ? 'center' : 'space-between'}>
        <Avatar
          src={COMPACT ? '/assets/images/bazaar-white-sm.svg' : '/assets/images/logo.svg'}
          sx={{ borderRadius: 0, width: 'auto', marginLeft: COMPACT ? 0 : 1 }}
        />

        <ChevronLeftIcon
          color='disabled'
          compact={COMPACT}
          onClick={handleCompactToggle}
          sidebarcompact={sidebarCompact ? 1 : 0}
        />
      </FlexBetween>

      {content}
    </SidebarWrapper>
  )
}

export default DashboardSidebar
