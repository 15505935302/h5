<template>
  <div id="app" @click="bodyClick">
    <transition name="fade" mode="in-out">
      <router-view v-if="isRouterAlive"></router-view>
    </transition>
    <tabbar id="nav" v-if="$route.meta.navShow">
      <tabbar-item :selected="select==0" @on-item-click="shoping" link="/" class="nav">
        <i class="iconfont" slot="icon">&#xe6ca;</i>
        <span slot="label">购彩</span>
      </tabbar-item>
      <!-- <tabbar-item link="/live" class="nav">
        <i class="iconfont" slot="icon">&#xe8c9;</i>
        <span slot="label">直播</span>
      </tabbar-item> -->
      <tabbar-item :selected="select==1" @on-item-click="huo" link="/activity" class="nav">
        <i class="iconfont" slot="icon">&#xe645;</i>
        <span slot="label">活动</span>
      </tabbar-item>
      <tabbar-item :selected="select==2" @on-item-click="found" link="/found" class="nav">
        <i class="iconfont" slot="icon">&#xe904;</i>
        <span slot="label">发现</span>
      </tabbar-item>
      <tabbar-item :selected="select==3" @on-item-click="we" class="nav">
        <i class="iconfont" slot="icon">&#xe634;</i>
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
    <!-- 遮罩层 -->
    <div class="shade" v-if="this.$store.state.playingShow" @touchmove.prevent></div>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vux";
export default {
  name: "App",
  components: {
    Tabbar,
    TabbarItem,
  },
  provide(){
    return {
      // 头部彩种切换后刷新当前页
      reload:this.reload
    }
  },
  data() {
    return {
      select: 0,
      // 头部彩种切换后刷新当前页
      isRouterAlive:true,
    };
  },
  methods: {
    // 刷新当前页函数
    reload(){
      this.isRouterAlive=false
      this.$nextTick(()=>{
        this.isRouterAlive=true
      })
    },
    // 点击body取消地区弹出框
    bodyClick(){
      this.$store.commit('addressShow',false)
      this.$store.commit('playingShow',false)
      document.body.style.overflow="scroll"
    },
    shoping(){
      this.select=0
    },
    huo(){
      this.select=1
    },
    found(){
      this.select=2
    },
    we(){
      this.select=3
      let _this=this
      let access_token = JSON.parse(localStorage.getItem("access_token"));
        if (access_token) {
          if (new Date().getTime() - access_token.time < 86395000) {
            _this.$router.push({
              path: "/user"
            });
          } else {
            // token过期
            _this.confirm({
              title: "提示",
              content: "太长时间没登录请重新登录",
              onConfirm() {
                _this.$router.push({
                  path: "/login"
                });
              },
            });
          }
        } else {
          _this.confirm({
            title: "提示",
            content: "请先登录才能查看更多",
            onConfirm() {
              _this.$router.push({
                path: "/login"
              });
            },
          });
        }
    }
  },
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
@import "./style/common.less";
// 视图过渡效果
// .fade-enter {
//   opacity:0;
// }
// .fade-leave{
//   opacity:1;
// }
// .fade-enter-active{
//   transition:opacity .3s;
// }
// .fade-leave-active{
//   opacity:0;
//   transition:opacity .3s;
// }
* {
  font-family: PingFangSC-Regular;
}
#app {
  height: 100%;
  background-color: #fff;
  #nav {
    background-color: white;
    border: none;
    box-shadow: 0 2px 15px #ccc;
    position: fixed;
    bottom: 0;
    span {
      font-size: 16px;
    }
  }
  .shade{
      width: 100%;
      height: 100%;
      opacity: 0.5;
      background-color: #000;
      position: fixed;
      z-index: 100;
      top: 0;
      left: 0;
  }
}
</style>
