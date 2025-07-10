import { LoginForm, useAuthReturn, UserAction } from '@renderer/types/formType'
import { useForm } from '../customHooks/useForm'
import { useMutation } from '@tanstack/react-query'
import { loginUserApi } from './api'
import { generalUtil } from '@renderer/utils/generalUtility'
import { handleErrorResponse, handleSuccessResponse } from '@renderer/utils/apiUtils'

const useAuth = (): useAuthReturn => {
  const { loginForm, setLoginForm, loginHandleChange, handleUserAction } = useLogin()
  return {
    loginForm,
    setLoginForm,
    loginHandleChange,
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

  const handleUserAction = (action: UserAction) => {
    const handleLogin = (data: LoginForm) => {
      if (!generalUtil.string.isEmail(data.email)) {
        return alert('Enter a valid email')
      }
      if (generalUtil.string.isEmpty(data.password)) {
        return alert('Password is required')
      }

      registerUserMutate(data)
    }

    switch (action.type) {
      case 'LOGIN':
        handleLogin(action.payload)
    }
  }

  const { mutate: registerUserMutate } = useMutation({
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

  return {
    loginForm,
    setLoginForm,
    loginHandleChange,
    handleUserAction
  }
}

export default useAuth
