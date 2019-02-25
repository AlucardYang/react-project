import axios from 'axios';

// import {
//     Toast
// } from 'mint-ui';

import commonJS from './common.js';

// 各环境功能配置
import businessConfig from '@/service/businessConfig.json';

let headers = {};

// headers的app编码格式：encodeURIComponent(commonJS.encrypt(JSON.stringify(obj)))
if (commonJS.getQueryParams('in_app') === '1' && commonJS.getQueryParams('headers')) {
    headers = JSON.parse(commonJS.decrypt(decodeURIComponent(commonJS.getQueryParams('headers'))));
} else {
    headers = {};
}

// 后台判断为ajax请求
headers['X-Requested-With'] = 'XMLHttpRequest';

// 各环境域名
const locationHosts = {
    'h5.goodiber.com': 'https://h5.goodiber.com',
    'mp.goodiber.com': 'https://mp.goodiber.com/v2/api',
    'page.goodiber.com': 'https://page.goodiber.com/v2/api',
    'expmp.goodiber.com': 'https://expmp.goodiber.com/v2/api',
    'exppage.goodiber.com': 'https://exppage.goodiber.com/v2/api',
    'mp.iberhk.com': 'https://mp.iberhk.com/v2/api',
    'page.iberhk.com': 'https://page.iberhk.com/v2/api',
    'mpv2.iberhk.com': 'https://mpv2.iberhk.com/v2/api',
}

// 请求配置
let baseURL = (locationHosts[window.location.hostname] ? locationHosts[window.location.hostname] : 'https://h5.goodiber.com');

// 各环境简写
const environments = {
    'h5.goodiber.com': 'test',
    'mp.goodiber.com': 'test',
    'page.goodiber.com': 'test',
    'expmp.goodiber.com': 'exp',
    'exppage.goodiber.com': 'exp',
    'mp.iberhk.com': 'prod',
    'page.iberhk.com': 'prod',
    'mpv2.iberhk.com': 'prod',
}

// 各环境业务配置是否开启
window.businessConfig = (businessConfig[environments[window.location.hostname]] ? businessConfig[environments[window.location.hostname]] : businessConfig['test']);
console.log(window.businessConfig);

// 兼容v2/page开头
if (window.baseHost === 'v2/page') {
    baseURL = window.location.origin + '/v2';
}

axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 15000;

axios.interceptors.request.use(config => {
    return config;
}, err => {
    // Toast({
    //     message: '請求超時!'
    // });
    return Promise.reject(err);
});

/*
 *@临时注释
 *@暂无法满足业务逻辑
 *@若需启用，先取消全局性，可局部调用，避免影响其他AJAX调用逻辑
 *
axios.interceptors.response.use(data => {
    if (data.status && data.status == 200 && data.data.code != 1308 && data.data.code != 0) {
      Toast({message: data.data.msg});
    }
    return data;
}, err => {
  debugger
    if (err.response && (err.response.status == 504 || err.response.status == 404)) {
        Toast({
            message: '無法找到服務器'
        });
    } else if (err.response && (err.response.status == 403)) {
        Toast({
            message: '權限不足，請聯繫管理員'
        });
    } else if (err.response && (err.response.status == 400)) {
        Toast({
            message: '請求無效'
        });
    } else {
        Toast({
            message: '系統繁忙'
        });
    }
    return Promise.reject(err);
});
 *
 **/

// 请求成功后台返回错误信息提示
const msgToast = function (res) {
    if (res.status && res.status === 200 && res.data.code !== 1308 && res.data.code !== 0) {
        // Toast({
        //     message: res.data.msg
        // });
    }
}

//  后台请求错误、或者网络不通提示
const errToast = function (err) {
    let busyTip = '系统繁忙，请稍后再试',
        networkTip = '网络环境较差，请稍后再试',
        errTip = '';
    if (err.response) {
        let status = err.response.status;
        if (status >= 500) {
            errTip = busyTip;
        } else if (status >= 400) {
            errTip = networkTip;
        }
    } else {
        errTip = networkTip;
    }
    // Toast({
    //     message: errTip
    // });
}

const get = (url, params, inHeaders, baseUrl) => {
    for (let key in inHeaders) {
        headers[key] = inHeaders[key];
    }
    const promise = new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: (baseUrl ? baseUrl : '') + url,
            params: params,
            headers: headers,
        }).then((res) => {
            msgToast(res);
            res && resolve(res.data);
        }).catch((err) => {
            errToast(err);
            err && reject(err);
        });
    });
    return promise;
};

const post = (url, params, inHeaders, baseUrl) => {
    for (let key in inHeaders) {
        headers[key] = inHeaders[key];
    }
    const promise = new Promise((resolve, reject) => {
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
        axios({
            method: 'post',
            url: (baseUrl ? baseUrl : '') + url,
            data: params,
            transformRequest: [function (data) {
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }],
            headers: headers,
        }).then(function (res) {
            msgToast(res);
            res && resolve(res.data);
        }).catch((err) => {
            errToast(err);
            err && reject(err);
        });
    });
    return promise;
};

const put = (url, params, inHeaders, baseUrl) => {
    for (let key in inHeaders) {
        headers[key] = inHeaders[key];
    }
    const promise = new Promise((resolve, reject) => {
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
        axios({
            method: 'put',
            url: (baseUrl ? baseUrl : '') + url,
            data: params,
            transformRequest: [function (data) {
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }],
            headers: headers,
        }).then(function (res) {
            msgToast(res);
            res && resolve(res.data);
        }).catch((err) => {
            errToast(err);
            err && reject(err);
        });
    });
    return promise;
};

const deleteApi = (url, params, inHeaders, baseUrl) => {
    for (let key in inHeaders) {
        headers[key] = inHeaders[key];
    }
    const promise = new Promise((resolve, reject) => {
        axios({
            method: 'delete',
            url: (baseUrl ? baseUrl : '') + url,
            params: params,
            headers: headers,
        }).then(function (res) {
            msgToast(res);
            res && resolve(res.data);
        }).catch((err) => {
            errToast(err);
            err && reject(err);
        });
    });
    return promise;
};

/*
  this.$http.ajax({
    base: "",
    timeout: 15000,
    path: "",
    type: "",
    data: {},
    filter: (res)=> {},
    intercept: (res)=> {},
    error: (err)=> {},
    catch: false
  }).then((res)=> {
    //业务模型
  }).catch((err)=> {
    //
  });
  *@base: [选填] 请求主域名
  *@path: [必填] 请求路径
  *@type: [必填] 请求类型
  *@data: [选填] 请求数据
  *@filter: [选填]] 处理异常返回逻辑
  *@err: 
  *@error: [选填] 处理错误返回逻辑
  *@catch: [选填] 是否自动错误处理逻辑
 **/
const ajax = (args) => {
    //language: this['language']['currentLang']

    //追加header头部信息
    let headInfo = headers;

    if (args.language !== undefined) {
        headers['language'] = args.language;
    }
    //优先获取args.data.language值
    if (args.data.language !== undefined) {
        headers['language'] = args.data.language;
    }

    if (args.header !== undefined) {
        for (let key in args.header) {
            headers[key] = args.header[key];
        }
        headInfo = headers;
    }

    let promise = new Promise((resolve, reject) => {
        let json = {
            method: args.type,
            url: `${args.base?args.base:''}${args.path}`,
            headers: headInfo,
        };
        let reg = /^[0-9]*$/g;
        if (args.timeout !== undefined && reg.test(args.timeout)) {
            json.timeout = args.timeout;
        }
        if (args.type === "get") {
            json.params = args.data || {};
        }
        if (args.type === "post") {
            json.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            json.data = require('qs').stringify(args.data);
        }
        axios(json).then((res) => {
            //重定义业务逻辑
            if (args.filter !== undefined) {
                args.filter(res);
                return;
            }
            //重定向iBerPay未登录状态 
            if (res.data.code === 1100 && args.authority !== undefined) {
                args.authority();
                return;
            }
            if (res.data.code === 1900) {
                if (args.dealwith !== undefined) {
                    args.dealwith();
                    return;
                }
            }
            if (res.data.code !== 0) {
                if (args.intercept !== undefined) {
                    args.intercept();
                }
                if (args.toast === undefined || args.toast !== false) {
                    // Toast({
                    //     message: res.data.msg
                    // });
                }
                return;
            }
            resolve(res.data);
        }).catch((err) => {
            if (args.err !== undefined) {
                args.err();
                return;
            }
            if (err === undefined) {
                // Toast({
                //     message: "The Server Error"
                // });
                return;
            }
            let err_info = "";
            err_info = "The Server Error";

            if (args.error !== undefined) {
                args.error(err);
                return;
            }
            if (args.catch !== true) {
                if (args.intercept !== undefined) {
                    args.intercept();
                }
                if (args.toast === undefined || args.toast !== false) {
                    // Toast({
                    //     message: err_info
                    // });
                }
                return;
            }
            reject(err);
        });
    });
    return promise;
};


export {
    get,
    post,
    put,
    deleteApi,

    ajax
}