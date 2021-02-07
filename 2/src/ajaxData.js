//题⽬ 2
// • 实现⼀个前端请求模块，可以缓存 xhr 返回的结果，具备⾃动重试机制，要求：
// 1. ⽣命周期为⼀次⻚⾯打开
// 2. 如果有相同的请求同时并⾏发起，要求其中⼀个能挂起并且等待另外⼀个请求返回并读取该缓存
// 3. 请求失败⾃动重试指定次数
(function (window, axios) {
    let dict = new Map()
    const ajaxData = function (url, retry = 3) {
        const cacheInfo = dict.get(url)
        if (!cacheInfo) {
            return fetchInfo(url, retry)
        }
        const status = cacheInfo.status
        if (status === 'pending') {
            return new Promise((resolve, reject) => {
                cacheInfo.resolveHandler.push(resolve)
                cacheInfo.rejectHandler.push(reject)
            })
        } else if (status === 'fulfilled') {
            return Promise.resolve(cacheInfo.resp)
        } else {
            return Promise.reject(cacheInfo.err)
        }
    }
    const fetchInfo = function (url,retry) {
        setItem(url, {
            status: 'pending',
            resolveHandler: [],
            rejectHandler: []
        })
        return axios(url).then(resp => {
            setItem(url, { status: 'fulfilled', resp })
            notify(url, resp)
            return Promise.resolve(resp)
        }).catch(err => {
            notify(url, err)
            autoFetch(url, retry, err) //自动重试3次
        })
    }
    const autoFetch = function (url, retry, err) {
        if (retry > 1) {
            return new Promise((resolve, reject) => {
                axios(url).then(resp => {
                    setItem(url, { status: 'fulfilled', resp })
                    return resolve(resp)
                }).catch(err => {
                    autoFetch(url, --retry, err)
                })
            })
        } else {
            setItem(url, { status: 'rejected', err })
            return Promise.reject(err)
        }
    }
    const setItem = function (url, info) {
        dict.set(url, { ...dict.get(url) || {}, ...info })
    }
    const notify = function (url, value) {
        const cacheInfo = dict.get(url)
        let queue = []
        if (status === 'fulfilled') {
            queue = cacheInfo.resolveHandler
        } else if (status === 'rejected') {
            queue = cacheInfo.rejectHandler
        }
        while (queue.length) {
            queue.shift()(value)
        }
        setItem(url, { resolveHandler: [], rejectHandler: [] })
    }
    window.ajaxData = ajaxData
})(window, axios)