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
            let mess;
            let check = await db.WinAuction.create({
                userId: userId,
                auctionId: auctionId,
                status: 1
            })
            if (!check) {
                mess = "That bai";
            } else {
                let auction = await db.Auction.findOne({
                    where: {
                        id: auctionId
                    }
                })
                if (auction) {
                    auction.status = 2;
                    await auction.save();

                    let banner = await db.Banner.findOne({
                        where: {
                            id: auction.bannerId
                        }
                    });
                    if (banner) {
                        let date = new Date(banner.time);
                        banner.time = date.addDays(15);
                        banner.status = 0;
                        await banner.save();

                        let auction = await db.Auction.create({
                            timeStart: "00:00:00",
                            timeEnd: "00:00:00",
                            status: 0,
                            date: banner.time,
                            auctionMoney: banner.price,
                            bannerId: banner.id
                        })
                        if (auction) {
                            mess = "Thanh cong";
                        }
                    }
                }
            }
            resolve({
                message: mess
            });
        } catch (e) {
            reject(e);
        }
    })
}
Date.prototype.addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

module.exports = {
    getAuctionByBanner: getAuctionByBanner,
    postWinAuction: postWinAuction
}