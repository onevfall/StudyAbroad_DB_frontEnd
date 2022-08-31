<!--
描述：相关快讯卡片组件
作者：焦佳宇 
7.13修改：ym 添加了和页面重新渲染相关的函数
-->
<template>
  <el-card
    class="box-card news_card"
    
    @click="goNewsDetail(new_info)"
  >
    <template #header>
      <div class="card-header">
        <span>{{ new_info.NewsFlashTitle }}</span>
      </div>
      <el-row gutter="10" justify="left">
        <el-col span="30">
          <el-tag class="ml-2" type="primary" size="small">{{
            new_info.NewsFlashDate.replace("T", " ")
          }}</el-tag>
        </el-col>
        <el-col span="30">
          <el-tag class="ml-2" type="success" size="small">{{
            new_info.NewsFlashRegion
          }}</el-tag>
        </el-col>
        <el-col span="30">
          <el-tag class="ml-2" type="warning" size="small">{{
            new_info.NewsFlashTag
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
  // computed: {
  //   contentShow() {
  //     if (this.new_info.NewsFlashContent.length < 60) {
  //       return this.new_info.NewsFlashContent;
  //     } else {
  //       return this.new_info.NewsFlashContent.slice(0, 60) + "...";
  //     }
  //   },
  // },
  methods: {
    goNewsDetail(new_info) {
      // alert("跳转至id为"+ this.new_info.NewsFlashId+"的快讯详情页面")
      console.log("开始跳");
      console.log(new_info.NewsFlashId);
      this.$router.push({
        path: "news",
        query: {
          news_id: new_info.NewsFlashId,
        },
      });
    },
  },
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
  height:250px;
  min-height:0px
}
.news_card:hover{
  box-shadow: 0 8px 36px 0 rgba(0, 0, 0, 0.25);
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
