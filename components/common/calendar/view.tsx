'use client'
import * as React from 'react'
import FlexBetween from '@/components/mui/flex-box/flex-between'
import FormControl from '@mui/material/FormControl'
import Popover from '@mui/material/Popover'
import FlexBox from '@/components/mui/flex-box/flex-box'
import CalendarPopup from './popup'
import EventIcon from '@mui/icons-material/Event'
import { MultiInputDateRangeField } from '@mui/x-date-pickers-pro'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

const StyledButton = styled(Typography)({
  textTransform: 'none',
  margin: '0px 20px 20px',
  padding: '0px',
  color: '#FF6C60',
  cursor: 'pointer'
})

export default function ViewDate({
  dateValue,
  handleChangeDateValue,
  error,
  setError
}: {
  dateValue: any
  handleChangeDateValue: any
  error: boolean
  setError: any
}) {
  const id = '123'
  const [anchorElNav, setAnchorElNav] = React.useState<HTMLDivElement | null>(null)
  const handleSetCurrentDate = () => {
    handleChangeDateValue([new Date(), new Date()])
  }
  return (
    <FormControl fullWidth id={id}>
      <FlexBetween
        sx={{
          border:
            error ||
            (dateValue?.[0] !== null && dateValue?.[1] === null) ||
            (dateValue?.[1] !== null && dateValue?.[0] === null)
              ? '2px solid #D23F2F !important'
              : '1px solid rgba(0, 0, 0, 0.23)',
          backgroundColor: 'white',
          padding: Boolean(anchorElNav) ? '0px 8px' : '1px 9px',
          ':hover': {
            borderColor: 'black'
          },
          minHeight: '40px'
        }}
      >
        <MultiInputDateRangeField
          onError={error => {
            if (error[0] === 'invalidRange') {
              handleChangeDateValue([dateValue[1], dateValue[0]])
              setError(false)
            } else {
              setError(error[0] === null && error[1] === null ? false : true)
            }
          }}
          value={dateValue}
          format='dd/MM/yyyy'
          onChange={handleChangeDateValue}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              border: '0px'
            },
            '& .MuiOutlinedInput-input': {
              border: '0px',
              padding: '0px',
              textAlign: 'center'
              // '&[id=":r1:"]' : {
              //     color: dateValue?.[0] === null && dateValue?.[1] !== null ? "red" : "inherit"
              // },
              // '&[id=":r2:"]' : {
              //     color: dateValue?.[1] === null && dateValue?.[0] !== null ? "red" : "inherit"
              // },
            }
          }}
        />
        <FlexBox
          onClick={() => {
            if (!error) {
              const currentTarget = document.getElementById(id) as HTMLDivElement
              setAnchorElNav(currentTarget)
            }
          }}
        >
          <EventIcon
            sx={{
              cursor: 'pointer'
            }}
            color={error ? 'error' : undefined}
          />
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
          <CalendarPopup value={dateValue === undefined ? [] : dateValue} setValue={handleChangeDateValue} />
          <StyledButton onClick={handleSetCurrentDate}>Today</StyledButton>
        </Popover>
      </FlexBetween>
    </FormControl>
  )
}
