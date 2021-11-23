import CRUDBannerService from '../services/CRUDBannerService';

let postBanner = async (req, res) => {
    let message = await CRUDBannerService.postBanner(req.body);
    return res.status(200).json(message);
}
let updateBanner = async (req, res) => {
    let message = await CRUDBannerService.updateBanner(req.body);
    return res.status(200).json(message);
}

let deleteBanner = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(500).json({
            message: "That bai"
        });
    }
    let message = await CRUDBannerService.deleteBanner(id);
    return res.status(200).json(message);
}

let getAllBanner = async (req, res) => {
    let allBanner = await CRUDBannerService.getAllBanner();
    return res.status(200).json({
        allBanner: allBanner ? allBanner : []
    });
}

module.exports = {
    postBanner: postBanner,
    updateBanner: updateBanner,
    deleteBanner: deleteBanner,
    getAllBanner: getAllBanner
}