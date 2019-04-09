<template>
    <transition name="slide">
        <div class="singer-detail"></div>
    </transition>
</template>

<script>
    export default {
        name: "singer-detail"
    }
</script>

<style lang='stylus'>
    @import "../../assets/stylus/variable.styl"

    .singer-detail
        position: fixed
        top: 0
        left: 0
        bottom: 0
        right: 0
        z-index: 100
        background: $color-background

    .slide-enter-active, .slide-leave-active
        transition: all .3s
    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
</style>
