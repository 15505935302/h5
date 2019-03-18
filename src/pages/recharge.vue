<template>
    <div id="voucher">
        <Head>
            <span slot="pageName">选择充值方式</span>
        </Head>
        <div class="main">
            <ul>
                <li v-for="(item, index) in data" :key="index" @click="childer(item)">
                    <a><img :src="imgUrl(item.name)"></a>
                    <span>
                        <em>{{item.name}}</em><br>
                        <p>单笔最低{{item.recharge_min_limit}}元，单笔最高{{item.recharge_max_limit}}元</p>
                    </span>
                    <i class="iconfont">&#xe655;</i>
                </li>
            </ul>
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
        data:{},

    };
  },
  methods: {
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
      pay(){
          this.$api.pay().then(res=>{
              console.log(res)
            this.data = res.data.data
              console.log(this.data)
            })
      },
      childer(item){
          this.$router.push({
            name: 'rechargecompany',
            params: {
                msg: item
            }
            })
      }
  },
  mounted(){
      this.pay()
  }
};
</script>

<style scoped lang="less">
* {
    box-sizing: border-box;
}.main{
    background: #f5f5f5;
    min-height: calc(100vh - 51px);
    font-size: inherit;
    padding-top: 51px;
    font-family: PingFangSC-Regular;
    ul{
        height: auto;
        li{
            background: #fff;
            margin: 10px auto;
            width: 345px;
            height: 60px;
            display: block;
            position: relative;
            border-radius: 5px;
            a{
                
                width: 40px;
                height: 40px;
                margin: 10px 15px 10px 10px;
                float: left;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            
            span{
                display: inline-block;
                height:40px;
                width: auto;
                margin-top: 10px;
                em{
                font-style: inherit;
                font-size: 13px;
                color: #333333;
                }
                p{
                font-size: 12px;
                color: #888888;
                }
                
            }
            .iconfont{
                    float: right;
                    font-size: 16px;
                    color: #DDDDDD;
                    line-height: 60px;
                    margin-right: 15px;
            }
        }
    }
}
</style>
