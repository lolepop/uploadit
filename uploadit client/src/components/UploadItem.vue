<template>
    <div id="uploads" v-if="$store.state.uploadQueue.length > 0">
        <b-table
            :data="$store.state.uploadQueue"
            :per-page="10"
            :paginated="shouldPaginate"
            :pagination-simple="true"
            :has-modal-cards="false"
        >
            <template slot-scope="props">
                <!-- <b-table-column field="index" label="ID">
                    {{ props.index }}
                </b-table-column> -->
                <b-table-column field="name" label="Filename">
                    {{ props.row.name }}
                </b-table-column>
                <b-table-column field="status" label="Status">
                    <b-progress
                        v-if="props.row.status === null"
                        type="is-primary"
                        format="percent"
                        :value="props.row.progress"
                        :show-value="true"
                    />
                    <span v-else-if="props.row.status">
                        <a :href="endpoint + props.row.message">Download</a>
                    </span>
                    <span v-else>
                        {{ props.row.message }}
                    </span>
                </b-table-column>
                
            </template>
        </b-table>
    </div>
</template>

<script>

// :sort-icon="chevron-up"

export default {
    name: "UploadItem",
    props: ["shouldPaginate"],
    data() {
        return {
            endpoint: process.env.VUE_APP_APIENDPOINT
        }
    }
};
</script>

<style>
/* lol */
table, table .th-wrap
{
    color: white !important;
    background-color: #363636 !important;
}

.table td, .table th
{
    border: 0 !important;
}

.table thead 
{
    display: none; 
}

td[data-label="Status"]
{
    vertical-align: middle !important;
}
</style>
