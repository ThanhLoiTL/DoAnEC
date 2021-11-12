import db from '../models/index';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFormBcrypt = await hashUsePassword(data.password);
            await db.User.create({
                fullName: data.fullName,
                email: data.email,
                password: hashPasswordFormBcrypt,
                phone: data.phone,
                address: data.address,
                roleId: data.roleId
            })
            resolve("Created a new user");
        } catch (e) {
            reject(e);
        }
    })
}

let hashUsePassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e)
        }
    })
}

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findAll({
                raw: true,
            });
            resolve(data);
        } catch (e) {
            reject(e);
        }
    })
}

let findUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = await db.User.findOne({
                where: {
                    id: userId
                },
                raw: true
            });
            if (userData) {
                resolve(userData);
            } else {
                resolve({});
            }
        } catch (e) {
            reject(e);
        }
    });
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: data.id
                }
            });
            if (user) {
                user.fullName = data.fullName;
                user.phone = data.phone;
                user.address = data.address;

                await user.save();

                let allUser = await db.User.findAll();
                resolve(allUser);
            } else {
                resolve();
            }
        } catch (e) {
            reject(e);
        }
    });
}

let deleteUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: id
                }
            })
            if (id) {
                user.destroy();
            }
            resolve();
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    findUserById: findUserById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById
}