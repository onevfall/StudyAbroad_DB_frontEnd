<!--
描述：用于机构中心的显示，包括机构显示、检索等信息
作者：蔡明宏
-->
<template>
  <div
    class="school-center-layout body_card"
    v-loading.fullscreen.lock="isLoading"
    element-loading-text="正在加载"
  >
    <!-- 上半区-->
    <!-- <page-loading v-show="isLoading"></page-loading> -->
    <div class="upBox">
      <el-container>
        <el-aside width="65%">
          <!-- 搜索栏内部 -->
          <el-container>
            <!-- 左侧空白 -->
            <el-aside width="25%"></el-aside>
            <el-container>
              <!-- 一个“关于机构”的按钮，一个搜索栏 -->
              <el-header class="my_top_layout">
                <div class="sch_box">关于机构</div>
                <!-- 搜索栏，可以考虑封装成一个组件，实现实时字段匹配 multiple reserve-keyword -->
                <div class="search_component">
                  <el-select
                    v-model="search_value"
                    filterable
                    remote
                    clearable
                    placeholder="请输入机构名称"
                    :remote-method="remoteMethod"
                    :loading="loading"
                    size="large"
                  >
                    <el-option
                      v-for="item in all_institution_list"
                      :key="item.institution_id"
                      :label="item.institution_name"
                      :value="item.institution_id"
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
                        <span>所在省份</span>
                        <br />
                        <el-select
                          v-model="pname"
                          @change="chooseProvince"
                          clearable
                          class="m-2"
                          placeholder="请选择"
                          size="large"
                        >
                          <el-option
                            v-for="(item, index) in province"
                            :key="index"
                            :label="item.value"
                            :value="item.id"
                          />
                        </el-select>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content">
                        <span>所在城市</span>
                        <br />
                        <el-select
                          v-model="cname"
                          @change="chooseCity"
                          clearable
                          class="m-2"
                          placeholder="请选择"
                          size="large"
                        >
                          <el-option
                            v-for="(item, index) in city"
                            :key="index"
                            :label="item.value"
                            :value="item.id"
                          />
                        </el-select>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content">
                        <span>留学国家</span>
                        <br />
                        <el-select
                          v-model="institution_target"
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
        <el-main class="cover_up">
          <div>
            <div class="cover">
              <img src="../assets/institution_center.jpg" class="drawing" />
            </div>
          </div>
        </el-main>
      </el-container>
    </div>

    <div>
      <div class="left_text" v-if="isCreated">
        候鸟留学平台为您智能推荐【<span style="color: coral">{{
          this.all_num
        }}</span
        >】家中国机构
      </div>
      <div v-else class="left_text">
        搜索结果如下,【<span style="color: coral">{{ this.all_num }}</span
        >】所机构符合你的搜索
      </div>
      <hr />
      <div class="downBox">
        <div v-for="(institution, index) in institution_list" :key="index">
          <institution-card :institution="institution"></institution-card>
          <br />
        </div>
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
import InstitutionCard from "../components/InstitutionCard.vue";
import PageLoading from "../components/PageLoading.vue";
export default {
  components: {
    InstitutionCard,
    PageLoading,
  },
  data() {
    return {
      cur_page: 1,
      page_num: 90,
      PAGESIZE: 5,
      all_num: 0,
      institution_list: [], //经过筛选条件后下面展示的机构
      all_institution_list: [], //最初赋值获得的所有机构
      search_value: "",
      isLoading: false,
      isCreated: true,
      //以下为搜索限定词
      pname: "", //省的名字
      cname: "", //市的名字
      institution_target: "", //面向国家
      city_data: require("../assets/city_data.json"), //加载城市json文件
      //对城市的处理
      province: [],
      shi1: [],
      city: [],
      //面向国家的选择
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
    };
  },
  methods: {
    curChange(res) {
      this.cur_page = res;
      this.filter();
    },
    goSearch() {
      this.$router.push({
        path: "/institution_detail",
        query: {
          institution_id: this.search_value,
        },
      });
    },

    filter() {
      this.isLoading = true;
      this.isCreated = false;
      
      var x = ""; //需要拼接的判断
      if (this.pname != "") {
        //省份非空，就加入省份
        x += "institution_province=" + this.pname;
      }
      if (this.cname != "") {
        x += "&" + "institution_city=" + this.cname;
      }
      if (this.institution_target != "") {
        x += "&" + "institution_target=" + this.institution_target;
      }
      x += "&" + "page=" + this.cur_page + "&" + "page_size=" + this.PAGESIZE;
      console.log(x);
      axios({
      url: "api/institution/num?" + x,
      method: "get",
       })
      .then((res) => {
        this.all_num = res.data.data.num;
        this.page_num = Math.ceil(res.data.data.num / this.PAGESIZE); //向上取整
        console.log(this.all_num);
      })
      .catch((errMsg) => {
            console.log(errMsg);
            console.log("1111");
          });

      axios({
        // 点击搜索时加载符合条件的数据
        url: "api/institution/list?" + x,
        method: "get",
      })
        .then((res) => {
          console.log(res);
          console.log(res.data.data.institution_list);
          console.log("机构搜索成功");
          console.log(this.country_value);
          console.log(this.rank_type_value);
          this.institution_list = res.data.data.institution_list;
          this.isLoading = false;
          window.scrollTo(0, 0); //将滚动条回滚至最顶端
        })
        .catch((errMsg) => {
          console.log(errMsg);
          console.log("机构列表信息失败");
        });
    },
    //获取城市数据
    getCityData: function () {
      let that = this;
      that.city_data.forEach(function (item, index) {
        //省级数据
        that.province.push({
          id: item.adcode,
          value: item.name,
          children: item.districts,
        });
      });
    },
    // 选省
    chooseProvince: function (e) {
      let that = this;
      that.city = [];
      that.cname = "";
      for (var index2 in that.province) {
        if (e === that.province[index2].id) {
          that.shi1 = that.province[index2].children;
          that.pname = that.province[index2].value;
          that.shi1.forEach(function (citem, cindex) {
            that.city.push({
              id: citem.adcode,
              value: citem.name,
              children: [],
            });
          });
        }
      }
      console.log(that.pname);
    },
    // 选市
    chooseCity: function (e) {
      let that = this;
      for (var index3 in that.city) {
        if (e === that.city[index3].id) {
          that.cname = that.city[index3].value;
        }
      }
      console.log(that.cname);
    },
  },
  mounted() {
    this.getCityData();
  },
  created() {
    this.isCreated = true;
    this.isLoading = true;
    axios({
      url: "api/institution/num",
      method: "get",
    })
      .then((res) => {
        this.all_num = res.data.data.num;
        this.page_num = Math.ceil(res.data.data.num / this.PAGESIZE); //向上取整
        this.all_institution_list = res.data.data.institution_list;
        console.log(this.all_num);
        //进行当页数据检索
        axios({
          url: "api/institution/list?" + "page_size=" + this.PAGESIZE,
          method: "get",
        })
          .then((res) => {
            this.institution_list = res.data.data.institution_list;
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
  },
};
</script>

<style scoped >
.upBox {
  background-image: linear-gradient(#a6c1ee, #d3afa5);
  height: 275px;
  width: 100%;
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
  opacity: 0.6;
  background-blend-mode: overlay;
}
.cover_up {
  padding-left: 8%;
}
.cover {
  width: 300px;
  height: 230px;
  position: relative;
}
.cover:after {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  box-shadow: 0 0 10px 10px #ffffff inset;
}
.drawing {
  /* height: 220px; */
  /* height: 90%;
  object-fit: cover; 图片缩放自适应原图的比例 */
  width: 300px;
  height: 230px;
  display: block;
  margin-bottom: 20px;
  /* margin-left: 20px; */
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
  width:95%;
  margin-left: 2.5%;
  border-radius: 17px;
  background: linear-gradient(#ffffffd0, #bdecfdd5);
  box-shadow: -5px -5px 10px #eff0f0, 5px 5px 10px #ffffff;
}
</style>
