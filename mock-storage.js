const path = require('path');
const fs = require('fs');

const getFilePath = function(filnavn) {
    var directories = ['.', 'mock_data', filnavn];
    return directories.join(path.sep);
};

const getFileContent = function(filnavn) {
    const fileName = getFilePath(filnavn);
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

const getPersoninfo = function() {
    return getFileContent('personinfo.json');
};

const getSaker = function() {
    return getFileContent('saker.json');
};

const getKvitteringStorage = function() {
    return getFileContent('storage_kvittering.json');
};

const getHistorikk = function() {
    return getFileContent('historikk.json');
};

const getMinidialog = function() {
    return getFileContent('miniDialog.json');
};

module.exports = {
    getPersoninfo,
    getSaker,
    getKvitteringStorage,
    getSaker,
    getHistorikk,
    getMinidialog
};
