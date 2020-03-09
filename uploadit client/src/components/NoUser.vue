<template>
    <b-navbar>
        <template slot="end">
            <b-navbar-item tag="div">
                <a class="button is-primary is-inverted is-outlined" @click="openLoginModal()">
                    Login
                </a>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
import LoginModal from "@/components/LoginModal.vue";

export default {
    name: "NoUser",
    methods: {
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
