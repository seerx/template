import axios from 'axios'
import store from '@/store'
import { MessageBox, Message } from 'element-ui'
// import { getToken } from '@/utils/auth'

class HttpRequest {
  api = '/api'
  request = (opt) => {
    const instance = this.instance(opt)
    return new Promise((resolve, reject) => {
      instance.then(res => {
        const { data } = res
        if (opt['data'].length === 1) {
          const resp = data[opt['data'][0]['service']][0]
          resolve(resp)
        } else {
          resolve(data)
        }
      }, err => {
        reject(err)
      })
    })
  }
  get = (data) => {
    const opt = {
      method: 'get',
      url: this.api,
      data
    }
    return this.request(opt)
  }
  post = (data) => {
    const opt = {
      method: 'post',
      url: this.api,
      data
    }
    return this.request(opt)
  }
  instance = axios.create({
    // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
  })
  interceptors() {
    this.instance.interceptors.request.use(cfg => {
      if (store.getters.token) {
        cfg.headers['X-Token'] = store.getters.token
      }
      return cfg
    }, err => {
      console.log(err) // for debug
      return Promise.reject(err)
    })
    this.instance.interceptors.response.use(
      res => {
        // 返回信息
        // 从返回信息中，获取 data
        const { data } = res
        if (data['error']) {
          // 发生错误
          // 判断错误类型
          if (this.needLogin(data['error'])) {
            // 需要登录 to re-login
            this.tryToLogin()
          } else {
            // 其他错误信息，给出提示
            Message({
              message: data['error'] === '' ? '未知错误' : data['error'],
              type: 'error',
              duration: 5 * 1000
            })
            Promise.reject(data)
          }
        } else {
          const innerData = data['data']
          let toLogin = false
          for (var k in innerData) {
            const item = innerData[k]
            toLogin = false
            for (var n = 0; n < item.length; n++) {
              if (this.needLogin(item[n]['error'])) {
                // 需要登录
                toLogin = true
                break
              } else {
                // 其他错误
                Message({
                  message: item[n]['error'],
                  type: 'error',
                  duration: 5 * 1000
                })
              }
            }
            if (toLogin) {
              break
            }
          }
          if (toLogin) {
            this.tryToLogin()
          }
          // 没有错误，直接返回 data
          return data
        }
      },
      err => {
        // 错误信息
        console.log('request error', err)
        Message({
          message: err.message,
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(err)
      }
    )
  }
  needLogin(err) {
    return err === 'need-login'
  }
  tryToLogin() {
    MessageBox.confirm('您的登录信息已经失效, 点击取消按钮定留在当前页, 点击重新登录按钮转到登录页', '确认', {
      confirmButtonText: '重新登录',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      store.dispatch('user/resetToken').then(() => {
        location.reload()
      })
    })
  }
}

export default HttpRequest
