<!--
描述：收藏按钮组件
作者：焦佳宇
-->

<template>
  <div>
    <span
      style="text-align: left; margin-right: 8px"
      v-if="is_stared== false"
    >
      <img
        src="../assets/star.png"
        :style="{ height: this.icon_size + 'px' }"
        @click="star"
      />
    </span>
    <span
      style="text-align: left; margin-right: 8px"
      v-else
    >
      <img
        src="../assets/star_solid.png"
        :style="{ height: this.icon_size + 'px' }"
        @click="unStar"
      />
    </span>
    <span
      :style="{ 'text-align': 'left', 'font-size': this.size }"
      v-if="this.show_num == true"
    >
      {{ star_nums }}
    </span>
  </div>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";
export default {
  /*
    type: 0-动态、1-回答、2-提问
    content_id:要操作的内容的id
    show_num:是否展示数字
    size:尺寸
    */
  props: ["content_type", "content_id", "show_num", "size"],
  components: {
    ElMessage,
  },
  data () {
    return {
      url: "",
      is_stared: false,
      dynamic_type: "",
      icon_size: 0,
      star_nums: 0
    };
  },
  watch: {
    is_stared () {
      this.$emit("starChange", this.is_stared);
    },
  },
  methods: {
    star () {
      //判断是否登录
      if (this.$store.state.is_login == false) {
        //若未登录
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
        axios
          .post(this.url + "/star?user_id=" + this.$store.state.user_info.user_id + "&" +
            this.dynamic_type + "_id=" + this.content_id)
          .then((res) => {
            console.log(res);
            if (res.data.status) {
              this.is_stared = true;
              this.star_nums++;
              this.$emit("giveStar", true);
            } else {
              // this.$emit("giveStar", false);
            }
          })
          .catch((errMsg) => {
            alert(
              "对id为" +
              this.content_id +
              "的" +
              this.dynamic_type +
              "收藏，相关API此时未完成"
            );
            console.log(errMsg);
          });
      }
    },
    unStar () {
      axios
        .post(this.url + "/unstar?user_id=" + this.$store.state.user_info.user_id + "&" +
          this.dynamic_type + "_id=" + this.content_id)
        .then((res) => {
          if (res.data.status) {
            this.is_stared = false;
            this.star_nums--;
            this.$emit("giveStar", false);
          } else {
            // this.$emit("cancelStar", false);
          }
        })
        .catch((errMsg) => {
          alert(
            "取消对id为" +
            this.content_id +
            "的" +
            this.dynamic_type +
            "收藏，相关API此时未完成"
          );
          console.log(errMsg);
        });
    },
  },
  // 用update效率低，但简便，日后迭代需要优化此处
  updated () {
    console.log("update!!!");
    if (this.$store.state.is_login) {
      axios
        .get(
          this.url +
          "/star?user_id=" +
          this.$store.state.user_info.user_id +
          "&" +
          this.dynamic_type +
          "_id=" +
          this.content_id
        )
        .then((res) => {
          console.log(res);
          this.star_nums = res.data.data.star_nums;
          this.is_stared = res.data.data.status;
        })
        .catch((errMsg) => {
          console.log(errMsg);
        });
    } else {
      //查询收藏个数
      axios
        .get(
          this.url +
          "/star?user_id=" +
          1 +
          "&" +
          this.dynamic_type +
          "_id=" +
          this.content_id
        )
        .then((res) => {
          this.star_nums = res.data.data.star_nums;
          this.is_stared = false;
        })
        .catch((errMsg) => {
          console.log(errMsg);
        });
    }
  },
  created () {
    //设定大小
    switch (this.size) {
      case "xx-small":
        this.icon_size = 9;
        break;
      case "x-small":
        this.icon_size = 10;
        break;
      case "small":
        this.icon_size = 12;
        break;
      case "normal":
        this.icon_size = 14;
        break;
      case "large":
        this.icon_size = 17;
        break;
      case "x-large":
        this.icon_size = 24;
        break;
      case "xx-large":
        this.icon_size = 30;
        break;
    }
    //动态改变url
    switch (this.content_type) {
      case "0":
        this.dynamic_type = "blog";
        this.url = "spring/blog";
        break;
      case "1":
        this.dynamic_type = "answer";
        this.url="/spring/qa/answer"
        break;
      case "2":
        this.dynamic_type= "question"
        this.url="/spring/qa/question"
    }
    
    //查询是否收藏
    if (this.$store.state.is_login) {
      axios
        .get(
          this.url +
          "/star?user_id=" +
          this.$store.state.user_info.user_id +
          "&" +
          this.dynamic_type +
          "_id=" +
          this.content_id
        )
        .then((res) => {
          this.star_nums = res.data.data.star_nums;
          this.is_stared = res.data.data.status;
        })
        .catch((errMsg) => {
          console.log(errMsg);
        });
    } else {
      //查询收藏个数
      axios
        .get(
          this.url +
          "/star?user_id=" +
          1 +
          "&" +
          this.dynamic_type +
          "_id=" +
          this.content_id
        )
        .then((res) => {
          this.star_nums = res.data.data.star_nums;
          this.is_stared = false;
        })
        .catch((errMsg) => {
          console.log(errMsg);
        });
    }
  },
};
</script>

<style></style>