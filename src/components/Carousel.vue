<!--
描述：跑马灯
作者：焦佳宇
-->
<template>
  <el-carousel indicator-position="outside" @change="setCurIndex" type="card">
    <el-carousel-item>
      <img src="../assets/carousel_0.jpg"
        fit="cover" style="width: 100%; height: 100%" />
      >
    </el-carousel-item>
    <el-carousel-item>
      <img src="../assets/carousel_1.jpg"
        fit="cover" style="width: 100%; height: 100%" />
      >
    </el-carousel-item>
    <el-carousel-item>
      <img src="../assets/carousel_2.jpg"
        fit="cover" style="width: 100%; height: 100%" />
      >
    </el-carousel-item>
    <el-carousel-item>
      <img src="../assets/carousel_3.jpg"
        fit="cover" style="width: 100%; height: 100%" />
      >
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export default {
  data() {
    return {
      cur_index: 0,
      // image_url:[
      //   "../assets/carousel_0.jpg",
      //   "../assets/carousel_1.jpg",
      //   "../assets/carousel_2.jpg",
      //   "../assets/carousel_3.jpg"
      // ]
    };
  },
  methods: {
    setCurIndex(val) {
      this.cur_index = val;
    },
    goLink(click_index) {
      if (click_index == this.cur_index) {
        alert("跳转到" + click_index+ "号图片相应链接");
      }
    },
  },
};
</script>
<style scoped>
.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

</style>
