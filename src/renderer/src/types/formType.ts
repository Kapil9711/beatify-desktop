export type LoginForm = {
  email: string
  password: string
  remember: boolean
}

export type UserAction =
  | { type: 'LOGIN'; payload: LoginForm }
  | { type: 'REGISTER'; payload: { email: string; password: string; userName: string } }
  | { type: 'LOGOUT'; payload: undefined }

export type useAuthReturn = {
  loginForm: LoginForm
  setLoginForm: React.Dispatch<React.SetStateAction<LoginForm>>
  loginHandleChange: (
    eOrValue: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | any,
    fieldName?: keyof LoginForm
  ) => void
  handleUserAction: (action: UserAction) => void
}
