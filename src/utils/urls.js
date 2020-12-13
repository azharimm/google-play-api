const path = require('path');
const qs = require('querystring');
const toList = (apps) => ({results: apps});

const cleanUrls = (req) => (app) => Object.assign({}, app, {
    playstoreUrl: app.url,
    url: buildUrl(req, 'apps/' + app.appId),
    permissions: buildUrl(req, 'apps/' + app.appId + '/permissions'),
    similar: buildUrl(req, 'apps/' + app.appId + '/similar'),
    reviews: buildUrl(req, 'apps/' + app.appId + '/reviews'),
    developer: {
        devId: app.developer,
        url: buildUrl(req, 'developers/' + qs.escape(app.developer))
    }
});

const buildUrl = (req, subpath) => {
    return req.protocol + '://' + path.join(req.get('host'), req.baseUrl, subpath);
}

module.exports = {
    qs,
    toList,
    cleanUrls,
    buildUrl
}