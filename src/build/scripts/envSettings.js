const fsExtra = require('fs-extra');

function createEnvSettingsFile(settingsFile) {
    fsExtra.ensureFile(settingsFile).then((f) => {
        fsExtra.writeFileSync(
            settingsFile,
            `window.appSettings = {
                REST_API_URL: '${process.env.FORELDREPENGESOKNAD_API_URL}',
                LOGIN_URL: '${process.env.LOGINSERVICE_URL}',
                UTTAK_API_URL: '${process.env.FP_UTTAK_SERVICE_URL}',
                APPRES_CMS_URL: '${process.env.APPRES_CMS_URL}',
                KLAGE_URL: '${process.env.KLAGE_URL}'
            };`
        );
    });
}
module.exports = createEnvSettingsFile;
