<template>
    <div class="col-xs-1" align="center">
        <div class=' w-75 mx-auto ' ref='mapDiv' style=" height: 80vh" ></div>
    </div>
</template>
<script>
    import { useGeolocation } from '../../GoogleMap'
    import { computed,ref,nUnmounted, onMounted, watch } from 'vue'
    import { Loader } from '@googlemaps/js-api-loader'
    import 'regenerator-runtime/runtime'

    export default{
        name:'GoogleMap',
        props:['GOOGLE_MAPS_API_KEY',"addressList",'renewMapP','renewMap'],
        setup(props){
            const { coords } = useGeolocation()
            const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
            let markList=[]
            const currPos = computed(() => ({
            lat: coords.value.latitude,
            lng: coords.value.longitude
            }))

            const GOOGLE_MAPS_API_KEY = (props.GOOGLE_MAPS_API_KEY).split('=')[1]
            const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY })
            let mapDiv = ref(null)
            let map=ref(null)
            
            onMounted(async () => {
                await loader.load()
                await sleep(1000)
                for(let i = 0; i < 5; i++){
                    if (coords.value.latitude ==0){await sleep(1000)}
                }
                map.value = new google.maps.Map(mapDiv.value,{
                        center: currPos.value,
                        zoom: 7,
                })
            })  

            const removeAllMark= () => {
                if (markList.length>0){
                    for(let i = 0; i < markList.length; i++){
                        markList[i].setMap(null);
                    }
                }
                

            }
            const createMarks = (list)=>{
                if(list.length>0){
                    markList = []
                    for(let i = 0; i < list.length; i++){
                        let positionVal = new google.maps.LatLng(list[i].latitude,list[i].longitude)
                        newMark(positionVal)

                    }
                }
                
            }

            const newMark = (positionVal)=>{
                var marker = new google.maps.Marker({
                    position: positionVal,
                    map: map.value,
                });
                markList.push(marker)
            }
        
            const watchfun = ()=>{
                removeAllMark()
                createMarks(props.addressList)
                props.renewMap(false)
            
            }


            return {currPos,map,mapDiv,watchfun}
        },

        watch:{
            renewMapP(newvalue,oldvalue){
                if(newvalue == true){
                    this.watchfun()
                }
            }
        }
    }
</script>
