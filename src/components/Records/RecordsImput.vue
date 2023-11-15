<template>
    <div class="col-xs-1" align="center">
        <div class="input-group mb-3" style="width:fit-content">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Address</span>
            </div>
            <input style="width:770px" type="text" placeholder="Please enter an address and press <Enter> or button to confirm" v-model='NewAddress' @keyup.enter="add"/>
            <button @click = "add" type="button" class="btn btn-outline-info ml-2 mr-2">Search</button>
        </div>
    </div>
</template>
<script>
    export default{
        name:'RecordsImput',
        props:['searchLocation','achivemytimeZone'],
        data(){
            return{
                NewAddress:''
            }   
        },
        methods:{
            add(){
                if(!this.NewAddress.trim()) return alert('Please enter an address')
                this.searchLocation(this.NewAddress)
                this.NewAddress = ''
            }
        }
    }
</script>

