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

                    <el-row style="margin-top: 20px; width: 100%">
                      <el-col
                        :span="12"
                        class="card-field"
                        v-for="certification in this.certification_infor"
                        :key="certification"
                      >
                        <certification-card
                          :certif_infor="certification"
                        ></certification-card>
                      </el-col>
                      <el-col
                        :span="12"
                        class="card-field"
                        v-if="this.certification_infor.length != 3"
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
                      drag
                      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
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
                          只允许上传jpg/png文件,大小不允许超过2M
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
                      <!-- style="width:124%" -->
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
                      <el-button type="success"
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

export default {
  components: {
    CertificationCard,
  },
  data() {
    return {
      activeName: "1",
      certification_infor: [
        {
          img_url:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          school_name: "同济大学浙江学院",
          degree: "本科",
          time: "2020.9-2024.7",
          major: "土木工程",
        },
        {
          img_url:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          school_name: "同济大学浙江学院",
          degree: "硕士",
          time: "2020.9-2024.7",
          major: "土木工程",
        },
        {
          img_url:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          school_name: "同济大学浙江学院",
          degree: "博士",
          time: "2020.9-2024.7",
          major: "土木工程",
        },
      ],
      now_input: {
        school_name: "",
        degree_name: "",
        admission_time: "",
        major_name: "",
      },
    };
  },
  created() {},
  watch: {},
  methods: {},
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