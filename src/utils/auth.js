// import Cookies from 'js-cookie'

const TokenValue = 'Admin-Token'
const TokenKey = 'Token-Field'
const ErrorTable = 'Error-Table'

export function getTokenKey() {
  return sessionStorage.getItem(TokenKey)
  // return Cookies.get(TokenKey)
}

export function setTokenKey(key) {
  return sessionStorage.setItem(TokenKey, key)
  // return Cookies.set(TokenKey, key)
}

export function getToken() {
  return sessionStorage.getItem(TokenValue)
  // return Cookies.get(TokenValue)
}

export function setToken(token) {
  return sessionStorage.setItem(TokenValue, token)
  // return Cookies.set(TokenValue, token)
}

export function removeToken() {
  return sessionStorage.removeItem(TokenValue)
  // return Cookies.remove(TokenValue)
}

export function setErrorTable(errTable) {
  return localStorage.setItem(ErrorTable, JSON.stringify(errTable))
}

export function getErrorTable() {
  try {
    const val = localStorage.getItem(ErrorTable)
    return JSON.parse(val)
  } catch (e) {
    return null
  }
}
