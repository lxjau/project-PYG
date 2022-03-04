import { reqGoodsInfo, reqAddToCart } from "@/api"
import { getUUID } from '@/utils/uuid'
const actions = {
    async getGoodsInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId)

        if (result.code == 200) {
            commit('GETGOODSINFO', result.data)
        }
    },

    async addToCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddToCart({ skuId, skuNum })
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}

const mutations = {
    GETGOODSINFO(state, value) {
        state.goodsInfo = value
    }
}

const state = {
    goodsInfo: {},
    uuid_token: getUUID()
}

const getters = {
    
    categoryView(state) {
        return state.goodsInfo.categoryView || {}
    },

    skuInfo(state) {
        return state.goodsInfo.skuInfo || {};
    },
    // skuImageList(state) {
    //     return state.goodsInfo.skuInfo.skuImageList
    // }
}

export default {
    actions,
    mutations,
    state,
    getters
}