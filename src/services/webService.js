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
                raw: true
            })
            resolve(listBanner);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getListWeb: getListWeb,
    getBannerByWebId: getBannerByWebId
}