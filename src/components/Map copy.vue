<!--
高校地图
描述：留作备用的调用方法
作者：张子涵
-->
<template>
  <!--bmap框-->
  <div class="bmap" id="container"></div>
   <div>{{school.university_chname}}关键字的检索结果</div> 
</template>

<script>

export default {
  name: 'BmapDemo',
  props:["school"],
  data(){//存一下map
    return {
      thisMap: "",
    };
    },
  updated(){//一开始数据没到，更新渲染呗
    var map =this.thisMap;
    var local = new BMapGL.LocalSearch(map, {
		  renderOptions:{map: map}
	  });
    //let {sc}=props;
    console.log(this.school.university_chname);
    //console.log(prop.school);
    console.log("test fot props");
    //local.search(this.school.university_chname); 
	  
  },
  mounted() {
	  var map = new BMapGL.Map("container"); 
    this.thisMap=map;         
	  map.centerAndZoom(new BMapGL.Point(42.374443, -71.116943), 15);
	  map.enableScrollWheelZoom(true); 

    const scaleCtrl = new BMapGL.ScaleControl();  // 添加比例尺控件
    map.addControl(scaleCtrl);
    const zoomCtrl = new BMapGL.ZoomControl();  // 添加缩放控件
    map.addControl(zoomCtrl);
    const cityCtrl = new BMapGL.CityListControl();  // 添加城市列表控件
    map.addControl(cityCtrl);
  // 其他两种控件添加方法类似
 // ...
  }
}
</script>

<style scoped>
.bmap {
  width: 600px;
  height: 400px;
  border: 1px solid #000;
}
</style>

