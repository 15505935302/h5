<template>
    <div id="set_password">
      <Head>
        <span slot="pageName">找回登录密码</span>
      </Head>
      <ul  v-if="accountconfirm">
        <li>
          <div>登录账号</div>
          <div><input type="text" placeholder="请输入登录账号" v-model="account"></div>
        </li>
      </ul>
      <div class="choose" v-if="two">
        <button @click="passwordcome(2)">安全密码找回</button>
        <button @click="passwordcome(1)">密保问题找回</button>
      </div>
      <ul v-if="three">
        <li>
          <div>安全密码</div>
          <div><input type="text" placeholder="请输入登录密码" v-model="newpas"></div>
        </li>
        <li>
          <div>新登录密码</div>
          <div><input type="text" placeholder="请输入登录密码" v-model="newpass"></div>
        </li>
        <li>
          <div>确认密码</div>
          <div><input type="text" placeholder="请再次输入密码"  v-model="newpass1"></div>
        </li>
      </ul>
      <div class="closeBtn">
        <button v-if="accountconfirm" @click="acc">确认</button>
        <button v-if="three" @click="update">确认</button>
      </div>
    </div>
</template>

<script>
import Head from "../components/header";
    export default {
    components:{
        Head,
    },
    data(){
      return{
        old:'',
        newpas:"",
        newpass:'',
        newpass1:'',
        three:false,
        account:'',
        accountconfirm:true,
        two:false,
        id:0,
      }
    },
    methods:{
        //验证账号
        acc(){
          let obj = {
            account:this.account
          }
          this.$api.securityanswer(obj).then(res=>{
            console.log(res)
            if(res.data.result_code==0){
              if(res.data.data.securityStatus==0){
                this.$router.push({
                        name: 'set_securityProlem',
                        params: {
                            posit: this.account
                        }
                })
              }else{
                this.accountconfirm = false
                this.two = true
              }
            }else{
              this.showToast("text",res.data.result_desc)
            }
          })
        },
        // 找回方式
        passwordcome(id){
          if(id==1){
            this.$router.push({
                name: 'set_securityProlem',
                params: {
                    posit: this.account
                }
            })
          }
          if(id==2){
            this.two = false
            this.three = true
          }
        },
        update(){
            if(this.newpass==this.newpass1){
                this.$api.veripassword({withdrawalsPassword:this.$md5(this.$md5(this.$md5(this.newpas))),account:this.account}).then(res=>{
                  console.log(res)
                    if(res.data.data == "true"){
                      this.passwordco()
                    }else{
                      this.showToast("text","安全密码输入错误")
                    }
                })
            }else{
              this.showToast("text","2次新密码输入不一致")
            }

        },
        passwordco(){
          let passobj = {
                type:2,
                account:this.account,
                withdrawalsPassword:this.$md5(this.$md5(this.$md5(this.newpas))),
                newPassword:this.$md5(this.$md5(this.$md5(this.newpass)))
              }
          this.$api.passwordcome(passobj).then(res=>{
               if(res.data.data == "ok"){
                 this.showToast("text","修改登录密码成功")
                  this.$router.push({
                          name: 'Login',
                  })
               }else{
                   this.showToast("text",res.data.result_desc)
                }
          })
          }
    },
    }
</script>

<style scoped>
  #set_password{
    background: #f5f5f5;
    height: 100%;
    padding-top:50px;
  }
  #set_password ul{
    list-style: none;
    padding-left:15px;
    box-sizing: border-box;
    background-color: white;
    width: 100%;
  }
  #set_password ul li{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
    color: #333;
  }
  #set_password ul li div:nth-child(1){line-height: 40px;}
  #set_password ul li div:nth-child(2){width: 70%;height: 40px;}
  #set_password ul li input{width: 95%;height: 30px;vertical-align: text-top;border: none;outline: none;font-size: 14px;color: #333;margin:3px 0;}
  #set_password ul li input::-webkit-input-placeholder {color: #b5b5b5;}
  .closeBtn{text-align: center;margin: 30px auto;}
  .closeBtn button{width: 90%;height: 40px;background: #E54B55;color: #FFF;outline: none;border-radius: 4px;border: none; font-size: 14px;}
  .choose button{margin:5% 10% 0 10%;width: 80%;height: 40px;background: #E54B55;color: #FFF;outline: none;border-radius: 4px;border: none; font-size: 14px;
  }
</style>
