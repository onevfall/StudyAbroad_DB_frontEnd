<template>
  <!--bmap框-->
 
  <div class="bmap" id="container"></div>
   <div>{{school}}关键字的检索结果</div> 
</template>

<script>
export default {
  name: 'BmapDemo',
  props:{
    school:{
      type:String,
      require:true
    }
  },
  data(){

  },
  mounted () {
    //this.school=prop.school;
	  var map = new BMapGL.Map("container");          
	  map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 15);
	  map.enableScrollWheelZoom(true); 

    var local = new BMapGL.LocalSearch(map, {
		  renderOptions:{map: map}
	  });
    //let {sc}=props;
    //console.log(sc);
    console.log("test fot props");
	  local.search(this.school); 

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

