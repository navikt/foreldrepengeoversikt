const path = require('path');
const fs = require('fs');

const getFilePath = function(filnavn) {
    var directories = ['.', 'mock_data', filnavn];
    return directories.join(path.sep);
};

const getPersoninfo = function() {
    const fileName = getFilePath('personinfo.json');
    if (!fs.existsSync(fileName)) {
        return {};
    } else {
        try {
            return JSON.parse(fs.readFileSync(fileName, 'utf8'));
        } catch (err) {
            return {};
        }
    }
};

const getSaker = function() {
    const fileName = getFilePath('saker.json');
    if (!fs.existsSync(fileName)) {
        return {};
    } else {
        try {
            return JSON.parse(fs.readFileSync(fileName, 'utf8'));
        } catch (err) {
            return {};
        }
    }
};

const getKvitteringStorage = function() {
    const fileName = getFilePath('storage_kvittering.json');
    if(!fs.existsSync(fileName)) {
        return {};
    } else {
        try {
            return JSON.parse(fs.readFileSync(fileName, 'utf8'))
        } catch (err) {
            return {};
        }
    }
}


module.exports = {
    getPersoninfo,
    getSaker,
    getKvitteringStorage
};
