<template>
    <scroll class="suggest"
            :data="result"
            :pull-up="pullUp"
            :before-scroll="beforeScroll"
            @beforeScroll="listScroll"
            @scrollToEnd="searchMore"
            ref="suggest"
    >
        <ul class="suggest-list">
            <li class="suggest-item"
                v-for="item in result"
                @click="selectItem(item)"
            >
                <div class="icon">
                    <i :class="getIconCls(item)"></i>
                </div>
                <div class="name">
                    <p class="text" v-html="getDisplayName(item)"></p>
                </div>
            </li>
            <loading v-show="hasMore"></loading>
        </ul>
        <div class="no-result-wrapper" v-show="!hasMore && !result.length">
            <no-result title="抱歉，没找到相关歌曲！"></no-result>
        </div>
    </scroll>
</template>

<script>
    import {search} from "../../api/search";
    import {ERR_OK} from "../../api/config";
    import {createSong} from '../../assets/js/song'
    import Scroll from "../../base/scroll/scroll";
    import Loading from '../../base/loading/loading'
    import {mapMutations, mapActions} from 'vuex'
    import Singer from "../../assets/js/singer";
    import NoResult from '../../base/no-result/no-result'

    const TYPE_SINGER = 'singer'
    const PERPAGE = 20

    export default {
        name: "suggest",
        components: {Scroll, Loading, NoResult},
        props: {
            query: {
                type: String,
                default: ''
            },
            showSinger: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                page: 1,
                result: [],
                pullUp: true,
                beforeScroll: true,
                hasMore: true
            }
        },
        methods: {
            selectItem(item){
                if(item.type === TYPE_SINGER) {
                    const singer = new Singer({
                        id: item.singermid,
                        name: item.singername
                    })
                    this.$router.push({
                        path: `/search/${singer.id}`
                    })
                    this.setSinger(singer)
                }else{
                    this.insertSong(item)
                }
                this.$emit('select')
            },
            search() {
                this.hasMore = true
                this.page = 1
                this.$refs.suggest.scrollTo(0, 0)
                search(this.query, this.page, this.showSinger, PERPAGE).then((res) => {
                    if (res.code === ERR_OK) {
                        this.result = this._getResult(res.data)
                        this._checkMore(res.data)
                    }
                })
            },
            searchMore() {
                if (!this.hasMore) {
                    return
                }
                this.page++
                search(this.query, this.page, this.showSinger, PERPAGE).then((res) => {
                    if (res.code === ERR_OK) {
                        this.result = this.result.concat(this._getResult(res.data))
                        this._checkMore(res.data)
                    }
                })
            },
            getIconCls(item) {
                if (item.type === TYPE_SINGER) {
                    return 'icon-mine'
                } else {
                    return 'icon-music'
                }
            },
            getDisplayName(item) {
                if (item.type === TYPE_SINGER) {
                    return item.singername
                } else {
                    return `${item.name}-${item.singer}`
                }
            },
            refresh(){
                this.$refs.suggest.refresh()
            },
            listScroll() {
                this.$emit('listScroll')
            },
            _checkMore(data) {
                const song = data.song
                if (!song.list.length || (song.curnum + song.curpage * PERPAGE) > song.totalnum) {
                    this.hasMore = false
                }
            },
            _getResult(data) {
                let ret = []
                if (data.zhida && data.zhida.singerid) {
                    ret.push({...data.zhida, ...{type: TYPE_SINGER}})
                }
                if (data.song) {
                    ret = ret.concat(this._normalizeSongs(data.song.list))
                }
                return ret
            },
            _normalizeSongs(list) {
                let ret = []
                list.forEach((musicData) => {
                    if (musicData.songid && musicData.albumid) {
                        ret.push(createSong(musicData))
                    }
                })
                return ret
            },
            ...mapMutations({
                setSinger: 'SET_SINGER'
            }),
            ...mapActions([
                'insertSong'
            ])
        },
        watch: {
            query() {
                this.search()
            }
        }
    }
</script>

<style scoped lang='stylus'>
    @import "../../assets/stylus/variable.styl"
    @import "../../assets/stylus/mixin.styl"

    .suggest
        height 100%
        overflow hidden

        .suggest-list
            padding 0 30px

            .suggest-item
                display flex
                align-items center
                padding-bottom 20px

            .icon
                flex 0 0 30px
                width 30px

                [class^="icon-"]
                    font-size 14px
                    color $color-text-d

            .name
                flex 1
                font-size $font-size-medium
                color $color-text-d
                overflow hidden

                .text
                    no-wrap()

        .no-result-wrapper
            position absolute
            width 100%
            top 50%
            transform translateY(-50%)
</style>
