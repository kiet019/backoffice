'use client'
import { useCallback, useState } from 'react'
import Link from 'next/link'
import * as yup from 'yup'
import { useFormik } from 'formik'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

import { H1, H6 } from '@/components/mui/typography'
import FlexRowCenter from '@/components/mui/flex-box/flex-row-center'
import FlexBox from '@/components/mui/flex-box/flex-box'
import TextField from '@/components/mui/text-field'
import Image from '@/components/mui/image'
import SocialButtons from '@/components/common/social-buttons'
import EyeToggleButton from '@/components/common/eye-toggle-button'
import Wrapper from '@/app/(common)/login/_components/wrapper'

const Login = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false)

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility(visible => !visible)
  }, [])

  const handleFormSubmit = async (values: any) => {
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema: formSchema
  })

  return (
    <Wrapper elevation={3} passwordVisibility={passwordVisibility}>
      <form onSubmit={handleSubmit}>
        <Image src='/assets/images/bazaar-black-sm.svg' sx={{ m: 'auto' }} alt=''/>

        <H1 textAlign='center' mt={1} mb={4} fontSize={16}>
          Welcome To Bazaar
        </H1>

        <TextField
          mb={1.5}
          fullWidth
          name='email'
          size='small'
          type='email'
          variant='outlined'
          onBlur={handleBlur}
          value={values.email}
          onChange={handleChange}
          label='Email or Phone Number'
          placeholder='exmple@mail.com'
          error={!!touched.email && !!errors.email}
          helperText={(touched.email && errors.email) as string}
        />

        <TextField
          mb={2}
          fullWidth
          size='small'
          name='password'
          label='Password'
          autoComplete='on'
          variant='outlined'
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          placeholder='*********'
          type={passwordVisibility ? 'text' : 'password'}
          error={!!touched.password && !!errors.password}
          helperText={(touched.password && errors.password) as string}
          InputProps={{
            endAdornment: <EyeToggleButton show={passwordVisibility} click={togglePasswordVisibility} />
          }}
        />

        <Button fullWidth type='submit' color='primary' variant='contained' sx={{ height: 44 }}>
          Login
        </Button>
      </form>

      <SocialButtons />

      <FlexRowCenter mt='1.25rem'>
        <Box>Don&apos;t have account?</Box>
        <Link href='/signup' passHref legacyBehavior>
          <a>
            <H6 ml={1} borderBottom='1px solid' borderColor='grey.900'>
              Sign Up
            </H6>
          </a>
        </Link>
      </FlexRowCenter>

      <FlexBox justifyContent='center' bgcolor='grey.200' borderRadius='4px' py={2.5} mt='1.25rem'>
        Forgot your password?
        <Link href='/reset-password' passHref legacyBehavior>
          <a>
            <H6 ml={1} borderBottom='1px solid' borderColor='grey.900'>
              Reset It
            </H6>
          </a>
        </Link>
      </FlexBox>
    </Wrapper>
  )
}

const initialValues = {
  email: '',
  password: ''
}

const formSchema = yup.object().shape({
  password: yup.string().required('Password is required'),
  email: yup.string().email('invalid email').required('Email is required')
})

export default Login
