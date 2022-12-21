<!--
描述：回答详情界面——展示某个问题的回答、作者、及评论区等
作者：方新宇
-->
<template>
  <div class="common-layout" v-loading.fullscreen.lock="this.card_info.length == 0 || !this.finish_load_html">
    <el-container>
      <el-aside width="400px" style="top: 0px" class="aside_field">
        <img src="../assets/question.png" style="height: 200px" />
        <el-affix :offset="5" target=".aside_field">
          <user-info-board
            class="UserInfo"
            :blog_user_info="this.answer_user_info"
            v-if="answer_user_info != ''"
          ></user-info-board>
          <span v-for="(card, index) in this.card_info.slice(0, 2)" :key="card">
            <question-side-card class="SideCard" :card_info="card">
            </question-side-card>
          </span>
        </el-affix>
      </el-aside>
      <el-main width="main" style="margin-left: 10px">
        <div class="content_field">
          <div class="common-layout">
            <el-container>
              <el-aside style="width: 100%">
                <div class="content_header">
                  <p class="title">
                    {{ this.question_infor.questionTitle }}
                  </p>
                  <el-row gutter="10" style="width: 100%">
                    <el-col span="1">
                      <el-tag class="ml-2" type="primary" size="large">
                        {{ "提问时间: " + this.questionTime }}
                      </el-tag>
                    </el-col>
                  </el-row>
                </div>
              </el-aside>
            </el-container>
          </div>
          <el-divider />
          <el-container>
            <el-header class="header_answercontent">
              <el-avatar
                :src="this.answer_user_info.user_profile"
                size="large"
              />
              <span class="user_name"
                ><b>{{ this.answer_user_info.user_name }}</b></span
              >
              <el-tag class="ml-2" type="primary" size="large" v-if="this.answer_infor.apply_flag">{{
                "该问题已被题主采纳"
              }}</el-tag>
            </el-header>
            <el-main>
              <div class="content_main">
                <p v-html="this.answer_infor.answerContent"></p>
                <!-- {{ this.answer_infor.answer_content }} -->
              </div>
              <!-- <div style="float: left; margin-left: 3%; display: flex">
                <div style="margin-right: 5px">赞同</div>
                <like-button
                  content_type="2"
                  :content_id="this.answer_id"
                  :show_num="false"
                  size="large"
                  @giveLike="like"
                  @cancelLike="unlike"
                />
                <div style="margin-left: 5px; margin-right: 6px">投币</div>
                <coin-button
                  content_type="1"
                  :content_id="this.answer_id"
                  :show_num="false"
                  size="large"
                  @giveCoin="coinIn"
                />
                <div style="margin-left: 6px; margin-right: 5px">举报</div>
                <report-button
                  content_type="1"
                  :content_id="this.answer_id"
                  size="large"
                  @reportResponse="reportResponse"
                />
              </div> -->
              <el-affix target=".content_main" position="bottom" :offset="0">
                <div class="option_bar">
                  <el-row gutter="10">
                    <el-col :span="2">
                      <!-- <el-tag class="ml-2" type="info" size="large"> -->
                      <like-button
                        :content_id="this.answer_id"
                        content_type="2"
                        :show_num="true"
                        size="large"
                        @giveLike="like"
                        @cancelLike="unlike"
                      />
                      <!-- </el-tag> -->
                    </el-col>
                    <el-col :span="2">
                      <!-- <el-tag class="ml-2" type="warning" size="large"> -->
                      <coin-button
                        :content_id="this.answer_id"
                        content_type="1"
                        :show_num="true"
                        size="large"
                        @giveCoin="coinIn"
                      />
                      <!-- </el-tag> -->
                    </el-col>
                    <el-col :span="2">
                      <!-- <el-tag class="ml-2" type="warning" size="large"> -->
                      <star-button
                        :content_id="this.answer_id"
                        content_type="1"
                        :show_num="true"
                        size="large"
                      />
                      <!-- </el-tag> -->
                    </el-col>
                    <el-col :span="2" style="margin-left: 10px">
                      <el-row gutter="4">
                        <el-col :span="2">
                          <report-button
                            :content_id="this.answer_id"
                            content_type="1"
                            size="large"
                            @reportResponse="reportResponse"
                          />
                        </el-col>
                        <span style="margin-left: 20px">举报</span>
                      </el-row>
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
            </el-main>
          </el-container>
          <el-divider />
          <div>
            <comment-zone type="0" :id="this.answer_id"> </comment-zone>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import UserInfoBoard from "../components/UserInfoBoard.vue";
import QuestionSideCard from "../components/QuestionSideCard.vue";
import LikeButton from "../components/LikeButton.vue";
import CoinButton from "../components/CoinButton.vue";
import StarButton from "../components/StarButton.vue";
import CommentItem from "../components/CommentItem.vue";
import CommentZone from "../components/CommentZone.vue";
import axios from "axios";
import ReportButton from "../components/ReportButton.vue";
import PageLoading from "../components/PageLoading.vue";
import { ElMessage } from "element-plus";
import { UserFilled } from "@element-plus/icons-vue";
export default {
  components: {
    UserInfoBoard,
    QuestionSideCard,
    LikeButton,
    ElMessage,
    CommentItem,
    UserFilled,
    CoinButton,
    CommentZone,
    ReportButton,
    PageLoading,
    StarButton,
},
  data() {
    return {
      answer_user_info: "",
      answer_id: -1,
      answer_infor: "",
      question_id: -1,
      question_infor: "",
      card_info: [],
      comment_now: "", //当前正在输入的comment
      comments: [], //这个回答对应的下面的comment的全部信息
      finish_load_html: false,
    };
  },
  watch: {
    $route() {
      //得与路由跳转前进行综合 beforeRouteEnter 未改 可能不需要
      this.initPage();
    },
  },
  computed: {
    questionTime() {
      if (this.question_infor == "") return " ";
      else return this.question_infor.questionDate.replace("T", " ");
    },
  },
  created() {
    //在此处向服务器请求数据，初始化所需变量
    this.initPage();
  },
  methods: {
    async reloadAnswer() {
      axios
        .get("/test/answer", {
          params: {
            answer_id: this.answer_id,
          },
        })
        .then((res) => {
          if (res.data.status === true) {
            console.log(res.data.obj);
            this.answer_infor = res.data.obj; //获取answer全部内容
            if (this.answer_infor.answerContent.substr(0, 4) == "http") {
            const xhrFile = new XMLHttpRequest();
            xhrFile.open("GET", this.answer_infor.answerContent, true);
            xhrFile.send();
            xhrFile.onload = () => {
              this.answer_infor.answerContent = xhrFile.response;
              this.finish_load_html = true;
            };
          }
          } else {
            console.log("内容获取失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async initPage() {
      this.answer_id = this.$route.query.answer_id; //获取本页的answer
      //this.answer_user_info = this.$store.state.answer_user_info;
      // console.log(this.$store.state.answer_user_info);
      // console.log(this.answer_user_info);
      console.log("00");

      await axios
        .get("/test/answer", {
          params: {
            answer_id: this.answer_id,
          },
        })
        .then((res) => {
          if (res.data.status === true) {
            console.log(res.data.obj);
            this.answer_infor = res.data.obj; //获取answer全部内容
          } else {
            console.log("内容获取失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      // await console.log(this.answer_info)
      // console.log("获取答案信息")
      await this.reloadAnswer(); //先获取answer infor
      axios
        .get("/api/userinfo", {
          params: {
            user_id: this.answer_infor.answerUserId,
          },
        })
        .then((res) => {
          if (res.data.status === true) {
            // console.log("`23131243")
            // console.log(res.data.data);
            // const store = from.matched[0].instances.default.$store;
            // console.log(store);
            // store.commit("ChangeAnswerUserInfo", res.data.data);
            // next(true); //获取answer_user_info全部内容 未验证过
            this.answer_user_info = res.data.data;
            console.log("获取用户信息");
          } else {
            console.log(res);
            console.log("11内容获取失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      // console.log("体外");
      // console.log(this.answer_user_info);
      this.question_id = this.$route.query.question_id;
      axios
        .get("/test/question", {
          params: {
            question_id: this.question_id,
          },
        })
        .then((res) => {
          if (res.data.status === true) {
            console.log(res.data.obj);
            this.question_infor = res.data.obj;
          } else {
            console.log(res.data);
            console.log("内容获取失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get("/api/question/related", {
          params: {
            question_id: this.question_id,
          },
        })
        .then((res) => {
          console.log(res.data.data);
          this.related_question_tag = res.data.data.tag;
          this.question_relevant = res.data.data.related_questions;
          for (let i = 0; i < this.question_relevant.length; i++) {
            var tem_info = {
              essence: "问题",
              content: this.question_relevant[i].QuestionTitle,
              keyword: res.data.data.tag,
              id: this.question_relevant[i].QuestionId,
            };
            this.card_info[i] = tem_info;
          }
          console.log(this.card_info);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goTop() {
      window.scrollTo(0, 0);
    },
    handleChange(val) {
      console.log(val);
    },
    like(res) {
      if (res) {
        ElMessage({
          type: "success",
          message: "点赞成功！",
          duration: 2000,
          showClose: true,
        });
        this.answer_infor.answerLike += 1;
      } else {
        ElMessage({
          type: "error",
          message: "点赞失败！",
          duration: 2000,
          showClose: true,
        });
      }
    },
    unlike(res) {
      if (res) {
        ElMessage({
          type: "success",
          message: "取消点赞成功！",
          duration: 2000,
          showClose: true,
        });
        this.answer_infor.answerLike -= 1;
      } else {
        ElMessage({
          type: "error",
          message: "取消点赞失败！",
          duration: 2000,
          showClose: true,
        });
      }
    },
    coinIn(res) {
      if (res) {
        ElMessage({
          type: "success",
          message: "投币成功！",
          duration: 2000,
          showClose: true,
        });
        this.answer_infor.answerCoin += 1;
      }
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
};
</script>

<style scoped>
.common-layout {
  margin-bottom: 40px;
}
.UserInfo {
  margin-top: 20px;
  margin-left: 25px;
}
.SideCard {
  margin-top: 20px;
  margin-left: 25px;
}
.content_field {
  background-color: white;
  min-height: 720px;
  border-radius: 10px;
}
.content_field .content_main {
  min-height: 150px;
  text-align: left;
  margin-left: 3.5%;
}

.title {
  font-size: xx-large;
  color: #409eff;
  font-family: SimSun;
  font-weight: bolder;
  margin-bottom: 15px;
}

.content_header {
  width: 80%;
  text-align: left;
  margin-left: 5%;
}

.header_answercontent {
  text-align: left;
  margin-left: 3%;
  display: flex;
  align-items: center;
}

.header_answercontent .user_name {
  margin-left: 2%;
  margin-right: 3%;
}

.my_reply {
  padding: 10px;
  background-color: #fafbfc;
}

.my_reply .header_img {
  display: inline-block;
  vertical-align: top;
  border-radius: 50%;
}

.header_comment {
  text-align: center;
  margin-left: 3%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.thor_title {
  text-align: left;
  margin-left: 7%;
  display: flex;
  align-items: center;
}
.author_title .author_name {
  display: inline-block;
  margin-left: 2%;
}
.comment_button {
  text-align: center;
  margin-left: 3%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.option_bar {
  background-color: white;
  padding-bottom: 10px;
  padding-top: 10px;
  width: 92%;
  padding-left: 2%;
}
.aside_field {
  margin-bottom: 50px;
}
</style>
