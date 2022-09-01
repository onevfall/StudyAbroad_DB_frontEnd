<!--
快讯详情：点击左侧卡片选择不同快讯可以重新渲染快讯内容
作者：ym
-->
<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="400px">
        <div class="logo_field">
          <div class="label">发布单位</div>
          <div class="logo">
            <img src="../assets/logo.png" style="height: 90px" />
          </div>
        </div>
        <div class="card_field">
          <div class="card" v-for="news in this.news_relevant" :key="news">
            <news-info-board :new_info="news"></news-info-board>
          </div>
        </div>
      </el-aside>
      <el-main>
        <div class="content_field">
          <div class="common-layout">
            <el-container>
              <el-aside width="75%">
                <div class="content_header">
                  <p class="title">
                    {{ this.news_info.NewsFlashTitle}}
                  </p>

                  <el-row gutter="10" justify="center" style="width: 100%">
                    <el-col span="1">
                      <el-tag class="ml-2" type="primary" size="large">
                      <!-- {{"12345".replace('5','T')}} -->
                     
                        {{
                        newsTime
                      }}
                      </el-tag>
                    </el-col>
                    <el-col span="1">
                      <el-tag class="ml-2" type="success" size="large">{{
                        this.news_info.NewsFlashRegion
                      }}</el-tag>
                    </el-col>
                    <el-col span="1">
                      <el-tag class="ml-2" type="warning" size="large">{{
                        this.news_info.NewsFlashTag
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
          <div class="content_main">
            <p v-html="news_info.NewsFlashContent"></p>
          
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
    };
  },

  methods: {
    getParams() {
      this.news_id = this.$route.query.news_id;
      console.log("又回来了");
      console.log(this.$route.query.news_id);
    },
  },
  watch: {
    $route(to, from) {
      console.log(to.path);
      this.getParams();
      //在此处向服务器请求数据，给所需变量重新赋值
      axios({
        url: "newsflash/single" + "?newsflash_id=" + this.news_id,

        method: "get",
      })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          console.log(res.data.data);

          this.news_info = res.data.data;
          console.log(this.news_info);

          const xhrFile = new XMLHttpRequest();
          xhrFile.open("GET", this.news_info.NewsFlashContent, true);
          xhrFile.send();

          xhrFile.onload = () => {
            //res.data.data.blog_content=xhrFile.response;
            this.news_info.NewsFlashContent = xhrFile.response;
          };
          //this.news_info.NewsFlashDate.replace("T", " ");
        })
        .catch((errMsg) => {
          console.log(errMsg);
        });
    },
  },
  computed:{
    newsTime() {
      if (this.news_info.NewsFlashDate == "") {
        return "";
      } else {
        return this.news_info.NewsFlashDate;
      }
    },
  },
  created() {
    //在此处向服务器请求数据，初始化所需变量

    this.getParams();

    axios({
      url: "newsflash/single" + "?newsflash_id=" + this.news_id,

      method: "get",
    })
      .then((res) => {
        console.log(res);
        this.news_info = res.data.data;
        console.log(this.news_info);
        const xhrFile = new XMLHttpRequest();
          xhrFile.open("GET", this.news_info.NewsFlashContent, true);
          xhrFile.send();

          xhrFile.onload = () => {
            //res.data.data.blog_content=xhrFile.response;
            this.news_info.NewsFlashContent = xhrFile.response;
          };
          //this.news_info.NewsFlashDate.replace("T", " ");
        console.log("打印一下时间");
        console.log(typeof(this.news_info.NewsFlashDate)=='string');
        console.log(this.news_info.NewsFlashDate);
      })
      .catch((errMsg) => {
        console.log(errMsg);
      });
     
    axios({
      url: "newsflash/all",

      method: "get",
    })
      .then((res) => {
        console.log("test");
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
  min-height: 720px;
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
  white-space: pre-line;
  min-height: 500px;
}
</style>
