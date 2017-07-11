<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="item" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index)">
          <span class="text border-1px">
          <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" :key="item" class="food-list food-list-hook" ref="foodList">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" :key="food" class="food-item" @click="selectFood(food,$event)">
              <div class="icon">
                <img :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="description">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="new">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <v-cartcontrol :food="food"></v-cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <v-shopcart ref='shopcart' :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></v-shopcart>
    <!--:delivery-price  组件上传递数据，要在shopcart组件的prop中接收参数-->
    <v-food :food="selectedFood" ref="food"></v-food>
  </div>
</template>
<script>
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart';
  import cartcontrol from '../cartcontrol/cartcontrol';
  import food from '../food/food';
  const ERR_OK = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      };
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            };
          });
        });
        return foods;
      }
    },
    components: {
      'v-shopcart': shopcart, // 外部组件要先用 import引入 再在此处注册一下
      'v-cartcontrol': cartcontrol,
      'v-food': food
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$ajax.get('/api/goods')
        .then((response) => {
          if (response.data.errno === ERR_OK) {
            this.goods = response.data.data;
            this.$nextTick(() => { // 操作原生DOM 的时候必须调用这个回调
              this._initScroll();
              this._calculateHeight();
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    methods: {
      //  函数命名方式：
      //  _calculateHeight 前面带下划线的是只能在此vue中调用，不带的是有可能在外部调用
      _initScroll() {
        this.meunScroll = new BScroll(this.$refs.menuWrapper, {});
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3, // 探针的作用
          click: true // 将点击事件传出去
        });
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() {
        let foodList = this.$refs.foodList; // 通过rel自定义指令来获取DOM节点
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      selectMenu(index) {
        let foodList = this.$refs.foodList;
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      selectFood(food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.food.show();
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"; 
  .goods
   display:flex
   position:absolute
   top:174px
   bottom:46px
   width:100%
   overflow:hidden
   .menu-wrapper
    flex:0 0 80px
    width:80px
    background:#f3f5f7
    .menu-item
     display:table
     font-size:12px
     width:56px
     height:54px
     line-height:14px
     padding:0 12px
     &.current
      background-color:#fff
      cursor:pointer
     .icon
      display:inline-block
      vertical-align:top
      width:12px
      height:12px
      margin-right:2px
      background-size:12px 12px
      background-repeat:no-repeat
      &.decrease
       bg-image('images/decrease_1')
      &.discount
       bg-image('images/discount_1')
      &.guarantee
       bg-image('images/guarantee_1')
      &.invoice
       bg-image('images/invoice_1')
      &.special
       bg-image('images/special_1')
     .text
       display:table-cell
       width:56px
       vertical-align:middle
       border-1px(rgba(7,17,27,0.1))
       font-size:12px
   .foods-wrapper
    flex:1
    .title
     padding-left:14px
     height:26px
     line-height:26px
     border-left:2px solid #d9dde1
     font-size:12px
     color:rgb(147,153,159)
     background:#f3f5f7
    .food-item
      display:flex
      margin:18px
      padding-bottom:18px
      border-1px:(rgba(7,17,27,0.1))
      &:last-child
       border-none()
       margin-bottom:0
      .icon
       flex:0 0 57px
       margin-right:10px
      .content
       flex:1
      .name
       margin:2px 0 8px 0
       height:14px
       line-height:14px
       font-size:14px
       color:rgb(7,17,27)
      .description
       font-size:12px
       color:#555
       padding-bottom:8px
       line-height:14px
      .desc,.extra
       line-height:10px
       font-size:10px
       color:rgb(147,153,159)
      .desc
       margin-bottom:8px
      .extra
       line-height:10px 
       &.count
        margin-right:12px
      .price
       font-weight:700
       line-height:24px
       .new
        margin-right:8px
        font-size:14px
        color:#F01414
       .old
        text-decoration:line-through
        font-size:10px
        color:#999
      .cartcontrol-wrapper
       position:absolute
       right:0
       bottom:0
</style>