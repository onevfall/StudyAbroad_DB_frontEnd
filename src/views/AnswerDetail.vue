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
          :blog_user_info="this.answer_user_info"
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
                    {{ this.question_infor.question_title }}
                  </p>
                  <el-row gutter="10" style="width: 100%">
                    <el-col span="1">
                      <el-tag class="ml-2" type="primary" size="large">
                        {{"提问时间: " + this.question_infor.question_date}}
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
              <el-avatar :src="this.answer_user_info.user_profile" size="large" />
              <span class="user_name"
                ><b>{{ this.answer_user_info.user_name }}</b></span
              >
              <el-tag class="ml-2" type="primary" size="large">{{
                "该问题已被题主采纳"
              }}</el-tag>
            </el-header>
            <el-main>
              <div class="content_main">
                {{ this.answer_infor.answer_content}}
              </div>
              <div style="float: left; margin-left: 3%">
                <el-button type="primary">
                  <div style="margin-right: 5px;">
                    赞同
                  </div>               
                  <like-button
                    content_type="2"
                    :content_id="this.answer_id"
                    :show_num="false"
                    size="large"
                    @giveLike="like"
                    @cancelLike="unlike"
                  />
                </el-button>
              </div>
            </el-main>
          </el-container>
          <el-divider />
          <el-container>
            <el-header class="header_comment">
              <el-col :span="1">
              <div v-if="this.$store.state.is_login">
                <el-avatar

                  :src="this.$store.state.user_info.user_profile"
                  :size="40"
                  class="header_img"
                />
              </div>
              <div v-else>
                <el-avatar
                  src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"   
                  :size="40"
                  class="header_img"
                />
              </div>
              </el-col>
              <el-input
                id="replyInput"
                v-model="comment_now"
                maxlength="128"
                show-word-limit
                class="reply_input"
                placeholder="评论点什么..."
                type="text"
                style="margin-left: 1%; margin-top: 5px; margin-right: 10px"
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
              <el-scrollbar v-if="this.comments.length !== 0" height="200px">
                <el-collapse accordion>
                <div v-for="(item, i) in this.comments" :key="i">    
                <comment-item :comment_infor="this.comments[i]">
                </comment-item>
                </div>
                </el-collapse>
              </el-scrollbar>
            </el-main>
          </el-container>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import UserInfoBoard from "../components/UserInfoBoard.vue";
import SideCard from "../components/SideCard.vue";
import LikeButton from "../components/LikeButton.vue";
import CommentItem from "../components/CommentItem.vue"
import axios from "axios";
import { ElMessage } from "element-plus";
import { UserFilled } from '@element-plus/icons-vue'
export default {
  components: {
    UserInfoBoard,
    SideCard,
    LikeButton,
    ElMessage,
    CommentItem,
    UserFilled,
  },
  data() {
    return {
      answer_user_info: "",
      answer_id:-1,
      answer_infor:"",
      question_id: -1,
      question_infor:"",
      card_info: [],
      comment_now: "",//当前正在输入的comment
      comments: [],//这个回答对应的下面的comment的全部信息
    };
  },
  watch: {
    $route() {
      this.initPage();
    },
  },
  async created() {
    //在此处向服务器请求数据，初始化所需变量
    await this.initPage();
  },
  methods: {
    async initPage(){
      this.answer_id = this.$route.query.answer_id;//获取本页的answer
      console.log("00")
      await axios.get('/answer',{
        params:{
          answer_id:this.answer_id,
        }
    })
      .then((res) => {
        if (res.data.status === true) {
          console.log(res.data.data);
          this.answer_infor = res.data.data;//获取answer全部内容
        } else {
          console.log("内容获取失败");
        }
      })
      .catch((err) => {
        console.log(err);
      });

      await axios.get('/userinfo',{
        params:{
          user_id:this.answer_infor.answer_user_id,
        }
      })
      .then((res) => {
        if (res.data.status === true) {
          console.log(res.data.data);
          this.answer_user_info = res.data.data;//获取answer_user_info全部内容 未验证过
        } else {
          console.log(res);
          console.log("11内容获取失败");
        }
      })
      .catch((err) => {
        console.log(err);
      });//给user_id为2的用户填充点信息
      // this.answer_user_info.user_signature = "向前奔跑，永远热爱";
      // console.log("111");
      // console.log(this.answer_user_info);

      this.question_id = this.$route.query.question_id;
      await axios.get('/question',{
        params:{
          question_id:this.question_id,
        }
      })
        .then((res) => {
          if (res.data.status === true) {
          console.log(res.data.data)
          this.question_infor = res.data.data;
          } else{
            console.log("内容获取失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
        console.log(this.answer_infor.answer_user_id);
    //   this.answer_user_info = {
    //   user_id: 1,
    //   user_email: "",
    //   user_phone: "17703561185",
    //   user_password: "",
    //   user_name: "用户17703561185",
    //   user_profile:
    //     "https://houniaoliuxue.oss-cn-shanghai.aliyuncs.com/user_profile/",
    //   user_createtime: "",
    //   user_birthday: "",
    //   user_gender: "",
    //   user_state: 1,
    //   user_signature: "精准与否，就是屠宰和手术的区别",
    //   user_follower: 0,
    //   user_follows: 0,
    //   user_level: 3,
    //   user_coin: 0,
    // };
    this.card_info = [{ id: 1 }, { id: 2 }];//暂时随便定两个卡片，获取卡片对应问题id的相关度算法后续写
    for (let i = 0; i < this.card_info.length; ++i) {
      await axios.get('/question',{
        params:{
          question_id:this.card_info[i].id,
        }
      })
        .then((res) => {
          if (res.data.status === true) {
            this.card_info[i].content = res.data.data.question_title;
            this.card_info[i].keyword = res.data.data.question_tag;
            this.card_info[i].essence = "问题";
          } else {
            console.log("内容获取失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    await axios.get('/answer/comment',{
      params:{
          answer_id:this.answer_id,
        }
    })
      .then((res) => {
        for (let i = 0; i < res.data.data.comment_list.length; ++i) {
          this.comments[i] = res.data.data.comment_list[i];
        }
      })
      .catch((err) => {
        console.log(err);
      });
    },
    sendComment() {
      if (this.$store.state.is_login == false) {
        //若未登录
        ElMessage({
          message: "请先登录",
          type: "warning",
          showClose: true,
          duration: 2000,
        });
        this.comment_now="";
        /**之后此处需记录当前页面路径，以便于登陆完成后跳转 */
        console.log(this.$route)
        this.$route.query.redirect = this.$route.fullPath;
        console.log(this.$route.query.redirect);
        this.$router.push("login");
      }
      else{

      }
      // 里面要写未登录状况下的跳转处理 以及跳转时对输入的保存？
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
