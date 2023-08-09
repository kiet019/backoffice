import { FC } from 'react'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

// ===============================================================
type EyeToggleButtonProps = { show: boolean; click: () => void }
// ===============================================================

const EyeToggleButton: FC<EyeToggleButtonProps> = ({ show, click }) => {
  return (
    <IconButton size='small' type='button' onClick={click}>
      {show ? (
        <Visibility className='passwordEye' fontSize='small' />
      ) : (
        <VisibilityOff className='passwordEye' fontSize='small' />
      )}
    </IconButton>
  )
}

export default EyeToggleButton
