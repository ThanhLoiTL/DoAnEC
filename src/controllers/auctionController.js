import auctionService from '../services/auctionService';

let getAuctionByBanner = async (req, res) => {
    let bannerId = req.query.id;
    if (!bannerId) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing data'
        });
    }
    let auction = await auctionService.getAuctionByBanner(bannerId);
    return res.status(200).json({
        auction: auction ? auction : {}
    });
}

let postWinAuction = async (req, res) => {
    let userId = req.body.userId;
    let auctionId = req.body.auctionId;
    if (!userId || !auctionId) {
        return res.status(500).json({
            message: 'Missing value'
        });
    }
    auctionService.postWinAuction(userId, auctionId);
}

module.exports = {
    getAuctionByBanner: getAuctionByBanner,
    postWinAuction: postWinAuction
}