import CRUDUserService from '../services/CRUDUserService';

let postUser = async (req, res) => {
    let message = await CRUDUserService.postUser(req.body);
    return res.status(200).json(
        message
    );
}
let updateUser = async (req, res) => {
    let message = await CRUDUserService.updateUser(req.body);
    return res.status(200).json(
        message
    );
}

let deleteUser = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(500).json({
            message: "Missing value"
        });
    }
    let message = await CRUDUserService.deleteUser(id);
    return res.status(200).json(message);
}

let getAllUser = async (req, res) => {
    let allUser = await CRUDUserService.getAllUser();
    return res.status(200).json({
        allUser: allUser ? allUser : []
    })
}

module.exports = {
    postUser: postUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getAllUser: getAllUser
}