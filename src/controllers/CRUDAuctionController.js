import CRUDAuctionService from '../services/CRUDAuctionService';

let getAllAuction = async (req, res) => {
    let allAuction = await CRUDAuctionService.getAllAuction();
    return res.status(200).json({
        allAuction: allAuction ? allAuction : []
    });
}

let getWillAuction = async (req, res) => {
    let status = req.query.status;
    if (status) {
        let allAuction = await CRUDAuctionService.getWillAuction(status);
        return res.status(200).json({
            allAuction: allAuction ? allAuction : []
        });
    }
}

let postAuction = async (req, res) => {
    let message = await CRUDAuctionService.postAuction(req.body);
    return res.status(200).json(message);
}

module.exports = {
    getAllAuction: getAllAuction,
    getWillAuction: getWillAuction,
    postAuction: postAuction
}