const baseUrl = 'http://localhost:5000'

/**
 * It takes a method, endpoint, params, and token, and returns a promise that
 * resolves to the JSON response from the server
 * @param method - The HTTP method to use (GET, POST, PUT, DELETE)
 * @param endpoint - The endpoint you want to hit.
 * @param params - The parameters to send to the API.
 * @param [token=null] - The token that we get from the login request.
 * @returns A function that takes in 4 parameters and returns a promise.
 */
const request = async (method, endpoint, params, token = null) => {
  method = method.toLowerCase()
  let fullUrl = `${baseUrl}${endpoint}`
  let body = null
  // eslint-disable-next-line default-case
  switch (method) {
    case 'get':
      let queryString = new URLSearchParams(params).toString()
      fullUrl += `?${queryString}`
      console.log(fullUrl)
      break
    case 'post':
    case 'put':
    case 'delete':
      body = JSON.stringify(params)
      break
  }
  let headers = { 'Content-Type': 'application/json' }
  // if (token) {
  //   headers.Authorization = `Bearer ${token}`
  // }
  let req = await fetch(fullUrl, { method, headers, body })
  let json = await req.json()
  return json
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return {
    getToken: () => {
      return localStorage.getItem('token')
    },

    validateToken: async () => {
      let token = localStorage.getItem('token')
      let json = await request('post', '/user/validate', { token })
      return json
    },

    login: async (email, password) => {
      let json = await request('post', '/user/signin', { email, password })
      return json
    },
    logout: async () => {
      localStorage.removeItem('token')
      return
    },
    getRefeicao: async () => {
      let token = localStorage.getItem('token')
      let url = `${baseUrl}/refeicao/list?token=${token}`
      let req = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      let json = await req.json()
      return json
    },
    updateRefeição: async (id, body) => {
      let token = localStorage.getItem('token')
      body = { ...body, token }
      let json = await request('post', `/refeicao/${id}`, body)
      return json
    },
  }
}
