import { getErrorTable, getToken, getTokenKey } from '@/utils/auth'

const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: (state) => {
    if ((!state.user.token) || state.user.token.length === 0) {
      state.user.token = getToken()
    }
    return state.user.token
  },
  avatar: state => state.user.avatar,
  key: state => {
    if ((!state.user.key) || state.user.key.length === 0) {
      state.user.key = getTokenKey()
    }
    return state.user.key
  },
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  errGotoLogin: state => {
    // console.log('state.user.errGotoLogin', state.user.errGotoLogin)
    if ((!state.user.errGotoLogin) || state.user.errGotoLogin.length === 0) {
      const et = getErrorTable()
      // console.log('et', et)
      if (et) {
        state.user.errGotoLogin = et['gotoLogin']
        state.user.errDeny = et['deny']
      }
    }
    return state.user.errGotoLogin
  },
  errDeny: state => {
    if ((!state.user.errDeny) || state.user.errDeny.length === 0) {
      const et = getErrorTable()
      if (et) {
        state.user.errGotoLogin = et['gotoLogin']
        state.user.errDeny = et['deny']
      }
    }
    return state.user.errDeny
  }
}
export default getters
