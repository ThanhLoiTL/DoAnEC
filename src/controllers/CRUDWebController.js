import CRUDWebService from '../services/CRUDWebService';

let postWeb = async (req, res) => {
    let message = await CRUDWebService.postWeb(req.body);
    return res.status(200).json(message);
}

let updateWeb = async (req, res) => {
    let message = await CRUDWebService.updateWeb(req.body);
    return res.status(200).json(message);
}

let deleteWeb = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(500).json({
            message: "That bai"
        });
    }
    let message = await CRUDWebService.deleteWeb(id);
    return res.status(200).json(message);
}

let getAllWeb = async (req, res) => {
    let allWeb = await CRUDWebService.getAllWeb();
    return res.status(200).json({
        allWeb: allWeb ? allWeb : []
    })
}

module.exports = {
    postWeb: postWeb,
    updateWeb: updateWeb,
    deleteWeb: deleteWeb,
    getAllWeb: getAllWeb
}