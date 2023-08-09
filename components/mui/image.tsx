import { compose, display, spacing, styled, style } from '@mui/system'

const Image = styled('img')(
  compose(
    spacing,
    display,
    style({
      prop: 'display',
      cssProperty: 'block'
    })
  )
)

// Image.defaultProps = { display: 'block' }

export default Image
