import type { Metadata } from 'next'
import FlexRowCenter from '@/components/mui/flex-box/flex-row-center'

export const metadata: Metadata = {
  title: 'Woka',
  description: 'Woka Back-Office'
}
export default function CommonLayout({ children }: { children: React.ReactNode }) {
  return (
    <FlexRowCenter flexDirection='column' minHeight='100vh'>
      {children}
    </FlexRowCenter>
  )
}
