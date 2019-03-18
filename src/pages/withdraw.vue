<template>
    <div id="voucher">
        <Head>
            <span slot="pageName">提现 </span>
        </Head>
        <form action="" class="voucher_form">
            <div class="list">
                <label for="">账户余额</label>
                <p>{{data.userBalance}}</p>
            </div>
            <div class="list">
                <label for="">可提金额</label>
                <p>{{data.availableWithdraw}}</p>
            </div>
            <div class="list">
                <label for="">剩余打码</label>
                <p>{{data.notCompleteMoney}}</p>
            </div>
            <div  class="list">
            <label>提现账户</label>
            <div class="bank" @click="problembol = true">
                <img :src="imgUrl(this.name)" alt="">
                <div>
                <input type="text" name="bank" v-model="name" readonly="readonly">
                <input type="text" name="bank" v-model="no" readonly="readonly">
                </div>
            </div> 
            <router-link to="" class="iconfont">&#xe655;</router-link>
            </div>       
            <div class="sum withdrawals">
                <label for="">提现金额</label>
                <input type="number"  v-model="amount"  :placeholder="want" oninput="value=value.replace(/[^\d]/g,'')" required>
            </div>
            <div class="sum">
                <label for="">安全密码</label>
                <input type="number" v-model="password" placeholder="请输入您的安全密码"  required>
            </div>
        </form>
        <button @click="withdrawals">确定</button>
        <div class="comment">
            <p>今天还可以提现{{data.withdrawalsCount}}次</p>
            <p>1、可提现金额：您的充值本金需要消费慢50%方可提款；投注中奖奖金+活动彩金+返点佣金可直接提款；</p>
            <p>2、单笔可提现：最低10元，最高5000000元</p>
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
                    <ul class="wheel-scroll">
                        <li @click="questionsure($event,item)" class="wheel-item" v-for='(item,index) in data.bankList' :key='index'>{{item.bank_name}}(尾号：{{item.bank_no}})</li>
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
        data:'',
        qrcodeImgurl:'',
        amount:'',
        password:'',
        want:'请输入您要提现的金额',
        problembol:false,
        name:'',
        no:'',
        id:'',
    };
  },
  methods:{
      filt(data) {
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
        return imgSrc[data]
      },
      imgUrl(id){
          return  "../../static/img/"+ this.filt(id) +".svg"
      },
      questionsure(e,item){
          this.name = item.bank_name
          this.no = item.bank_no
          this.id = item.id
          this.problembol = false
      },
      //可提现信息
      apiFunction() {
      this.$api.withdraw().then(res => {
         this.data = res.data.data;
         this.name = this.data.bankList[0].bank_name
         this.no = '尾号：'+this.data.bankList[0].bank_no
         this.id = this.data.bankList[0].id
        console.log(this.data);
      });
    },
      //提现
      withdrawals() {
        if(10<this.amount<this.data.availableWithdraw  && this.amount<5000000){
            let arr = {
                "fee":this.amount,
                "withdrawals_password":this.$md5(this.$md5(this.$md5(this.password))),
                "id":this.id,
                "type":"3"
            }
            this.$api.withdrawals(arr).then(res => {
                console.log(res)
                if(res.data.result_code==1){
                   this.showToast("text",res.data.result_desc)
                }else if(res.data.result_code==0){
                    this.showToast("text","提现成功")
                }
            });
        }else{
            this.amount = ''
            this.want = '请输入大于10元小于可提金额的额度'
            this.showToast("text",'请输入大于10元小于可提金额的额度')
        }
    },
  },
  mounted(){
      this.apiFunction()

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
      border-bottom: 1px solid #ddd;
      label{
          width: 20%;
      }
      p{
          color: #E54B55;
      }
      .bank{
            display: flex;
            align-items: center;
            width: 70%;
            text-align: left;
            img{
                width:40px;
                height: 40px;
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
          align-items: center;
          margin: auto;
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
