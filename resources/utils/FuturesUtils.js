const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class FuturesUtils {
    static dataPath = path.join(__dirname, 'futures', 'data', 'account', 'user-data.json');

    static readFromJson(filePath) {
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Read JSON file error!', error);
            return null;
        }
    }

    static getUserData(key) {
        const data = this.readFromJson(this.dataPath);
        return data[key];
    }

    static isSqlCheck(key) {
        const userData = this.getUserData(key);
        return userData ? userData.isSqlCheck : false;
    }

    static isHistoryCheck(key) {
        const userData = this.getUserData(key);
        return userData ? userData.isHistoryCheck : false;
    }

    static encode(str) {
        // Use 'latin1' instead of 'gbk' to avoid the unknown encoding error
        return Buffer.from(str, 'latin1').toString('utf-8');
    }

    static sha256_HMAC(key, data) {
        const hmac = crypto.createHmac('sha256', Buffer.from(key, 'utf-8'));
        hmac.update(Buffer.from(data, 'utf-8'));
        return hmac.digest('hex');
    }
}

module.exports = FuturesUtils;
