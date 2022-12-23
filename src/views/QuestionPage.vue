<!--
描述：问题页面
作者：王若晗 方新宇
-->
<template>
  <div class="common-layout" v-loading.fullscreen.lock="this.card_info.length == 0">
    <el-container>
      <el-main>
        <el-card id="question" shadow="never">
          <el-row>
            <el-col :span="1"></el-col>
            <el-col :span="19">
              <el-row type="flex" align="middle">
                <el-col :span="3">
                  <el-tag size="middle" class="ml-2" type="warning"
                    >悬赏金额：{{ this.question_info.questionReward }}</el-tag
                  >
                </el-col>
                <el-col
                  :span="2"
                  v-if="this.question_info.userUniversity != null"
                >
                  <el-tag size="middle">{{
                    this.question_info.userUniversity
                  }}</el-tag>
                </el-col>
                <el-col
                  :span="2"
                  v-if="this.question_info.userUniversity != null"
                >
                  <el-tag size="middle">{{
                    this.question_info.universityCountry
                  }}</el-tag>
                </el-col>
                <el-col
                  span="1"
                  v-for="tag in this.question_info.tagList"
                  :key="tag"
                >
                  <el-tag
                    type="success"
                    size="middle"
                    style="margin-right: 15px"
                    >{{ tag }}</el-tag
                  >
                </el-col>
              </el-row>
              <el-row class="user_info">
                <el-col :span="2">
                  <el-avatar
                    shape="circle"
                    :size="50"
                    :src="this.question_info.userProfile"
                    @click="goPersonSpace(this.question_info.questionUserId, $event)"
                    class="asker_profile"
                  />
                </el-col>
                <span class="user_name">
                  {{ this.question_info.userName }}
                </span>
                <el-col id="user_identify" :span="2">
                  <el-tag
                    v-if="this.question_info.userQualification != null&&this.question_info.userQualification != '未认证'"
                    type="warning"
                    size="large"
                    >已认证:{{ this.question_info.userUniversity }}
                    {{ this.question_info.userQualification }}</el-tag
                  >
                </el-col>
              </el-row>
              <el-row id="question_content"
                >问题：{{ this.question_info.questionTitle }}</el-row
              >
            </el-col>
            <el-col :span="4">
              <img src="../assets/question.png" style="height: 200px" />
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="1"></el-col>
            <el-col id="question_details" :span="20">
              <div v-if="notFull" style="text-align: left; margin-top: 5px">
                问题摘要：{{ this.question_info.questionSummary }}
              </div>
              <div v-if="!notFull" style="text-align: left; margin-top: 10px">
                问题详情：
                <p v-html="this.question_info.questionDescription"></p>
              </div>
            </el-col>
            <el-col class="expand" :span="3">
              <!--展开收起-->
              <el-button
                id="expand"
                type="info"
                text="info"
                @click="expandToFull"
                >{{ textStatus }}</el-button
              >
            </el-col>
          </el-row>
          <el-row class="question_tools">
            <el-col :span="1"></el-col>
            <el-col :span="2" style="margin-top: 3px">
              <!-- <star-button
                :content_id="this.question_info.question_id"
                content_type="2"
                :show_num="false"
                size="x-large"
              /> -->
              <button id="star" @click="changeStarStatus">
                <span style="font-weight: lighter">
                  {{ starQuestionMsg }}
                </span>
                <star-button
                  :content_id="this.question_info.questionId"
                  content_type="2"
                  :show_num="false"
                  size="x-large"
                  @giveStar="starResult"
                  @starChange="getStarStatus"
                  v-show="false"
                  ref="star_button"
                />
              </button>
            </el-col>
            <el-col :span="2" style="margin-top: 3.5px">
              <el-button
                type="primary"
                size="large"
                @click="goToWriteAnswerPage"
                plain
                >写回答</el-button
              >
            </el-col>

            <el-col :span="4"> </el-col>
            <el-col :span="4"> </el-col>
          </el-row>
        </el-card>
        <el-row class="bottom">
          <el-col :span="16">
            <el-card id="answer_card" shadow="never" style="min-height: 635px">
              <el-row style="margin-bottom: 20px; margin-top: 10px">
                {{ answer_num }}条回答
              </el-row>
              <el-divider />
              <div v-if="answer_num == 0">
                <img src="../assets/question-empty.png" style="width: 40%" />
                <div>暂时还没有任何回答，</div>
                <!-- <div @click="goToWriteAnswerPage" >开始写第一个回答</div> -->
                <div>
                  <el-button
                    type="primary"
                    key="primary"
                    size="large"
                    class="buttonClass"
                    text
                    @click="goToWriteAnswerPage"
                    >开始写第一个回答</el-button
                  >
                </div>
              </div>
              <div class="answer" v-for="ans in this.answer_info" :key="ans">
                <!-- <div @click="goToAnswerPage(ans.AnswerId)" class="answer_item"> -->
                <div class="answer_item">
                  <div style="height: 20px"></div>
                  <el-row>
                    <el-col :span="2">
                      <el-avatar
                        shape="circle"
                        :size="35"
                        :src="ans.userProfile"
                        @click="goPersonSpace(ans.answerUserId, $event)"
                        class="answer_profile"
                      />
                    </el-col>
                    <span class="user_name">
                      {{ ans.userName }}
                    </span>
                    <el-tag
                      type="primary"
                      size="normal"
                      style="margin-top: 5px; margin-left: 7px"
                      v-if="this.apply_id == ans.answerId"
                      >该问题已被题主采纳</el-tag
                    >
                    <el-tag
                      type="success"
                      size="normal"
                      style="margin-top: 5px; margin-left: 7px"
                      >{{ ans.answerDate.replace("T", " ") }}</el-tag
                    >
                  </el-row>
                  <el-row id="answer_content">
                    {{ ans.answerSummary }}
                  </el-row>
                  <el-row style="margin-top: 25px">
                    <el-col
                      :span="2"
                      style="margin-top: -5px; margin-left: 10px"
                    >
                      <el-button
                        type="primary"
                        key="primary"
                        size="normal"
                        @click="goToAnswerPage(ans.answerId)"
                        ><el-icon class="icon"><View /></el-icon>
                        查看详情>></el-button
                      >
                    </el-col>
                    <!-- <el-col :span="1"> </el-col> -->
                    <el-col
                      :span="2"
                      style="margin-top: -5px; margin-left: 70px"
                    >
                      <el-button
                        v-if="
                          this.apply_id == 0 &&
                          this.question_info.questionUserId ==
                            this.$store.state.user_info.user_id
                        "
                        type="success"
                        key="primary"
                        size="normal"
                        @click="adoptAnswer(ans.answerId)"
                        >采纳此回答<el-icon class="el-icon--right"
                          ><Check /></el-icon
                      ></el-button>
                    </el-col>
                    <el-col
                      :span="2"
                      style="margin-left: 70px"
                      v-if="
                        this.apply_id == 0 &&
                        this.question_info.questionUserId ==
                          this.$store.state.user_info.user_id
                      "
                    >
                      <like-button
                        content_type="2"
                        :content_id="ans.answerId"
                        :show_num="true"
                        size="large"
                        @giveLike="like"
                        @cancelLike="unLike"
                      />
                    </el-col>
                    <el-col :span="2" style="margin-left: -70px" v-else>
                      <like-button
                        content_type="2"
                        :content_id="ans.answerId"
                        :show_num="true"
                        size="large"
                        @giveLike="like"
                        @cancelLike="unLike"
                      />
                    </el-col>
                    <el-col :span="2">
                      <coin-button
                        content_type="1"
                        :content_id="ans.answerId"
                        :show_num="true"
                        size="large"
                        @giveCoin="coinIn"
                      />
                    </el-col>
                    <el-col :span="2" style="margin-left: 10px">
                      <el-row gutter="4">
                        <el-col :span="2">
                          <star-button
                            :content_id="ans.answerId"
                            content_type="1"
                            :show_num="false"
                            size="large"
                          />
                        </el-col>
                        <span style="margin-left: 20px; margin-top: 2px"
                          >收藏</span
                        >
                      </el-row>
                    </el-col>
                  </el-row>

                  <el-divider></el-divider>
                  <!-- <el-button class="card-button" @click="goToAnswerPage(ans.AnswerId)">去看看</el-button> -->
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8" class="aside_field">
            <el-affix :offset="5" target=".aside_field">
              <div
                class="card"
                v-for="ques in this.card_info.slice(0, 3)"
                :key="ques"
              >
                <question-side-card :card_info="ques"></question-side-card>
              </div>
            </el-affix>
          </el-col>
        </el-row>
      </el-main>
      <el-footer> </el-footer>
    </el-container>
    <el-dialog
      v-model="adopt_dialog_visible"
      title="采纳回答确认"
      width="30%"
      :before-close="handleClose"
    >
      <span style="font-size: 18px"
        >你确认要采纳此回答吗?一经采纳，无法撤销，且悬赏鸟币金额将直接送达被采纳用户账号</span
      >
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="adoptCheck">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import { ElMessage } from "element-plus";
import RelatedQuestion from "@/components/RelatedQuestion.vue";
import QuestionSideCard from "../components/QuestionSideCard.vue";
import LikeButton from "../components/LikeButton.vue";
import CoinButton from "../components/CoinButton.vue";
import StarButton from "../components/StarButton.vue";
import PageLoading from "../components/PageLoading.vue";
import axios from "axios";
export default {
  name: "QuestionPage",
  components: {
    ElMessage,
    RelatedQuestion,
    QuestionSideCard,
    LikeButton,
    CoinButton,
    PageLoading,
    StarButton,
  },
  data() {
    return {
      relevant_question_info: "", //相关问题
      question_relevant: [], //存储相关问题的信息
      question_info: "", //问题信息
      card_info: [], //卡片信息(用于传参)
      answer_info: [], //回答信息
      question_id: -1,
      answer_num: 0,
      related_question_tag: "",
      notFull: true,
      apply_answer_id: -1,
      adopt_dialog_visible: false,
      textStatus: "展开全文↓",
      is_stared: "",
    };
  },
  methods: {
    goPersonSpace(id, event) {
      this.$router.push({
        path: "/person_space",
        query: {
          host_id: id,
        },
      });
    },
    starResult(result) {
      if (result) {
        ElMessage({
          message: "收藏问题成功",
          type: "success",
        });
        this.is_stared = true;
      } else {
        ElMessage({
          message: "取消收藏问题成功",
          type: "success",
        });
        this.is_stared = false;
      }
    },
    // 用于改变关注状态
    changeStarStatus() {
      if (this.is_stared == false) {
        this.$refs.star_button.star();
      } else {
        this.$refs.star_button.unStar();
      }
    },
    // // 接收关注状态的改变的结果
    // resultOfStar(status) {
    //   if (status) {
    //     ElMessage({
    //       message: "关注问题成功",
    //       type: "success",
    //     });
    //     this.is_stared = true;
    //   } else {
    //     ElMessage({
    //       message: "关注问题失败",
    //       type: "warning",
    //     });
    //   }
    // },
    // resultOfUnstar(status) {
    //   alert(123123123)
    //   if (status) {
    //     ElMessage({
    //       message: "已取消关注问题",
    //       type: "success",
    //     });

    //     this.is_stared = false;
    //   } else {
    //     ElMessage({
    //       message: "取消关注失败",
    //       type: "warning",
    //     });
    //   }
    // },
    goToWriteAnswerPage: function () {
      /*加判断，若没登陆先登录，再导回此页面*/
      if (!this.$store.state.is_login) {
        ElMessage({
          message: "请先登录",
          type: "warning",
          showClose: true,
          duration: 2000,
        });
        /**之后此处需记录当前页面路径，以便于登陆完成后跳转 */
        this.$router.push({
          path: "/login",
          query: { redirect: this.$route.fullPath },
        });
      } else {
        this.$router.push({
          name: "answer_edit",
          params: {
            question_info: encodeURIComponent(
              JSON.stringify(this.question_info)
            ),
          },
        });
      }
    },
    expandToFull: function () {
      this.notFull = !this.notFull;
      if (this.notFull) {
        this.textStatus = "展开全文↓";
      } else {
        this.textStatus = "收起";
      }
    },
    goToAnswerPage: function (ans_id) {
      this.$router.push({
        name: "answer_detail",
        query: { answer_id: ans_id, question_id: this.question_id },
      });
    },
    adoptAnswer: function (ans_id) {
      this.applied_answer_id = ans_id;
      this.adopt_dialog_visible = true;
    },
    initPage: function () {
      this.question_id = this.$route.query.question_id;
      axios({
        url: "spring/qa/question",
        method: "get",
        params: {
          question_id: this.question_id,
        },
      })
        .then((res) => {
          this.question_info = res.data.data;
          this.apply_id = this.question_info.questionApply;
          if (this.question_info.questionDescription.substr(0, 4) == "http") {
            const xhrFile = new XMLHttpRequest();
            xhrFile.open("GET", this.question_info.questionDescription, true);
            xhrFile.send();
            xhrFile.onload = () => {
              this.question_info.questionDescription = xhrFile.response;
            };
          }
        })
        .catch((err) => {
          console.log(err);
        });
      //回答信息
      axios({
        url: "spring/qa/question/answers",
        method: "get",
        params: {
          question_id: this.question_id,
        },
      })
        .then((res) => {
          this.answer_num = res.data.data.length;
          this.answer_info = res.data.data;         
          for (let i = 0; i < this.answer_info.length; ++i) {
            if (this.answer_info[i].answerId == this.apply_id) {
              let tmp = this.answer_info[0];
              this.answer_info[0] = this.answer_info[i];
              this.answer_info[i] = tmp;
              break;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
      //相关问题
      axios({
        url: "spring/qa/question/related_questions/"+this.question_id,
        method: "get"
      })
        .then((res) => {
          this.related_question_tag = res.data.data.tags;
          this.question_relevant = res.data.data.relatedQuestions;
          for (let i = 0; i < this.question_relevant.length; i++) {
            var tem_info = {
              essence: "问题",
              content: this.question_relevant[i].questionTitle,
              keyword: res.data.data.tags,
              id: this.question_relevant[i].questionId,
            };
            this.card_info[i] = tem_info;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    adoptCheck() {
      axios
        .put("spring/qa/question/apply", {
          question_id: this.question_id,
          answer_id: this.applied_answer_id,
        })
        .then((res) => {
          if (res.data.status) {
            ElMessage.success("采纳此回答成功！");
            this.adopt_dialog_visible = false;
            this.initPage();
          }
        })
        .catch((err) => {
          console.log(err);
          ElMessage.error("采纳此回答失败！");
        });
    },
    handleClose() {
      this.applied_answer_id = -1;
      this.adopt_dialog_visible = false;
    },
    // 相应更改问题关注状态
    getStarStatus(status) {
      this.is_stared = status;
    },
  },
  computed: {
    answerShow: function () {
      if (this.answer_info.answer_content.length < 40) {
        return this.answer_info.answer_content;
      } else {
        return this.answer_info.answer_content.slice(0, 40) + "...";
      }
    },
    starQuestionMsg() {
      if (this.is_stared == false) {
        return "收藏问题";
      } else if (this.is_stared == true) {
        return "取消收藏";
      } else {
        return "Loading";
      }
    },
  },
  watch: {
    $route() {
      this.initPage();
    },
  },
  created() {
    //在此处向服务器请求数据，初始化所需变量
    //问题信息
    this.initPage();
  },
};
</script>

<style scoped>
.el-header {
  background: #87a5c7;
}
.el-main {
  /* background: #f1f9ff; */
  padding-left: 50px;
  padding-right: 50px;
}



.logo {
  height: 80px;
  margin-top: 10px;
}

.userInfo {
  margin-top: 10px;
}

.user_name {
  display: flex;
  align-items: center;
  font-family: SimSun;
  font-weight: bolder;
  font-size: large;
  margin-right: 10px;
}

#user_identify {
  display: flex;
  align-items: center;
}

.user_info {
  margin-top: 20px;
}

#question_content {
  display: flex;
  align-items: center;
  font-family: SimSun;
  font-weight: bolder;
  font-size: 50px;
  margin-left: 5px;
  margin-top: 18px;
  text-align: left;
}

#question_details {
  display: flex;
  align-items: center;
  font-family: SimSun;
  font-weight: bolder;
  font-size: 20px;
  padding-left: 10px;
  margin-top: 20px;
}

.expand {
  display: flex;
  align-items: center;
  padding-left: 10px;
}

.buttonClass {
  width: 100px;
  height: 40px;
  padding: 10px;
  /* //控制字大小 */
  /* /deep/  {
    font-size: 20px;
  } */
}

#expand {
  font-family: SimSun;
  font-size: 10px;
}

.question_tools {
  margin-top: 50px;
  margin-bottom: 30px;
}

.bottom {
  margin-top: 50px;
}

#question {
  margin-top: 30px;
}

#answer_card {
  margin-right: 20px;
  font-family: SimSun;
  font-weight: bolder;
  padding-left: 20px;
  padding-right: 20px;
}

.answer {
  margin-top: -20px;
  padding-bottom: 5px;
  /*border-top: 0.8px solid rgb(183, 183, 183);*/
  /*border-bottom: 0.8px solid rgb(183, 183, 183);*/
  font-size: 15px;
  color: grey;
  border-radius: 6px;
}

.card {
  margin-left: 29px;
  margin-bottom: 20px;
}

#answer_content {
  font-size: 20px;
  color: black;
  margin-top: 10px;
  padding-left: 10px;
  text-align: left;
}

/* 
.answer_item:hover {
  border-color: #08e472; /*为何无boarder
  box-shadow: 0 8px 36px 0 rgba(0, 0, 0, 0.25);
} */

.answer_item {
  margin-bottom: 15px;
}
.aside_field {
  margin-bottom: 100px;
}

#star {
  border: 2px solid #24b4fb;
  background-color: #24b4fb;
  border-radius: 0.4em;
  padding: 0.4em 0.9em 0.5em 0.9em;
  transition: all ease-in-out 0.2s;
  font-size: 16px;
}

#star span {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight: 600;
}

#star:hover {
  background-color: #0071e2;
}

.asker_profile:hover {
  box-shadow: 0 0 15px 10px #00000020;
}

.answer_profile:hover {
  box-shadow: 0 0 15px 10px #00000020;
}
</style>
