import db from '../models/index';

let getAuctionByBanner = (bannerId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let auction = await db.Auction.findOne({
                where: {
                    id: bannerId,
                    status: 1
                },
                include: [{
                    model: db.Banner
                }],
                raw: true,
                nest: true
            })
            resolve(auction);
        } catch (e) {
            reject(e);
        }
    })
}

let postWinAuction = (userId, auctionId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.WinAuction.create({
                userId: userId,
                auctionId: auctionId,
                status: 1
            })
            resolve({
                message: "OK"
            });
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAuctionByBanner: getAuctionByBanner,
    postWinAuction: postWinAuction
}