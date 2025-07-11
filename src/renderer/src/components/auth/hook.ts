import { LoginForm, RegisterForm, useAuthReturn, UserAction } from '@renderer/types/formType'
import { useForm } from '../customHooks/useForm'
import { useMutation } from '@tanstack/react-query'
import { loginUserApi, registerUserApi } from './api'
import { generalUtil } from '@renderer/utils/generalUtility'
import { handleErrorResponse, handleSuccessResponse } from '@renderer/utils/apiUtils'

const useAuth = (): useAuthReturn => {
  const { loginForm, setLoginForm, loginHandleChange } = useLogin()
  const { registerForm, setRegisterForm, registerHandleChange } = useRegister()

  const handleUserAction = (action: UserAction) => {
    const handleLogin = (data: LoginForm) => {
      if (!generalUtil.string.isEmail(data.email)) {
        return alert('Enter a valid email')
      }
      if (generalUtil.string.isEmpty(data.password)) {
        return alert('Password is required')
      }

      loginUserMutate(data)
    }
    const hanldeRegister = (data: RegisterForm) => {
      if (!generalUtil.string.isEmail(data.email)) {
        return alert('Enter a valid email')
      }
      if (generalUtil.string.isEmpty(data.password)) {
        return alert('Password is required')
      }
      if (generalUtil.string.isEmpty(data.userName)) {
        alert('Username is Required')
      }

      registerUserMutate(data)
    }

    switch (action.type) {
      case 'LOGIN':
        handleLogin(action.payload)
      case 'REGISTER':
        hanldeRegister(action.payload as RegisterForm)
    }
  }

  const { mutate: loginUserMutate } = useMutation({
    mutationKey: ['loginUser'],
    mutationFn: (payload: LoginForm) => loginUserApi(payload),
    onSuccess: (response) => {
      const { status } = response
      if (status == 200) {
        handleSuccessResponse({ type: 'LOGIN', payload: response })
      }
      if (status != 200) {
        handleErrorResponse({ type: 'COMMON', payload: response })
      }
    }
  })

  const { mutate: registerUserMutate } = useMutation({
    mutationKey: ['loginUser'],
    mutationFn: (payload: RegisterForm) => registerUserApi(payload),
    onSuccess: (response) => {
      console.log(response)
      const { status } = response
      if (status == 200) {
        handleSuccessResponse({ type: 'REGISTER', payload: response })
      }
      if (status != 200) {
        handleErrorResponse({ type: 'COMMON', payload: response })
      }
    }
  })
  return {
    loginForm,
    setLoginForm,
    loginHandleChange,
    registerForm,
    setRegisterForm,
    registerHandleChange,
    handleUserAction
  }
}

const useLogin = () => {
  const {
    form: loginForm,
    setForm: setLoginForm,
    handleChange: loginHandleChange
  } = useForm<LoginForm>({
    email: '',
    password: '',
    remember: false
  })

  return {
    loginForm,
    setLoginForm,
    loginHandleChange
  }
}

const useRegister = () => {
  const {
    form: registerForm,
    setForm: setRegisterForm,
    handleChange: registerHandleChange
  } = useForm<RegisterForm>({
    email: '',
    password: '',
    userName: '',
    confirmPassword: null
  })

  return {
    registerForm,
    setRegisterForm,
    registerHandleChange
  }
}

export default useAuth
