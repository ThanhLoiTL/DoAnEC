import db from '../models/index';

let postBanner = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.name && data.size && data.price && data.image && data.status && data.time && data.webId) {
                await db.Banner.create({
                    name: data.name,
                    size: data.size,
                    price: data.price,
                    image: data.image,
                    time: data.time,
                    status: data.status,
                    webId: data.webId
                })
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

let updateBanner = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.id && data.name && data.size && data.price && data.image && data.time && data.webId) {
                let banner = await db.Banner.findOne({
                    where: {
                        id: data.id
                    }
                });
                if (banner) {
                    banner.name = data.name;
                    banner.size = data.size;
                    banner.price = data.price;
                    banner.image = data.image;
                    banner.time = data.time;
                    banner.status = data.status;
                    banner.webId = data.webId;

                    await banner.save();
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

let deleteBanner = (idBanner) => {
    return new Promise(async (resolve, reject) => {
        try {
            let banner = await db.Banner.findOne({
                where: {
                    id: idBanner
                }
            });
            if (banner) {
                await banner.destroy();
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

let getAllBanner = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let allBanner = await db.Banner.findAll({
                include: [{
                    model: await db.Web
                }],
                raw: true,
                nest: true
            });
            resolve(allBanner);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    postBanner: postBanner,
    updateBanner: updateBanner,
    deleteBanner: deleteBanner,
    getAllBanner: getAllBanner
}