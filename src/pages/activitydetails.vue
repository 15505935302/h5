<template>
  <div id="activity">
    <Head>
      <span slot="pageName">活动中心</span>
    </Head>
    <!-- 每日加奖 -->
    <div v-if="item.type == 4" class="activityMian main">
      <div class="activiTop">
        <img
          width="100%"
          :src="item.img_url"
        >
        <div class="rewardStatus">
          <em class="e1">昨日投注：
            <i>{{data.yesterdayBetMoney}}</i>
          </em>
          <em class="e2">当前等级：
            <i>{{data.userLevel}}</i>
          </em>
          <em class="e3">加奖比例：
            <i>{{data.bonusRate}}</i>
          </em>
          <em class="e4">可得加奖：
            <i>{{data.userBetBonus}}</i>
          </em>
        </div>
        <div v-if="data.userBetBonus>0" @click='getamount()' class="recBtn">
          <a>点击领取</a>
        </div>
        <div v-else class="recBtn unClick">
          <a>不可领取</a>
        </div>
      </div>
      <div class="bgwhite">
        <span class="redrect"></span>
        <h3>加奖比例</h3>
        <table>
            <tr>
            <th>等级/投注额</th>
            <th>100+</th>
            <th>100000+</th>
            <th>500000+</th>
            </tr>
            <template v-for="(item, index) in lists" >
              <tr v-if="index%3==0" :key="index">
              <td>VIP{{index/3+3}}</td>
              <td>{{item.bonus_rate}}%</td>
              <td>{{(item.bonus_rate+0.1).toFixed(1)}}%</td>
              <td>{{(item.bonus_rate+0.2).toFixed(1)}}%</td>
              </tr>
            </template>
        </table>
      </div>
      <div class="bgwhite">
        <span class="redrect"></span>
        <h3>活动说明</h3>
      <div class="wrapExplain">
        <p style="font-family:'color:#666666; background-color:#FFFFFF; x:14px !important;">1、每日加奖在
          <span style="font-family:'color:#666666; background-color:#FFFFFF; x:14px !important;">次日</span>凌晨00:30后开放领取；
        </p>
        <p
          style="font-family:'color:#666666; background-color:#FFFFFF; x:14px !important;"
        >2、加奖比例是根据会员等级以及昨日累计投注金额进行一定比例的加奖；</p>
        <p
          style="font-family:'color:#666666; background-color:#FFFFFF; x:14px !important;"
        >3、需Vip3以上且昨日投注额大于或等于100才能获得加奖；</p>
        <p style="font-family:'color:#666666; background-color:#FFFFFF; x:14px !important;">4、
          <span
            style="font-family:&quot;color:#666666; background-color:#FFFFFF; x:14px !important;"
          >撤单和</span>其他无效投注将不计算在内；
        </p>
        <p
          style="font-family:'color:#666666; background-color:#FFFFFF; x:14px !important;"
        >5、活动奖金次日未领取，视为自动放弃活动资格
          <span
            style="font-family:&quot;color:#666666; background-color:#FFFFFF; x:14px !important;"
          >
            <span
              style="font-family:&quot;color:#666666; background-color:#FFFFFF; x:14px !important;"
            >。</span>
          </span>
        </p>
        <p style="height:25px;"></p>
      </div>
      </div>
    </div>
    <!-- 晋级奖励 -->
    <div v-else class="activityMian main">
      <div class="activiTop">
        <img
          width="100%"
          :src="item.img_url"
        >
        <div class="rewardStatus">
          <em class="e2">当前等级：
            <i>{{data.userLevelName}}</i>
          </em>
          <em class="e4">晋级奖励：
            <i>{{data.userLevelPromotionBonus}}</i>
          </em>
        </div>
        <div v-if="data.userLevelPromotionBonus>0" @click='getuserLevel()' class="recBtn">
          <a>点击领取</a>
        </div>
        <div v-else class="recBtn unClick">
          <a>不可领取</a>
        </div>
      </div>
      <div class="bgwhite">
        <span class="redrect"></span>
        <h3>等级机制</h3>
        <table>
            <tr>
            <th>等级</th>
            <th>头衔</th>
            <th>成长积分</th>
            <th>晋级奖励</th>
            </tr>
            <template v-for="(item, index) in lists" >
              <tr  :key="index">
              <td>VIP{{item.id}}</td>
              <td>{{item.level_name}}</td>
              <td>{{item.recharge_fee}}</td>
              <td>{{item.promotion_bonus}}</td>
              </tr>
            </template>
        </table>
      </div>
      <div class="bgwhite">
        <span class="redrect"></span>
        <h3>活动说明</h3>
      <div class="wrapExplain">
        <p style="font-family:'color:#666666; background-color:#FFFFFF; x:14px !important;">1、充值1元可获得1成长积分；
        </p>
        <p
          style="font-family:'color:#666666; background-color:#FFFFFF; x:14px !important;"
        >2、会员每晋升一个等级，都能获得对应奖励；</p>
        <p
          style="font-family:'color:#666666; background-color:#FFFFFF; x:14px !important;"
        >3、若会员跳级晋升，可获得晋升的各级奖励之和；</p>
        
        <p
          style="font-family:'color:#666666; background-color:#FFFFFF; x:14px !important;margin-top:10px;"
        >如：VIP1直接晋升到VIP5，可获得奖励为：1+5+10+58=78元；
        </p>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import Head from "../components/header";
export default {
  components: {
    Head
  },
  data() {
    return {
      data:{},
      lists:'',
      item:this.$route.params.item
    };
  },
  methods:{
      activityHot() {
        if(this.item.type==4){
          // 活动内容请求
          this.$api.activity().then(res => {
            this.data = res.data.data;
            console.log(res.data.data);
          });
        }else{
          // 晋级奖励请求
          this.$api.userLevelName().then(res => {
            this.data = res.data.data;
            console.log(res.data.data);
          });
      }
    },
    //领取加奖金额
    getamount(){
      this.$api.getamount().then(res => {
        console.log(res);
        if(res.data.result_code==0){
          this.showToast("text",'领取奖励成功')
          this.data.userBetBonus = 0
        }else{
          this.showToast("text",res.data.result_desc)
        }
      });
    },
    //领取晋级奖励
    getuserLevel(){
      this.$api.getuserLevel().then(res => {
        console.log(res);
        if(res.data.result_code==0){
          this.showToast("text",'领取奖励成功')
          this.data.userLevelPromotionBonus = 0
        }else{
          this.showToast("text",res.data.result_desc)
        }
      });
    },
    // 每日加奖比例表 晋级奖励列表
    ratelist(){
      if(this.item.type==4){
        this.$api.ratelist().then(res => {
          console.log(res);
          this.lists = res.data.data
        }); 
      }else{
         this.$api.userLevel().then(res => {
          console.log(res);
          this.lists = res.data.data
        }); 
      }
    },
  },
  mounted(){
      this.activityHot()
      this.ratelist()
  }
};
</script>

<style scoped lang='less'>
* {
  box-sizing: border-box;
}
dvi {
  display: block;
}
.bgwhite{
    background-color: white;
    margin: 10px 0;
    padding: 10px 0;
}
#activity {
  background-color: #F5F5F5;
}
.main{
    font-size: inherit;
    padding-top:51px;
}
.activiTop{
    background-color: #ffffff;
    padding-bottom: 2em;
}
.activiTop img{
    max-width: 100%
}.rewardStatus{
    margin: .5rem 30px;
}.activityMian em{
    display: block;
    font-style: inherit;
    margin-bottom: .2rem;
}.rewardStatus em{
    font-size: 13px;
}.activityMian em i{
    font-style: inherit;
    color: #ed0404;
}.recBtn{
    width: 345px;
    height: 35px;
    line-height: 35px;
    margin: 1em auto 0;
    border-color: #E54B55;
    background: #E54B55;
    text-align: center;
    color: #fff;
    border-radius: 5px;
    font-weight: 700;
    letter-spacing: .2em;
}.recBtn a{
    font-size: 14px;
    display: block;
}a {
    background: transparent;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
    color: inherit;
}.recBtn.unClick{
    color: #666;
    background: #e8e8e8!important;
    border-color: #e3e3e3;
}
.redrect{
    width: 2px;
    height: 13px;
    background-color: #E54B55;
    border-radius: 2px;
    border: 2px solid #E54B55;
    margin-left: 30px;
}
.main h3{
    display: inline-block;
    margin-bottom:10px;
    margin-left: 20px;
    border-radius: 2px;
}.activityMian table{
    border-collapse: collapse;
    border-spacing: 0;
    width: 345px;
    text-align: center;
    color: #666;
    font-size: 12px;
    margin: 0 auto;
    table-layout: fixed;
    background-color: #ffffff;
}.activityMian table th:first-child {
    min-width: 60px;
}.activityMian table th {
    height: 30px;
    border: 1px solid #e9e9e9;
    background: #F6ECED;
    font-weight: 300;
}.activityMian table td {
    height: 30px;
    border: 1px solid #e9e9e9;
    padding: 0;
}.wrapExplain {
    font-size: 13px;
    margin: 10px 30px;
    line-height: 1.6!important;
    overflow: hidden;
    margin-bottom: 50px;
}
.wrapExplain p{
    color:#333333; 
    background-color:#FFFFFF; 
}
</style>
