<template>
  <div class="lottery_category">
    <section class="lottery_head">
      <div>
        <slot name="lottery_name"></slot>
        <slot name="more_lottery"></slot>
      </div>
    </section>
    <div>
      <div
        class="cate"
        v-for="(item ,i) in category"
        :key="i"
        @click="ther(item.name,item.status,item)"
      >
        <div>
          <template v-if="item.status==2">
            <div class="stop">停</div>
          </template>
          <img :src="common.img(item.game_type)" alt>
        </div>
        <p>{{item.name}}</p>
        <span>{{item.remarks}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["category"],
  methods: {
    // 点击切换彩种判断
    ther(name, status, item) {
      let _this = this;
      if (this.$store.state.betStr.length > 0 && this.$store.state.gameType.name!=name) {
        this.confirm({
          title: "提示",
          content: this.$store.state.gameType.name + "选择的号码将会清空",
          onConfirm() {
            _this.$store.commit("clearCount");
            _this.skip(name, status, item)
          }
        });
      }else{
        _this.skip(name, status, item)
      }
    },
    // 彩种跳转事件
    skip(name, status, item) {
      let _this = this;
      if (status == 2) {
        this.alert({
          title: "提示",
          content: "该游戏已停售",
          buttonText: "确定"
        });
      } else {
        let access_token = JSON.parse(localStorage.getItem("access_token"));
        if (access_token) {
          if (new Date().getTime() - access_token.time < 86395000) {
            _this.$store.commit("gameType", item);
            _this.$router.push({
              name: name
            });
          } else {
            localStorage.removeItem('access_token'); // 删除access_token
            // token过期
            _this.confirm({
              title: "提示",
              content: "太长时间没登录请重新登录",
              onConfirm() {
                _this.$router.push({
                  path: "/login"
                });
              }
            });
          }
        } else {
          _this.confirm({
            title: "提示",
            content: "请先登录才能查看更多",
            onConfirm() {
              _this.$router.push({
                path: "/login"
              });
            }
          });
        }
      }
    }
  }
};
</script>

<style >
.lottery_head {
  padding: 10px 0 10px 15px;
  font-size: 15px;
}
.lottery_head > div {
  width: 100%;
  box-sizing: border-box;
  padding: 0 10px 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  position: relative;
}
.lottery_head span {
  text-indent: 25px;
}
.lottery_head span::before {
  content: "";
  position: absolute;
  background-color: #e54b55;
  border-radius: 2px;
  width: 4px;
  height: 15px;
  margin-top: 5px;
  left: 0px;
}
.lottery_head a {
  color: #3c97eb;
}
.lottery_category {
  background-color: #fff;
  padding-bottom: 10px;
}
.lottery_category > div {
  display: flex;
  flex-wrap: wrap;
}
.cate {
  width: 33%;
  color: #333;
  font-size: 12px;
  text-align: center;
}
.cate > div {
  position: relative;
  margin: 10px auto 5px;
  text-align: center;
  width: 58px;
  height: 58px;
}
.cate img {
  width: 100%;
}
.cate p {
  line-height: 12px;
}
.cate span {
  color: #888;
  font-size: 10px;
  line-height: 0;
}
.stop {
  position: absolute;
  line-height: 14px;
  width: 15px;
  height: 14px;
  background-color: #e54b55;
  font-size: 10px;
  color: white;
  top: 0;
  right: 0;
  border-radius: 2px;
}
</style>
