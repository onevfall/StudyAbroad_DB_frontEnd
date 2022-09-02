<template>
  <el-button
    v-if="is_followed == false"
    type="primary"
    :style="{
      height: this.button_height + 'px',
      width: this.button_width + 'px',
      'font-size': this.button_fontsize + 'px',
    }"
    @click="follow"
    >关注<span
      :style="{ 'font-size': this.button_fontsize + 'px', 'margin-left': '8%' }"
      v-if="this.show_num == true"
    >
      {{ follow_num }}
    </span>
  </el-button>
  <el-button
    v-else
    type="primary"
    :style="{
      height: this.button_height + 'px',
      width: this.button_width + 'px',
      'font-size': this.button_fontsize + 'px',
    }"
    plain
    @click="unFollow"
    >已关注<span
      :style="{
        'font-size': this.button_fontsize + 'px',
        'margin-left': '8%',
      }"
      v-if="this.show_num == true"
    >
      {{ follow_num }}
    </span>
  </el-button>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";

export default {
  /*
    type: 0-用户、1-高校、2-机构
    object_id:要操作的对象的id
    show_num:是否显示数字，缺省false
    */
  props: [
    "object_type",
    "object_id",
    "button_height",
    "button_width",
    "button_fontsize",
    "show_num",
  ],
  components: {
    ElMessage,
  },
  data() {
    return {
      is_followed: false,
      dynamic_type: "",
      follow_num: 0,
    };
  },
  methods: {
    follow() {
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
        //若已登录
        if (
          this.object_type == 0 &&
          this.$store.state.user_info.user_id == this.object_id
        ) {
          //若自己关注自己则报错
          ElMessage({
            message: "不可以关注自己！",
            type: "warning",
            showClose: true,
            duration: 2000,
          });
        } else {
          axios
            .post("follow/" + this.dynamic_type, {
              user_id: this.$store.state.user_info.user_id,
              [this.dynamic_type + "_id"]: this.object_id,
            })
            .then((res) => {
              if (res.data.status) {
                this.is_followed = true;
                this.follow_num++;
                this.$emit("giveFollow", true, this.object_type);
              } else {
                this.$emit("giveFollow", false, this.object_type);
              }
            })
            .catch((errMsg) => {
              alert(
                "对id为" +
                  this.object_id +
                  "的" +
                  this.dynamic_type +
                  "关注，组件post请求失败"
              );
              console.log(errMsg);
            });
        }
      }
    },
    unFollow() {
      axios
        .put("follow/" + this.dynamic_type, {
          user_id: this.$store.state.user_info.user_id,
          [this.dynamic_type + "_id"]: this.object_id,
        })
        .then((res) => {
          if (res.data.status) {
            this.is_followed = false;
            this.follow_num--;
            this.$emit("cancelFollow", true, this.object_type);
          } else {
            this.$emit("cancelFollow", false, this.object_type);
          }
        })
        .catch((errMsg) => {
          alert(
            "取消对id为" +
              this.object_id +
              "的" +
              this.dynamic_type +
              "关注，组件put请求失败"
          );
          console.log(errMsg);
        });
    },
  },
  created() {
    //动态改变url
    switch (this.object_type) {
      case "0":
        this.dynamic_type = "follow_user";
        break;
      case "1":
        this.dynamic_type = "university";
        break;
      case "2":
        this.dynamic_type = "institution";
        break;
    }
    //查询是否已关注
    if (this.$store.state.is_login) {
      axios(
        "follow/" +
          this.dynamic_type +
          "?user_id=" +
          this.$store.state.user_info.user_id +
          "&" +
          this.dynamic_type +
          "_id=" +
          this.object_id
      )
        .then((res) => {
          this.follow_num = res.data.data.follow;
          this.is_followed = res.data.status;
        })
        .catch((errMsg) => {
          console.log(errMsg);
        });
    } else {
      //查询关注人数
      axios(
        "follow/" +
          this.dynamic_type +
          "?user_id=" +
          1 +
          "&" +
          this.dynamic_type +
          "_id=" +
          this.object_id
      )
        .then((res) => {
          this.follow_num = res.data.data.follow;
          this.is_followed = false;
        })
        .catch((errMsg) => {
          console.log(errMsg);
        });
    }
  },
};
</script>

<style></style>