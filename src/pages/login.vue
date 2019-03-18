<template>
    <div class="login">
        <Header>
            <span slot="pageName">登录</span>
            <span slot="right" class="right">客服</span>
        </Header>
        <div class="menu">
          <form action="" @submit.prevent="login">
              <table>
                  <tr>
                      <td>账号</td>
                      <td><input type="text" v-model="formObj.account" placeholder="请输入账号" autocomplete></td>
                  </tr>
                  <tr>
                      <td>密码</td>
                      <td><input type="password" v-model="formObj.password" placeholder="请输入密码" autocomplete></td>
                  </tr>
              </table>
              <div class="retrievePassword">
                  <router-link to="set_revpassword">找回密码</router-link>
              </div>
              <button class="submitre">立即登录</button>
          </form>
          <router-link to="/register" class="submitre">免费注册</router-link>
        </div>
    </div>
</template>

<script>
import Header from "../components/header";
export default {
  components: {
    Header
  },
  data() {
    return {
      formObj: { account: "", password: "" },
    };
  },
  methods: {
    login() {
      let data=Object.assign({client_from:'phone'},{account:this.formObj.account,password:this.$md5(this.$md5(this.$md5(this.formObj.password)))})
      this.$store.dispatch('login', data).then((res) => {
        console.log(res)
        if(res.data.result_code==1){
          this.showToast("text",res.data.result_desc)
        }else if(res.data.result_code==0){
          this.showToast("text","登录成功")
          setTimeout(()=>{
            location.replace('/')
            this.select=0
          },1000)
        }
      })
    },
  }
};
</script>

<style lang="less" >
.right {
  font-size: 14px;
}
.submitre {
  display: inline-block;
  line-height: 38px;
  width: 90%;
  height: 38px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  color: #333;
  background-color: #fff;
  box-shadow: 1px 2px 10px 2px #ddd;
}
.submit {
  display: inline-block;
  line-height: 38px;
  width: 100%;
  height: 38px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  color: #333;
  background-color: #fff;
  box-shadow: 1px 2px 10px 2px #ddd;
}
.login {
  text-align: center;
  margin-top: 50px;
  .menu {
    padding: 15px;
    form {
      font-size: 16px;
      table {
        width: 100%;
        text-align: left;
        tr {
          td:nth-child(1) {
            width: 20%;
          }
          td:nth-child(2) {
            width: 80%;
          }
          td {
            padding: 10px 0;
            input {
              width: 90%;
              border: none;
              font-size: 16px;
              &:focus {
                outline-style: none;
              }
            }
          }
        }
      }
      .retrievePassword {
        padding: 10px;
        text-align: left;
        a {
          color: #e54b55;
        }
      }
      button {
        margin-bottom: 15px;
        color: #fff;
        background-color: #e54b55;
      }
    }
  }
}
</style>
