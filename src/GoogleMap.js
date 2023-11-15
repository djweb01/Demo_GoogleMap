import{onUnmounted, onMounted, ref} from 'vue'
export function useGeolocation() {
    const coords = ref({ latitude: 0, longitude: 0 })
    const isSupported = 'navigator' in window && 'geolocation' in navigator
  
    let watcher = null
    onMounted(() => {
      if (isSupported){
        console.log('is supoorted')
        watcher = navigator.geolocation.watchPosition(
          (position) =>{
            coords.value = position.coords;
            console.log('coords0')
            console.log(coords.value)
          }, 
          (error) =>{
            console.log('error')
            console.log(error)
          }
        )
        // watcher = navigator.geolocation.watchPosition(        
        //     (position) =>{
        //       coords.value = position.coords;
        //       console.log('coords0')
        //       console.log(coords.value)
        //       var lat = position.coords.latitude;
        //       var lang = position.coords.longitude;
        //       var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lang + "&key=AIzaSyA8zTCNvLwjFioYAQUK3AgTI3q2Ymusc-A";
        //       // $.getJSON(url, function (data) {
        //       //   var address = data.results[0].formatted_address;
        //       //   // document.getElementById("address").value = address;
        //       //   console.log(address)
        //       //   console.log(data.results[0])
              

        //       // });
        //       this.$http.get(url)
        //             .then(function (res) {   
        //             console.log(res);
        //             console.log(data.results[0].formatted_address)
        //             })
        //             .catch(function (err) {  
        //               console.log(err);
        //             });


        //     },
        //     (error) =>{
        //       console.log('error')
        //       console.log(error)
        //     }
        //   );
          
        console.log('coords2')
        // console.log(position.coords)
      };
      // function showPosition(position) {
      //   coords.value = position.coords;
      //   var lat = position.coords.latitude;
      //   var lang = position.coords.longitude;
      //   var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lang + "&sensor=true";

      //   $.getJSON(url, function (data) {
      //           var address = data.results[0].formatted_address;
      //           document.getElementById("address").value = address;

      //   });
          
        
        // console.log(position.coords)
    })
    onUnmounted(() => {
      console.log('onUnmounted')
      if (watcher) {navigator.geolocation.clearWatch(watcher)
      }else{console.log('no w')}
    })
    console.log('coords')
    console.log(coords.value)
    return { coords, isSupported }
  }