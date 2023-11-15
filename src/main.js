import Vue from 'vue'
import App from './App.vue'

// import MyLocation from './components/MyLocation//MyLocation'
// import Article from './news/Artical'

// Vue.component('my-component',{
//   template:'',
//   name:'app',
//   age:10,
//   data(){
//     return{
//       msg: 'welcome'
//     }
//   }
// })
// Vue.component('my-location', MyLocation)
// Vue.component('my-aticle', Article)
// Vue.use(axios)
// Vue.prototype.$http = axios
new Vue({
  el: '#app',
  render: h => h(App)
})
