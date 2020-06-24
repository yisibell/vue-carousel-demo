# @aidol/vue-carousel

A carousel component for vue.js

## Installation
**Using npm**

``` bash
npm install @aidol/vue-carousel --save
# or 
cnpm install @aidol/vue-carousel --save
```

## Usage

**In main.js**
``` js
import Vue from 'vue'
import AiCarousel from '@aidol/vue-carousel'

Vue.use(AiCarousel)

// new Vue({ //...})
```
**In_.vue**

``` html
<ai-carousel :containerWidth="800" :containerHeight="300" :currWidth="400" :currHeight="280" :data="imgList" @jump="jumpTo" />
```

``` js
export default {
  data(){
    return {
      imgList: [
        {src: ""}
        // ...
      ]
    }
  },
  methods: {
    jumpTo(info){
      // `info` is the data which you setted before 
      // so something when you click current main img
    }
  }
}
```

## Properties

| 属性 | 类型 | 说明 | 可选值 | 默认值 | 是否必需 |
| :----: | :----: | :----: | :----: | :----: | :----: |
| containerWidth | Number | 容器宽度 | - | 800 | 否 |
| containerHeight| Number | 容器高度 | - | 300 | 否 |
| currWidth|Number| 中间主图宽度 | - | 400 | 否 |
| currHeight| Number | 中间主图高度 | - | 280 | 否 |
| scale|Number | 两侧卡片缩放比例 | - | 0.8 | 否 |
| autoplay | Boolean | 是否自动播放 | false | true | 否 |
| interval | Number | 自动播放间隔毫秒数 | - | 3000 | 否 |
| data| Array of object | 展示数据 | - | 本地演示数据 | 是 |

**注：**

> `data` props 为对象数组类型， 且每个对象中必须包含 `src` (图片地址) 属性。

``` js
[
  { src: 'http://www.example/a.png', alt: '图片加载出错了', title: '这是图片 title' },
  { src: 'http://www.example/b.png', alt: '图片加载出错了', title: '这是图片 title' },
  { src: 'http://www.example/c.png', alt: '图片加载出错了', title: '这是图片 title' }
  // ...
]
```

图片的数据个数最好为 **奇数**，这样布局会比较协调。

## Events

**@jump**

> 点击主图时触发句柄

``` js
export default {
  data(){
    return {}
  },
  methods: {
    jumpTo(info){
      // `info` is the data which you setted before 
      // so something when you click current main img
    }
  }
}
```

## Logs

1. 2020/6/24 rebuild

2. 2018/9/6 init
