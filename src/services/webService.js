import db from '../models/index';

let getListWeb = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let listWeb = await db.Web.findAll({
                raw: true
            });
            resolve(listWeb);
        } catch (e) {
            reject(e)
        }
    });
}

let getBannerByWebId = (webId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let listBanner = await db.Banner.findAll({
                where: {
                    webId: webId
                },
                include: [{
                    model: await db.Auction,
                    where: {
                        status: 1
                    }
                }],
                raw: true,
                nest: true
            })
            resolve(listBanner);
        } catch (e) {
            reject(e);
        }
    })
}

let getYourCart = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let cart = await db.WinAuction.findAll({
                where: {
                    userId: userId,
                    status: 1
                },
                include: [{
                    model: await db.Auction,
                    include: [{
                        model: await db.Banner
                    }],
                }],
            })
            resolve(cart);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getListWeb: getListWeb,
    getBannerByWebId: getBannerByWebId,
    getYourCart: getYourCart
}