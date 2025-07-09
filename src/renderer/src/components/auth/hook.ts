import { LoginForm, useAuthReturn } from '@renderer/types/formType'
import { useForm } from '../customHooks/useForm'

const useAuth = (): useAuthReturn => {
  const { loginForm, setLoginForm, loginHandleChange } = useLogin()
  return {
    loginForm,
    setLoginForm,
    loginHandleChange
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

export default useAuth
