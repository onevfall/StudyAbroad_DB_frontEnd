<template>
  <!-- 密码修改 -->
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span style="font-size: 20px">修改密码</span>
      </div>
    </template>

    <el-row class="info-content">
      <el-col :span="6"></el-col>
      <el-col :span="2" style="text-align: right; font-size: 18px"
        >验证码：</el-col
      >
      <el-col :span="1"></el-col>
      <el-col :span="8" style="text-align: left">
        <el-input
          v-model="iden_code"
          placeholder="请输入手机收到的验证码"
        >
        <template #append>
          <el-button type="primary" @click="getIdeCode" :disabled="isDisposed">
            {{ this.isDisposed ? `${this.time}s后重新获取` : "获取验证码" }}
          </el-button>
        </template>
        </el-input>
      </el-col>
      <el-col :span="7"></el-col>
    </el-row>

    <el-row class="info-content">
      <el-col :span="6"></el-col>
      <el-col :span="2" style="text-align: right; font-size: 18px"
        >原密码：</el-col
      >
      <el-col :span="1"></el-col>
      <el-col :span="8" style="text-align: left">
        <el-input
          v-model="old_password"
          placeholder="请输入原密码"
          show-password
        />
      </el-col>
      <el-col :span="7"></el-col>
    </el-row>

    <el-row class="info-content">
      <el-col :span="6"></el-col>
      <el-col :span="2" style="text-align: right; font-size: 18px"
        >新密码：</el-col
      >
      <el-col :span="1"></el-col>
      <el-col :span="8" style="text-align: left">
        <el-input
          v-model="new_password"
          placeholder="请输入新密码"
          show-password
        />
      </el-col>
      <el-col :span="7"></el-col>
    </el-row>

    <el-row class="info-content">
      <el-col :span="5"></el-col>
      <el-col :span="3" style="text-align: right; font-size: 18px"
        >确认新密码：</el-col
      >
      <el-col :span="1"></el-col>
      <el-col :span="8" style="text-align: left">
        <el-input
          v-model="new_password_confirm"
          placeholder="请确认新密码"
          show-password
        />
      </el-col>
      <el-col :span="7"></el-col>
    </el-row>
    <div style="margin-top: 3%; margin-bottom: 1%">
      <el-button type="primary" round @click="submit">确认修改</el-button>
    </div>
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
      time: 60,
      isDisposed: false,
      iden_code: "",
      old_password: "",
      new_password: "",
      new_password_confirm: "",
    };
  },
  methods: {
    submit() {
      if (this.$store.state.user_info.user_password != this.old_password) {
        ElMessage({
          type: "false",
          message: "原密码错误，请重新输入！",
          showClose: true,
        });
        this.old_password = "";
        return;
      }
      if (this.new_password != this.new_password_confirm) {
        ElMessage({
          type: "false",
          message: "确认密码不一致，请重新输入！",
          showClose: true,
        });
        this.new_password_confirm = "";
        return;
      }
      console.log("id" + this.old_password);
      axios
        .put("userinfo/password", {
          user_id: this.$store.state.user_info.user_id,
          user_password: this.old_password,
          new_password: this.new_password,
          code:this.iden_code,
        })
        .then((res) => {
          console.log(res);
          if (res.data.status) {
            ElMessage({
              type: "success",
              message: "修改成功！",
              showClose: true,
            });
            this.old_password = "";
            this.new_password = "";
            this.new_password_confirm = "";
            this.iden_code= "";
          } else {
            ElMessage({
              type: "error",
              message: "修改失败，请检查原密码是否正确或验证码是否正确！",
              showClose: true,
            });
            this.old_password = "";
            this.iden_code = "";
          }
        })
        .catch((errMsg) => {
          ElMessage({
            type: "false",
            message: "修改失败，请检查网络！",
            showClose: true,
          });
        });
    },
    handleTimeChange() {
      if (this.time <= 0) {
        this.isDisposed = false;
        this.time = 60;
      } else {
        setTimeout(() => {
          this.time--;
          this.handleTimeChange();
        }, 1000);
      }
    },
    getIdeCode() {
      console.log("send");
      axios
        .post("/userinfo/verifycode",{
          user_phone:this.$store.state.user_info.user_phone,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          if(res.data.status == true){
            console.log("验证码发送成功！");
            ElMessage({
              message: "验证码发送成功！",
              grouping: true,
              type: "success",
            });
            this.isDisposed = true;
            this.handleTimeChange();
          }
          else{
            ElMessage({
              message: "验证码发送失败！",
              grouping: true,
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err)
        })
      },
  },
};
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-card {
  width: 99%;
  background-color: #f1f9ff;
  border-radius: 30px;
  margin-bottom: 3%;
}

.info-content {
  font-family: PingFang SC, Hiragino Sans GB, Arial, Microsoft YaHei, Verdana,
    Roboto, Noto, Helvetica Neue, sans-serif;
  font-size: 15px;
  padding-top: 1%;
  padding-bottom: 1%;
  margin-left: 5%;
  margin-right: 5%;
}
</style>