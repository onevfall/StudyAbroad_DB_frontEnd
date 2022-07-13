<!--
加载图标
描述：加载图标动画
作者：张子涵
-->
<template>
<div id="anime_box">
    <div id="anime_point_1"></div>
    <div id="anime_point_2"></div>
    <div id="anime_point_3"></div>
    <div id="anime_point_4"></div>
</div>
    </template>

<script>
//到时候传入一个
export default {
  computed: {
    contentShow() {
      
    },
  },
  methods:{
  }
};
</script>

<style scoped>


#anime_box{
    position: relative;
    left: 50%;
    top: 20px;
    width: 100px;
    height: 100px;
    transform: translateX(-50px);
    background-color: white;
}
#anime_point_1,#anime_point_2,#anime_point_3,#anime_point_4{
    position: absolute;
}
#anime_point_1{
    left: 0;
    top: 0;
    background-color: blue;
    animation: anime_point_1 2s infinite;
}
#anime_point_2{
    right: 0;
    bottom: 0;
    background-color: red;
    animation: anime_point_2 2s infinite;
}
#anime_point_3{
    left: 20px;
    top: -20px;
    width: 2px;
    height: 140px;
    background-color: black;
    animation: anime_point_3 2s infinite;
}
#anime_point_4{
    left: -20px;
    top: 20px;
    width: 140px;
    height: 2px;
    background-color: black;
    animation: anime_point_4 2s infinite;
}

@keyframes anime_point_1{
    0%{width: 20px;height: 20px;}
    25%{width: 80px;height: 20px;}
    50%{width: 80px;height: 80px;}
    75%{width: 20px;height: 80px;}
    100%{width: 20px;height: 20px;}
}
@keyframes anime_point_2{
    0%{width: 80px;height: 80px;}
    25%{width: 20px;height: 80px;}
    50%{width: 20px;height: 20px;}
    75%{width: 80px;height: 20px;}
    100%{width: 80px;height: 80px;}
}
@keyframes anime_point_3{
    0%{left: 20px;}
    25%{left: 80px;}
    50%{left: 80px;}
    75%{left: 20px;}
    100%{left: 20px;}
}
@keyframes anime_point_4{
    0%{top: 20px;}
    25%{top: 20px;}
    50%{top: 80px;}
    75%{top: 80px;}
    100%{top: 20px;}
}


</style>


