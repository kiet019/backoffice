'use client'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import FlexBox from '@/components/mui/flex-box/flex-box'
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import IconButton from '@mui/material/IconButton'

interface Props {
  type: 'create' | 'complete'
}
const getSort = (searchParams: ReadonlyURLSearchParams) => {
  return {
    sort: searchParams.get('sort') !== null ? (searchParams.get('sort') as string) : 'complete',
    isAsc: searchParams.get('isAsc') !== null ? (searchParams.get('isAsc') as string) : 'ASC'
  }
}
export const SortIcon = ({ type }: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isHover, setIsHover] = useState<boolean>(false)
  const { sort, isAsc } = getSort(searchParams)
  const isActive = Boolean(sort === type)
  const isASC = isActive ? isAsc : 'ASC'

  const handleSortChange = () => {
    const url = new URLSearchParams(searchParams.toString())
    let isAsc = isASC
    if (isActive) {
      isAsc = isASC === "ASC" ? "DESC" : "ASC"
    } 
    url.delete("sort")
    url.delete("isAsc")

    url.append("sort", type)
    url.append("isAsc", isAsc)

    router.push(`${pathname}?${url.toString()}`)
  }
  return (
    <IconButton
      sx={{
        height: 'fit-content',
        color: 'white',
        opacity: isActive ? 1 : isHover ? 1 : 0
      }}
      onMouseEnter={() => {
        setIsHover(true)
      }}
      onMouseLeave={() => {
        setIsHover(false)
      }}
      size='small'
      onClick={handleSortChange}
    >
      <FlexBox alignItems='center'>{isASC === 'ASC' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}</FlexBox>
    </IconButton>
  )
}
