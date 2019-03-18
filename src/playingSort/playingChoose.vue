<template>
  <div class="menu">
    <div class="playingSelect">
      <div
        @click.stop.self="playing_method($event,item,index)"
        v-for="(item, index) in gameList"
        :key="index"
        :class="{active:index==$store.state.wanfaName}"
        class="playing"
      >{{item.name}}</div>
    </div>
    <div class="chooseson" v-if="name.indexOf(gameList[this.$store.state.wanfaName].name) !=-1">
      <div class="wanfaName">{{gameList[this.$store.state.wanfaName].name}}</div>
      <div class="plays">
        <div
          v-for="(item, index) in gameList[this.$store.state.wanfaName].lists || gameList[this.$store.state.wanfaName].list"
          @click.stop="play($event,index,item)"
          :class="{active:index==$store.state.wanfachild}"
          class="playing"
          :key="index"
        >{{item.name || item.wanfa_name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from "../store/bus.js";
export default {
  props: ["gameList"],
  inject:["reload"],
  data() {
    return {
      item: "",
      name:[
        "任选",
        "不定胆",
        "大小单双",
        "正码特",
        "一肖",
        "连码",
        "生肖连",
        "尾数连",
        "二星直选",
        "三星玩法",
        "四星玩法",
        "五星玩法",
        "猜豹子",
        "龙虎和",
        "前一",
        "前二",
        "前三",
        "合肖",
        "全不中",
      ]
    };
  },
  methods: {
    playing_method(e, item, index) {
      console.log(item)
      document.body.style.overflow = "scroll";
      this.$store.commit("wanfaName", index);
      this.$store.commit("wanfa",item.name)
      this.$store.commit('wanfachild',0)
      if (this.name.indexOf(item.name) !=-1) {
        if(this.$store.state.gameType.id==1){
          if(index==7||index==10){
            var name=item.list[0].wanfa_name
          }else{
            var name=item.lists[0].wanfa_name
          }
          this.$store.commit("childWanfa",name)
        }else{
          this.$store.commit("childWanfa",item.lists[0].name)
        }
      }else{
        this.$store.commit("playingShow", false);
        this.$store.commit("childWanfa","")
        this.reload()
      }
      Bus.$emit("clearBet");
    },
    play(e,index,item){
      let name
      if(item.name){
        name=item.name
      }else{
        name=item.wanfa_name
      }
      this.$store.commit('childWanfa',name)
      this.$store.commit("playingShow",false)
      this.$store.commit('wanfachild',index)
      this.reload()
    }
  },
};
</script>

<style scoped lang="less">
.menu {
  position: fixed;
  top: 46px;
  z-index: 102;
  height: auto;
  width: 100%;
  .playingSelect {
    box-sizing: border-box;
    background-color: #fff;
    width: 100%;
    padding: 10px;
    .playing {
      text-align: center;
      min-width: 50px;
      margin: 0 2%;
      margin-top: 5px;
      width: 20%;
      padding: 2px 0;
      border: 1px solid #ddd;
      border-radius: 2px;
      display: inline-block;
      a {
        color: #333;
      }
    }
    .active {
      color: #fff;
      background: #e54b55;
    }
  }
  .second {
    bottom: 0;
    background-color: #f5f5f5;
  }
  .chooseson {
    width: 100%;
    border-top: 1px solid #e54b55;
    display: inline-block;
    background: #f5f5f5;
    display: flex;
    .wanfaName {
      width: 15%;
      flex-wrap: 1;
      margin: 0 10px;
      text-align: center;
      padding: 10px;
    }
    .plays {
      width: 100%;
      display: block;
      padding-bottom: 10px;
      flex-wrap: 4;
      .active {
        color: #fff;
        background: #e54b55;
      }
      .playing {
        display: inline-block;
        border: 1px solid #ddd;
        text-align: center;
        margin: 0 2%;
        margin-top: 10px;
        width: 25%;
        padding: 2px 0;
      }
    }
  }
}
</style>
