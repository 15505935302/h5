import Bus from "../store/bus.js"
var open = {
  inject:["reload"],
  data() {
    return {
      lotteryMsg: false,
      // 开奖结果
      openResult: [],
      openNum: [],
      // 分分彩开奖结果
      elseOpenEnd: [],
      loading: false,
      // 开奖倒计时
      countDown: 0,
      // 倒计时函数
      time: null,
      // 倒计时结束请求开奖结果延时器
      openDown: null,
      // 请求到开奖结果状态
      result: false,
      // 数字滚动定时器
      numRoll: null,
      // 倒计时结束请求开奖呢结果
      requestOpen: true,
      // 请求倒计时延时器
      outTime: null,
      // 倒计时请求完成
      timeDone: false,
      // 球颜色
      color:0,
    };
  },
  watch: {
    timeDone() {
      this.countDownTime()
    },
    requestOpen(data) {
      if (data) {
        clearInterval(this.numRoll);
      } else {
        this.inTheLottery()
      }
    }
  },
  methods: {
    // 开奖记录以及倒计时
    openTime() {
      if (this.$store.state.gameType.type == 0) {
        if(this.$store.state.gameType.game_type==11){
          this.$api.openliuhe({ wanfa_type: this.$store.state.gameType.game_type }).then(res => {
            this.history = res.data.data;
            this.countDown = res.data.data.second;
            this.$store.commit("choice_no", res.data.data.qihao);
            this.loading=true
            this.timeDone=true
          });
        }else{
          this.$api
          .getLotteryInfo({ baseWanFaID: this.$store.state.gameType.id })
          .then(res => {
            this.openNum = res.data.data;
            let str = res.data.data.win_info.numbers;
            this.numWith(str);
            this.$store.commit("choice_no", res.data.data.qihao);
            let beforeQihao=this.common.timeQihao(res.data.data.qihao,this.$store.state.gameType.remarks,this.$store.state.gameType.game_type)
            this.loading = true;
            this.countDown = res.data.data.second;
            this.timeDone = true;
            if(res.data.data.win_info.qihao!=beforeQihao){
              this.requestOpen=false
              this.requestResult()
            }
          });
        }
      } else {
        this.$api
          .open({ game_type: this.$store.state.gameType.game_type })
          .then(res => {
            this.openNum = res.data.data;
            let str = res.data.data.first_result.get_result;
            this.color=res.data.data.first_result.color
            this.numWith(str);
            this.$store.commit("choice_no", res.data.data.game_num);
            let beforeQihao=this.common.timeQihao(res.data.data.game_num,this.$store.state.gameType.remarks)            
            this.loading = true;
            this.countDown = res.data.data.seconds;
            this.timeDone = true;
            if(res.data.data.first_result.game_num!=beforeQihao){
              this.requestOpen=false
              this.requestResultRoom()
            }
          });
      }
    },
    inTheLottery() {
      this.numRoll = setInterval(
        function () {
          for (let i = 0; i < this.openResult.length; i++) {
            if(i%2==0){
              if (this.openResult[i] < 9) {
                let newNum = (this.openResult[i] += 1);
                this.$set(this.openResult, i, newNum);
              } else {
                this.$set(this.openResult, i, 0);
              }
            }
          }
        }.bind(this),
        150
      );
      this.$once('hook:beforeDestroy', () => {
        clearInterval(this.numRoll);
      })
    },
    cancel() {
      this.lotteryMsg = false;
      this.$refs.msg_tri.style.transform = "rotate(0deg)";
      document.body.style.overflow = "scroll";
    },
    // 往期开奖信息点击显示
    lottery_msg() {
      if (this.lotteryMsg) {
        this.$refs.msg_tri.style.transform = "rotate(0deg)";
        this.lotteryMsg = false;
        document.body.style.overflow = "scroll"
      } else {
        this.$refs.msg_tri.style.transform = "rotate(180deg)";
        this.lotteryMsg = true;
        document.body.style.overflow = "hidden"
      }
    },
    // 倒计时结束请求下期倒计时
    openDownTime() {
      if (this.$store.state.gameType.type == 0) {
        let requestStart = Date.parse(new Date());
        this.$api
          .getLotteryInfo({
            baseWanFaID: this.$store.state.gameType.id
          })
          .then(res => {
            if (res.data.data.id == 512436 || res.data.data.id == 512363 || res.data.data.id==514649) {
              this.$store.commit("choice_no", res.data.data.qihao);
              if (res.data.data.seconds == 0) {
                this.outTime = setTimeout(() => {
                  this.openDownTime();
                }, 1000);
              }
              let requestEnd = Date.parse(new Date());
              let time = requestStart - requestEnd;
              this.countDown = res.data.data.seconds-time;
            } else {
              this.$store.commit("choice_no", res.data.data.game_num);
              if (res.data.data.second == 0) {
                this.outTime = setTimeout(() => {
                  this.openDownTime();
                }, 1000);
              }
              let requestEnd = Date.parse(new Date());
              let time = requestStart - requestEnd;
              this.countDown = res.data.data.second-time;
            }
          });
      } else {
        let requestStart = Date.parse(new Date());
        this.$api
          .open({
            game_type: this.$store.state.gameType.game_type
          })
          .then(res => {
            this.$store.commit("choice_no", res.data.data.game_num);
            if (res.data.data.seconds == 0) {
              this.outTime = setTimeout(() => {
                this.openDownTime();
              }, 1000);
            }
            let requestEnd = Date.parse(new Date());
            let time = requestStart - requestEnd;
            this.countDown = res.data.data.seconds - time;
          });
      }
      this.$once("hook:beforeDestroy", () => {
        clearTimeout(this.outTime);
      });
    },
    // 倒计时结束请求开奖结果(直投)
    requestResult(){
      this.$api.getLotteryInfo({ baseWanFaID: this.$store.state.gameType.id}).then(res=>{
        let beforeQihao=this.common.timeQihao(res.data.data.qihao,this.$store.state.gameType.remarks,this.$store.state.gameType.game_type)
        if(res.data.data.win_info.qihao==beforeQihao){
          let str=res.data.data.win_info.numbers
          this.numWith(str)
          clearTimeout(this.openDown)
          this.openEnd()
          this.requestOpen=true
        }else{
          this.openDown=setTimeout(()=>{
            this.requestResult()
          },5000)
        }
        this.$once('hook:beforeDestroy', () => {
            clearTimeout(this.openDown);
        })
      })
    },
    // 倒计时结束请求开奖结果(房间)
    requestResultRoom() {
      this.requestOpen = false;
      this.$api
        .open({
          game_type: this.$store.state.gameType.game_type
        })
        .then(res => {
          let beforeQihao = this.common.timeQihao(
            res.data.data.game_num,
            this.$store.state.gameType.remarks
          );
          if (res.data.data.first_result.game_num == beforeQihao) {
            let str = res.data.data.first_result.get_result;

            this.numWith(str);
            clearTimeout(this.requestResultRoom);
            this.requestOpen = true;
          } else {
            this.openDown = setTimeout(() => {
              this.requestResultRoom();
            }, 5000);
          }
          this.$once('hook:beforeDestroy', () => {
            clearTimeout(this.openDown);
          })
        });
    },
    // 倒计时
    countDownTime() {
      if (this.countDown > 0) {
        this.countDown--
      } else {
        this.countDown = 0
        this.openDownTime()
        if (this.$store.state.gameType.type == 0) {
          this.requestResult()
        } else {
          this.requestResultRoom()
        }
        this.requestOpen = false
      }
      this.time = setTimeout(() => {
        this.countDownTime()
      }, 1000)
      this.$once('hook:beforeDestroy', () => {
        clearTimeout(this.time);
      })
    },
    // 历史开奖结果
    openEnd() {
      this.$api.kjLog({
        baseWanFaID: this.$store.state.gameType.id,
        page: 5
      }).then((res) => {
        this.elseOpenEnd = res.data.data
      })
    },
    // 开奖结果字符串处理
    numWith(str) {
      this.openResult = str.split("");
      let sum = this.openResult
        .slice(this.openResult.indexOf("=") + 1 - this.openResult.length)
        .join("");
      this.openResult.splice(this.openResult.indexOf("=") + 1);
      this.openResult.push(sum);
    }
  },
  created() {
    Bus.$on('gameType', (data) => {
      this.openTime()
    })
    this.openEnd()
    this.openTime()
  },
  filters: {
    // 开奖倒计时过滤
    openTimeDown(result) {
      var h =
        Math.floor(result / 3600) < 10 ?
        "0" + Math.floor(result / 3600) :
        Math.floor(result / 3600);
      var m =
        Math.floor((result / 60) % 60) < 10 ?
        "0" + Math.floor((result / 60) % 60) :
        Math.floor((result / 60) % 60);
      var s =
        Math.floor(result % 60) < 10 ?
        "0" + Math.floor(result % 60) :
        Math.floor(result % 60);
      return (result = h + ":" + m + ":" + s);
    }
  }
}

export default open
