const path = require('path');
const axios = require('axios');
const express = require('express');

const app = express()
let apiRoute = express.Router()
app.use('/api', apiRoute)


module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                "~": path.resolve(__dirname, 'src/'),
                "assets": path.resolve(__dirname, 'src/assets/'),
                "components": path.resolve(__dirname, 'src/components/'),
                "api": path.resolve(__dirname, 'src/api')
            }
        }
    },
    devServer: {
        before(app) {
            app.get('/api/getDiscList', function (req, res) {
                var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
                axios.get(url, {
                    headers: {
                        referer: 'https://c.y.qq.com/',
                        host: 'c.y.qq.com'
                    },
                    params: req.query
                }).then((response) => {
                    res.json(response.data)
                }).catch((e) => {
                    console.log(e)
                })
            })
            app.get('/api/getLyric', function (req, res) {
                var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
                axios.get(url, {
                    headers: {
                        referer: 'https://c.y.qq.com/',
                        host: 'c.y.qq.com'
                    },
                    params: req.query
                }).then((response) => {
                    var ret = response.data
                    if (typeof ret === 'string') {
                        var reg = /^\w+\(({[^()]+})\)$/
                        var matches = ret.match(reg)
                        if (matches) {
                            ret = JSON.parse(matches[1])
                        }
                    }
                    res.json(ret)
                }).catch((e)=> {
                    console.log(e)
                })
            })
            app.get('/api/getSongList', function(req, res) {
                var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
                axios.get(url, {
                    headers: {
                        referer: 'https://c.y.qq.com/',
                        host: 'c.y.qq.com'
                    },
                    params: req.query
                }).then((response) => {
                    res.json(response.data)
                }).catch((e) => {
                    console.log(e)
                })
            })
            app.get('/api/getTopList', function(req, res) {
                var url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
                axios.get(url, {
                    headers: {
                        referer: 'https://c.y.qq.com/',
                        host: 'c.y.qq.com'
                    },
                    params: req.query
                }).then((response) => {
                    res.json(response.data)
                }).catch((e) => {
                    console.log(e)
                })
            })
            app.get('/api/getMusicList', function(req, res) {
                var url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
                axios.get(url, {
                    headers: {
                        referer: 'https://c.y.qq.com/',
                        host: 'c.y.qq.com'
                    },
                    params: req.query
                }).then((response) => {
                    res.json(response.data)
                }).catch((e) => {
                    console.log(e)
                })
            })
        }
    }
}
