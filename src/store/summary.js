import axios from "axios";

const state = {
    items: [],
    global: [],
    load: true
};

const getters = {
    allItems: state => state.items,
    allGlobal: state => state.global,
    myload: state => state.load
};

const actions = {
    async FetchItems({ commit }) {
        const response = await axios.get('https://api.covid19api.com/summary');
        commit('setItems', response.data)

    }
};

const mutations = {
    setItems: (state, items) => (
        state.items = items['Countries'],
        state.global = items['Global'],
        state.load = false
    )

};


export default {
    state,
    getters,
    actions,
    mutations
}