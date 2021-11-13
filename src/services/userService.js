import db from '../models/index';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExistEmail = await checkEmail(email);

            if (isExistEmail) {
                let user = await db.User.findOne({
                    //atributes: ['email', 'password', 'roleId'],
                    where: {
                        email: email
                    },
                    atributes: {
                        exclude: ['password']
                    },
                    raw: true
                })
                if (user) {
                    let checkPassword = await bcrypt.compare(password, user.password);
                    if (checkPassword) {
                        userData.errCode = 0;
                        userData.message = 'OK';
                        //khong hien thi password ra ngoai
                        //delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.message = 'Password incorrect!';
                    }
                } else {
                    userData.errCode = 2;
                    userData.message = 'User not exist in system!';
                }
            } else {
                userData.errCode = 1;
                userData.message = 'Email not exist in system!';
            }
            resolve(userData);
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

let handleRegister = (data) => {
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

let getUser = (useId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let user = await db.User.findOne({
                where: {
                    id: useId
                }
            });
            if (!user) {
                userData.errCode = 1;
                userData.message = 'User not found';
            } else {
                userData.errCode = 0;
                userData.message = 'OK';
                userData.user = user;
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    handleUserLogin: handleUserLogin,
    handleRegister: handleRegister,
    getUser: getUser
}