import { FC, Fragment } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import FlexBox from "@/components/mui/flex-box/flex-box";
import Image from "@/components/mui/image";

// =======================================
type SocialButtonsProps = {
  handleGoogle?: () => void
  handleFacebook?: () => void
}
// =======================================

const SocialButtons: FC<SocialButtonsProps> = () => {
  return (
    <Fragment>
      <Box mb={3} mt={3.8}>
        <Box width='200px' mx='auto'>
          <Divider />
        </Box>

        <FlexBox justifyContent='center' mt={-1.625}>
          <Box color='grey.600' bgcolor='background.paper' px={2}>
            or
          </Box>
        </FlexBox>
      </Box>

      <Button className='facebookButton' size='medium' fullWidth sx={{ height: 44 }}>
        <Image src='/assets/images/icons/facebook-filled-white.svg' alt='facebook' />
        <Box fontSize='12px' ml={1}>
          Continue with Facebook
        </Box>
      </Button>

      <Button className='googleButton' size='medium' fullWidth sx={{ height: 44 }}>
        <Image src='/assets/images/icons/google-1.svg' alt='facebook' />
        <Box fontSize='12px' ml={1}>
          Continue with Google
        </Box>
      </Button>
    </Fragment>
  )
}

export default SocialButtons
