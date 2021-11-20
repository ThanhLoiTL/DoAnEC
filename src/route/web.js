import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import webController from "../controllers/webController";
import auctionController from "../controllers/auctionController";

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
    router.get('/api/get-user', userController.getUser);

    router.get('/api/get-webs', webController.getListWeb);
    router.get('/api/get-banner-by-webId', webController.getBannerByWebId);
    router.get('/api/get-auction-by-banner', auctionController.getAuctionByBanner);

    router.post('/api/postWinAuction', auctionController.postWinAuction);

    router.get('/api/get-your-cart', webController.getYourCart);

    router.get('/api/get-your-order', webController.getYourOrder);

    router.put('/api/checkout', webController.checkoutOrder);

    router.put('/api/recharge', userController.recharge);

    router.get('/api/get-web', webController.getWeb);

    router.get('/api/get-web-by-category', webController.getWebByCategory);

    router.get('/api/get-auction-by-status', webController.getAuctionByStatus);

    return app.use("/", router);
}

module.exports = initWebRoutes;