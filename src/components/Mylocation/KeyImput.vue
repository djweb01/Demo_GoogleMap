<template>
    <div class="input-group mb-3" style="width:fit-content">
        <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Google API Key</span>
        </div>
        <input style="width:500px" type="text" placeholder='Please enter your Google API Key' v-model='APIKey' @keyup.enter="add"/>
        <button @click = "add" type="button" class="btn btn-outline-info ml-2 mr-2">Ok</button>
    </div>
</template>

<script>
    export default{
        name:'KeyImput',
        props:['handleSetAPIKey'],
        data(){
            return{
                APIKey:''
            }   
        },
        methods:{
            add(){
                if(!this.APIKey.trim()) return alert('Please enter your Google API Key')
                this.handleSetAPIKey(this.APIKey)
            }
        }
    }
</script>

