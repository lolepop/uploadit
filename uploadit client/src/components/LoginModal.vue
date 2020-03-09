<template>
    <form action="" @submit.prevent="onSubmit">
        <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
                <p class="modal-card-title">Login</p>
            </header>
            <section class="modal-card-body">
                <b-field label="Username">
                    <b-input
                        type="text"
                        v-model="username"
                        placeholder="Username"
                        required>
                    </b-input>
                </b-field>

                <b-field label="Password">
                    <b-input
                        type="password"
                        v-model="password"
                        password-reveal
                        placeholder="Password"
                        required>
                    </b-input>
                </b-field>
            </section>
            <footer class="modal-card-foot">
                <!-- <button class="button" type="button" @click="$parent.close()">Close</button> -->
                <input class="button is-primary" type="submit" value="Submit" />
            </footer>
        </div>
    </form>
</template>

<script>
// import axios from "axios";
import Cookies from "js-cookie";

import store from '@/store/index';
import authFetch from "@/libs/util";

export default {
    name: "LoginModal",
    methods: {
        onSubmit() {
            authFetch.post(`${store.state.apiEndpoint}/api/auth/login`, {
                data: {
                    username: this.username,
                    password: this.password
                }
            }).then(res => {
                if (res.data.success)
                {
                    store.commit("setLoginInfo", res.data.user);
                    Cookies.set("JWT", res.data.token);
                    this.$emit('close');
                }
            }).catch(console.error);

        }
    },
    data() {
        return {
            username: "",
            password: ""
        };
    }
};
</script>