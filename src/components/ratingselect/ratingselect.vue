<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span
          class="count">{{ratings.length}}</span></span>
      <span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span
          class="count">{{positives.length}}</span></span>
      <span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span
          class="count">{{negatives.length}}</span></span>
    </div>
    <div class="switch" @click="toggleContent(0,$event)" :class="{'on':onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;

    export default {
      props: {
       ratings: {
         type: Array,
         default() {
          return [];
         }
        },
        selectType: {
          type: Number,
          default: ALL
        },
        onlyContent: {
          type: Boolean,
          default: false
        },
        desc: {
          type: Object,
          default() {
            return {
              all: '全部',
              positive: '满意',
              negative: '不满意'
            };
          }
        }
      },
      computed: {
       positives() {
          return this.ratings.filter((rating) => {
            return rating.rateType === POSITIVE;
          });
        },
        negatives() {
          return this.ratings.filter((rating) => {
            return rating.rateType === NEGATIVE;
          });
        }
      },
      methods: {
        select(type, event) {
          if (!event._constructed) {
            return;
          }
          this.$emit('select', type);
        },
        toggleContent() {
          if (!event._constructed) {
            return;
          }
          this.$emit('toggle', this.onlyContent);
        }
      }
    };
</script>

<style lang="stylus">
  .ratingselect
    width:100%
    .rating-type
     line-height:16px
     border-radius:12px
     font-sias:12px
     color:#6F7C83
     span
      display:inline-block
      font-size:12px
      padding:0 4px
      margin:10px 0
      cursor:pointer
      &.all
       background:#E8E8E8
       &.active
        color:#fff
        background:#1DB0FF
      &.positive
       margin-left:10px
       background:#E8E8E8
       &.active
        color:#fff
        background:#1DB0FF
      &.negative
       margin-left:12px
       background:#E8E8E8
       &.active
        color:#fff
        background:#1DB0FF
      b
       padding-left:4px
    .switch
     color:#666
     padding:0 18px
     cursor:pointer
     &.on
      .icon-check_circle
       color:green
      .text
       color:green
     .text
      span
       display:inline-block
       vertical-align:middle
       font-size:12px   
</style>

