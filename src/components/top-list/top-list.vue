<template>
    <transition name="slide">
        <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script>
    import MusicList from 'components/music-list/music-list'
    import {mapGetters} from 'vuex'
    import {getMusicList} from "../../api/rank";
    import {createSong} from "../../assets/js/song";
    import {ERR_OK} from "../../api/config";

    export default {
        name: "top-list",
        components: {
            MusicList
        },
        data() {
            return {
                songs: []
            }
        },
        computed: {
            title(){
                return this.topList.topTitle
            },
            bgImage() {
                if(this.songs.length){
                    return this.songs[0].image
                }
                return ''
            },
            ...mapGetters([
                'topList'
            ])
        },
        created() {
            this._getMusicList(this.topList.id)
        },
        methods: {
            _getMusicList(id) {
                if(!this.topList.id){
                    this.$router.push('/rank')
                    return
                }
                getMusicList(id).then((res)=>{
                    if(res.code === ERR_OK){
                        this.songs = this._normalizeSongs(res.songlist)
                    }
                })
            },
            _normalizeSongs(list){
                let ret = []
                list.forEach((item)=>{
                    const musicData = item.data
                    if(musicData.songid && musicData.albumid) {
                        ret.push(createSong(musicData))
                    }
                })
                return ret
            }
        }

    }
</script>

<style scoped lang='stylus'>
    .slide-enter-active, .slide-leave-active
        transition all 0.3s

    .slide-enter, .slide-leave-to
        transform translate3d(100%, 0, 0)
</style>
