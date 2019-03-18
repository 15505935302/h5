<template>
    <div class="register">
        <Header>
            <span slot="pageName">用户注册</span>
            <span slot="right" class="right"><a href="https://f18.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=55229&configID=80293&jid=1334393335&s=1">客服</a></span>
        </Header>
        <form action="" method="POST" @submit.prevent="submit">
            <table>
                <tr>
                    <td>邀请码</td>
                    <td><input type="text" v-model="formobj.code" id="" placeholder="6-8位数字" autocomplete></td>
                </tr>
                <tr>
                    <td>账号</td>
                    <td><input type="text" v-model="formobj.account" placeholder="请输入4-16位英文或数字" autocomplete></td>
                </tr>
                <tr>
                    <td>设置密码</td>
                    <td><input type="password" v-model="formobj.password" placeholder="请输入6-16位字符" autocomplete></td>
                </tr>
                <tr>
                    <td>确认密码</td>
                    <td><input type="password" placeholder="请再次输入密码" v-model="confirmPassword" autocomplete></td>
                </tr>
                <!-- <tr>
                    <td>验证码</td>
                    <td><input type="text" name="authCode" autocomplete></td>
                    <td><img src="" alt=""></td>
                </tr> -->
            </table>
            <input class="submit" type="submit" value="立即注册">
        </form>
    </div>
</template>

<script>
import Header from "../components/header";
export default {
    components:{
        Header
    },
    data(){
        return {
            formobj:{
                code:'',
                account:'',
                password:'',
            },
            confirmPassword:'',
            popupMsg:''
        }
    },
    methods:{
        submit(e){
            if(this.formobj.account==" " || this.formobj.account==undefined || this.formobj.account.length==0){
                this.popupMsg="账号不能为空"
                this.showToast("text",this.popupMsg)
            }else{
                let pattern = /^[A-Za-z0-9]{4,16}$/
                if(!pattern.test(this.formobj.account)){
                    this.popupMsg="请正确输入账号"
                    this.showToast("text",this.popupMsg)
                }else{
                    let pattern = /^[a-zA-Z]\w{5,17}$/
                    if(!pattern.test(this.formobj.password)){
                        if(this.formobj.password.length==0 || this.formobj.password==" " || this.formobj.password==undefined){
                            this.popupMsg="密码不能为空"
                        }else{
                            this.popupMsg="请正确输入密码"
                        }
                        this.showToast("text",this.popupMsg)
                    }else{
                        if(this.formobj.password!=this.confirmPassword){
                            if(this.confirmPassword.length==0 || this.confirmPassword==" " || this.confirmPassword==undefined){
                                this.popupMsg="请输入确认密码"
                            }else{
                                this.popupMsg="两次密码不一样"
                            }
                            this.showToast("text",this.popupMsg)                            
                        }else{
                            let pattern = /^\d{6,8}$/
                            if(this.formobj.code.length==0){
                                let data = Object.assign({client_from:'phone'},{account:this.formobj.account,password:this.$md5(this.$md5(this.$md5(this.formobj.password)))})
                                this.$store.dispatch('register', data).then((res) =>{
                                    console.log(res)
                                    this.showToast("text",res.data.result_desc)
                                    if(res.data.result_code==0){
                                        setTimeout(()=>{
                                            location.replace('/')
                                        },1000)
                                    }
                                })
                            }else if(!pattern.test(this.formobj.code)){
                                this.popupMsg="请正确输入邀请码"
                            }else{
                                let data = Object.assign({client_from:'phone'},{account:this.formobj.account,password:this.$md5(this.$md5(this.$md5(this.formobj.password)))})
                                this.$store.dispatch('register',data).then((res) => {
                                    this.showToast("text",res.data.result_desc)
                                    if(res.data.result_code==0){
                                        setTimeout(()=>{
                                            location.replace('/')
                                        },1000)
                                    }
                                })
                            }
                        }
                    }
                }
            }
        },
        cancel() {
            this.$store.commit("playingShow", false);
        },
    }
}
</script>

<style lang="less" scoped>
.right {
  font-size: 14px;
}
a{
    color: #fff;
}
.submit {
  line-height: 38px;
  width: 100%;
  height: 38px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  color: #fff;
  background-color: #e54b55;
  box-shadow: 1px 2px 10px 2px #ddd;
  margin-top: 20px;
}
.register{
    width: 100%;
    margin-top: 50px;
    form{
        font-size: 16px;
        padding: 10px;
        table{
            width: 100%;
            tr{
                td{
                    padding: 12px 0;
                    input{
                        width: 80%;
                        border: none;
                        font-size: 14px;
                        &:focus{
                            outline-style: none;
                        }
                        &::-webkit-input-placeholder{
                            color: #888;
                        }
                    }
                }
                &>td:nth-child(2){
                    width: 80%;
                    padding-left: 18px;
                }
            }
        }
    }  
}
</style>
