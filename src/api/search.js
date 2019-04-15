import jsonp from '../assets/js/jsonp'
import {commonParams, options} from "./config";

export function getHotKey() {
    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

    const data = Object.assign({}, commonParams, {
        g_tk: 5381,
        format: 'json',
        notice: 0,
        platform: 'h5',
        needNewCode: 1
    })

    return jsonp(url, data,options)
}
