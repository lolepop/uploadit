<template>
    <div id="app">
    <!-- <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
    </div> -->

    <section class="hero is-dark is-fullheight">
        <div class="hero-head">
            <TopBar />
            <!-- <NoUser v-if="!$store.state.loginInfo" />
            <LoggedIn v-else /> -->
        </div>
        <div class="hero-body">
            <router-view/>
        </div>
    </section>

    </div>
</template>

<script>
import Cookies from "js-cookie";

import store from '@/store/index';
import TopBar from "@/components/TopBar.vue";
import api from "@/libs/api";

export default {
    name: "App",
    async mounted() {
        // load limits from api
        const limits = await api.getApiLimits();
        store.commit("setLimits", limits);

        // check if login token is still valid
        let jwtToken = Cookies.get("JWT");
        if (jwtToken)
        {
            const res = await api.validateToken();
            if (res.success)
                store.commit("setLoginInfo", res.user);
            else
                Cookies.remove("JWT");
        }
    },
    components: {
        TopBar
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
