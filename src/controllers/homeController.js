import db from '../models/index';
import UserService from '../services/CRUDService'

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log(data);
        return res.render('homePage.ejs', {
            data: JSON.stringify(data),
        });
    } catch (e) {
        console.log(e);
    }
}

let getUser = async (req, res) => {
    let data = await UserService.getAllUser();
    return res.render('listUser.ejs', {
        dataTable: data
    });
}

let postUser = async (req, res) => {
    let message = await UserService.createNewUser(req.body);
    console.log(message);
    return res.send("Created User");
}

let formUser = (req, res) => {
    return res.render('createUser.ejs');
}

let editUser = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let data = await UserService.findUserById(userId);
        return res.render('editUser.ejs', {
            dataUser: data
        });
    } else {
        return res.send("user not found!");
    }
}

let putUser = async (req, res) => {
    let data = req.body;
    if (data) {
        let allUser = await UserService.updateUserData(data);
        return res.render('listUser.ejs', {
            dataTable: allUser
        })
    }

    return res.send("put user");
}

let deleteUserById = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await UserService.deleteUserById(id);
        return res.send("Deleted");
    } else {
        return res.send("user not found");
    }
}

module.exports = {
    getHomePage: getHomePage,
    getUser: getUser,
    postUser: postUser,
    formUser: formUser,
    editUser: editUser,
    putUser: putUser,
    deleteUserById: deleteUserById
}