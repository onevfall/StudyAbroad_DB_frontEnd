<!--
描述：用于大学中心的显示，包括大学排名、检索等信息
作者：蔡明宏
-->
<template>
  <div class="school-center-layout">
    <!-- 上半区-->
    <div class="upBox">
      <el-container>
        <el-aside width="70%">
          <!-- 搜索栏内部 -->
          <el-container>
            <!-- 左侧空白 -->
            <el-aside width="200px">Aside</el-aside>
            <el-container>
              <!-- 一个“关于大学”的按钮，一个搜索栏 -->
              <el-header>
                关于大学的盒子
                <!-- 搜索栏，可以考虑封装 -->
                <!-- <template>
                  <el-select
                    v-model="value"
                    multiple
                    filterable
                    remote
                    reserve-keyword
                    placeholder="Please enter a keyword"
                    :remote-method="remoteMethod"
                    :loading="loading"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select> </template> -->
              </el-header>

              <!-- 左侧为国家 -->
              <!-- 右侧为排行榜，有两个选择栏 -->
              <!-- 下方为搜索键 -->
              <el-main>
                  <el-row :gutter="10" justify="space-between">
                    <el-col :span="6">
                      <div class="grid-content ep-bg-purple">
                        国家
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content">
                        <span>排行榜类型</span>
                        <br>
                        <el-select v-model="value" class="m-2" placeholder="Select" size="large">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content">
                        排行榜年份
                      </div>
                    </el-col>
                  </el-row>
              </el-main>
            </el-container>
          </el-container>
        </el-aside>
        <el-main>
          <img src="../assets/school_center.jpg" class="drawing" />
        </el-main>
      </el-container>
    </div>

    <div class="downBox"></div>
  </div>
</template>
<script>
import axios from "axios";
import { onMounted, ref } from "vue";

const value = ref('')
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
export default {
  components: {},
  data() {
    return {};
  },
  created() {
    /*在此处向服务器请求数据，初始化所需变量*/
  },
};
</script>

<style scoped >
.upBox {
  background-image: linear-gradient(#a6c1ee, #d3afa5);
  height: 280px;
  width: 100%;
}
.drawing {
  height: 240px;
  object-fit: cover; /*图片缩放自适应原图的比例 */
}
.el-row {
  margin-bottom: 20px;
  background-color: blanchedalmond;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
  background-color: aqua;
  color:black;
}
.grid-content {
  border-radius: 4px;
  min-height: 70px;
}
</style>
