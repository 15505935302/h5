<template>
  <div>
    <div class="betList">
      <div>
        <img :src="common.img(dragonMsg.game_type)" alt>
        <span>{{dragonMsg.game_name}}</span>
      </div>
      <div>
        <span>
          <p>{{dragonMsg.game_num}} 期</p>
        </span>
        <i v-if="timeDown<=0" class="timefont">正在开奖中</i>
        <i v-else class="timefont">{{timeDown | timechoose}}</i>
        <span>
          <p>{{dragonMsg.posiname}}</p>
          <p :class="[dragonMsg.type=='大' || dragonMsg.type=='小'?'bluebac':'yellbac',]">{{dragonMsg.type}}</p>
          <p>{{dragonMsg.times}}期</p>
        </span>
      </div>
      <div>
        <span
          v-for="(bili, index) in dragonMsg.bili_list"
          @click="betting($event,bili,dragonMsg)"
          :key="index"
        >
          <p>{{bili.bili_name}}</p>
          <p>赔{{bili.bili}}</p>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["dragonMsg"],
  data() {
    return {
      betdetails: "",
      betcontent: "",
      timeDown:0,
        //   倒计时
        time:null,
    };
  },
  watch:{
      dragonMsg(data){
        this.timeDown=data.seconds
      }
  },
  methods: {
    betting(e, bili, item) {
      if (document.querySelectorAll(".redbac").length != 0) {
        document.querySelectorAll(".redbac")[0].classList.remove("redbac");
      }
      e.currentTarget.classList.add("redbac");
      this.betdetails = bili;
      this.betcontent = item;
      this.$store.commit("betdetails", this.betdetails);
      this.$store.commit("betcontent", this.betcontent);
    },
    timedes() {
      if(this.timeDown>0){
        this.timeDown--
      }else{
        this.timeDown=0
        this.$store.commit("openResult",true)     
      }
      this.time=setTimeout(()=>{
        this.timedes()
      },1000)
      this.$once('hook:beforeDestroy', () => {
          clearTimeout(this.time);
      })
    }
  },
  created(){
      this.timeDown=this.dragonMsg.seconds
  },
  mounted() {
    this.timedes();
  },
  filters: {
    timechoose(data) {
      if (data <= 0) {
        return 0;
      } else {
        let min = Math.floor(data / 60);
        let sec = data % 60;
        if (min < 10) {
          min = "0" + min;
        }
        if (sec < 10) {
          sec = "0" + sec;
        }
        return min + ":" + sec;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.right {
  text-align: center;
}
.betList{
  background: #fff;
  height: 70px;
  margin-bottom: 10px;
  padding: 0 10px;
  padding-top: 10px;
  div:nth-of-type(1) {
    float: left;
    width: 70px;
    img {
      width: 33px;
      height: 33px;
      padding: 0px 10px 0px 8px;
      margin: 0 8px;
    }
    span {
      display: block;
      text-align: center;
      color: #333;
      font-size: 10px;
    }
  }
  div:nth-of-type(2) {
    float: left;
    margin: 0 10px;
    span {
      display: block;
      font-size: 14px;
      color: #333;
    }
    span:nth-of-type(2) {
      p {
        float: left;
        margin-top: 5px;
      }
      p:nth-of-type(1) {
        background: #bebebe;
        color: #fff;
        padding: 0 3px;
        border-radius: 3px;
        font-size: 10px;
      }
      p:nth-of-type(2) {
        color: #fff;
        margin: 0 5px;
        margin-top: 5px;
        padding: 0 3px;
        border-radius: 3px;
        font-size: 10px;
      }
      p:nth-of-type(3) {
        background: #fe504f;
        color: #fff;
        padding: 0 3px;
        border-radius: 3px;
        font-size: 10px;
      }
    }
  }
  div:nth-of-type(3) {
    float: right;
    span {
      float: left;
      text-align: center;
      width: 55px;
      height: 50px;
      border: 1px solid #dddddd;
      margin: 0 5px;
      border-radius: 3px;
      p:nth-of-type(1) {
        font-size: 15px;
        color: #fe504f;
        line-height: 29px;
      }
      p:nth-of-type(2) {
        font-size: 10px;
        color: #888888;
      }
    }
  }
}

.bluebac {
  background: #5d75fe;
}
.yellbac {
  background: #ffc730;
}
.redbac {
  background: #fe504f;
  p {
    color: #fff !important;
  }
}
.playContent .bet {
  position: relative;
}
.texeleft {
  text-align: left;
}
.weui-dialog__bd img {
  width: 10px;
  height: 10px;
}
i {
  font-style: normal;
}
.timefont {
  color: #fe504f;
}
</style>

