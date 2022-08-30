<!--
描述：动态详情页面
作者：焦佳宇
-->
<template>
  <page-loading v-if="blog_user_info == ''" />
  <div class="common-layout" id="top">
    <el-container>
      <el-aside width="400px">
        <user-info-board
          class="UserInfo"
          :blog_user_info="this.blog_user_info"
          v-if="blog_user_info != ''"
        ></user-info-board>

        <div v-for="blog in this.blog_relevant.slice(0, 2)" :key="blog">
          <blog-info-board :blog_info="blog" class="BlogCard" />
        </div>
      </el-aside>
      <el-main>
        <div class="content_field">
          <div class="common-layout">
            <el-container>
              <el-aside width="75%">
                <div class="content_header">
                  <p class="title">{{ BlogTitle }}</p>

                  <el-row gutter="10" justify="center" style="width: 100%">
                    <el-col span="1">
                      <el-tag class="ml-2" type="primary" size="large">
                        {{ BlogTime }}
                      </el-tag>
                    </el-col>
                    <el-col
                      span="1"
                      v-for="tag in blog_detail.blog_tag"
                      :key="tag"
                    >
                      <el-tag class="ml-2" type="success" size="large">
                        {{ tag }}
                      </el-tag>
                    </el-col>
                  </el-row>
                </div>
              </el-aside>
              <el-main>
                <img src="../assets/drawing_blog.png" style="height: 80px" />
              </el-main>
            </el-container>
          </div>
          <el-divider />
          <div class="main_field">
            <div class="content_main">
              <p v-html="this.blog_detail.blog_content"></p>
            </div>
            <el-affix target=".main_field" position="bottom" :offset="0">
              <div class="option_bar">
                <el-row gutter="10">
                  <el-col :span="2">
                    <!-- <el-tag class="ml-2" type="info" size="large"> -->
                    <like-button
                      :content_id="this.$route.query.blog_id"
                      content_type="0"
                      :show_num="true"
                      size="large"
                    />
                    <!-- </el-tag> -->
                  </el-col>
                  <el-col :span="2">
                    <!-- <el-tag class="ml-2" type="warning" size="large"> -->
                    <coin-button
                      :content_id="this.$route.query.blog_id"
                      content_type="0"
                      :show_num="true"
                      size="large"
                    />
                    <!-- </el-tag> -->
                  </el-col>
                  <el-col :span="2" style="margin-left: 10px">
                    <el-row gutter="4">
                      <el-col :span="2">
                        <report-button
                          :content_id="this.$route.query.blog_id"
                          content_type="0"
                          size="large"
                          @reportResponse="reportResponse"
                        />
                      </el-col>
                      <span style="margin-left: 20px">举报</span>
                    </el-row>
                    <!-- </el-tag> -->
                  </el-col>
                  <el-col :span="2">
                    <!-- <el-tag class="ml-2" type="warning" size="large"> -->
                    <coin-button
                      :content_id="this.$route.query.blog_id"
                      content_type="0"
                      :show_num="true"
                      size="large"
                    />
                    <!-- </el-tag> -->
                  </el-col>
                  <el-col :span="14" style="text-align: right">
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      content="回到顶部"
                      placement="top"
                    >
                      <el-button
                        type="primary"
                        circle
                        size="small"
                        @click="goTop"
                        ><el-icon><ArrowUpBold /></el-icon></el-button
                    ></el-tooltip>
                  </el-col>
                </el-row>
              </div>
            </el-affix>
          </div>
          <el-divider />
          <div>
            <comment-zone type="1" :id="this.$route.query.blog_id">
            </comment-zone>
          </div>
          <!-- <div class="comment_field"></div> -->
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import UserInfoBoard from "../components/UserInfoBoard.vue";
import BlogInfoBoard from "../components/BlogInfoBoard.vue";
import axios from "axios";
import LikeButton from "../components/LikeButton.vue";
import CoinButton from "../components/CoinButton.vue";
import ReportButton from "../components/ReportButton.vue";
import PageLoading from "../components/PageLoading.vue";
import CommentZone from "../components/CommentZone.vue";
import { ElMessage } from "element-plus";
import { decode } from "../utils/base64";
export default {
  components: {
    UserInfoBoard,
    BlogInfoBoard,
    LikeButton,
    CoinButton,
    PageLoading,
    CommentZone,
    ReportButton,
    ElMessage,
  },
  data() {
    return {
      blog_user_info: "",
      blog_relevant: [],
      blog_detail: "",
    };
  },
  methods: {
    getData() {
      console.log(999);
      console.log(this.$route.query.blog_tag);
      /*在此处向服务器请求数据，初始化所需变量*/
      //博客用户
      axios.get("userinfo?user_id=" + this.$route.query.user_id).then((res) => {
        this.blog_user_info = res.data.data;
      });
      //相关博客
      console.log(this.$route.query.blog_tag);
      axios
        .get("/blog/tag?num=3&tag=" + this.$route.query.blog_tag)
        .then((res) => {
          this.blog_relevant = [].concat(
            res.data.data.blog.filter(
              (blog) => blog.BlogId != this.$route.query.blog_id
            )
          );
        })
        .catch((errMsg) => {
          console.log(errMsg);
        });
      //当前博客内容
      axios
        .get("/blog?blog_id=" + this.$route.query.blog_id)
        .then((res) => {
          console.log("res");
          console.log(res);
          this.blog_detail = res.data.data;
          const xhrFile = new XMLHttpRequest();
          xhrFile.open("GET", this.blog_detail.blog_content, true);
          xhrFile.send();

          xhrFile.onload = () => {
            //res.data.data.blog_content=xhrFile.response;
            this.blog_detail.blog_content = xhrFile.response;
            console.log("test", this.blog_detail.blog_content);
          };

          // this.blog_detail.blog_content = decode(this.blog_detail.blog_content);
        })
        .catch((errMsg) => {
          console.log(errMsg);
        });
    },
    goTop() {
      window.scrollTo(0, 0);
    },
    reportResponse(res) {
      if (res) {
        ElMessage({
          type: "success",
          message: "举报成功！",
          duration: 2000,
          showClose: true,
        });
      } else {
        ElMessage({
          type: "error",
          message: "举报失败！",
          duration: 2000,
          showClose: true,
        });
      }
    },
  },
  watch: {
    $route(to, from) {
      //监听相同路由下参数变化的时候，从而实现异步刷新
      this.blog_user_info = "";
      //重新获取数据
      this.getData();
    },
  },
  computed: {
    BlogTitle() {
      if (this.blog_detail == "") {
        return "";
      }
      if (this.blog_detail.blog_summary == "") {
        return "";
      }
      if (this.blog_detail.blog_summary.length < 12) {
        return this.blog_detail.blog_summary;
      } else {
        return this.blog_detail.blog_summary.slice(0, 12) + "...";
      }
    },
    BlogTime() {
      if (this.blog_detail == "") {
        return "";
      } else {
        return this.blog_detail.blog_date.replace("T", " ");
      }
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style scoped>
.UserInfo {
  margin-top: 20px;
  margin-left: 25px;
}
.BlogCard {
  margin-left: 25px;
  margin-top: 20px;
}
.content_field {
  background-color: white;
  min-height: 1216px;
  border-radius: 10px;
  margin-bottom: 30px;
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
.conten_image {
  margin-top: 2%;
  margin-bottom: 2%;
  width: 60%;
}
.option_bar {
  background-color: white;
  padding-bottom: 10px;
  padding-top: 10px;
  width: 92%;
  padding-left: 8%;
}
.el-divider--horizontal {
  margin-top: 5px;
}
/* .comment_field {
} */
</style>
