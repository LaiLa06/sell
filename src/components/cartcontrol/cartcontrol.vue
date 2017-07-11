<template>
  <div class="countcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
        <!--.stop.prevent  阻止事件冒泡-->
        <span class="inner icon-remove_circle_outline"></span>
     </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script>
  import Vue from 'vue';
  export default{
      props: {
          food: {
              type: Object
          }
      },
      created() {
      },
      methods: {
          addCart(event) {
            if (!event._constructed) {
              return;
            }
            if (!this.food.count) {
               Vue.set(this.food, 'count', 1);
            } else {
                this.food.count ++;
            }

            this.$root.eventHub.$emit('addCart', event.target);
             // 组件间进行事件的通信，
            // 在main.js中声明了Data eventHub
          },
          decreaseCart() {
            if (!event._constructed) {
              return;
            };
            if (this.food.count) {
                this.food.count --;
            };
          }
      }
  };
</script>

<style lang="stylus">
 .countcontrol
  font-size:0
  .cart-decrease
   display:inline-block
   transition: all .4s linear
   &.move-enter-active
     opacity:1
     transform:translate3d(0,0,0)    // 3d加速使动画流畅
     .inner
      transition: all 10.4s linear
      transform:rotate(0)
   &.move-enter, &.move-leave-active
     opacity:0
     transform:translate3d(24px,0,0)
     .inner
      transform:rotate(360deg)
   .inner
    display:inline-block
    font-size:24px
    padding:6px
    line-height:24px
    transition: all .4s linear
    &.icon-remove_circle_outline
     color:#13A4FD
  .cart-count
   display:inline-block
   vertical-align:top
   width:12px
   padding-top:6px
   line-height:24px
   text-align:center
   color:#13A4FD
   font-size:12px
  .cart-add
   display:inline-block
   padding:6px
   font-size:24px
   color:#13A4FD
</style>

