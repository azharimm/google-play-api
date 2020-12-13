const express = require('express');
const gplay = require('google-play-scraper');
const { json, errorJson } = require('../utils/response')
const { qs, buildUrl, cleanUrls, toList, paginate } = require('../utils/urls');

const router = express.Router();

/* Index */
router.get('/', (req, res) => {
	const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	return json(res, {
		maintainer: 'Azhari Muhammad M <azhari.marzan@gmail.com>',
		source: 'https://github.com/azharimm/google-play-api',
		list: {
			endpoint: '/apps',
			example: fullUrl+'apps?lang=id&category=GAME&collection=topselling_paid&page=1&limit=10'
		},
		search: {
			endpoint: '/apps?q=',
			example: fullUrl+'apps?q=Facebook'
		},
		suggest: {
			endpoint: '/apps?suggest=',
			example: fullUrl+'apps?suggest=Facebook'
		},
		detail: {
			endpoint: '/apps/:appId',
			example: fullUrl+'apps/com.facebook.katana'
		},
		similar: {
			endpoint: '/apps/:appId/similar',
			example: fullUrl+'apps/com.facebook.katana/similar'
		},
		permissions: {
			endpoint: '/apps/:appId/permissions',
			example: fullUrl+'apps/com.facebook.katana/permissions'
		},
		reviews: {
			endpoint: '/apps/:appId/permissions',
			example: fullUrl+'apps/com.facebook.katana/reviews'
		},
		categories: {
			endpoint: '/categories',
			example: fullUrl+'categories'
		},
		collections: {
			endpoint: '/collections',
			example: fullUrl+'collections'
		},
		app_by_dev: {
			endpoint: '/developers/:devId',
			example: fullUrl+'developers/Facebook'
		}
	});
});

/* App search */
router.get('/apps/', async (req, res, next) => {
	try {
		const page = parseInt(req.query.page || '1');
		const limit = parseInt(req.query.limit || '10');
		
		if (!req.query.q) {
		  return next();
		}
	  
		const opts = Object.assign({term: req.query.q}, req.query);
		const response = await gplay.search(opts);
		return json(res, {
			page,
			limit,
			last_page: Math.ceil(response.length/limit),
			results: paginate(response, page, limit)
		});
		
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
		const page = parseInt(req.query.page || '1');
		const limit = parseInt(req.query.limit || '10');
		
		const response = await gplay.list(req.query);
		const apps = response.map(cleanUrls(req))
		return json(res, {
			page,
			limit,
			last_page: Math.ceil(response.length/limit),
			results: paginate(apps, page, limit)
		});
	} catch (error) {
		return errorJson(res, error);		
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
		const page = parseInt(req.query.page || '1');
		const limit = parseInt(req.query.limit || '10');

		const opts = Object.assign({appId: req.params.appId}, req.query);
		const response = await gplay.similar(opts);
		const apps = response.map(cleanUrls(req));
		return json(res, {
			page,
			limit,
			last_page: Math.ceil(response.length/limit),
			results: paginate(apps, page, limit)
		});
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
		const page = parseInt(req.query.page || '1');
		const limit = parseInt(req.query.limit || '10');
		const opts = Object.assign({appId: req.params.appId}, req.query);
		const response = await gplay.reviews(opts);
		const reviews = response.data;
		return json(res, {
			page,
			limit,
			last_page: Math.ceil(reviews.length/limit),
			results: paginate(reviews, page, limit)
		});
	} catch (error) {
		return errorJson(res, error);
	}
});

router.get('/collections', (req, res) => {
	return json(res, {
		results: [
			{name: 'TOP_FREE', collection: 'topselling_free'},
			{name: 'TOP_PAID', collection: 'topselling_paid'},
			{name: 'GROSSING', collection: 'topgrossing'},
			{name: 'TRENDING', collection: 'movers_shakers'},
			{name: 'TOP_FREE_GAMES', collection: 'topselling_free_games'},
			{name: 'TOP_PAID_GAMES', collection: 'topselling_paid_games'},
			{name: 'TOP_GROSSING_GAMES', collection: 'topselling_grossing_games'},
			{name: 'NEW_FREE', collection: 'topselling_new_free'},
			{name: 'NEW_PAID', collection: 'topselling_new_paid'},
			{name: 'NEW_FREE_GAMES', collection: 'topselling_new_free_games'},
			{name: 'NEW_PAID_GAMES', collection: 'topselling_new_paid_games'},
		]
	});
});

router.get('/categories', (req, res) => {
	return json(res, {
		results: [
			{name: 'APPLICATION', category: 'APPLICATION'},
			{name: 'ANDROID_WEAR', category: 'ANDROID_WEAR'},
			{name: 'ART_AND_DESIGN', category: 'ART_AND_DESIGN'},
			{name: 'AUTO_AND_VEHICLES', category: 'AUTO_AND_VEHICLES'},
			{name: 'BEAUTY', category: 'BEAUTY'},
			{name: 'BOOKS_AND_REFERENCE', category: 'BOOKS_AND_REFERENCE'},
			{name: 'BUSINESS', category: 'BUSINESS'},
			{name: 'COMICS', category: 'COMICS'},
			{name: 'COMMUNICATION', category: 'COMMUNICATION'},
			{name: 'DATING', category: 'DATING'},
			{name: 'EDUCATION', category: 'EDUCATION'},
			{name: 'ENTERTAINMENT', category: 'ENTERTAINMENT'},
			{name: 'EVENTS', category: 'EVENTS'},
			{name: 'FINANCE',category: 'FINANCE'},
			{name: 'FOOD_AND_DRINK',category: 'FOOD_AND_DRINK'},
			{name: 'HEALTH_AND_FITNESS',category: 'HEALTH_AND_FITNESS'},
			{name: 'HOUSE_AND_HOME', category: 'HOUSE_AND_HOME'},
			{name: 'LIBRARIES_AND_DEMO', category: 'LIBRARIES_AND_DEMO'},
			{name: 'LIFESTYLE', category: 'LIFESTYLE'},
			{name: 'MAPS_AND_NAVIGATION',category: 'MAPS_AND_NAVIGATION'},
			{name: 'MEDICAL', category: 'MEDICAL'},
			{name: 'MUSIC_AND_AUDIO', category: 'MUSIC_AND_AUDIO'},
			{name: 'NEWS_AND_MAGAZINES', category: 'NEWS_AND_MAGAZINES'},
			{name: 'PARENTING', category: 'PARENTING'},
			{name: 'PERSONALIZATION', category: 'PERSONALIZATION'},
			{name: 'PHOTOGRAPHY', category: 'PHOTOGRAPHY'},
			{name: 'PRODUCTIVITY', category: 'PRODUCTIVITY'},
			{name: 'SHOPPING', category: 'SHOPPING'},
			{name: 'SOCIAL', category: 'SOCIAL'},
			{name: 'SPORTS', category: 'SPORTS'},
			{name: 'TOOLS', category: 'TOOLS'},
			{name: 'TRAVEL_AND_LOCAL', name: 'TRAVEL_AND_LOCAL'},
			{name: 'VIDEO_PLAYERS', category: 'VIDEO_PLAYERS'},
			{name: 'WEATHER', category: 'WEATHER'},
			{name: 'GAME', category: 'GAME'},
			{name: 'GAME_ACTION', category: 'GAME_ACTION'},
			{name: 'GAME_ADVENTURE', category: 'GAME_ADVENTURE'},
			{name: 'GAME_ARCADE', category: 'GAME_ARCADE'},
			{name: 'GAME_BOARD', category: 'GAME_BOARD'},
			{name: 'GAME_CARD', category: 'GAME_CARD'},
			{name: 'GAME_CASINO', category: 'GAME_CASINO'},
			{name: 'GAME_CASUAL', category: 'GAME_CASUAL'},
			{name: 'GAME_EDUCATIONAL', category: 'GAME_EDUCATIONAL'},
			{name: 'GAME_MUSIC', category:'GAME_MUSIC'},
			{name: 'GAME_PUZZLE', category: 'GAME_PUZZLE'},
			{name: 'GAME_RACING', category: 'GAME_RACING'},
			{name: 'GAME_ROLE_PLAYING', category: 'GAME_ROLE_PLAYING'},
			{name: 'GAME_SIMULATION', category: 'GAME_SIMULATION'},
			{name: 'GAME_SPORTS', category: 'GAME_SPORTS'},
			{name: 'GAME_STRATEGY', category: 'GAME_STRATEGY'},
			{name: 'GAME_TRIVIA', category: 'GAME_TRIVIA'},
			{name: 'GAME_WORD', category: 'GAME_WORD'},
			{name: 'FAMILY', category: 'FAMILY'},
			{name: 'FAMILY_ACTION', category: 'FAMILY_ACTION'},
			{name: 'FAMILY_BRAINGAMES', category: 'FAMILY_BRAINGAMES'},
			{name: 'FAMILY_CREATE', category: 'FAMILY_CREATE'},
			{name: 'FAMILY_EDUCATION', category: 'FAMILY_EDUCATION'},
			{name: 'FAMILY_MUSICVIDEO', category: 'FAMILY_MUSICVIDEO'},
			{name: 'FAMILY_PRETEND', category: 'FAMILY_PRETEND'}
		]
	});
});

/* Apps by developer */
router.get('/developers/:devId/', async (req, res, next) => {
	try {
		const page = parseInt(req.query.page || '1');
		const limit = parseInt(req.query.limit || '10');
		const opts = Object.assign({devId: req.params.devId}, req.query);
		const response = await gplay.developer(opts);
		const apps = response.map(cleanUrls(req));
		return json(res, {
			page,
			limit,
			last_page: Math.ceil(response.length/limit),
			results: paginate(apps, page, limit)
		});
	} catch (error) {
		return errorJson(res, error);
	}
});

router.get('/developers', async (req, res, next) => {
	return json(res, {
		message: 'Please specify a developer id.',
		example: buildUrl(req, '/developers/' + qs.escape('DxCo Games'))
	}, 400);
});

module.exports = router;