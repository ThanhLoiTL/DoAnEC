import db from '../models/index';

let getAllCategory = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let allCategory = await db.CategoryWeb.findAll({
                raw: true
            });
            resolve(allCategory);
        } catch (e) {
            reject(e);
        }
    })
}

let postCategory = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.name && data.description) {
                await db.CategoryWeb.create({
                    name: data.name,
                    description: data.description
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

let updateCategory = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.id && data.name && data.description) {
                let category = await db.CategoryWeb.findOne({
                    where: {
                        id: data.id
                    }
                });
                if (category) {
                    category.name = data.name;
                    category.description = data.description;

                    await category.save();
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

let deleteCategory = (idCategory) => {
    return new Promise(async (resolve, reject) => {
        try {
            let category = await db.CategoryWeb.findOne({
                where: {
                    id: idCategory
                }
            });
            if (category) {
                await category.destroy();
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

module.exports = {
    getAllCategory: getAllCategory,
    postCategory: postCategory,
    updateCategory: updateCategory,
    deleteCategory: deleteCategory
}