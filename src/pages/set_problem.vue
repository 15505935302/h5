<template>
  <div id="set_problem">
    <Head>
      <span slot="pageName">设置密保问题</span>
    </Head>
    <ul>
      <li @click="showproblem(1)">
        <div>问题一</div>
        <div>
          <input type="text" v-model="questionchooses1" placeholder="点击选择密保问题" readonly>
        </div>
        <div>
          <i class="iconfont">&#xe655;</i>
        </div>
      </li>
      <li>
        <div>答案一</div>
        <div>
          <input type="text" placeholder="请输入答案"  v-model="answer1"  oninput="value=value.replace(/[^\w\u4E00-\u9FA5]/g, '')" maxlength='20'>
        </div>
        <div>
          <i class="iconfont">&nbsp;&nbsp;&nbsp;</i>
        </div>
      </li>
    </ul>
    <ul>
      <li @click="showproblem(2)">
        <div>问题二</div>
        <div>
          <input type="text" v-model="questionchooses2"  placeholder="点击选择密保问题" readonly>
        </div>
        <div>
          <i class="iconfont">&#xe655;</i>
        </div>
      </li>
      <li>
        <div>答案二</div>
        <div>
          <input type="text" placeholder="请输入答案"  v-model="answer2" oninput="value=value.replace(/[^\w\u4E00-\u9FA5]/g, '')" maxlength='20'>
        </div>
        <div>
          <i class="iconfont">&nbsp;&nbsp;&nbsp;</i>
        </div>
      </li>
    </ul>
    <ul>
      <li @click="showproblem(3)">
        <div>问题三</div>
        <div>
          <input type="text" v-model="questionchooses3"  placeholder="点击选择密保问题" readonly>
        </div>
        <div>
          <i class="iconfont">&#xe655;</i>
        </div>
      </li>
      <li>
        <div>答案三</div>
        <div>
          <input type="text" placeholder="请输入答案" v-model="answer3" oninput="value=value.replace(/[^\w\u4E00-\u9FA5]/g, '')" maxlength='20'>
        </div>
        <div>
          <i class="iconfont">&nbsp;&nbsp;&nbsp;</i>
        </div>
      </li>
    </ul>
    <div class="closeBtn">
      <button @click="submit">确认</button>
    </div>
    <div v-show='problembol'>
      <div class="mask" @click="problembol=false"></div>
      <div class="picker">
        <div class="picker-title">
          <span class="pt-cancel" style="color: rgb(153, 153, 153);" @click='problembol=false'>取消</span>
          <span class="pt-submit" style="color: rgb(74, 149, 228);">确定</span>
        </div>
        <div class="picker-panel">
          <div class="picker-wheel-wrapper">
            <div class="picker-wheel">
              <ul class="wheel-scroll">
                <li @click="questionsure($event,item)" class="wheel-item" v-for='(item,index) in data' :key='index'>{{item.question_desc}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Head from "../components/header";
export default {
  name: "set_problem",
  data() {
    return {
      problembol:false,
      data:'',
      questione:'',
      questionchoose1:'',
      questionchoose2:'',
      questionchoose3:'',
      questionchooses1:'',
      questionchooses2:'',
      questionchooses3:'',
      answer1:'',
      answer2:'',
      answer3:'',
    };
  },
  components: {
    Head
  },
  methods: {
    // 问题列表获取
    securityquestion() {
      this.$api.securityquestion().then(res => {
        console.log(res);
        this.data = res.data.data
      });
    },
    // 问题选择展现
    showproblem(id){
      this.problembol = true
      this.questione = id
    },
    // 问题选择
    questionsure(e,item){
      if(this.questione==1){
        this.questionchooses1 = item.question_desc
        this.questionchoose1 = item.id
      }else if( this.questione==2 ){
          this.questionchooses2 = item.question_desc
        this.questionchoose2 = item.id
      }else if( this.questione==3 ){
          this.questionchooses3 = item.question_desc
        this.questionchoose3 = item.id
      }
      this.problembol = false
    },
    //submit
    submit(){
      if(this.questionchoose1 && this.questionchoose2 && this.questionchoose3){
        if(this.questionchoose1!=this.questionchoose2 && this.questionchoose3!=this.questionchoose2 && this.questionchoose1!=this.questionchoose3 ){
          if(this.answer1 && this.answer2 && this.answer3){
                let obj = {
                  "questionId1":this.questionchoose1,
                  "questionId2":this.questionchoose2,
                  "questionId3":this.questionchoose3,
                  "answer1":this.answer1,
                  "answer2":this.answer2,
                  "answer3":this.answer3,
                  "securityCode":this.$route.params.mgs
                }
              if(this.$store.state.revploblem){
                this.$api.problemupdate(obj).then(res=>{
                  console.log(res)
                    if(res.data.result_code==0){
                      this.showToast("text",'修改成功')
                      this.$router.push({
                        name: 'set_hubs',
                      })
                    }else{
                      this.showToast("text",res.data.result_desc)
                    }
                })
              }else{
                this.$api.securityadd(obj).then(res=>{
                    if(res.data.result_code===0){
                      this.showToast("text",'设置成功')
                      this.$router.push({
                        name: 'set_hubs',
                      })
                    }else{
                          this.showToast("text",res.data.result_desc)
                    }
                })
              }
          }else{
                this.showToast("text",'答案不能为空')
          }
        }else{
              this.showToast("text",'问题不能相同')
        }
      }else{
          this.showToast("text",'问题不能为空')
          
      }
    }
  },
  mounted() {
    this.securityquestion();
  }
};
</script>

<style scoped>

#set_problem {
  background: #f5f5f5;
  height: 100%;
  padding-top: 50px;
}
#set_problem ul {
  list-style: none;
  padding-left: 15px;
  box-sizing: border-box;
  background-color: white;
  width: 100%;
}
#set_problem>ul li {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #333;
}
#set_problem>ul li i {
  font-size: 14px;
  color: #333;
  line-height: 40px;
  margin-right: 20px;
}
#set_problem>ul li div:nth-child(1) {
  line-height: 40px;
}
#set_problem>ul li div:nth-child(2) {
  width: 70%;
  height: 40px;
}
#set_problem>ul li input {
  width: 95%;
  height: 30px;
  vertical-align: text-top;
  border: none;
  outline: none;
  font-size: 14px;
  color: #333;
  margin: 3px 0;
}
#set_problem ul li input::-webkit-input-placeholder {
  color: #b5b5b5;
}
.closeBtn {
  text-align: center;
  margin: 0 auto;
}
.closeBtn button {
  width: 90%;
  height: 40px;
  background: #e54b55;
  color: #fff;
  outline: none;
  border-radius: 4px;
  border: none;
  font-size: 14px;
}
.mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9999;
    background: rgba(0,0,0,.2);
}.picker {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 270px;
    z-index: 10000;
    background: #fff;
}.picker-title {
    position: relative;
    height: 44px;
    color: #333;
}.picker-panel {
    position: relative;
    height: 226px;
    padding: 24px 12px;
    box-sizing: border-box;
}.picker-title .pt-cancel {
    left: 0;
    color: #999;
}.picker-title span {
    position: absolute;
    height: 44px;
    line-height: 44px;
    padding: 0 12px;
    font-size: 14px;
}.picker-title .pt-submit {
    right: 0;
    color: #42b983;
}.picker-title span {
    position: absolute;
    height: 44px;
    line-height: 44px;
    padding: 0 12px;
    font-size: 14px;
}.picker-title h4 {
    margin: 0;
    font-size: 16px;
    font-weight: 400;
    height: 44px;
    line-height: 44px;
    text-align: center;
}.picker-wheel-wrapper {
    display: flex;
    height: 100%;
}.picker-wheel-wrapper .picker-wheel {
    flex: 1;
    overflow: hidden;
}.picker-wheel-wrapper .wheel-scroll {
    margin-top: 50px;
    list-style: none outside none;
    margin: 0;
    padding: 0;
    text-align:center;
    overflow:scroll;
    height: 100%;
}.picker-wheel-wrapper .wheel-scroll .wheel-item {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    text-align: center;
    color: #333;
    padding: 0 20px;
    margin: 0 auto;
}
</style>

