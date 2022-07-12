<!--
描述：动态卡片组件
作者：焦佳宇
-->
<template>
  <el-card :body-style="{ padding: '0px' }" class="blog_card">
    <div class="image_field">
      <img class="card_image" :src="this.blog_image" />
    </div>

    <div style="padding: 14px">
      <section class="card_info">
        <el-row gutter="10" justify="left">
          <el-col span="1">
            <el-tag class="ml-2" type="success" size="small">{{
              blog_info.BlogTag
            }}</el-tag>
          </el-col>
          <el-col span="1">
            <el-tag class="ml-2" size="small">{{ blogTime }}</el-tag>
          </el-col>
        </el-row>
      </section>
      <section class="card_content">
        {{ blogSummary }}
      </section>
      <section class="card_user">
        <el-row gutter="10" align="middle">
          <el-col :span="2">
            <el-avatar :src="this.user_info.user_profile" size="small" />
          </el-col>
          <el-col :span="12" style="text-align: left">
            <span class="user_name"> {{ this.user_info.user_name }} </span>
          </el-col>
          <el-col :span="5">
            <like-button
              content_type="0"
              :content_id="blog_info.BlogId"
              :show_num="true"
              size="normal"
              @giveLike="like"
              @cancelLike="unLike"
            />
          </el-col>
          <el-col :span="5">
            <coin-button
              content_type="0"
              :content_id="blog_info.BlogId"
              :show_num="true"
              size="normal"
              @giveCoin="coinIn"
            />
          </el-col>
       
        </el-row>
      </section>
    </div>
  </el-card>
</template>

<script>
import axios from "axios";
import LikeButton from "../components/LikeButton.vue";
import CoinButton from "../components/CoinButton.vue";
import { ElMessage } from "element-plus";

export default {
  components: {
    LikeButton,
    CoinButton,
    ElMessage,
  },
  props: ["blog_info"],
  computed: {
    blogTime() {
      return this.blog_info.BlogDate.replace("T", " ");
    },
    blogSummary() {
      if (this.blog_info.BlogSummary.length < 12) {
        return this.blog_info.BlogSummary;
      } else {
        return this.blog_info.BlogSummary.slice(0, 12) + "...";
      }
    },
  },
  data() {
    return {
      user_info: "",
      blog_image: "",
    };
  },
  methods: {
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
    coinIn(res){
      if(res){
        ElMessage({
          type: "success",
          message: "投币成功！",
          duration: 2000,
          showClose: true,
        });
      }
    }
  },
  created() {
    axios({
      url: "userinfo?user_id=" + this.blog_info.BlogUserId,
      method: "get",
    })
      .then((res) => {
        this.user_info = res.data.data;
        if (this.blog_info.BlogImage == null) {
          this.blog_image = this.user_info.user_profile;
        } else {
          this.blog_image = this.blog_info.BlogImage;
        }
      })
      .catch((errMsg) => {
        console.log(errMsg);
      });
  },
};
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #299afb;
  font-weight: bolder;
  margin-bottom: 10px;
}
.blog_card {
  width: 350px;
  border-radius: 10px;
  
}
.image_field {
  height: 300px;
}
.card_image {
  object-fit: cover;
  height: 100%;
  width: 100%;
}
.card_content {
  font-size: x-large;
  text-align: left;
  margin-top: 15px;
  margin-bottom: 15px;
}
.card_user {
  color: #959595;
}
</style>
