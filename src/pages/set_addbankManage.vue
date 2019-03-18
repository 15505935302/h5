<template>
  <div id="found">
    <Head>
        <p v-if="!this.$route.params.msg" slot="pageName">绑定银行卡</p>
        <p v-else slot="pageName">修改银行卡</p>
      </Head>
    <div class="bank">
      <ul>
        <li>
          <p>开户人姓名</p>
          <input v-if="this.$route.params.msg" :value="username" type="text" readonly>
          <input v-else v-model="username" type="text" placeholder="请输入开户人姓名" >
        </li>
        <li>
          <p>选择银行</p>
          <input  @click="bank(data,1)" type="text"  v-model="bankname"  ref='bankname' placeholder="请选择用户" readonly>
          <i class="iconfont">&#xe655;</i>
        </li>
        <li>
          <p>开户省</p>
          <input @click="bank(add,2)"  v-model="city" type="text" placeholder="请输入开户城市" readonly>
          <i class="iconfont">&#xe655;</i>
        </li>
        <li>
          <p>开户市</p>
          <input  @click="bank(add[id].child,3)"  v-model="city2" type="text" placeholder="请选择开户城市" readonly>
          <i class="iconfont">&#xe655;</i>
        </li>
        <li>
          <p>支行名称</p>
          <input  type="text"  v-model="city3"   placeholder="请填写支行名称" >
        </li>
        <li>
          <p>银行卡号</p>
          <input  v-model="bankcard" type="text" placeholder="请输入银行卡的卡号">
        </li>
        <li v-if="!this.$route.params.msg">
          <p>确认卡号</p>
          <input  v-model="bankcard2" type="text" placeholder="请确认您的银行卡卡号">
        </li>
        <li>
          <p>安全密码</p>
          <input v-model="safapassword" type="password" placeholder="请输入安全密码">
        </li>
      </ul>
      <div class="closeBtn">
        <button v-if="this.$route.params.msg" @click="bankup()">确定</button>
        <button v-else @click="determine()">确定</button>
      </div>
      <div class="safety">为了您的资金安全，首次绑定后开户人姓名无法修改，之后绑定的银行卡开户人姓名须与此相同</div>
      <div v-show='problembol'>
      <div class="mask" @click="problembol=false"></div>
      <div class="picker">
        <div class="picker-title">
          <span class="pt-cancel" style="color: rgb(153, 153, 153);" @click='problembol=false'>取消</span>
          <span class="pt-submit" style="color: rgb(74, 149, 228);">确定</span>
        </div>
        <div class="picker-panel">
          <div class="picker-wheel-wrapper">
            <div class="picker-wheel">
              <ul class="wheel-scroll">
                <template v-if="data[0].name">
                  <li  class="wheel-item" v-for='(item,index) in data' :key='index'  @click="questionsure($event,index)">{{item.name}}</li>
                </template>
                <template v-else>
                  <li @click="questionsure($event)" class="wheel-item" v-for='(item,ind) in data' :key='ind'>{{item}}</li>
                </template>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import Head from "../components/header";
import add from "../../static/add.json"
  export default {
    components:{
      Head,
    },
    data(){
      return{
        add:add,
        data:[
            "工商银行",
            "建设银行",
            "农业银行",
            "民生银行",
            "招商银行",
            "交通银行",
            "中国银行",
            "邮政储蓄",
            "中信银行",
            "兴业银行",
            "华夏银行",
            "浦发银行",
            "广发银行",
            "平安银行",
            "光大银行",
            "农商银行",
            "其他",
        ],
        problembol:false,
        "hide-district":true,
        username:"",
        bankname:"",
        bankcard:"",
        bankcard2:"",
        safapassword:"",
        "raw-value":true,
        title:'城市',
        city:'',
        city2:'',
        item:'',
        id:'',
        city3:'',
      }
    },
    methods:{
      bank(arr,item){
          this.data = arr
          this.item = item
          this.problembol = true
      },
      questionsure(e,id){
        if(this.item==1){
          this.bankname = e.currentTarget.innerText
        }
        else if(this.item==2){
          this.city = e.currentTarget.innerText
          this.id = id
          this.city2=""
        }
        else if(this.item==3){
          this.city2 = e.currentTarget.innerText
        }
       this.problembol = false
      },
      // 银行卡添加
      determine(){
        if(this.username && this.bankname && this.city && this.city2 && this.bankcard && this.bankcard2 && this.safapassword){
            if(this.bankcard== this.bankcard2){
              let obj = {
                  account:JSON.parse(localStorage.getItem('loginTime')).account,
                  realName:this.username,
                  bankName:this.bankname,
                  bankNo:this.bankcard,
                  openCardAddress:this.city+'+'+this.city2,
                  withdrawalsPassword:this.$md5(this.$md5(this.$md5(this.safapassword))),
                  defaultCard:1,
                }
                this.$api.addbank(obj).then(res=>{
                  console.log(res)
                  if(res.data.result_code==1){
                    this.showToast("text",res.data.result_desc)
                  }else if(res.data.data=="SUCCESS"){
                    this.showToast("text","添加银行卡成功")
                    this.$router.push({
                      name: 'set_bankManage',
                      })
                  }
                })
            }else{
            this.showToast("text","请确认2次银行卡号一样")
            }
        }else{
          this.showToast("text","请完整填写信息")
        }
      },
      // 银行卡修改
      bankup(){
        if(this.safapassword){
              let obj = {
                  bankName:this.bankname,
                  bankNo:this.bankcard,
                  openCardAddress:this.city+'--'+this.city2+'--'+this.city3,
                  withdrawalsPassword:this.$md5(this.$md5(this.$md5(this.safapassword))),
                  defaultCard:1,
                  id:this.$route.params.msg.id
                }
                this.$api.bankup(obj).then(res=>{
                  console.log(res)
                  if(res.data.result_code==1){
                    this.showToast("text",res.data.result_desc)
                  }else if(res.data.data=="SUCCESS"){
                    this.showToast("text","修改成功")
                    this.$router.push({
                      name: 'set_bankManage',
                      })
                  }
                })
        }else{
          this.showToast("text","请完整填写安全密码")
        }
      },
      para(){
        if(this.$route.params.msg){
          let msg = this.$route.params.msg
          this.username=msg.real_name
          this.bankname=msg.bank_name
          this.city=msg.open_card_address.split("--")[0]
          this.city2=msg.open_card_address.split("--")[1]
          this.city3=msg.open_card_address.split("--")[2]
          this.bankcard=msg.bank_no
        }
      }
    },
    mounted(){
      this.para()
    }
  }
</script>

<style scoped lang='less'>
  #found{
    background-color: #f5f5f5;
    padding-top:50px;
    height: 100%;
  }
  .bank>ul{
    padding-left: 15px;
    overflow: hidden;
    background: #fff;
    }
  .bank>ul>li{
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #dddddd;
    list-style: none;
  }
  .bank>ul>li p{
    width: 80px;
    display: block;
    float: left;
  }
  .bank>ul>li input{
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    width: 65%;
    border: none;
  }
  .bank>ul>li i{
    color: #888888;
    float: right;
    margin-right: 15px;  
    }
    .safety{
      color: #333;
      display: block;
      width: 90%;
      margin: 0 auto;
      font-size: 14px;
    }
  .closeBtn{text-align: center;margin: 20px auto;}
  .closeBtn button{width: 90%;height: 40px;background: #E54B55;color: #FFF;outline: none;border-radius: 4px;font-size: 16px;border: none;}
  
.mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9999;
    background: rgba(0,0,0,.2);
}.picker {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 270px;
    z-index: 10000;
    background: #fff;
}.picker-title {
    position: relative;
    height: 44px;
    color: #333;
}.picker-panel {
    position: relative;
    height: 226px;
    padding: 24px 12px;
    box-sizing: border-box;
}.picker-title .pt-cancel {
    left: 0;
    color: #999;
}.picker-title span {
    position: absolute;
    height: 44px;
    line-height: 44px;
    padding: 0 12px;
    font-size: 14px;
}.picker-title .pt-submit {
    right: 0;
    color: #42b983;
}.picker-title span {
    position: absolute;
    height: 44px;
    line-height: 44px;
    padding: 0 12px;
    font-size: 14px;
}.picker-title h4 {
    margin: 0;
    font-size: 16px;
    font-weight: 400;
    height: 44px;
    line-height: 44px;
    text-align: center;
}.picker-wheel-wrapper {
    display: flex;
    height: 100%;
}.picker-wheel-wrapper .picker-wheel {
    flex: 1;
    overflow: hidden;
}.picker-wheel-wrapper .wheel-scroll {
    margin-top: 50px;
    list-style: none outside none;
    margin: 0;
    padding: 0;
    text-align:center;
    overflow:scroll;
    height: 100%;
}.picker-wheel-wrapper .wheel-scroll .wheel-item {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    text-align: center;
    color: #333;
    padding: 0 20px;
    margin: 0 auto;
}
</style>
