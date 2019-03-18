<template>
  <div id="user">
    <header><span>我的</span></header>
    <div class="user">
      <div class="user_head">
        <router-link tag='div' to="/personal" class="head_img">
          <img :src="user.user_photo" alt="">
          <div>
            <p  @click.stop="vipclick"><span>{{user.account}}</span><img src="../assets/img/web/bg_vip.png" alt="" ><span class="vip">VIP{{user.level}}</span></p>
            <div @click.stop="show=!show">
              <template v-if="show">
                <span class="bonusMoney" v-if="loading">￥{{user.point}}</span>
                <img style="height:30px;" src="../assets/img/lazy.gif" alt="" v-else>
              </template>
              <template v-else>
                <span>余额</span>&#x3000;<i class="iconfont">&#xe60c;</i>
              </template>
            </div>
          </div>
          <router-link to="/personal">
            <i class="iconfont">&#xe655;</i>
          </router-link>
        </router-link>
      </div>
      <div class="user_fun">
        <router-link tag="div" to="/recharge" class="function_server">
          <div class="serve">
            <i class="iconfont">&#xe604;</i>
          </div>
          <span>充值</span>
        </router-link>
        <router-link tag="div" to="/withdraw" class="function_server">
          <div class="serve">
            <i class="iconfont">&#xe652;</i>
          </div>
          <span>提现</span>
        </router-link>
        <div class="function_server"  @click="toserver">
          <template tag="div" >
            <div class="serve">
              <i class="iconfont">&#xe60f;</i>
            </div>
            <span>客服</span>
          </template>
        </div>
        <div class="function_server">
          <router-link  tag="div"  to="/news">
            <div class="serve">
              <i class="iconfont">&#xe67d;</i>
            </div>
          </router-link>
          <span>消息</span>
        </div>
      </div>
    </div>
    <ul>
      <router-link to="/betting" tag="li">
        <div>
          <div class="serve">
            <i class="iconfont">&#xe678;</i>
          </div>
          <span>投注记录</span>
        </div>
          <i class="iconfont">&#xe655;</i>
      </router-link>
      <router-link to="/detailed" tag="li">
        <div>
          <div class="serve">
            <i class="iconfont">&#xe60b;</i>
          </div>
          <span>交易记录</span>
        </div>
          <i class="iconfont">&#xe655;</i>
      </router-link>
      <router-link to="/todaypandl" tag="li">
        <div>
          <div class="serve">
            <i class="iconfont">&#xe60d;</i>
          </div>
          <span>今日盈亏</span>
        </div>
        <i class="iconfont">&#xe655;</i>
      </router-link>
      <!-- <li>
        <div>
          <div class="serve">
            <i class="iconfont">&#xe608;</i>
          </div>
          <span>礼金兑换</span>
        </div>
        <i class="iconfont">&#xe655;</i>
      </li> -->
      <router-link to="/agentcenter" tag="li">
        <div>
          <div class="serve">
            <i class="iconfont">&#xe793;</i>
          </div>
          <span>代理中心</span>
        </div>
        <i class="iconfont">&#xe655;</i>
      </router-link>
    </ul>
    <router-link tag='div' to="/set" class="setting">
      <div>
        <div class="serve">
          <i class="iconfont">&#xe605;</i>
        </div>
        <span>设置</span>
      </div>
      <router-link to="/set">
        <i class="iconfont">&#xe655;</i>
      </router-link>
    </router-link>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        show:false,
        loading:false,
        user:{}
      }
    },
    methods:{
      toserver(){
        window.location.href="https://f18.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=55229&configID=80293&jid=1334393335&s=1"
      },
      // 用户资料
      user_reqest(){
        this.$api.userDetails().then(res=>{
          this.user=res.data.data
          const loginMsg=JSON.stringify(res.data.data)
          localStorage.setItem('loginTime', loginMsg)
          setTimeout(function(){
             this.loading=true
          }.bind(this),1500)
        })
      },
      // vip图标跳转
      vipclick(){
        this.$router.push({
          name:"Personal",
          params:{
            msg:true
          }
        })
      }
    },
    created() {
      this.user_reqest()
    },
  };
</script>

<style scoped>
  #user{
    background-color: #f5f5f5;
    height: 100%;
  }
  #user header {
    background-image: linear-gradient(to bottom, #e54b55, #b53840);
    text-align: center;
    color: white;
    font-size: 17px;
    height: 145px;
  }
  #user header span {
    line-height: 60px;
  }
  .user {
    position: absolute;
    top: 65px;
    left: calc(50% - 45%);
    background-color: white;
    width: 90%;
    height: 150px;
    border-radius: 5px;
    padding-bottom: 10px;
  }
  .user_head{
    padding: 11px 16px;
  }
  .head_img{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }
  .bonusMoney{
    color:red !important;
    font-size:14px !important;
  }
  .head_img>img{
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .head_img>div{
    position: relative;
    margin-right: 100px;
  }
  .head_img>div>div{
    height: 20px;
  }
  .head_img div p{
    line-height: 30px;
  }
  .head_img div p img{
    width: 35px;
    height: 17px;
    vertical-align: -3px;
    margin-left: 17px;
  }
  .head_img div p span:nth-child(1){
    color: #333;
    font-size: 15px;
    font-weight: 600;
  }
  .head_img div span{
    color: #888;
    font-size: 12px;
  }
  .head_img div i{
    display: inline-block;
    color: #888;
    font-size: 14px;
    width: 12px;
    height: 6px;
    position: relative;
    top: 3px;
  }
  .head_img i{
    color: #ddd;
    font-size: 20px;
  }
  .head_img div p span:nth-child(3){
    position: absolute;
    color: white;
    font-size: 14px;
    text-align: center;
    right: 2px;
    top: 3px;
    line-height: 25px;
  }
  .user_fun{
    display: flex;
    justify-content: space-around;
    padding: 0 20px;
  }
  .function_server{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .serve {
    background-color: #F49940;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    text-align: center;
    margin-bottom: 8px;
  }
  .user_fun div:nth-of-type(2) .serve{
    background-color: #E54B5E;
  }
  .user_fun div:nth-of-type(3) .serve{
    background-color: #5BD361;
  }
  .user_fun div:nth-of-type(4) .serve{
    background-color: #6BAEDD;
  }
  .serve i{
    color: white;
    font-size: 20px;
    line-height: 30px;
  }
  #user ul{
    list-style: none;
    margin-top: 90px;
    padding-left:15px;
    box-sizing: border-box;
    background-color: white;
    width: 100%;
    border-bottom: 1px solid #ddd;
  }
  #user ul li,.setting{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding: 8px 10px 8px 0;
    font-size: 14px;
  }
  #user ul li:nth-last-child(1){
    border: none;
  }
  #user ul li i,.setting i{
    color: #ddd;
    font-size: 20px;
  }
  #user ul li>div,.setting>div{
    display: flex;
    align-items: center;
  }
  #user ul li>div .serve,.setting .serve{
    width: 21px;
    height: 21px;
    margin: 0 10px 0 0;
    background-color: #35B0F0
  }
  #user ul li>div .serve i,.setting .serve i{
    font-size: 15px;
    line-height: 20px;
    color: white;
  }
  #user ul li:nth-of-type(2) div .serve{
    background-color: #53CB53;
  }
  #user ul li:nth-of-type(3) div .serve{
    background-color: #FAB41C;
  }
  #user ul li:nth-of-type(4) div .serve{
    background-color: #F03E70;
  }
  #user ul li:nth-of-type(5) div .serve{
    background-color: #A865CB;
  }
  .setting{
    padding-left: 15px;
    background-color: white;
    margin-top: 10px;
  }

</style>
