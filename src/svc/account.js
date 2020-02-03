import http from '@/svc/http'

export const login = ({ user, password }) => {
  return http.post([{
    'service': 'login.Login',
    'args': {
      user,
      password
    }
  }])
}

export const logout = () => {
  return http.post([{
    'service': 'account.Logout'
  }])
}

export const getInfo = (token) => {
  return http.post([{
    'service': 'account.Info',
    'args': {
      token
    }
  }])
}

export const uploadAvatar = (imageFile) => {
  return http.upload([{
    'service': 'account.UploadAvatar'
  }], {
    avatar: imageFile
  })
}

