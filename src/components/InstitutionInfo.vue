<!--
机构信息
描述：展示机构各板块信息（详情页最上）
作者：张子涵
-->
<template>
  <el-container class="info_table">
      <el-aside width=60% class="left">
          <div class="con1"  style="width:100%;float:left;" >
          <img :src="this.institution.institution_profile"  class="institution_profile">
           <div style="float:left;text-align:left;">
            <p class="p1" style="font-size:30px">{{institution.institution_name}}</p>
            <p class="p1">{{institution.institution_name}}</p>
            <p class="p1">{{institution.institution_abbreviation}}</p>
           </div>
           <span style="float:right;margin-top: 50px;margin-right: 50px;">
            <follow-button
                        object_type="2"
                        :object_id=" this.$route.query.institution_id "
                        @giveFollow="follow"
                        @cancelFollow="unFollow"
                        
            ></follow-button></span>
          </div> 
          <p style="float:left;padding:20px;">
            <span class="con2_span" style="float:left;text-align:left;">{{institution.institution_introduction}}</span> 
            <span class="show" style="float:right;text-align:right;"></span> <!---->
          </p>
  </el-aside>

<el-main>相关图片
        <div class="container">
    <div class="lunbo" @mouseenter="clear" @mouseleave="run">
        
      <div class="img" >
        <img :src="dataList[currentIndex]" alt="" />
      </div>
        
      <div class="dooted" v-if="this.dataList.length">
        <ul class="doo">
          <li 
            v-for="(item, index) in this.dataList"
            :key="index"
            :class="{ current: currentIndex == index }"
            @click="gotoPage(index)"
          ></li>
        </ul>
      </div>
        
      <div class="right_turn turn" @click="next()">
        <i class="el-icon-arrow-right"></i>
      </div>
       
      <div class="left_turn turn " @click="up()">
        <i class="el-icon-arrow-left"></i>
      </div>
    </div>

  </div>

      </el-main>
    </el-container>
    
    </template>

<script>
//到时候传入一个
import Loading from "../components/Loading.vue"
import FollowButton from "../components/FollowButton.vue";
export default {
  components:{
    FollowButton,
    Loading
  },
  props: ["institution"],

    data () {
    return {
      dataList: [],
      currentIndex: 0, // 默认显示图片
      timer: null // 定时器
    }
  },
  created () {
    this.run()
  },
  updated(){
    this.dataList=this.institution.institution_photo;
  },
  methods: {
      //点击小圆圈切换图片
    gotoPage (index) {
      this.currentIndex = index
    },
      //下一张
    next () {
      if (this.currentIndex === this.dataList.length - 1) {
        this.currentIndex = 0
      } else {
        this.currentIndex++
      }
    },
      //上一张
    up () {
      if (this.currentIndex === 0) {
        this.currentIndex = this.dataList.length - 1
      } else {
        this.currentIndex--
      }
    },
      //清除定时器
    clear () {
      clearInterval(this.timer)
    },
    // 定时器
    run () {
      this.timer = setInterval(() => {
        this.next()
      }, 2000)
    }
  }

};
</script>

<style scoped>


.info_table{
  height: 400px; 
  width: 100%; 
  color:white;
  
  background: rgb(26, 46, 80);
  background-image: linear-gradient(#a6c1ee, #d3afa5);
  opacity: 1; 
  z-index: -1;
}

.institution_profile{
  background:white;
  margin:30px;
  margin-bottom: 0;
  height: 100px;
  width: 100px;
  float:left;
}

.left{
  color:white;
  border: black;
}

.left::-webkit-scrollbar{
  background-color: rgb(36, 56, 90);
  background-image: linear-gradient(#a6c1ee, #d3afa5);
  color: rgb(26, 46, 80);
}


ul li {
  float: left;
  width: 30px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  color: rgba(240, 238, 238, 0.8);
  font-size: 14px;
}
.container {
  position: relative;
  height: 90%;
  width: 100%;
  margin: 0 ;
}

.container  .img {  
    width: 100%;
    height: 350px;
    border: 1px solid gray;
  }
  .container  .img img {  
    width: 100%;
    height: 350px;
  }
  .dooted {
    position: absolute;
    bottom: -10px;
    right: 0px;
  }

.turn {
  width: 30px;
  height:30px;
  line-height: 20px;
  border-radius: 5px;
  cursor: pointer;
  background-color: #9d9d9d73;
}
.right_turn {
  position: absolute;
  top: 100px;
  right: 0;
}
.left_turn {
  position: absolute;
  top: 100px;
  left: 0;
}
.current {
  color: gray;
}

</style>


