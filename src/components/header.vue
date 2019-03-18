<template>
  <div id="header_com">
    <i class="iconfont" @click="back">&#xe616;</i>
    <slot name="pageName"></slot>
    <slot name="right" class="right"><i></i></slot>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.back();
    }
  }
};
</script>

<style scoped lang="less">
#header_com {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #e54b55;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 17px;
  color: white;
  padding: 12px 15px;
  box-sizing: border-box;
  z-index: 100;
  & > i {
    width: 25px;
  }
  .right i {
    width: 25px;
  }
}
</style>
