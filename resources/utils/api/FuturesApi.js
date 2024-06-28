const axios = require('axios');
const crypto = require('crypto');
const FuturesActions = require('../../../functions/common/FuturesActions');
const FuturesUtils = require('../FuturesUtils');
const config = require('../api/config/api-config.json');

class FutureApi extends FuturesActions {
    constructor() {
        super();
        this.setEnvironmentUrls();
    }

    setEnvironmentUrls() {
        const loginAccount = FuturesActions.getLoginAccount();
        const userData = FuturesUtils.getUserData(loginAccount);
        if (this.isQA) {
            this.umUrl = config.urls.umUrl;
            this.cmUrl = config.urls.cmUrl;
            this.burl = config.urls.burl;
            this.apiKey = userData.apikey;
            this.secret = userData.secret;
            this.xUserId = userData['x-user-id'];
            this.xTraceId = userData['x-trace-id'];
        } else {
            this.umUrl = config.urls.umUrl;
            this.cmUrl = config.urls.cmUrl;
            this.apiKey = config.urls.defaultApiKey;
            this.secret = config.urls.defaultSecret;
        }
    }

    apiHeader() {
        return {
            'X-MBX-APIKEY': this.apiKey,
        };
    }

    signRequest(params) {
        return crypto.createHmac('sha256', this.secret).update(params).digest('hex');
    }

    async apiGetRequest(url, path, params = {}) {
        try {
            const response = await axios.get(`${url}${path}`, {
                headers: this.apiHeader(),
                params
            });
            console.info(`Get request to ${url}${path} response:`, response.data);
            return response.data;
        } catch (error) {
            console.error(`Error in GET request to ${url}${path}:`, error);
            throw error;
        }
    }

    async apiPostRequest(url, path, params) {
        try {
            console.log(`POST request to ${url}${path} with params: ${params}`);
            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${url}${path}?${params}`,
                headers: this.apiHeader(),
            };
            const response = await axios.request(config);
            console.info(`Post request to ${url}${path} response:`, response.data);
            return response.data;
        } catch (error) {
            console.error(`Error in POST request to ${url}${path}:`, error);
            throw error;
        }
    }

    async apiDeleteRequest(url, path, params = {}) {
        try {
            const response = await axios.delete(`${url}${path}`, {
                headers: this.apiHeader(),
                params
            });
            console.info(`Delete request to ${url}${path} response:`, response.data);
            return response.data;
        } catch (error) {
            console.error(`Error in DELETE request to ${url}${path}:`, error);
            throw error;
        }
    }

    async querySymbolPrice(isPerpetual, symbol) {
        if (!isPerpetual) symbol += '_PERP';
        const path = '/v1/ticker/price';
        const params = { symbol };
        const url = isPerpetual ? this.umUrl : this.cmUrl;
        return this.apiGetRequest(url, path, params);
    }

    async queryExchangeInfo(isPerpetual) {
        const path = '/v1/exchangeInfo';
        const url = isPerpetual ? this.umUrl : this.cmUrl;
        return this.apiGetRequest(url, path);
    }

    async queryExchangeInfoArray(isPerpetual) {
        const path = '/v1/exchangeInfo';
        const url = isPerpetual ? this.umUrl : this.cmUrl;
        const response = await this.apiGetRequest(url, path);
        return response.symbols;
    }

    async getQuarterlyFirstSymbol() {
        const path = '/v1/exchangeInfo';
        const response = await this.apiGetRequest(this.cmUrl, path);
        return response.symbols[0];
    }

    async cancelAllOrders(isPerpetual, symbol) {
        if (!isPerpetual) symbol += '_PERP';
        const path = '/v1/allOpenOrders';
        const url = isPerpetual ? this.umUrl : this.cmUrl;
        const timestamp = Date.now();
        const params = `recvWindow=${config.timeConfig.recvWindow}&symbol=${symbol}&timestamp=${timestamp}`;
        const signature = this.signRequest(params);
        const signedParams = `${params}&signature=${signature}`;
        return this.apiDeleteRequest(url, path, signedParams);
    }

    async queryPositionSide(isPerpetual) {
        const path = '/v1/positionSide/dual';
        const timestamp = Date.now();
        const params = `recvWindow=${config.timeConfig.recvWindow}&timestamp=${timestamp}`;
        const signature = this.signRequest(params);
        const signedParams = `${params}&signature=${signature}`;
        const url = isPerpetual ? this.umUrl : this.cmUrl;
        return this.apiGetRequest(url, path, signedParams);
    }

    async updatePositionSide(isPerpetual, dualSide) {
        const path = '/v1/positionSide/dual';
        const timestamp = Date.now();
        const params = `recvWindow=${config.timeConfig.recvWindow}&dualSidePosition=${dualSide}&timestamp=${timestamp}`;
        const signature = this.signRequest(params);
        const signedParams = `${params}&signature=${signature}`;
        const url = isPerpetual ? this.umUrl : this.cmUrl;
        return this.apiPostRequest(url, path, signedParams);
    }

    async createMarketOrder(isPerpetual, symbol, side, positionSide, reduceOnly, quantity) {
        if (!isPerpetual) symbol += '_PERP';
        const path = '/v1/order';
        const timestamp = Date.now();
        const params = `recvWindow=${config.timeConfig.recvWindow}&symbol=${symbol}&side=${side}&positionSide=${positionSide}&type=MARKET&quantity=${quantity}&reduceOnly=${reduceOnly}&timestamp=${timestamp}`;
        const signature = this.signRequest(params);
        const signedParams = `${params}&signature=${signature}`;
        const url = isPerpetual ? this.umUrl : this.cmUrl;
        return this.apiPostRequest(url, path, signedParams);
    }

    async closePosition(isPerpetual, symbol, side, closePosition) {
        if (!isPerpetual) symbol += '_PERP';
        const path = '/v1/order';
        const timestamp = Date.now();
        const params = `recvWindow=${config.timeConfig.recvWindow}&symbol=${symbol}&side=${side}&type=MARKET&closePosition=${closePosition}&timestamp=${timestamp}`;
        const signature = this.signRequest(params);
        const signedParams = `${params}&signature=${signature}`;
        const url = isPerpetual ? this.umUrl : this.cmUrl;
        return this.apiPostRequest(url, path, signedParams);
    }

    async createLimitOrder(isPerpetual, symbol, side, positionSide, type, timeInForce, quantity, price) {
        if (!isPerpetual) symbol += '_PERP';
        const path = '/v1/order';
        const timestamp = Date.now();
        const params = `recvWindow=${config.timeConfig.recvWindow}&symbol=${symbol}&side=${side}&positionSide=${positionSide}&type=${type}&price=${price}&timeInForce=${timeInForce}&quantity=${quantity}&timestamp=${timestamp}`;
        const signature = this.signRequest(params);
        const signedParams = `${params}&signature=${signature}`;
        const url = isPerpetual ? this.umUrl : this.cmUrl;
        return this.apiPostRequest(url, path, signedParams);
    }

    async queryOrderInfo(isPerpetual, symbol) {
        if (!isPerpetual) symbol += '_PERP';
        const path = '/v1/allOrders';
        const timestamp = Date.now();
        const params = `recvWindow=${config.timeConfig.recvWindow}&symbol=${symbol}&limit=1&timestamp=${timestamp}`;
        const signature = this.signRequest(params);
        const signedParams = `${params}&signature=${signature}`;
        const url = isPerpetual ? this.umUrl : this.cmUrl;
        return this.apiGetRequest(url, path, signedParams);
    }

    async queryPositionRisk(isPerpetual) {
        const path = isPerpetual ? '/v2/positionRisk' : '/v1/positionRisk';
        const timestamp = Date.now();
        const params = `recvWindow=${config.timeConfig.recvWindow}&timestamp=${timestamp}`;
        const signature = this.signRequest(params);
        const signedParams = `${params}&signature=${signature}`;
        const url = isPerpetual ? this.umUrl : this.cmUrl;
        return this.apiGetRequest(url, path, signedParams);
    }

    async queryPositionRiskWithSymbol(isPerpetual, symbol) {
        if (!isPerpetual) symbol += '_PERP';
        const path = isPerpetual ? '/v2/positionRisk' : '/v1/positionRisk';
        const timestamp = Date.now();
        const params = `recvWindow=${config.timeConfig.recvWindow}&symbol=${symbol}&timestamp=${timestamp}`;
        const signature = this.signRequest(params);
        const signedParams = `${params}&signature=${signature}`;
        const url = isPerpetual ? this.umUrl : this.cmUrl;
        return this.apiGetRequest(url, path, signedParams);
    }

    async queryOpenOrders(isPerpetual, symbol) {
        if (!isPerpetual) symbol += '_PERP';
        const path = '/v1/openOrders';
        const timestamp = Date.now();
        const params = `symbol=${symbol}&timestamp=${timestamp}`;
        const signature = this.signRequest(params);
        const signedParams = `${params}&signature=${signature}`;
        const url = isPerpetual ? this.umUrl : this.cmUrl;
        return this.apiGetRequest(url, path, signedParams);
    }

    async query24hTicker(isPerpetual, symbol) {
        if (!isPerpetual) symbol += '_PERP';
        const path = `/v1/ticker/24hr?symbol=${symbol}`;
        const url = isPerpetual ? this.umUrl : this.cmUrl;
        return this.apiGetRequest(url, path);
    }

    async queryBookTicker(isPerpetual, symbol) {
        if (!isPerpetual) symbol += '_PERP';
        const path = `/v1/ticker/bookTicker?symbol=${symbol}`;
        const url = isPerpetual ? this.umUrl : this.cmUrl;
        return this.apiGetRequest(url, path);
    }

    async disableOptionsAntiAddictive() {
        console.info('------- Disabling the Anti-Addictive Options Trading ----------');
        const url = config.urls.disableCheckUrl;
        return this.apiGetRequest(url, '');
    }

    async enableOptionsAntiAddictive() {
        console.info('------- Enabling the Anti-Addictive Options Trading ----------');
        const url = config.urls.enableCheckUrl;
        return this.apiGetRequest(url, '');
    }

    async getExchangetGroupAPI(underlying) {
        const path = `/eoptions/v1/public/eoptions/exchange/tGroup?contract=${underlying}`;
        return this.apiGetRequest(this.burl, path);
    }

    async getTickerAPI() {
        const path = '/eoptions/v1/public/eoptions/market/ticker';
        return this.apiGetRequest(this.burl, path);
    }

    async getSymbolsAPIOptions() {
        const path = '/eoptions/v1/public/eoptions/exchange/symbols';
        return this.apiGetRequest(this.burl, path);
    }

    async getPositionSide() {
        const host = await this.getInstanceHostFromEureka();
        const path = `${host}/v1/private/future/user-data/get-position-side`;
        return this.apiPostRequest(path, '');
    }

    async getTickerAPI(symbol) {
        const path = `/eoptions/v1/public/eoptions/market/ticker?symbol=${symbol}`;
        return this.apiGetRequest(this.burl, path);
    }

    async getPositionOrdersEoptions() {
        const path = '/eapi/v1/position';
        const timestamp = Date.now();
        const params = `timestamp=${timestamp}`;
        const signature = this.signRequest(params);
        const signedParams = `${params}&signature=${signature}`;
        return this.apiGetRequest(this.burl, path, signedParams);
    }

    async getOpenOrdersEoptions() {
        const path = '/eapi/v1/openOrders';
        const timestamp = Date.now();
        const params = `timestamp=${timestamp}`;
        const signature = this.signRequest(params);
        const signedParams = `${params}&signature=${signature}`;
        return this.apiGetRequest(this.burl, path, signedParams);
    }

    async placeOrderEoptions(side, symbol, type, price, quantity, reduceOnly) {
        const path = '/eapi/v1/order';
        const timestamp = Date.now();
        const params = `side=${side}&symbol=${symbol}&type=${type}&price=${price}&quantity=${quantity}&reduceOnly=${reduceOnly}&timestamp=${timestamp}&recvWindow=${config.timeConfig.recvWindow}`;
        const signature = this.signRequest(params);
        const signedParams = `${params}&signature=${signature}`;
        return this.apiPostRequest(this.burl, path, signedParams);
    }

    async cancelAllOpenOrdersByUnderlyingEoptions(underlying) {
        const path = '/eapi/v1/allOpenOrdersByUnderlying';
        const timestamp = Date.now();
        const params = `underlying=${underlying}&timestamp=${timestamp}&recvWindow=${config.timeConfig.recvWindow}`;
        const signature = this.signRequest(params);
        const signedParams = `${params}&signature=${signature}`;
        return this.apiDeleteRequest(this.burl, path, signedParams);
    }

    async cancelAllOpenOrdersBySymbolEoptions(symbol) {
        const path = '/eapi/v1/allOpenOrders';
        const timestamp = Date.now();
        const params = `symbol=${symbol}&timestamp=${timestamp}&recvWindow=${config.timeConfig.recvWindow}`;
        const signature = this.signRequest(params);
        const signedParams = `${params}&signature=${signature}`;
        return this.apiDeleteRequest(this.burl, path, signedParams);
    }

    async retrieveUmSymbolPremiumIndex(symbolName) {
        const path = `/v1/premiumIndex?symbol=${symbolName}`;
        return this.apiGetRequest(this.umUrl, path);
    }

    async retrieveCmSymbolPremiumIndex(symbolName, symbolPeriod) {
        const path = `/v1/premiumIndex?symbol=${symbolName}_${symbolPeriod}`;
        const response = await this.apiGetRequest(this.cmUrl, path);
        return response[0];
    }

    async retrieveUserCommissionRate(isUm, symbolName) {
        const host = await this.getInstanceHostFromEureka();
        const path = isUm ? `${host}/v1/private/future/user-data/account-tier-commission` : `${host}/v1/private/delivery/user-data/account-tier-commission`;
        const body = { name: symbolName };
        return this.apiPostRequest(path, '', body);
    }

    async getInstanceHostFromEureka() {
        // Mocked function to get host from Eureka
        // Replace this with actual logic if needed
        return 'http://mocked-eureka-host';
    }

    async createLimitOrderTest(isPerpetual, symbol, side, positionSide, type, quantity, price) {
        if (!isPerpetual) symbol += '_PERP';
        const path = '/v1/order';
        const timestamp = Date.now();
        let param = `recvWindow=10000&symbol=${symbol}&side=${side}&positionSide=${positionSide}&type=${type}&price=${price}&timeInForce=GTC&quantity=${quantity}&timestamp=${timestamp}`;
        const signature = this.signRequest(param);
        param += `&signature=${signature}`;
        const url = isPerpetual ? this.umUrl : this.cmUrl;
        try {
            const response = await axios.post(url + path + '?' + param, {}, { headers: this.apiHeader() });
            console.info('Place limit order response:', response.data);
        } catch (error) {
            console.error('Error creating limit order:', error);
            throw error;
        }
    }
}

module.exports = FutureApi;
