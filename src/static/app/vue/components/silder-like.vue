<template>
  <div class="box">
    <div class="box-inr" :style="{width, height}">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
    name: 'SilderLike',
    props: {
        value: Number,
        height: {
            type: String,
            default: '330px'
        },
        width: {
            type: String,
            default: '330px'
        },
        dragDistance: {
            type: Number,
            default: 100
        },
        baseIndex: {
            type: Number,
            default: 1000
        },
        topSpace: {
            type: Number,
            default: 40
        },
        showCardNumber: {
            type: Number,
            default: 3
        }
    },
    data() {
        return {
            itemCount: 0
        };
    },
    watch: {
    },
    mounted() {
    },
    methods: {
        addCard() {
            this.itemCount++;
            this.$emit('input', this.itemCount);
        },
        removeCard() {
            this.itemCount--;
            this.$children.map((item, index) => item.init(index + 1));
            this.$emit('input', this.itemCount);
        },
        getTopCard() {
            return this.$children[0] || null;
        }
    }
};
</script>

<style lang="less" scoped>
.box{
  width: 100%;
  .box-inr{
    position: relative;
    margin: 0 auto;
  }
}
</style>
