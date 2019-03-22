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
        }
    }
}
