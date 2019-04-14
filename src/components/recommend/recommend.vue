<template>
    <div class="recommend" ref="recommend">
        <scroll ref="scroll" class="recommend-content">
            <div>
                <div v-if="recommends.length" class="slider-wrapper">
                    <slider>
                        <div v-for="item in recommends" :key="item.id" v-cloak>
                            <a :href="item.linkUrl">
                                <img @load="loadImage" :src="item.picUrl">
                            </a>
                        </div>
                    </slider>
                </div>
                <div class="recommend-list" :data="discLists">
                    <h1 class="list-title">热门歌单推荐</h1>
                    <ul>
                        <li class="item"
                            v-for="item in discLists"
                            :key="item.dissid"
                        >
                            <div class="icon">
                                <img v-lazy="item.imgurl" width="60" height="60">
                            </div>
                            <div class="text">
                                <h2 class="name" v-html="item.creator.name"></h2>
                                <p class="desc" v-html="item.dissname"></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="loading-container" v-show="!discLists.length">
                <loading></loading>
            </div>
        </scroll>
    </div>
</template>

<script>
    import {getRecommend, getDiscList} from "../../api/recommend";
    import {ERR_OK} from "../../api/config";
    import Slider from '../../base/slider/slider'
    import Scroll from '../../base/scroll/scroll'
    import Loading from '../../base/loading/loading'
    import {playlistMixin} from "../../assets/js/mixin";

    export default {
        name: "recommend",
        components: {
            Slider,
            Scroll,
            Loading
        },
        mixins: [playlistMixin],
        data() {
            return {
                recommends: [],
                discLists: []
            }
        },
        created() {
            this._getRecommend()
            this._getDiscList()
        },
        methods: {
            handlePlaylist(playlist) {
                const bottom = playlist.length > 0 ? '60px' : ''
                this.$refs.recommend.style.bottom = bottom
                this.$refs.scroll.refresh()
            },
            _getRecommend() {
                getRecommend().then((res) => {
                    if (res.code === ERR_OK) {
                        this.recommends = res.data.slider
                    }
                })
            },
            _getDiscList() {
                getDiscList().then((res) => {
                    if (res.code === ERR_OK) {
                        this.discLists = res.data.list
                    }
                })
            },
            loadImage() {
                if (!this.checkLoaded) {
                    this.$refs.scroll.refresh()
                    this.checkLoaded = true
                }
            }
        }
    }
</script>

<style lang='stylus'>
    @import "../../assets/stylus/variable.styl"

    .recommend
        position: fixed
        width: 100%
        top: 88px
        bottom: 0

        .recommend-content
            height: 100%;
            overflow: hidden

            .slider-wrapper
                position: relative
                width: 100%
                overflow: hidden

            .recommend-list
                .list-title
                    height: 65px
                    line-height: 65px
                    text-align: center
                    font-size: $font-size-medium
                    color: $color-theme

                .item
                    display: flex
                    box-sizing: border-box
                    align-items: center
                    padding: 0 20px 20px 20px

                    .icon
                        flex: 0 0 60px
                        width: 60px
                        padding-right: 20px

                    .text
                        display: flex
                        flex-direction: column
                        justify-content: center
                        flex: 1
                        line-height: 20px
                        overflow: hidden
                        font-size $font-size-medium

                        .name
                            margin-bottom: 10px
                            color: $color-text

                        .desc
                            color: $color-text-d

            .loading-container
                position: absolute
                width: 100%
                top: 50%
                transform: translateY(-50%)
</style>
