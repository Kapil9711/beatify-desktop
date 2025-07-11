import { axiosBase, ErrorResponse, SuccessResponse } from '@renderer/apiConfig/api'
import endpoints from '@renderer/apiConfig/endpoint'
import { LoginForm, RegisterForm } from '@renderer/types/formType'

export const loginUserApi = async (
  payload: LoginForm
): Promise<SuccessResponse<any> | ErrorResponse> => {
  return await axiosBase({ ...endpoints.loginUser, data: payload })
}

export const registerUserApi = async (
  payload: RegisterForm
): Promise<SuccessResponse<any> | ErrorResponse> => {
  return await axiosBase({ ...endpoints.registerUser, data: payload })
}

export const userNameAlreadyTakenApi = async (payload: {
  userName: string
}): Promise<SuccessResponse<any> | ErrorResponse> => {
  return await axiosBase({ ...endpoints.checkUserNameTaken, params: payload })
}
