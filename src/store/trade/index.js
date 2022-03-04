import { reqAddressInfo, reqOrderInfo } from "@/api";

const actions = {
    // 获取用户地址信息
    async getUserAddress({ commit }) {
        let result = await reqAddressInfo()
        if (result.code == 200) {
            commit('GETUSERADDRESS', result.data)
        }
    },
    // 获取商品清单数据
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo()
        if(result.code==200){
            commit('GETORDERINFO',result.data)
        }
    }
}

const mutations = {
    // 获取用户地址信息
    GETUSERADDRESS(state, value) {
        state.userAddress = value
    },
     // 获取商品清单数据
    GETORDERINFO(state,value){
        state.orderInfo =value
    }
}

const state = {
    userAddress: [],
    orderInfo:{}
}

const getters = {}

export default {
    actions,
    mutations,
    state,
    getters
}