<!--
网站主页
描述：展示各板块信息
作者：张子涵
-->
<template>
  <section>
    <!--信息�?-->
    <div class="advise_board">
      <div class="lunbo" @mouseenter="clear" @mouseleave="run" @click="">
        <div class="intro_info">
          致力于提供海内外留学生有效交流的平台 <br /><span
            style="font-size: xx-large"
            >——候鸟留学</span
          >
        </div>
        <div class="img">
          <img :src="dataList[currentIndex]" alt="" />
        </div>
        <!--
      <div class="dooted" v-if="this.dataList.length">
        <ul class="doo">
          <li 
            v-for="(item, index) in this.dataList"
            :key="index"
            :class="{ current: currentIndex == index }"
            @click="gotoPage(index)"
          ></li>
        </ul>
      </div>
       
      <div class="right_turn turn" @click="next()">
        <i class="el-icon-arrow-right"></i>
      </div>
       
      <div class="left_turn turn " @click="up()">
        <i class="el-icon-arrow-left"></i>
      </div>
       -->
      </div>
    </div>

    <!--高校和机构-->
    <div>
      <el-container class="school_institution">
        <el-main width="50%">
          <div class="school_bg" @click="goSchoolCenter">
            <h1 class="school_title">——— 找对学校 ———</h1>
            <div class="school_img">
              <div class="school_text">去看看</div>
            </div>
          </div>
        </el-main>

        <el-aside width="50%">
          <div class="institution_bg" @click="goInstitutionCenter">
            <h1 class="institution_title">——— 留学顾问 ———</h1>
            <div class="institution_img">
              <div class="institution_text">去看看</div>
            </div>
          </div>
        </el-aside>
      </el-container>
    </div>
    <!--留学快讯-->
    <div class="news_bg">
      <h1 class="news_title">—— 留学快讯 ——</h1>
      <ul class="list">
        <li v-for="news in this.news_relevant" :key="news" class="list-item">
          <div class="common-layout2">
            <news-entry
              :news_flash_date="news.newsFlashDate"
              :news_flash_title="news.newsFlashTitle"
              :news_flash_region="news.newsFlashRegion"
              :news_flash_tag="news.newsFlashTag"
              :news_flash_summary="news.newsFlashSummary"
              :news_flash_id="news.newsFlashId"
              :news_flash_image="news.newsFlashImage"
              style="margin-bottom: 5px"
            ></news-entry>
          </div>
        </li>
      </ul>
      <el-button class="jump_to_detail" type="primary" @click="goNewsHome"
        >查看详情</el-button
      >
    </div>

    <!--最新动态-->

    <div class="blog_bg">
      <h1 class="blog_title">—— 留学动态 ——</h1>
      <div class="blog_field">
        <section class="content_field">
          <el-space warp :size="40">
            <div class="blog_card" v-for="blog in this.blog_list" :key="blog">
              <blog-info-board :blog_info="blog"></blog-info-board>
            </div>
          </el-space>
        </section>

        <el-button class="jump_to_detail" type="primary" @click="goBlog"
          >查看详情</el-button
        >
      </div>
    </div>

    <!--留学问答-->
    <div class="QA_bg">
      <h1 class="QA_title">—— 留学问答 ——</h1>
      <div class="QA_field">
        <el-row style="margin-top: 20px">
          <el-col
            :span="6"
            class="card-field"
            v-for="(ques,index) in this.question_time_info"
            :key="ques"
          >
            <question-card :question_info="ques" :question_num="index"></question-card>
          </el-col>
        </el-row>
        <el-button class="jump_to_detail" type="primary" @click="goQACenter"
          >查看详情</el-button
        >
      </div>
    </div>

    <el-button class="help" type="primary" plain @click="helpVisible = true">
          help me
    </el-button>

    <el-dialog 
      v-model="helpVisible"
      title="帮助页面"
      width="80%"
      :before-close="handleClose"
      draggable>
        <div style="float:left;text-align: left;font-size: medium;">&nbsp&nbsp&nbsp&nbsp 候鸟留学信息交流平台是一个面向留学问题，以准留学人群、留学生（学长）、留学机构为主要目标用户的留学信息整合交互系统。通过此系统，不仅能将最新留学资讯和关注的大学信息准确地推送到普通用户，而且为准留学生提供了一个与留学学长交流咨询、相互问答和查询联系周边机构的平台和机会。 
我们的项目包含几个完整的功能链：
<p>注册账号-输入手机号-接收并输入二维码-注册成功-登录</p>
<p>管理员发布快讯-用户浏览快讯</p>
<p>用户发布动态-管理员审核动态-用户点赞收藏评论动态-其他用户举报动态-管理员处理举报/用户</p>
<p>用户发布问题-管理员审核问题-用户回答问题-用户点赞收藏评论问题-提问用户采纳问题-其他用户举报问题-管理员处理举报/用户</p>
<p>管理员发布/修改高校机构信息-用户搜索高校机构-用户浏览高校机构信息</p>
<p>用户进入自己的个人空间-用户查看关注列表/粉丝列表/收藏列表/提问历史/回答历史/动态历史</p>
<p>用户进入自己的个人空间-鸟币充值-选择充值数额-跳转至支付宝沙盒</p>
<p>用户进入其他用户的空间-查看其他的用户的信息-关注其他用户</p>
        </div>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="helpVisible = false">quit<meta name="description" content=""></el-button>
        <!-- <el-button type="primary" @click="deleteCheck">确认</el-button> -->
      </span>
    </template>
    </el-dialog>

  </section>
</template>

<script>
import photo1 from "../assets/advisephoto1.png";
import BlogInfoBoard from "@/components/BlogInfoBoard.vue";
import QuestionCard from "../components/QuestionCard.vue";
import NewsEntry from "@/components/NewsEntry.vue";
import axios from "axios";

export default {
  components: {
    BlogInfoBoard,
    QuestionCard,
    NewsEntry,
},
  data() {
    return {
      dataList: [],
      currentIndex: 0, // 默认显示图片
      timer: null, // 定时

      //快讯
      news_info: "",
      news_relevant: [], //存储相关快讯信息

      //动态
      sort_type: 0, //0-时间 1-热度
      blog_list: [],

      //问答
      question_time_info: [],

      helpVisible:false,
      userManuel:"这么简单的系统，自己学吧你"
    };
  },
  created() {
    (this.dataList = [photo1, photo1]),
      this.run(),
      //快讯
      axios
        .get("spring/admin/newsflash/all?page=1&page_size=" + 6)
        .then((res) => {
          this.news_relevant = [].concat(res.data.data.newsflashs);
          this.news_relevant = this.news_relevant.slice(0, 3);
        })
        .catch((err) => {
          console.log(err);
        });

    //博客
    axios({
      url: "/spring/blog/list/time?num=6",
      method: "get",
    })
      .then((res) => {
        this.blog_list = [].concat(res.data.data.slice(0, 3));
      })
      .catch((errMsg) => {
        console.log(errMsg);
      });
    //问答
    axios({
      url: "spring/qa/question/list/time?page_size=5&page=1",
      method: "get",
    })
      .then((res) => {
        console.log(res.data.data);
        this.question_time_info = res.data.data.slice(0, 4);
        console.log(this.question_time_info)

      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    handleClose()
    {
      this.$confirm('确认关闭？')
        .then(_=>{
          this.helpVisible=false
          done();
        })
        .catch(_=>{});
      this.Visible=false;
    }, 
    goHome() {
      this.$router.push({ name: "home" });
    },
    goNewsHome() {
      this.$router.push({
        name: "newsHome",
      });
    },
    goBlog() {
      this.$router.push({
        name: "blog",
      });
    },
    goInstitutionCenter() {
      this.$router.push({
        name: "institution_center",
      });
    },
    goSchoolCenter() {
      this.$router.push({
        name: "school_center",
      });
    },
    goQACenter() {
      this.$router.push({
        name: "qa_center",
      });
    },

    //点击小圆圈切换图�?
    gotoPage(index) {
      this.currentIndex = index;
    },
    //下一副
    next() {
      if (this.currentIndex === this.dataList.length - 1) {
        this.currentIndex = 0;
      } else {
        this.currentIndex++;
      }
    },
    //上一福
    up() {
      if (this.currentIndex === 0) {
        this.currentIndex = this.dataList.length - 1;
      } else {
        this.currentIndex--;
      }
    },
    //清除定时
    clear() {
      clearInterval(this.timer);
    },
    // 定时
    run() {
      this.timer = setInterval(() => {
        this.next();
      }, 2000);
    },

    //快讯
    jumpToNewsPage(news) {
      this.$router.push({
        path: "news",
        query: {
          news_id: news.NewsFlashId,
        },
      });
    },
  },
};
</script>

<style scoped>
.advise_board .container {
  position: relative;
  height: 100%;
  width: 100%;
  margin: 0;
}

.advise_board ul li {
  float: left;
  width: 30px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  color: rgba(240, 238, 238, 0.8);
  font-size: 14px;
}

.advise_board .img {
  width: 100%;
  border: 1px solid gray;
}
.advise_board .img img {
  height: 100vh;
  width: 100%;
}
.advise_board .dooted {
  position: absolute;
  bottom: -20px;
  right: 0px;
}

.advise_board .turn {
  width: 30px;
  height: 30px;
  line-height: 20px;
  border-radius: 5px;
  cursor: pointer;
  background-color: #9d9d9d73;
}
.advise_board .right_turn {
  position: absolute;
  top: 100px;
  right: 0;
}
.advise_board .left_turn {
  position: absolute;
  top: 100px;
  left: 0;
}
.advise_board .current {
  color: gray;
}

.advise_board .intro_info {
  line-height: 100px;
  font-family: "宋体";
  text-align: left;
  position: absolute;
  left: 10%;
  top: 25%;
  color: aliceblue;
  font-size: xxx-large;
}

.school_bg {
  margin: 0 auto;
  border-radius: 5%;
  background-color: white;
  border: #9d9d9d73 1px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19);
  text-align: center;
  width: 96%;
  height: 48vw;
}

.school_bg:hover {
  background-color: whitesmoke;
}

.school_title {
  padding-top: 30px;
  font-family: "宋体";
  font-size: xxx-large;
}

.institution_bg {
  margin: 0 auto;
  border-radius: 5%;
  background-color: white;
  border: #9d9d9d73 1px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19);
  text-align: center;
  width: 96%;
  height: 48vw;
}

.institution_bg:hover {
  background-color: whitesmoke;
}
.institution_title {
  padding-top: 30px;
  font-family: "宋体";
  font-size: xxx-large;
}

.school_bg .school_img {
  background-image: url(../assets/school_main.jpeg);
  background-size:cover;
  background-position: 40% ;
  border-radius: 1%;
  margin: 0 auto;
  text-align: center;
  opacity: 50%;
  height: 70%;
  width: 80%;
}

.institution_bg .institution_img {
  background-image: url(../assets/institution_main.jpeg);
  background-size: cover;
  background-position: 50% ;
  border-radius: 1%;
  margin: 0 auto;
  text-align: center;
  opacity: 50%;
  height: 70%;
  width: 80%;
}

.school_bg .school_img .school_text {
  color: white;
  line-height: 60vh;
  font-size: 50px;
  filter: brightness(100%);
}

.institution_bg .institution_img .institution_text {
  color: white;
  line-height: 60vh;
  font-size: 50px;
  filter: brightness(100%);
}

/* 快讯 */
.news_bg {
  margin: 0 auto;
  border-radius: 2%;
  background-image: linear-gradient(rgb(99, 120, 217), #d3afa5);
  border: #9d9d9d73 1px;
  border-radius: 28px;
  box-shadow: 34px 34px 68px rgba(255, 255, 255, 0.2),
    -34px -34px 68px rgba(0, 0, 0, 0.19);
  text-align: center;
  width: 98%;
}

.news_title {
  padding-top: 30px;
  font-family: "宋体";
  font-size: xxx-large;
}

.el-button {
  color: #2277aa;

  font-weight: 500;
  font-size: 20px;
  border-radius: 4px;
}
.card-header2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  color: rgb(30, 23, 118);
}

.button3 {
  font-size: 10px;
  color: white;
}
.content_main {
  text-align: left;
}
.common-layout2 {
  margin-bottom: 5%;
}

.dateAuthor {
  font-size: 10px;
  margin-left: -10%;
}

.list {
  text-align: center;
  margin: 0 auto;
  width: 90%;
}

.list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 250px;
  border: black 1px;
}
.jump_to_detail {
  color: white;
  font-size: 24px;
  size: xxx-large;
  border-radius: 50px;
  position: relative;
  padding: 20px 48px;
  margin-bottom: 20px;
}

/*动态 */
.blog_bg {
  margin: 0 auto;
  border-radius: 2%;
  background-color: rgb(124, 178, 222);
  border: #9d9d9d73 1px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19);
  text-align: center;
  width: 98%;
}

.blog_title {
  padding-top: 30px;
  font-family: "宋体";
  font-size: xxx-large;
}

.blog_field {
  margin-top: 1%;
  margin-bottom: 3%;
  background-color: white;
  border-radius: 28px;
  background: #ecf5ff;
  box-shadow: 34px 34px 68px #dedfdf, -34px -34px 68px #ffffff;
}
.select_field {
  padding-top: 30px;
  font-weight: bolder;
  margin-left: 8%;
}
.content_field {
  margin-top: 2%;
  margin-left: 8%;
}
.blog_card {
  text-align: center;
  margin-bottom: 8%;
}
.el-space {
  display: flex;
  vertical-align: top;
  flex-wrap: wrap;
  flex-direction: row;
}

/* 问答  */

.QA_bg {
  margin: 0 auto;

  background-color: white;
  border: #9d9d9d73 1px;

  border-radius: 28px;
  box-shadow: 34px 34px 68px rgba(255, 255, 255, 0.2),
    -34px -34px 68px rgba(0, 0, 0, 0.19);
  text-align: center;
  width: 98%;
}

.QA_title {
  padding-top: 30px;
  font-family: "宋体";
  font-size: xxx-large;
}
.help{
  color: #b8b0b0;
  font-size:small;
  padding: 10px;
  background-color: #ffffff;
  position: fixed;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  bottom: 50px;
  right: -30px;
  outline: none;
  border-width: 5px;
  border-color: #d0674a;
}
.help:hover{
  border-color: #e64113;

  right: 10px;
}
</style>