import TableCell from '@mui/material/TableCell'
import { SxProps } from '@mui/system/styleFunctionSx'
import React, { ReactNode } from 'react'

// export const StyledTableCell = styled(TableCell)(({ theme }) => ({
//     [`&.${tableCellClasses.head}`]: {
//         backgroundColor: theme.palette.common.black,
//         color: theme.palette.common.white,
//     },
//     [`&.${tableCellClasses.body}`]: {
//         backgroundColor: "white",
//         fontSize: 14,
//     },
//     border: "1px solid #DDDDDD"
// }));
type Props = SxProps & {
  children: ReactNode
  align?: 'left' | 'right' | 'center' | 'justify' | 'inherit'
  body?: boolean
  key?: any
  width?: string
  padding?: string
}

export const Cell: React.FC<Props> = ({
  padding = '5px',
  width = 'fit-content',
  align = 'center',
  children,
  body = true,
  ...props
}) => {
  return (
    <TableCell
      align={align}
      sx={{
        padding: body ? padding : '5px',
        color: body ? 'black' : 'white',
        backgroundColor: body ? 'white' : '#2A3542',
        border: '2px solid #DDDDDD',
        height: body ? '105px' : 'fit-content',
        width: width,
        ...props
      }}
    >
      <div
        style={{
          height: '100%'
        }}
      >
        {children}
      </div>
    </TableCell>
  )
}
