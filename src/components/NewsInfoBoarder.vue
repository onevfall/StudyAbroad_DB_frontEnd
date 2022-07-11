<!--
描述：相关快讯卡片组件
作者：焦佳宇
-->
<template>
  <el-card class="box-card news_card" shadow="hover" @click="goNewsDetail">
    <template #header>
      <div class="card-header">
        <span>{{ new_info.news_flash_title }}</span>
      </div>
      <el-row gutter='10' justify="left">
          <el-col span='30' >
         <el-tag class="ml-2" type="primary" size="small">{{new_info.news_flash_date}}</el-tag>
      </el-col>
      <el-col span='30' >
         <el-tag class="ml-2" type="success" size="small">{{new_info.news_flash_region}}</el-tag>
      </el-col>
       <el-col span='30' >
         <el-tag class="ml-2" type="warning" size="small">{{new_info.news_flash_tag}}</el-tag>
      </el-col>
    </el-row>
    </template>
    <div class="content">
      {{ contentShow }}
    </div>
  </el-card>
</template>

<script>
//到时候传入一个
export default {
  props: ["new_info"],
  computed: {
    contentShow() {
      if (this.new_info.news_flash_content.length < 60) {
        return this.new_info.news_flash_content;
      } else {
        return this.new_info.news_flash_content.slice(0, 60) + "...";
      }
    },
  },
  methods:{
      goNewsDetail(){
          alert("跳转至id为"+ this.new_info.news_flash_id+"的快讯详情页面")
      }
  }
};
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #299afb;
  font-weight: bolder;
  margin-bottom: 10px;
}
.news_card {
  width: 350px;
}
.content {
  font-size: small;
}
</style>
