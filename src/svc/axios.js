import axios from 'axios'
import store from '@/store'
import { MessageBox, Message } from 'element-ui'
// import { getToken, getTokenKey } from '@/utils/auth'

class HttpRequest {
  api = '/api'
  request = (opt) => {
    const instance = this.newInstance()(opt)
    return new Promise((resolve, reject) => {
      instance.then(res => {
        if (!(res instanceof Object)) {
          reject(res)
          return
        }
        const { data } = res
        if (opt['data'].length === 1) {
          const resp = data[opt['data'][0]['service']][0]
          resolve(resp)
        } else {
          resolve(data)
        }
      }).catch(err => {
        console.log('err', err)
        reject(err)
      })
    })
  }
  // 上传文件
  // files = {
  //    file1: file // Blob
  //    file2: file // Blob
  //    ... ...
  // }
  download = (param) => {
    const instance = this.newInstance()
    return instance.post(this.api, param, {
      responseType: 'blob'
    })
  }
  upload = (param, files) => {
    const runjsonField = 'rjbody'
    const formData = new FormData()
    for (const field in files) {
      formData.append(field, files[field])
    }
    formData.append(runjsonField, JSON.stringify(param))

    const instance = this.newInstance()
    return instance.post(this.api, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        '--run-json-field--': runjsonField
      }
    })
    // const opt = {
    //   method: 'post',
    //   url: this.api,
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     '--run-json-field--': runjsonField
    //   },
    //   formData
    // }
    // return this.request
    // return this.request(opt)
  }
  // http get
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
  newInstance() {
    const instance = axios.create({
      // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
      // withCredentials: true, // send cookies when cross-domain requests
      timeout: 5000 // request timeout
    })
    this.interceptors(instance)
    return instance
  }
  // instance = axios.create({
  //   // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  //   // withCredentials: true, // send cookies when cross-domain requests
  //   timeout: 5000 // request timeout
  // })
  interceptors(instance) {
    console.log('instance', instance)
    instance.interceptors.request.use(cfg => {
      // console.log('store.getters.token', store.getters.token)
      // console.log('getTokenKey()', getTokenKey())
      // console.log('getToken()', getToken())
      if (store.getters.token) {
        cfg.headers[store.getters.key] = store.getters.token
        // cfg.headers[getTokenKey()] = getToken()
      }
      return cfg
    }, err => {
      // console.log(err) // for debug
      return Promise.reject(err)
    })
    instance.interceptors.response.use(
      res => {
        // 返回信息
        // console.log('typeof res', typeof res)
        // console.log('res', res)
        // 从返回信息中，获取 data
        const { data } = res
        if (data['error']) {
          // 发生错误
          // 判断错误类型
          if (this.needLogin(data['error'])) {
            // 需要登录 to re-login
            this.tryToLogin()
          } else {
            // console.log(data)
            // console.log(typeof data)
            // 其他错误信息，给出提示
            Message({
              message: data['error'] === '' ? '未知错误' : data['error'],
              type: 'error',
              duration: 5 * 1000
            })
            // console.log('reject int', data)
            // Promise.reject(data).then(r => {})
            // console.log('done')
          }
        } else {
          const innerData = data['data']
          let toLogin = false
          for (const k in innerData) {
            const item = innerData[k]
            toLogin = false
            for (let n = 0; n < item.length; n++) {
              if (item[n]['error']) {
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
            }
            if (toLogin) {
              break
            }
          }
          if (toLogin) {
            this.tryToLogin()
          }
          // 没有错误，直接返回 data
          // return data
        }
        return data
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
    // console.log('store.getters.errGotoLogin', store.getters.errGotoLogin)
    return err === store.getters.errGotoLogin
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
