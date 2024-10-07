import * as yup from 'yup'

export const registerSchema = yup.object().shape({
  name: yup.string().min(3).required('Name is required'),
  email: yup.string().email().required('Email is required'),
  password: yup.string().min(6).required('Password is required')
})
