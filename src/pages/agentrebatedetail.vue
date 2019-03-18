<template>
  <div id="voucher">
    <Head>
      <span slot="pageName">返佣明细</span>
    </Head>
    <div class="main child-view">
      <div class="rb-top">
        <div class="date">
          <input type="date" v-model="startTime" placeholder="输入开始日期" @oninput="recordlist" @blur="recordlist">
          <span>一</span>
          <input placeholder="输入开始日期" v-model="endTime" type="date" @oninput="recordlist" @blur="recordlist">
        </div>
        <div class="detail">
          <p>日期区间返佣收益 (元)</p>
          <span>0.00</span>
        </div>
      </div>
      <template>
        <div class="reclist">
          <ul>
            <li v-for="(item, index) in data" :key="index">
              <span>{{item.create_day}}</span>
              <p>￥{{item.share_profit_money}}</p>
            </li>
          </ul>
        </div>
      </template>
      <div class="rb-list">
        <div  v-if="pagemore" @click="seemore()" class="tip">点击查看更多</div>
        <div v-else class="tip">没有更多了</div>
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
      data:'',
      startTime:'',
      endTime:'',
      pagemore:false,
      page:1,
    };
  },
  methods: {
    // 点击查看更多
    seemore(){
      this.page++
      this.recordlist()
    },
    recordlist(){
      this.pagemore = true
      let obj = {
        "page":1,
        "pageSize":this.page*10,
        "startTime":this.startTime,
        "endTime":this.endTime,
      }
      this.$api.recordlist(obj).then(res=>{
        console.log(res)
        this.data = res.data.data
        if(this.data.length<this.page*20){
          this.pagemore = false
        }
      })
    }
  },
  mounted() {
    this.recordlist()
  }
};
</script>

<style scoped lang="less">
* {
  box-sizing: border-box;
}
.child-view {
    position: absolute;
    width: 100%;
    transition: all .2s cubic-bezier(.55,0,.1,1);
}.main {
    font-size: inherit;
    padding-top: 50px;

}.rb-top{
  height: 125px;
    background: linear-gradient(0deg,#B53840,#E54B55);
  width: 100%;
  padding: 20px 20px;
}
.date{
  margin:0 5%;
  width: 90%;
  text-align: center; 
}.rb-top .date input{
    font-size: 12px;
    height: 30px;
    border: none;
    border-radius: .3em;
    text-align: center; 
    width: 42.5%;
    position: relative;
}.rb-top .date span {
    width: 10%;
    display: inline-block;
    color: #fff;
}.detail{
  margin: 20px auto;
  width: 200px;
  font-size: 14px;
  text-align: center;
  color: #fff;
}.rb-list{
  text-align: center;
  margin-top: 10px;
  color: #888888;
  font-size: 13px;
}.reclist{
  background: #fff;
  li{
    height: 35px;
    border-bottom: 1px solid #ddd;
    padding: 0 10px;
    line-height: 35px;
    font-size: 14px;
    span{
      float: left;
      color: #333;
    }
    p{
      float: right;
      color: #E54B55;
    }
  }
}
</style>
