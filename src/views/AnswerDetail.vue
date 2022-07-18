<!--
描述：回答详情界面——展示某个问题的回答、作者、及评论区等
作者：方新宇
-->
<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="400px" style="top: 0px">
        <img src="../assets/question.png" style="height: 200px" />
        <user-info-board
          class="UserInfo"
          :blog_user_info="this.answer_user_info"
          v-if="answer_user_info != ''"
        ></user-info-board>
        <span v-for="(card, index) in this.card_info" :key="card">
          <question-side-card
            class="SideCard"
            :card_info="this.card_info[index]"
          >
          </question-side-card>
        </span>
      </el-aside>
      <el-main width="main" style="margin-left: 10px">
        <div class="content_field">
          <div class="common-layout">
            <el-container>
              <el-aside style="width: 100%">
                <div class="content_header">
                  <p class="title">
                    {{ this.question_infor.question_title }}
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
              <el-tag class="ml-2" type="primary" size="large">{{
                "该问题已被题主采纳"
              }}</el-tag>
            </el-header>
            <el-main>
              <div class="content_main">
                {{ this.answer_infor.answer_content }}
              </div>
              <!-- <div style="float: left; margin-left: 3%"> 事件穿透想不通 直接换文字了
                <el-button type="" link style="pointer-events: none">
                  <div style="margin-right: 5px">赞同</div>
                  <like-button
                    content_type="2"
                    :content_id="this.answer_id"
                    :show_num="false"
                    size="large"
                    @giveLike="like"
                    @cancelLike="unlike"
                    style="pointer-events: auto"
                  />
                </el-button>
                <el-button type="" link style="pointer-events: none">
                  <div style="margin-right: 5px">投币</div>
                  <coin-button
                    content_type="1"
                    :content_id="this.answer_id"
                    :show_num="false"
                    size="large"
                    @giveCoin="coinIn"
                    style="pointer-events: auto"
                  />
                </el-button>
              </div> -->
              <div style="float: left; margin-left: 3%; display: flex">
                <div style="margin-right: 5px">赞同</div>
                <like-button
                  content_type="2"
                  :content_id="this.answer_id"
                  :show_num="false"
                  size="large"
                  @giveLike="like"
                  @cancelLike="unlike"
                />
                <div style="margin-left: 5px; margin-right: 5px">投币</div>
                <coin-button
                  content_type="1"
                  :content_id="this.answer_id"
                  :show_num="false"
                  size="large"
                  @giveCoin="coinIn"
                />
              </div>
            </el-main>
          </el-container>
          <el-divider />
          <div>
            <comment-zone
            type="0"
            :id="this.answer_id">
            </comment-zone>
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
import CommentItem from "../components/CommentItem.vue";
import CommentZone from "../components/CommentZone.vue"
import axios from "axios";
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
      // comment_change: false,
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
      else return this.question_infor.question_date.replace("T", " ");
    },
  },
  created() {
    //在此处向服务器请求数据，初始化所需变量
    this.initPage();
  },
  // beforeRouteEnter(to, from, next) {
  //   console.log("qqqqqq");
  //   console.log(to);
  //   console.log(from);
  //   console.log(to.query.answer_id);
  //   axios
  //     .get("/answer", {
  //       params: {
  //         answer_id: to.query.answer_id,
  //       },
  //     })
  //     .then((res) => {
  //       if (res.data.status === true) {
  //         console.log(res.data.data.answer_user_id);
  //         axios
  //           .get("/userinfo", {
  //             params: {
  //               user_id: res.data.data.answer_user_id,
  //             },
  //           })
  //           .then((res) => {
  //             if (res.data.status === true) {
  //               console.log(res.data.data);
  //               const store = from.matched[0].instances.default.$store;
  //               console.log(store);
  //               store.commit("ChangeAnswerUserInfo", res.data.data);
  //               next(true); //获取answer_user_info全部内容 未验证过
  //             } else {
  //               console.log(res);
  //               console.log("11内容获取失败");
  //             }
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //           });
  //       } else {
  //         console.log("内容获取失败");
  //       }
  //     });
  // },
  methods: {
    async reloadAnswer() {
      axios
        .get("/answer", {
          params: {
            answer_id: this.answer_id,
          },
        })
        .then((res) => {
          if (res.data.status === true) {
            // console.log(res.data.data);
            this.answer_infor = res.data.data; //获取answer全部内容
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
      //await this.reloadAnswer();//先获取answer infor
      await axios
        .get("/answer", {
          params: {
            answer_id: this.answer_id,
          },
        })
        .then((res) => {
          if (res.data.status === true) {
            // console.log(res.data.data);
            this.answer_infor = res.data.data; //获取answer全部内容
          } else {
            console.log("内容获取失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      // await console.log(this.answer_info)
      // console.log("获取答案信息")
      axios
        .get("/userinfo", {
          params: {
            user_id: this.answer_infor.answer_user_id,
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
      console.log("体外");
      console.log(this.answer_user_info);
      this.question_id = this.$route.query.question_id;
      axios
        .get("/question", {
          params: {
            question_id: this.question_id,
          },
        })
        .then((res) => {
          if (res.data.status === true) {
            console.log(res.data.data);
            this.question_infor = res.data.data;
          } else {
            console.log(res.data);
            console.log("内容获取失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get("question/related", {
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
              keyword: res.data.data.tag.split(","),
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
      } else {
        ElMessage({
          type: "error",
          message: "点赞失败！",
          duration: 2000,
          showClose: true,
        });
      }
    },
    unLike(res) {
      if (res) {
        ElMessage({
          type: "success",
          message: "取消点赞成功！",
          duration: 2000,
          showClose: true,
        });
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
</style>
