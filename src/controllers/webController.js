import webService from '../services/webService';

let getListWeb = async (req, res) => {
    let listWeb = await webService.getListWeb();
    return res.status(200).json({
        listWeb: listWeb ? listWeb : []
    });
}

let getBannerByWebId = async (req, res) => {
    let webId = req.query.id;
    if (!webId) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing data'
        })
    }
    let listBanner = await webService.getBannerByWebId(webId);
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

module.exports = {
    getListWeb: getListWeb,
    getBannerByWebId: getBannerByWebId,
    getYourCart: getYourCart,
    getYourOrder: getYourOrder
}