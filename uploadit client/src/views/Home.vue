<template>
    <div class="home">
        <b-field class="file">
            <b-upload v-model="file" @input="uploadFile()">
                <a class="button is-primary">
                    <b-icon icon="upload"></b-icon>
                    <span>Click to upload</span>
                </a>
            </b-upload>
            <!-- <span class="file-name" :key="i" v-for="(f, i) in $store.state.uploadQueue">
                {{ i }}: {{ f }}
            </span> -->
        </b-field>
        <UploadItem :shouldPaginate="false" />
    </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from 'vuex';

import store from '@/store/index';
import UploadItem from "@/components/UploadItem";

import api from "@/libs/api";
// import authFetch from "@/libs/axiosAuth";

const CancelToken = axios.CancelToken;

export default {
    name: 'Home',
    components: {
        UploadItem
    },
    methods: {
        ...mapMutations([
            "addUploadQueue"
        ]),
        mutateUploadQueue(k, v) {
            console.log(k, v);
            store.commit("mutateUploadQueue", { k, v });
        },
        async uploadFile() {
            this.addUploadQueue({
                name: this.file.name,
                progress: 0,
                status: null,
                message: null,
                cancel: null
            });

            let currFileIndex = store.state.uploadQueue.length - 1;
            const mutateCurrent = v => this.mutateUploadQueue(currFileIndex, v);

            // check local filesize against limits before sending
            if (this.file.size > store.state.limits.size)
            {
                mutateCurrent({
                    status: false,
                    message: "File is too large"
                });
                return;
            }

            let formData = new FormData();
            formData.append('file', this.file);

            try
            {
                const res = await api.upload(
                    formData,
                    progressEvent => mutateCurrent({
                        progress: progressEvent.loaded * 100 / progressEvent.total
                    }),
                    new CancelToken(c => mutateCurrent({ cancel: c }))
                );

                mutateCurrent({
                    status: res.success,
                    message: res.download
                });
            }
            catch (err)
            {
                console.log(err);
                mutateCurrent({
                    status: false,
                    message: err.response
                });
            }

        }
    },
    data() {
        return {
            file: null
        };
    }
};
</script>

<style scoped>
.home
{
    margin: auto;
}

#uploads
{
    position: fixed;
    bottom: 0px;
    right: 8px;
}

</style>
