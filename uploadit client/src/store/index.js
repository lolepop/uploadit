import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loginInfo: "",
        uploadQueue: [],
        apiEndpoint: ""
    },
    mutations: {
        setLoginInfo(state, loginInfo) {
            state.loginInfo = loginInfo;
        },
        addUploadQueue(state, item) {
            state.uploadQueue.push(item);
        },
        mutateUploadQueue(state, p) {
            // console.log(p);
            for (let [k, v] of Object.entries(p.v))
                state.uploadQueue[p.k][k] = v;
        },
        cancelUpload(state, index) {
            state.uploadQueue[index]["cancel"]();
        },
        setApiEndpoint(state, apiEndpoint) {
            state.apiEndpoint = apiEndpoint;
        }
    },
    actions: {
    },
    modules: {
    }
});
