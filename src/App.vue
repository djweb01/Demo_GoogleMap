<template>
  <div id="container-fluid">
    <div class="row">
      <div class="col-sm">
          <MyLocation :getAdress="getMyLocationInfo" :myAddress="myLocationInfo.address" :setAPIKey="setAPIKey" :achiveMyAddress="myLocationInfo.achiveMyAddress" :achivemytimeZone="myLocationInfo.achivemytimeZone" :addNewAddress="addNewAddress"/>
          <div v-if="GoMapRequest.key != ''">
            <RecordsImput :searchLocation="searchLocation" :achivemytimeZone="newLocationInfo.achivemytimeZone"/>
            <RecordsOpt :addressList="addressList" :checkAllAddress="checkAllAddress" :deleteAddress="deleteAddress" />
            <GoogleMap :GOOGLE_MAPS_API_KEY="GoMapRequest.key" :addressList="addressList" :renewMapP="this.GoMapRequest.renew" :renewMap="renewMap"/>
            <RecordsList :addressList="addressList" :checkAddress="checkAddress" :deleteAddress="deleteAddress" :paginationSettings="paginationSettings"/>
            <RecordsPagination :addressList="addressList" :paginationSettings="paginationSettings" :pagechange="pagechange"/>
          </div>
          
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import {nanoid} from 'nanoid'
  import RecordsImput from './components/Records/RecordsImput'
  import RecordsOpt from './components/Records/RecordsOpt'
  import RecordsList from './components/Records/RecordsList'
  import MyLocation from './components/MyLocation/MyLocation'
  import RecordsPagination from './components/Records/RecordsPagination'
  import GoogleMap from './components/GoogleMap/GoogleMap';

  export default {
    name: 'app',
    components:{ RecordsImput,RecordsList,RecordsOpt,MyLocation,RecordsPagination,GoogleMap},
    
    data () {
      var addressList=[]
      return {
        myLocationInfo:{
          address:'',
          achiveMyAddress: false,
          timeZoneId:'',
          timeZoneName:'',
          LocalTime:'',
          achivemytimeZone: false,
          latitude:'',
          longitude:'',
        },
        newLocationInfo:{
          address:'',
          latitude:'',
          longitude:'',
          timeZoneId:'',
          timeZoneName:'',
          LocalTime:'',
          achivemytimeZone: false,
        },
        addressList,
        paginationSettings:{display: 5, current: 1,startNum:0, endNum: addressList.length >5 ? 5: addressList.length},
        GoMapRequest:{
          urlA : "https://maps.googleapis.com/maps/api/geocode/json?latlng=",
          key:"",
          urlTZ:"https://maps.googleapis.com/maps/api/timezone/json?location=",
          urlLA:"https://maps.googleapis.com/maps/api/geocode/json?address=",
          urlLT:'https://worldtimeapi.org/api/timezone/',
          renew:false, 
        }
      }
    },
    methods:{
      addAddress(addObj){ this.addressList.unshift(addObj)},

      searchLocation(address){
        this.newLocationInfo.achivemytimeZone=false
        this.getLagFromAdress(address)
        setTimeout(()=>{
          if(this.newLocationInfo.achivemytimeZone == true){
            const addObj = {id:nanoid(), 
              address:this.newLocationInfo.address,
              timeZone:this.newLocationInfo.timeZoneName,
              localTime:this.newLocationInfo.LocalTime, 
              done:false,
              latitude:this.newLocationInfo.latitude,
              longitude:this.newLocationInfo.longitude,
            }
            this.addAddress(addObj)
          }else{
            alert('Please try again later')
          }
        },2000)
      },

      checkAddress(id){
        this.addressList.forEach((address)=>{
            if(address.id === id) address.done = !address.done
        })
      },

      deleteAddress(){
        this.addressList = this.addressList.filter( (address)=>{
            return !address.done })
      },
      checkAllAddress(done){
          this.addressList.forEach((address)=>{
            address.done = done
          })
      },

      setpaginationSettings(currentPage){
        this.paginationSettings.startNum = (currentPage-1)*this.paginationSettings.display
        this.paginationSettings.endNum = this.addressList.length >= currentPage*this.paginationSettings.display ? currentPage*this.paginationSettings.display : this.addressList.length
      },

      pagechange(currentPage){
        if(this.paginationSettings.current != currentPage) 
        {
          this.paginationSettings.current = currentPage
          this.setpaginationSettings(currentPage)
        }
      },

      getAdressFromLag(lat,lang){
        var url = this.GoMapRequest.urlA + lat + "," + lang + this.GoMapRequest.key;
        axios.get(url)
        .then((response) => {
          if (response.data.status != "OK"){
            this.myLocationInfo.address ='Error: '+ response.data.error_message + ' Status: ' + response.data.status + ' Note:Please make sure that location access is allowed'
          }
          else{
            try{
             this.myLocationInfo.address = response.data.results[0].formatted_address
             this.myLocationInfo.achiveMyAddress=true
             this.myLocationInfo.latitude =lat
             this.myLocationInfo.longitude = lang
             
            }catch (error) {
              this.myLocationInfo.address = 'Please try again'
              console.log(error);
            }
          }
          
        })
        .catch( (err) =>{  
          this.myLocationInfo.address = 'Please try again'
          console.log(err);
          
        }); 
      },

      getMyLocationInfo(lat,lang){
        this.getAdressFromLag(lat,lang)
        this.getTimeZone(lat,lang,this.myLocationInfo)
      },

      getLagFromAdress(adrress){
        var addressReshape = adrress.split(' ').join('+') 
        var url = this.GoMapRequest.urlLA + addressReshape + this.GoMapRequest.key;
        axios.get(url)
        .then((response) => {
          if (response.data.status != "OK"){
            alert('Error: '+ response.data.error_message + ' Status: ' + response.data.status + ' Note:Please make sure that location access is allowed')
          }
          else{
            try{
              console.log('getLagFromAdress')
              this.newLocationInfo.address = response.data.results[0].formatted_address
              this.newLocationInfo.latitude = response.data.results[0].geometry.location.lat
              this.newLocationInfo.longitude = response.data.results[0].geometry.location.lng    
              this.getTimeZone(this.newLocationInfo.latitude,this.newLocationInfo.longitude,this.newLocationInfo)

            }catch (error) {
              alert('Error: ' +error)
              console.log(error);
            }
          }
          
        })
        .catch( (err) =>{  
          alert('Error: ' +error)
          console.log(err);
          
        }); 
      },

      getTimeZone(lat,lang,target){
        var currentDate = new Date()
        var timestamp = currentDate.getTime()/1000 + currentDate.getTimezoneOffset() * 60 
        
        var url = this.GoMapRequest.urlTZ + lat + "%2C" + lang +'&timestamp='+timestamp+ this.GoMapRequest.key;
        axios.get(url)
          .then((response) => {
            try{
              if (response.data.status == "OK"){
                target.timeZoneId=response.data.timeZoneId
                target.timeZoneName=response.data.timeZoneName
                this.getLocalTime(response.data.timeZoneId,target)
              }else{
                console.log(response.data.status)
              }
            }catch (error) {
              console.log(error);
            }
          })
          .catch( (err) =>{  
            console.log(err);
            
          }); 
        
      },

      getLocalTime(timeZoneId,target){
        var url = this.GoMapRequest.urlLT + timeZoneId
        axios.get(url)
          .then((response) => {
            target.LocalTime = (response.data.datetime).split('.')[0].replace('T',' ')
            
            target.achivemytimeZone=true
          })
          .catch( (err) =>{  
            console.log(err);
            
          }); 
      },

      setAPIKey(APIKey){
        this.GoMapRequest.key = "&key="+APIKey
      },

      addNewAddress(lat,lang){
        const addObj = {id:nanoid(), 
          address:this.myLocationInfo.address,
          timeZone:this.myLocationInfo.timeZoneName,
          localTime:this.myLocationInfo.LocalTime, 
          done:false,
          latitude:lat,
          longitude:lang,
        }
        this.addAddress(addObj)
      },
      calculateLocalTime(){},

      renewMap(reslt){
        setTimeout(()=>{
          this.GoMapRequest.renew=false
        },2000)
        
      }
    },
    watch:{
      addressList(newList,oldList){
        this.GoMapRequest.renew=true
        this.setpaginationSettings(this.paginationSettings.current)
      },
        immediate: true
    }


  }

</script>
