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

let getBannerByWebId = (webId, status) => {
    return new Promise(async (resolve, reject) => {
        try {
            let listBanner = await db.Banner.findAll({
                where: {
                    webId: webId,
                    status: status
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

let getYourOrder = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = await db.WinAuction.findAll({
                where: {
                    userId: userId,
                    status: 0
                },
                include: [{
                    model: await db.Auction,
                    include: [{
                        model: await db.Banner
                    }],
                }],
            })
            resolve(order);
        } catch (e) {
            reject(e);
        }
    })
}

let checkoutOrder = (userId, auctionId, yourBanner) => {
    return new Promise(async (resolve, reject) => {
        try {
            let mess;
            let winAuction = await db.WinAuction.findOne({
                where: {
                    userId: userId,
                    auctionId: auctionId,
                    status: 1
                }
            });
            let infoAuction = await db.Auction.findOne({
                where: {
                    id: auctionId
                }
            });

            let user = await db.User.findOne({
                where: {
                    id: userId
                }
            })

            if (!winAuction) {
                mess = "That Bai";
            } else {
                if (user.money >= infoAuction.auctionMoney) {
                    winAuction.yourBanner = yourBanner;
                    winAuction.status = 0;
                    user.money -= infoAuction.auctionMoney;
                    await user.save();
                    await winAuction.save();
                    mess = "Thanh cong";
                } else {
                    mess = "Khong du tien";
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

let getWeb = (webId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let web = await db.Web.findOne({
                where: {
                    id: webId
                }
            })
            resolve(web);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getListWeb: getListWeb,
    getBannerByWebId: getBannerByWebId,
    getYourCart: getYourCart,
    getYourOrder: getYourOrder,
    checkoutOrder: checkoutOrder,
    getWeb: getWeb
}