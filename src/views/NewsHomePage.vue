<!--
快讯首页
作者：ym jjy
-->
<template>
  <carousel
    type="card"
    indicator-position="none"
    style="margin-top: 10px"
  ></carousel>
  <div v-loading.fullscreen.lock="isLoading" style="margin-top:30px">
    <div class="list_field" v-if="this.news_list.length != 0">
      <div v-for="news in this.news_list" :key="news" >
        <news-entry
          :news_flash_date="news.NewsFlashDate"
          :news_flash_title="news.NewsFlashTitle"
          :news_flash_region="news.NewsFlashRegion"
          :news_flash_tag="news.NewsFlashTag"
          :news_flash_summary="news.NewsFlashSummary"
          :news_flash_id="news.NewsFlashId"
          :news_flash_image="news.NewsFlashImage"
          style="margin-bottom: 5px"
        ></news-entry>
      </div>
    </div>
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
    };
  },

  created() {
    //在此处向服务器请求数据，初始化所需变量
    axios
      .get("newsflash/all")
      .then((res) => {
        this.news_num_total = res.data.data.count;
        this.news_list = [].concat(res.data.data.newsflashs);
        this.isLoading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {},
};
</script>

<style scoped>
.list_field {
  margin-top: 10px;
  width: 96%;
  margin-left: 2%;
}
</style>
