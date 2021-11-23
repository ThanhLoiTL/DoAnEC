import CRUDRoleService from '../services/CRUDRoleService';

let getAllRole = async (req, res) => {
    let allRole = await CRUDRoleService.getAllRole();
    return res.status(200).json({
        allRole: allRole ? allRole : []
    });
}

module.exports = {
    getAllRole: getAllRole
}