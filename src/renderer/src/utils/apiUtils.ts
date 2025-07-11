import { ErrorResponse, SuccessResponse } from '@renderer/apiConfig/api'
import { globalNavigate } from '@renderer/providers/authProvider'

//this type is for response error message
type UserResponseErrorMessage = string | { message: string }

// this type is for payload comming from backend if login success
type UserLoginSuccessResponse = {
  data: any
  token: string
  message: string
}

type UserRegisterSuccessResponse = {
  data: any
  message: string
}

// this type is for actions that handleSuccessResponse can handle
type UserActionSuccessResponse =
  | { type: 'LOGIN'; payload: SuccessResponse }
  | { type: 'REGISTER'; payload: SuccessResponse }
  | { type: 'LOGOUT'; payload: SuccessResponse }

export const handleSuccessResponse = (action: UserActionSuccessResponse) => {
  // handleLoginResponse
  const handleLoginResponse = (payload: UserLoginSuccessResponse) => {
    const { token, message } = payload
    alert(message)
    localStorage.setItem('token', token)
    window.location.href = '/'
  }

  const handleRegisterResponse = (payload: UserRegisterSuccessResponse) => {
    const { message } = payload
    alert(message)
    globalNavigate('/auth/sign-in')
  }

  switch (action.type) {
    case 'LOGIN':
      handleLoginResponse(action.payload.data)
    case 'REGISTER':
      handleRegisterResponse(action.payload.data)
    case 'LOGOUT':
  }
}

// ********************error response hanlder************************

// this type is for actions that handleErrorResponse can handle
type UserActionErrorResponse =
  | { type: 'LOGIN'; payload: ErrorResponse }
  | { type: 'REGISTER'; payload: ErrorResponse }
  | { type: 'LOGOUT'; payload: ErrorResponse }
  | { type: 'COMMON'; payload: ErrorResponse }

export const handleErrorResponse = (action: UserActionErrorResponse) => {
  // handleLoginResponse
  const handleCommonResponse = (payload: UserResponseErrorMessage) => {
    const message = getFormatedErrorMessage(payload)
    alert(message)
  }

  switch (action.type) {
    case 'COMMON':
      handleCommonResponse(action.payload.data)
    case 'LOGIN':

    case 'REGISTER':
    case 'LOGOUT':
  }
}

const getFormatedErrorMessage = (data: UserResponseErrorMessage) => {
  if (typeof data == 'string') {
    return data
  } else {
    const { message } = data
    return message
  }
}
