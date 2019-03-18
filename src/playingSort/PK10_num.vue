<template>
  <div class="betMsg">
    <div class="betSelect">
      <div class="hint">
        <img src="../assets/img/web/提示.svg" alt>
        <p>{{gameList.wanfa_dec || gameList.lists[0].wanfa_dec}}<i class="redcolor">赔率：{{gameList.maxBili || gameList.wanfa_odds}}</i></p>
      </div>
      <div class="selectPlay" :status="length">
        <div class="playList" v-for="(item, first) in gameList.lists" :key="first">
            <span>{{item.name}}</span>
            <div v-if="item.list[0].bili_name">
                <div v-for="(bili, second) in item.list" :key="second" @click="bet($event)" ref="betPro"
                    :data-bili_id="bili.id"
                    :data-wanfa_type="gameList.name"
                    :data-bili_name="bili.bili_name"
                    :data-min_select="gameList.min_select"
                    :data-index="first">
                    <span>{{bili.bili_name}}</span>
                    <p class="bili">赔率{{bili.bili}}</p>
                </div>
            </div>
            <div v-else>
                <div v-for="(bili, second) in item.list" :key="second" @click="bet($event)" ref="betPro"
                    :data-wanfa_id="gameList.wanfa_id"
                    :data-wanfa_type="gameList.name"
                    :data-numbers="bili.wanfa_name"
                    :data-min_select="gameList.min_select"
                    :data-index="first">
                    <span>{{bili.wanfa_name}}</span>
                    <p class="bili">赔率{{bili.odd}}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from "../store/bus.js";

export default {
  props: ["gameList","firstMenu"],
  data() {
    return {
      // 添加投注数组
      betNo: [],
      // 投注数据数组
      betId:[],
      length: 0,
      betStr:'',
      betMsg:{},
      betNumArr:[],
      leng:0,
      // 确定投注后重置数组状态
      reset:0
    };
  },
  watch: {
    gameList(data){
      this.$store.commit("betMsg",this.gameList)
      this.betNo=[]
      this.betId=[]
      this.dataLength()
      if(data.lists.length>0){
        this.addArr()
      }else{
        let nameArr=[]
        let idArr=[]
        this.betNo.push(nameArr)
        this.betId.push(idArr)
      }
    },
    reset(){
      this.betNo=[]
      this.betId=[]
      this.dataLength()
      if(this.gameList.lists.length>0){
        this.addArr()
      }else{
        let nameArr=[]
        let idArr=[]
        this.betNo.push(nameArr)
        this.betId.push(idArr)
      }
    },
    randomCount(data){
      this.betNo=[]
      this.betId=[]
      this.betNumArr=[]
      this.dataLength()
      if(this.gameList.lists.length>0){
        for(let i=0,len=this.gameList.lists.length;i<len;i++){
          let nameArr=[]
          let idArr=[]
          this.betNo.push(nameArr)
          this.betId.push(idArr)
        }
      }else{
        let nameArr=[]
        let idArr=[]
        this.betNo.push(nameArr)
        this.betId.push(idArr)
      }
      this.random(data)
    }
  },
  computed: {
    randomCount(){
      return this.$store.state.random
    }
  },
  methods: {
    // 机选
    random(random) {
      let betEle = this.$refs.betPro;
      if(this.$store.state.wanfa=="二星直选" || this.$store.state.wanfa=="三星玩法" || this.$store.state.wanfa=="四星玩法" || this.$store.state.wanfa=="五星玩法" || this.$store.state.wanfa=="猜豹子" || this.$store.state.wanfa=="龙虎和" || this.$store.state.wanfa=="定位胆"){
        for (let i = 0; i < betEle.length; i++) {
          for(let j=0;j<random.length;j++){
            if (i === j*this.$store.state.leng+random[j]) {
              let bet=betEle[j*this.$store.state.leng+random[j]]
              bet.classList.add("betActive");
              this.betNo[j].push(bet.dataset.numbers)
              this.common.fucaiBet(bet,this.betNo,this.$store.state.wanfa)
            }
          }
        }
      }else if(this.$store.state.wanfa=="不定胆"){
        for(let i=0;i<random.length;i++){
          let bet=betEle[random[i]]
          this.common.budingBet(bet,this.betNumArr,this.betMsg,bet.dataset.min_select,this.$store.state.gameType.type)
        }
      }else{
        for (let i = 0; i < betEle.length; i++) {
          for(let j=0;j<random.length;j++){
            if (i === j*this.$store.state.leng+random[j]) {
              let bet=betEle[j*this.$store.state.leng+random[j]]
              let tens=Math.floor(random[j]/this.$store.state.leng)
              bet.classList.add("betActive");
              this.betNo[tens].push(bet.dataset.bili_name)
              this.betId[tens].push(bet.dataset.bili_id+"|")
              this.common.pk10bet(bet,this.betNo,this.betId)
            }
          }
        }
      }
    },
    // 投注
    bet(e) {
      let bet=e.currentTarget
      if(this.$store.state.wanfa=="不定胆"){
        this.common.budingBet(bet,this.betNumArr,this.betMsg,bet.dataset.min_select,this.$store.state.gameType.type)
      }else if(this.$store.state.wanfa=="二星直选" || this.$store.state.wanfa=="三星玩法" || this.$store.state.wanfa=="四星玩法" || this.$store.state.wanfa=="五星玩法" || this.$store.state.wanfa=="猜豹子" || this.$store.state.wanfa=="龙虎和" || this.$store.state.wanfa=="定位胆"){
        if(bet.className!='betActive'){
          bet.classList.add('betActive')
          this.betNo[bet.dataset.index].push(bet.dataset.numbers)
        }else{
          this.common.removeArr(this.betNo[bet.dataset.index],bet.dataset.numbers)
          bet.classList.remove('betActive')
        }
        this.common.fucaiBet(bet,this.betNo,this.$store.state.wanfa)
      }else{
        if(bet.className!='betActive'){
          this.betNo[bet.dataset.index].push(bet.dataset.bili_name)
          this.betId[bet.dataset.index].push(bet.dataset.bili_id+"|")
          bet.classList.add('betActive')        
        }else{
          this.common.removeArr(this.betNo[bet.dataset.index],bet.dataset.bili_name)
          this.common.removeArr(this.betId[bet.dataset.index],bet.dataset.bili_id+"|")
          bet.classList.remove('betActive')
        }
        this.common.pk10bet(bet,this.betNo,this.betId,this.$store.state.gameType.game_type)
      }
    },
    dataLength() {
      this.length=0
      for(var i=0,len=this.gameList.lists.length;i<len;i++){
        for(var j=0,leng=this.gameList.lists[i].list.length;j<leng;j++){
          this.length++
        }
      }
      this.leng=j
      this.$store.commit("numLength", this.length);
      this.$store.commit("leng", this.leng);
    },
    // 清空投注
    clearAll() {
      let bet = this.$refs.betPro;
      for (let i = 0; i < this.$refs.betPro.length; i++) {
        bet[i].classList.remove("betActive");
      }
    },
    // 按位数进行对应数组添加
    addArr(){
      for(let i=0,len=this.gameList.lists.length;i<len;i++){
        let nameArr=[]
        let idArr=[]
        this.betNo.push(nameArr)
        this.betId.push(idArr)
      }
    }
  },
  mounted() {
    this.$store.commit("betMsg",this.gameList)
    this.dataLength();
    Bus.$on("clearBet", (count) => {
      this.reset=count
      this.addArr()
      this.betNumArr=[]
      this.betId=[],
      this.betNo=[]
      this.clearAll();
    });
    if(this.gameList.lists.length>0){
      this.addArr()
    }else{
      let nameArr=[]
      let idArr=[]
      this.betNo.push(nameArr)
      this.betId.push(idArr)
    }
    if(this.firstMenu){
      this.$store.commit('wanfa',this.firstMenu.name)
    }else{
      this.$store.commit("wanfa",this.gameList.name)
    }
  },
};
</script>

<style scoped lang="less">
.betMsg {
  .betSelect {
    .selectPlay {
      padding: 0 10px;
      .playList {
        box-sizing: border-box;
        width: 100%;
        display: flex;
        &>span {
          display: inline-block;
          width: 60px;
          height: 20px;
          border-radius: 2px;
          color: #666;
          font-size: 10px;
          background-color: #f5f5f5;
          text-align: center;
          line-height: 20px;
          margin: 10px 5px 0 0;
        }
        &>div{
            display: flex;
            flex-wrap: wrap;
            color: #e54b55;
            div {
                text-align: center;
                font-size: 12px;
                width: 56px;
                height: 30px;
                margin: 5px;
                line-height: 15px;
                border-radius: 3px;
                border: 1px solid #ddd;
                p{
                    font-size: 8px;
                    color: #888;
                }
            }
        }
      }
    }
  }
}

.redcolor{
  color: #EE4549 !important;
  font-style: normal;
  margin-left: 5px;
}
</style>
