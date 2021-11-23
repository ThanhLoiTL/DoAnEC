import db from '../models/index';

let day = 15;

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
            let check = await db.WinAuction.create({
                userId: userId,
                auctionId: auctionId,
                status: 1
            })
            if (!check) {
                resolve({
                    message: "That bai"
                });

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
                        let timeS = new Date(auction.timeStart);
                        let timeE = new Date(auction.timeEnd);
                        banner.time = timeS.addDays(day);
                        banner.status = 0;
                        await banner.save();
                        let auct = await db.Auction.create({
                            timeStart: timeS.addDays(day),
                            timeEnd: timeE.addDays(day),
                            status: 0,
                            date: banner.time,
                            auctionMoney: banner.price,
                            bannerId: banner.id
                        })
                        if (auct) {
                            resolve({
                                message: "Thanh cong"
                            });
                        }
                    }
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
Date.prototype.addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

module.exports = {
    getAuctionByBanner: getAuctionByBanner,
    postWinAuction: postWinAuction
}