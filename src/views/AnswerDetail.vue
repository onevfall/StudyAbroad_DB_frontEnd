<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="400px">
        <user-info-board
          class="UserInfo"
          :blog_user_info="this.blog_user_info"
        ></user-info-board>
        <span>
          <side-card class="SideCard" :card_info="this.card_info[0]">
          </side-card>
        </span>
        <span>
          <side-card class="SideCard" :card_info="this.card_info[1]">
          </side-card>
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
    this.card_info = [
      {
        essence: "问题",
        content:
          "11近期上海再次暴发疫情,由KTV串联而成的疫情传播链不断扩散,已经导致近百人感染,大家需要提高自己的疫情防控意识",
        keyword: "疫情暴发,KTV,扩散",
        id: 1,
      },
      {
        essence: "问题",
        content:
          "22近期上海再次暴发疫情,由KTV串联而成的疫情传播链不断扩散,已经导致近百人感染,大家需要提高自己的疫情防控意识",
        keyword: "疫情暴发,KTV,扩散",
        id: 2,
      },
    ];
    // this.relate_question = {

    // };

    console.log(this.blog_user_info.user_profile);
  },
  activated() {
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
    this.card_info = [
      {
        essence: "问题",
        content:
          "11近期上海再次暴发疫情,由KTV串联而成的疫情传播链不断扩散,已经导致近百人感染,大家需要提高自己的疫情防控意识",
        keyword: "疫情暴发,KTV,扩散",
        id: 1,
      },
      {
        essence: "问题",
        content:
          "22近期上海再次暴发疫情,由KTV串联而成的疫情传播链不断扩散,已经导致近百人感染,大家需要提高自己的疫情防控意识",
        keyword: "疫情暴发,KTV,扩散",
        id: 2,
      },
    ];
    // this.relate_question = {

    // };
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
