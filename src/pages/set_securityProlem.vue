<template>
    <div id="set_password">
      <Head>
        <span v-if="pass" slot="pageName">设置新安全密码</span>
        <span v-else slot="pageName">验证密保问题</span>
      </Head>
      <ul v-if="!pass">
        <li v-if="questionList.securityStatus==0">
          <div>您未设置密保问题，请前往设置密保</div>
        </li>
        <template v-if="questionList.questionList!=''">
          <ul v-for="(item, index) in questionList.questionList" :key="index">
            <li v-if="index<2">
              <div v-if="index==0">问题一</div>
              <div v-if="index==1">问题二</div>
              <div v-if="index==2">问题三</div>
              <div>
                <p>{{item.question_desc}}</p>
              </div>
              <div>
                <i class="iconfont">&#xe655;</i>
              </div>
            </li>
            <li v-if="index<2">
              <div v-if="index==0">答案一</div>
              <div v-if="index==1">答案二</div>
              <div v-if="index==2">答案三</div>
              <div>
                <input v-if="index==0" type="text" placeholder="请输入答案"  v-model="answer1"  oninput="value=value.replace(/[^\w\u4E00-\u9FA5]/g, '')" maxlength='20'>
                <input v-if="index==1" type="text" placeholder="请输入答案"  v-model="answer2"  oninput="value=value.replace(/[^\w\u4E00-\u9FA5]/g, '')" maxlength='20'>
              </div>
              <div>
                <i class="iconfont">&nbsp;&nbsp;&nbsp;</i>
              </div>
            </li>
          </ul>
        </template>
      </ul>
      <!-- 安全密码 -->
      <ul  v-if="pass">
        <li>
        <div>新安全密码</div>
          <div><input type="text" v-model="withdrawalsPassword" placeholder="请输入想设置的安全密码"  oninput="value=value.replace(/[^\w\u4E00-\u9FA5]/g, '')" maxlength='20'></div>
        </li>
        <li>
          <div>确认密码</div>
          <div><input type="text" v-model="withdrawalsPassword2" placeholder="请确认密码"  oninput="value=value.replace(/[^\w\u4E00-\u9FA5]/g, '')" maxlength='20'></div>
        </li>
      </ul>
      <!-- 登录密码 -->
      <ul  v-if="passpass">
        <li>
        <div>新登录密码</div>
          <div><input type="text" v-model="withdrawalsPassword" placeholder="请输入想设置的登录密码"  oninput="value=value.replace(/[^\w\u4E00-\u9FA5]/g, '')" maxlength='20'></div>
        </li>
        <li>
          <div>确认密码</div>
          <div><input type="text" v-model="withdrawalsPassword2" placeholder="请确认密码"  oninput="value=value.replace(/[^\w\u4E00-\u9FA5]/g, '')" maxlength='20'></div>
        </li>
      </ul>
      <div class="closeBtn">
        <button  v-if="pass || passpass" @click="update">确定</button>
        <template v-else>
          <template v-if="this.$route.params.posit && questionList.securityStatus==0">
              <a href="https://f18.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=55229&configID=80293&jid=1334393335&s=1">
                <button>联系客服</button>
              </a>
          </template>
          <template v-else>
            <button  v-if="questionList.securityStatus==0" @click="sumb">设置密保</button>
            <button v-else @click="validate">确定</button>
          </template>
        </template>
      </div>
    </div>
</template>

<script>
import Head from "../components/header";
    export default {
    name: "set_securityProlem",
    data(){
      return{
        data:'',
        questionList:{},
        answer1:'',
        answer2:'',
        pass:this.$route.params.bol,
        oldpass:this.$route.params.oldpass,
        withdrawalsPassword:'',
        withdrawalsPassword2:'',
        passpass:false,
      }
    },
    components:{
        Head,
    },
    methods:{
      // 密保问题获取
      securityanswer(){
        if(this.$route.params.posit){
          this.$api.securityanswer({account:this.$route.params.posit}).then(res=>{
            this.questionList = res.data.data
            console.log(res)
          })
        }else{
        this.$api.securityanswer({account:this.data.account}).then(res=>{
            this.questionList = res.data.data
            console.log(res)
        })
        }
      },
      // 验证密保问题
      validate(){
        console.log(this.answer1)
        console.log(this.answer2)
        let object= {
        questionId1:this.questionList.questionList[0].question_id,
        questionId2:this.questionList.questionList[1].question_id,
        answer1:this.answer1,
        answer2:this.answer2,
        account:this.$store.state.user.account
        }
        this.$api.validate(object).then(res=>{
            this.questionList = res.data.data
            console.log(res)
            if(res.data.result_code==0){
              if(this.$store.state.revploblem){
                this.$router.push({
                        name: 'set_problem',
                        params:{
                          mgs:res.data.data
                        }
                })
              }else{
                if(this.$route.params.posit){
                  this.passpass = true
                }else{
                  this.pass = true
                }
                  this.oldpass = res.data.data
              }
            }else{
              this.showToast("text",res.data.result_desc)
            }
        })
      },
      // 账号密码修改
      // findpassword(){
      //   let obj = {
      //     securityCode:this.oldpass,
      //     newPassword:this.withdrawalsPassword,
      //     account:this.data.account,
      //   }
      //   this.$api.findpassword(obj).then(res=>{
      //     this.showToast("text","修改成功")
      //     this.$router.push({
      //                 name: 'set_hubs',
      //     })
      //   })
      // },
      // 安全密码修改
      update(){
        if(this.withdrawalsPassword !== this.withdrawalsPassword2){
          this.showToast("text","2次密码输入不一样")
        }else{
          // 更改登录密码
          if(this.passpass){
              let passobj = {
                type:1,
                account:this.$route.params.posit,
                securityCode:this.oldpass,
                newPassword:this.$md5(this.$md5(this.$md5(this.withdrawalsPassword)))
              }
              this.$api.passwordcome(passobj).then(res=>{
                if(res.data.result_code==0){
                  this.showToast("text","修改登录密码成功")
                  this.$router.push({
                          name: 'Login',
                  })
                }else{
                   this.showToast("text",res.data.result_desc)
                }
              })
          }
          // 更改安全密码
          if(this.pass){
            if(!this.$route.params.oldpass){
              let obj={
                  securityCode:this.oldpass,
                  newPassword:this.$md5(this.$md5(this.$md5(this.withdrawalsPassword))),
                  account:this.data.account
                  }
              this.$api.findpassword(obj).then(res=>{
                console.log(res)
                if(res.data.result_code==0){
                  this.$router.push({
                          name: 'set_hubs',
                  })
                  this.showToast("text","设置成功")
                }else{
                  this.showToast("text",res.data.result_desc)
                }
              })
            }else{
              let obj={
                  old_password:this.$md5(this.$md5(this.$md5(this.$route.params.oldpass))),
                  withdrawals_password:this.$md5(this.$md5(this.$md5(this.withdrawalsPassword))),
                  }
              this.$api.update(obj).then(res=>{
                console.log(res)
                console.log(26266)
                if(res.data.result_code==0){
                  this.$router.push({
                          name: 'set_hubs',
                  })
                  this.showToast("text","设置成功")
                }else{
                  this.showToast("text",res.data.result_desc)
                }
              })
            }
          }
        }
      },
      // 前往设置密保页面
      sumb(){
        this.$router.push({
          name: 'set_problem',
        })
      }
    },
    mounted(){
        this.data = this.$store.state.user
        console.log(this.oldpass)
        this.securityanswer()
    }
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
    padding-left:10px;
    box-sizing: border-box;
    background-color: white;
    width: 100%;
  }
  #set_password ul li{
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #333;
  }
  #set_password ul li div:nth-child(1){line-height: 40px;text-align: center;}
  #set_password ul li div:nth-child(2){width: 70%;height: 40px;}
  #set_password ul li input{width: 95%;height: 30px;vertical-align: text-top;border: none;outline: none;font-size: 14px;color: #333;margin:3px 0;}
  #set_password ul li input::-webkit-input-placeholder {color: #b5b5b5;}
  .closeBtn{text-align: center;margin: 30px auto;}
  .closeBtn button{width: 90%;height: 40px;background: #E54B55;color: #FFF;outline: none;border-radius: 4px;border: none; font-size: 14px;}
  #set_password ul li i {
    font-size: 14px;
    color: #333;
    line-height: 40px;
    margin-right: 20px;
  }
  #set_password ul li p {
    font-size: 14px;
    color: #333;
    line-height: 40px;
    margin-right: 20px;
  }
</style>
