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
                      :key="item.university_id"
                      :label="item.university_chname"
                      :value="item.university_id"
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
                <div style="margin: 10px; vertical-align: bottom">
                  <!-- 搜索键 -->
                  <el-button
                    type="warning"
                    size="large"
                    color="#626aef"
                    @click="filter"
                    >搜索</el-button
                  >
                </div>
              </el-footer>
            </el-container>
          </el-container>
        </el-aside>
        <el-main>
          <img src="../assets/school_center.jpg" class="drawing" />
        </el-main>
      </el-container>
    </div>

    <div class="left_text">
      搜索结果如下,【<span style="color: coral">{{
        this.all_num
      }}</span
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
  <div>
    <el-row justify="center">
      <el-pagination background layout="prev, pager, next" :page-size="PAGESIZE" :total="all_num" @current-change="curChange"/>
    </el-row>
  </div>
</template>
<script>
import axios from "axios";
import { onMounted, ref } from "vue";
import SchoolCard from "../components/SchoolCard.vue";

export default {
  components: {
    SchoolCard,
  },
  data() {
    return {
      cur_page: 1,
      page_num: 90,
      PAGESIZE: 5,
      all_num:0,
      school_list: [], //经过筛选条件后下面展示的大学
      all_school_list: [], //最初赋值获得的所有大学
      search_value: "",
      isLoading: false,
      //以下为搜索限定词
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
        {
          value: "2019",
          label: "2019",
        },
      ],
    };
  },
  methods: {
    curChange(res){
      this.cur_page = res
      this.filter()
    },
    goSearch() {
      this.$router.push({
        path: "/school_detail",
        query: {
          school_id: this.search_value,
        },
      });
    },
    filter() {
      this.isLoading = true;
      var x = ""; //需要拼接的判断
      if (this.country_value == "" && this.rank_type_value == "") {
        x = "?rank_year=" + this.year_value + "&" + "page=" + this.cur_page + "&" + "page_size=" + this.PAGESIZE;
      } else if (this.country_value == "" && this.rank_type_value != "") {
        x =
          "?rank_year=" + this.year_value + "&" + "page=" + this.cur_page 
          + "&" + "page_size=" + this.PAGESIZE
          +"&" + "tag=" + this.rank_type_value;
      } else if (this.country_value != "" && this.rank_type_value == "") {
        x =
          "?rank_year=" +
          this.year_value +
           "&" + "page=" + this.cur_page + "&" + "page_size=" + this.PAGESIZE+
          "&" +
          "university_country=" +
          this.country_value;
      } else {
        x =
          "?rank_year=" +
          this.year_value +
          "&" + "page=" + this.cur_page + "&" + "page_size=" + this.PAGESIZE+
          "&" +
          "tag=" +
          this.rank_type_value +
          "&" +
          "university_country=" +
          this.country_value;
      }
      axios({
        // 点击搜索时加载符合条件的数据
        url: "university/rank" + x,
        method: "get",
      })
        .then((res) => {
          console.log(res);
          console.log(res.data.data.university_list);
          console.log("搜索成功");
          console.log(this.country_value);
          console.log(this.rank_type_value);
          this.school_list = res.data.data.university_list;
          this.isLoading = false;
        })
        .catch((errMsg) => {
          console.log(errMsg);
          console.log("大失败");
        });
    },
  },
  created() {
    this.isLoading = true;
    axios({
      url: "university/num" + "?rank_year=" + this.year_value,
      method: "get",
    })
      .then((res) => {
        this.all_num = res.data.data.num
        this.page_num = Math.ceil(res.data.data.num / this.PAGESIZE); //向上取整
        this.all_school_list = res.data.data.university_list;
        //进行当页数据检索
        axios({
          url: "university/rank" + "?rank_year=" + this.year_value +
          "&" + "page_size=" + this.PAGESIZE,
          method: "get",
        })
          .then((res) => {
            this.school_list = res.data.data.university_list;
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
</style>
