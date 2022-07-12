<!--
描述：投币按钮组件
作者：焦佳宇
-->
<template>
  <el-col :span="2" style="text-align: left" v-if="is_coined == false">
    <el-icon size="large" @click="coinIn"><Coin /></el-icon>
  </el-col>
  <el-col :span="2" style="text-align: left" v-else>
    <el-icon size="large" color="#fbc563"><Coin /></el-icon>
  </el-col>
  <el-col :span="3" style="text-align: left"> 999 </el-col>
</template>

<script>
export default {
  data() {
    return {
      is_coined: false,
    };
  },
  methods:{
      coinIn(){
          this.is_coined=true
      }
  }
};
</script>

<style></style>
