<!--
高校详情
描述：展示详细高校信息
作者：张子涵、焦佳宇（修改为新闻）
-->
<template>
  <el-containor style="overflow: visible">
    <el-card
      :body-style="{ background: 'white' }"
      shadow="always"
      position:sticky
      top="0px"
    >
      <template #header>
        <div class="card-header">当地新闻</div>
      </template>
      <div v-loading="this.news_list==null">
        <div v-if="this.news_list!=null">
          <div v-for="item in this.news_list" :key="item">
            <NewsBoard :news="item" style="margin-bottom:10px"></NewsBoard>
          </div>
        </div>
      </div>
    </el-card>
  </el-containor>
</template>

<script>
import NewsBoard from "../components/NewsBoard.vue";
import axios from "axios";
export default {
  components: {
    NewsBoard,
  },
  props:["country_name"],
  data() {
    return {
      news_list: null,
    }
  },
  watch:{
    country_name(newVal){
      if(newVal!=""){
        axios.get("/spring/v1/news/district_news", {
        params: {
          district_name: this.country_name,
          news_num:5
        },
      }).then((res) => {
        this.news_list = res.data.obj.newslist;
      });
      }
    }
  },
};
</script>

<style scoped>
.text {
  font-size: 14px;
  text-align: left;
  text-decoration: none;
  margin-bottom: 18px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  text-align: left;
  font-size: 28px;
  padding-left: 5px;
  border-left: 10px rgb(33, 33, 126) solid;
}
</style>
