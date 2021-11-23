import db from '../models/index';

let getAllRole = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let allRole = await db.Role.findAll({
                raw: true
            });
            resolve(allRole);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAllRole: getAllRole
}