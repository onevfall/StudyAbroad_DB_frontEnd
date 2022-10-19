<!--
描述：天气展示组件
作者：焦佳宇
-->
<template>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span class="city_name">{{weather_info.city.name}}</span>
          <span>{{weather_info.city.country}}</span>
          <span>{{(weather_info.list[0].dt_txt).slice(0,(weather_info.list[0].dt_txt).indexOf(" "))}}</span>
        </div>
      </template>
      <div class="main_weather">
        <span class="tem_description">
            {{weather_info.list[0].main.temp.toFixed(0)+"℃"}}
        </span>
        <div>
            <span class="weather_description">{{weather_info.list[0].weather[0].description}}</span>
            
        </div>
      </div>

      <div>
        <el-row >
          <el-col :span="14">
            <div class="weather_info">
              <span class="weather_info_label">体感温度: </span>
              <span class="weather_info_value">{{weather_info.list[0].main.feels_like+"℃"}}</span>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="weather_info">
              <span class="weather_info_label">湿度: </span>
              <span class="weather_info_value">{{weather_info.list[0].main.humidity+"%"}}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-row>
          <el-col :span="14">
            <div class="weather_info">
              <span class="weather_info_label">风向: </span>
              <span class="weather_info_value">{{windDirection}}</span>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="weather_info">
              <span class="weather_info_label">风速: </span>
              <span class="weather_info_value">{{weather_info.list[0].wind.speed+"m/s"}}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-row>
          <el-col :span="14">
            <div class="weather_info">
              <span class="weather_info_label">可见度: </span>
              <span class="weather_info_value">{{visibility}}</span>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="weather_info">
              <span class="weather_info_label">降水概率: </span>
              <span class="weather_info_value">{{weather_info.list[0].pop*100+"%"}}</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </template>
  <script>
    export default{
        props:["weather_info"],
        computed:{
            windDirection(){
                var wind_deg=this.weather_info.list[0].wind.deg;
                if(wind_deg>=0&&wind_deg<22.5){
                    return "北风";
                }
                else if(wind_deg>=22.5&&wind_deg<67.5){
                    return "东北风";
                }
                else if(wind_deg>=67.5&&wind_deg<112.5){
                    return "东风";
                }
                else if(wind_deg>=112.5&&wind_deg<157.5){
                    return "东南风";
                }
                else if(wind_deg>=157.5&&wind_deg<202.5){
                    return "南风";
                }
                else if(wind_deg>=202.5&&wind_deg<247.5){
                    return "西南风";
                }
                else if(wind_deg>=247.5&&wind_deg<292.5){
                    return "西风";
                }
                else if(wind_deg>=292.5&&wind_deg<337.5){
                    return "西北风";
                }
                else if(wind_deg>=337.5&&wind_deg<=360){
                    return "北风";
                }
            },
            visibility(){
                var visibility=this.weather_info.list[0].visibility;
                if(visibility<1000){
                    return visibility+"m";
                }
                else if(visibility<10000){
                    return (visibility/1000).toFixed(1)+"km";
                }
                else{
                    return ">10km";
                }
            }
        }
    }
  </script>
  <style scoped>
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .text {
    font-size: 14px;
  }
  
  .item {
    margin-bottom: 18px;
  }
  
  .box-card {
    width:99%;
  }
  .tem_description{
    font-weight: bolder;
    font-size: xx-large;
  }
  .weather_description{
    font-weight: bolder;
    font-size: x-large;
  }
  .city_name{
    font-weight: bolder;
    font-size: large;
  }
  .main_weather{
    margin-top: 10px;
    text-align: center;
    margin-bottom: 20px;
  }
  .weather_info{
    font-weight: 400;
  }
  .weather_info_label{
    font-weight: normal;
  }
  .weather_info_value{
    font-weight:normal;
  }
  </style>