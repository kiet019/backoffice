'use client'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { OptionProps } from '../interface'

export const SearchInput = ({
  handleChangeInput,
  searchInput,
  searchOption,
  options
}: {
  handleChangeInput: any
  searchInput?: string
  searchOption: string
  options: OptionProps[]
}) => {
  return (
    <FormControl fullWidth>
      <TextField
        focused={false}
        sx={{
          '& .MuiInputBase-root': {
            backgroundColor: 'white',
            borderRadius: '0px',
            height: '40px'
          }
        }}
        placeholder={
          searchInput !== '' ? searchInput : `Nhập ${options.find(value => value.id === searchOption)?.name}`
        }
        onChange={e => {
          handleChangeInput(e.target.value)
        }}
        value={searchInput}
      />
    </FormControl>
  )
}
