import { reqCartList, reqDeleteCartById, reqUpdataCartById } from "@/api"
const actions = {
    async getCartList({ commit }) {
        let result = await reqCartList()
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
        }
    },

    // 删除购物车某一个商品
    async deleteCartById({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },

    // 修改购物车商品选中状态
    async updataCartById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdataCartById(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },

    // 删除所有选中产品
    deleteAllcheckedCart({ dispatch, getters }) {
        let PromiseAll = []
        let promise = getters.cartList.cartInfoList.forEach(item => {
            if (item.isChecked == 1) dispatch('deleteCartById', item.skuId)
            PromiseAll.push(promise)
        });
        return Promise.all(PromiseAll)
    },
    // 全选全不选
    changeAllChecked({ dispatch, getters }, event) {
        let isChecked = event.target.checked ? 1 : 0
        let PromiseAll = []
        let promise = getters.cartList.cartInfoList.forEach(item => {
            dispatch('updataCartById', { skuId: item.skuId, isChecked })
            PromiseAll.push(promise)
        });
        return Promise.all(PromiseAll)
    }
}

const mutations = {
    GETCARTLIST(state, value) {
        state.cartList = value
    }
}

const state = {
    cartList: []
}

const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }

}

export default {
    actions,
    mutations,
    state,
    getters
}