<template>
    <b-navbar>
        <template slot="end">
            <b-navbar-item tag="div">
                Welcome back {{ $store.state.loginInfo }}
                <a class="button is-primary is-inverted is-outlined" @click="logout">
                    Logout
                </a>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
import Cookies from "js-cookie";

import store from '@/store/index';

export default {
    name: "LoggedIn",
    methods: {
        logout() {
            store.commit("setLoginInfo", "");
            Cookies.remove("JWT");
        }
    }
};
</script>
