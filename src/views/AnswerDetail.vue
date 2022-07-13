<!--
描述：回答详情界面——展示某个问题的回答、作者、及评论区等
作者：方新宇
-->
<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="400px" style="top: 0px">
        <user-info-board
          class="UserInfo"
          :blog_user_info="this.blog_user_info"
        ></user-info-board>
        <span v-for="(card, index) in this.card_info" :key="card">
          <side-card class="SideCard" :card_info="this.card_info[index]">
          </side-card>
        </span>
      </el-aside>
      <el-main width="main" style="margin-left: 10px">
        <div class="content_field">
          <div class="common-layout">
            <el-container>
              <el-aside style="width: 100%">
                <div class="content_header">
                  <p class="title">
                    <!-- {{ this.question_content }} -->
                    这个问题呢是这样的八八八
                  </p>
                  <el-row gutter="10" style="width: 100%">
                    <el-col span="1">
                      <el-tag class="ml-2" type="primary" size="large">
                        <!-- {{this.question_time}} -->
                        提出时间: 2022-07-07T23:07:08
                      </el-tag>
                    </el-col>
                  </el-row>
                </div>
              </el-aside>
              <!-- <el-main>
                <img src="../assets/drawing_news.png" style="height: 80px" />
              </el-main> -->
            </el-container>
          </div>
          <el-divider />
          <el-container>
            <el-header class="header_answercontent">
              <el-avatar :src="this.blog_user_info.user_profile" size="large" />
              <span class="user_name"
                ><b>{{ this.blog_user_info.user_name }}</b></span
              >
              <el-tag class="ml-2" type="primary" size="large">{{
                "该问题已被题主采纳"
              }}</el-tag>
            </el-header>
            <el-main>
              <div class="content_main">
                {{ this.answer_content }}
              </div>
              <div style="float: left; margin-left: 3%">
                <el-button type="primary">
                  赞同<el-icon class="el-icon--right"><CaretTop /></el-icon>
                </el-button>
              </div>
            </el-main>
          </el-container>
          <el-divider />
          <el-container>
            <el-header class="header_comment">
              <el-avatar
                :src="this.blog_user_info.user_profile"
                :size="40"
                class="header_img"
              />
              <!-- <el-avatar > user</el-avatar>           -->
              <el-input
                id="replyInput"
                v-model="comment_now"
                class="reply_input"
                placeholder="评论点什么..."
                type="text"
                @focus="btnShow = true"
                style="margin-left: 2%; margin-top: 5px; margin-right: 10px"
              />
              <el-button
                class="reply_btn"
                size="medium"
                @click="sendComment"
                type="primary"
                style="margin-top: 5px"
                >发表评论
              </el-button>
            </el-header>
            <el-main>
              <el-scrollbar
                v-if="this.comments.length!==0"
                height="200px">
                <div  v-for="(item,i) in this.comments" :key="i">
                <div class="author_title" >
                  <el-avatar
                    :src="item.UserProfile"
                    size="large"
                    class="header_img"
                  />
                  <span class="author_name"
                    ><b>{{ this.comments[i].UserName }}</b></span
                  ><br />
                  <!-- <span class="author_time">2019年9月16日 18:43</span> -->
                </div>
                <div style="text-align: left; margin-left: 10.5%">
                  {{this.comments[i].AnswerCommentContent}}
                </div>
                <div class="comment_button">
                  <el-icon style="color: #409eff"><CaretTop /></el-icon>
                  <span style="color: #409eff; margin-right: 2%">{{this.comments[i].AnswerCommentLike}}</span>
                  <el-icon style="color: #409eff"><CaretTop /></el-icon>
                  <span style="color: #409eff">111</span>
                </div>
                </div>
              </el-scrollbar>

              

              <!-- </div> -->
            </el-main>

            <!-- el-avatar的src需要改 -->
            <!-- <div class="reply_info"> -->

            <!-- <div
                  tabindex="0"
                  contenteditable="true"
                  id="replyInput"
                  spellcheck="false"
                  placeholder="输入评论..."
                  class="reply_input"
                  @focus="btnShow = true"
                  @input="onDivInput($event)"
                ></div> -->
            <!-- </div> -->
            <!-- <div class="reply_btn_box" v-show="sendReplybtn_show">
                <el-button
                  class="reply_btn"
                  size="medium"
                  @click="sendComment"
                  type="primary"
                  >发表评论</el-button
                >
              </div> -->
          </el-container>
        </div>

        <!-- <div v-clickoutside="hideReplyBtn" @click="inputFocus" class="my-reply"></div> -->
      </el-main>

      <!-- <el-main>{{ this.answer_content }}</el-main> -->
    </el-container>
  </div>
</template>

<script>
import UserInfoBoard from "../components/UserInfoBoard.vue";
import SideCard from "../components/SideCard.vue";
// import InfiniteList from "vue3-infinite-list";
import axios from "axios";
export default {
  components: {
    UserInfoBoard,
    SideCard,
  },
  data() {
    return {
      blog_user_info: "",
      card_info: [],
      answer_id: -1,
      answer_content: "",
      answer_time: "",
      question_id: -1,
      question_content: "",
      question_time: "",
      comment_now: "",
      sendReplybtn_show: false,
      comments: [],
    };
  },
  watch: {
    $route() {
      console.log(this.$route.query.id);
      this.answer_id = this.$route.query.id;
      axios({
        url: "http://43.142.41.192:6001/api/answer",
        params: {
          answer_id: this.answer_id,
        },
        method: "get",
      })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          if (res.data.status === true) {
            this.answer_content = res.data.data.answer_content;
            //this.answer_content ="中国社会科学院大学图书馆日前发文透露，近日，由于我校读者违规使用《Westlaw Classic法律在线》数据库，我校接到数据库商的通报，学校IP受到该数据库商永久封禁，影响数据库的正常使用。消息称，经网络中心和图书馆联合调查，确认为我校法学院2018级博士研究生邱波同学所为。数据库商提供数据显示：邱同学在2022年6月16日137分钟内下载842篇文献，6月17日137分钟内下载1736篇文献。此行为严重影响了我校师生正常的学习和科研秩序，也有损我校声誉。"+"称我校某IP地址在极短时间内连续下载了Westlaw数据库的2050个文档，已经构成超量下载。经查实，超量下载者为本校软件与微电子学院2015级硕士研究生黄某。"
            this.answer_time = res.data.data.answer_time;
          } else {
            console.log("内容获取失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      axios({
        url: "http://43.142.41.192:6001/api/question",
        params: {
          question_id: this.question_id,
        },
        method: "get",
      })
        .then((res) => {
          this.question_content = res.data.data.question_title;
          this.question_time = res.data.data.question_time;
        })
        .catch((err) => {
          console.log(err);
        });
      axios({
        url:"http://43.142.41.192:6001/api/answer/comment",
        params:{
          answer_id:this.answer_id,
        },
        method: "get",
      })
      .then((res) => {
        for(let i = 0; i <  res.data.data.comment_list.length; ++i)
        {
          this.comments[i]=res.data.data.comment_list[i];
          console.log(this.comments[i]);
        }
        })
        .catch((err) => {
          console.log(err);
        });
      //this.init_answer_detail();
    },
  },
  created() {
    //在此处向服务器请求数据，初始化所需变量
    console.log(this.$route.query.id);
    this.answer_id = this.$route.query.id;
    axios({
      url: "http://43.142.41.192:6001/api/answer",
      params: {
        answer_id: this.answer_id,
      },
      method: "get",
    })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        if (res.data.status === true) {
          this.answer_content = res.data.data.answer_content;
          console.log(this.answer_content);
        } else {
          console.log("内容获取失败");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    this.blog_user_info = {
      user_id: 1,
      user_email: "",
      user_phone: "17703561185",
      user_password: "",
      user_name: "用户17703561185",
      user_profile:
        "https://houniaoliuxue.oss-cn-shanghai.aliyuncs.com/user_profile/",
      user_createtime: "",
      user_birthday: "",
      user_gender: "",
      user_state: 1,
      user_signature: "精准与否，就是屠宰和手术的区别",
      user_follower: 0,
      user_follows: 0,
      user_level: 3,
      user_coin: 0,
    };
    this.card_info = [{ id: 1 }, { id: 2 }];
    for (let i = 0; i < this.card_info.length; ++i) {
      axios({
        url: "http://43.142.41.192:6001/api/question",
        params: {
          question_id: this.card_info[i].id,
        },
        method: "get",
      })
        .then((res) => {
          console.log(res);
          console.log("card info");
          console.log(this.card_info[i].id);
          console.log(res.data);
          if (res.data.status === true) {
            this.card_info[i].content = res.data.data.question_title;
            this.card_info[i].keyword = res.data.data.question_tag;
            this.card_info[i].essence = "问题";
            console.log(this.card_info[i]);
            // this.answer_content = res.data.data.answer_content;
            // console.log(this.answer_content);
          } else {
            console.log("内容获取失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    axios({
        url:"http://43.142.41.192:6001/api/answer/comment",
        params:{
          answer_id:this.answer_id,
        },
        method: "get",
      })
      .then((res) => {
        for(let i = 0; i <  res.data.data.comment_list.length; ++i)
        {
          this.comments[i]=res.data.data.comment_list[i];
          console.log(this.comments[i]);
        }
        })
        .catch((err) => {
          console.log(err);
        });
    console.log(this.blog_user_info.user_profile);
  },
  methods: {
    inputFocus() {
      var replyInput = document.getElementById("replyInput");
      replyInput.style.padding = "8px 8px";
      replyInput.style.border = "2px solid blue";
      replyInput.focus();
    },
    hideReplyBtn() {
      var replyInput = document.getElementById("replyInput");
      this.sendReplybtn_show = false;
      replyInput.style.padding = "10px";
      replyInput.style.border = "none";
    },
    onDivInput: function (e) {
      this.comment_now = e.target.innerHTML;
    },
    sendComment() {},
  },
};
</script>

<style scoped>
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

.header_comment .header_img {
  display: inline-block;
  vertical-align: top;
}
.author_title {
  text-align: left;
  margin-left: 3%;
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

/* .author_title .header_img{
   display:inline-block;
   vertical-align:top;
}
.author_title .author_info{
    display:inline-block;
    margin-left:5px;
    width:60%;
    height:40px;
    line-height:20px;
}

.author_title .author_info .author_name{
  color:#000;
  font-size:18px;
  font-weight:bold;
}
.author_title .author_info .author_time{
  color:#cabab0;
  font-size:14px;
} */
/* .header_comment .reply_input{
  margin-left: 3%;
  
}

.my_reply .reply_info {
  display: inline-block;
  margin-left: 5px;
  width: 90%;
}

.my_reply .reply_info .reply_input {
  min-height: 20px;
  line-height: 22px;
  padding: 10px 10px;
  color: #ccc;
  background-color: #fff;
  border-radius: 5px;
}

.my_reply .reply_btn_box {
  height: 25px;
  margin: 10px 0;
}
.my_reply .reply_btn_box .reply_btn {
  position: relative;
  margin-right: 15px;
  float: right;
} */
</style>
