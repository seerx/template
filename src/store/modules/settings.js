import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  theme: variables.theme,
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  // 监听屏幕尺寸
  viewWidth: document.documentElement.clientWidth,
  viewHeight: document.documentElement.clientHeight
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  changeWidth({ commit }, width) {
    commit('CHANGE_SETTING', {
      key: 'viewWidth',
      value: width
    })
  },
  changeHeight({ commit }, height) {
    commit('CHANGE_SETTING', {
      key: 'viewHeight',
      value: height
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

