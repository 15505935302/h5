<template>
  <div>
    <Head>
      <span slot="pageName">详情</span>
    </Head>
    <div style="height: 100%;" s="[object Object]" class="child-view">
      <div class="main">
        <article>
          <h2>{{data.title}}</h2>
          <time>{{data.create_time}}</time>
          <div
           class="wrapExplain"
          >{{data.content}}</div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import Head from "../components/header";
export default {
  data() {
    return {
      data:this.$route.params.msg,
    };
  },
  components: {
    Head
  },
  mounted() {
    console.log(this.$route.params.msg)
  }
};
</script>

<style scoped lang='less'>
#header_com {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #e54b55;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  font-size: 0.425rem;
  color: white;
  padding: 0.3rem 0.375rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  z-index: 100;
}
.child-view {
    position: absolute;
    width: 100%;
    transition: all .2s cubic-bezier(.55,0,.1,1);
    top:30px;
}* {
    box-sizing: border-box;
}.main{
  background: #fff;
    min-height: 100%;
    font-size: inherit;
    padding-top: 2.3em;
}article {
    margin: .8em .6rem .5em;
    line-height: 1em;
    display: block;
}article h2 {
    line-height: 1.3em;
    margin-bottom: .3em;
    color: #333;
}article>span, article time {
    font-size: 10px;
    color: #555;
}article>div {
    font-size: 14px;
    line-height: 1.6em;
    font-weight: 400;
    margin-top: 1em;
    color: #333;
}
</style>
