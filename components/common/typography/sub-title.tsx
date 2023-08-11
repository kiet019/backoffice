import Typography from '@mui/material/Typography'
import { SxProps } from '@mui/system/styleFunctionSx'
import React from 'react'

type Props = SxProps & {
  title: string
}
export const SubTitle: React.FC<Props> = ({ title, ...props }) => (
  <Typography
    sx={{
      marginTop: '5px',
      color: 'black',
      fontSize: '12px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '19.92px',
      letterSpacing: '0.4px',
      wordWrap: 'break-word',
      ...props
    }}
  >
    {title}
  </Typography>
)

// font - weight: 500;
// line - height: 24px; /* 171.429% */
// letter - spacing: 0.4px;
// text - transform: uppercase;
