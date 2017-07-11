<template>
    <transition name="open">
        <div class="food" v-show="showFlog" ref="food">
            <div class="food-content">
                <div class="img-header">
                    <img class="img" :src="food.image" alt="">
                    <div class="back" @click="hide">
                        <i class="icon-arrow_lift"></i>
                    </div>
                </div>
                <div class="info">
                    <h2 class="name">{{food.name}}</h2>
                    <div class="countNum">
                        <span>月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class="newPrice">￥{{food.price}}</span>
                        <span class="oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                        <v-cartcontrol :food="food"></v-cartcontrol>
                    </div>
                    <transition name="fade">
                        <div class="buy" @click="addFirst" v-show="!food.count || food.count===0">加入购物车</div>
                    </transition>
                </div>
                <div class="describe" v-show="food.info">
                    <h1 class="title">商品介绍</h1>
                    <p class="desc-info">{{food.info}}</p>
                </div>
                <div class="rating">
                    <h1 class="title">商品评价</h1>
                    <v-rating @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></v-rating>
                </div>
                <div class="rating-wrapper">
                    <ul v-show="food.ratings && food.ratings.length">
                        <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" :key="rating" class="rating-item border-1px">
                            <div class="user">
                                <span class="name">{{rating.username}}</span>
                                <img class="avatar" width="12" height="12" :src="rating.avatar">
                            </div>
                            <div class="time">{{rating.rateTime | formatDate}}</div>
                            <p class="text">
                                <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                            </p>
                        </li>
                    </ul>
                    <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
                </div>
            </div>
        </div>
        </div>
    </transition>
</template>

<script>
    import BScroll from 'better-scroll';
    import Vue from 'vue';
    import {formatDate} from '../../common/js/date';  // 带花括号 是export function不是export default
    import cartcontrol from '../cartcontrol/cartcontrol';
    import ratingselect from '../ratingselect/ratingselect';
    const ALL = 2;
    export default {
        props: {
            food: {
                type: Object
            }
        },
        data() {
            return {
                showFlog: false,
                selectType: ALL,
                onlyContent: true,
                desc: {
                    all: '全部',
                    positive: '推荐',
                    negative: '吐槽'
                }
            };
        },
        methods: {
            show() {
                this.showFlog = true;
                this.selectType = ALL; // 要初始化一下
                this.onlyContent = false;
                this.$nextTick(() => {
                    if (!this.scroll) {
                        console.log(111);
                        this.scroll = new BScroll(this.$refs.food, {
                            click: true
                        });
                    } else {
                        console.log(222);
                        this.scroll.refresh();
                    }
                });
            },
            hide() {
                this.showFlog = false;
            },
            addFirst(event) {
                if (!event._constructed) {
                    return;
                }
                this.$root.eventHub.$emit('addCart', event.target);
                Vue.set(this.food, 'count', 1);
            },
            addFood(target) {
             this.$root.eventHub.$emit('addCart', target);
           },
            needShow(type, text) {
                if (this.onlyContent && !text) {
                    return false;
                }
                if (this.selectType === ALL) {
                    return true;
                } else {
                    return type === this.selectType;
                }
            },
            selectRating(type) {
                this.selectType = type;
                this.$nextTick(() => {
                    this.scroll.refresh();
                });
            },
            toggleContent() {
                this.onlyContent = !this.onlyContent;
                this.$nextTick(() => {
                    this.scroll.refresh();
                });
            }
        },
        filters: {
            formatDate(time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm');
            }
        },
        components: {
            'v-cartcontrol': cartcontrol,
            'v-rating': ratingselect
        },
        mounted() {}
    };
    // 父组件可以调用子组件的方法，子组件不可调用父组件的方法
    // 如果想调用的话，这涉及到父子组件间的事件的传递，
</script>

<style lang="stylus">
  @import "../../common/stylus/mixin";  
  .food
   position:fixed
   left:0
   top:0
   bottom:48px
   z-index:30
   width:100%
   background:#F3F5F7
   &.open-enter-active
     transition:all 0.4s linear
     transform:translate3d(0,0,0)
   &.open-enter, &.open-leave-active
     transform:translate3d(100%,0,0)
   .img-header
    position:relative
    width:100%
    height:0
    padding-top:100%
    .img
     position:absolute
     top:0
     left:0
     width:100%
     height:100%
    .back
     position:absolute
     top:14px
     left:10px
     cursor:pointer
     .icon-arrow_lift
      color:#fff
      font-size:18px
   .info
    position:relative
    padding:18px
    border-1px:(rgba(7,17,27,0.1))
    background:#fff
    .name
     font-size:16px
     line-height:14px
     font-weight:700
     color:rgb(7,17,27)
    .countNum
     font-size:12px
     color:#999
     padding:10px 0
    .price
     font-size:0
     .newPrice
      font-size:16px
      color:#F01414
     .oldPrice
      font-size:12px
      text-decoration:line-through
      color:#999
      padding-left:10px
    .cartcontrol-wrapper
      position:absolute
      right:18px
      bottom:18px
    .buy
     position:absolute
     right:18px
     bottom:18px
     z-index:20
     height:30px
     padding:0 12px
     box-sizing:border-box
     line-height:30px
     border-radius:28px
     background:rgb(0,160,220)
     color:#fff
     font-size:10px
     cursor:pointer
     opacity: 1
     &.fade-enter-active, &.fade-leave-active
      transition: all 0.2s
     &.fade-enter, &.fade-leave-active
      opacity: 0
      z-index: -1
   .describe
    padding:18px
    margin-top:16px
    border-top:1px solid #E2E3E4
    border-bottom:1px solid #E2E3E4
    background:#fff
    .title
      padding-bottom:6px
      font-size:16px
      color:#020C16
      font-weight:700
    .desc-info
     line-height:1.5
     font-size:12px
     color:#4E565E
     font-weight:200
   .rating
      padding: 18px 18px
      margin-top:16px
      background:#fff
      .title
        line-height: 14px
        font-size: 14px
        color: rgb(7, 17, 27)
   .rating-wrapper
    padding: 0 18px
    background:#fff
    .rating-item
     position: relative
     padding: 16px 0
     border-1px(rgba(7, 17, 27, 0.1))
     .user
      position: absolute
      right: 0
      top: 16px
      line-height: 12px
      font-size: 0
      .name
       display: inline-block
       margin-right: 6px
       vertical-align: top
       font-size: 10px
       color: rgb(147, 153, 159)
      .avatar
       border-radius: 50%
    .time
     margin-bottom: 6px
     line-height: 12px
     font-size: 10px
     color: rgb(147, 153, 159)
    .text
     line-height: 16px
     font-size: 12px
     color: rgb(7, 17, 27)
     .icon-thumb_up, .icon-thumb_down
      margin-right: 4px
      line-height: 16px
      font-size: 12px
      .icon-thumb_up
       color: rgb(0, 160, 220)
      .icon-thumb_down
       color: rgb(147, 153, 159)
    .no-rating
     padding: 16px 0
     font-size: 12px
     color: rgb(147, 153, 159)
</style>
