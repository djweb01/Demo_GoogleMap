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
          }, 
          (error) =>{
            console.log(error)
          }
        )
      }
    })
    onUnmounted(() => {
      if (watcher) {navigator.geolocation.clearWatch(watcher)}
    })
    return { coords, isSupported }
  }
