<template>
  <el-card :body-style="{ padding: '0px' }" class="blog_card">
    <div class="image_field">
      <img
        class="card_image"
        :src="
          'https://houniaoliuxue.oss-cn-shanghai.aliyuncs.com/blog/' +
          blog_info.BlogId +
          '.jpg'
        "
      />
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
            <el-tag class="ml-2" type="primary" size="small">{{
              blogTime
            }}</el-tag>
          </el-col>
        </el-row>
      </section>
      <section class="card_content">
        {{ blogSummary }}
      </section>
      <section class="card_user">
        <el-row gutter="10" align="middle">
          <el-col :span="2">
            <el-avatar
              :src="
                'https://houniaoliuxue.oss-cn-shanghai.aliyuncs.com/user_profile/' +
                blog_info.BlogUserId +
                '.jpg'
              "
              size="small"
            />
          </el-col>
          <el-col :span="12" style="text-align: left">
            <span class="user_name"> 皮了卡了那个丘 </span>
          </el-col>
          <el-col :span="2" style="text-align: left" v-if="is_liked==false">
            <el-icon size="large" @click="likeChange"><Chicken /></el-icon>
          </el-col>
          <el-col :span="2" style="text-align: left" v-else>
            <el-icon size="large" color="#d25f1e" @click="likeChange"><Chicken /></el-icon>
          </el-col>
          <el-col :span="3" style="text-align: left">
            {{blog_info.BlogLike}}
          </el-col>
          <el-col :span="2" style="text-align: left" v-if="is_coined==false">
            <el-icon size="large" @click="coinIn"><Coin /></el-icon>
          </el-col>
          <el-col :span="2" style="text-align: left" v-else>
            <el-icon size="large" color="#fbc563" @click="coinIn"><Coin /></el-icon>
          </el-col>
          <el-col :span="3" style="text-align: left">
            {{blog_info.BlogCoin}}
          </el-col>
        </el-row>
      </section>
    </div>
  </el-card>
</template>

<script>
//到时候传入一个
export default {
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
      is_liked: false,
      is_coined: false,
    };
  },
  methods: {
    likeChange(){
      this.is_liked=!this.is_liked
    },
    coinIn(){
      this.is_coined=!this.is_coined
    }
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
.card_user{
  color: #959595;
}
</style>
