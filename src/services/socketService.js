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

module.exports = {
    setPriceAuction: setPriceAuction
}