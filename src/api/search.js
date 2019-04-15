import jsonp from '../assets/js/jsonp'
import {commonParams, options} from "./config";
import axios from "axios";

export function getHotKey() {
    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

    const data = Object.assign({}, commonParams, {
        g_tk: 5381,
        format: 'json',
        notice: 0,
        platform: 'h5',
        needNewCode: 1
    })

    return jsonp(url, data, options)
}

export function search(query, page, zhida, perpage) {
    const url = '/api/search'

    const data = Object.assign({}, commonParams, {
        w: query,
        p: page,
        perpage,
        n: perpage,
        catZhida: zhida ? 1 : 0,
        zhidaqu: 1,
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        t: 0,
        flag: 1,
        sem: 1,
        ie: 'utf-8',
        aggr: 0,
        remoteplace: 'txt.mqq.all'
    })

    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}
