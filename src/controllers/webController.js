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
        return res.status(404).json({
            errCode: 1,
            message: 'Missing data'
        })
    }
    let listBanner = await webService.getBannerByWebId(webId);
    return res.status(200).json({
        listBanner: listBanner ? listBanner : []
    });
}

module.exports = {
    getListWeb: getListWeb,
    getBannerByWebId: getBannerByWebId
}