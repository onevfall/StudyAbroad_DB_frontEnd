<!--
快讯首页
作者：ym
-->
<template>
  <div class="total-layout">
    <el-container>
      <el-header height="300px">
        <el-carousel indicator-position="outside"> </el-carousel>
      </el-header>
      <el-main
        ><div class="partial-layout">
          <el-container>
            <el-header>
              <div class="news">留学快讯</div>

              <div class="heatOrLatest">
                <el-button text size="large"
                  ><img src="../assets/sort_desc.png" />按最新话题</el-button
                >

                <el-button text size="large"
                  ><img src="../assets/sort_asc.png" />按最热话题
                </el-button>
              </div>
            </el-header>
            <el-container>
              <el-aside width="300px">
                <el-card
                  :body-style="{ background: 'aliceblue' }"
                  shadow="always"
                >
                  <template #header>
                    <div class="card-header">广告栏</div>
                  </template>
                  <div v-for="link in links" :key="link.text" class="text">
                    <el-link href="https://sse.tongji.edu.cn">
                      {{ link.text }}</el-link
                    >
                  </div>
                </el-card>
              </el-aside>
              <el-main>
                <div class="abstract">
                  <div class="latestNews">快讯摘要</div>
                  <div>
                    <div class="infinite-list-wrapper" style="overflow: auto">
                      <ul
                        v-infinite-scroll="load"
                        class="list"
                        :infinite-scroll-disabled="disabled"
                      >
                        <li
                          v-for="news in this.news_relevant"
                          :key="news"
                          class="list-item"
                        >
                          <div class="common-layout2">
                            <el-container>
                              <el-aside width="200px">
                                <el-image
                                  style="width: 198px; height: 183px"
                                  :src="news.NewsFlashImage"
                                  :fit="fit"
                                  class="imgBorder"
                                />
                              </el-aside>
                              <el-main
                                style="width: 600px; height: 185px"
                                class="mainColor"
                              >
                                <el-card
                                  style="height: 183px; background: aliceblue"
                                >
                                  <template #header>
                                    <div class="card-header2">
                                      <span style="width: 40%">
                                        {{ news.NewsFlashTitle }}

                                        <br />
                                      </span>
                                      <el-tag
                                        class="ml-2"
                                        type="primary"
                                        size="small"
                                      >
                                        {{
                                          news.NewsFlashDate.replace("T", " ")
                                        }}
                                      </el-tag>
                                      <el-tag
                                        class="ml-2"
                                        type="success"
                                        size="small"
                                      >
                                        {{ news.NewsFlashRegion }}
                                      </el-tag>
                                      <el-tag
                                        class="ml-2"
                                        type="warning"
                                        size="small"
                                        >{{ news.NewsFlashTag }}</el-tag
                                      >
                                    </div>
                                  </template>
                                  <div class="content_main">
                                    {{ news.NewsFlashSummary }}
                                  </div>
                                  <div class="moreInfo">
                                    <el-button
                                      type="primary"
                                      class="button_moreInfo"
                                      @click="jumpToNewsPage(news)"
                                      >查看详情</el-button
                                    >
                                  </div>
                                </el-card>
                              </el-main>
                            </el-container>
                          </div>
                        </li>
                      </ul>
                      <p v-if="loading" style="margin-top: 10%">Loading...</p>
                      <p v-if="noMore" style="margin-top: 10%">No more</p>
                    </div>
                  </div>
                </div>
              </el-main>
            </el-container>
          </el-container>
        </div></el-main
      >
      
    </el-container>
  </div>
</template>

<script>
import { computed, ref } from "vue";

import axios from "axios";
import Carousel from "../components/Carousel.vue";
export default {
  data() {
    return {
      count: ref(10),
      loading: ref(false),
      noMore: computed(() => this.count >= 20),
      disabled: computed(() => this.loading || this.noMore),
      news_info: "",
      news_relevant: [], //存储相关快讯信息
      links: [
        { text: "同济软院招聘信息" },
        { text: "同济经管学院招聘信息" },
        { text: "同济电院招聘信息" },
        { text: "同济土木学院招聘信息" },
        { text: "同济数院招聘信息" },
        { text: "同济物院招聘信息" },
      ],
    };
  },

  created() {
    //在此处向服务器请求数据，初始化所需变量
    axios({
      url: "newsflash/all",

      method: "get",
    })
      .then((res) => {
        console.log(res);

        console.log(res.data);
        console.log(res.data.data);
        console.log(res.data.data.newsflashs);
        this.news_relevant = res.data.data.newsflashs;
        console.log(this.news_relevant);
      })
      .catch((errMsg) => {
        console.log(errMsg);
      });
  },
  methods: {
    load() {
      this.loading = true;
      setTimeout(() => {
        this.count += 2;
        this.loading = false;
      }, 2000);
    },
    jumpToNewsPage(news) {
      this.$router.push({
        path: "news",
        query: {
          news_id: news.NewsFlashId,
        },
      });
    },
  },
};
</script>


<style scoped>
.heatOrLatest {
  margin-left: -5%;
  margin-top: -3%;
  width: 400px;
}
.news {
  font-weight: bolder;
  font-family: SimSun;
  font-size: 40px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  text-align: left;
  font-size: 28px;
  padding-left: 5px;
  border-left: 10px rgb(33, 33, 126) solid;
}
.card-header2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  color: rgb(30, 23, 118);
}
.text {
  font-size: 14px;
  text-align: left;

  margin-bottom: 18px;
}

.abstract {
  text-align: left;
  font-size: 10px;
  background-color: white;
  padding-top: 3%;
  margin-top: -3%;
}
.latestNews {
  margin-left: 3%;
  text-align: left;
  font-size: 28px;
  padding-left: 5px;
  border-left: 10px rgb(172, 210, 34) solid;
  margin-bottom: 3%;
}
.card_field {
  margin-top: 20px;
  margin-left: 15%;
  width: 500px;
}
.card {
  margin-bottom: 10px;
  margin-left: 0px;
  width: 40px;
}
.el-button {
  color: #2277aa;

  font-weight: 500;
  font-size: 20px;
  border-radius: 4px;
}
.card-header2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  color: rgb(30, 23, 118);
}

.button_moreInfo {
  font-size: 10px;
  color: white;
}
.moreInfo {
  margin-left: 80%;
}
.content_main {
  text-align: left;
  font-size:16px;
}
.common-layout2 {
  margin-bottom: 0%;
}
.mainColor {
  background-color: aliceblue;
  color: aliceblue;
  padding: 0px;
  /* border-top: 1px grey solid;
  border-bottom: 1px grey solid;
  border-right: 1px grey solid; */
}

.dateAuthor {
  font-size: 10px;
  margin-left: -10%;
}

.infinite-list-wrapper {
  text-align: center;
}

.infinite-list-wrapper .list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  background: white;
   margin-bottom: 3%;
}
</style>