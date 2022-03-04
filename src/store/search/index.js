import { reqGetSearchInfo } from "@/api";
const actions = {
    async getSearchList({ commit }, params = {}) {
        let result = await reqGetSearchInfo(params)
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
};

const mutations = {
    GETSEARCHLIST(state, value) {
        state.searchList = value
    }
};

const state = {
    searchList: {}
};

const getters = {

};

export default {
    actions,
    mutations,
    state,
    getters
}