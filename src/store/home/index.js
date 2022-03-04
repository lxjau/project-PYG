import { reqCategoryList, reqGetBannerList, reqFloorList } from '@/api'

const actions = {
    async categorList(context) {
        let result = await reqCategoryList()
        if (result.code == 200) {
            context.commit('CATEGORLIST', result.data.slice(0, 15))
        }
    },

    async getBannerList(context) {
        let result = await reqGetBannerList()
        if (result.code == 200) {
            context.commit('GETBANNERLIST', result.data)
        }
    },

    async getFloorList(context) {
        let result = await reqFloorList()
        if (result.code == 200) {
            context.commit('GETFLOORLIST', result.data)
        }
    }
};

const mutations = {
    CATEGORLIST(state, value) {
        state.categorList = value
    },

    GETBANNERLIST(state, value) {
        state.bannerList = value
    },

    GETFLOORLIST(state, value) {
        state.floorList = value
    }
};

const state = {
    // 三级联动
    categorList: [],
    // 轮播图
    bannerList: [],

    floorList: []
};

const getters = {

};

export default {
    actions,
    mutations,
    state,
    getters
}