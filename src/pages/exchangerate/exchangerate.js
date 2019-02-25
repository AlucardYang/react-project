import React, { Component } from 'react';
import './exchangerate.css';

class ExchangeRate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyList: {
        '阿联酋迪拉姆': 'AED',
        '澳大利亚元': 'AUD',
        '澳门元': 'MOP',
        '巴西里亚尔': 'BRL',
        '丹麦克朗': 'DKK',
        '菲律宾比索': 'PHP',
        '韩国元': 'KRW',
        '加拿大元': 'CAD',
        '卢布': 'RUB',
        '林吉特': 'MYR',
        '美元': 'USD',
        '南非兰特': 'ZAR',
        '挪威克朗': 'NOK',
        '欧元': 'EUR',
        '日元': 'JPY',
        '瑞典克朗': 'SEK',
        '瑞士法郎': 'CHF',
        '沙特里亚尔': 'SAR',
        '新台币': 'TWD',
        '泰国铢': 'THB',
        '土耳其里拉': 'TRY',
        '港币': 'HKD',
        '新加坡元': 'SGD',
        '新西兰元': 'NZD',
        '印度卢比': 'INR',
        '印尼卢比': 'IDR',
        '英镑': 'GBP',
        '人民币': 'RMB'
      },
      nationalFlagPostion: {
        'AED': 0,
        'AUD': '-0.32rem',
        'MOP': '-0.64rem',
        'BRL': '-0.96rem',
        'DKK': '-1.28rem',
        'PHP': '-1.60rem',
        'KRW': '-1.92rem',
        'CAD': '-2.24rem',
        'RUB': '-2.56rem',
        'MYR': '-2.88rem',
        'USD': '-3.20rem',
        'ZAR': '-3.52rem',
        'NOK': '-3.84rem',
        'EUR': '-4.16rem',
        'JPY': '-4.48rem',
        'SEK': '-4.80rem',
        'CHF': '-5.12rem',
        'SAR': '-5.44rem',
        'TWD': '-5.76rem',
        'THB': '-6.08rem',
        'TRY': '-6.40rem',
        'HKD': '-6.72rem',
        'SGD': '-7.04rem',
        'NZD': '-7.36rem',
        'INR': '-7.68rem',
        'IDR': '-8.00rem',
        'GBP': '-8.32rem',
        'RMB': '-8.64rem'
      },
      currencys: [],
    }
  }

  componentDidMount() {
    this.getExchangeRateList();
  }

  getExchangeRateList() {
    window.$http.get('/exchange-rate/list', {}, {

    }).then(res => {
      this.setState({ currencys: res.data.list });
    }, err => {

    })
  }

  render() {
    let currencys = <li></li>;
    if (this.state.currencys.length > 0) {
      currencys = this.state.currencys.map((item, index) =>
        <li key={index} className="row">
          <div className="currency">
            <div className="img-box">
              <img src={require('@/assets/images/national-flag.png')} className="img" style={{ 'top': this.state.nationalFlagPostion[item.key] }} />
            </div>
            <span className="en">{item.key}</span>
            <span className="cn">{item.name_cn}</span>
          </div>
          <div className="rmb">{item.cny_money}</div>
          <div className="hk">{item.hkd_money}</div>
          <i className="iconfont go-detail">&#xe6bb;</i>
        </li>
      );
    }


    return (
      <div className="rate-inquiry">
        <div className="currency-rate-head">
          <div className="currency">
            <span className="currency">币种</span>
            <span className="mark">（单位100）</span>
          </div>
          <div className="rmb">
            <span>人民币</span>
          </div>
          <div className="hk">
            <span>港币</span>
          </div>
        </div>
        <div className="currency-rate-list com-scroll-y">
          <div className="currency-rate-list">
            <ul className="currency-rate-body">
              {currencys}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ExchangeRate;
