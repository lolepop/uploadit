<template>
    <!-- wtf -->
    <form action="" @submit.prevent="onSubmit" @keydown.enter.prevent>
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
                <input class="button is-primary" type="submit" value="Submit" @click="isRegister = false" />
                <input class="button is-primary is-outlined" type="submit" value="Register" @click="isRegister = true" />
            </footer>
        </div>
    </form>
</template>

<script>
// import axios from "axios";
import Cookies from "js-cookie";
import axios from "axios";

import store from '@/store/index';
import authFetch from "@/libs/util";

export default {
    name: "LoginModal",
    methods: {
        async handleLogin()
        {
            try
            {
                const res = await authFetch.post(`${store.state.apiEndpoint}/api/auth/login`, {
                    data: {
                        username: this.username,
                        password: this.password
                    }
                });

                if (res.data.success)
                {
                    store.commit("setLoginInfo", res.data.user);
                    Cookies.set("JWT", res.data.token);
                    this.$emit('close');
                }
                else
                {
                    console.log(res.data);
                }

            }
            catch (error)
            {
                console.error(error);
            }
        },

        async onSubmit() {
            if (this.isRegister)
            {
                try
                {
                    const regRes = await axios.post(`${store.state.apiEndpoint}/api/auth/register`, {
                        username: this.username,
                        password: this.password
                    });

                    if (regRes.data.success)
                        await this.handleLogin();
                    else
                        console.log(regRes.data.message);

                }
                catch (error)
                {
                    console.log(error);
                }
            }
            else
            {
                await this.handleLogin();
            }

        }
    },
    data() {
        return {
            username: "",
            password: "",
            isRegister: false
        };
    }
};
</script>