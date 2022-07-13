<!--
描述：注册页（验证码功能未完成）
作者：方新宇
-->
<template>
  <div class="common-layout">
    <el-container>
      <el-header height="100px">
        <!-- <div id="registerTips">
          <el-link type="primary" style="font-size: small"
            >还没有账号，注册<el-icon color="#409eff"><Right /></el-icon
          ></el-link>
        </div> -->
        <div id="registerTips">用户注册</div>
      </el-header>
      <el-container>
        <el-aside width="900px">
          <img src="../assets/drawing_register.png" class="drawing" />
        </el-aside>

        <el-main>
          <div class="registerField">
            <div class="inputCard">
              <div class="label">手机号</div>
              <el-row>
                <el-col :span="10">
                  <el-input
                    v-model="user_phone"
                    class="w-50 m-2"
                    :input-style="this.input_style"
                  >
                    <template #suffix>
                      <el-icon color="#409eff"><UserFilled /></el-icon>
                    </template>
                  </el-input>
                </el-col>
              </el-row>
            </div>

            <div class="inputCard">
              <div class="label">验证码</div>
              <el-row>
                <el-col :span="10">
                  <el-input
                    v-model="iden_code"
                    class="w-50 m-2"
                    :input-style="this.input_style"
                    v-on:input="validateCAPTCHA()"
                  >
                    <template #append>
                      <el-button
                        type="primary"
                        @click="getIdeCode"
                        :disabled="isDisposed"
                      >
                        {{
                          this.isDisposed
                            ? `${this.time}s后重新获取`
                            : "获取验证码"
                        }}
                      </el-button>
                    </template>
                  </el-input>
                </el-col>
              </el-row>
            </div>

            <div class="inputCard">
              <div class="label">密码</div>
              <el-row>
                <el-col :span="10">
                  <el-input
                    v-model="user_password"
                    class="w-50 m-2"
                    type="password"
                    clearable
                  />
                </el-col>
              </el-row>
            </div>

            <div class="inputCard">
              <div class="label">确认密码</div>
              <el-row>
                <el-col :span="10">
                  <el-input
                    v-model="tmp_password"
                    class="w-50 m-2"
                    type="password"
                    v-on:input="validatePassword()"
                    clearable
                  >
                    <template #append>
                    <el-icon v-if="check" style="color:green"
                      ><SuccessFilled
                    /></el-icon>
                    <el-icon v-else style="color:#F56C6C"><WarningFilled /></el-icon>
                    </template>
                  </el-input>
                </el-col>
              </el-row>
            </div>

            <div class="buttonCard">
              <el-button type="primary" @click="register">注册</el-button>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog
    v-model="dialogVisible"
    title="注册成功"
    width="40%"
    :before-close="handleClose"
    append-to-body
  >
    <span>您的注册手机号为 {{ this.user_phone }}  </span>
    <br />
    <span>您的ID为 {{ this.user_id }} </span>
    <br />
    <span>您的密码为 {{ this.user_password }} </span>
    <br />
    <span>请您牢记以上信息, ID及密码将作为用户登录唯一凭证</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="closeDialog"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
  </div>
  
</template>

<script>
import { ElMessage } from "element-plus";
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import axios from "axios";
import store from "@/store";
import { tryOnBeforeMount } from "@vueuse/core";
export default {
  components: { ElMessage },
  data() {
    return {
      iden_code: "",
      user_phone: "",
      user_password: "",
      user_id: "",
      tmp_password: "",
      time: 60,
      isDisposed: false,
      check: false,
      dialogVisible: false,
    };
  },
  methods: {
    register() {
      if (
        this.user_phone === "" ||
        this.iden_code === "" ||
        this.user_password === "" ||
        this.tmp_password === ""
      ) {
        ElMessage.error("以上四项均为必填项！");
        return;
      } else if (this.user_password !== this.tmp_password) {
        ElMessage.error("两次输入密码不相同！请再次确认密码");
        return;
      } else {
        var d=new FormData();
        d.append("user_phone",this.user_phone);
        d.append("user_password",this.user_password);
        console.log(d);
        axios({
          headers:{
            'Content-Type':'application/x-www-form-urlencoded'
          },
          url: "/register",
          data:d,
          // params: {
          //   user_phone: this.user_phone,
          //   user_password: this.user_password,
          // },
          method: "post",
        })
        // axios.post('/re'

        // )
          .then((res) => {
            console.log(res);
            console.log(res.data);
            console.log("res.status" + res.data.status);
            if (res.data.status == true) {
              //若成功注册
              ElMessage({
                message: "注册成功！",
                type: "success",
              });
              this.user_id = res.data.data.user_id;
              console.log(this.user_id);
              this.dialogVisible = true;
            } else {
              //若注册失败
              ElMessage.error("该手机号已有账号，注册失败！");
              (this.user_phone = ""),
                (this.user_password = ""),
                (this.iden_code = ""),
                (this.tmp_password = "");
            }
          })
          .catch((err) => {
            console.log(err);
            ElMessage.error("注册失败！");
            (this.user_phone = ""),
              (this.user_password = ""),
              (this.iden_code = ""),
              (this.tmp_password = "");
          });
      }
    },
    validatePhone() {
      if (this.user_phone === "") {
        ElMessage.error("手机号不可为空！");
      } else {
        if (this.user_phone !== "") {
          var reg = /^1[3456789]\d{9}$/;
          if (!reg.test(this.user_phone)) {
            ElMessage({
              message: "请输入正确的手机号！",
              grouping: true,
              type: "error",
            });
          }
        }
      }
    },
    validateCAPTCHA() {
      if (this.iden_code === "") {
        ElMessage.error("验证码不可为空！");
      } else {
        if (this.iden_code !== "") {
          var reg = /^\d{1,6}$/;
          if (!reg.test(this.iden_code)) {
            ElMessage({
              message: "请输入正确的验证码！",
              grouping: true,
              type: "error",
            });
          }
        }
      }
    },
    validatePassword() {
      if (this.user_password === "") {
        ElMessage({
          message: "请先输入密码",
          grouping: true,
          type: "error",
        });
      } else if (this.user_password !== this.tmp_password) {
        this.check = false;
      } else {
        ElMessage.success("两次输入密码相同");
        this.check = true;
      }
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
      var reg = /^1[3456789]\d{9}$/;
      if (this.user_phone === "" || !reg.test(this.user_phone)) {
        ElMessage({
          message: "请输入正确的手机号！",
          grouping: true,
          type: "error",
        });
        this.user_phone = "";
        return;
      }
      console.log("验证码发送成功！");
      this.isDisposed = true;
      this.handleTimeChange();
    },
    handleClose() {
      ElMessageBox.confirm("确认关闭此对话框吗?")
        .then(() => {
          this.dialogVisible = false;
          // done();
        })
        .catch(() => {
          // catch error
        });
    },
    sleep(numberMillis) {
      var now = new Date();
      var exitTime = now.getTime() + numberMillis;
      console.log("11100");
      console.log(this.dialogVisible);
      while (true) {
        now = new Date();
        if (now.getTime() > exitTime) return;
      }
    },
    closeDialog(){
      this.dialogVisible = false;
      this.$router.replace("/login");
    }
  },
};
</script>

<style scoped>
#registerTips {
  font-size: 40px;
  color: #409eff;
  font-family: SimSun;
  font-weight: bolder;
  margin-top: 5%;
}
.drawing {
  height: 600px;
}
.registerField {
  margin-top: 15%;
}
.inputCard {
  color: #409eff;
  margin-top: 5%;
}
.inputCard .label {
  text-align: left;
  margin-bottom: 5px;
}
.buttonCard {
  margin-right: 58%;
  margin-top: 10%;
}
.el-input {
  --el-input-border-color: #a0cfff;
  --el-input-bg-color: #ffffff00;
  --el-input-hover-border-color: #88c3fe;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
