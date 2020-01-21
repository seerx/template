// import {  } from '@/api/user'
import { getToken, setToken, getTokenKey, setTokenKey, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { login, logout, getInfo } from '@/svc/account'
// import store from '@/store'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  key: getTokenKey(),
  introduction: '',
  roles: [],
  errDeny: '',
  errGotoLogin: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    console.log('set', token)
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_KEY: (state, key) => {
    state.key = key
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_DENY_ERR: (state, err) => {
    state.errDeny = err
  },
  SET_GOTO_LOGIN_ERR: (state, err) => {
    state.errGotoLogin = err
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ user: username.trim(), password: password }).then((response) => {
        // const { data } = response
        // const res = data['account.Login'][0]

        const res = response
        if (res['error']) {
          // 登录失败
          reject(res['error'])
        } else {
          // 登录成功
          const { key, token, errors } = res.data
          commit('SET_KEY', key)
          commit('SET_TOKEN', token)

          console.log(errors)
          commit('SET_GOTO_LOGIN_ERR', errors['gotoLogin'])
          commit('SET_DENY_ERR', errors['deny'])
          // console.log(key)
          setTokenKey(key)
          setToken(token)
          // console.log('store.getters.token set', store.getters.token)
          resolve()
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, name, avatar, introduction } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
