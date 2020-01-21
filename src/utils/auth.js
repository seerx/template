import Cookies from 'js-cookie'

const TokenValue = 'Admin-Token'
const TokenKey = 'Token-Field'

export function getTokenKey() {
  return Cookies.get(TokenKey)
}

export function setTokenKey(key) {
  return Cookies.set(TokenKey, key)
}

export function getToken() {
  return Cookies.get(TokenValue)
}

export function setToken(token) {
  return Cookies.set(TokenValue, token)
}

export function removeToken() {
  return Cookies.remove(TokenValue)
}
