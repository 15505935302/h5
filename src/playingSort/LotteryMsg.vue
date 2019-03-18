<template>
  <!-- <div class="playContent"> -->
  <div class="bet">
    <div class="menuSwitch">
      <div class="menuBtn">
        <a class="active" @click="weBet($event)">我要投注</a>
        <a @click="recentBet($event)">最近投注</a>
      </div>
      <i class="line" ref="line"></i>
    </div>
    <div class="balance">
      余额：
      <span @click.stop="show=!show">
        <template v-if="show">
          <span class="ponit">￥{{this.$store.state.user.point}}</span>
        </template>
        <template v-else>
          <span class="hide">
            <i class="iconfont">&#xe60c;</i>
          </span>
        </template>
      </span>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  data() {
    return {
      playing: [],
      show: false
    };
  },
  methods: {
    // 投注和查看投注
    weBet(e) {
      let dom = e.currentTarget;
      dom.parentNode.lastChild.classList.remove("active");
      e.currentTarget.classList.add("active");
      this.$refs.line.classList.remove("line_animation");
      this.$store.commit("footbet", true);
      this.betShow = false;
      this.$emit("betMsg", false);
    },
    recentBet(e) {
      let dom = e.currentTarget;
      dom.parentNode.firstChild.classList.remove("active");
      e.currentTarget.classList.add("active");
      this.$refs.line.classList.add("line_animation");
      this.betShow = true;
      this.$store.commit("footbet", false);
      this.$emit("betMsg", true);
    }
  }
};
</script>

<style lang="less" scoped>
.active {
  color: #e54b55 !important;
}
.line_animation {
  left: 93px !important;
}
.bet {
  display: flex;
  justify-content: space-between;
  padding: 0 14px;
  line-height: 42px;
  color: #888;
  background-color: #fff;
  width: 100%;
  position: relative;
  z-index: 95;
  box-sizing: border-box;
  .menuSwitch {
    width: 36%;
    position: relative;
    .menuBtn {
      display: flex;
      justify-content: space-between;
      a {
        color: #888;
        font-size: 14px;
      }
    }
    .line {
      display: inline-block;
      width: 25px;
      height: 2px;
      background-color: #e54b55;
      position: absolute;
      bottom: 0;
      left: 16px;
      border-radius: 1px;
      transition: all 300ms;
    }
  }
}
.balance {
  box-sizing: border-box;
  height: 42px;
  .ponit {
    color: #e54b55;
    font-size: 12px;
  }
  .hide {
    .iconfont {
      font-size: 12px !important;
    }
  }
}
</style>
