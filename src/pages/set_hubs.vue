<template>
    <div id="set_hubs">
      <Head>
        <span slot="pageName">安全中心</span>
      </Head>
      <div class="safeTop">
        <h5><span></span><em id="Slevel">您的账号安全级别为高</em><span></span></h5>
        <div class="star">
          <i class="iconfont small" :class="{sur: data.security_level >= index }" v-for="(item, index) in 5" :key="index">&#xe6a1;</i>
        </div>
        <p id="LoginInfo">上次登录：{{data.login_time}}<br />{{data.login_address}} | <router-link to="set_password" class="">不是我登录?</router-link></p>
      </div>
      <ul>
          <router-link to="/set_password" tag="li">
            <div>
              <span>修改登录密码</span>
            </div>
            <router-link to="/set_password">
            <i class="iconfont">&#xe655;</i>
            </router-link>
          </router-link>
          <router-link to="/set_verifyPassword" tag="li">
              <div>
                <span v-if="securityStatus.securityStatus=='1' || securityStatus.securityStatus=='3'">修改安全密码</span>
                <span v-else>未设置安全密码</span>
              </div>
              <router-link to="/set_verifyPassword">
              <i class="iconfont">&#xe655;</i>
            </router-link>
          </router-link>
          <router-link v-if="securityStatus.securityStatus=='2' || securityStatus.securityStatus=='3'" to="/set_securityProlem" tag="li">
            <div>
              <span>修改密保问题</span>
            </div>
            <router-link to="/set_securityProlem">
            <i class="iconfont">&#xe655;</i>
            </router-link>
          </router-link>
          <router-link v-else to="/set_problem" tag="li">
            <div>
              <span>未设置密保问题</span>
            </div>
            <router-link to="/set_problem">
            <i class="iconfont">&#xe655;</i>
            </router-link>
          </router-link>
      </ul>
    </div>
</template>

<script>
import Head from "../components/header";
    export default {
    name: "set_hubs",
    data (){
      return{
          data:{},
          securityStatus:'',
      }
    },
    components:{
        Head,
    },
    methods:{
      // 验证密保是否设置
      securityanswer(){
        this.$api.securityanswer({account:this.$store.state.user.account}).then(res=>{
          console.log(res)
          this.securityStatus = res.data.data
          if(this.securityStatus.securityStatus == '2'|| this.securityStatus.securityStatus == '3'){
            this.$store.commit("revploblem",true)
          }
        })
      }
    },
    mounted(){
      this.securityanswer()
      this.data = JSON.parse(localStorage.getItem('loginTime'))
      console.log(this.data)
    }
    }
</script>

<style scoped lang='less'>
  #set_hubs{
    background: #f5f5f5;
    padding-top: 50px;
  }
  .serve i{
    color: white;
    font-size: 20px;
    line-height: 30px;
  }
  #set_hubs ul{
    list-style: none;
    box-sizing: border-box;
    background-color: white;
    width: 100%;
  }
  #set_hubs ul li{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding: 8px 15px 8px 15px;
    font-size: 13px;
  }
  #set_hubs ul li i,.setting i{
    color: #ddd;
    font-size: 16px;
  }
  #set_hubs ul li>div,.setting>div{
    display: flex;
    align-items: center;
  }
  #set_hubs ul li>div .serve i,.setting .serve i{
    font-size: 15px;
    line-height: 20px;
    color: white;
  }
  .safeTop{text-align: center;background:linear-gradient(180deg,#E54B55,#B53840);}
  h5{margin: 0;}
  .safeTop h5 span{
    width: 30px;
    vertical-align: super;
    background: #fff;
    height: 1px;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
  }
  .safeTop h5 em, .safeTop h5 span{display: inline-block;font-style: normal;}
  .safeTop h5 em{color: #fff;font-size: 12px;font-weight: 400;margin: 20px .5em; margin-bottom: 10px;}
  .safeTop .star{color: #fff;font-size: 14px;}
  .safeTop .star .sur{color: #FFD556;}
  .small{margin: 0 10px;}
  .safeTop p{color: #fff;font-size: 14px;}
  .iconfont{font-size: 30px;}
  .safeTop p{color: #fff;}
  #LoginInfo{ padding-bottom: 30px;}
  #LoginInfo a{color: #FFD556;}
</style>
