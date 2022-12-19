<!--
快讯首页
作者：焦佳宇
-->
<template>
  <carousel
    indicator-position="none"
    style="margin-top: 10px"
  ></carousel>
  <div v-loading.fullscreen.lock="isLoading" style="margin-top: 30px" class="body_card">
    <div class="list_field" v-if="this.news_list.length != 0">
      <div v-for="news in this.news_list" :key="news">
        <news-entry
          :news_flash_date="news.newsFlashDate"
          :news_flash_title="news.newsFlashTitle"
          :news_flash_region="news.newsFlashRegion"
          :news_flash_tag="news.newsFlashTag"
          :news_flash_summary="news.newsFlashSummary"
          :news_flash_id="news.newsFlashId"
          :news_flash_image="news.newsFlashImage"
          style="margin-bottom: 5px"
        ></news-entry>
      </div>
    </div>
  </div>
  <div class="pagination_field">
    <el-row justify="center" >
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="PAGESIZE"
        :total="news_num_total"
        @current-change="curChange"
      />
    </el-row>
  </div>
</template>

<script>
import axios from "axios";

import Carousel from "../components/Carousel.vue";
import NewsEntry from "../components/NewsEntry.vue";
export default {
  components: {
    Carousel,
    NewsEntry,
  },
  data() {
    return {
      news_list: [],
      news_num_total: 0,
      isLoading: true,
      PAGESIZE: 5,
    };
  },
  methods: {
    curChange(res) {
      this.isLoading = true;
      axios
        .get("spring/admin/newsflash/all?page=" + res + "&page_size=" + this.PAGESIZE)
        .then((res) => {
          this.news_list = [].concat(res.data.data.newsflashs);
          this.isLoading = false;
          window.scrollTo(0,0);//将滚动条回滚至最顶端
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },
  },
  created() {
    //在此处向服务器请求数据，初始化所需变量
    let get_news_list = axios
      .get("spring/admin/newsflash/all?page=1&page_size=" + this.PAGESIZE)
      .then((res) => {
        this.news_list = [].concat(res.data.data.newsflashs);
      })
      .catch((err) => {
        console.log(err);
      });
    let get_news_num=axios.get("spring/admin/newsflash/num").then((res)=>{
      this.news_num_total=res.data.data.num;
    }).catch((err)=>{
      console.log(err);
    });
    Promise.all([get_news_list,get_news_num]).then(()=>{
      this.isLoading=false; 
    }).catch((err)=>{
      console.log(err);
    })
  },
};
</script>

<style scoped>
.list_field {
  margin-top: 10px;
  width: 96%;
  margin-left: 2%;
}
.pagination_field {
  margin-top: 10px;
  margin-bottom: 10px;
}

</style>
