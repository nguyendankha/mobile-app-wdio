const axios = require('axios');
const FuturesActions = require('../../../functions/common/FuturesActions');
const FuturesUtils = require('../FuturesUtils');

class FuturesApi extends FuturesActions {
    constructor() {
        super();
        this.setEnvironmentUrls();
    }

    setEnvironmentUrls() {
        if (this.isQA) {
            this.umUrl = 'https://fapi.binance.com/fapi';
            this.cmUrl = 'https://fapi.binance.com/dapi';
            this.burl = 'https://fapi.binance.com/bapi';
            this.apikey = FuturesUtils.getUserData(FuturesActions.getLoginAccount()).apikey;
            this.secret = FuturesUtils.getUserData(FuturesActions.getLoginAccount()).secret;
            this.xUserId = FuturesUtils.getUserData(FuturesActions.getLoginAccount())['x-user-id'];
            this.xTraceId = FuturesUtils.getUserData(FuturesActions.getLoginAccount())['x-trace-id'];
        } else {
            this.umUrl = 'https://fapi.binance.com/';
            this.cmUrl = 'https://dapi.binance.com/';
            this.apikey = 'ZKFWLYljvxPv9rFKIf03jUDuLgCZ2Ua2ffVjoLaMJ40Ns1DTGysyIU2xq9rKbI52';
            this.secret = 's4svjr70Lb9GvV35BaD9NtIE1Su2r7fSOAoz9K9pysLhdj55tn5CgQKnctOeIHHC';
        }
    }

    apiHeader() {
        return {
            'X-MBX-APIKEY': this.apikey,
        };
    }

    async querySymbolPrice(isPerpetual, symbol) {
        if (!isPerpetual) symbol += '_PERP';
        const path = '/v1/ticker/price';
        const params = { symbol };
        const url = isPerpetual ? this.umUrl : this.cmUrl;
        try {
            const response = await axios.get(url + path, { headers: this.apiHeader(), params });
            console.info('Get symbol price response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error querying symbol price:', error);
            throw error;
        }
    }

    async queryExchangeInfo(isPerpetual) {
        const path = '/v1/exchangeInfo';
        const url = isPerpetual ? this.umUrl : this.cmUrl;
        try {
            const response = await axios.get(url + path, { headers: this.apiHeader() });
            return response.data;
        } catch (error) {
            console.error('Error querying exchange info:', error);
            throw error;
        }
    }

    async queryExchangeInfoArray(isPerpetual) {
        const path = '/v1/exchangeInfo';
        const url = isPerpetual ? this.umUrl : this.cmUrl;
        try {
            const response = await axios.get(url + path, { headers: this.apiHeader() });
            console.info('Get exchange info response:', response.data);
            return response.data.symbols;
        } catch (error) {
            console.error('Error querying exchange info array:', error);
            throw error;
        }
    }
}

module.exports = FuturesApi;
