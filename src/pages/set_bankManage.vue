<template>
  <div id="found">
    <Head>
        <span slot="pageName">选择充值方式</span>
      </Head>
    <div class="bank">
      <ul>
        <li v-if='data==""' class="bank_li nobank">
          <p>您还未绑定银行卡</p>
        </li>
        <template v-else>
          <li v-for="(item, index) in data" :key="index" class="bank_li">
            <img :src="imgUrl(item.bank_name)" alt="">
            <div>
              <span>{{item.bank_name}}</span>
              <p>尾号：<span>{{new Array(16).join('*') + item.bank_no.slice(15)}}</span></p>
            </div>
            <i @click="modify(item)">修改</i>
          </li>
        </template>
      </ul>
      <router-link tag='div' to='/set_addbankManage' class="closeBtn">
        <button>添加银行卡</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import Head from "../components/header";
  export default {
    data(){
      return{
        data:'',
      }
    },
    components:{
        Head,
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
      userinfobank(){
        this.$api.userinfobank().then(res=>{
          console.log(res)
          this.data = res.data.data
        })
      },
      modify(item){
        this.$router.push({
          name: 'set_addbankManage',
          params: {
              msg: item
          }
          })
      }
    },
    mounted(){
      this.userinfobank()
    }
  }
</script>

<style scoped>
  #found{
    background-color: #f5f5f5;
    height: 100%;
  }
  .bank{
    padding-top:50px;
  }
  .bank ul{overflow: hidden;padding-top: 12px;}
  .bank_li{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 15px;
    color: #333;
    border-bottom: 1px solid #ddd;
    background-color: #fff;
    width: 85%;
    margin: 0 auto;
    border-radius: 10px;
    border:1px solid rgba(221,221,221,1);
    margin-bottom: 12px;
    height: 60px;
  }
  .nobank{
    text-align: center;
    font-size: 14px;
    color: #888888;
  }
  .nobank p{
    margin: 0 auto;
  }
  .bank_li span{
    font-size: 14px;
  }
  .bank_li img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 0 11px 0 14px;
  }
  .bank_li div{
    width: 70%;
  }
  .bank_li i{
    font-style: normal;
    font-size: 14px;
    color: #E54B55;
  }
  .bank_li div p,.bank_li div p span{
    font-size: 14px;
    color: #888;
  }
  .bank_li span{
    color: #333;
    font-size: 18px;
  }
  .closeBtn{text-align: center;margin: 20px auto;}
  .closeBtn button{width: 90%;height: 40px;background: #E54B55;color: #FFF;outline: none;border-radius: 4px;font-size: 16px;border: none;}

  
</style>
