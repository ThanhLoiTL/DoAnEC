import db from '../models/index';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

let postUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    email: data.email
                }
            });
            if (user) {
                resolve({
                    errCode: 1,
                    message: 'Email da ton tai'
                });
            }
            let hashPasswordFormBcrypt = await hashUsePassword(data.password);
            await db.User.create({
                fullName: data.fullName,
                email: data.email,
                password: hashPasswordFormBcrypt,
                phone: data.phone,
                address: data.address,
                money: 0,
                roleId: data.roleId
            })
            resolve({
                errCode: 0,
                message: 'OK'
            });
        } catch (e) {
            reject(e);
        }
    })
}
let checkEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    email: email
                }
            })
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }

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

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: data.id
                }
            })
            if (!user) {
                resolve({
                    errCode: 1,
                    message: 'user da ton tai'
                });
            }
            let hashPasswordFormBcrypt = await hashUsePassword(data.password);
            user.fullName = data.fullName;
            user.email = data.email;
            user.password = hashPasswordFormBcrypt
            user.phone = data.phone;
            user.address = data.address;
            user.roleId = data.roleId;
            await user.save();
            resolve({
                errCode: 0,
                message: 'OK'
            });
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: userId
                }
            })
            if (!user) {
                resolve({
                    message: 'That bai'
                });
            }
            await user.destroy();
            resolve({
                message: 'Thanh cong'
            });
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let allUser = await db.User.findAll({
                raw: true
            });
            resolve(allUser);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    postUser: postUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getAllUser: getAllUser
}