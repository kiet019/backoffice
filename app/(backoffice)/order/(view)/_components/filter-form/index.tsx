'use client'

import { useEffect, useState } from 'react'
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation'

import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DateRange, LocalizationProvider } from '@mui/x-date-pickers-pro'

import { SelectOption } from '../search-box/option'
import { SearchInput } from '../search-box/input'
import { SubTitle } from '../../../../../../components/common/typography/sub-title'
import FlexBetween from '@/components/mui/flex-box/flex-between'

import MultipleSelectOption from '../../../../../../components/common/multi-select-option'
import ViewDate from '../../../../../../components/common/calendar/view'
import { dateOptions, defaultFilter, originOptions, partnerOptions, searchOptions, statusOptions } from '../config'
import { format } from 'date-fns'

const StyledButton = styled(Button)({
  textTransform: 'none',
  margin: '10px 5px',
  width: '80px',
  height: '40px'
})
const getFilter = (searchParams: ReadonlyURLSearchParams) => {
  return {
    search: {
      option: searchParams.get('searchOption') ? (searchParams.get('searchOption') as string) : '',
      input: searchParams.get('searchInput') ? (searchParams.get('searchInput') as string) : ''
    },
    date: {
      option: searchParams.get('dateOption') ? (searchParams.get('dateOption')?.split('-') as string[]) : [],
      input: (searchParams.get('dateStart') && searchParams.get('dateEnd')) ? [
        searchParams.get('dateStart'),
        searchParams.get('dateEnd')
      ] : [null, null]
    },
    partner: {
      input: searchParams.get('partnerOption') ? searchParams.get('partnerOption')?.split('-') : []
    },
    status: {
      input: searchParams.get('statusOption') ? searchParams.get('statusOption')?.split('-') : []
    },
    origin: {
      input: searchParams.get('originOption') ? searchParams.get('originOption')?.split('-') : []
    }
  }
}
export const FilterForm = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [searchOption, setSearchOption] = useState<string>('')
  const [searchInput, setSearchInput] = useState<string>('')
  const [partnerOption, setPartnerOption] = useState<string[]>([])
  const [statusOption, setStatusOption] = useState<string[]>([])
  const [originOption, setOriginOption] = useState<string[]>([])
  const [dateOption, setDateOption] = useState<string[]>([])
  const [dateValue, setDateValue] = useState<DateRange<Date> | null[]>([])
  const [error, setError] = useState<boolean>(false)
  const [reset, handleReset] = useState<boolean>(false)

  useEffect(() => {
    let filter: any = defaultFilter
    if (searchParams.get('searchOption')) {
      filter = getFilter(searchParams)
    }
    setSearchOption(filter.search.option)
    setSearchInput(filter.search.input)
    setPartnerOption(filter.partner.input as string[])
    setStatusOption(filter.status.input as string[])
    setOriginOption(filter.origin.input as string[])
    setDateOption(filter.date.option as string[])
    setDateValue(filter.date.input as any)
    setError(false)
  }, [searchParams, reset])

  const handleFilterClick = () => {
    if (
      (dateOption.length === 0 && dateValue?.[0] !== null && dateValue?.[1] !== null) ||
      (dateValue?.[0] === null && dateValue?.[1] !== null) ||
      (dateValue?.[0] !== null && dateValue?.[1] === null) ||
      error
    ) {
    } else {
      const url = new URLSearchParams()

      url.append('searchOption', searchOption)
      url.append('searchInput', searchInput)
      url.append('dateOption', convertArrayToString(dateOption))
      url.append('dateStart', dateValue?.[0] !== null ? format(dateValue?.[0] as Date, 'yyyy-MM-dd') : '')
      url.append('dateEnd', dateValue?.[1] !== null ? format(dateValue?.[1] as Date, 'yyyy-MM-dd') : '')
      url.append('partnerOption', convertArrayToString(partnerOption))
      url.append('statusOption', convertArrayToString(statusOption))
      url.append('originOption', convertArrayToString(originOption))

      router.push(`${pathname}?${url.toString()}`)
    }
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <SubTitle title='Tìm kiếm' />
      <Grid container spacing={0}>
        <Grid item xs={2.5}>
          <SelectOption handleChangeOption={setSearchOption} option={searchOption} options={searchOptions} />
        </Grid>
        <Grid item xs={9.5}>
          <SearchInput
            handleChangeInput={setSearchInput}
            searchInput={searchInput}
            searchOption={searchOption}
            options={searchOptions}
          />
        </Grid>
      </Grid>
      <Grid container spacing={0}>
        <Grid item lg={5.5} xs={12}>
          <SubTitle title='Chọn loại ngày theo thời gian' />
          <Grid container spacing={0}>
            <Grid item lg={5.5} xs={2.5}>
              <MultipleSelectOption
                handleChangeOption={setDateOption}
                option={dateOption}
                options={dateOptions}
                error={dateOption.length === 0 && dateValue?.[0] !== null && dateValue?.[1] !== null}
              />
            </Grid>
            <Grid item lg={6} xs={9.5}>
              <ViewDate dateValue={dateValue} handleChangeDateValue={setDateValue} error={error} setError={setError} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={6.5} xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <SubTitle title='Đối tác' />
              <MultipleSelectOption
                handleChangeOption={setPartnerOption}
                option={partnerOption}
                options={partnerOptions}
              />
            </Grid>
            <Grid item xs={4}>
              <SubTitle title='Trạng thái' />
              <MultipleSelectOption
                handleChangeOption={setStatusOption}
                option={statusOption}
                options={statusOptions}
              />
            </Grid>
            <Grid item xs={4}>
              <SubTitle title='Nước' />
              <MultipleSelectOption
                handleChangeOption={setOriginOption}
                option={originOption}
                options={originOptions}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <FlexBetween>
        <Box></Box>
        <Box>
          <StyledButton
            variant='outlined'
            color='primary'
            sx={{
              backgroundColor: 'white !important'
            }}
            onClick={() => {
              handleReset(!reset)
              router.push("/order")
            }}
          >
            Đặt lại
          </StyledButton>
          <StyledButton variant='contained' color='primary' onClick={handleFilterClick}>
            Lọc
          </StyledButton>
        </Box>
      </FlexBetween>
    </LocalizationProvider>
  )
}
const convertArrayToString = (array: string[]): string => {
  let string = ''
  array.forEach(item => (string += `-${item}`))
  return string.slice(1, string.length)
}
