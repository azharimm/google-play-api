var gplay = require('google-play-scraper');

const main = async () => {
    // const response = await gplay.app({appId: 'com.ss.android.ugc.trill'});
    // console.log(response);

    const response = await gplay.reviews({
        appId: 'com.ss.android.ugc.trill',
        sort: gplay.sort.RATING,
        num: 3000
    });
    console.log(response);
}

main();