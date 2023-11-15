<template>
    <div>
        <ul style="list-style: none;" class="list-group">
            <li class="list-group-item list-group-item-action justify-content-between align-items-center2 w-75 mx-auto" >
                <label>
                    <span style="display: inline-block;width: 20px;"> </span>
                    <span style="display: inline-block;width: 620px; text-align: center;"> &nbsp  &nbsp  &nbsp Address</span>
                    <span style="display: inline-block;width: 120px;"> &nbsp  &nbsp Time Zone</span>
                    <span style="display: inline-block;width: 120px;">  Local Time</span>
                </label>
            </li>
        <RecordsItem 
            v-for="AddressObj in this.addressList.slice(this.paginationSettings.startNum,this.paginationSettings.endNum)"
            :key="AddressObj.id"
            :address="AddressObj"
            :checkAddress="checkAddress"
        />
        </ul>
    </div>
</template>
<script>
    import { watch } from 'vue'
    import RecordsItem from './RecordsItem'
    export default{
        name:'RecordsList',
        components:{ RecordsItem},
        props:['addressList','checkAddress','paginationSettings'],
        data(){
            
            return {addressShown:[],pageNum:this.paginationSettings.current}
        },     
    }
</script>

