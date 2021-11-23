import db from '../models/index';

let postWeb = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.name && data.link && data.image && data.categoryId) {
                await db.Web.create({
                    name: data.name,
                    link: data.link,
                    image: data.image,
                    categoryId: data.categoryId
                });
                resolve({
                    message: 'Thanh cong'
                });
            } else {
                resolve({
                    message: 'That bai'
                });
            }
        } catch (err) {
            reject(err);
        }
    })
}

let updateWeb = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.id && data.name && data.link && data.image && data.categoryId) {
                let web = await db.Web.findOne({
                    where: {
                        id: data.id
                    }
                });
                if (web) {
                    web.name = data.name;
                    web.link = data.link;
                    web.image = data.image;
                    web.categoryId = data.categoryId;
                    await web.save();
                    resolve({
                        message: "Thanh cong"
                    });
                }
            }
            resolve({
                message: "That bai"
            });
        } catch (e) {
            reject(e);
        }
    })
}

let deleteWeb = (idWeb) => {
    return new Promise(async (resolve, reject) => {
        try {
            let web = await db.Web.findOne({
                where: {
                    id: idWeb
                }
            });
            if (web) {
                await web.destroy();
                resolve({
                    message: "Thanh cong"
                });
            }
            resolve({
                message: "That bai"
            });
        } catch (e) {
            reject(e);
        }
    })
}

let getAllWeb = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let allWeb = await db.Web.findAll({
                include: [{
                    model: await db.CategoryWeb
                }],
                raw: true,
                nest: true
            });
            resolve(allWeb);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    postWeb: postWeb,
    updateWeb: updateWeb,
    deleteWeb: deleteWeb,
    getAllWeb: getAllWeb
}