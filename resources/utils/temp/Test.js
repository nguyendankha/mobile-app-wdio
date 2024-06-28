const FuturesApi = require('../api/FuturesApi');

// Create an instance of FutureApi
const futureApi = new FuturesApi();

async function testFutureApi() {
    console.log('Testing FutureApi methods...\n');
    //
    // // Test querySymbolPrice
    // try {
    //     const symbolPrice = await futureApi.querySymbolPrice(true, 'BTCUSDT');
    //     console.log('querySymbolPrice (Perpetual):', symbolPrice);
    // } catch (error) {
    //     console.error('Error in querySymbolPrice (Perpetual):', error);
    // }
    //
    // try {
    //     const symbolPrice = await futureApi.querySymbolPrice(false, 'BTCUSDT');
    //     console.log('querySymbolPrice (Non-Perpetual):', symbolPrice);
    // } catch (error) {
    //     console.error('Error in querySymbolPrice (Non-Perpetual):', error);
    // }
    //
    // // Test queryExchangeInfo
    // try {
    //     const exchangeInfo = await futureApi.queryExchangeInfo(true);
    //     console.log('queryExchangeInfo (Perpetual):', exchangeInfo);
    // } catch (error) {
    //     console.error('Error in queryExchangeInfo (Perpetual):', error);
    // }
    //
    // try {
    //     const exchangeInfo = await futureApi.queryExchangeInfo(false);
    //     console.log('queryExchangeInfo (Non-Perpetual):', exchangeInfo);
    // } catch (error) {
    //     console.error('Error in queryExchangeInfo (Non-Perpetual):', error);
    // }
    //
    // // Test queryExchangeInfoArray
    // try {
    //     const exchangeInfoArray = await futureApi.queryExchangeInfoArray(true);
    //     console.log('queryExchangeInfoArray (Perpetual):', exchangeInfoArray);
    // } catch (error) {
    //     console.error('Error in queryExchangeInfoArray (Perpetual):', error);
    // }
    //
    // try {
    //     const exchangeInfoArray = await futureApi.queryExchangeInfoArray(false);
    //     console.log('queryExchangeInfoArray (Non-Perpetual):', exchangeInfoArray);
    // } catch (error) {
    //     console.error('Error in queryExchangeInfoArray (Non-Perpetual):', error);
    // }
    //
    // // Test additional methods
    // try {
    //     const quarterlyFirstSymbol = await futureApi.getQuarterlyFirstSymbol();
    //     console.log('getQuarterlyFirstSymbol:', quarterlyFirstSymbol);
    // } catch (error) {
    //     console.error('Error in getQuarterlyFirstSymbol:', error);
    // }
    //
    // try {
    //     await futureApi.cancelAllOrders(true, 'BTCUSDT');
    //     console.log('cancelAllOrders (Perpetual): success');
    // } catch (error) {
    //     console.error('Error in cancelAllOrders (Perpetual):', error);
    // }
    //
    // try {
    //     await futureApi.cancelAllOrders(false, 'BTCUSDT');
    //     console.log('cancelAllOrders (Non-Perpetual): success');
    // } catch (error) {
    //     console.error('Error in cancelAllOrders (Non-Perpetual):', error);
    // }

    // try {
    //     const positionSide = await futureApi.queryPositionSide(true);
    //     console.log('queryPositionSide (Perpetual):', positionSide);
    // } catch (error) {
    //     console.error('Error in queryPositionSide (Perpetual):', error);
    // }

    // try {
    //     const positionSide = await futureApi.queryPositionSide(false);
    //     console.log('queryPositionSide (Non-Perpetual):', positionSide);
    // } catch (error) {
    //     console.error('Error in queryPositionSide (Non-Perpetual):', error);
    // }
    //
    // try {
    //     await futureApi.updatePositionSide(true, 'BOTH');
    //     console.log('updatePositionSide (Perpetual): success');
    // } catch (error) {
    //     console.error('Error in updatePositionSide (Perpetual):', error);
    // }
    //
    // try {
    //     await futureApi.updatePositionSide(false, 'BOTH');
    //     console.log('updatePositionSide (Non-Perpetual): success');
    // } catch (error) {
    //     console.error('Error in updatePositionSide (Non-Perpetual):', error);
    // }
    //
    // try {
    //     await futureApi.createMarketOrder(true, 'BTCUSDT', 'BUY', 'LONG', 'false', '1');
    //     console.log('createMarketOrder (Perpetual): success');
    // } catch (error) {
    //     console.error('Error in createMarketOrder (Perpetual):', error);
    // }
    //
    // try {
    //     await futureApi.createMarketOrder(false, 'BTCUSDT', 'BUY', 'LONG', 'false', '1');
    //     console.log('createMarketOrder (Non-Perpetual): success');
    // } catch (error) {
    //     console.error('Error in createMarketOrder (Non-Perpetual):', error);
    // }
    //
    // try {
    //     await futureApi.closePosition(true, 'BTCUSDT', 'SELL', 'true');
    //     console.log('closePosition (Perpetual): success');
    // } catch (error) {
    //     console.error('Error in closePosition (Perpetual):', error);
    // }
    //
    // try {
    //     await futureApi.closePosition(false, 'BTCUSDT', 'SELL', 'true');
    //     console.log('closePosition (Non-Perpetual): success');
    // } catch (error) {
    //     console.error('Error in closePosition (Non-Perpetual):', error);
    // }
    //
    try {
        await futureApi.createLimitOrder(true, 'BTCUSDT', 'BUY', "BOTH", 'LIMIT', "GTC", '0.003', "50000");
        console.log('createLimitOrder (Perpetual): success');
    } catch (error) {
        console.error('Error in createLimitOrder (Perpetual):', error);
    }
    //
    // try {
    //     await futureApi.createLimitOrder(false, 'BTCUSDT', 'BUY', 'LONG', 'LIMIT', '1', '50000');
    //     console.log('createLimitOrder (Non-Perpetual): success');
    // } catch (error) {
    //     console.error('Error in createLimitOrder (Non-Perpetual):', error);
    // }
    //
    // try {
    //     const orderInfo = await futureApi.queryOrderInfo(true, 'BTCUSDT');
    //     console.log('queryOrderInfo (Perpetual):', orderInfo);
    // } catch (error) {
    //     console.error('Error in queryOrderInfo (Perpetual):', error);
    // }
    //
    // try {
    //     const orderInfo = await futureApi.queryOrderInfo(false, 'BTCUSDT');
    //     console.log('queryOrderInfo (Non-Perpetual):', orderInfo);
    // } catch (error) {
    //     console.error('Error in queryOrderInfo (Non-Perpetual):', error);
    // }
    //
    // try {
    //     const positionRisk = await futureApi.queryPositionRisk(true);
    //     console.log('queryPositionRisk (Perpetual):', positionRisk);
    // } catch (error) {
    //     console.error('Error in queryPositionRisk (Perpetual):', error);
    // }
    //
    // try {
    //     const positionRisk = await futureApi.queryPositionRisk(false);
    //     console.log('queryPositionRisk (Non-Perpetual):', positionRisk);
    // } catch (error) {
    //     console.error('Error in queryPositionRisk (Non-Perpetual):', error);
    // }
    //
    // try {
    //     const positionRiskWithSymbol = await futureApi.queryPositionRiskWithSymbol(true, 'BTCUSDT');
    //     console.log('queryPositionRiskWithSymbol (Perpetual):', positionRiskWithSymbol);
    // } catch (error) {
    //     console.error('Error in queryPositionRiskWithSymbol (Perpetual):', error);
    // }
    //
    // try {
    //     const positionRiskWithSymbol = await futureApi.queryPositionRiskWithSymbol(false, 'BTCUSDT');
    //     console.log('queryPositionRiskWithSymbol (Non-Perpetual):', positionRiskWithSymbol);
    // } catch (error) {
    //     console.error('Error in queryPositionRiskWithSymbol (Non-Perpetual):', error);
    // }
    //
    // try {
    //     const openOrders = await futureApi.queryOpenOrders(true, 'BTCUSDT');
    //     console.log('queryOpenOrders (Perpetual):', openOrders);
    // } catch (error) {
    //     console.error('Error in queryOpenOrders (Perpetual):', error);
    // }
    //
    // try {
    //     const openOrders = await futureApi.queryOpenOrders(false, 'BTCUSDT');
    //     console.log('queryOpenOrders (Non-Perpetual):', openOrders);
    // } catch (error) {
    //     console.error('Error in queryOpenOrders (Non-Perpetual):', error);
    // }
    //
    // try {
    //     const ticker24h = await futureApi.query24hTicker(true, 'BTCUSDT');
    //     console.log('query24hTicker (Perpetual):', ticker24h);
    // } catch (error) {
    //     console.error('Error in query24hTicker (Perpetual):', error);
    // }
    //
    // try {
    //     const ticker24h = await futureApi.query24hTicker(false, 'BTCUSDT');
    //     console.log('query24hTicker (Non-Perpetual):', ticker24h);
    // } catch (error) {
    //     console.error('Error in query24hTicker (Non-Perpetual):', error);
    // }
    //
    // try {
    //     const bookTicker = await futureApi.queryBookTicker(true, 'BTCUSDT');
    //     console.log('queryBookTicker (Perpetual):', bookTicker);
    // } catch (error) {
    //     console.error('Error in queryBookTicker (Perpetual):', error);
    // }
    //
    // try {
    //     const bookTicker = await futureApi.queryBookTicker(false, 'BTCUSDT');
    //     console.log('queryBookTicker (Non-Perpetual):', bookTicker);
    // } catch (error) {
    //     console.error('Error in queryBookTicker (Non-Perpetual):', error);
    // }
    //
    // try {
    //     await futureApi.disableOptionsAntiAddictive();
    //     console.log('disableOptionsAntiAddictive: success');
    // } catch (error) {
    //     console.error('Error in disableOptionsAntiAddictive:', error);
    // }
    //
    // try {
    //     await futureApi.enableOptionsAntiAddictive();
    //     console.log('enableOptionsAntiAddictive: success');
    // } catch (error) {
    //     console.error('Error in enableOptionsAntiAddictive:', error);
    // }
    //
    // try {
    //     const exchangeGroupAPI = await futureApi.getExchangetGroupAPI('BTC');
    //     console.log('getExchangetGroupAPI:', exchangeGroupAPI);
    // } catch (error) {
    //     console.error('Error in getExchangetGroupAPI:', error);
    // }
    //
    // try {
    //     const tickerAPI = await futureApi.getTickerAPI();
    //     console.log('getTickerAPI:', tickerAPI);
    // } catch (error) {
    //     console.error('Error in getTickerAPI:', error);
    // }
    //
    // try {
    //     const symbolsAPIOptions = await futureApi.getSymbolsAPIOptions();
    //     console.log('getSymbolsAPIOptions:', symbolsAPIOptions);
    // } catch (error) {
    //     console.error('Error in getSymbolsAPIOptions:', error);
    // }
    //
    // try {
    //     const positionSide = await futureApi.getPositionSide();
    //     console.log('getPositionSide:', positionSide);
    // } catch (error) {
    //     console.error('Error in getPositionSide:', error);
    // }
    //
    // try {
    //     const tickerAPIWithSymbol = await futureApi.getTickerAPI('BTCUSDT');
    //     console.log('getTickerAPI (BTCUSDT):', tickerAPIWithSymbol);
    // } catch (error) {
    //     console.error('Error in getTickerAPI (BTCUSDT):', error);
    // }
    //
    // try {
    //     const positionOrdersEoptions = await futureApi.getPositionOrdersEoptions();
    //     console.log('getPositionOrdersEoptions:', positionOrdersEoptions);
    // } catch (error) {
    //     console.error('Error in getPositionOrdersEoptions:', error);
    // }
    //
    // try {
    //     const openOrdersEoptions = await futureApi.getOpenOrdersEoptions();
    //     console.log('getOpenOrdersEoptions:', openOrdersEoptions);
    // } catch (error) {
    //     console.error('Error in getOpenOrdersEoptions:', error);
    // }
    //
    // try {
    //     await futureApi.placeOrderEoptions('BUY', 'BTCUSDT', 'LIMIT', '50000', '1', 'false');
    //     console.log('placeOrderEoptions: success');
    // } catch (error) {
    //     console.error('Error in placeOrderEoptions:', error);
    // }
    //
    // try {
    //     await futureApi.cancelAllOpenOrdersByUnderlyingEoptions('BTC');
    //     console.log('cancelAllOpenOrdersByUnderlyingEoptions: success');
    // } catch (error) {
    //     console.error('Error in cancelAllOpenOrdersByUnderlyingEoptions:', error);
    // }
    //
    // try {
    //     await futureApi.cancelAllOpenOrdersBySymbolEoptions('BTCUSDT');
    //     console.log('cancelAllOpenOrdersBySymbolEoptions: success');
    // } catch (error) {
    //     console.error('Error in cancelAllOpenOrdersBySymbolEoptions:', error);
    // }
    //
    // try {
    //     const umSymbolPremiumIndex = await futureApi.retrieveUmSymbolPremiumIndex('BTCUSDT');
    //     console.log('retrieveUmSymbolPremiumIndex:', umSymbolPremiumIndex);
    // } catch (error) {
    //     console.error('Error in retrieveUmSymbolPremiumIndex:', error);
    // }
    //
    // try {
    //     const cmSymbolPremiumIndex = await futureApi.retrieveCmSymbolPremiumIndex('BTCUSDT', 'PERP');
    //     console.log('retrieveCmSymbolPremiumIndex:', cmSymbolPremiumIndex);
    // } catch (error) {
    //     console.error('Error in retrieveCmSymbolPremiumIndex:', error);
    // }
    //
    // try {
    //     const userCommissionRate = await futureApi.retrieveUserCommissionRate(true, 'BTCUSDT');
    //     console.log('retrieveUserCommissionRate (UM):', userCommissionRate);
    // } catch (error) {
    //     console.error('Error in retrieveUserCommissionRate (UM):', error);
    // }
    //
    // try {
    //     const userCommissionRate = await futureApi.retrieveUserCommissionRate(false, 'BTCUSDT');
    //     console.log('retrieveUserCommissionRate (CM):', userCommissionRate);
    // } catch (error) {
    //     console.error('Error in retrieveUserCommissionRate (CM):', error);
    // }


    console.log('Finished testing FutureApi methods.');
}

testFutureApi();
