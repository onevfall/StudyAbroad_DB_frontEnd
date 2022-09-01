<!--
描述：相关快讯卡片组件
作者：焦佳宇 
-->
<template>
  <el-card
    class="box-card news_card"
    
    @click="goNewsDetail(new_info)"
  >
    <template #header>
      <div class="card-header">
        <span>{{ new_info.NewsFlashTitle.length>18?new_info.NewsFlashTitle.slice(0,18)+'...': new_info.NewsFlashTitle}}</span>
      </div>
      <el-row gutter="10" justify="left">
        <el-col span="30">
          <el-tag class="ml-2" type="primary" size="small">{{
           new_info.NewsFlashDate.substring(
                0,
                new_info.NewsFlashDate.indexOf("T")
              )
          }}</el-tag>
        </el-col>
        <el-col span="30">
          <el-tag class="ml-2" type="success" size="small">{{
            new_info.NewsFlashRegion
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
      点击查看更多
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
          news_id: new_info.NewsFlashId,
        },
      });
    },
  },
  created(){
    this.new_tags=[].concat(this.new_info.NewsFlashTag.split("-"));
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
  color:rgb(6, 6, 155);
  height: 1%;
  min-height:0px
}
.el-card{
  height:10%
}
</style>
