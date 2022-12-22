<!--
快讯详情：点击左侧卡片选择不同快讯可以重新渲染快讯内容
作者：焦佳宇
-->
<template>
  <div class="common-layout">
    <el-container >
      <el-aside width="400px" class="aside_field">
        <el-affix :offset="1" target=".aside_field">
          <div class="logo_field">
            <div class="label">发布单位</div>
            <div class="logo">
              <img src="../assets/logo.png" style="height: 90px" />
            </div>
          </div>
          <div class="card_field">
            <div
              class="card"
              v-for="news in this.news_relevant.slice(0, 3)"
              :key="news"
            >
              <news-info-board :new_info="news"></news-info-board>
            </div>
          </div>
        </el-affix>
      </el-aside>
      <el-main>
        <div class="content_field">
          <div class="common-layout">
            <el-container>
              <el-aside width="75%">
                <div class="content_header">
                  <p class="title">
                    {{ this.news_info.NewsFlashTitle }}
                  </p>

                  <el-row gutter="10" justify="center" style="width: 100%">
                    <el-col span="1">
                      <el-tag class="ml-2" type="primary" size="large">
                        {{ this.news_info.NewsFlashDate }}
                      </el-tag>
                    </el-col>
                    <el-col span="1">
                      <el-tag class="ml-2" type="success" size="large">{{
                        this.news_info.NewsFlashRegion
                      }}</el-tag>
                    </el-col>
                    <el-col span="1" v-for="tag in new_tags" :key="tag">
                      <el-tag class="ml-2" type="warning" size="large">{{
                        tag
                      }}</el-tag>
                    </el-col>
                  </el-row>
                </div>
              </el-aside>
              <el-main>
                <img src="../assets/drawing_news.png" style="height: 80px" />
              </el-main>
            </el-container>
          </div>
          <el-divider />
          <div class="content_main" v-loading.fullscreen.lock="oss_loading">
            <p v-html="this.news_info.NewsFlashContent"></p>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import NewsInfoBoard from "../components/NewsInfoBoarder.vue";
import axios from "axios";
export default {
  components: {
    NewsInfoBoard,
  },
  data() {
    return {
      news_info: "",
      news_relevant: [], //存储相关快讯信息
      news_id: "",
      new_tags: [],
      oss_loading: false,
    };
  },

  methods: {
    getParams() {
      this.news_id = this.$route.query.news_id;
      //在此处向服务器请求数据，给所需变量重新赋值
      this.oss_loading=true;
      axios
        .get("api/newsflash/single" + "?newsflash_id=" + this.news_id)
        .then((res) => {
          this.news_info = res.data.data;
          this.new_tags = [].concat(res.data.data.NewsFlashTag.split("-"));
          this.news_info.NewsFlashDate = this.news_info.NewsFlashDate.substring(
            0,
            this.news_info.NewsFlashDate.indexOf("T")
          );
          const xhrFile = new XMLHttpRequest();
          console.log("开始解析oss");
          xhrFile.open("GET", this.news_info.NewsFlashContent, true);
          xhrFile.send();
          xhrFile.onload = () => {
            //res.data.data.blog_content=xhrFile.response;
            this.news_info.NewsFlashContent = xhrFile.response;
            console.log("oss解析完成");
            this.oss_loading=false;
          };
        })
        .catch((errMsg) => {
          console.log(errMsg);
        });
    },
  },
  watch: {
    $route(to, from) {
      this.getParams();
    },
  },
  created() {
    //在此处向服务器请求数据，初始化所需变量
    this.getParams();

    axios
      .get("api/newsflash/all")
      .then((res) => {
        this.news_relevant = [].concat(res.data.data.newsflashs.filter(
          (news) => news.NewsFlashId != this.news_id
        ));
      })
      .catch((errMsg) => {
        console.log(errMsg);
      });
  },
};
</script>

<style scoped>
.logo_field .label {
  font-size: x-large;
  color: #409eff;
  font-family: SimSun;
  font-weight: bolder;
  margin-top: 20px;
  padding-bottom: 5px;
  border-bottom: #5c2705 solid;
  width: 250px;
  margin-left: 75px;
}
.logo_field .logo {
  margin-top: 15px;
}
.card_field {
  margin-top: 20px;
}
.card {
  margin-bottom: 10px;
  margin-left: 25px;
}
.content_field {
  background-color: white;
  min-height: 760px;
  border-radius: 10px;
}
.title {
  font-size: xx-large;
  color: #409eff;
  font-family: SimSun;
  font-weight: bolder;
  margin-bottom: 15px;
}
.content_main {
  width: 80%;
  margin-left: 10%;
  text-align: left;
  padding-bottom: 50px;
  white-space: pre-line;
}
.aside_field{
  margin-bottom:40px
}
</style>
