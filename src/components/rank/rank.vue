<template>
    <div class="rank" ref="rank">
       <scroll class="topList" ref="topList" :data="topList">
           <ul>
               <li class="item"
                   v-for="list in topList"
                   :key="list.id"
                   @click="selectItem(list)"
               >
                   <div class="icon">
                       <img width="100" height="100" v-lazy="list.picUrl">
                   </div>
                   <ul class="songList">
                       <li class="song" v-for="(item,index) in list.songList">
                           <span class="index">{{index + 1}}</span>
                           <span>{{item.songname}}-{{item.singername}}</span>
                       </li>
                   </ul>
               </li>

           </ul>
           <div class="loading-container" v-show="!topList.length">
               <loading></loading>
           </div>
       </scroll>
        <router-view></router-view>
    </div>
</template>

<script>
    import Loading from '../../base/loading/loading'
    import {getTopList} from "../../api/rank";
    import {ERR_OK} from "../../api/config";
    import Scroll from "../../base/scroll/scroll";
    import {playlistMixin} from "../../assets/js/mixin";
    import {mapMutations} from 'vuex'

    export default {
        name: "rank",
        data(){
            return{
                topList: []
            }
        },
        mixins: [playlistMixin],
        components: {
            Scroll,
            Loading
        },
        created() {
            this._getTopList()
        },
        methods: {
            selectItem(list){
                this.$router.push({
                    path: '/rank/${list.id}'
                })
                this.setTopList(list)
            },
            handlePlaylist(playlist){
                const bottom = playlist.length? '60px' : ''
                this.$refs.rank.style.bottom = bottom
                this.$refs.topList.refresh()
            },
            _getTopList() {
                getTopList().then((res) => {
                    if(res.code === ERR_OK) {
                        this.topList = res.data.topList
                    }
                })
            },
            ...mapMutations({
                setTopList: 'SET_TOP_LIST'
            })
        }
    }
</script>

<style scoped lang='stylus'>
    @import "../../assets/stylus/variable.styl"
    @import "../../assets/stylus/mixin.styl"

    .rank
        position fixed
        width 100%
        top 88px
        bottom 0
        .topList
            height 100%
            overflow hidden
            .item
                display flex
                margin 0 20px
                padding-top 20px
                height 100px
                &:last-child
                    padding-bottom 20px
                .icon
                    flex 0 0 100px
                    width 100px
                    height 100px
                .songList
                    flex 1
                    display flex
                    flex-direction column
                    justify-content center
                    padding 0 20px
                    height 100px
                    overflow hidden
                    background $color-highlight-background
                    color $color-text-d
                    font-size $font-size-small
                    .song
                        no-wrap()
                        line-height 26px
                        .index
                            padding-right 1em
            .loading-container
                position absolute
                width 100%
                top 50%
                transform translateY(-50%)
</style>
