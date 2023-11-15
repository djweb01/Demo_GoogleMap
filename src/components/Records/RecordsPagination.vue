<template>
    <div>
        <v-pagination :total="totalItems" :current-page='paginationSettings.current' :display="paginationSettings.display" :pagegroup="5" :handlepagechange="handlepagechange"></v-pagination>
    </div>
    
</template>

<script>
    import pagination from '../../tools/pagination.vue'

    export default{
        name:"RecordsPagination",
        props:['addressList','paginationSettings','pagechange'],
        computed:{
            totalItems(){
                return this.addressList.length
            },
        },
        methods: {
            handlepagechange(currentPage){
                this.pagechange(currentPage)

            }
        },
        components: {
            'v-pagination': pagination,
        }
    }
</script>