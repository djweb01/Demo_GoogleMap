<template>
    <div class="alert alert-info" role="alert">
        <KeyImput :handleSetAPIKey="handleSetAPIKey" />
        <button @click = "show" type="button" class="btn btn-light ml-2 mr-2">My Location</button>
        <span> {{myAddress}} </span>
        <button @click = "AddtoList"  v-show='(achiveMyAddress&achivemytimeZone&this.clickBut)' type="button" class="btn btn-light ml-2 mr-2">Add to List</button>
       
    </div>
</template>
<script>
    import { useGeolocation } from '../../GoogleMap'
    import { computed } from 'vue'
    import KeyImput from './KeyImput'
    export default{
        name:'MyLocation',
        props:['getAdress','myAddress','setAPIKey','achiveMyAddress','achivemytimeZone','addNewAddress'],
        components:{ KeyImput},
        setup(){
            const { coords } = useGeolocation()
            const currPos = computed(() => ({
            lat: coords.value.latitude,
            lng: coords.value.longitude
            }))
            return {currPos}
        },
        data:function(){
            return{
                MyLatitude:'',
                MyLongitude:'',
                clickBut:true,
            }   
        },

        methods:{
            show(){
                this.MyLatitude =   this.currPos.lat.toFixed(7)
                this.MyLongitude = this.currPos.lng.toFixed(7)
                this.getAdress(this.MyLatitude,this.MyLongitude)
            },
            handleSetAPIKey(APIKey){
                this.setAPIKey(APIKey)
            },
            AddtoList(){
                this.addNewAddress(this.MyLatitude,this.MyLongitude)
                this.clickBut=false
            }
        }
    }
</script>

