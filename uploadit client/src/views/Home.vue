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

import store from '@/store/index';
import UploadItem from "@/components/UploadItem";

import authFetch from "@/libs/util";

const CancelToken = axios.CancelToken;

export default {
    name: 'Home',
    components: {
        UploadItem
    },
    methods: {
        uploadFile() {
            store.commit("addUploadQueue", {
                name: this.file.name,
                progress: 0,
                status: null,
                message: null,
                cancel: null
            });

            let currFileIndex = store.state.uploadQueue.length - 1;

            // check local filesize against limits before sending
            if (this.file.size > store.state.limits.size)
            {
                store.commit("mutateUploadQueue", { k: currFileIndex, v: { status: false, message: "File is too large" }});
                return;
            }

            let formData = new FormData();
            formData.append('file', this.file);

            authFetch.post(
                `${store.state.apiEndpoint}/api/upload/`,
                { 
                    data: formData,
                    onUploadProgress: progressEvent => store.commit("mutateUploadQueue", { k: currFileIndex, v: { progress: progressEvent.loaded * 100 / progressEvent.total } }),
                    cancelToken: new CancelToken(c => store.commit("mutateUploadQueue", { k: currFileIndex, v: { cancel: c } }))
                },
                { "Content-Type": "multipart/form-data" }
            ).then(res => {
                store.commit("mutateUploadQueue", { k: currFileIndex, v: { status: res.data.success, message: res.data.download }});
            }).catch(err => {
                store.commit("mutateUploadQueue", { k: currFileIndex, v: { status: false, message: err.response }});
            });
            

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
