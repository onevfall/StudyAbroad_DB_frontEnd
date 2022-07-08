<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="400px">
        <user-info-board
          class="UserInfo"
          :blog_user_info="this.blog_user_info"
        ></user-info-board>
        <span v-for="(card, index) in this.card_info" :key="card">
          <side-card class="SideCard" :card_info="this.card_info[index]"> </side-card>
        </span>
      </el-aside>
      <el-main>{{ this.answer_content }}</el-main>
    </el-container>
  </div>
</template>

<script>
import UserInfoBoard from "../components/UserInfoBoard.vue";
import SideCard from "../components/SideCard.vue";
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
          } else {
            console.log("内容获取失败");
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
      user_id: 9,
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
            console.log(this.card_info[i])
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
    console.log(this.blog_user_info.user_profile);
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
</style>
