const fs = require('fs');
const path = require('path');

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
}

module.exports = FuturesUtils;
