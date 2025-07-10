import { axiosBase, ErrorResponse, SuccessResponse } from '@renderer/apiConfig/api'
import endpoints from '@renderer/apiConfig/endpoint'
import { LoginForm } from '@renderer/types/formType'

export const loginUserApi = async (
  payload: LoginForm
): Promise<SuccessResponse<any> | ErrorResponse> => {
  return await axiosBase({ ...endpoints.loginUser, data: payload })
}
