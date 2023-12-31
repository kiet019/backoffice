'use client'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { OptionProps } from '../interface'

export const SelectOption = ({
  handleChangeOption,
  option,
  options
}: {
  handleChangeOption: any
  option?: string
  options: OptionProps[]
}) => {
  return (
    <FormControl fullWidth>
      <Select
        size='small'
        value={option}
        onChange={e => {
          handleChangeOption(e.target.value)
        }}
        sx={{
          height: '40px',
          color: 'black',
          backgroundColor: 'white',
          borderRadius: '0px',
          '& .MuiOutlinedInput-notchedOutline': {
            border: '1px solid rgba(0, 0, 0, 0.23) !important'
          }
        }}
      >
        {options.map(item => (
          <MenuItem value={item.id} key={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
