// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible/flexible'
import FontAwesome from './assets/iconfont/iconfont.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css' // 轮播图CSS
import store from './store/index.js'
import axios from 'axios'
import md5 from 'js-md5'
import api from './API/index.js'
import common from '../commonFunction/common.js'
import VueSocketio from 'vue-socket.io';

Vue.use(new VueSocketio({
  debug:false,
  connection:'192.168.110.107:3000',
  vuex:{}
})); 

router.push('/')
Vue.config.productionTip = false


import {
  ToastPlugin,
  ConfirmPlugin,
  AlertPlugin,
  LoadingPlugin,
} from 'vux'

Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(AlertPlugin)
Vue.use(LoadingPlugin)
Vue.use(VueAwesomeSwiper)
//公用的弹窗(全局变量)
Vue.prototype.showToast = function (type, text, width = "10em") {
  this.$vux.toast.show({
    showPositionValue: false,
    text: text,
    type: type,
    width: width,
    position: 'middle'
  })
}

//公用alert confirm
const Message = {};
Message.install = () => {
  const msg = {
    alert: config => {
      let def = {
        title: '提示',
        content: '系统异常，请重新登录后再试！',
        buttonText: '确定',
      }
      if (typeof config === 'string' || typeof config === 'number') {
        Vue.$vux.alert.show(Object.assign(def, {
          content: config
        }));
      } else {
        Vue.$vux.alert.show(Object.assign(def, config));
      }
    },
    confirm: config => {
      let isConfirm = false;
      let def = {
        title: '提示',
        content: '系统异常，请重新登录后再试！',
        confirmText: '确定',
        cancelText: '取消',
        onConfirm: () => {},
        onCancel:()=>{}
      }
      if (typeof config === 'string' || typeof config === 'number') {
        Vue.$vux.confirm.show(Object.assign(def, {
          content: config
        }));
      } else {
        Vue.$vux.confirm.show(Object.assign(def, config));
      }
      /*return new Promise((resolve,reject) => {
       if(isConfirm){
       resolve();
       }
       })*/
    },
  }
  Object.entries(msg).forEach(([method, fn]) => {
    Vue.prototype[method] = fn;
  })
}

Vue.use(Message)
Vue.prototype.$api = api
Vue.prototype.$md5 = md5
Vue.prototype.common = common
Vue.prototype.axios = axios


/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
export default Vue
