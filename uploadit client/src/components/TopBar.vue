<template>
    <b-navbar>
        <template slot="end">
            <!-- logged in -->
            <b-navbar-item tag="div" v-if="$store.state.loginInfo">
                Welcome back {{ $store.state.loginInfo }}
                <a class="button is-primary is-inverted is-outlined" @click="logout">
                    Logout
                </a>
            </b-navbar-item>
            <!-- logged out -->
            <b-navbar-item tag="div" v-else>
                <a class="button is-primary is-inverted is-outlined" @click="openLoginModal()">
                    Login
                </a>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
import Cookies from "js-cookie";

import store from '@/store/index';
import LoginModal from "@/components/LoginModal.vue";

export default {
    name: "LoggedIn",
    methods: {
        logout() {
            store.commit("setLoginInfo", "");
            Cookies.remove("JWT");
        },
        openLoginModal() {
            this.$buefy.modal.open({
                parent: this,
                component: LoginModal,
                hasModalCard: true,
                trapFocus: true
            });
        }
    }
};
</script>
