<!--
描述：用于大学中心的显示，包括大学排名、检索等信息
作者：蔡明宏
-->
<template>
  <div
    class="school-center-layout"
    v-loading.fullscreen.lock="isLoading"
    element-loading-text="正在加载"
  >
    <!-- 上半区-->
    <div class="upBox">
      <el-container>
        <el-aside width="65%">
          <!-- 搜索栏内部 -->
          <el-container>
            <!-- 左侧空白 -->
            <el-aside width="25%"></el-aside>
            <el-container>
              <!-- 一个“关于大学”的按钮，一个搜索栏 -->
              <el-header class="my_top_layout">
                <div class="sch_box">关于大学</div>
                <!-- 搜索栏，可以考虑封装成一个组件，实现实时字段匹配 multiple reserve-keyword -->
                <div class="search_component">
                  <el-select
                    v-model="search_value"
                    filterable
                    remote
                    clearable
                    placeholder="请输入大学名称"
                    :remote-method="remoteMethod"
                    :loading="loading"
                    size="large"
                  >
                    <el-option
                      v-for="item in all_school_list"
                      :key="item.universityId"
                      :label="item.universityChName"
                      :value="item.universityId"
                    />
                  </el-select>
                  <span style="margin: 10px; vertical-align: bottom">
                    <!-- 搜索键 -->
                    <el-button
                      type="warning"
                      size="large"
                      color="#626aef"
                      @click="goSearch"
                      >搜索</el-button
                    >
                  </span>
                </div>
              </el-header>

              <el-main class="searchBox">
                <div>
                  <!-- 三个选择栏 -->
                  <el-row :gutter="10" justify="space-between">
                    <el-col :span="6">
                      <div class="grid-content ep-bg-purple">
                        <span>国家</span>
                        <br />
                        <el-select
                          v-model="country_value"
                          clearable
                          class="m-2"
                          placeholder="请选择"
                          size="large"
                        >
                          <el-option
                            v-for="item in country_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content">
                        <span>排行榜类型</span>
                        <br />
                        <el-select
                          v-model="rank_type_value"
                          clearable
                          class="m-2"
                          placeholder="请选择"
                          size="large"
                        >
                          <el-option
                            v-for="item in rank_type_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content">
                        <span>排行榜年份</span>
                        <br />
                        <!-- 排行榜年份必须有，所以不设置可删除 -->
                        <el-select
                          v-model="year_value"
                          class="m-2"
                          placeholder="请选择"
                          size="large"
                        >
                          <el-option
                            v-for="item in year_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-main>
              <el-footer height="10px">
                <div class="bottom_button">
                  <div style="margin: 10px">
                    <!-- 搜索键 -->
                    <el-button
                      type="warning"
                      size="large"
                      color="#626aef"
                      @click="filter"
                      >搜索</el-button
                    >
                  </div>
                  <div style="margin: 20px; text-align: left">
                    <!-- 搜索键 -->
                    <el-button
                      type="warning"
                      size="large"
                      color="#626aef"
                      @click="ai_drawer_visible = true, predict_offer_drawer = true"
                      >AI录取预测</el-button
                    >
                  </div>

                  <div style="margin: 20px; text-align: left">
                    <!-- 搜索键 -->
                    <el-button
                      type="warning"
                      size="large"
                      color="#626aef"
                      @click="ai_drawer_visible = true, predict_offer_drawer = false"
                      >上传你的Offer</el-button
                    >
                  </div>
                </div>
              </el-footer>
            </el-container>
          </el-container>
        </el-aside>
        <el-main>
          <img src="../assets/school_center.png" class="drawing" />
        </el-main>
      </el-container>
    </div>

    <el-drawer
      v-model="ai_drawer_visible"
      title="AI择校"
      :before-close="handleClose"
    >
    <div class="infor_item" v-if="predict_offer_drawer">
      <span>上传你的成绩, 获取你的Offer预测!</span>
    </div>

    <div class="infor_item" v-else>
      <span>上传你的offer, 将你的福气和大家分享, 会有机会获得鸟币哦!</span>
    </div>
      
      <div style="margin-left: 15px">
        <div class="infor_item">
          <div class="infor_item_name">托福成绩</div>
          <!-- <span>{{}}</span> -->
          <div class="infor_item_content">
            <el-input-number
              v-model="predict_input.toefl_language"
              :max="120"
            />
          </div>
        </div>
        <div class="infor_item">
          <div class="infor_item_name">雅思成绩</div>
          <!-- <span>{{}}</span> -->
          <div class="infor_item_content">
            <el-input-number
              v-model="predict_input.ielts_language"
              :precision="1"
              :step="0.5"
              :max="9.0"
            />
          </div>
        </div>
        <div class="infor_item">
          <div class="infor_item_name">gpa(百分制)</div>
          <!-- <span>{{}}</span> -->
          <div class="infor_item_content">
            <el-input-number
              v-model="predict_input.gpa"
              :precision="1"
              :step="0.1"
              :max="100.0"
            />
          </div>
        </div>
        <div class="infor_item">
          <div class="infor_item_name">申请年份</div>
          <!-- <span>{{}}</span> -->
          <div class="infor_item_content">
            <el-input-number
              v-model="predict_input.year"
              :min="this.predict_offer_drawer?2022:2000"
              :max="2050"
            />
          </div>
        </div>
        <div class="infor_item" v-if="predict_offer_drawer">
          <div class="infor_item_name">本科学校</div>
          <!-- <span>{{}}</span> -->
          <div class="infor_item_content">
            <el-select
              v-model="predict_input.school"
              class="m-2"
              placeholder="选择你本科学校的所在层次"
            >
              <el-option
                v-for="item in school_level_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <div class="infor_item" v-else>
          <div class="infor_item_name">offer院校</div>
          <!-- <span>{{}}</span> -->
          <div class="infor_item_content">
            <el-input
              v-model="predict_input.school"
              placeholder="请输入所录取的院校名称（建议输入英文全称）"
              clearable
            />
          </div>
        </div>
        <div class="infor_item">
          <div class="infor_item_name">专业</div>
          <!-- <span>{{}}</span> -->
          <div class="infor_item_content">
            <el-input
              v-model="predict_input.major"
              placeholder="请输入专业"
              clearable
            />
          </div>
        </div>
        <div class="infor_item" v-if="predict_offer_drawer">
          <div>
            <el-button type="success" @click="predict_offer"
              >确认提交<el-icon class="el-icon--right"><CircleCheck /></el-icon
            ></el-button>
          </div>
        </div>
        <div class="infor_item" v-else>
          <div>
            <el-button type="success" @click="upload_offer"
              >确认上传Offer数据<el-icon class="el-icon--right"><Upload /></el-icon
            ></el-button>
          </div>
        </div>
        <div class="infor_item" v-if="predict_result_shown&&predict_offer_drawer">
          <div>
            <el-button type="danger" @click="clear_predict_data"
              >清空数据<el-icon class="el-icon--right"><Warning /></el-icon
            ></el-button>
          </div>
        </div>
        <div class="infor_item" v-if="predict_result_shown&&predict_offer_drawer">
        <el-table :data="this.predict_result">
          <el-table-column property="school_name" label="预测结果" width="400" />
        </el-table>
      </div>
      </div>
    </el-drawer>

    <div class="left_text" v-if="isCreated">
      候鸟留学平台为您智能推荐【<span style="color: coral">{{
        this.all_num
      }}</span
      >】家世界著名学校
    </div>
    <div v-else class="left_text">
      搜索结果如下,【<span style="color: coral">{{ this.all_num }}</span
      >】所学校符合你的搜索
    </div>
    <hr />
    <!-- 三个排名的罗列 -->
    <div class="rank_row">
      <p class="rank_text QS_rank_test">QS排名</p>
      <p class="rank_text">THE排名</p>
      <p class="rank_text">USNews排名</p>
    </div>
    <div class="downBox">
      <div v-for="(school, index) in school_list" :key="index">
        <school-card :school="school"></school-card>
        <br />
      </div>
    </div>
  </div>
  <div class="pagination_field">
    <el-row justify="center">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="PAGESIZE"
        :total="all_num"
        @current-change="curChange"
      />
    </el-row>
  </div>
</template>
<script>
import axios from "axios";
import { onMounted, ref } from "vue";
import SchoolCard from "../components/SchoolCard.vue";
import { ElMessage } from "element-plus";
export default {
  components: {
    SchoolCard,
    ElMessage,
  },
  data() {
    return {
      cur_page: 1,
      page_num: 90,
      PAGESIZE: 5,
      all_num: 0,
      school_list: [], //经过筛选条件后下面展示的大学
      all_school_list: [], //最初赋值获得的所有大学
      search_value: "",
      isLoading: false,
      isCreated: true,
      //以下为offer上传相关变量
      ai_drawer_visible: false,
      predict_result_shown:false,
      predict_offer_drawer:false,
      predict_result:[],
      predict_input: {
        toefl_language: 0,
        ielts_language: 0.0,
        gpa: 85.0,
        year: 2023,
        school: "",
        major: "",
      },
      school_level_options: [
        {
          value: "985&211",
          label: "985&211高校",
        },
        {
          value: "211",
          label: "211高校",
        },
        {
          value: "其它双一流高校",
          label: "其它双一流高校",
        },
        {
          value: "双非",
          label: "非双一流高校",
        },
        {
          value: "海本",
          label: "海外高校",
        },
      ],
      //以下为搜索限定词 & offer上传选择词
      rank_type_value: ref(""),
      country_value: ref(""),
      year_value: ref("2022"),
      country_options: [
        {
          value: "美国",
          label: "美国",
        },
        {
          value: "英国",
          label: "英国",
        },
        {
          value: "澳洲",
          label: "澳洲",
        },
        {
          value: "加拿大",
          label: "加拿大",
        },
        {
          value: "新西兰",
          label: "新西兰",
        },
        {
          value: "新加坡",
          label: "新加坡",
        },
        {
          value: "爱尔兰",
          label: "爱尔兰",
        },
        {
          value: "中国香港",
          label: "中国香港",
        },
        {
          value: "其他",
          label: "其他",
        },
      ],
      rank_type_options: [
        {
          value: "QS_rank",
          label: "QS排名",
        },
        {
          value: "THE_rank",
          label: "THE排名",
        },
        {
          value: "USNews_rank",
          label: "USNews排名",
        },
      ],
      year_options: [
        {
          value: "2022",
          label: "2022",
        },
        {
          value: "2021",
          label: "2021",
        },
        {
          value: "2020",
          label: "2020",
        },
      ],
    };
  },
  methods: {
    curChange(res) {
      this.cur_page = res;
      this.filter();
    },
    goSearch() {
      this.$router.push({
        path: "/school_detail",
        query: {
          school_id: this.search_value,
        },
      });
    },
    clear_predict_data(){
      this.predict_input={
        toefl_language: 0,
        ielts_language: 0.0,
        gpa: 85.0,
        year: 2023,
        school: "",
        major: "",
      },
      this.predict_result=[],
      this.predict_result_shown = false
    },
    predict_offer() {
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
      }
      this.predict_result_shown = false
      console.log(this.predict_input)
      var language_score = ""
      if(this.predict_input.ielts_language!=0.0)
      {
        language_score = this.predict_input.ielts_language //+ "-9.0"
      }
      else if (this.predict_input.toefl_language!=0){
        language_score = this.predict_input.toefl_language //+ "-120"
      }
      else{
        ElMessage.error("请完善语言成绩再进行预测");
        return;
      }
      if(this.predict_input.school == "" || this.predict_input.major == "")
      {
        ElMessage.error("请完善相关信息再进行预测");
        return;
      }
      console.log(this.predict_input)
      axios({
        url: "spring/ai" + "?total=" + language_score + "&gpa=" + this.predict_input.gpa //+"-100" 
            + "&year=" + this.predict_input.year + "&school=" + this.predict_input.school + "&subject=" + this.predict_input.major + "&sid=4",
        method: "get",
      })
        .then((res) => {
          console.log(res)
          if(res.data.status){
            this.predict_result_shown = true
            this.predict_result = []
            for(let i = 0; i < res.data.data.length; ++i)
            {
              var dict = {}
              dict["school_name"] = res.data.data[i];
              this.predict_result.push(dict); 
            }
            console.log(this.predict_result)
          }
        })
        .catch((errMsg) => {
          console.log(errMsg);
          console.log("预测失败");
        });

    },
    upload_offer(){
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
      }
      var language_score = ""
      if(this.predict_input.ielts_language!=0.0)
      {
        language_score = this.predict_input.ielts_language //+ "/9.0"
      }
      else if (this.predict_input.toefl_language!=0){
        language_score = this.predict_input.toefl_language //+ "/120"
      }
      else{
        ElMessage.error("请完善语言成绩再进行上传");
        return;
      }
      if(this.predict_input.school == "" || this.predict_input.major == "")
      {
        ElMessage.error("请完善相关信息再进行上传");
        return;
      }
      console.log(language_score)
      console.log(this.predict_input.gpa)
      console.log(this.predict_input.year)
      console.log(this.predict_input.school)
      console.log(this.predict_input.major)
      axios.post("spring/ai",{
        total:language_score,
        gpa: this.predict_input.gpa,
        year: this.predict_input.year,
        school: this.predict_input.school,
        subject: this.predict_input.major,
      })
        .then((res) => {
          console.log(res)
          // if(res.data.status){
            ElMessage.success("Offer上传成功！您得到10鸟币奖励")
            this.ai_drawer_visible = false
            this.clear_predict_data()
          // }
        })
        .catch((errMsg) => {
          console.log(errMsg);
          console.log("上传失败");
        });

    },
    filter() {
      this.isCreated = false;
      this.isLoading = true;
      var x = ""; //需要拼接的判断
      if (this.country_value == "" && this.rank_type_value == "") {
        x =
          "rank_year=" +
          this.year_value +
          "&" +
          "page=" +
          this.cur_page +
          "&" +
          "page_size=" +
          this.PAGESIZE;
      } else if (this.country_value == "" && this.rank_type_value != "") {
        x =
          "rank_year=" +
          this.year_value +
          "&" +
          "page=" +
          this.cur_page +
          "&" +
          "page_size=" +
          this.PAGESIZE +
          "&" +
          "tag=" +
          this.rank_type_value;
      } else if (this.country_value != "" && this.rank_type_value == "") {
        x =
          "rank_year=" +
          this.year_value +
          "&" +
          "page=" +
          this.cur_page +
          "&" +
          "page_size=" +
          this.PAGESIZE +
          "&" +
          "university_country=" +
          this.country_value;
      } else {
        x =
          "rank_year=" +
          this.year_value +
          "&" +
          "page=" +
          this.cur_page +
          "&" +
          "page_size=" +
          this.PAGESIZE +
          "&" +
          "tag=" +
          this.rank_type_value +
          "&" +
          "university_country=" +
          this.country_value;
      }
      axios({
        url: "spring/college/list?" + x,
        method: "get",
      })
        .then((res) => {
          console.log("num:");
          console.log(res);
          this.all_num = res.data.obj.college_num;
          this.page_num = Math.ceil(this.all_num / this.PAGESIZE); //向上取整
          this.school_list = res.data.obj.collegeBasicInfoList;
          this.isLoading = false;
          window.scrollTo(0, 0); //将滚动条回滚至最顶端
        })
        .catch((errMsg) => {
          console.log(errMsg);
          console.log("获取新的all_num失败");
        });
    },
  },
  created() {
    this.isCreated = true;
    this.isLoading = true;
    axios({
      url: "spring/college/list" + "?rank_year=" + this.year_value,
      method: "get",
    })
      .then((res) => {
        console.log("页面初始化");
        console.log(res);
        this.all_num = res.data.obj.college_num;
        this.page_num = Math.ceil(this.all_num / this.PAGESIZE); //向上取整
        this.all_school_list = res.data.obj.collegeBasicInfoList;
        //进行当页数据检索
        axios({
          url:
            "spring/college/list" +
            "?rank_year=" +
            this.year_value +
            "&" +
            "page_size=" +
            this.PAGESIZE +
            "&page=" +
            this.cur_page,
          method: "get",
        })
          .then((res) => {
            this.school_list = res.data.obj.collegeBasicInfoList;
            this.isLoading = false;
          })
          .catch((errMsg) => {
            console.log(errMsg);
            console.log("第二层初始化大失败");
          });
      })
      .catch((errMsg) => {
        console.log(errMsg);
        console.log("第一层初始化大失败");
      });
    /*在此处向服务器请求数据，初始化所需变量*/
  },
};
</script>

<style scoped >
.upBox {
  background-image: linear-gradient(#a6c1ee, #d3afa5);
  height: 275px;
  width: 100%;
  /* padding: 20px; */
}
.my_top_layout {
  height: 70px;
  display: flex;
  position: relative;
  /* justify-content: space-around; */
}
.sch_box {
  position: absolute;
  bottom: 0; /*使其位于父节点的底层*/
  text-align: center;
  margin-left: -20px;
  margin-bottom: 10px;
  padding-top: 5px;
  height: 30px;
  width: 100px;
  background: cornflowerblue;
  color: azure;
  border: 2px solid cornflowerblue;
  border-radius: 8px;
  font-size: 20px;
}
.searchBox {
  background-color: #969393; /*;*/
  opacity: 0.6; /*不透明度*/
  background-blend-mode: overlay;
}
.bottom_button {
  text-align: left;
  margin-left: 20%;
  display: flex;
  align-items: center;
}
.drawing {
  height: 90%;
  object-fit: cover; /*图片缩放自适应原图的比例 */
}
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
  color: white;
}
.grid-content {
  border-radius: 4px;
  min-height: 70px;
}
.left_text {
  color: cadetblue;
  text-align: left;
  margin: 20px;
  margin-left: 6%;
  font-size: 19px;
}
.rank_row {
  background: rgb(245, 242, 242);
  display: flex;
  margin: 20px;
}
p.rank_text {
  color: coral;
  font-size: 17px;
  margin-left: 45px;
}
p.QS_rank_test {
  margin-left: 8.5%;
  /* 120px; */
}
.search_component {
  margin-left: 35%;
  margin-top: 2.8%;
}
.pagination_field {
  margin-top: 10px;
  margin-bottom: 10px;
}
.body_card {
  width: 95%;
  margin-left: 2.5%;
  border-radius: 17px;
  background: linear-gradient(#ffffffd0, #bdecfdd5);
  box-shadow: -5px -5px 10px #eff0f0, 5px 5px 10px #ffffff;
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
</style>
