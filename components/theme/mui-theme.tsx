'use client'
import { FC, ReactNode, useState } from 'react'

import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'

import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles'

import customThemeOptions from './theme-options'
import { useServerInsertedHTML } from 'next/navigation'

// =======================================================
type MuiThemeProps = { children?: ReactNode }
// =======================================================

const MuiTheme: FC<MuiThemeProps> = ({ children }) => {
  const themeOptions = customThemeOptions()

  let theme = createTheme(themeOptions)
  theme = responsiveFontSizes(theme)

  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: 'mui' })
    cache.compat = true
    const prevInsert = cache.insert
    let inserted: string[] = []
    cache.insert = (...args) => {
      const serialized = args[1]
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name)
      }
      return prevInsert(...args)
    }
    const flush = () => {
      const prevInserted = inserted
      inserted = []

      return prevInserted
    }

    return { cache, flush }
  })

  useServerInsertedHTML(() => {
    const names = flush()
    if (names.length === 0) {
      return null
    }
    let styles = ''
    for (const name of names) {
      styles += cache.inserted[name]
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles
        }}
      />
    )
  })

  // theme shadows
  theme.shadows[1] = '0px 1px 3px rgba(3, 0, 71, 0.09)'
  theme.shadows[2] = '0px 4px 16px rgba(43, 52, 69, 0.1)'
  theme.shadows[3] = '0px 8px 45px rgba(3, 0, 71, 0.09)'
  theme.shadows[4] = '0px 0px 28px rgba(3, 0, 71, 0.01)'

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MuiTheme
