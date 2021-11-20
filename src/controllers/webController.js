import webService from '../services/webService';

let getListWeb = async (req, res) => {
    let listWeb = await webService.getListWeb();
    return res.status(200).json({
        listWeb: listWeb ? listWeb : []
    });
}

let getBannerByWebId = async (req, res) => {
    let webId = req.query.id;
    let status = req.query.status;
    if (!webId || !status) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing data'
        })
    }
    let listBanner = await webService.getBannerByWebId(webId, status);
    return res.status(200).json({
        listBanner: listBanner ? listBanner : []
    });
}

let getYourCart = async (req, res) => {
    let idUser = req.query.id;
    if (!idUser) {
        return res.status(500).json({
            message: 'Missing data'
        });
    }
    let cart = await webService.getYourCart(idUser);
    return res.status(200).json({
        cart
    });
}

let getYourOrder = async (req, res) => {
    let idUser = req.query.id;
    if (!idUser) {
        return res.status(500).json({
            message: 'Missing data'
        });
    }
    let order = await webService.getYourOrder(idUser);
    return res.status(200).json({
        order
    });
}

let checkoutOrder = async (req, res) => {
    let userId = req.body.userId;
    let auctionId = req.body.auctionId;
    let yourBanner = req.body.yourBanner;
    if (!userId || !auctionId || !yourBanner) {
        return res.status(500).json({
            message: 'Missing value'
        });
    }
    let message = await webService.checkoutOrder(userId, auctionId, yourBanner);
    return res.status(200).json(message);
}

let getWeb = async (req, res) => {
    let webId = req.query.webId;
    if (!webId) {
        return res.status(500).json({
            message: 'Invalid web'
        });
    }
    let web = await webService.getWeb(webId);
    return res.status(200).json(web ? web : {});
}

let getWebByCategory = async (req, res) => {
    let categoryId = req.query.categoryId;
    if (!category) {
        return res.status(500).json({
            message: 'Invalid category'
        });
    }
    let webs = await webService.getWebByCategory(categoryId);
    return res.status(200).json(listWeb ? webs : []);
}

module.exports = {
    getListWeb: getListWeb,
    getBannerByWebId: getBannerByWebId,
    getYourCart: getYourCart,
    getYourOrder: getYourOrder,
    checkoutOrder: checkoutOrder,
    getWeb: getWeb,
    getWebByCategory: getWebByCategory
}