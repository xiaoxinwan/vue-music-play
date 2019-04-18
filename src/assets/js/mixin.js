import {mapGetters, mapMutations,mapActions} from "vuex";
import {playMode} from "./config";
import {shuffle} from "./util";

export const playlistMixin = {
    computed: {
        ...mapGetters([
            'playlist'
        ])
    },
    mounted() {
        this.handlePlaylist(this.playlist)
    },
    activated() {
        this.handlePlaylist(this.playlist)
    },
    watch: {
        playlist(newVal) {
            this.handlePlaylist(newVal)
        }
    },
    methods: {
        handlePlaylist() {
            throw new Error('component must implement handlePlaylist method ')
        }
    }
}


export const playerMixin = {
    computed: {
        iconMode() {
            return this.mode === playMode.sequence ? 'icon-sequence'
                : this.mode === playMode.loop ? 'icon-loop'
                    : 'icon-random'
        },
        ...mapGetters([
            'sequenceList',
            'currentSong',
            'mode',
            'playlist',
            'favoriteList'
        ])
    },
    methods: {
        changeMode() {
            const mode = (this.mode + 1) % 3
            this.setPlayMode(mode)
            let list = null
            if (mode === playMode.random) {
                list = shuffle(this.sequenceList)
            } else {
                list = this.sequenceList
            }
            this.resetCurrentIndex(list)
            this.setPlayList(list)
        },
        resetCurrentIndex(list) {
            let index = list.findIndex((item) => {
                return item.id === this.currentSong.id
            })
            this.setCurrentIndex(index)
        },
        getFavoriteIcon(song){
            if(this.isFavorite(song)){
                return 'icon-favorite'
            }
            return 'icon-not-favorite'
        },
        toggleFavorite(song) {
            if(this.isFavorite(song)) {
                this.deleteFavoriteList(song)
            }else {
                this.saveFavoriteList(song)
            }

        },
        isFavorite(song) {
            const index = this.favoriteList.findIndex((item) => {
                return item.id === song.id
            })
            return index > -1
        },
        ...mapActions([
            'saveFavoriteList',
            'deleteFavoriteList'
        ]),
        ...mapMutations({
            setPlayingState: 'SET_PLAYING_STATE',
            setCurrentIndex: 'SET_CURRENT_INDEX',
            setPlayMode: 'SET_PLAY_MODE',
            setPlayList: 'SET_PLAYLIST'
        })
    }
}

export const searchMixin = {
    data() {
        return {
            query: '',
            refreshDelay: 100
        }
    },
    computed: {
        ...mapGetters([
            'searchHistory'
        ])
    },
    methods: {
        onQueryChange(query) {
            this.query = query
        },
        blurInput() {
            this.$refs.searchBox.blur()
        },
        saveSearch() {
            this.saveSearchHistory(this.query)
        },
        addQuery(query) {
            this.$refs.searchBox.setQuery(query)
        },
        ...mapActions([
            'saveSearchHistory',
            'deleteSearchHistory',
        ])
    }

}
