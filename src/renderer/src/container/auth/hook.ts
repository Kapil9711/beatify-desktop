import { LoginForm, RegisterForm, useAuthReturn, UserAction } from '@renderer/types/formType'
import { useForm } from '@renderer/components/customHooks/useForm'
import { useMutation } from '@tanstack/react-query'
import { loginUserApi, registerUserApi } from './api'
import { generalUtil } from '@renderer/utils/generalUtility'
import { handleErrorResponse, handleSuccessResponse } from '@renderer/utils/apiUtils'

const useAuth = (): useAuthReturn => {
  const { loginForm, setLoginForm, loginHandleChange, resetLoginForm } = useLogin()
  const { registerForm, setRegisterForm, registerHandleChange, resetRegisterForm } = useRegister()

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
        break
      case 'REGISTER':
        hanldeRegister(action.payload as RegisterForm)
        break
    }
  }

  const { mutate: loginUserMutate } = useMutation({
    mutationKey: ['loginUser'],
    mutationFn: (payload: LoginForm) => loginUserApi(payload),
    onSuccess: async (response) => {
      const { status } = response
      if (status == 200) {
        await handleSuccessResponse({ type: 'LOGIN', payload: response })
        resetLoginForm()
      }
      if (status != 200) {
        handleErrorResponse({ type: 'COMMON', payload: response })
      }
    }
  })

  const { mutate: registerUserMutate } = useMutation({
    mutationKey: ['registerUser'],
    mutationFn: (payload: RegisterForm) => registerUserApi(payload),
    onSuccess: async (response) => {
      const { status } = response
      if (status == 200) {
        await handleSuccessResponse({ type: 'REGISTER', payload: response })
        resetRegisterForm()
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
    handleChange: loginHandleChange,
    resetForm: resetLoginForm
  } = useForm<LoginForm>({
    email: '',
    password: '',
    remember: false
  })

  return {
    loginForm,
    setLoginForm,
    loginHandleChange,
    resetLoginForm
  }
}

const useRegister = () => {
  const {
    form: registerForm,
    setForm: setRegisterForm,
    handleChange: registerHandleChange,
    resetForm: resetRegisterForm
  } = useForm<RegisterForm>({
    email: '',
    password: '',
    userName: '',
    confirmPassword: null
  })

  return {
    registerForm,
    setRegisterForm,
    registerHandleChange,
    resetRegisterForm
  }
}

export default useAuth
