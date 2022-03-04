import { reqGetCode, reqUserRegister, reqUserLogin,reqUserInfo,reqLogout} from "@/api"
import { getToken,setToken } from "./token"
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户注册
    async userRegister({ commit }, data) {
        let result = await reqUserRegister(data)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 登录
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        if(result.code==200){
            setToken(result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 获取用户信息
    async getUserInfo({commit}){
      let result = await reqUserInfo()
      if(result.code==200){
          commit('GETUSERINFO',result.data)
          return 'ok'
      }else{
          return Promise.reject(new Error('faile'))
      }
    },
    // 退出登录
    async Logout({dispatch,commit}){
     let result =  await reqLogout()
     if(result.code==200){
        commit('CLEAR')
        return 'ok'
     }else{
        return Promise.reject(new Error('faile'))
     }
    }
}

const mutations = {
    // 获取验证码
    GETCODE(state, value) {
        state.code = value
    },
    // 获取用户信息
    GETUSERINFO(state,value){
        state.userInfo=value
    },
    // 退出登录
    CLEAR(state){
        state.token = localStorage.removeItem('TOKEN')
        state.userInfo ={}
    }
}

const state = {
    code: '',
    token:getToken(),
    userInfo:{}
}

const getters = {}

export default {
    actions,
    mutations,
    state,
    getters
}