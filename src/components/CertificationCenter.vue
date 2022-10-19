<!--
描述：我的学历展示界面及认证界面
作者：方新宇
-->
<template>
  <div class="certification_center_layout">
    <div class="inner-right">
      <div class="info-right-title">
        <span class="right-title-text">我的学历</span>
      </div>
      <!-- <div>
        <div class="small-title">
        <span >认证信息</span>
        </div>
        <div style="margin-left:30px">
        <certification-card></certification-card>
        </div>
     </div> -->
      <div class="right-content-all">
        <div class="right-nav">
          <el-tabs type="border-card" v-model="activeName">
            <el-tab-pane label="认证信息" name="1">
              <div style="padding: 20px 20px; min-height: 550px">
                <div style="margin-left: 15px">
                  <el-scrollbar height="550px">
                    <!-- <div class="new-button">
                      <el-button type="success" round
                        >提交新的学历认证<el-icon style="margin-left: 5px"
                          ><Collection /></el-icon
                      ></el-button>
                    </div> -->

                    <el-row
                      style="margin-top: 20px; width: 100%"
                      :key="need_refresh"
                    >
                      <el-col
                        :span="12"
                        class="card-field"
                        v-for="certification in this.certification_infor"
                        :key="certification"
                      >
                        <certification-card
                          :certif_infor="certification"
                          @deletecheck="deletecheck"
                        ></certification-card>
                      </el-col>
                      <el-col
                        :span="12"
                        class="card-field"
                        v-if="this.certification_infor.length < 3"
                      >
                        <div style="margin-bottom: 15px">
                          <el-card
                            style="
                              width: 90%;
                              background-color: #f2f9ff;
                              height: 420px;
                            "
                          >
                            <div class="upload-item">
                              <!-- <div class="upload-item-name">点击此处上传认证</div> -->
                              <el-button
                                type="primary"
                                class="upload-button"
                                size="large"
                                @click=" this.activeName='2' "
                                >点击此处上传认证
                                <el-icon class="el-icon--right"
                                  ><Upload
                                /></el-icon>
                              </el-button>
                            </div>
                          </el-card>
                        </div>
                      </el-col>
                    </el-row>
                  </el-scrollbar>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="上传认证" name="2">
              <div style="padding: 20px 20px; min-height: 550px; display: flex">
                <div style="margin-left: 15px">
                  <div class="infor_item">
                    <div class="infor_item_name">证明材料</div>
                    <el-upload
                      class="upload-demo"
                      accept="image/jpeg,image/png"
                      :on-change="onUploadChange"
                      :auto-upload="false"
                      limit="1"
                      drag
                      action="#"
                      multiple
                    >
                      <el-icon class="el-icon--upload"
                        ><upload-filled
                      /></el-icon>
                      <div class="el-upload__text">
                        拖动文件到此处 或 <em>点击此处上传</em>
                      </div>
                      <template #tip>
                        <div class="el-upload__tip">
                          只允许上传单个jpg/png文件,大小不允许超过2M
                        </div>
                      </template>
                    </el-upload>
                  </div>
                  <div class="infor_item">
                    <div class="infor_item_name">学校名称</div>
                    <!-- <span>{{}}</span> -->
                    <div class="infor_item_content">
                      <el-input
                        v-model="now_input.school_name"
                        placeholder="请输入学校名称"
                        clearable
                      />
                    </div>
                  </div>
                  <div class="infor_item">
                    <div class="infor_item_name">学历</div>
                    <!-- <span>{{}}</span> -->
                    <div class="infor_item_content">
                      <el-input
                        v-model="now_input.degree_name"
                        placeholder="请输入学历"
                        clearable
                      />
                    </div>
                  </div>
                  <div class="infor_item">
                    <div class="infor_item_name">入学时间</div>
                    <!-- <span>{{}}</span> -->
                    <div class="infor_item_content">
                      <div class="block">
                        <el-date-picker
                          v-model="now_input.admission_time"
                          type="daterange"
                          range-separator="To"
                          start-placeholder="Start date"
                          end-placeholder="End date"
                          unlink-panels
                          style="width: 93%"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="infor_item">
                    <div class="infor_item_name">专业</div>
                    <!-- <span>{{}}</span> -->
                    <div class="infor_item_content">
                      <el-input
                        v-model="now_input.major_name"
                        placeholder="请输入专业"
                        clearable
                      />
                    </div>
                  </div>
                  <div class="infor_item">
                    <div>
                      <el-button type="success" @click="submit"
                        >确认提交<el-icon class="el-icon--right"
                          ><Upload /></el-icon
                      ></el-button>
                    </div>
                  </div>
                </div>
                <div>
                  <img
                    src="../assets/qualification.png"
                    style="margin-left: 120px; height: 500px"
                  />
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CertificationCard from "../components/CertificationCard.vue";
import { ElMessage } from "element-plus";
import axios from "axios";
export default {
  components: {
    CertificationCard,
    ElMessage,
  },
  data() {
    return {
      activeName: "1",
      delete_dialog_visible: false,
      need_refresh: false,
      certification_infor: [],
      now_input: {
        certification_material: "",
        school_name: "",
        degree_name: "",
        admission_time: "",
        major_name: "",
      },
    };
  },
  created() {
    // if (!this.$store.state.is_login) {
    //   ElMessage({
    //     message: "请先登录",
    //     type: "warning",
    //     showClose: true,
    //     duration: 2000,
    //   });
    //   /**之后此处需记录当前页面路径，以便于登陆完成后跳转 */
    //   this.$router.push({
    //     path: "/login",
    //     query: { redirect: this.$route.fullPath },
    //   });
    // }
    axios({
      url: "/api/identity?user_id=" + this.$store.state.user_info.user_id,
    })
      .then((res) => {
        console.log(res);
        this.certification_infor = [].concat(res.data.data.identity_list);
        this.certification_infor = this.sortByKey(
          this.certification_infor,
          "identity"
        );
        console.log(this.certification_infor);
      })
      .catch((errMsg) => {
        console.log(errMsg);
      });
  },
  watch: {
    need_refresh() {//重新申请数据 尚不确定是否成功
      axios({
        url: "/api/identity?user_id=" + this.$store.state.user_info.user_id,
      })
        .then((res) => {
          console.log(res);
          this.certification_infor = [].concat(res.data.data.identity_list);
          this.certification_infor = this.sortByKey(
            this.certification_infor,
            "identity"
          );
          console.log(this.certification_infor);
        })
        .catch((errMsg) => {
          console.log(errMsg);
        });
    },
  },
  methods: {
    sortByKey(array, key) {
      return array.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        if (x == y) return 0;
        if (x == "本科") return -1;
        else if (y == "本科") return 1;
        else if (x == "硕士") return -1;
        else return 1;
      });
    },
    submit() {
      if (this.certification_infor.length >= 3) {
        ElMessage.error("学历认证已完备! 如需更改, 请删除后再上传相关资料");
        return;
      }
      if(this.now_input.certification_material == "" || this.now_input.school_name == "" || this.now_input.degree_name == "" || this.now_input.admission_name == "" || this.now_input.major_name == "" )
      {
        ElMessage.error("请先完善全部认证信息再提交!");
        return;
      }
      var startDate = this.now_input.admission_time[0].toISOString();
      var endDate = this.now_input.admission_time[1].toISOString();
      var admDate =
        startDate.substring(0, startDate.indexOf("T")) +
        " ~ " +
        endDate.substring(0, endDate.indexOf("T"));
      axios
        .post("/api/identity", {
          img: this.now_input.certification_material,
          user_id: this.$store.state.user_info.user_id,
          identity: this.now_input.degree_name,
          enrollment_time: admDate,
          major: this.now_input.major_name,
          university_name: this.now_input.school_name,
        })
        .then((res) => {
          console.log(res);
          if (res.data.status == true) {
            ElMessage.success("上传成功! 待审核通过后, 即完成认证");
          } else {
            ElMessage.error("提交失败！请检查各项输入是否合法");
          }
        })
        .catch((err) => {
          console.log(err);
          ElMessage.error("提交失败！请检查各项输入是否合法");
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
        this.now_input.certification_material = e.target.result;
        console.log(this.now_input.certification_material)
      };
    },
    deletecheck(res){
      if (res) {
        this.need_refresh = ! this.need_refresh;
      }
    }
  },
};
</script>

<style scoped>
.certification_center_layout {
  background-color: white;
  padding-left: 5%;
  height: 800px;
}
.inner-right {
  min-height: 600px;
  width: 99%;
  background-color: #f1f9ff;
  border-radius: 30px;
  margin-bottom: 3%;
}
.info-right-title {
  height: 60px;
  padding-left: 30px;
  border-bottom: 2px solid #ddd;
}

.right-title-text {
  float: left;
  margin: 15px 0 0 0;
  font-size: 20px;
  cursor: default;
}

.right-content-all {
  width: 96%;
  background-color: #f1f9ff;
  border-radius: 30px;
  padding: 1% 0 0 2%;
}
.right-nav .el-tabs ::v-deep .el-tabs__item {
  height: 50px;
  position: relative;
  font-size: 15px;
  text-align: center;
  padding: 0 20px; /*关键的第一列的宽度*/
  box-sizing: border-box;
  line-height: 40px;
  display: inline-block;
  list-style: none;
  font-weight: 500;
  color: #303133;
}

.new-button {
  float: left;
}

.upload-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.upload-button {
  margin-top: 40%;
}

.infor_item {
  text-align: left;
  margin-top: 20px;
  /* margin-left: 3%; */
  display: flex;
  align-items: center;
}

.infor_item .infor_item_name {
  width: 70px;
  margin-right: 20px;
}

.infor_item .infor_item_content {
  width: 300px;
  text-align: left;
}

/* .certification_card {
  display: flex;
} */

/* .small-title{
    text-align:left;
    font-size: 20px;
    margin-top: 10px;
    margin-left:30px;
    margin-bottom:10px;
} */
</style>