export type LoginForm = {
  email: string
  password: string
  remember: boolean
}
export type RegisterForm = {
  email: string
  password: string
  userName: string
  confirmPassword?: null | string
}

export type UserAction =
  | { type: 'LOGIN'; payload: LoginForm }
  | { type: 'REGISTER'; payload: RegisterForm }
  | { type: 'LOGOUT'; payload: undefined }

export type useAuthReturn = {
  loginForm: LoginForm
  setLoginForm: React.Dispatch<React.SetStateAction<LoginForm>>
  loginHandleChange: (
    eOrValue: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | any,
    fieldName?: keyof LoginForm
  ) => void
  registerForm: RegisterForm
  setRegisterForm: React.Dispatch<React.SetStateAction<RegisterForm>>
  registerHandleChange: (
    eOrValue: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | any,
    fieldName?: keyof RegisterForm
  ) => void
  handleUserAction: (action: UserAction) => void
}
