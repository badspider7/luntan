import { articles } from '../../utils/login.js'

const state = {
    titleInfo:[]
}

const mutations = {
    ARTICLES(state,data) {
        state.titleInfo = data
    }
}

const actions = {
    async Articles({ commit }) {
        const data = await articles()
        commit("ARTICLES",data)
    }
}

const getters = {

}

export default {
    state,
    mutations,
    actions,
    getters
}