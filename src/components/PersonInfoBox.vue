<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span style="font-size: 20px">基本信息</span>
      </div>
    </template>

    <el-card class="content">
      <div class="info_head">
        <el-avatar :size="65" :src="this.$store.state.user_info.user_profile" />
        <div class="top_info">
          <div style="text-align: left">
            <span
              style="font-size: 20px; font-weight: bold; margin-right: 1%"
              >{{ this.$store.state.user_info.user_name }}</span
            ><span style="font-size: 3px; color: gray"
              >用户等级{{ this.person_info.user_level }}</span
            >
          </div>
          <div style="font-size: 3px; text-align: left; color: gray">
            <span style="margin-right: 5%"
              >粉丝数：{{ this.person_info.user_follower }}</span
            ><span>关注数：{{ this.person_info.user_follows }}</span>
          </div>
          <div style="font-size: 3px; text-align: left; color: gray">
            <span>鸟币数：{{ this.coin }}</span>
          </div>
        </div>
        <div style="display: flex; padding-top: 0">
          <el-button
            v-if="change_profile"
            type="primary"
            text="primary"
            @click="changeProfileButton(0)"
            >更改头像</el-button
          >
          <el-upload
            v-else
            ref="upload"
            accept="image/jpeg,image/png"
            :on-change="onUploadChange"
            :auto-upload="false"
            limit="1"
            action="#"
          >
            <template #trigger>
              <el-button text="primary" type="primary">选择图片</el-button>
            </template>
            <el-button
              text="primary"
              type="primary"
              style="margin-left: 20px"
              @click="submit"
              >确认</el-button
            >
            <el-button
              text="primary"
              type="primary"
              style="margin-left: 20px"
              @click="changeProfileButton(1)"
              >取消</el-button
            >
          </el-upload>
        </div>
      </div>

      <!-- 底部信息 -->
      <el-row class="info-content">
        <el-col :span="3"></el-col>
        <el-col :span="6" style="text-align: left">用户名：</el-col>
        <el-col :span="8" style="text-align: left">
          <el-input v-model="name" v-if="isUpdating.name"></el-input>
          <div v-else>{{ name }}</div>
        </el-col>
        <el-col :span="2"></el-col>
        <el-col :span="3" style="text-align: left">
          <el-button
            text="primary"
            type="primary"
            v-if="!isUpdating.name"
            @click="update('name')"
            >编辑</el-button
          >
          <el-button
            text="primary"
            type="primary"
            v-else
            @click="confirm('name')"
            >确认</el-button
          >
        </el-col>
        <el-col :span="2"></el-col>
      </el-row>

      <el-row class="info-content">
        <el-col :span="3"></el-col>
        <el-col :span="6" style="text-align: left">性别：</el-col>
        <el-col :span="8" style="text-align: left">
          <el-radio-group v-model="gender" v-if="isUpdating.gender">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
          <div v-else>{{ gender }}</div>
        </el-col>
        <el-col :span="2"></el-col>
        <el-col :span="3" style="text-align: left">
          <el-button
            text="primary"
            type="primary"
            v-if="!isUpdating.gender"
            @click="update('gender')"
            >编辑</el-button
          >
          <el-button
            text="primary"
            type="primary"
            v-else
            @click="confirm('gender')"
            >确认</el-button
          >
        </el-col>
        <el-col :span="2"></el-col>
      </el-row>

      <el-row class="info-content">
        <el-col :span="3"></el-col>
        <el-col :span="6" style="text-align: left">生日：</el-col>
        <el-col :span="8" style="text-align: left">
          <el-date-picker
            v-if="isUpdating.birthday"
            v-model="birthday"
            type="date"
            format="YYYY/MM/DD"
            value-format="YYYY-MM-DD"
            :editable="false"
            :clearable="false"
          ></el-date-picker>
          <div v-else>{{ birthday }}</div>
        </el-col>
        <el-col :span="2"></el-col>
        <el-col :span="3" style="text-align: left">
          <el-button
            text="primary"
            type="primary"
            v-if="!isUpdating.birthday"
            @click="update('birthday')"
            >编辑</el-button
          >
          <el-button
            text="primary"
            type="primary"
            v-else
            @click="confirm('birthday')"
            >确认</el-button
          >
        </el-col>
        <el-col :span="2"></el-col>
      </el-row>

      <el-row class="info-content">
        <el-col :span="3"></el-col>
        <el-col :span="6" style="text-align: left">手机号码：</el-col>
        <el-col :span="8" style="text-align: left">
          <el-input v-model="phone" v-if="isUpdating.phone"></el-input>
          <div v-else>{{ phone }}</div>
        </el-col>
        <el-col :span="2"></el-col>
        <el-col :span="3" style="text-align: left">
          <!-- <el-button
            text="primary"
            type="primary"
            v-if="!isUpdating.phone"
            @click="update('phone')"
            >编辑</el-button
          >
          <el-button
            text="primary"
            type="primary"
            v-else
            @click="confirm('phone')"
            >确认</el-button
          > -->
        </el-col>
        <el-col :span="2"></el-col>
      </el-row>

      <el-row class="info-content">
        <el-col :span="3"></el-col>
        <el-col :span="6" style="text-align: left">邮箱：</el-col>
        <el-col :span="8" style="text-align: left">
          <el-input v-model="email" v-if="isUpdating.email"></el-input>
          <div v-else>{{ email }}</div>
        </el-col>
        <el-col :span="2"></el-col>
        <el-col :span="3" style="text-align: left">
          <el-button
            text="primary"
            type="primary"
            v-if="!isUpdating.email"
            @click="update('email')"
            >编辑</el-button
          >
          <el-button
            text="primary"
            type="primary"
            v-else
            @click="confirm('email')"
            >确认</el-button
          >
        </el-col>
        <el-col :span="2"></el-col>
      </el-row>

      <el-row class="info-content">
        <el-col :span="3"></el-col>
        <el-col :span="6" style="text-align: left">身份：</el-col>
        <el-col :span="8" style="text-align: left; margin-bottom: 1%">
          <div v-for="identity_info in identity_info_list" :key="identity_info">
            {{ identity_info.identity }}：{{ identity_info.university_name }}
          </div>
        </el-col>
        <el-col :span="2"></el-col>
        <el-col :span="3" style="text-align: left"> </el-col>
        <el-col :span="2"></el-col>
      </el-row>

      <el-row class="info-content">
        <el-col :span="3"></el-col>
        <el-col :span="6" style="text-align: left">个性签名：</el-col>
        <el-col :span="8" style="text-align: left">
          <el-input v-model="signature" v-if="isUpdating.signature"></el-input>
          <div v-else>{{ signature }}</div>
        </el-col>
        <el-col :span="2"></el-col>
        <el-col :span="3" style="text-align: left">
          <el-button
            text="primary"
            type="primary"
            v-if="!isUpdating.signature"
            @click="update('signature')"
            >编辑</el-button
          >
          <el-button
            text="primary"
            type="primary"
            v-else
            @click="confirm('signature')"
            >确认</el-button
          >
        </el-col>
        <el-col :span="2"></el-col>
      </el-row>
    </el-card>
  </el-card>
</template>

<script>
import router from "@/router";
import { ElMessage } from "element-plus";
import axios from "axios";
import store from "@/store";
export default {
  data() {
    return {
      identity_info_list: [],
      person_info: "",
      name: this.$store.state.user_info.user_name,
      phone: this.$store.state.user_info.user_phone,
      email:
        this.$store.state.user_info.user_email == null
          ? "暂未填写"
          : this.$store.state.user_info.user_email,
      signature: this.$store.state.user_info.user_signature,
      gender: this.$store.state.user_info.user_gender == "m" ? "男" : "女",
      birthday:
        this.$store.state.user_info.user_birthday == null
          ? "暂未填写"
          : this.$store.state.user_info.user_birthday.slice(0, 10),
      profile: "",
      isUpdating: {
        name: false,
        gender: false,
        phone: false,
        email: false,
        signature: false,
        profile: false,
      },
      coin: 0,
      change_profile: true,
    };
  },
  components: {
    ElMessage,
  },
  methods: {
    update(key) {
      this.isUpdating[key] = true;
    },
    changeProfileButton(e) {
      if (e == 0) this.change_profile = false;
      else this.change_profile = true;
    },
    confirm(key) {
      this.isUpdating[key] = false;
      axios
        .put("api/userinfo/change", {
          user_id: this.$store.state.user_info.user_id,
          user_name: this.name,
          user_gender: this.gender == "女" ? "f" : "m",
          user_phone: this.phone,
          user_email: this.email == "暂未填写" ? "" : this.email,
          user_signature: this.signature,
          user_birthday: this.birthday == "暂未填写" ? "" : this.birthday,
        })
        .then((res) => {
          var user_info = {
            name: this.name,
            phone: this.phone,
            email: this.email == "暂未填写" ? null : this.email,
            signature: this.signature,
            gender: this.gender == "男" ? "m" : "f",
            birthday: this.birthday == "暂未填写" ? null : this.birthday,
          };
          if (res.data.status == true) {
            ElMessage({
              type: "success",
              message: "修改成功！",
              duration: 2000,
              showClose: true,
            });
            store.commit("changePersonInfo", user_info);
          } else {
            ElMessage({
              type: "error",
              message: "修改失败！",
              duration: 2000,
              showClose: true,
            });
          }
        })
        .catch((errMsg) => {
          console.log(errMsg);
        });
    },
    onUploadChange(file) {
      const isIMAGE =
        file.raw.type === "image/jpeg" || file.raw.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 / 2 < 1;
      if (!isIMAGE) {
        this.$message.error("上传文件只能是图片格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 2MB!");
        return false;
      }
      var reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = (e) => {
        this.profile = e.target.result;
        console.log(this.profile);
      };
    },
    submit() {
      axios
        .put("api/userinfo/profile", {
          user_id: this.$store.state.user_info.user_id,
          user_profile: this.profile,
        })
        .then((res) => {
          console.log(res);
          if (res.data.status == true) {
            ElMessage.success("更改成功!");
            this.profile = res.data.data.img_url + "?t=" + Math.random();
            store.commit("changeProfile", this.profile);
            this.$refs.upload.clearFiles();
            this.change_profile = true;
          } else {
            ElMessage.error("更改失败！");
          }
        })
        .catch((err) => {
          console.log(err);
          ElMessage.error("更改失败！");
        });
    },
  },
  created() {
    //个人信息
    axios({
      url: "api/userinfo",
      params: { user_id: this.$store.state.user_info.user_id },
      method: "get",
    })
      .then((res) => {
        this.person_info = res.data.data;
      })
      .catch((errMsg) => {
        console.log(errMsg);
        console.log("获取用户信息失败");
      });
    //学历认证信息
    axios({
      url: "api/userinfo/identity",
      params: { user_id: this.$store.state.user_info.user_id },
      method: "get",
    })
      .then((res) => {
        this.identity_info_list = res.data.data.identity_info;
        this.coin = res.data.data.coin;
        if (res.data.data.identity_info.length == 0) {
          this.identity_info_list.push({
            identity: "本科",
            university_name: "暂未认证",
          });
        }
      })
      .catch((errMsg) => {
        console.log(errMsg);
        console.log("获取学历信息失败");
      });
  },
};
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#change {
  width: 8%;
}
.content {
  width: 95%;
  margin-right: 8%;
  border-radius: 20px;
}

.box-card {
  width: 99%;
  background-color: #f1f9ff;
  border-radius: 30px;
  margin-bottom: 3%;
}

.content .info_attribute {
  width: 50%;
}
.info_head {
  display: flex;
  border-bottom: 1px solid #000;
  padding: 1%;
  margin-bottom: 2%;
}
.head_portrait {
  height: 56px;
}
.top_info {
  width: 68%;
  margin-left: 1%;
}
.bottom_info .bottom_info_attr {
  color: gray;
  margin-top: 1%;
}
.bottom_info .bottom_info_value {
  margin-top: 1%;
  text-align: left;
}
.info-content {
  font-family: PingFang SC, Hiragino Sans GB, Arial, Microsoft YaHei, Verdana,
    Roboto, Noto, Helvetica Neue, sans-serif;
  font-size: 15px;
  padding-top: 1%;
  padding-bottom: 1%;
  /* font-weight: bolder; */
  margin-left: 5%;
  margin-right: 5%;
}
</style>