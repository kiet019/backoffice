import { FC } from 'react'
import Box, { BoxProps } from '@mui/material/Box'
import MuiTextField, { TextFieldProps } from '@mui/material/TextField'
import { Small } from '@/components/mui/typography'

type Props = TextFieldProps & BoxProps

const TextField: FC<Props> = ({ label, InputProps, ...props }) => {
  const boxProps: BoxProps = {}
  const textFieldProps: TextFieldProps = {}

  for (const key in props) {
    if (spacePropList.includes(key)) {
      // @ts-ignore
      boxProps[key] = props[key]
    } else {
      // @ts-ignore
      textFieldProps[key] = props[key]
    }
  }

  return (
    <Box {...boxProps}>
      {label && (
        <Small display='block' mb={1} textAlign='left' fontWeight='600' color='grey.700'>
          {label}
        </Small>
      )}

      <MuiTextField
        InputProps={{
          ...InputProps,
          style: { ...InputProps?.style, height: 44 }
        }}
        {...textFieldProps}
      />
    </Box>
  )
}

const spacePropList = [
  'm',
  'mt',
  'mr',
  'mb',
  'ml',
  'mx',
  'my',
  'p',
  'pt',
  'pr',
  'pb',
  'pl',
  'px',
  'py',
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'marginX',
  'marginY',
  'padding',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'paddingX',
  'paddingY'
]

export default TextField
