<template>
    <div id="app">
    <!-- <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
    </div> -->

    <section class="hero is-dark is-fullheight">
        <div class="hero-head">
            <NoUser v-if="!$store.state.loginInfo" />
            <LoggedIn v-else />
        </div>
        <div class="hero-body">
            <router-view/>
        </div>
    </section>

    </div>
</template>

<script>
// import axios from "axios";
import Cookies from "js-cookie";

import store from '@/store/index';
import NoUser from "@/components/NoUser.vue";
import LoggedIn from "@/components/LoggedIn.vue";
import authFetch from "@/libs/util";

store.commit("setApiEndpoint", process.env.NODE_ENV === "development" ? "http://localhost:8000" : "");

let jwtToken = Cookies.get("JWT");
if (jwtToken)
{
    // axios({
    //     method: "GET",
    //     url: `${store.state.apiEndpoint}/api/auth/`,
    //     headers: { Authorization: jwtToken }
    // })

    authFetch.get(`${store.state.apiEndpoint}/api/auth/`).then(res => {
        if (res.data.success)
            store.commit("setLoginInfo", res.data.user);
        else
            Cookies.remove("JWT");
    });


}

// store.commit("setLoginInfo", "ajksdlkjasdlk");
// console.log(store.state.loginInfo);

export default {
    name: "App",
    components: {
        NoUser,
        LoggedIn
    }
};
</script>

<style>
/* welcome to !important hell */
html, body
{
    overflow: hidden !important;
}

nav .button
{
    /* padding: 0 !important; */
    border: none !important;
    background: none !important;
}

nav .button:hover
{
    color: #fff !important;
}

</style>
