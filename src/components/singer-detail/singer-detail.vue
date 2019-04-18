<template>
    <transition name="slide">
				<MusicList :title="title" :songs="songs" :bg-image="bgImage"></MusicList>
    </transition>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {getSingerDetail} from "../../api/singer";
    import {ERR_OK} from "../../api/config";
    import {createSong} from "../../assets/js/song";
		import MusicList from 'components/music-list/music-list'

    export default {
        name: "singer-detail",
				components:{
            MusicList
				},
				data(){
            return {
                songs: []
						}
				},
        computed: {
            ...mapGetters([
                'singer' // 相当于this.$store.getters.singer
            ]),
						title() {
                return this.singer.name
						},
						bgImage() {
                return this.singer.avatar
						}
        },
        created() {
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
                        this.songs = this._normalizeSongs(res.data.list)
                    }
                })
            },
            _normalizeSongs(list) {
                let ret = []
                list.forEach((item) => {
                    let {musicData} = item
                    if(musicData.albummid && musicData.songmid) {
                        ret.push(createSong(musicData))
                    }
                })
                return ret
            }
        }

    }
</script>

<style lang='stylus'>
    @import "../../assets/stylus/variable.styl"

    .slide-enter-active, .slide-leave-active
        transition: all .3s
    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
</style>
