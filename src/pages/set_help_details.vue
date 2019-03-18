<template>
    <div id="set_hubs">
      <Head>
        <span slot="pageName">{{this.$route.params.item.title}}</span>
      </Head>
      <div class="time" v-if="this.$route.params.item.create_time">
          活动开始时间：{{this.$route.params.item.create_time | capitalize}}
      </div>
      <div class="time" v-if="this.$route.params.item.update_time">
          活动结束时间：{{this.$route.params.item.update_time | capitalize}}
      </div>
      <div class="contant" v-html="this.$route.params.item.content">
      </div>
    </div>
</template>

<script>
import Head from "../components/header";
    export default {
    name: "set_hubs",
    data (){
      return{
          data:{},
      }
    },
    components:{
        Head,
    },
    methods:{
      
    },
    filters:{
      //时间过滤
      capitalize: function (value) {
        var date = new Date(parseInt(value));
          var tt = [date.getFullYear(), ((date.getMonth()+1)<10?'0'+(date.getMonth()+1):date.getMonth()+1), (date.getDate()<10?'0'+date.getDate():date.getDate())].join('-') + '  ' +[(date.getHours()<10?'0'+date.getHours():date.getHours()), (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()), (date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds())].join(':');
          return tt;
      }
    },
    mounted(){
      this.data = JSON.parse(localStorage.getItem('loginTime'))
      console.log(this.data)
    }
    }
</script>

<style scoped lang='less'>
  #set_hubs{
    background: #ffffff;
    padding-top: 50px;
  }
  .contant{
    height: 95vh;
    margin: 10px;
    font-size: 14px;
    color: #333
  }
  .time{
    margin: 10px 0 0px 10px;
  }
</style>
