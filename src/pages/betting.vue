<template>
  <div id="found">
    <oneHead class="head_">
        <ButtonTab>
          <ButtonTabItem selected @on-item-click="newWin_request"  :class="{writhcolor:newWinShow==false}">
            <span>投注</span>
          </ButtonTabItem>
          <ButtonTabItem @on-item-click="yesterWin_request"  :class="{redback:newWinShow==false}">
            <span>追号</span>
          </ButtonTabItem>
        </ButtonTab>
      <label slot="right" @click="choose = !choose">筛选</label>
    </oneHead>
    <div class="alllott" v-show="choose">
        <ul @click="timer($event)">
          <li :class="{active:time==0}" data-id = 0>今天</li>
          <li :class="{active:time==1}" data-id = 1>昨天</li>
          <li :class="{active:time==7}" data-id = 7>七天</li>
        </ul>
        <ul>
          <li data-id = 0 :class="{active:lott==0}"  @click="color($event,0)" >全部彩种</li>
          <li v-for="(item, index) in this.$store.state.lottery" @click="color($event,item.game_type)" :key="index" :class="{active:lott==index+1}"  :data-id = index+1>
            {{item.name}}
          </li>
        </ul>
        <button v-if="newWinShow" @click="allbet">确定</button>
        <button v-else  @click="chasing">确定</button>
        
    </div>
    <div class="betting">
      <!-- 投注记录 -->
      <ul v-show="newWinShow">
          <div class="betLi">
            <ul @click="statusType($event)">
              <li :class="{active:col==0}" data-id=0>全部</li>
              <li :class="{active:col==1}" data-id=1>待开奖</li>
              <li :class="{active:col==2}" data-id=2>中奖</li>
              <li :class="{active:col==3}" data-id=3>未中奖</li>
            </ul>
          </div>
          <div class="betList">
            <ul>
              <li v-for="(item,index) in data" @click="betdetaliy(item)" :key="index">
                <div>
                  <p>{{item.base_wan_fa_name}}<span style="color: #888">￥{{item.money}}</span></p>
                  <p>{{item.create_time}}</p>
                </div>
                <span class="spanRight" :class="{gray:item.status==0,black:item.status==2,red:item.status==1}">
                  <template v-if="item.status==1">
                    ￥{{item.bonus}}
                  </template>
                  <template v-else>
                    {{item.result_status}}                    
                  </template>
                </span>
              </li>
            </ul>
            <div v-if="pagemore" @click="seemore()" class="fullPageMsg">
              <p>点击查看更多</p>
            </div>
            <div v-else class="fullPageMsg">
              <p>没有更多了</p>
            </div>
          </div>
      </ul>
      <!-- 追号记录 -->
      <ul v-show="yesterdayWinShow">
        <div class="betLi">
          <ul @click="statusType($event)">
              <li :class="{active:col==0}" data-id=0>全部</li>
              <li :class="{active:col==1}" data-id=1>未开始</li>
              <li :class="{active:col==2}" data-id=2>进行中</li>
              <li :class="{active:col==3}" data-id=3>已结束</li>
            </ul>
        </div>
        <div class="betList">
          <ul>
            <li v-for="(item, index) in data" :key="index"  @click="betdetaliy(item)">
              <div>
                <p>{{item.lottery_name}}<span style="color: #888">￥{{item.total_bet_money}}</span></p>
                <p>{{item.create_time}}</p>
              </div>
              <span class="spanRight" :class="{red:item.status==3 && item.total_win_money>0,gray:item.status==1 || item.status==2,black:item.status==3}">
                <template v-if="item.total_win_money>0">
                  ￥{{item.total_win_money.toFixed(2)}}
                </template>
                <template v-else-if="item.status==1">
                  未开始
                </template>
                <template v-else-if="item.status==2">
                  进行中
                </template>
                <template v-else>
                  已结束
                </template>
              </span>
            </li>
          </ul>
          <div v-if="pagemore" @click="seemore()" class="fullPageMsg">
            <p>点击查看更多</p>
          </div>
          <div v-else class="fullPageMsg">
            <p>没有更多了</p>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
  import oneHead from "../components/one_head.vue"
  import { ButtonTab, ButtonTabItem } from 'vux'
  export default {
    components:{
      oneHead,
      ButtonTab,
      ButtonTabItem,
    },
    data(){
      return {
        newWinShow:true,
        yesterdayWinShow:false,
        num: 1,
        col:0,
        data:'',
        chas:'',
        choose:false,
        time:"",
        lott:0,
        endtime:"",
        gametype:0,
        pagemore:true,
        page:1,
      }
    },
    methods:{
      filt(data){
          let img = {
              "江苏快三":7,
              "北京快三":7,
              "安徽快三":7,
              "新加坡28":4,
              "北京28":4,
              "加拿大28":4,
              "重庆时时彩":1,
              "天津时时彩":1,
              "东京1.5分彩":14,
              "分分彩":18,
              "北京赛车":15,
              "幸运飞艇":16,
              "11选5":8,
              "六合彩":6,
              "排列3":9,
              "排列5":17,
              "福彩3D":2,
          }
          return img[data]
      },
      seemore(){
        this.page++
        if(this.newWinShow==true){
          this.allbet()
        }else{
          this.chasing()
        }
      },
      // 日期切换
      timer(e){
        if(e.target!=e.currentTarget){
          this.endtime=''
          this.time = e.target.dataset.id
          if(e.target.dataset.id==1){
            this.endtime = this.GetDateStr(e.target.dataset.id)
           }
        }
      },
      
      // 彩种
      color(e,id){
          this.lott = e.target.dataset.id
          this.gametype = id
          console.log(this.$store.state.lottery)
      },
      // 状态切换
      statusType(e){
        if(e.target!=e.currentTarget){
          this.col = e.target.dataset.id
          // 投注记录
          if(this.newWinShow==true){
            this.page = 1
            this.allbet()
          // 追号记录
          }else{
            this.page = 1
            this.chasing()
          }
        }
      },
      // 投注记录
      newWin_request(){
        this.yesterdayWinShow=false
        this.newWinShow=true
        this.col = 0
        this.allbet()
      },
       // 追号记录
      yesterWin_request(){
        this.yesterdayWinShow=true
        this.newWinShow=false
        this.chasing()
      },
      // 投注详情
      betdetaliy(item){
        if(item.lottery_name){
          item.imgid = this.filt(item.lottery_name)
        }
        let objarr = {
          "newWinShow":this.newWinShow,
          "page_no":1,
          "page_size":this.page,
          "game_type":this.gametype,
          "status_type":this.col,
          "time":this.time,
          "end_time":this.endtime,
        }
        this.$store.commit("betobjarr",objarr)
        this.$store.commit("betobjdata",this.data)
         this.$router.push({
          name: 'SingleDetails',
          params: {
            data: item
          }
        })
      },
      // 投注详情
      berobjarr(){
        let obj = this.$store.state.betobjarr
        if(this.$store.state.betobjdata.length){
          this.data = this.$store.state.betobjdata
          this.newWinShow = obj.newWinShow
          this.yesterdayWinShow = !obj.newWinShow
          this.gametype = obj.game_type
          this.col = obj.status_type
          this.page = obj.page_size
          this.time = obj.time
          this.endtime = obj.end_time
        }else{
          this.allbet()
        }
        this.$store.commit("betobjarr","")
        this.$store.commit("betobjdata","")
      },
      // 投注记录
      allbet(){
        this.pagemore =true
        this.$vux.loading.show({
          text: 'Loading'
        })
        this.choose = false
        let objarr = {
          "page_no":1,
          "page_size":this.page*20,
          "game_type":this.gametype,
          "status_type":this.col,
          "start_time":this.GetDateStr(this.time),
          "end_time":this.endtime,
        }
        this.$api.allBet(objarr).then(res=>{
          this.$vux.loading.hide({
            text: 'Loading'
          })
          if(res.data.result_code==0){
            this.data = res.data.data
            console.log(this.data)
            if(this.data.length<this.page*20){
              this.pagemore = false
            }
          }else{
            this.confirm({
              title: '提示',
              content: "查看失败，请稍后再试",
              confirmText: '确定',
              cancelText: '取消',
              showCancelButton:false,
            })
          }
        })
      },
      // 追号记录
      chasing(){
        this.pagemore =true
        this.choose = false
        let objarr = {
          "page_no":1,
          "page_size":this.page*20,
          "game_type":this.gametype,
          "status_type":this.col,
          "start_time":this.GetDateStr(this.time),
          "end_time":this.endtime,
        }
        console.log(objarr)
        this.$api.chasing(objarr).then(res=>{
          this.data = res.data.data.data
          if(this.data.length<this.page*20){
              this.pagemore = false
          }
          console.log(this.data)
        })
      },
      // 日期
      GetDateStr(AddDayCount) { 
        var dd = new Date(); 
        dd.setDate(dd.getDate()-AddDayCount);//获取AddDayCount天前的日期 
        var y = dd.getFullYear(); 
        var m = dd.getMonth()+1;//获取当前月份的日期 
        if(m == 0){
          y = y-1
          m = 12
        } else if(m==-1){
          y = y-1
          m = 11
        }
        var d = dd.getDate(); 
        return y+"-"+m+"-"+d;
      },
    },
    mounted(){
      this.berobjarr()
    }
  }
</script>

<style scoped>
.gray{
  color:#888;
}
.black{
  color: #333;
}
.red{
  color: #E54B55;
}
  .head_ span{
    width: 70px;
    display: inline-block;
    font-size: 12px;
  }
  .head_ label{
    display: inline-block;
    font-size: 12px;
  }
  .betLi{width: 100%;height: 40px;border-bottom: 1px solid #DDDDDD;background-color: #fff}
  .betLi ul{width: 85%;margin: 0 auto;background-color: #fff}
  .betLi ul li{width: 25%;height: 40px;float: left;list-style: none;line-height: 40px;text-align: center;}
  .betLi ul li {color: #888;font-size: 14px;height: 40px;display: inline-block;font-family: PingFangSC-Regular}
  .betLi ul .active{color: #E54B55;border-bottom: 1px solid #E54B55;box-sizing: border-box}
  .betList{height: calc(100vh - 92px);overflow-y:scroll }
  .betList li{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 15px;
    color: #333;
    border-bottom: 1px solid #ddd;
    background-color: #fff;
  }
  .betList li p:first-child{font-size: 15px;color: #333;}
  .betList li p:first-child span{font-size: 12px;}
  .betList li p span{padding-left: 20px;}
  .betList li p:last-child{font-size: 12px;color: #888;}
  .betList li span.spanRight{font-size: 14px;}
  .fullPageMsg{text-align: center;padding: 20px;font-size: 14px;color: #888;}
  .alllott{
    position:absolute;
    top: 50px;
    width: 100%;
    background: #fff;
  }.alllott ul{
    background: #fff;
    display: block;
    margin: 0px 10px;
    padding: 5px 0
  }.alllott ul:nth-of-type(1){
    border-bottom: 1px solid #ddd;
  }
  .alllott ul li{
    border: 1px solid #ddd;
    height: 25px;
    font-size: 12px;
    text-align: center;
    width: 80px;
    display: inline-block;
    list-style: none;
    line-height: 25px;
    margin: 5px 5px;
  }
  .alllott ul .active{
      background: #E54B55 !important;
      color: #fff;
  }.alllott button{
      background: #E54B55 !important;
      color: #fff;
      width: 100px;
      height: 30px;
      margin: 10px auto;
      box-sizing: border-box;
      border: none;
      margin-bottom: 20px;
      display: block;
      font-size: 12px;
  }
  .red{
    color: #E54B55;
  }
  .green{
    color: #5BB960;
  }
.writhcolor{
  color: #fff !important;
  background: #E54B55 !important;
}
.redback{
  color: #E54B55 !important;
  background: #fff !important;
}
</style>

