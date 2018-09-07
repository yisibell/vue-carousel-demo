<template>
  <div class="whirligig" :style="{width: containerWidth + 'px' , height: containerHeight + 'px'}">
    <ul class="imgs" @mousemove="autoplay && stopPlay()" @mouseout="autoplay && loop()">
      <li v-for="(v,i) in styleList" :key="i" :style="v.style" @click="go(v.data)">
        <img :src="data[i].src" alt="图跑了" title="">
      </li>
    </ul>

    <ol class="dots" :style="{ marginLeft : '-' + len * 40 / 2 + 'px' }">
      <li v-for="(v,i) in len" :key="i" :class="{ on : curr === i }" @mouseover="goOne(i)"></li>
    </ol>

    <a href="javascript:;" class="prev" @click="prev">&lt;</a>
    <a href="javascript:;" class="next" @click="next">&gt;</a>
  </div>
</template>


<script>
export default {
  name: "whirligig",
  data(){
    return {
      curr : 0,
      styleList: [],
      timer: null
    }
  },
  props: {
    containerWidth: {
      type: Number,
      default: 800
    },
    containerHeight: {
      type: Number,
      default: 300
    },
    currWidth: {
      type: Number,
      default: 400
    },
    currHeight: {
      type: Number,
      default: 280
    },
    scale: {
      type: Number,
      default: 0.8
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    },
    data: {
      type: Array,
      default: function(){
        return new Array(
          { src: '../images/slidepic1.jpg'},
          { src: '../images/slidepic2.jpg'},
          { src: '../images/slidepic3.jpg'},
          { src: '../images/slidepic4.jpg'},
          { src: '../images/slidepic5.jpg'},
          { src: '../images/slidepic6.jpg'},
        )
      }
    } 
  },
  computed: {
    len: function(){
      return this.data.length;
    }
  },
  created(){
    this.initLayout()
    this.autoplay && this.loop()
  },
  methods: {
    next(){
      this.curr < this.len -1 ? this.curr ++ : this.curr = 0
      
      this.styleList.push( this.styleList.shift() )
    },
    prev(){
      this.curr > 0 ? this.curr -- : this.curr = this.len - 1
      this.styleList.unshift( this.styleList.pop() )
    },
    go(info){
      this.$emit('jump' , info)
    },
    loop(){
      this.timer && clearInterval(this.timer)
      this.timer = setInterval( this.next , this.interval )
    },
    stopPlay(){
      clearInterval(this.timer)
      this.timer = null;
    },
    goOne(index){
     
      var oldIndex = this.curr;
      var step = Math.abs(index - oldIndex)
      var dir = index - oldIndex;

      if( dir > 0)
      this.forFun(step , dir)
      else if ( dir < 0 )
      this.forFun(step , dir)
      
    },
    forFun(end , dir){
      for(var i=0; i< end ; i++){
       if( dir > 0 )
       this.next();
       else if ( dir < 0 )
       this.prev();
      }
    },
    //初始化卡片布局
    initLayout(){
      var list = [...this.data];

      //获取中间索引
      var midIndex = Math.floor( this.len / 2 );

      //两边剩余空间
      var leftGap = ( this.containerWidth - this.currWidth ) / 2 

      //折叠间隙
      var gap = leftGap / midIndex;

      list.forEach( (v,i)=>{
        var o = {}
        var obj = {}
        o.data = v;

        if ( i <= midIndex ){ //1. 左侧布局，包含主图
         
          //从左往右，其left值是gap倍数增长
          obj.left = i*gap;
          //层叠参数逐级增1
          obj.zIndex = i+1;
          //透明度则简单做逐级增大
          obj.opacity = 1/(midIndex+1-i);
          //宽高则按距离中间项的个数来选择缩放
          obj.width = this.currWidth*Math.pow( this.scale,midIndex-i);
          obj.height = this.currHeight*Math.pow( this.scale,midIndex-i);
          //底部距离取最大高与当前项高差的一半
          obj.bottom = ( this.containerHeight - obj.height)/2;

        }else{  //2. 右侧布局

          obj.width = this.currWidth*Math.pow(this.scale,i - midIndex);
          obj.height = this.currHeight*Math.pow(this.scale,i - midIndex);
          obj.zIndex = 1-i;
          obj.opacity = 1/(i+1);
          obj.bottom = (this.containerHeight-obj.height)/2;
          //右侧卡片 left 值 计算规则：
          // 间隔个数 * 间隔  +  (容器宽度的一半 + 主图宽度的一半 + 折叠间隔 - 当前卡片的宽度)
          obj.left = (i - midIndex -1) * gap + ((this.containerWidth + this.currWidth ) / 2) + gap - obj.width;

        }

        obj.left += 'px'
        obj.width += 'px'
        obj.height += 'px'
        obj.bottom += 'px'

        // obj.backgroundImage = 'url(' + v.src + ')'
        // obj.backgroundSize = "100% 100%"

        o.style = obj;

        this.styleList.push( o )
      })
    }
  }
}
</script>


<style lang="scss" scoped>
  ul,ol,li{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  a{
    text-decoration: none;
  }

  .whirligig{
    margin: 0 auto; 
    // border: 1px solid skyblue;
    position: relative;
    overflow: hidden;
    ul{
      width: 100%;
      height: 100%;
      position: relative;
      li{
        position: absolute;
        cursor: pointer;
        transition: all .8s ease;
        &:nth-child(2n){
          background-color: azure;
        }
        &:nth-child(2n-1){
          background-color: antiquewhite;
        }

        img{
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }

    //小圆点
    ol{
      position: absolute;
      left: 50%;
      bottom: 20px;
      border-radius: 10px;
       z-index: 1024;
      li{
        width: 30px;
        height: 2px;
        background-color: #fff;
        float: left;
        margin: 2px 5px;
        cursor: pointer;
        
        &.on{
          background-color: rgba(0,0,0,.4);
        }
      }
    }

    //左右箭头
    a{
      &.prev , &.next{
        position : absolute;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: rgba(0,0,0,0.5);
        top : 50%;
        margin-top:-25px;
        line-height :50px;
        text-align :center;
        font-size : 24px;
        font-family: "simsun";
        color:#fff;
        transition : all .2s;
        z-index: 1024;
      }
    }
    .next{
      right: -1000px;
    }
    .prev{
      left : -1000px;
    }
    &:hover{
      .next{ right: 10px;}
    }
    &:hover{
      .prev{ left: 10px;}
    }


  }

</style>
