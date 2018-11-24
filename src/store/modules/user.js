// import { login, changpassword, logout } from '../../api/login'
import Cookies from 'js-cookie'

const user = {
  state: {
    user: {}
  },
  mutations: {
    USER_INFO(state, user) {
      state.user = user
    }
  },
  actions: {
    Login({ commit }, payload) {
      return new Promise((resolve, reject) => {
        login(payload).then(response => {
          let data = response.data
          commit('USER_INFO', data)
          Cookies.set('name', data.name)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ChangePassword({ commit }, payload) {
      return new Promise((resolve, reject) => {
        changpassword(payload).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          Cookies.remove('name')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default user
