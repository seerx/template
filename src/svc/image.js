import http from '@/svc/http'

export const image = (service, param) => {
  return http.download([{
    'service': service,
    'arg': param
  }])
}
