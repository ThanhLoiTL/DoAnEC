import db from '../models/index';

let getAllWinAuction = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let allWinBanner = await db.WinAuction.findAll({
                include: [{
                        model: await db.User
                    },
                    {
                        model: await db.Auction
                    }
                ],
                raw: true,
                nest: true
            });
            resolve(allWinBanner);
        } catch (e) {
            reject(e);
        }
    })
}

let getWinAuctionByUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let allWinBanner = await db.WinAuction.findAll({
                where: {
                    userId: userId
                },
                include: [{
                        model: await db.User
                    },
                    {
                        model: await db.Auction
                    }
                ],
                raw: true,
                nest: true
            });
            resolve(allWinBanner);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAllWinAuction: getAllWinAuction,
    getWinAuctionByUser: getWinAuctionByUser
}