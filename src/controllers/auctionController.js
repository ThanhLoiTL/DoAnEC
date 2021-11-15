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

module.exports = {
    getAuctionByBanner: getAuctionByBanner
}