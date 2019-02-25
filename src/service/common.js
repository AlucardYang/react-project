
export default {
    isWeiXin: /micromessenger/.test(navigator.userAgent.toLowerCase()),
    isOnTheMini: window.__wxjs_environment === 'miniprogram',
    // 获取路径参数值
    getQueryParams(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r !== null) return unescape(r[2]);
        return null;
    },
    // 设置cookie  
    setCookie(name, value, seconds) {
        seconds = seconds || 0;
        var expires = "";
        if (seconds !== 0) {
            var date = new Date();
            date.setTime(date.getTime() + (seconds * 1000));
            expires = "; expires=" + date.toGMTString();
        }
        document.cookie = name + "=" + escape(value) + expires + "; path=/";
    },
    // 清除cookie  
    clearCookie(name) {
        this.setCookie(name, "", -1);
    },
    // 获取cookies
    getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return unescape(c.substring(nameEQ.length, c.length));
            }
        }
        return false;
    },
    // 设置localStorage过期时间
    setLocalStorage(key, value) {
        var curTime = new Date().getTime();
        localStorage.setItem(key, JSON.stringify({
            data: value,
            time: curTime
        }));
    },
    // 获取localStorage
    getLocalStorage(key, exp, callback) {
        var dataObj = JSON.parse(localStorage.getItem(key));
        if ((new Date().getTime() - dataObj['time'] > exp) || !dataObj['time']) {
            callback();
        } else {
            return dataObj.data;
        }
    },
    // 获取headers的值
    getHeaders() {
        let headers = {};
        if (this.getCookie('token')) {
            headers = {
                'device-id': this.getCookie('device-id'),
                'version': this.getCookie('version'),
                'version-id': this.getCookie('version-id'),
                'os': this.getCookie('os'),
                'uid': this.getCookie('uid'),
                'token': this.getCookie('token')
            };
        } else {
            headers = {};
        }
        return headers;
    },
    // 随机生成uuid
    guid() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4())
    },
    // 浏览上报
    readReport(reportObj) {
        // let reportObj = {
        //      router: 上报的路由地址
        //      target_uuid: 转发或浏览那东西的 uuid
        //      target_type: 转发或浏览那东西的类型，类型如下
        //          11、資訊，12、保险产品，13、疾病，14、文章，15、个人主页，16、产品对比
        //          51、贺卡 61、醫療產品 71、个人主页（小程式）81、醫療產品（报名表）
        //      one_way: 转发的用户的 uuid 的路径，以逗号分隔，
        //      c_user_uuid: 客户浏览的 uuid
        //      mark: 前端需要生成的唯一标识
        //      duration: 浏览的时长
        //      length: 浏览的篇幅 
        //      platform: -1旧数据 1:微信, 2:facebook, 3:qq, 4:tw, 5:whatsApp, 6:weibo, 7:小程序, 8:浏览器
        // }
        let maxScroll = 0;
        let startTime = new Date().getTime();
        let isReady = false;
        let reportInterval = null;
        reportObj.mark = window.markUuid;
        reportObj.one_way = this.getQueryParams('one_way') ? this.getQueryParams('one_way') : window.userUuid;
        reportObj.duration = 10;
        reportObj.c_user_uuid = window.rootUserInfo['c_user_uuid'];
        reportObj.platform = window.platform;
        console.log('上报平台：' + reportObj.platform);
        setTimeout(() => {
            if (document.querySelector('.com-scroll-y')) {
                document.querySelector('.com-scroll-y').onscroll = function () {
                    let scrollTop = this.scrollTop;
                    maxScroll = parseInt(scrollTop > maxScroll ? scrollTop : maxScroll);
                }
            }
        }, 100);

        // 上报接口
        const reportFn = function () {
            setTimeout(() => {
                let pageH = 0;
                document.querySelector('.com-scroll-y') && (pageH = document.querySelector('.com-scroll-y').scrollHeight); // 页面完整高度
                let windowH = document.body.clientHeight; // 页面可视区域高度
                let nowTime = new Date();
                let time = Math.round((nowTime - startTime) / 1000);
                reportObj.length = (pageH > 0 ? parseInt(((maxScroll + windowH) / pageH).toFixed(2) * 100) : 0); // 浏览的篇幅
                reportObj.length > 100 && (reportObj.length = 100);
                // console.log(reportObj);
                window.$http.post('/behavior/view', reportObj).then(res => {
                    isReady = true;
                }, err => {
                    isReady = false;
                });
                // 400s后不再轮询
                if (time > reportObj.duration * 40) {
                    clearInterval(reportInterval);
                }
            }, 100);
        }
        reportFn();
        reportInterval = setInterval(() => {
            if (isReady) {
                reportFn();
            }
        }, reportObj.duration * 1000);
    },
    // 分享上报
    reportWxShare(reportObj) {
        reportObj.one_way = ((this.getQueryParams('one_way') ? this.getQueryParams('one_way') : window.userUuid) + ',' + window.rootUserInfo['c_user_uuid']);
        // console.log(reportObj);
        window.$http.post('/behavior/share', reportObj);
    },
    // 获取对应年月当月的天数
    getDaysInMonth(year, month) {
        var d = new Date(year, month, 0);
        return d.getDate();
    },
    // 获取日期数据
    getDateData(start, end, showUnit = true) {
        let years = [],
            months = [];
        for (let i = start; i <= end; i++) {
            years.push(i + (showUnit && '年'));
        }
        for (let i = 1; i <= 12; i++) {
            months.push((String(i).length === 1 && '0') + i + (showUnit && '月'));
        }
        return {
            years: years,
            months: months
        }
    },
    // 加载js
    loadScript(url, callback, error) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        if (script.readyState) { //IE
            script.onreadystatechange = function () {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else { //Others
            script.onload = function () {
                callback();
            };
            error && (script.onerror = function (msg, url, l) {
                error(msg, url, l);
            });
        }
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    },
    // 加载css
    loadStyle(url) {
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    },
    // 日期格式化
    formatDate(date, fmt) {
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        };
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                let str = o[k] + '';
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
            }
        }
        return fmt;
    },
    // 货币格式化
    // formatMoney(num, places, symbol, thousand, decimal) {
    //     !num && (num = 0);
    //     places = !isNaN(places = Math.abs(places)) ? places : 2;
    //     symbol = symbol != undefined ? symbol : '$';
    //     thousand = thousand || ',';
    //     decimal = decimal || '.';
    //     var number = num,
    //         negative = number < 0 ? '-' : '',
    //         i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + '',
    //         j = (j = i.length) > 3 ? j % 3 : 0;
    //     return symbol + negative + (j ? i.substr(0, j) + thousand : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : '');
    // },
    // 判断是否是数组
    isArray(arr) {
        return Object.prototype.toString.call(arr) === '[object Array]';
    }
};