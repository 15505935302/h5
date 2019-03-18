<template>
    <div id="voucher">
        <Head>
            <span slot="pageName">{{payName}}</span>
        </Head>
        <form action="" class="voucher_form">
            <div v-for="(item, index) in data.recharge_way_list" :key="index">
            <template v-if="index==way">
                <div  v-if='payName=="公司入款"' class="list"  @click="problembol=true">
                    <label for="">选择银行</label>
                    <div class="bank">
                        <img :src="imgUrlbank(item.bank_name)" alt="">
                        <p>{{item.bank_name}}</p>
                    </div>
                    <router-link to="" class="iconfont right_arrows">&#xe655;</router-link>
                    </div>
                    <div  v-if='payName=="支付宝" || payName=="微信支付" || payName=="QQ钱包" || payName=="第四方" || payName=="银联支付"' class="list" @click="problembol=true">
                        <label for="">选择通道</label>
                        <div class="bank">
                            <img :src="imgUrl(payName)" alt="">
                            <p>{{item.pay_type_name}}</p>
                        </div>
                        <router-link to="" class="iconfont right_arrows">&#xe655;</router-link>
                    </div>
                    <div  v-if='payName=="网银支付" ' class="list" @click="problembol=true">
                        <label for="">选择通道</label>
                        <div class="bank">
                            <img src="../../static/img/online.svg" alt="">
                            <p>{{item.pay_type_name}}</p>
                        </div>
                        <router-link to="" class="iconfont right_arrows">&#xe655;</router-link>
                    </div>
                    <div  v-if='payName=="公司入款"' class="list">
                        <label for="">收款人</label>
                        <div class="state">
                            <input type="text" name="userName" :value="item.real_name" >
                        </div>
                        <span @click="copy(item.real_name)">复制&nbsp;</span>
                    </div>
                    <div  v-if='payName=="公司入款"' class="list">
                        <label for="">收款账号</label>
                        <div class="state">
                            <input type="text" name="account" onkeyup="this.value = this.value.replace(/\s/g,'').replace(/[^\d]/g,'').replace(/(\d{4})(?=\d)/g,'$1 ');" :value="item.account" required>
                        </div>
                        <span  @click="copy(item.account)">复制&nbsp;</span>
                    </div>
                    <div  v-if='payName=="公司入款"' class="list">
                        <label for="">开户支行</label>
                        <div class="state">
                            <input type="text" name="openBank" :value="item.open_card_address" >
                        </div>
                        <span  @click="copy(item.open_card_address)">复制&nbsp;</span>
                    </div>
                    <div class="remark">
                        <div>备注信息</div>
                        <p>{{ item.remark}}</p>
                    </div>
                    <div class="sum">
                        <label for="">充值金额</label>
                        <input type="text" name="account" placeholder="请输入充值金额"  v-model="point" required>
                    </div>
                    <div v-if='payName=="公司入款" || payName=="网银支付" || payName=="银联支付"' class="sum bankUser">
                        <label for="">付款人</label>
                        <input type="text" name="account" placeholder="请输入付款人银行卡姓名" required>
                    </div>
                </template>
            </div>
        </form>
        <button @click="xianxia()">确定</button>
        <div v-if='payName=="公司入款" || payName=="网银支付" || payName=="银联支付"' class="comment">
            <p>1、请转账到以上收款银行账户；</p>
            <p>2、认真填写充值金额和付款人，以便及时核对；</p>
            <p>3、请支付成功后再提交订单，请勿重复提交订单。</p>
        </div>
        <div v-if='payName=="微信支付" || payName=="QQ钱包" || payName=="京东钱包"' class="comment">
            <p>1、扫一扫弹出的二维码进行充值；</p>
            <p>2、可以使用其他手机二维码进行充值，也可以将二维码保存至相册再使用{{payName}}识别相册中的二维码进行充值，该二维码仅当次有效，每次充值前务必在本页面获取最新二维码；</p>
        </div>
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
                        <ul v-if="payName=='公司入款'" class="wheel-scroll">
                            <li @click="questionsure($event)" class="wheel-item" v-for='(ite,index) in data.recharge_way_list' :key='index'  :data-id="index">{{ite.bank_name}}</li>
                        </ul>
                        <ul v-else class="wheel-scroll">
                            <li @click="questionsure($event)" class="wheel-item" v-for='(ite,index) in data.recharge_way_list' :key='index'  :data-id="index">{{ite.pay_type_name}}</li>
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Head from "../components/header";
export default {
  components: {
    Head,
    
  },
  data() {
    return {
        payName:this.$route.params.msg.name,
        data:this.$route.params.msg,
        qrcodeImgurl:'',
        problembol:false,
        way:0,
        point:"",
    };
  },
  methods:{
      filtbank(data) {
        let imgSrc = {
            '工商银行': 'gongshang',
            '光大银行': 'guangda',
            '广发银行': 'guangfa',
            '华夏银行': 'huaxia',
            '建设银行': 'jianshe',
            '交通银行': 'jiaoteng',
            '民生银行': 'mingsheng',
            '农村信用社': 'ncxys',
            '农业银行': 'nongye',
            '平安银行': 'pingan',
            '浦发银行': 'pufa',
            '兴业银行': 'xingye',
            '邮储银行': 'youchu',
            '招商银行': 'zhaoshang',
            '中国银行': 'zhongguo',
            '中信银行': 'zhongxin',
            '其他': 'online',
        }
        if(!imgSrc[data]){
            return "online"
        }else{
            return imgSrc[data]
        }
      },
      imgUrlbank(id){
          return  "../../static/img/"+ this.filtbank(id) +".svg"
      },
      filt(data) {
        let imgSrc = {
            'QQ钱包': 'qqpay',
            '第四方': 'online',
            '公司入款': 'online',
            '网银支付': 'online',
            '银联': 'online',
            '微信支付': 'weixinpay',
            '支付宝': 'zfbpay',
            '京东钱包': 'jdpay',
        }
        return imgSrc[data]
      },
      imgUrl(id){
          return  "../../static/img/"+ this.filt(id) +".svg"
      },
      // 复制
        copy(str){
        let save = function (e){
    　　　　　　e.clipboardData.setData('text/plain',str);//下面会说到clipboardData对象
    　　　　　　e.preventDefault();//阻止默认行为
    　　　　}
    　　　　document.addEventListener('copy',save);
    　　　　document.execCommand("copy");//使文档处于可编辑状态，否则无效
        this.showToast("text","复制成功")
    　　},
      //支付列表
      qrcode() {
      // 支付二维码列表
      this.$api.qrcode().then(res => {
         this.qrcodeImgurl = res;
        console.log(res);
      });
    },
    // 问题选择
    questionsure(e){
      this.way = e.target.dataset.id
      console.log(this.way)
      this.problembol = false
    },
    rech(){
        if(type_key==1){
            this.xianxia()
        }else if(type_key==2){
            this.recharge()
        }
    },
    // 第三方
    recharge(){
        let obj = {
            uid:this.$store.state.user.id,
            money:this.point,
            account_id:2,
            }
        this.$api.recharge(obj).then(res => {
            this.qrcodeImgurl = res;
            console.log(res);
        }); 
    },
    // 线下
    xianxia(){
        let obj = {
            "point":this.point,
            "account_type":this.$route.params.msg.type_key,
            "account_id":this.data.recharge_way_list[this.way].id,
            "real_name":this.$store.state.user.zfb_name,
        }
        this.$api.xianxia(obj).then(res => {
         this.qrcodeImgurl = res;
         console.log(res)
            if(res.data.result_code==0){
                this.showToast("text","充值提交成功，等待后台人员确认")
                this.$api.userDetails(this.$store.state.user).then(res=>{
                    this.$store.commit("user",res.data.data)
                    window.history.back();
                })
            }else{
                this.showToast("text",res.data.result_desc)
            }
      }); 
    }
  },
  mounted(){
      this.qrcode()
  }
};
</script>

<style scoped lang="less">
*{
    text-align: left;
}
.input{
    border: none;
    font-size: 14px;
    width: 100%;
    &:focus {
    outline: none;
    }
}
.img{
    width: 25px;
    margin-right: 10px;
}
#voucher {
    height: 100%;
    background-color: #f5f5f5;
    text-align: center;
    margin-top: 50px;
  .voucher_form {
      background-color: #fff;
      font-size: 14px;
      color: #333;
      padding: 0 16px 0 16px;
      border-bottom: 1px solid #ddd;
    .list {
      display: flex;
      padding: 8px 16px 8px 0;
      align-items: center;
      border-bottom: 1px solid #ddd;
      label{
          width: 20%;
      }
      .bank{
            display: flex;
            align-items: center;
            width: 80%;
            text-align: left;
            img{
                .img()
            }
            input{
                .input()
            }
      }
      .state{
          width: 70%;
          text-align: left;
        img{
            .img()
        }
        input {
            .input()
        }
      }
      .right_arrows{
          color: #ddd;
      }
      span{
          color: #3C97EB;
      }
    }
    .remark{
        display: flex;
        padding: 8px 16px 8px 0;
        border-bottom: 1px solid #ddd;
        div{
            min-width: 75px;
            text-align: left;
            display: inline-block
        }
        p{
            color: #F19149;
            display: inline-block;
            text-align: left !important;
        }
    }
    .sum{
        display: flex;
        padding: 8px 16px 8px 0;
        align-items: center;
        border-bottom: 1px solid #ddd;
        label{
            width: 20%;
        }
        input{
            .input();
            margin-left: 16px;
        }
    }
    .bankUser{
        border: none;
    }
  }
  button{
      width: 92%;
      background-color: #E54B55;
      border: none;
      height: 35px;
      margin: auto;
      font-size: 14px;
      color: white;
      border-radius: 5px;
      margin-top: 26px;
      text-align: center;
      &:focus{
          outline: none;
      }
  }
  .comment{
      border: 1px solid #F8B8B9;
      padding: 10px;
      box-sizing: border-box;
      text-align: left;
      width: 92%;
      margin: 25px auto;
  }
}
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
