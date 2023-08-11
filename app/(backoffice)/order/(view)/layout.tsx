import { backgroundColor } from '@/lib/config'
import { CollapseCard } from '@/components/common/card/collapse-card'
import { FilterForm } from './_components/filter-form'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <CollapseCard title='Tìm kiếm đơn hàng' backgroundColor={backgroundColor} padding='1rem'>
        <FilterForm />
      </CollapseCard>
      {children}
    </>
  )
}
