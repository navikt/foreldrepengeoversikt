const express = require('express');
const app = express();
const router = express.Router();
const multer = require('multer');
const MockStorage = require('./mock-storage');

require('dotenv').config();

const allowCrossDomain = function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8880');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-XSRF-TOKEN,Location');
    res.setHeader('Access-Control-Expose-Headers', 'Location');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
};
const delayAllResponses = function(millis) {
    return function(req, res, next) {
        setTimeout(next, millis);
    };
};

app.use(allowCrossDomain);
app.use(delayAllResponses(500));
app.use(express.json());

router.get(['/rest/personinfo'], (req, res) => {
    res.send(MockStorage.getPersoninfo());
});

router.post('/rest/engangsstonad', (req, res) => res.sendStatus(200));

router.get('/rest/innsyn/saker', (req, res) => {
    res.send(MockStorage.getSaker());
});

router.get('/rest/historikk/historikk', (req, res) => {
    res.send(MockStorage.getHistorikk());
});

router.get('/rest/minidialog/minidialog', (req, res) => {
    res.send(MockStorage.getMinidialog());
});

router.delete('/rest/storage', (req, res) => {
    res.sendStatus(204);
});

router.get('/rest/storage/kvittering/foreldrepenger', (req, res) => {
    res.send(MockStorage.getKvitteringStorage());
});

router.get('/rest/innsyn/uttaksplan', (req, res) => {
    res.send(MockStorage.getUttaksplan());
});

const vedleggUpload = multer({ dest: './dist/vedlegg/' });
router.post('/rest/storage/vedlegg', vedleggUpload.single('vedlegg'), (req, res) => {
    res.setHeader('Location', `http://localhost:8080/foreldrepengesoknad/dist/vedlegg/${req.body.id}`);
    res.sendStatus(201);
});

router.delete('/rest/storage/vedlegg/:id', (req, res) => {
    res.sendStatus(204);
});

router.post('/rest/soknad/ettersend', (req,res) => {
    res.sendStatus(200);
});

app.use('', router);

const port = process.env.PORT || 8888;
app.listen(port, () => {
    console.log(`Mock-api listening on port: ${port}`);
});

