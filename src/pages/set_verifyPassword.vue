<template>
  <div id="set_verifyPassword">
    <Head>
        <span slot="pageName">验证安全密码</span>
      </Head>
    <ul>
      <li>
        <div>原安全密码</div>
        <div><input type="text" v-model="withdrawalsPassword" placeholder="请输入当前所使用的密码" onKeyUp="value=value.replace(/[\W]/g,'')" maxlength='20'></div>
      </li>
    </ul>
    <p @click="password()">忘记安全密码？未设置安全密码？</p>
    <div class="closeBtn">
      <button @click="veripassword">确定</button>
    </div>
    <div class="warning"><img src="../assets/iconfont/warning.svg" alt="">安全密码用于提现、绑定银行卡等操作、可保障资金安全。</div>
  </div>
</template>

<script>
import Head from "../components/header";
    export default {
    data(){
      return{
        withdrawalsPassword:'',
        data:'',
      }
    },
    components:{
        Head,
    },
    name: "set_verifyPassword" ,
    methods:{
      password(item){
          this.$router.push({
            name: 'set_securityProlem',
            params: {
                msg: item
            }
            })
      },
      veripassword(){
        if(this.withdrawalsPassword){
          let obj = {
             withdrawalsPassword:this.$md5(this.$md5(this.$md5(this.withdrawalsPassword))),
             account:this.data.account
          }
          this.$api.veripassword(obj).then(res=>{
            console.log(res)
            if(res.data.result_desc=="没有设置安全密码"){
              this.showToast("text",res.data.result_desc)
            }else if(res.data.data=="true"){
              this.$router.push({
                      name: 'set_securityProlem',
                      params:{
                        bol:true,
                        oldpass:this.withdrawalsPassword,
                      }
              })
            }else{
              this.showToast("text",'原安全密码输入错误')
            }
          })
        }else{
          this.showToast("text","请输入原安全密码")
        }
      }
    },
    mounted(){
    this.data = this.$store.state.user
    }
    }
</script>

<style scoped>
  #set_verifyPassword{
    background: #f5f5f5;
    height: 100%;
    padding-top: 50px;
    
  }
  #set_verifyPassword ul{
    list-style: none;
    padding-left:15px;
    padding-right:15px;
    box-sizing: border-box;
    background-color: white;
    width: 100%;
    border-bottom:1px solid #ddd;
  }
  #set_verifyPassword ul li{
    display: flex;
    justify-content: space-between;
  }
  #set_verifyPassword ul li div:nth-child(1){line-height: 40px;font-size: 14px; color:#333}
  #set_verifyPassword ul li div:nth-child(2){width: 70%;height: 40px;}
  #set_verifyPassword ul li input{width: 95%;height: 30px;vertical-align: text-top;font-size: 14px;border: none;outline: none;margin: 3px 0 ;line-height: 30px;}
  #set_verifyPassword ul li input::placeholder{color: #b5b5b5}
  #set_verifyPassword p{padding-left: 15px;color: #E54B55;margin-top: 5px;font-size: 12px;}
  .closeBtn{text-align: center;margin: 20px auto;}
  .closeBtn button{width: 90%;height: 40px;background: #E54B55;color: #FFF;outline: none;border-radius: 4px;font-size: 14px;border: none;}
  .warning{width: 85%;background:rgba(251,246,246,1);border:1px solid rgba(248,184,185,1);padding: 10px;margin: 0 auto;line-height: 24px;}
  .warning img{width: 22px;height: 22px;vertical-align: bottom;margin: 0 6px;}
</style>
