<!--
描述：动态详情页面
作者：焦佳宇
-->
<template>
  <page-loading v-if="blog_user_info == ''" />
  <div class="common-layout">
    <el-container>
      <el-aside width="400px">
        <user-info-board
          class="UserInfo"
          :blog_user_info="this.blog_user_info"
          v-if="blog_user_info != ''"
        ></user-info-board>
        <!-- <el-scrollbar max-height="75%" style="height:75%;margin-top:5%"  >
          <div v-for="blog in this.blog_relevant" :key="blog">
            <blog-info-board :blog_info="blog" class="BlogCard" />
          </div>
        </el-scrollbar> -->

        <div v-for="blog in this.blog_relevant" :key="blog">
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
                    <el-col span="1">
                      <el-tag class="ml-2" type="success" size="large">
                        {{ blog_detail.blog_tag }}
                      </el-tag>
                    </el-col>
                    <el-col span="1">
                      <el-tag class="ml-2" type="error" size="large">
                        <like-button
                          :content_id="this.$route.query.blog_id"
                          content_type="0"
                          :show_num="true"
                          size="large"
                        />
                      </el-tag>
                    </el-col>
                    <el-col span="1">
                      <el-tag class="ml-2" type="warning" size="large">
                        <coin-button
                          :content_id="this.$route.query.blog_id"
                          content_type="0"
                          :show_num="true"
                          size="large"
                        />
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
          <div class="content_main">
            <p>
              {{ this.blog_detail.blog_content }}
            </p>
            <img :src="this.blog_detail.blog_image" class="conten_image" />
          </div>
          <el-divider />
          <div>
            <comment-zone
            type="1"
            :id="this.$route.query.blog_id">
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
import PageLoading from "../components/PageLoading.vue";
import CommentZone from "../components/CommentZone.vue";
export default {
  components: {
    UserInfoBoard,
    BlogInfoBoard,
    LikeButton,
    CoinButton,
    PageLoading,
    CommentZone,
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
      /*在此处向服务器请求数据，初始化所需变量*/
      //博客用户
      axios.get("userinfo?user_id=" + this.$route.query.user_id).then((res) => {
        this.blog_user_info = res.data.data;
      });
      //相关博客
      axios
        .get("/blog/tag?num=3&tag=" + this.$route.query.blog_tag)
        .then((res) => {
          console.log(9898798789797);
          console.log(res.data.data.blog);
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
          this.blog_detail = res.data.data;
        })
        .catch((errMsg) => {
          console.log(errMsg);
        });
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
      if (this.blog_detail.blog_content.length < 12) {
        return this.blog_detail.blog_content;
      } else {
        return this.blog_detail.blog_content.slice(0, 12) + "...";
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
    console.log(this.$route.query);
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
  margin-bottom: 10%;
  white-space: pre-line;
  min-height: 500px;
}
.conten_image {
  margin-top: 2%;
  margin-bottom: 2%;
  width: 60%;
}
/* .comment_field {
} */
</style>
