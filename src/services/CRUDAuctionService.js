import db from '../models/index';

let getAllAuction = () => {
    return new Promise((resolve, reject) => {
        try {
            let allAuction = await db.Auction.findAll({
                include: [{
                    model: await db.Banner
                }],
                raw: true,
                nest: true
            });
            resolve(allAuction);
        } catch (e) {
            reject(e);
        }
    })
}

let getWillAuction = (status) => {
    return new Promise((resolve, reject) => {
        try {
            let allAuction = await db.Auction.findAll({
                where: {
                    status: status
                },
                include: [{
                    model: await db.Banner
                }],
                raw: true,
                nest: true
            });
            resolve(allAuction);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAllAuction: getAllAuction,
    getWillAuction: getWillAuction
}