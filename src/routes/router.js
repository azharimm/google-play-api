const express = require('express');
const gplay = require('google-play-scraper');
const { json, errorJson } = require('../utils/response')
const { qs, buildUrl, cleanUrls, toList } = require('../utils/urls');

const router = express.Router();

/* Index */
router.get('/', (req, res) => {
	return json(res, {
		maintainer: 'Azhari Muhammad M <azhari.marzan@gmail.com>',
		source: 'https://github.com/azharimm/hadits-api',
		apps: buildUrl(req, 'apps'),
		developers: buildUrl(req, 'developers')
	});
});

/* App search */
router.get('/apps/', async (req, res, next) => {
	try {
		if (!req.query.q) {
		  return next();
		}
	  
		const opts = Object.assign({term: req.query.q}, req.query);
		const response = await gplay.search(opts);
		return json(res, toList(response));
		
	} catch (error) {
		return next();
	}
  
});

/* Search suggest */
router.get('/apps/', async (req, res, next) => {
	try {
		if (!req.query.suggest) {
		  return next();
		}
	  
		const toJSON = (term) => ({
		  	term,
		  	url: buildUrl(req, '/apps/') + '?' + qs.stringify({q: term})
		});
	  
		const response = await gplay.suggest({term: req.query.suggest})
		return json(res, response.map(toJSON));
		
	} catch (error) {
		return next();
	}
});

/* App list */
router.get('/apps/', async (req, res, next) => {
	try {
		const paginate = (apps) => {
			const num = parseInt(req.query.num || '10');
			const start = parseInt(req.query.start || '0');
	  
			if (start - num >= 0) {
				req.query.start = start - num;
				apps.prev = buildUrl(req, '/apps/') + '?' + qs.stringify(req.query);
			}
	  
			if (start + num <= 500) {
				req.query.start = start + num;
				apps.next = buildUrl(req, '/apps/') + '?' + qs.stringify(req.query);
			}
	  
			return apps;
		}
		const response = await gplay.list(req.query);
		const apps = response.map(cleanUrls(req))
		return json(res, paginate(toList(apps)));
	} catch (error) {
		return next();		
	}
});

/* App detail*/
router.get('/apps/:appId', async (req, res, next) => {
	try {
		const opts = Object.assign({appId: req.params.appId}, req.query);
		const response = await gplay.app(opts);
		return json(res, toList(response));
	} catch (error) {
		return next();
	}
});

/* Similar apps */
router.get('/apps/:appId/similar', async (req, res, next) => {
	try {
		const opts = Object.assign({appId: req.params.appId}, req.query);
		const response = await gplay.similar(opts);
		const apps = response.map(cleanUrls(req));
		return json(res, toList(apps));
	} catch (error) {
		return next();
	}
});

/* App permissions */
router.get('/apps/:appId/permissions', async (req, res, next) => {
	try {
		const opts = Object.assign({appId: req.params.appId}, req.query);
		const response = await gplay.permissions(opts);
		return json(res, toList(response));
	} catch (error) {
		
	}
});

/* App reviews */
router.get('/apps/:appId/reviews', async (req, res, next) => {
	try {
		const paginate = (apps) => {
			  const page = parseInt(req.query.page || '0');
	  
			  const subpath = '/apps/' + req.params.appId + '/reviews/';
			  if (page > 0) {
				req.query.page = page - 1;
				apps.prev = buildUrl(req, subpath) + '?' + qs.stringify(req.query);
			  }
	  
			  if (apps.results.length) {
				req.query.page = page + 1;
				apps.next = buildUrl(req, subpath) + '?' + qs.stringify(req.query);
			  }
			return apps;
		}
	  
		const opts = Object.assign({appId: req.params.appId}, req.query);
		const response = await gplay.reviews(opts);
		return json(res, paginate(toList(response)));
	} catch (error) {
		
	}
});

/* Apps by developer */
router.get('/developers/:devId/', async (req, res, next) => {
	try {
		const opts = Object.assign({devId: req.params.devId}, req.query);
		const response = await gplay.developer(opts);
		const apps = response.map(cleanUrls(req));
		return json(res, toList(apps));
	} catch (error) {
		return next();
	}
});

router.get('/developers', async (req, res, next) => {
	return json(res, {
		message: 'Please specify a developer id.',
		example: buildUrl(req, '/developers/' + qs.escape('DxCo Games'))
	}, 400);
});

module.exports = router;