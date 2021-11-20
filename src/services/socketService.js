import db from '../models/index';

let setPriceAuction = (idAuction, price) => {
    return new Promise(async (resolve, reject) => {
        try {
            let auction = await db.Auction.findOne({
                where: {
                    id: idAuction
                }
            });
            if (auction) {
                auction.auctionMoney = price;

                await auction.save();

            }
            resolve(auction);
        } catch (e) {
            reject(e);
        }
    })
}

let setStatusAuction = (idAuction, status) => {
    return new Promise(async (resolve, reject) => {
        try {
            let auction = await db.Auction.findOne({
                where: {
                    id: idAuction
                }
            })
            auction.status = status;
            await auction.save();
            resolve();
        } catch (e) {
            reject(e);
        }
    })
}

let getListAuction = (status) => {
    return new Promise(async (resolve, reject) => {
        try {
            let auctionL = await db.Auction.findAll({
                where: {
                    status: status
                },
                raw: true
            })
            resolve(auctionL);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    setPriceAuction: setPriceAuction,
    setStatusAuction: setStatusAuction,
    getListAuction: getListAuction
}