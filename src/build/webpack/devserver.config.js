require('dotenv').config();
const mustacheExpress = require('mustache-express');

const configureDevServer = (decoratorFragments) => ({
    before: (app) => {
        app.engine('html', mustacheExpress());
        app.set('views', `${__dirname}/../../../dist/dev`);
        app.set('view engine', 'mustache');
        app.get(['/dist/settings.js'], (_req, res) => {
            res.set('content-type', 'application/javascript');
            res.send(`window.appSettings = {
                REST_API_URL: '${process.env.FORELDREPENGESOKNAD_API_URL}',
                LOGIN_URL: '${process.env.LOGINSERVICE_URL}',
                UTTAK_API_URL: '${process.env.FP_UTTAK_SERVICE_URL}',
                APPRES_CMS_URL: '${process.env.APPRES_CMS_URL}',
                KLAGE_URL: '${process.env.KLAGE_URL}'
            };`);
        });
        app.get(/^\/(?!.*dist).*$/, (_req, res) => {
            res.render('index.html', Object.assign(decoratorFragments));
        });
    },
    watchContentBase: true,
    quiet: false,
    noInfo: false,
    stats: 'minimal',
    publicPath: '/dist',
});

module.exports = configureDevServer;
