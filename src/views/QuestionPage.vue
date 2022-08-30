<!--
描述：问题页面
作者：王若晗 方新宇
-->
<template>
  <page-loading v-if="this.card_info.length == 0"></page-loading>
  <div class="common-layout">
    <el-container>
      <el-main>
        <el-card id="question" shadow="never">
          <el-row>
            <el-col :span="1"></el-col>
            <el-col :span="19">
              <el-row type="flex" align="middle">
                <el-col :span="2" style="margin-right: 7px">
                  <el-tag size="middle" class="ml-2" type="warning"
                    >悬赏金额：{{ this.question_info.question_reward }}</el-tag
                  >
                </el-col>
                <el-col
                  :span="2"
                  v-if="this.question_info.user_university != 'null'"
                >
                  <el-tag size="middle">{{
                    this.question_info.user_university
                  }}</el-tag>
                </el-col>
                <el-col
                  :span="2"
                  v-if="this.question_info.user_university != 'null'"
                >
                  <el-tag size="middle">{{
                    this.question_info.university_country
                  }}</el-tag>
                </el-col>
                <el-col
                  :span="2"
                  v-for="tag in this.question_info.question_tag"
                  :key="tag"
                  style="margin-right: -7px"
                >
                  <el-tag size="middle">{{ tag }}</el-tag>
                </el-col>
              </el-row>
              <el-row class="user_info">
                <el-col :span="2">
                  <el-avatar
                    shape="circle"
                    :size="50"
                    :src="this.question_info.user_profile"
                  />
                </el-col>
                <span class="user_name">
                  {{ this.question_info.user_name }}
                </span>
                <el-col id="user_identify" :span="2">
                  <el-tag
                    v-if="this.question_info.user_qualification != 'null'"
                    type="warning"
                    size="large"
                    >已认证:{{ this.question_info.user_university }}
                    {{ this.question_info.user_qualification }}</el-tag
                  >
                </el-col>
              </el-row>
              <el-row id="question_content"
                >问题：{{ this.question_info.question_title }}</el-row
              >
            </el-col>
            <el-col :span="4">
              <img src="../assets/question.png" style="height: 200px" />
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="1"></el-col>
            <el-col id="question_details" :span="20">
              <div v-if="notFull" style="text-align: left">
                问题摘要：{{ this.question_info.question_summary }}
              </div>
              <div v-if="!notFull" style="text-align: left">
                问题详情：
                <p v-html="this.question_info.question_description"></p>
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
            <el-col :span="2">
              <el-button
                type="primary"
                size="large"
                @click="goToWriteAnswerPage"
                >写回答</el-button
              >
            </el-col>
            <el-col :span="6"> </el-col>
            <el-col :span="4"> </el-col>
          </el-row>
        </el-card>
        <el-row class="bottom">
          <el-col :span="16">
            <el-card id="answer_card" shadow="never">
              <el-row style="margin-bottom: 30px">
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
                        :src="ans.UserProfile"
                      />
                    </el-col>
                    <span class="user_name">
                      {{ ans.UserName }}
                    </span>
                    <el-tag
                      type="primary"
                      size="normal"
                      style="margin-top: 5px; margin-left: 7px"
                      v-if="this.apply_id == ans.AnswerId"
                      >该问题已被题主采纳</el-tag
                    >
                    <el-tag
                      type="success"
                      size="normal"
                      style="margin-top: 5px; margin-left: 7px"
                      >{{ans.AnswerDate.replace("T", " ")}}</el-tag
                    >
                  </el-row>
                  <el-row id="answer_content">
                    {{ ans.AnswerSummary }}
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
                        @click="goToAnswerPage(ans.AnswerId)"
                        ><el-icon class="icon"><View /></el-icon>
                        查看详情>></el-button
                      >
                    </el-col>
                    <el-col
                      :span="2"
                      style="margin-top: -5px; margin-left: 70px"
                    >
                      <el-button
                        v-if="
                          this.apply_id == 0 &&
                          this.question_info.user_id ==
                            this.$store.state.user_info.user_id
                        "
                        type="success"
                        key="primary"
                        size="normal"
                        @click="adoptAnswer(ans.AnswerId)"
                        >采纳此回答<el-icon class="el-icon--right"
                          ><Check /></el-icon
                      ></el-button>
                    </el-col>
                    <el-col
                      :span="2"
                      style="margin-left: 70px"
                      v-if="
                        this.apply_id == 0 &&
                        this.question_info.user_id ==
                          this.$store.state.user_info.user_id
                      "
                    >
                      <like-button
                        content_type="2"
                        :content_id="ans.AnswerId"
                        :show_num="true"
                        size="large"
                        @giveLike="like"
                        @cancelLike="unLike"
                      />
                    </el-col>
                    <el-col :span="2" style="margin-left: -70px" v-else>
                      <like-button
                        content_type="2"
                        :content_id="ans.AnswerId"
                        :show_num="true"
                        size="large"
                        @giveLike="like"
                        @cancelLike="unLike"
                      />
                    </el-col>
                    <el-col :span="2">
                      <coin-button
                        content_type="1"
                        :content_id="ans.AnswerId"
                        :show_num="true"
                        size="large"
                        @giveCoin="coinIn"
                      />
                    </el-col>
                    <el-col :span="2" style="margin-left: 10px">
                      <el-row gutter="4">
                        <el-col :span="2">
                          <star-button
                            :content_id="ans.AnswerId"
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
    };
  },
  methods: {
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
        url: "question",
        method: "get",
        params: {
          question_id: this.question_id,
        },
      })
        .then((res) => {
          console.log("que", res.data.data);
          this.question_info = res.data.data;
          if (this.question_info.question_description.substr(0, 4) == "http") {
            const xhrFile = new XMLHttpRequest();
            xhrFile.open("GET", this.question_info.question_description, true);
            xhrFile.send();
            xhrFile.onload = () => {
              this.question_info.question_description = xhrFile.response;
            };
          }
        })
        .catch((err) => {
          console.log(err);
        });
      //回答信息
      axios({
        url: "question/answers",
        method: "get",
        params: {
          question_id: this.question_id,
        },
      })
        .then((res) => {
          this.answer_num = res.data.data.count;
          this.answer_info = res.data.data.answers;
          this.apply_id = res.data.data.apply;
          for (let i = 0; i < this.answer_info.length; ++i) {
            if (this.answer_info[i].AnswerId == this.apply_id) {
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
        url: "question/related",
        method: "get",
        params: {
          question_id: this.question_id,
        },
      })
        .then((res) => {
          console.log(res.data.data);
          this.related_question_tag = res.data.data.tag;
          this.question_relevant = res.data.data.related_questions;

          for (let i = 0; i < this.question_relevant.length; i++) {
            console.log("xiangguan");
            console.log(this.question_relevant[i]);
            var tem_info = {
              essence: "问题",
              content: this.question_relevant[i].QuestionTitle,
              keyword: res.data.data.tag,
              id: this.question_relevant[i].QuestionId,
            };
            this.card_info[i] = tem_info;
          }
          console.log("related que");
          console.log(this.card_info);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    adoptCheck() {
      axios
        .put("question/apply", {
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
  },
  computed: {
    answerShow: function () {
      if (this.answer_info.answer_content.length < 40) {
        return this.answer_info.answer_content;
      } else {
        return this.answer_info.answer_content.slice(0, 40) + "...";
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
  background: #f1f9ff;
  padding-left: 50px;
  padding-right: 50px;
}

.el-footer {
  background: #87a5c7;
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
  /* padding-top: 5px; */
  margin-top: -20px;
  padding-bottom: 5px;
  /* border-top: 0.8px solid black;
  border-bottom: 0.8px solid black; */
  font-size: 15px;
  color: grey;
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
</style>
