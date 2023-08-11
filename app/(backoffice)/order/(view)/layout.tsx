import { backgroundColor } from '@/lib/config'
import { SearchParams } from './_components/interface'
import { CollapseCard } from '@/components/common/card/collapse-card'
import { FilterForm } from './_components/filter-form'
import { ReactNode } from 'react'

export default function Layout({ searchParams, children }: { searchParams: SearchParams; children: ReactNode }) {
  return (
    <>
      <CollapseCard title='Tìm kiếm đơn hàng' backgroundColor={backgroundColor} padding='1rem'>
        <FilterForm/>
      </CollapseCard>
      {children}
    </>
  )
}
