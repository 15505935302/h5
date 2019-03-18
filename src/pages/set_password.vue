<template>
    <div id="set_password">
      <Head>
        <span slot="pageName">修改登录密码</span>
      </Head>
      <ul>
        <li>
          <div>原密码</div>
          <div><input type="text" placeholder="请输入当前所使用的密码" v-model="old"></div>
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
        <button @click="update">确认</button>
      </div>
    </div>
</template>

<script>
import Head from "../components/header";
    export default {
    name: "set_password",
    components:{
        Head,
    },
    data(){
      return{
        old:'',
        newpass:'',
        newpass1:'',
      }
    },
    methods:{
        update(){
          if(this.newpass==this.newpass1){
            let pattern = /^[a-zA-Z]\w{5,17}$/
                  if(!pattern.test(this.newpass)){
                    this.showToast("text","请输入字母加数字且6~18位")
                  }else{
                    let obj = 
                    {
                      old_password:this.$md5(this.$md5(this.$md5(this.old))),
                      password:this.$md5(this.$md5(this.$md5(this.newpass))),
                    }
                      this.$api.update(obj).then(res=>{
                        if(res.data.result_code==0){
                          this.showToast("text","密码更改成功")
                        }else{
                          this.showToast("text",res.data.result_desc)
                        }
                      })
                  }
          }else{
            this.showToast("text","2次新密码输入不一致")
          }
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

</style>
