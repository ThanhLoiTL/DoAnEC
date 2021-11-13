import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/get-user', homeController.getUser);
    router.get('/form-user', homeController.formUser);
    router.post('/post-user', homeController.postUser);
    router.get('/edit-user', homeController.editUser);
    router.post('/put-user', homeController.putUser);
    router.get('/delete-user', homeController.deleteUserById);

    //API
    router.post('/api/login', userController.handleLogin);
    router.post('/api/register', userController.handleRegister);

    return app.use("/", router);
}

module.exports = initWebRoutes;