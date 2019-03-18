<template>
    <div class="betSelect">
      <div class="hint">
        <img src="../assets/img/web/提示.svg">
        <p>{{gameList.wanfa_dec}}<i class="redcolor">赔率：{{gameList.maxBili}}</i></p>
      </div>
      <div class="selectPlay" :status="length">
        <div class="playList" v-for="(item, first) in gameList.lists" :key="first">
          <span>{{item.name}}</span>
          <span
            v-for="(bili, second) in item.list"
            :key="second"
            @click="bet($event,gameList.lists.length,first)"
            :data-bili_id="bili.id"
            :data-wanfa_type="gameList.name"
            :data-bili_name="bili.bili_name"
            :data-index="first"
            ref="betPro"
          >{{bili.bili_name}}</span>
        </div>
      </div>
    </div>
</template>

<script>
import Bus from '../store/bus.js'
export default {
  props: ["gameList"],
  data() {
    return {
      // 添加投注数组
      betNo: [],
      // 投注数据数组
      betId:[],
      // 随机投注数组
      randomArr:[],
      length: 0,
      betStr:'',
      reset:0,
      // randomCount:[],
    };
  },
  watch: {
    gameList(data){
      this.$store.commit("betMsg",this.gameList)
      this.dataLength()
      this.betNo=[]
      this.betId=[]
      this.addArr()
    },
    reset(){
      this.dataLength()
      this.betNo=[]
      this.betId=[]
      this.addArr()
    },
    randomCount(data){
      this.betNo=[]
      this.betId=[]
      for(let i=0,len=this.gameList.lists.length;i<len;i++){
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
      for (let i = 0; i < betEle.length; i++) {
        if (i === random[0]) {
          var bet=betEle[i]
          bet.classList.add("betActive");
          let tens = Math.floor((random[0] / this.$store.state.leng))
          this.betNo[tens].push(bet.dataset.bili_name)
          this.betId[tens].push(bet.dataset.bili_id+"|")
          this.common.pk10bet(bet,this.betNo,this.betId)
        }
      }
    },
    // 投注
    bet(e) {
      let bet=e.currentTarget
      if(bet.className!='betActive'){
        this.betNo[bet.dataset.index].push(bet.dataset.bili_name)
        this.betId[bet.dataset.index].push(bet.dataset.bili_id+"|")
        bet.classList.add('betActive')
      }else{
        this.common.removeArr(this.betNo[bet.dataset.index],bet.dataset.bili_name)
        this.common.removeArr(this.betId[bet.dataset.index],bet.dataset.bili_id+"|")
        bet.classList.remove('betActive')
      }
      this.common.pk10bet(bet,this.betNo,this.betId)
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
      this.betNo=[],
      this.betId=[]
      this.randomArr=[],
      this.clearAll();
    });
    this.addArr()
    this.$store.commit("wanfa",this.gameList.name)
  },
};
</script>

<style lang="less" scoped>
.betSelect {
    height: 64%;
    .selectPlay {
      .playList {
        margin-top: 15px;
        margin-left: 16px;
        width: 60%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span:nth-child(1) {
          display: inline-block;
          width: 33px;
          height: 20px;
          border-radius: 2px;
          color: #666;
          font-size: 10px;
          background-color: #f5f5f5;
          text-align: center;
          line-height: 20px;
          margin-right: 15px;
        }
        span:nth-child(n + 2) {
          text-align: center;
          line-height: 30px;
          display: inline-block;
          font-size: 14px;
          width: 30px;
          height: 30px;
          color: #e54b55;
          border-radius: 50%;
          border: 1px solid #ddd;
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
