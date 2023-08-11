'use client'
import * as React from 'react'
import Chip from '@mui/material/Chip'
import FlexBetween from '@/components/mui/flex-box/flex-between'
import FormControl from '@mui/material/FormControl'
import Popover from '@mui/material/Popover'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import FlexBox from '@/components/mui/flex-box/flex-box'
import CheckIcon from '@mui/icons-material/Check'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import useWindowSize from '../../../hook/use-window-size'
import { OptionProps } from '@/app/(backoffice)/order/(view)/_components/interface'
import { checkDuplicate } from '@/lib/config'

export default function MultipleSelectOption({
  error = false,
  handleChangeOption,
  option,
  options
}: {
  handleChangeOption: any
  option: string[]
  options: OptionProps[]
  error?: boolean
}) {
  const [anchorElNav, setAnchorElNav] = React.useState<HTMLDivElement | null>(null)
  const id = options[0].name
  const [width, setWidth] = React.useState<number>(document.getElementById(id)?.clientWidth || 250)
  const clientWidth = useWindowSize()
  const handleDelete = (data: string) => {
    const newOption = option.filter(item => data !== item)
    handleChangeOption(newOption)
  }
  React.useEffect(() => {
    setWidth(document.getElementById(id)?.clientWidth || 250)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document.getElementById(id)?.clientWidth, clientWidth])
  const handleAdd = (data: string) => {
    if (checkDuplicate(data, option)) {
      handleDelete(data)
    } else {
      const newOption = [...option, data]
      handleChangeOption(newOption)
    }
  }

  return (
    <FormControl fullWidth id={id}>
      <FlexBetween
        sx={{
          border: error ? '2px solid red !important' : '1px solid rgba(0, 0, 0, 0.23)',
          backgroundColor: 'white',
          padding: '1px 9px',
          ':hover': {
            borderColor: 'black'
          },
          color: 'rgba(0, 0, 0, 0.38)',
          minHeight: '40px'
        }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {option.length === 0
            ? options[0].name
            : option.map(value => (
                <Chip
                  key={value}
                  label={options.find(item => value === item.id)?.name}
                  sx={{
                    fontWeight: 500,
                    '& .MuiChip-label': {
                      maxWidth: `${width - 70}px`,
                      overflowY: 'hidden'
                    },
                    margin: '2px'
                  }}
                  onDelete={() => {
                    handleDelete(value)
                  }}
                />
              ))}
        </Box>
        <FlexBox
          onClick={() => {
            const currentTarget = document.getElementById(id) as HTMLDivElement
            setAnchorElNav(currentTarget)
          }}
        >
          {anchorElNav ? <ArrowDropUpIcon sx={{ color: 'black' }} /> : <ArrowDropDownIcon sx={{ color: 'black' }} />}
        </FlexBox>

        <Popover
          open={anchorElNav !== null}
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          onClose={() => {
            setAnchorElNav(null)
          }}
        >
          <Box sx={{ padding: '8px 0px 8px' }}>
            {options.slice(1, options.length).map(item => (
              <MenuItem
                sx={{
                  width: anchorElNav?.clientWidth
                }}
                key={item.id}
                onClick={() => {
                  handleAdd(item.id)
                  setAnchorElNav(null)
                }}
              >
                {checkDuplicate(item.id, option) ? (
                  <ListItemIcon>
                    <CheckIcon />
                  </ListItemIcon>
                ) : (
                  <></>
                )}
                <ListItemText>{item.name}</ListItemText>
              </MenuItem>
            ))}
          </Box>
        </Popover>
      </FlexBetween>
    </FormControl>
  )
}
