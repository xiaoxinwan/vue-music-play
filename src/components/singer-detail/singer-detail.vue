<template>
    <transition name="slide">
        <div class="singer-detail"></div>
    </transition>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {getSingerDetail} from "../../api/singer";
    import {ERR_OK} from "../../api/config";

    export default {
        name: "singer-detail",
        computed: {
            ...mapGetters([
                'singer' // 相当于this.$store.getters.singer
            ])
        },
        created() {
            console.log(this.singer);
            this._getSingerDetail()
        },
        methods: {
            _getSingerDetail() {
                if(!this.singer.id) {
                    this.$router.push('/singer')
                    return
                }
                getSingerDetail(this.singer.id).then((res)=> {
                    if(res.code === ERR_OK) {
                        console.log(res.data)
                    }
                })
            }
        }

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
