type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

type Route<M extends HttpMethod, Turl extends string> = {
  method: M
  url: Turl
}

const user = {
  loginUser: { method: 'POST', url: '/user/login' } as Route<'POST', '/user/login'>,
  registerUser: { method: 'POST', url: '/user' } as Route<'POST', '/user'>,
  getCurrentUser: { method: 'GET', url: '/user' } as Route<'GET', '/user'>,
  checkUserNameTaken: { method: 'GET', url: '/user/is-username-taken' } as Route<
    'GET',
    '/user/is-username-taken'
  >,
  getUserById: (id: string): Route<'GET', `/user/${string}`> => ({
    method: 'GET',
    url: `/user/${id}`
  })
}

const endpoints = {
  ...user
}

export default endpoints
