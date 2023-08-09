import { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import {
  BadgeValue,
  BulletIcon,
  ChevronRightIcon,
  ListIconWrapper,
  NavItemButton,
  StyledText
} from '@/components/layout/layout-styled-components'

// styled component
const NavExpandRoot = styled(Box)({
  '& .subMenu': { padding: 0 },
  '& .navItem': { background: 'transparent' },
  '& .expansion-panel': {
    '& .expansion-panel': { paddingLeft: 8 },
    overflow: 'hidden',
    transition: 'max-height 0.3s cubic-bezier(0, 0, 0.2, 1)'
  }
})

// ================================================================
type SidebarAccordionProps = {
  item: any
  sidebarCompact: any
  children: ReactNode
}
// ================================================================

const SidebarAccordion: FC<SidebarAccordionProps> = props => {
  const { item, children, sidebarCompact } = props
  const { name, icon, iconText, badge } = item

  const pathname = usePathname()
  const componentHeight = useRef(0)
  const elementRef = useRef<any>(null)
  const [collapsed, setCollapsed] = useState(false)
  const [hasActive, setHasActive] = useState(false)

  const handleClick = () => {
    componentHeight.current = 0
    calculateHeight(elementRef.current)
    setCollapsed(!collapsed)
  }

  const calculateHeight = useCallback((node: any) => {
    if (node.name !== 'child') {
      for (const child of node.children) {
        calculateHeight(child)
      }
    }

    if (node.name === 'child') componentHeight.current += node.scrollHeight
    else componentHeight.current += 44 //here 44 is node height
    return
  }, [])

  useEffect(() => {
    if (!elementRef) return
    calculateHeight(elementRef.current)

    // OPEN DROPDOWN IF CHILD IS ACTIVE
    for (const child of item.children) {
      if (child.path === pathname) {
        setCollapsed(true)
        setHasActive(true)
      }
    }

    return () => {
      setHasActive(false)
      setCollapsed(false)
    }
  }, [calculateHeight, item.children, pathname])

  return (
    <NavExpandRoot className='subMenu'>
      <NavItemButton onClick={handleClick} active={hasActive ? 1 : 0} sx={{ justifyContent: 'space-between' }}>
        <Box display='flex' alignItems='center'>
          {/* //@ts-ignore */}
          {icon && (
            <ListIconWrapper>
              <item.icon />
            </ListIconWrapper>
          )}
          {iconText && <BulletIcon active={hasActive ? 1 : 0} />}
          <StyledText compact={sidebarCompact}>{name}</StyledText>
        </Box>

        {badge && (
          <BadgeValue compact={sidebarCompact} className='itemIcon'>
            {badge.value}
          </BadgeValue>
        )}

        <ChevronRightIcon
          color='disabled'
          compact={sidebarCompact}
          className='accordionArrow'
          collapsed={collapsed ? 1 : 0}
        />
      </NavItemButton>

      <div
        ref={elementRef}
        className='expansion-panel'
        style={{
          maxHeight: !collapsed || sidebarCompact ? '0px' : componentHeight.current + 'px'
        }}
      >
        {children}
      </div>
    </NavExpandRoot>
  )
}

export default SidebarAccordion
