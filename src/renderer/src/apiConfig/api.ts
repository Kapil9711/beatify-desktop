import axios, { AxiosInstance, AxiosResponse, AxiosError, Method } from 'axios'

// 1. Token getter utility
const getToken = (): string | null => {
  return localStorage.getItem('token')
}

// 2. Create an Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // <-- Replace with actual base URL
  headers: {
    'Content-Type': 'application/json'
  }
})

// 3. Attach Authorization token automatically
axiosInstance.interceptors.request.use((config) => {
  const token = getToken()
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 4. Types for API caller
interface AxiosBaseArgs {
  url: string
  method?: Method // e.g., 'GET', 'POST', etc.
  data?: any
  params?: Record<string, any>
  headers?: Record<string, string>
}

interface SuccessResponse<T = any> {
  data: T
}

interface ErrorResponse {
  error: {
    status: number
    data: any
  }
}

// 5. Generic Axios API wrapper
export const axiosBase = async <T = any>(
  config: AxiosBaseArgs
): Promise<SuccessResponse<T> | ErrorResponse> => {
  const { url, method = 'GET', data, params, headers = {} } = config

  try {
    const response: AxiosResponse<T> = await axiosInstance({
      url,
      method,
      data,
      params,
      headers
    })
    return { data: response.data }
  } catch (error) {
    const err = error as AxiosError

    return {
      error: {
        status: err.response?.status || 500,
        data: err.response?.data || err.message
      }
    }
  }
}
