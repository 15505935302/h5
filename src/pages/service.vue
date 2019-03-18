<template>
    <div id="set_hubs">
      <Head>
        <span slot="pageName">客服</span>
      </Head>
        <th-message 
          ref="messgebox"
          :messageData="messageData"
          :funcList='funcList'
          :showEmoticon=true
          :topPadding="0"
          :showInput=true
          :selfFace='url'
          :otherFace='url'
          @sendOut="senRequest"
          >
        </th-message>
    </div>
</template>

<script>
import Head from "../components/header";

    export default {
    name: "set_hubs",
    data (){
      return{
          data:{},
          messageData:['html'],
          funcList:["gallery","camera", "quick"],
          bigBtn:'评价',
          url:'./static/img/tb-14.png',
          doctorbar:{
            name:'www',
            position:'eee',
            star:5,
            btn:"true",
            btntype:"default",
            otherface:'../assets/img/tb-13.png.png'
          }
      }
    },
    components:{
        Head,
    },
    methods:{
      start(){
        this.$refs.messgebox.style.height = "1500px"
      },
      senRequest(){
      // $('.message-item').after('16626')       
      }
    },
    mounted(){
      this.data = JSON.parse(localStorage.getItem('loginTime'))
      this.start()
      
    }
    }
</script>

<style scoped lang='less'>
.th-message{
  height: 70vh;
}
.weui-tabbar{
  display: none;
}
#set_hubs{
  background: #f5f5f5;
  padding-top: 50px;
}
.inputbox{
    position: fixed;
}
</style>
