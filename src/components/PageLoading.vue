<!--
描述：页面加载动画组件
作者：焦佳宇
-->
<template>
  <div class="first-loading-wrp">
    <div class="loading-wrp">
        <loading></loading>
    </div>
    <h2>努力加载中...</h2>
  </div>
</template>

<script>
import Loading from '../components/Loading.vue'
export default {
  components:{
      Loading
  },
  methods: {
    //停止页面滚动
    stopMove() {
      let m = function (e) {
        e.preventDefault();
      };
    //   window.scrollTo(0,0);//将滚动条回滚至最顶端
      document.body.style.overflow = "hidden";
      document.addEventListener("touchmove", m, { passive: false }); //禁止页面滑动
    },
    //开启页面滚动
    Move() {
      let m = function (e) {
        e.preventDefault();
      };
      document.body.style.overflow = ""; //出现滚动条
      document.removeEventListener("touchmove", m, { passive: true });
    },
  },
  mounted(){
    //   window.scrollTo(0,0);//将滚动条回滚至最顶端
      this.stopMove()
  },
  unmounted(){
      this.Move()
  }
};
</script>

<style>
.first-loading-wrp {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  min-height: 100vh;
}

.first-loading-wrp > h1 {
  font-size: 30px;
  font-weight: bolder;
}

.first-loading-wrp .loading-wrp {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 98px;
}
</style>
