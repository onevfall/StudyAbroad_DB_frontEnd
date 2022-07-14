<!--
机构地图
描述：展示机构地理信息位置
作者：张子涵
-->
<template>
  <!--bmap框-->
  <div class="bmap" id="container"></div>
   <div>{{institution.institution_name}}关键字的检索结果</div> 
</template>

<script>

export default {
  name: 'IMap',
  props:["institution"],
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
    console.log(this.institution.institution_name);
    //console.log(prop.school);
    console.log("test fot props");
    local.search(this.institution.institution_name); 

  
  },
  mounted(){
    console.log("test for map");
    var map = new BMapGL.Map("container"); 
    this.thisMap=map;         
	  map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 15);
	  map.enableScrollWheelZoom(true); 

    const scaleCtrl = new BMapGL.ScaleControl();  // 添加比例尺控件
    map.addControl(scaleCtrl);
    const zoomCtrl = new BMapGL.ZoomControl();  // 添加缩放控件
    map.addControl(zoomCtrl);
    const cityCtrl = new BMapGL.CityListControl();  // 添加城市列表控件
    map.addControl(cityCtrl);

  }
}
</script>

<style scoped>
.bmap {
  width: 100%;
  height: 400px;
  border: 1px solid #000;
}
</style>

