<!--
描述：充值界面——用于鸟币充值的页面
作者：蔡明宏
-->
<template>
  <div class="coin_home">
    <div class="floor">
      <div class="user-info" style="background-image: url(https://img-home.csdnimg.cn/images/20211115092019.png);">
        <img src="https://profile.csdnimg.cn/A/1/4/1_qq_54928033" alt="" class="user-head" >
        <a class="user-head-warp"></a>
        <div class="user-desc">
          <div class="user-d-t">
            <span class="user-name">onevfall{{  }}</span>
          </div>
          <!-- 下面这个标明等级 -->
          <p class="user-d-c">等级；3{{}}</p> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>

.floor{
  margin: 8px auto;
  width: 80%;
}
.user-info {
    height: 96px;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    border-radius: 8px 8px 0 0;
    color: #fff;
    padding: 0 16px;
    background: #1a1a2a url(https://csdnimg.cn/release/cmsfe/public/img/head-bg.0da969ec.png) 50% no-repeat;
    background-size: cover;
    position: relative;
}
.user-info .user-head {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-top: 16px;
    margin-right: 8px;
}
.user-info .user-head-warp {
    position: absolute;
    width: 65%;
    height: 100%;
    left: 150px;
}
.user-info .user-desc {
    -webkit-box-flex: 1;
    flex-grow: 1;
    margin-top: 16px;
}
.user-info .user-desc .user-d-t{
  text-align: left;
    margin-bottom: 4px;
}
.user-info .user-desc .user-d-t .user-name{
    
    color: #fff;
    font-size: 16px;
    line-height: 24px;
    cursor: pointer;
}
.user-info .user-desc .user-d-c {
  text-align: left;
    color: #ccccd8;
    font-size: 12px;
    line-height: 22px;
}

</style>

