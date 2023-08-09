import type { Metadata } from 'next'
import MuiTheme from '@/components/theme/mui-theme'

export const metadata: Metadata = {
  title: 'Woka',
  description: 'Woka Back-Office'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <MuiTheme>{children}</MuiTheme>
      </body>
    </html>
  )
}
