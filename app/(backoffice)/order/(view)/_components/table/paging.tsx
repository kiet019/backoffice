'use client'
import FlexBetween from '@/components/mui/flex-box/flex-between'
import FlexBox from '@/components/mui/flex-box/flex-box'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import LastPageIcon from '@mui/icons-material/LastPage'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { T } from '@/components/common/typography/text'
import { backgroundColor } from '@/lib/config'
import { SearchParams } from '../interface'

const pageOptions = [
  { value: 20, name: '20 dòng / trang' },
  { value: 60, name: '60 dòng / trang' },
  { value: 100, name: '100 dòng / trang' }
]
const getPage = (params: ReadonlyURLSearchParams) => {
  return {
    page: Number.parseInt(params.get('page') !== null ? (params.get('page') as string) : '1'),
    numberLine: Number.parseInt(params.get('numberLine') !== null ? (params.get('numberLine') as string) : '20')
  }
}
export const Pagination = ({ totalPage }: { totalPage: number }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { page, numberLine } = getPage(searchParams)

  const handlePageChange = (page: number, numberLine: number) => {
    const url = new URLSearchParams(searchParams.toString())
    url.delete("page")
    url.delete("numberLine")
    
    url.append("page", page.toString())
    url.append("numberLine", numberLine.toString())

    router.push(`${pathname}?${url.toString()}`)
  }
  return (
    <FlexBetween bgcolor={backgroundColor}>
      <div></div>
      <FlexBox padding={2} alignItems='center' whiteSpace='nowrap'>
        <T marginRight='1rem'>
          {totalPage === 0 ? 0 : `${(page - 1) * numberLine + 1} - ${page * numberLine}`} / {totalPage * numberLine} 
          dòng
        </T>
        <FormControl
          fullWidth
          sx={{
            marginRight: '1rem'
          }}
        >
          <Select
            value={numberLine}
            size='small'
            sx={{
              width: 'fit-content'
            }}
          >
            {pageOptions.map(item => (
              <MenuItem onClick={() => {
                handlePageChange(page, item.value)
              }} value={item.value} key={item.value}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <IconButton
          disabled={page === 1}
          onClick={() => {
            
          }}
        >
          <FirstPageIcon />
        </IconButton>
        <IconButton
          disabled={page === 1}
          onClick={() => {
            
          }}
        >
          <NavigateBeforeIcon />
        </IconButton>
        <Typography
          sx={{
            fontWeight: 400,
            margin: '0px 10px 0px 10px',
            fontSize: '1rem'
          }}
        >
          {page}
        </Typography>
        <IconButton
          disabled={page >= totalPage}
          onClick={() => {
            handlePageChange(page + 1, numberLine)
          }}
        >
          <NavigateNextIcon />
        </IconButton>
        <IconButton
          disabled={page >= totalPage}
          onClick={() => {
            
          }}
        >
          <LastPageIcon />
        </IconButton>
      </FlexBox>
    </FlexBetween>
  )
}
