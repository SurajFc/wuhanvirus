import axios from "axios";

const state = {
    items: [],
    global: [],
    load: true,
    curitem: []
};

const getters = {
    allItems: state => state.items,
    allGlobal: state => state.global,
    myload: state => state.load,
    CurItem: state => state.curitem,


};

const actions = {
    async FetchItems({ commit }) {
        const response = await axios.get('https://api.covid19api.com/summary');
        commit('setItems', response.data)

    },
    async GetDetails({ commit }, slug) {
        commit('GetAnItem', slug)
    }

};

const mutations = {
    setItems: (state, items) => (
        state.items = items['Countries'],
        state.global = items['Global'],
        state.load = false
    ),
    GetAnItem: (state, slug) => {
        state.items.forEach(e => {
            if (e.Slug == slug) {
                console.log("hey", e)
                state.curitem = e
            }
        });
    }
};


export default {
    state,
    getters,
    actions,
    mutations
}