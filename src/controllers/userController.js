import userService from '../services/userService';

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing data"
        })
    }

    let userData = await userService.handleUserLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        user: userData.user ? userData.user : {}
    })
}

let handleRegister = async (req, res) => {
    let message = await userService.handleRegister(req.body);
    return res.status(200).json(
        message
    );
}

let getUser = async (req, res) => {
    let userId = req.query.id;
    if (!userId) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing data"
        });
    }
    let userData = await userService.getUser(userId);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        user: userData.user ? userData.user : {}
    });
}

let recharge = async (req, res) => {
    let userId = req.body.userId;
    let money = req.body.money;
    if (!userId || !money) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing data"
        });
    }
    let message = await userService.recharge(userId, money);
    return res.status(200).json(message);
}

module.exports = {
    handleLogin: handleLogin,
    handleRegister: handleRegister,
    getUser: getUser,
    recharge: recharge
}