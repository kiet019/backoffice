import { components } from './components'
import { primary, themeColors } from './theme-colors'
import { typography } from './typography'

const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920
  }
}

const themeOptions = () => {
  return {
    typography,
    breakpoints,
    components: { ...components },
    palette: { primary: { ...primary, light: primary[100] }, ...themeColors }
  }
}

export default themeOptions
