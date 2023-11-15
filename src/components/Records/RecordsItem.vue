<template>
    <div>
        <li class="list-group-item list-group-item-action justify-content-between align-items-center2 w-75 mx-auto" >
            <label>
                <input type="checkbox" :checked="address.done" @change="handleCheck(address.id)"/>
                <span style="display: inline-block;width: 620px;"> &nbsp  &nbsp  &nbsp {{address.address}}</span>
                <span style="display: inline-block;width: 120px;"> &nbsp  &nbsp  &nbsp {{address.timeZone}}</span>
                <span style="display: inline-block;width: 120px;">   {{address.localTime}}</span>
            </label>
        </li>
    </div>
    
</template>
<script>
    export default{
        name:'RecordsItem',
        props:['address','checkAddress'],

        methods:{
            handleCheck(id) {
                this.checkAddress(id)
            },
        }
    }
</script>

