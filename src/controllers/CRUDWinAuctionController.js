import CRUDWinAuctionService from '../services/CRUDWinAuctionService';

let getAllWinAuction = async (req, res) => {
    let allWinAuction = await CRUDWinAuctionService.getAllWinAuction();
    return res.status(200).json({
        allWinAuction: allWinAuction ? allWinAuction : []
    });
}

let getWinAuctionByUser = async (req, res) => {
    let id = req.query.userId;
    let listWinAuction = await CRUDWinAuctionService.getWinAuctionByUser(id);
    return res.status(200).json({
        listWinAuction: listWinAuction ? listWinAuction : []
    });
}

module.exports = {
    getAllWinAuction: getAllWinAuction,
    getWinAuctionByUser: getWinAuctionByUser
}