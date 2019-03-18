<template>
    <div id="user">
      <Head>
        <span slot="pageName">设置</span>
      </Head>
      <ul>
        <router-link to="/set_hubs" tag="li">
            <div>
              <span>安全中心</span>
            </div>
          <router-link to="/set_hubs">
            <i class="iconfont">&#xe655;</i>
          </router-link>
        </router-link>
        <router-link to="/set_bankManage" tag="li">
          <div>
            <span>银行卡管理</span>
          </div>
          <router-link to="/set_bankManage">
          <i class="iconfont">&#xe655;</i>
          </router-link>
        </router-link>
        <li @click="cache">
          <div>
            <span>清除缓存</span>
          </div>
          <i class="iconfont">&#xe655;</i>
        </li>
      </ul>
      <ul>
        <router-link to="/set_help" tag="li">
          <div>
            <span>帮助指南</span>
          </div>
          <i class="iconfont">&#xe655;</i>
        </router-link>
        <router-link to="/set_about" tag="li">
          <div>
            <span>关于</span>
          </div>
          <i class="iconfont">&#xe655;</i>
        </router-link>
      </ul>
      <div class="closeBtn">
        <button @click="logOut">退出登录</button>
      </div>
    </div>
</template>

<script>
import Head from "../components/header";
export default {
    components:{
        Head,
    },
    name: "set",
    data() {
      return {
      }
    },
    methods: {
      logOut(){
        let _this=this
        _this.confirm({
          title: "提示",
          content: "确定退出登录？",
          onConfirm() {
            localStorage.removeItem('access_token');
            _this.showToast("text","退出成功")
            _this.$router.push({
              path: "/"
            });
          },
        });
      },
      cache(){
       
      }
    },
}
</script>

<style scoped>
  #user{
    background-color: #fff !important;
  }
  .serve i{
    color: white;
  }
  #user ul{
    padding-top: 50px;
    list-style: none;
    box-sizing: border-box;
    background-color: #fff;
    width: 100%;
  }
  #user ul li{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
    padding: 0 16px;
    height: 40px;
    line-height: 40px;
    color: #333;
  }
  #user ul li i,.setting i{
    color: #ddd;
    font-size: 15px;
  }
  #user ul li>div,.setting>div{
    display: flex;
    align-items: center;
  }
  #user ul:nth-of-type(2){border-top: 1px solid #ddd;padding-top: 0px;margin-top: 10px;}
  .closeBtn{text-align: center;margin: 30px auto;}
  .closeBtn button{width: 90%;height: 35px;background: #E54B55;color: #FFF;outline: none;border-radius: 5px;font-size: 14px;border: none;}


</style>
