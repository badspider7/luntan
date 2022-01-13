import { getItem, setItem ,removeItem } from "../../utils/storage"

const state = {
    data: getItem('userData'),
    token: getItem('Token')
}

const mutations = {
    getToken(state, data) {
        state.data = data.data
        state.token = data.token
        setItem('userData',state.data)
        setItem('Token',state.token)
    },
    deleteUser(state, data) {
        state.token = data
        removeItem('Token')
        removeItem('userData')
    }
}

const actions = {

}

const getters = {

}

export default {
    state,
    mutations,
    actions,
    getters
}