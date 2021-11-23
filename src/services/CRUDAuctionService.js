import db from '../models/index';

let getAllAuction = () => {
    return new Promise(async (resolve, reject) => {
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
    return new Promise(async (resolve, reject) => {
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

let postAuction = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.bannerId && data.timeStart && data.timeEnd) {
                let banner = await db.Banner.findOne({
                    where: {
                        id: data.bannerId
                    }
                })
                if (banner) {
                    await db.Auction.create({
                        timeStart: data.timeStart,
                        timeEnd: data.timeEnd,
                        status: 0,
                        auctionMoney: banner.price,
                        bannerId: data.bannerId,
                    })
                    resolve({
                        message: "Thanh cong"
                    });
                }
            }
            resolve({
                message: "That bai"
            });
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAllAuction: getAllAuction,
    getWillAuction: getWillAuction,
    postAuction: postAuction
}