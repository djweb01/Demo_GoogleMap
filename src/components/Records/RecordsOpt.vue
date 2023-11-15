<template>
    <div class="border border-info rounded w-75 p-2 pl-4 mx-auto mt-2 mb-2">
        <div class="col-xs-1" align="center">
            <span>All</span>
            <label >
                <input type="checkbox" v-model="isAll"/>
            </label>
            <span>
                &nbsp  &nbsp  &nbsp &nbsp  &nbsp  &nbsp {{doneTotal}}/{{total}}  &nbsp  &nbsp  &nbsp &nbsp  &nbsp  &nbsp
            </span>
            <button @click="handleDelete()" type="button" class="btn btn-outline-info ml-2 mr-2">Delete</button>
        </div>
    </div>
</template>
<script>
    export default{
        name:'RecordsOperation',
        props:['addressList','deleteAddress','checkAllAddress'],
        
        computed:{
            total(){
                return this.addressList.length
            },
            doneTotal(){
                return this.addressList.reduce((pre,address)=> pre + (address.done ? 1:0),0)
            },
            isAll: {
                get(){
                    return this.doneTotal === this.total && this.total > 0
                },
                
                set(value){
                    this.checkAllAddress(value)
                }
            }

        },
        
        methods:{
            handleDelete(){
                if(confirm('Are you sure you want to delete these items?')){
                    this.deleteAddress()
                }
            }
        }
    }
</script>

