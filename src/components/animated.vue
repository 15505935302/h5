<template>
  <div class="numBall">{{ value }}</div>
</template>

<script>
export default {
    props:["value"]
}
</script>

<style scoped>
.numBall {
  background-image: url(../assets/img/web/ic_ball_red.png);
  font-size: 14px;
  color: #fff;
  width: 23px;
  height: 23px;
  background-size: 100%;
  background-repeat:no-repeat;
}
</style>
