import AiCarousel from './carousel.vue'

AiCarousel.install = function(Vue){
  Vue.component( AiCarousel.name , AiCarousel )
}

export default AiCarousel