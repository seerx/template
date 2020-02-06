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

export const modifyInfo = ({ id, name }) => {
  return http.post([{
    'service': 'account.ModifyInfo',
    'args': {
      id,
      name
    }
  }])
}

export const modifyPassword = ({ id, oldPwd, newPwd }) => {
  return http.post([{
    'service': 'account.ModifyPassword',
    'args': {
      id,
      oldPwd,
      newPwd
    }
  }])
}

export const list = () => {
  return http.post([{
    'service': 'account.List'
  }])
}

export const setStatus = ({ id, status }) => {
  return http.post([{
    'service': 'account.SetStatus',
    'args': {
      id,
      status
    }
  }])
}

export const resetPassword = ({ id }) => {
  return http.post([{
    'service': 'account.ResetPassword',
    'args': {
      id
    }
  }])
}

export const createAccount = ({ id, name }) => {
  return http.post([{
    'service': 'account.CreateAccount',
    'args': {
      id,
      name
    }
  }])
}

