<!--
描述：相关快讯卡片组件
作者：焦佳宇 
-->
<template>
  <el-card
    class="box-card news_card"
    shadow="hover"
    @click="goNewsDetail(new_info)"
  >
    <template #header>
      <div class="card-header">
        <span>{{ new_info.newsFlashTitle.length>18?new_info.NewsFlashTitle.slice(0,18)+'...': new_info.newsFlashTitle}}</span>
      </div>
      <el-row gutter="10" justify="left">
        <el-col span="30">
          <el-tag class="ml-2" type="primary" size="small">{{
            new_info.newsFlashDate.substring(
                0,
                new_info.newsFlashDate.indexOf(" ")
              )
          }}</el-tag>
        </el-col>
        <el-col span="30">
          <el-tag class="ml-2" type="success" size="small">{{
            new_info.newsFlashRegion
          }}</el-tag>
        </el-col>
        <el-col span="30" v-for="tag in this.new_tags.slice(0,3)" :key="tag">
          <el-tag class="ml-2" type="warning" size="small">{{
            tag
          }}</el-tag>
        </el-col>
      </el-row>
    </template>
    <div class="content">
      {{ new_info.newsFlashSummary }}
    </div>
  </el-card>
</template>

<script>
//到时候传入一个
export default {
  props: ["new_info"],
  data(){
    return{
      new_tags: [],
    }
  },
  methods: {
    goNewsDetail(new_info) {
      this.$router.push({
        path: "news",
        query: {
          news_id: new_info.newsFlashId,
        },
      });
    },
  },
  created(){
    this.new_tags=[].concat(this.new_info.newsFlashTag.split("-"));
    this.new_info.newsFlashSummary=this.new_info.newsFlashSummary.slice(0,75)+'...';
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
  height: 190px;
}
.content {
  font-size: small;
}
</style>
